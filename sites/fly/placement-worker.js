import {createSimulation,prepareEnvironment,step,metrics,buildCandidates,summarize,pairedImprovement,PROFILES} from './placement-model.js?v=20260914j';
self.onmessage=({data})=>{
 const {jobId,config,saved}=data;
 try{
  const profile=PROFILES[config.accuracy]||PROFILES.precise,candidates=buildCandidates(config,saved),searchSeeds=Array.from({length:profile.search},(_,index)=>(config.seed+0x1f123bb5+index*104729)>>>0),seeds=Array.from({length:profile.confirm},(_,index)=>(config.seed+0x6e624eb7+index*104729)>>>0);
  let completed=0,total=candidates.length*searchSeeds.length+seeds.length*(candidates.length>1?3:2),phase='search';
  const progress=()=>self.postMessage({jobId,type:'progress',completed,total,phase});
  const evaluate=(devices,runSeeds)=>{
   const layout={...config,devices},environment=prepareEnvironment(layout,true),rows=[];
   for(const seed of runSeeds){const sim=createSimulation(layout,seed,environment);while(!sim.done)step(sim);rows.push(metrics(sim));completed++;progress();}
   return rows;
  };
  progress();
  const screening=candidates.map(candidate=>({...candidate,...summarize(evaluate(candidate.devices,searchSeeds))}));
  // Freeze the challenger before seeing any of the independent confirmation runs.
  const challenger=screening.filter(candidate=>candidate.id!=='current').sort((a,b)=>b.reduction-a.reduction||b.captured-a.captured)[0];
  phase='confirm';progress();
  const baseline=summarize(evaluate([],seeds)),current=candidates[0],currentRows=evaluate(current.devices,seeds),results=[{...current,...summarize(currentRows)}];
  let paired=null,recommendedId='current';
  if(challenger){const rows=evaluate(challenger.devices,seeds);results.push({...challenger,...summarize(rows)});paired=pairedImprovement(currentRows,rows);if(paired.low>0)recommendedId=challenger.id;}
  self.postMessage({jobId,type:'done',baseline,results,seeds,searchSeeds,screenCount:candidates.length,searchRepeats:searchSeeds.length,confirmRepeats:seeds.length,paired,recommendedId,accuracy:config.accuracy});
 }catch(error){self.postMessage({jobId,type:'error',message:String(error?.message||error)});}
};
