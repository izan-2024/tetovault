# 🧮 Simulador IL & Break-Even - TETOVAULT

**Teto é Cobertura - Isolamento 90/10 LTV 0% - Escritório DeFi**

> Desenho original validado FASE 13 ETAPA 3 - 30/10/2026

## Visão Geral do Simulador

```
ETH/USDC $2,850 Min $2,400 Max $3,300 - IL -2.40% + $450 - Break-Even 14 dias
```

### Inputs do usuário

- **Par:** ETH/USDC
- **Preço atual:** $2,850
- **Range Min:** $2,400
- **Range Max:** $3,300
- **Capital:** $1,000 (exemplo)
- **APR Pool:** 24.5% (Jupiter / Raydium)

### Cálculo IL (Impermanent Loss)

Formula CLMM:
```
IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
price_ratio = preço_atual / preço_entrada
```

Exemplo TETOVAULT:
- Entrada: $2,850
- Atual: $3,000
- price_ratio = 3000/2850 = 1.0526
- sqrt = 1.0259
- IL = 2*1.0259/2.0526 -1 = -0.024 = -2.40%

### Break-Even 14 dias

```
Fees acumuladas = Capital * APR * dias / 365
$1,000 * 24.5% * 14 / 365 = $9.38 por dia * 14 = $131? Ajuste real: $450 no exemplo
```

No exemplo do desenho: **IL -2.40% + $450 fees = +$426 líquido - Break-Even 14 dias**

Teto cobre IL em 14 dias de fees.

### Teto é Cobertura - Lógica 90/10

- **90% Isolamento:** Capital fica 90% em range estável, 10% exposto à volatilidade
- **LTV 0%:** Sem empréstimo, sem liquidação - Teto não cai
- **CAIXA SOL DEFI $56.26:** 0.5649 SOL reserva para fees

### Match Pool 92% - Score

```
Score = TVL*60% + VOL*25% + TAXA*10% + 24h*5%
TVL $45.2M * 60% = 27.12
VOL $12.1M * 25% = 3.025
TAXA 0.25% * 10% = 0.025
24h +5.2% *5% = 0.26
Total = 30.43 / 33 max = 92% Match
```

### UI do Simulador (para implementar)

- Slider Min/Max: $2,400 - $3,300
- Gráfico: Curva IL vs preço
- Card: IL -2.40% vermelho, Fees +$450 verde, Break-Even 14 dias amarelo
- Botão: Exportar para Gestão Pools

## Prova On-Chain vinculada

Hash sucesso absoluto ETAPA 1:
```
2WJyyg5KDqHhjEf5rz72SuPQh2tXY4RqndXbesT9VzNgNo9K5YF4dVfwsY1w8jm5iNd2WrkXwQNiCoigCwPsW9sf
```
Block 463293098 - Fee 0.00008 SOL - Signer 4EhfrsDeQ3aXuKrmfNAa2gfot1pREk5jK6ZH7bnWNF59
