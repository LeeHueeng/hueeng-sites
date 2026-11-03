import * as THREE from './assets/vendor/three.module.js';
import {HEIGHT,localWind} from './placement-transport.js?v=20260914j';

export function drawFieldSlice(view,config,sim,point,bounds){
 const env=sim.environment;if(!env)return;
 const {grid}=env,c=view.ctx,nx=grid.nx,ny=grid.ny,nz=grid.nz,dx=config.size/nx,dz=config.size/nz,dy=HEIGHT/ny,iy=Math.max(0,Math.min(ny-1,Math.floor((view.sliceHeight??1)/dy)));
 c.save();
 for(let iz=0;iz<nz;iz++)for(let ix=0;ix<nx;ix++){
  const index=(iy*nz+iz)*nx+ix;if(grid.mask[index])continue;
  const x=-config.size/2+(ix+.5)*dx,z=-config.size/2+(iz+.5)*dz,q=point(x,z),value=env.aerosol[index];
  if(value>.006){const alpha=Math.min(.48,Math.log1p(value*8)*.24);c.fillStyle=`rgba(171,146,45,${alpha})`;c.fillRect(q.x-dx*bounds.scale/2,q.y-dz*bounds.scale/2,dx*bounds.scale+.5,dz*bounds.scale+.5);}
  if(ix%3===1&&iz%3===1){const wind=localWind(grid,x,(iy+.5)*dy,z),vx=wind.x??wind[0]??0,vz=wind.z??wind[2]??0,length=Math.hypot(vx,vz);if(length>.025){const end=point(x+vx/length*Math.min(.5,length*.7),z+vz/length*Math.min(.5,length*.7)),angle=Math.atan2(end.y-q.y,end.x-q.x);c.strokeStyle='rgba(38,91,82,.30)';c.lineWidth=1;c.beginPath();c.moveTo(q.x,q.y);c.lineTo(end.x,end.y);c.moveTo(end.x-4*Math.cos(angle-.55),end.y-4*Math.sin(angle-.55));c.lineTo(end.x,end.y);c.lineTo(end.x-4*Math.cos(angle+.55),end.y-4*Math.sin(angle+.55));c.stroke();}}
 }
 for(const fly of sim.flies){if(fly.status==='captured'||fly.trail.length<2)continue;const trail=fly.trail.slice(-14);c.strokeStyle='rgba(40,93,81,.22)';c.lineWidth=1;c.beginPath();trail.forEach((position,index)=>{const p=point(position.x,position.z);if(index)c.lineTo(p.x,p.y);else c.moveTo(p.x,p.y);});c.stroke();}
 c.restore();
}
export function drawFieldVolume(view,config,sim){
 const env=sim.environment;if(!env||!view.scene)return;
 const {grid}=env,count=grid.nx*grid.ny*grid.nz;
 if(!view.transportPoints||view.transportCapacity!==count){
  if(view.transportPoints){view.scene.remove(view.transportPoints);view.transportPoints.geometry.dispose();view.transportPoints.material.dispose();}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(count*3),3));geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(count*3),3));geometry.setDrawRange(0,0);
  view.transportPoints=new THREE.Points(geometry,new THREE.PointsMaterial({size:.17,vertexColors:true,transparent:true,opacity:.55,depthWrite:false}));view.transportPoints.frustumCulled=false;view.scene.add(view.transportPoints);view.transportCapacity=count;view.transportSource=null;
 }
 if(view.transportSource===env&&view.transportFrame===env.frame)return;
 view.transportSource=env;view.transportFrame=env.frame;
 const geometry=view.transportPoints.geometry,positions=geometry.attributes.position.array,colors=geometry.attributes.color.array,dx=config.size/grid.nx,dy=HEIGHT/grid.ny,dz=config.size/grid.nz;let visible=0;
 for(let iy=0;iy<grid.ny;iy++)for(let iz=0;iz<grid.nz;iz++)for(let ix=0;ix<grid.nx;ix++){
  const index=(iy*grid.nz+iz)*grid.nx+ix,value=env.aerosol[index];if(grid.mask[index]||value<.012)continue;
  const strength=Math.min(1,Math.log1p(value*5)),offset=visible*3;positions[offset]=-config.size/2+(ix+.5)*dx;positions[offset+1]=(iy+.5)*dy;positions[offset+2]=-config.size/2+(iz+.5)*dz;colors[offset]=.67+strength*.25;colors[offset+1]=.72-strength*.2;colors[offset+2]=.25;visible++;
 }
 geometry.setDrawRange(0,visible);geometry.attributes.position.needsUpdate=true;geometry.attributes.color.needsUpdate=true;
}
