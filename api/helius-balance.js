export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*'); if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const pubkey=req.query.pubkey||'4EhfrsDeQ3aXuKrmfNAa2gfot1pREk5jK6ZH7bnWNF59';
    const rpcUrl=(process.env.HELIUS_RPC_URL||'').trim()||'https://api.mainnet-beta.solana.com';
    const r=await fetch(rpcUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getBalance',params:[pubkey]}),signal:AbortSignal.timeout(15000)});
    const j=await r.json();
    if(j.error) throw new Error(JSON.stringify(j.error));
    const lam=j.result?.value??0; const sol=lam/1e9;
    return res.status(200).json({pubkey,lamports:lam,sol,solFormatted:`${sol} SOL`,_src:'tetovault-v13-balance-real'});
  }catch(e){ return res.status(200).json({error:e.message,_src:'v13-balance-exception'}); }
}
