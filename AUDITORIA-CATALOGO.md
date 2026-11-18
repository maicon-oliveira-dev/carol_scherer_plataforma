# Auditoria técnica do catálogo Carol Scherer

**Data:** 18/11/2026  
**Base:** checkout local, HEAD `4e0fd08`, com alteração preexistente em `assets/css/style.css`.

## Resumo da arquitetura

O projeto é um site estático multipágina com 16 documentos HTML em português, uma folha CSS compartilhada e JavaScript nativo carregado com `defer`. As rotas são caminhos de arquivos. O navegador cria cards, filtros, menus e vitrines a partir do array `products` em `assets/js/app.js`. O README sugere servir a pasta com o servidor HTTP do Python. O checkout não contém manifesto de dependências, etapa de build ou configuração de publicação.

| Área | Estado observado |
| --- | --- |
| Banco, schema, migrations e ORM | Ausentes no checkout. A pasta local `data/` está vazia. O modelo efetivo é a estrutura dos objetos JavaScript. Jequiti e Biozenthi usam funções auxiliares com defaults, sem contrato de validação. |
| Autenticação, permissões e administração | As páginas e os dados do catálogo são públicos. O código local não contém login, papéis, painel, API administrativa ou operação remota de escrita. A fronteira para aprovar e publicar alterações está no controle do repositório e da hospedagem, cujas permissões não foram inspecionadas. |
| Imagens | Arquivos locais em `assets/images/`. Produtos legados em `products/` e `produtos_30_10_2025/`, Jequiti em `catalogos/jequiti/` e Biozenthi em `biozenthi_catalogo/`. Banners e logos têm diretórios próprios. Há arquivos com nomes Natura em `products/`, sem associação a registros ativos ou comprovação local de origem oficial. |
| Integrações e ambiente | Links públicos para WhatsApp e Instagram e importação CSS do Google Fonts (DM Sans e Playfair Display). O contato do WhatsApp está embutido no HTML e no JS. Nenhuma variável de ambiente ou credencial é exigida pelo código rastreado. O endereço oficial por produto na loja da Carol e as condições da hospedagem ainda precisam ser confirmados. |
| Validação, logs e testes | Há checagem de carregamento da imagem e opções de filtro derivadas dos dados. Não foram encontrados testes, lint, CI, schema, relatório de importação ou logs operacionais. Falhas de imagem são descartadas sem diagnóstico. O único uso de `localStorage` guarda a preferência de tema. |

## Rotas e arquivos relevantes

