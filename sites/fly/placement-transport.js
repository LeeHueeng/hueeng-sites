// Conservative upwind scalar transport on a 3D obstacle grid. The velocity
// field is a steady pressure-projection approximation, not calibrated room CFD.
export const PROFILES={
 precise:{dt:.05,cell:.6,vertical:.4,fieldDt:.1,search:6,confirm:20},
 maximum:{dt:.025,cell:.4,vertical:.32,fieldDt:.05,search:8,confirm:32}
};
export const HEIGHT=3.2;
const DIRS=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let sharedCache=null;

function gridFor(config,specs,wind){
 const profile=PROFILES[config.accuracy]||PROFILES.precise,nx=Math.ceil(config.size/profile.cell),nz=nx,ny=Math.ceil(HEIGHT/profile.vertical),dx=config.size/nx,dz=dx,dy=HEIGHT/ny,n=nx*nz*ny;
 const grid={nx,nz,ny,dx,dz,dy,n,size:config.size,volume:dx*dz*dy,mask:new Uint8Array(n),neighbors:new Int32Array(n*6),faces:new Float32Array(n*6),spacing:[dx,dx,dz,dz,dy,dy],fluid:[],centers:new Float32Array(n*3)};
 for(let y=0;y<ny;y++)for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){const i=(y*nz+z)*nx+x,px=(x+.5)*dx-config.size/2,py=(y+.5)*dy,pz=(z+.5)*dz-config.size/2;grid.centers.set([px,py,pz],i*3);grid.mask[i]=config.obstacles.some(o=>py<specs[o.type].h&&Math.abs(px-o.x)<specs[o.type].w/2&&Math.abs(pz-o.z)<specs[o.type].d/2)?1:0;if(!grid.mask[i])grid.fluid.push(i);}
 const divergence=new Float32Array(n),denominator=new Float32Array(n);
 for(const i of grid.fluid){const x=i%nx,z=Math.floor(i/nx)%nz,y=Math.floor(i/(nx*nz));
  DIRS.forEach(([ox,oy,oz],d)=>{const a=x+ox,b=y+oy,c=z+oz,index=i*6+d,h=grid.spacing[d],base=wind.x*ox+wind.z*oz;
   if(a<0||a>=nx||b<0||b>=ny||c<0||c>=nz){grid.neighbors[index]=base!==0?-2:-1;}
   else{const j=(b*nz+c)*nx+a;grid.neighbors[index]=grid.mask[j]?-1:j;}
   if(grid.neighbors[index]!==-1){grid.faces[index]=base;divergence[i]+=base/h;denominator[i]+=1/(h*h);}
  });
 }
 let pressure=new Float32Array(n),next=new Float32Array(n);
 if(wind.x||wind.z){for(let iteration=0;iteration<140;iteration++){for(const i of grid.fluid){let sum=0;for(let d=0;d<6;d++){const j=grid.neighbors[i*6+d],h=grid.spacing[d];if(j>=0)sum+=pressure[j]/(h*h);}next[i]=denominator[i]?(sum-divergence[i])/denominator[i]:0;}[pressure,next]=[next,pressure];}
  for(const i of grid.fluid)for(let d=0;d<6;d++){const index=i*6+d,j=grid.neighbors[index];if(j!==-1)grid.faces[index]-=((j>=0?pressure[j]:0)-pressure[i])/grid.spacing[d];}
 }
 grid.velocity=new Float32Array(n*3);let maxRate=0;
 for(const i of grid.fluid){grid.velocity[i*3]=(grid.faces[i*6]-grid.faces[i*6+1])/2;grid.velocity[i*3+1]=(grid.faces[i*6+4]-grid.faces[i*6+5])/2;grid.velocity[i*3+2]=(grid.faces[i*6+2]-grid.faces[i*6+3])/2;let rate=.3;for(let d=0;d<6;d++)if(grid.neighbors[i*6+d]!==-1)rate+=Math.max(0,grid.faces[i*6+d])/grid.spacing[d]+.075/grid.spacing[d]**2;maxRate=Math.max(maxRate,rate);}
 grid.maxRate=maxRate;return grid;
}
function sourceKernel(grid,point){
 const cells=[],sigma=.3;let sum=0;
 for(const i of grid.fluid){const k=i*3,d2=(grid.centers[k]-point.x)**2+(grid.centers[k+1]-point.y)**2+(grid.centers[k+2]-point.z)**2;if(d2>1)continue;const weight=Math.exp(-d2/(2*sigma*sigma));cells.push([i,weight]);sum+=weight;}
 if(!sum){let best=-1,distance=Infinity;for(const i of grid.fluid){const k=i*3,d=(grid.centers[k]-point.x)**2+(grid.centers[k+1]-point.y)**2+(grid.centers[k+2]-point.z)**2;if(d<distance){distance=d;best=i;}}if(best>=0)return[[best,1/grid.volume]];return[];}
 return cells.map(([i,weight])=>[i,weight/(sum*grid.volume)]);
}
function transport(grid,field,buffer,dt,diffusion,decay){
 const substeps=Math.max(1,Math.ceil(dt*grid.maxRate/.65)),hdt=dt/substeps;
 for(let step=0;step<substeps;step++){
  for(const i of grid.fluid){const value=field[i];let rate=-decay*value;
   for(let d=0;d<6;d++){const index=i*6+d,j=grid.neighbors[index];if(j===-1){rate-=value*.002/grid.spacing[d];continue;}const other=j>=0?field[j]:0,h=grid.spacing[d],velocity=grid.faces[index];rate+=diffusion*(other-value)/(h*h)-velocity*(velocity>=0?value:other)/h;}
   buffer[i]=Math.max(0,value+hdt*rate);
  }
  field.set(buffer);
 }
}
function inject(field,kernels,mass){if(!mass)return;for(const kernel of kernels)for(const [i,weight] of kernel)field[i]+=weight*mass;}
function pulseMass(start,end){let overlap=0;for(let cycle=Math.floor(start/6);cycle<=Math.floor(end/6);cycle++)overlap+=Math.max(0,Math.min(end,cycle*6+.25)-Math.max(start,cycle*6));return overlap*4/.25;}

