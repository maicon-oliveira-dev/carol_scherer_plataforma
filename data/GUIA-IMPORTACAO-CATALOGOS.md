# Operação de importação de catálogos

## Estrutura preservada

- Cada lote é um manifesto versionado e independente em `data/`.
- As imagens oficiais ficam em `assets/images/catalogos/<marca>/`, nomeadas pelo SKU.
- Um lote só é publicado quando `ativo` estiver como `true` e estiver listado no carregador da marca.
- Produtos já aprovados não são editados para acomodar um novo lote; correções entram em um novo ciclo auditado.

## Checklist antes de ativar um lote

1. Confirmar SKU, variante, volume e apresentação no PDF e na ficha oficial.
2. Incluir cosméticos unitários e refis avulsos com SKU e foto oficial identificados. Excluir kits, combos, presentes, acessórios e embalagens múltiplas. A disponibilidade no site da marca não impede o cadastro. A disponibilidade para compra é confirmada com a Carol pelo WhatsApp.
3. Salvar apenas a imagem oficial da variante exata, com embalagem inteira, centralizada e nítida.
4. Verificar que o SKU não existe nos manifestos ativos da mesma marca.
5. Atualizar a auditoria da marca com páginas consultadas, exclusões e próximo SKU de retomada.
6. Executar `node tools/validar-catalogos.js` e conferir a página em tela antes do commit.

## Pontos de retomada atuais

| Marca | Estado local | Próxima auditoria |
| --- | --- | --- |
| Natura | 695 cards ativos | Aguardando uma nova fonte ou decisão sobre os itens pendentes. |
| O Boticário | 536 cards ativos (piloto + lotes 1 a 24) | Página 124 do PDF do ciclo 16/2026, a partir do SKU `B90717`. |

## Regra de publicação

Cada grupo fica local até a aprovação visual. Só então deve ser commitado e enviado à `main`.