| Arquivo ou área | Comportamento |
| --- | --- |
| [index.html](index.html) | Home com campanhas, explorador de categorias e vitrine de favoritos. A vitrine usa o array geral, com filtros de categorias fixos no HTML e renderização própria. |
| [Todos os produtos](pages/todos-os-produtos.html), [Feminino](pages/feminino.html) e [Masculino](pages/masculino.html) | Grade `#products`, busca e filtros de marca, categoria e tipo. Feminino e Masculino dependem de `audience` e incluem itens unissex. O parâmetro `marca` só é aplicado se constar nas opções carregadas. |
| [Marcas](pages/marcas.html) e [páginas de marca](pages/marcas/) | Índice e dez rotas individuais. O seletor `#brand-products` usa a marca indicada em `data-brand`. Jequiti e Biozenthi são as únicas marcas com registros ativos. |
| [Natura](pages/marcas/natura.html) | Rota existente com estado vazio, filtro por tipo e rodapé de contato. É o ponto recomendado para a primeira publicação. |
| [Sobre](pages/sobre.html) | Página institucional sem lista de produtos. Usa estilos e script compartilhados. |
| [JavaScript](assets/js/app.js#L29) | Define produtos, [contextos e busca](assets/js/app.js#L75), menu, [cards](assets/js/app.js#L208), [carregamento e grades](assets/js/app.js#L281), selects, carrossel e [favoritos](assets/js/app.js#L574). Usa `textContent` para o texto dos produtos e encoding para as mensagens do WhatsApp. |
| [CSS](assets/css/style.css) e [README](README.md) | CSS centralizado com variáveis de tema, grades e estilos responsivos. README descreve a execução local, imagens e um cadastro de produtos que diverge do código atual. |

## Riscos e pontos de melhoria

| Prioridade | Evidência e impacto |
| --- | --- |
| **P1 · Bloqueia publicar Natura** | Os cards e a vitrine geram links de WhatsApp. A estrutura atual não tem campo para o link da loja. É preciso confirmar a origem oficial das imagens, o endereço da loja da Carol e o vínculo de cada destino com o SKU. Os arquivos locais com nome Natura, por si só, não comprovam esse vínculo. |
| **P1 · Bloqueia importar** | Sem validação de campos, unicidade e processo de lote, o array aceita dados incompletos. Dos 121 registros, 71 são Biozenthi e 50 Jequiti. Seis têm código principal vazio: três Biozenthi e três agrupamentos de variações Jequiti. O código principal Biozenthi `1656` aparece duas vezes, sem IDs repetidos. O código Biozenthi é derivado do nome do arquivo e pode faltar. Esses casos exigem um contrato próprio para Natura. |
| **P1 · Bloqueia publicar dados novos sem validação de URLs** | Os dados atuais entram no DOM como texto e a consulta usa destino fixo. O catálogo futuro passará a receber URLs por registro. A atribuição de `href` exige validação prévia de protocolo, domínio, identificação da loja e redirecionamentos. A resolução atual de imagens também aceita URLs absolutas. As permissões de implantação e os cabeçalhos HTTP, incluindo CSP, dependem da hospedagem e não puderam ser avaliados localmente. |
| **P2 · Compatibilidade entre vitrines** | O modelo atual depende de `brand`, `productType`, `audience` e `shortDescription`. Inserir os seis novos campos diretamente no array afetaria busca, filtros e seleção por marca. Acrescentar produtos ao array geral também pode incluí-los automaticamente na home e no menu. O escopo inicial precisa ser explícito. |
| **P2 · Exibição e desempenho** | `loadProducts` e a home aguardam todas as sondagens de imagem antes de mostrar a grade e descartam as falhas silenciosamente. São 185 arquivos de imagem, cerca de 185 MiB no total em disco. Esse total não representa o tráfego de uma página. Os cards atuais têm carregamento preguiçoso, mas a sondagem anterior já solicita imagens. |
| **P2 · Exemplo desatualizado e falta de verificação** | O README afirma que o array está vazio, mostra um exemplo cujo significado de categoria diverge do uso atual e sugere cadastrar preços e estoque. A auditoria não encontrou preço no catálogo ativo. Para Natura, preço deve ser excluído da entrada aceita, dos textos publicados e da interface. Algumas descrições Biozenthi são geradas diretamente do nome, o que não serve como evidência de revisão editorial. |
| **P3 · Duplicações e código sem uso identificado** | A home duplica card e sondagem de imagens. Grades geral e por marca repetem parte da lógica de filtros e estado vazio. Cabeçalhos, rodapés e templates de marca se repetem no HTML. `showOnlyUsefulFilters` é declarado sem consumidor e o refinamento por `audience` na grade de marca não tem controle definido. A renderização de cards com variações registra eventos globais de ponteiro a cada recriação e pode reter handlers antigos. |
| **P3 · Imagens redundantes e acervo legado** | A comparação SHA-256 encontrou dois banners idênticos: `banner-todos-os-produtos.png` e `banner_todos_os_prodotos/Coleção de beleza em luxo sóbrio.png`. Imagens de produtos antigas sem referência no catálogo ativo são candidatas a inventário antes de qualquer remoção. |

Não foi identificada uma falha de autorização em rotas locais porque não há operações privilegiadas nelas. A confirmação de quem pode aprovar e publicar o lote cabe à verificação da conta de hospedagem e do repositório antes da implantação.

## Modelo sugerido para Produto Natura

Para o primeiro lote, a recomendação é um manifesto JSON versionado, com a marca definida pelo contexto da coleção Natura. Cada registro tem exatamente os seis campos obrigatórios abaixo. A chave única é o SKU canônico dentro da coleção.

| Campo | Regra proposta |
| --- | --- |
| `sku` | String não vazia com o código oficial. Remover espaços externos e preservar zeros à esquerda, pontuação significativa e código por variante. Aplicar comparação sem distinção de caixa somente se a regra oficial do SKU confirmar essa equivalência. |
| `nome` | Texto simples obrigatório, fiel à variante oficial. |
| `descricao` | Texto simples obrigatório e revisado, livre de HTML, preços e texto promocional com valores. |
| `categoria` | Valor de uma lista aprovada para Natura. Documentar o mapeamento para a navegação existente quando houver integração com outras vitrines. |
| `imagemOficial` | Caminho local versionado para a imagem oficial verificada, vinculada ao SKU e com uso autorizado. Verificar existência, formato real, integridade e limite de tamanho. |
| `linkLojaCarol` | URL HTTPS da loja da Carol, verificada para o SKU e a variante. Restringir hosts e caminho à loja aprovada e verificar também o destino final quando houver redirecionamento. |

A trilha de aprovação, a origem da imagem, os hashes e a versão do lote ficam em registro operacional externo ao manifesto de produtos. Campos extras, incluindo preço, estoque e dados internos, são rejeitados pelo contrato Natura.

## Plano para a primeira implementação oficial

1. Confirmar o domínio e o padrão de URL da loja da Carol, a fonte oficial e o direito de uso das imagens, a taxonomia inicial e o responsável pela aprovação. Verificar como a hospedagem publica e restaura versões.
2. Preparar uma fonte de dados específica para Natura, com os seis campos, e ligar seu consumo à página Natura. Reutilizar estilos e padrões existentes de cards e busca, adaptando o CTA para a loja e os filtros aos campos disponíveis. Definir explicitamente se a primeira entrega inclui a visão Todos os produtos. Home e seleções por público dependem de uma decisão de curadoria.
3. Validar os 20 produtos e revisar uma prévia completa. Cobrir contagem, busca por SKU e nome, categoria, descrição, correspondência imagem/SKU, link da Carol, ausência de preços, navegação por teclado e visualização móvel. Conferir as páginas das outras marcas após integrar a fonte.
4. Publicar a revisão aprovada como uma única versão, registrar a revisão em produção e manter o artefato anterior disponível para reversão.

## Estratégia segura de importação e reversão

1. **Preparação.** Usar uma entrada revisada em UTF-8 com exatamente as seis colunas e 20 linhas de produto. Se a fonte comercial contiver preços, projetar os seis campos permitidos antes de gerar a entrada. Evitar cópias brutas nas saídas e nos logs. Reunir as imagens verificadas em área de preparação.
2. **Simulação.** Validar lote inteiro sem publicar. Rejeitar campos extras, vazios, texto com HTML ou preço, categorias desconhecidas e imagens ausentes, inválidas ou fora do diretório permitido. Conferir por revisão humana origem e variante. Validar URLs por parser e regras explícitas de HTTPS, host e caminho da loja. Verificar destino final e correspondência do produto com a página oficial.
3. **Unicidade e reexecução.** Indexar o lote e a versão ativa por SKU canônico. Duplicidade dentro do arquivo bloqueia o lote mesmo quando as linhas são iguais. SKU existente com conteúdo idêntico é uma reexecução sem mudança. SKU existente com diferença bloqueia publicação até uma atualização ser aprovada separadamente, com diff. Conferir o total final de 20 SKUs para a primeira versão oficial.
4. **Aprovação e aplicação.** Gerar relatório de simulação com linha, SKU, motivo e totais de inserções, reexecuções, conflitos e erros, sem dados sensíveis. Vincular a aprovação ao hash do manifesto e das imagens. Validar novamente contra a revisão ativa ao aplicar para evitar concorrência. Publicar arquivos e imagens juntos a partir do artefato de uma única revisão. Bloquear publicação parcial e confirmar a versão servida.
5. **Reversão.** Registrar identificador do lote, aprovador, data, hash, SKUs afetados e referências anterior e nova. Em falha após publicar, restaurar a versão anterior inteira com suas imagens, invalidar cache quando aplicável e verificar Natura e as demais vitrines. Se houver publicações posteriores, revisar o diff inverso do lote para preservar as mudanças independentes.

## Verificações efetuadas e limites

- A sintaxe do JavaScript passou em `node --check`.
- A análise local expandiu o array e verificou contagens, códigos principais, IDs e existência dos arquivos de imagem declarados, inclusive de variações. Não surgiram caminhos ausentes nessa checagem nem nas referências locais verificadas em HTML fora de comentários.
- A verificação foi estática e local. Não houve testes em navegador, consulta à loja, validação de autorização das imagens ou inspeção da hospedagem. A alteração CSS preexistente foi preservada.

## Auditoria do CTA Natura e do atendimento por WhatsApp

**Data:** 18/11/2026  
**Escopo:** estado local após a integração do lote piloto. As seções anteriores registram a auditoria que precedeu a implantação do catálogo. A análise abaixo é de leitura e a única edição desta etapa é este relatório.

### WhatsApp em Jequiti e Biozenthi

- As duas [páginas de marca](pages/marcas/) carregam `assets/js/app.js` e `assets/css/style.css`. A grade `#brand-products` usa `data-brand` para selecionar registros de `products`, verifica o carregamento da imagem e renderiza cada resultado com `productCard`. As duas marcas têm dados definidos no próprio JavaScript, sem manifesto JSON separado. [Grade por marca](assets/js/app.js#L317)
- Jequiti fornece `name`, `code`, descrição, categoria e imagem nos registros JS. Alguns produtos agrupam tons com `codeRange`, `toneRange` e variações que têm código próprio. Biozenthi converte tuplas com arquivo, linha, nome, categoria e tipo em objetos, deriva `code` do sufixo numérico do arquivo e usa string vazia quando o padrão não casa. O campo `whatsappMessage` existe nos defaults das duas marcas, mas o card monta a mensagem a partir dos campos efetivamente lidos. [Origem dos produtos](assets/js/app.js#L3)
- O card usa uma âncora `.favorite-link` com o rótulo **Consultar com a Carol ↗**. O número em formato internacional é **+55 47 99785-4773**. No link, vai apenas a sequência de dígitos, em `https://wa.me/5547997854773?text=`, seguida de `encodeURIComponent` sobre toda a mensagem unida por quebras de linha (`\n`). O clique segue a navegação padrão da âncora. Os links gerais de WhatsApp no HTML usam o mesmo número, sem mensagem por produto. [Gerador do CTA](assets/js/app.js#L221)
- O CSS compartilhado define o estilo, hover e foco de `.favorite-link`. Há um tratamento visual exclusivo para Jequiti a partir de `data-brand`. A home tem um fluxo próprio com a mensagem “Olá, Carol! Gostaria de saber mais sobre …”. A referência para Natura é o card das páginas de marca. [Estilo compartilhado](assets/css/style.css#L871) · [Estilo Jequiti](assets/css/style.css#L968) · [Vitrine da home](assets/js/app.js#L574)

Modelo exato inicial, com uma linha em branco após a saudação:

```text
Olá, Carol! Tenho interesse neste produto:

Produto: <nome>
Código: <código>
```

O código usa a primeira opção disponível em `selectedVariation?.code || product.code || product.codeRange`. A implementação atual sempre inclui a linha de código, inclusive se o valor final estiver ausente e a interpolação resultar em `undefined`. Depois dela:

- Com tom selecionado, acrescenta `Tom: <nome do tom>` e, se houver, `Volume: <volume>`. A seleção atualiza o link. Uma variação padrão pode ser selecionada já na renderização.
- Com variações e sem tom selecionado, acrescenta `Tons disponíveis: <faixa>` (fallback `J10 a J120`), volume se houver, linha em branco e `Informe o tom desejado no atendimento.`.
- Sem variações, acrescenta, quando presentes e nesta ordem, `Tom: <tom>`, `Fragrância: <fragrância>` e `Volume: <volume>`. [Composição da mensagem e seleção](assets/js/app.js#L222)

### Natura no estado atual

| Área | Estado verificado |
| --- | --- |
| Página | [natura.html](pages/marcas/natura.html) carrega `app.js`, `natura.js` e a folha de estilos compartilhada. Usa a grade isolada `#natura-products`. A página já contém links de contato direto para o mesmo WhatsApp, independentes dos cards. A busca de referências locais não encontrou URL da loja no HTML. |
| Dados e imagens | O [manifesto v1](data/natura-piloto.v1.json) está ativo e contém 20 registros, cada um com `sku`, `nome`, `descricao`, `categoria`, `imagemOficial` e `linkLojaCarol`. Todos os 20 links individuais usam `www.minhaloja.natura.com`. As imagens ficam no diretório [Natura](assets/images/catalogos/natura/). |
| Validação | [natura.js](assets/js/natura.js#L8) valida versão, ativação, quantidade, seis campos, SKU obrigatório e único, caminho de imagem e igualdade da URL com o padrão `https://www.minhaloja.natura.com/p/produto/NATBRA-<SKU>?consultoria=carolinescherer`. A renderização aguarda a decodificação das imagens. O validador local foi executado e retornou os 20 registros ativos. |
| CTA | [natura.js](assets/js/natura.js#L75) cria uma âncora `.favorite-link` com o rótulo **Comprar na loja da Carol ↗** e atribui `product.linkLojaCarol` diretamente ao `href`. As referências à loja no código de execução aparecem no manifesto e no JavaScript Natura, onde a URL também é exigida pela validação. |

### Alteração mínima proposta após autorização

Editar somente [assets/js/natura.js](assets/js/natura.js#L75). No ponto que cria a âncora do card, usar o rótulo **Consultar com a Carol ↗**, o mesmo número internacional e a mesma codificação das páginas de marca. Montar a mensagem com `product.nome` e, quando disponível, `product.sku`. A validação do lote continua exigindo SKU. A condição da mensagem apenas impede uma linha vazia caso a montagem seja reaproveitada em outro contexto.

```text
Olá, Carol! Tenho interesse neste produto:

Produto: <nome da planilha>
Código: <SKU da planilha>
```

Omitir a linha `Código:` quando a mensagem for construída sem SKU. O catálogo Natura atual não tem campos de tom, fragrância, volume ou variações. A opção de alterar só o CTA mantém o manifesto e sua validação integral, inclusive a URL histórica como dado exigido. Se houver uma decisão futura de remover os URLs também do manifesto público, isso exigirá uma alteração explícita no contrato e na validação e ficará fora da troca de destino proposta.

### Riscos, verificação e reversão

| Prioridade | Risco e verificação |
| --- | --- |
| Alta | Um destino antigo pode continuar em algum CTA se a atualização atingir só o texto. Conferir os 20 `href` renderizados, todos no mesmo `wa.me`, e verificar que cada mensagem decodificada tem o nome e o SKU corretos. O teste pode abrir o destino sem enviar mensagem. |
| Alta | Remover `linkLojaCarol` durante a troca violaria o contrato de seis campos e esconderia o lote inteiro. Preservar dados e executar o mesmo validador antes e depois da edição. |
| Média | Acentos, símbolos e quebras de linha podem corromper a consulta se a mensagem for concatenada sem encoding. Aplicar o mesmo `encodeURIComponent` do fluxo atual e verificar o texto decodificado. |
| Média | O número e o formato da mensagem ficarão reproduzidos no script isolado da Natura. Se o telefone ou o texto padrão mudar, conferir os dois scripts. A edição mínima evita regressões no seletor de tom de Jequiti e nas mensagens especiais dos outros catálogos. |
| Média | Um rótulo maior pode mudar a quebra de linha do CTA. Conferir os 20 cards em desktop e mobile, além dos links de contato gerais e uma amostra dos cards Jequiti e Biozenthi. |

Para reverter a troca de CTA, reaplicar apenas o hunk que restaura o rótulo **Comprar na loja da Carol ↗** e a atribuição `href = product.linkLojaCarol` no JS Natura. Essa reversão reativa os destinos da loja para os 20 cards. Se a regra de WhatsApp precisar continuar valendo durante um incidente, o recurso já existente `"ativo": false` pode retirar temporariamente apenas o lote Natura, mediante autorização de operação.