export function sharedTransport(config,specs,wind){
 const key=JSON.stringify([config.size,config.accuracy,config.obstacles,config.foods,wind]);if(sharedCache?.key===key)return sharedCache;
 const grid=gridFor(config,specs,wind),profile=PROFILES[config.accuracy]||PROFILES.precise,foodKernels=config.foods.map(f=>sourceKernel(grid,{x:f.x,y:.15,z:f.z}));const odor=new Float32Array(grid.n),buffer=new Float32Array(grid.n);
 // Explicit 20-model-second pre-roll; no claim of a converged steady state.
 for(let t=0;t<Math.round(20/profile.fieldDt);t++){transport(grid,odor,buffer,profile.fieldDt,.075,.06);inject(odor,foodKernels,.12*profile.fieldDt);}
 sharedCache={key,grid,profile,foodKernels,warmOdor:odor,odorTape:null};return sharedCache;
}
export function liveEnvironment(config,shared){return{shared,grid:shared.grid,frame:0,odor:shared.warmOdor.slice(),aerosol:new Float32Array(shared.grid.n),buffer:new Float32Array(shared.grid.n),sprays:config.devices.filter(d=>d.type==='spray').map(d=>sourceKernel(shared.grid,d)),recorded:false};}
export function advanceEnvironment(env,frame){
 if(env.recorded){const n=env.grid.n,end=Math.min(frame,env.frames-1);env.odor=env.shared.odorTape.subarray(end*n,(end+1)*n);env.aerosol=env.aerosolTape.subarray(end*n,(end+1)*n);env.frame=end;return;}
 const {profile,foodKernels}=env.shared;
 while(env.frame<frame){const start=env.frame*profile.fieldDt;transport(env.grid,env.odor,env.buffer,profile.fieldDt,.075,.06);inject(env.odor,foodKernels,.12*profile.fieldDt);transport(env.grid,env.aerosol,env.buffer,profile.fieldDt,.045,.2);inject(env.aerosol,env.sprays,pulseMass(start,start+profile.fieldDt));env.frame++;}
}
export function recordedEnvironment(config,shared){
 const dt=shared.profile.fieldDt,frames=Math.round(60/dt)+1,n=shared.grid.n,env=liveEnvironment(config,shared),aerosolTape=new Float32Array(n*frames);const makeOdor=!shared.odorTape;
 if(makeOdor){shared.odorTape=new Float32Array(n*frames);shared.odorTape.set(env.odor);}
 for(let frame=1;frame<frames;frame++){advanceEnvironment(env,frame);aerosolTape.set(env.aerosol,frame*n);if(makeOdor)shared.odorTape.set(env.odor,frame*n);}
 return{shared,grid:shared.grid,recorded:true,frames,frame:0,aerosolTape,odor:shared.odorTape.subarray(0,n),aerosol:aerosolTape.subarray(0,n)};
}
export function sample(grid,field,x,y,z){
 const fx=clamp((x+grid.size/2)/grid.dx-.5,0,grid.nx-1),fy=clamp(y/grid.dy-.5,0,grid.ny-1),fz=clamp((z+grid.size/2)/grid.dz-.5,0,grid.nz-1),ix=Math.floor(fx),iy=Math.floor(fy),iz=Math.floor(fz);let total=0,weight=0;
 for(let b=0;b<2;b++)for(let c=0;c<2;c++)for(let a=0;a<2;a++){const i=(Math.min(iy+b,grid.ny-1)*grid.nz+Math.min(iz+c,grid.nz-1))*grid.nx+Math.min(ix+a,grid.nx-1);if(grid.mask[i])continue;const w=(a?fx-ix:1-(fx-ix))*(b?fy-iy:1-(fy-iy))*(c?fz-iz:1-(fz-iz));total+=field[i]*w;weight+=w;}
 return weight?total/weight:0;
}
export function localWind(grid,x,y,z){const ix=clamp(Math.floor((x+grid.size/2)/grid.dx),0,grid.nx-1),iy=clamp(Math.floor(y/grid.dy),0,grid.ny-1),iz=clamp(Math.floor((z+grid.size/2)/grid.dz),0,grid.nz-1),i=((iy*grid.nz+iz)*grid.nx+ix)*3;return{x:grid.velocity[i],y:grid.velocity[i+1],z:grid.velocity[i+2]};}
