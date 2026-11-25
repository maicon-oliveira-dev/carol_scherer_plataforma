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
| O Boticário | 773 cards ativos (piloto + lotes 1 a 38). | Fim do PDF do ciclo 16/2026 na [fila atual](boticario-fila-32-34.v1.json). Lote final com 17 produtos, aprovado em tela. |

## Importador local de O Boticário

Use Node.js 18+ e, para extrair o PDF, Python com PyMuPDF. A extração usa a numeração física do arquivo e conserva o SKU como texto. O importador confere a impressão digital do PDF nas retomadas.

```powershell
$catalogo = "$env:USERPROFILE/Downloads/catalogos/catalogo_boticario_202616.pdf"
node tools/importar-boticario.js --simular --pdf "$catalogo"
node tools/importar-boticario.js --preparar --pdf "$catalogo"
```

A primeira execução simula a extração e valida a proposta em memória. A segunda grava [a fila por SKU](boticario-fila-25-27.v1.json) e os três manifestos inativos em `data/boticario-preparacao/`. Para outra rodada, use `--fila caminho.json` com a mesma estrutura, informando a fonte, o primeiro lote e o ponto inicial do PDF.

- `ordem` guarda a sequência do PDF. `porSku` registra página, trecho, ficha, foto, status e motivo. O importador pula SKUs já cadastrados e traz evidências por SKU da auditoria existente.
- Busque primeiro pelo nome, linha e volume na loja oficial. Confira marca, variante e apresentação. Use o SKU da ficha confirmada e guarde o código do PDF em `skuPdf` quando divergir. Se a busca por nome informar que não encontrou produtos em estoque, deixe a referência fora da rodada e registre o motivo.
- Mantenha como `pendente` todo item ainda sem correspondência exata entre o PDF, a ficha e a foto. Use `excluido` com o motivo para itens fora do escopo. Cadastre a foto oficial com o nome do SKU e marque `conferido` com `motivo: null` e `produto` no formato do manifesto v1 após revisar o item e a foto.
- A extração busca até 60 candidatos além das exclusões por padrão. Use `--candidatos N` com `--pdf` para ampliar a fila quando existirem pendências sem solução imediata. O próximo SKU ainda fora da fila fica em `retomada`. A saída também indica o primeiro pendente já registrado. Omita `--pdf` para validar e agrupar apenas a fila existente.
- Após atualizar a fila, rode novamente `--simular` e depois `--preparar`. Os lotes usam até 20 itens conferidos cada. A etapa de publicação segue a regra abaixo.

## Regra de publicação

Cada grupo fica local até a aprovação visual. Só então deve ser commitado e enviado à `main`.
