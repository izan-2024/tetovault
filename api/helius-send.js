// TETOVAULT V13 FINAL PURO - HELIUS SEND REAL ONLY - ZERO MOCK - FASE 13 ETAPA 1
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  const started=Date.now();
  try{
    const {signedTransaction}=req.body||{};
    if(!signedTransaction){
      return res.status(400).json({error:'signedTransaction base64 obrigatório',_src:'v13-missing-signed-tx',signature:null,success:false});
    }
    const rpcUrl=(process.env.HELIUS_RPC_URL||'').trim();
    if(!rpcUrl){
      return res.status(200).json({
        error:'HELIUS_RPC_URL não configurado - Vá em Vercel Settings > Environment Variables > HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=SUA_CHAVE > Save > Redeploy',
        _src:'v13-helius-missing-env',
        signature:null, success:false, _fase:'TETOVAULT V13 FINAL PURO - SEM MOCK'
      });
    }
    // Log safe prefix
    console.log(`[TETOVAULT-V13] SEND start rpc=${rpcUrl.slice(0,35)}... signedLen=${signedTransaction.length} time=${new Date().toISOString()}`);
    const r=await fetch(rpcUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        jsonrpc:'2.0',id:1,method:'sendTransaction',
        params:[signedTransaction,{encoding:'base64',preflightCommitment:'confirmed',skipPreflight:false,maxRetries:3}]
      }),
      signal:AbortSignal.timeout(30000)
    });
    const text=await r.text();
    console.log(`[TETOVAULT-V13] RPC raw status=${r.status} body=${text.slice(0,800)}`);
    let data;
    try{ data=JSON.parse(text); }catch(e){
      return res.status(200).json({
        error:`RPC retornou non-JSON status ${r.status}: ${text.slice(0,1000)}`,
        _src:'v13-non-json',
        signature:null, success:false, _raw:text.slice(0,1500), rpcStatus:r.status
      });
    }
    if(data.error){
      return res.status(200).json({
        error:`RPC Error: ${JSON.stringify(data.error).slice(0,1500)}`,
        _src:'v13-rpc-error',
        signature:null, success:false, _raw:JSON.stringify(data.error).slice(0,2000)
      });
    }
    if(!data.result || typeof data.result!=='string' || data.result.length<80){
      return res.status(200).json({
        error:`RPC sem result válido: ${text.slice(0,1000)}`,
        _src:'v13-no-result',
        signature:null, success:false, _raw:text.slice(0,2000)
      });
    }
    console.log(`[TETOVAULT-V13] SUCCESS signature=${data.result} solscan=https://solscan.io/tx/${data.result} elapsed=${Date.now()-started}ms`);
    return res.status(200).json({
      signature:data.result,
      _src:'tetovault-v13-final-puro-real-only-zero-mock',
      _fase:'TETOVAULT V13 - Hash Real Verificável - Zero Absoluto - Teto é Cobertura',
      solscan:`https://solscan.io/tx/${data.result}`,
      success:true,
      elapsedMs:Date.now()-started
    });
  }catch(e){
    console.error(`[TETOVAULT-V13] EXCEPTION ${e.message} stack=${e.stack?.slice(0,800)} elapsed=${Date.now()-started}ms`);
    return res.status(200).json({
      error:`Exception: ${e.message}`,
      _src:'v13-exception',
      signature:null,
      success:false,
      _stack:e.stack?.slice(0,2000)
    });
  }
}
