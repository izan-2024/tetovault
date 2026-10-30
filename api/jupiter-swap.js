export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers','Content-Type, Accept'); if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({error:'POST required',_src:'v13-swap-method'});
  try{
    const {quoteResponse,userPublicKey}=req.body||{}; if(!quoteResponse||!userPublicKey) return res.status(400).json({error:'quoteResponse e userPublicKey obrigatórios',_src:'v13-swap-missing',swapTransaction:null});
    const url='https://api.jup.ag/swap/v1/swap';
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json','User-Agent':'Mozilla/5.0 TETOVAULT/13.0','Origin':'https://tetovault.vercel.app','Referer':'https://tetovault.vercel.app/'},body:JSON.stringify({quoteResponse,userPublicKey,wrapAndUnwrapSol:true,dynamicComputeUnitLimit:true,prioritizationFeeLamports:'auto',asLegacyTransaction:false,useSharedAccounts:true,dynamicSlippage:{maxBps:100}}),signal:AbortSignal.timeout(20000)});
    const t=await r.text(); let j; try{j=JSON.parse(t);}catch(e){return res.status(r.status).json({error:`Non-JSON ${r.status} ${t.slice(0,800)}`,_src:'v13-swap-non-json',swapTransaction:null});}
    if(!r.ok||!j.swapTransaction) return res.status(r.status).json({error:j.error||t.slice(0,800),_src:'v13-swap-error',swapTransaction:null});
    j._src='tetovault-v13-swap-real'; return res.status(200).json(j);
  }catch(e){ return res.status(200).json({error:e.message,_src:'v13-swap-exception',swapTransaction:null}); }
}
