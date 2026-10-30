export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*'); if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const sig=req.query.signature;
    if(!sig) return res.status(400).json({error:'signature obrigatória',_src:'v13-confirm-missing'});
    const rpcUrl=(process.env.HELIUS_RPC_URL||'').trim()||'https://api.mainnet-beta.solana.com';
    const r=await fetch(rpcUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getSignatureStatuses',params:[[sig],{searchTransactionHistory:true}]}),signal:AbortSignal.timeout(15000)});
    const j=await r.json();
    const st=j.result?.value?.[0];
    return res.status(200).json({signature:sig,status:st?.confirmationStatus||'not-found',err:st?.err||null,success:!st?.err && !!st,_src:'tetovault-v13-confirm-real',solscan:`https://solscan.io/tx/${sig}`,raw:st||null});
  }catch(e){ return res.status(200).json({signature:req.query.signature,status:'error',success:false,_src:'v13-confirm-exception',_error:e.message}); }
}
