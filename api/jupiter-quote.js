export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers','Content-Type'); if(req.method==='OPTIONS') return res.status(200).end();
  const inAmount=req.query.inAmount||'10000000'; const slippageBps=req.query.slippageBps||'50';
  const inputMint='So11111111111111111111111111111111111111112'; const outputMint='EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  const url=`https://api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${inAmount}&slippageBps=${slippageBps}&onlyDirectRoutes=false&asLegacyTransaction=false&maxAccounts=20`;
  try{
    const r=await fetch(url,{headers:{'Accept':'application/json','User-Agent':'Mozilla/5.0 TETOVAULT/13.0','Origin':'https://tetovault.vercel.app','Referer':'https://tetovault.vercel.app/'},signal:AbortSignal.timeout(20000)});
    const t=await r.text(); let j; try{j=JSON.parse(t);}catch(e){return res.status(r.status).json({error:`Non-JSON ${r.status} ${t.slice(0,800)}`,_src:'v13-quote-non-json'});}
    if(!r.ok) return res.status(r.status).json({error:j.error||t.slice(0,800),_src:'v13-quote-error',_status:r.status});
    j._src='tetovault-v13-quote-real-client-bypass'; return res.status(200).json(j);
  }catch(e){ return res.status(200).json({error:e.message,_src:'v13-quote-exception'}); }
}
