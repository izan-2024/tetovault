# 📊 Arquitetura 10 Módulos - TETOVAULT feLPools adaptado

## Topbar
- PT/EN - USD/BRL - CAIXA SOL DEFI $56.26 - 0.5649 SOL - 4Ehfrs...NF59

## Sidebar

### 1. 📊 Dashboard
- Visão geral CAIXA SOL, saldo 0.5649→0.5549, último TX 2WJyyg5K... SUCCESS
- TVL total, Fees acumuladas, IL total

### 2. 🧮 Simulador IL & Break-Even
- Inputs: ETH/USDC $2,850 Min $2,400 Max $3,300
- Outputs: IL -2.40% + $450 - Break-Even 14 dias
- Gráfico IL curve, Teto 90/10

### 3. 📁 Gestão Pools - Minhas Pools
- Lista pools ativas, range, APR, IL, fees
- Botão Rebalance, Coletar Fees

### 4. 🔍 Explorar - EXPLORAR POOLS
- TVL $45.2M VOL $12.1M APR 24.5%
- Filtros: TVL 60% VOL 25% TAXA 10% 24h 5%
- Card pool: APR estimado X.X% - MATCH DE POOL Score 92%
- Botão: Simular no Simulador

### 5. 🎯 Match Pool 92%
- Algoritmo determinístico Score 92%
- Inputs: TVL, VOL, Taxa, Variação 24h
- Output: Lista ordenada por Match
- Assistente IA determinística sugere top 3

### 6. 🤖 Assistente IA determinística
- Chat: "Qual melhor pool para $1k em 14 dias?"
- Resposta baseada em Score 92% + Simulador Break-Even
- Sem LLM aleatório - Regras fixas

### 7. 📥 Importar Carteira
- Phantom Connect - 4Ehfrs...NF59 - Helius balance
- Importar CSV Raydium/Jupiter

### 8. 🔔 Alertas Telegram
- Bot: IL > -5%, Pool fora do range, Break-Even atingido
- Integração Telegram API

### 9. 🎮 Jornada - Gamificação
- Níveis: Teto Iniciante → Teto Mestre
- XP por: Simular, Criar pool, Coletar fees, Match 92%

### 10. ⚙️ Config LGPD
- PT/EN, USD/BRL, Tema claro/escuro
- LGPD: Deletar dados, Exportar CSV
- Domínio futuro: tetovault.xyz

## Fluxo feLPools → TETOVAULT

```
Landing (Teto é Cobertura) → Dashboard (CAIXA SOL) → Simulador (IL Break-Even 14d) → Explorar (TVL 60%...) → Match 92% → Gestão Pools → Alertas → Jornada
```

## Stack técnico

- Frontend: V14.2 - index.html NO-MODULE - clique 100% BASE 16:11:07+17:28:14 - vercel.json rewrites destination
- Backend: api/helius-send.js 3371B REAL ONLY, helius-balance, jupiter-quote/swap
- RPC: Helius Crownwell 2/1M
- Repo: github.com/izan-2024/tetovault - V14.2 15.4KB
- Prova: 2WJyyg5KDqHhjEf5rz72SuPQh2tXY4RqndXbesT9VzNgNo9K5YF4dVfwsY1w8jm5iNd2WrkXwQNiCoigCwPsW9sf SUCCESS Finalized Block 463293098
- Vercel: tetovault.vercel.app - Ready - V14.2 Anti-404 destination fix

## Próximos

ETAPA 4: tetovault.xyz domínio oficial + SSL + redirect vercel.app → xyz
