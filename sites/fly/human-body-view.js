import * as THREE from './assets/vendor/three.module.js';
import {SIZE,SHAPES,OBSTACLES,HOME,clamp} from './human-body-model.js?v=20260914l';
export class HumanBodyView{
 constructor(container,onPlace){
  this.container=container;this.onPlace=onPlace;this.mode='orbit';this.tool='orbit';this.yaw=.62;this.elevation=.8;this.zoom=1;this.showOdor=true;
  this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));this.renderer.setClearColor('#20342c');this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;container.replaceChildren(this.renderer.domElement);this.renderer.domElement.tabIndex=0;
  this.scene=new THREE.Scene();this.scene.fog=new THREE.Fog('#20342c',24,50);this.camera=new THREE.PerspectiveCamera(42,1,.06,70);this.scene.add(new THREE.HemisphereLight('#fff4d5','#627b69',2.6));const sun=new THREE.DirectionalLight('#ffe5bd',3);sun.position.set(4,12,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:.5,far:35});sun.shadow.bias=-.0005;this.scene.add(sun);
  this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2();this.foods=new Map();this.balls=new Map();this.makeRoom();this.makeBody();this.makeSignals();this.events();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(container);this.resize();
 }
 material(color,extra={}){return new THREE.MeshStandardMaterial({color,roughness:.76,...extra});}
 box(w,h,d,x,y,z,color,parent=this.scene){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),this.material(color));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 makeRoom(){
  this.floor=this.box(SIZE,.18,SIZE,0,-.11,0,'#c7b999');this.box(SIZE,2.6,.13,0,1.25,-SIZE/2,'#c2c9b0');this.box(.13,2.6,SIZE,-SIZE/2,1.25,0,'#a3b9a3');this.box(SIZE,.08,.12,0,.02,SIZE/2,'#607660');this.box(.12,.08,SIZE,SIZE/2,.02,0,'#607660');
  const grid=new THREE.GridHelper(SIZE,SIZE*2,'#7e8b6b','#a69e80');grid.position.y=.003;grid.material.transparent=true;grid.material.opacity=.35;this.scene.add(grid);
  for(const object of OBSTACLES){const shape=SHAPES[object.type],group=new THREE.Group();group.position.set(object.x,0,object.z);this.scene.add(group);
   if(object.type==='desk'){this.box(shape.w,.15,shape.d,0,shape.h-.08,0,'#917b58',group);for(const x of [-.85,.85])for(const z of [-.48,.48])this.box(.12,shape.h,.12,x,shape.h/2,z,'#617264',group);this.box(.7,.08,.4,.25,shape.h+.01,0,'#d3d9bb',group);}
   else if(object.type==='bed'){this.box(shape.w,shape.h,shape.d,0,shape.h/2,0,'#8ba79a',group);this.box(shape.w*.85,.12,.55,0,shape.h+.06,-1.05,'#e3dfc4',group);}
   else{this.box(.7,.5,.7,0,.25,0,'#b18a64',group);for(let i=0;i<7;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.33,10,7),this.material(i%2?'#748a4e':'#506d48'));leaf.scale.set(.65,1.4,.65);leaf.position.set(Math.sin(i*2.4)*.2,1+i*.14,Math.cos(i*2.4)*.2);group.add(leaf);}}
  }
  this.home=new THREE.Mesh(new THREE.RingGeometry(.85,1.02,64),new THREE.MeshBasicMaterial({color:'#63a7a1',side:THREE.DoubleSide,transparent:true,opacity:.85}));this.home.rotation.x=-Math.PI/2;this.home.position.set(HOME.x,.016,HOME.z);this.scene.add(this.home);
  const label=document.createElement('canvas');label.width=512;label.height=256;const ctx=label.getContext('2d');ctx.fillStyle='#334d3e';ctx.fillRect(0,0,512,256);ctx.fillStyle='#d3dda8';ctx.font='22px monospace';ctx.fillText('FLY LAB / EXPERIMENT 06',35,55);ctx.font='bold 60px serif';ctx.fillText('BODY / 01',32,139);ctx.font='17px monospace';ctx.fillText('SENSOR  >  SIGNAL  >  MOVEMENT',35,207);const panel=new THREE.Mesh(new THREE.PlaneGeometry(3.8,1.9),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(label)}));panel.position.set(2.7,1.65,-SIZE/2+.08);this.scene.add(panel);
 }
 makeBody(){
  this.bodyRoot=new THREE.Group();this.bodyPose=new THREE.Group();this.bodyRoot.add(this.bodyPose);this.scene.add(this.bodyRoot);
  const sphere=(radius,mat,x,y,z,parent=this.bodyPose,scale=[1,1,1])=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,16,12),mat);mesh.position.set(x,y,z);mesh.scale.set(...scale);mesh.castShadow=true;parent.add(mesh);return mesh;};
  const limb=(length,radius,mat,parent)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius*.83,length,12),mat);mesh.position.y=-length/2;mesh.castShadow=true;parent.add(mesh);return mesh;};
  const suit=this.material('#d9dcc3'),skin=this.material('#d5b18a'),pants=this.material('#6a8373'),dark=this.material('#34473b');this.leftMaterial=this.material('#8cbdaa',{emissive:'#679b79',emissiveIntensity:.05});this.rightMaterial=this.material('#d0ae77',{emissive:'#b18145',emissiveIntensity:.05});
  sphere(.25,suit,0,1.18,0,this.bodyPose,[1,1.4,.66]);sphere(.22,pants,0,.84,0,this.bodyPose,[1,.65,.72]);this.head=sphere(.16,skin,0,1.68,0,this.bodyPose,[1,1.13,.95]);sphere(.045,skin,0,1.68,.15,this.head,[.7,.75,.7]).position.set(0,0,.15);
  const band=new THREE.Mesh(new THREE.TorusGeometry(.163,.022,7,32),dark);band.rotation.x=Math.PI/2;band.position.y=.025;this.head.add(band);sphere(.025,this.leftMaterial,-.1,.03,.12,this.head);sphere(.025,this.rightMaterial,.1,.03,.12,this.head);
  this.legs=[];this.arms=[];
  for(const [index,side] of [-1,1].entries()){
   const leg=new THREE.Group();leg.position.set(side*.12,.86,0);this.bodyPose.add(leg);limb(.37,.084,pants,leg);const knee=new THREE.Group();knee.position.y=-.37;leg.add(knee);limb(.36,.064,pants,knee);const shoe=sphere(.09,index?this.rightMaterial:this.leftMaterial,0,-.42,.065,knee,[.9,.6,1.6]);this.legs.push({root:leg,knee,shoe});
   const arm=new THREE.Group();arm.position.set(side*.27,1.4,0);this.bodyPose.add(arm);sphere(.09,suit,0,0,0,arm);limb(.29,.06,suit,arm);const elbow=new THREE.Group();elbow.position.y=-.29;arm.add(elbow);limb(.26,.048,skin,elbow);sphere(.061,skin,0,-.29,0,elbow,[.8,1.25,.8]);this.arms.push({root:arm,elbow});
  }
  this.box(.15,.16,.025,0,1.28,.177,'#548573',this.bodyPose);
 }
 makeSignals(){
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(240*3),3));geometry.setDrawRange(0,0);this.trail=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:'#568974',transparent:true,opacity:.6}));this.trail.frustumCulled=false;this.scene.add(this.trail);
  this.heading=new THREE.ArrowHelper(new THREE.Vector3(0,0,-1),new THREE.Vector3(),.8,0xf0d18c,.2,.1);this.scene.add(this.heading);
 }
 events(){
  const canvas=this.renderer.domElement;let drag=null;
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;canvas.focus({preventScroll:true});drag={x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false};canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)>5)drag.moved=true;if(drag.moved&&this.tool==='orbit'&&this.mode==='orbit'){this.yaw-=dx*.007;this.elevation=clamp(this.elevation+dy*.005,.3,1.35);}drag.x=event.clientX;drag.y=event.clientY;});
  canvas.addEventListener('pointerup',event=>{if(drag&&!drag.moved&&this.tool!=='orbit'){const rect=canvas.getBoundingClientRect();this.pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);this.raycaster.setFromCamera(this.pointer,this.camera);const hit=this.raycaster.intersectObject(this.floor)[0];if(hit)this.onPlace(this.tool,hit.point);}drag=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);});canvas.addEventListener('pointercancel',()=>drag=null);canvas.addEventListener('lostpointercapture',()=>drag=null);canvas.addEventListener('wheel',event=>{event.preventDefault();this.zoom=clamp(this.zoom*Math.exp(event.deltaY*.001),.5,1.5);},{passive:false});
 }
 resize(){const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
 syncObjects(model){
  const activeFood=new Set(model.foods.filter(food=>food.active).map(food=>food.id));for(const [id,group] of this.foods){if(!activeFood.has(id)){this.scene.remove(group);group.traverse(node=>{node.geometry?.dispose();node.material?.dispose();});this.foods.delete(id);}}
  for(const food of model.foods){if(!food.active||this.foods.has(food.id))continue;const group=new THREE.Group();group.position.set(food.x,0,food.z);const plate=new THREE.Mesh(new THREE.CylinderGeometry(.36,.31,.05,20),this.material('#ede2bd'));plate.position.y=.05;group.add(plate);for(let i=0;i<3;i++){const fruit=new THREE.Mesh(new THREE.SphereGeometry(.13,12,9),this.material(i%2?'#d69b42':'#b66d45',{emissive:'#945b22',emissiveIntensity:.17}));fruit.position.set((i-1)*.14,.2,i%2*.1);group.add(fruit);}const halo=new THREE.Mesh(new THREE.RingGeometry(.44,.48,32),new THREE.MeshBasicMaterial({color:'#dba653',side:THREE.DoubleSide,transparent:true,opacity:.7}));halo.rotation.x=-Math.PI/2;halo.position.y=.01;group.add(halo);this.scene.add(group);this.foods.set(food.id,group);}
  const ballIds=new Set(model.balls.map(ball=>ball.id));for(const [id,mesh] of this.balls)if(!ballIds.has(id)){this.scene.remove(mesh);mesh.geometry.dispose();mesh.material.dispose();this.balls.delete(id);}
  for(const ball of model.balls){let mesh=this.balls.get(ball.id);if(!mesh){mesh=new THREE.Mesh(new THREE.SphereGeometry(ball.r,22,16),this.material('#b7654e',{roughness:.38}));mesh.castShadow=true;this.scene.add(mesh);this.balls.set(ball.id,mesh);}mesh.position.set(ball.x,ball.y,ball.z);}
 }
 odorField(model){
  const env=model.environment,grid=env.grid,count=grid.nx*grid.ny*grid.nz;
  if(!this.odor||this.odorCount!==count){if(this.odor){this.scene.remove(this.odor);this.odor.geometry.dispose();this.odor.material.dispose();}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(count*3),3));this.odor=new THREE.Points(geometry,new THREE.PointsMaterial({color:'#c4d29a',size:.045,transparent:true,opacity:.3,depthWrite:false}));this.odor.frustumCulled=false;this.scene.add(this.odor);this.odorCount=count;this.lastEnvironment=null;}
  this.odor.visible=this.showOdor;if(!this.showOdor||this.lastEnvironment===env&&this.lastFieldFrame===env.frame)return;this.lastEnvironment=env;this.lastFieldFrame=env.frame;
  const positions=this.odor.geometry.attributes.position.array;let used=0;for(let y=0;y<grid.ny;y++)for(let z=0;z<grid.nz;z++)for(let x=0;x<grid.nx;x++){const index=(y*grid.nz+z)*grid.nx+x;if(grid.mask[index]||env.odor[index]<.0015)continue;positions[used*3]=-SIZE/2+(x+.5)*SIZE/grid.nx;positions[used*3+1]=(y+.5)*3.2/grid.ny;positions[used*3+2]=-SIZE/2+(z+.5)*SIZE/grid.nz;used++;}this.odor.geometry.setDrawRange(0,used);this.odor.geometry.attributes.position.needsUpdate=true;
 }
 draw(model){
  this.syncObjects(model);this.odorField(model);const b=model.body,speed=Math.hypot(b.vx,b.vz);this.bodyRoot.position.set(b.x,b.y,b.z);this.bodyRoot.rotation.y=b.yaw;this.bodyPose.rotation.set(0,0,b.fallen?(b.roll<0?-1:1)*Math.PI/2:b.roll);this.bodyPose.position.y=b.fallen?.28:Math.sin(b.phase*2)*Math.min(.018,speed*.01);this.head.visible=this.mode!=='first';
  this.legs.forEach((leg,index)=>{const phase=b.phase+index*Math.PI;leg.root.rotation.x=b.fallen?.25:Math.sin(phase)*Math.min(.48,speed*.3);leg.knee.rotation.x=Math.max(0,-Math.sin(phase))*.5;});
  this.arms.forEach((arm,index)=>{const side=index?1:-1;arm.root.rotation.set(-Math.sin(b.phase+index*Math.PI)*Math.min(.38,speed*.3),0,side*.09);arm.elbow.rotation.x=-.12;if(model.nodes.flight>.25){arm.root.rotation.z=-side*(.5+Math.sin(model.time*21)*.55)*model.nodes.flight;arm.elbow.rotation.x=-.3;}if(model.nodes.groom>.3){arm.root.rotation.x=-1.65;arm.root.rotation.z=-side*.35;arm.elbow.rotation.x=-1.1+Math.sin(model.time*14+index)*.18;}if(model.pickupId){arm.root.rotation.x=-.9;arm.elbow.rotation.x=-.55;}});
  this.leftMaterial.emissiveIntensity=model.nodes.left*.8;this.rightMaterial.emissiveIntensity=model.nodes.right*.8;
  const positions=this.trail.geometry.attributes.position;model.trail.forEach((point,index)=>positions.setXYZ(index,point.x,.025,point.z));this.trail.geometry.setDrawRange(0,model.trail.length);positions.needsUpdate=true;this.heading.position.set(b.x,b.y+.07,b.z);this.heading.setDirection(new THREE.Vector3(Math.sin(b.yaw),0,Math.cos(b.yaw)));this.heading.visible=!b.fallen;
  this.home.material.color.set(model.collected>=3?'#dcdd81':'#63a7a1');
  if(this.mode==='orbit'){const distance=SIZE*1.55*this.zoom;this.camera.position.set(Math.sin(this.yaw)*Math.cos(this.elevation)*distance,Math.sin(this.elevation)*distance,Math.cos(this.yaw)*Math.cos(this.elevation)*distance);this.camera.lookAt(0,.65,0);}
  else if(this.mode==='follow'){this.camera.position.set(b.x-Math.sin(b.yaw)*5.5,b.y+3.1,b.z-Math.cos(b.yaw)*5.5);this.camera.lookAt(b.x,b.y+1,b.z);}
  else{this.camera.position.set(b.x+Math.sin(b.yaw)*.21,b.y+1.65,b.z+Math.cos(b.yaw)*.21);this.camera.lookAt(b.x+Math.sin(b.yaw)*5,b.y+1.5,b.z+Math.cos(b.yaw)*5);}
  this.renderer.render(this.scene,this.camera);
 }
}
