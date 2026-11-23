// Produtos confirmados; inclua image somente depois de conferir a foto exata.
// Os registros sem imagem ficam fora da vitrine.
const jequitiImage = (folder, file) => `assets/images/catalogos/jequiti/${folder}/${file}`;
const jequiti = (data) => ({ brand: "Jequiti", audience: "unissex", fragrance: "", shade: "", volume: "", imageStatus: "approved", whatsappMessage: "", ...data });
const biozenthi = (data) => ({ brand: "Biozenthi", audience: "unissex", fragrance: "", shade: "", volume: "", imageStatus: "approved", whatsappMessage: "", ...data });
// Catálogo Biozenthi: imagens padronizadas em PNG transparente (1254 x 1254 px).
const biozenthiCatalog = [
  ["bellotratto-pomada-modeladora-capilar-916.png", "BelloTratto", "Pomada Modeladora Capilar", "Cabelos", "finalizador capilar"],
  ["biopsor-creme-hidratante-capilar-1077.png", "BioPsor", "Creme Hidratante Capilar", "Cabelos", "creme capilar"], ["biopsor-creme-hidratante-corporal-1078.png", "BioPsor", "Creme Hidratante Corporal", "Corpo", "hidratante corporal"], ["biopsor-sabonete-liquido-dermocalmante-1086.png", "BioPsor", "Sabonete Líquido Dermocalmante", "Corpo", "sabonete líquido"], ["biopsor-shampoo-dermocalmante-1076.png", "BioPsor", "Shampoo Dermocalmante", "Cabelos", "shampoo"],
  ["bioscalp-serum-dermoforce-antiqueda-763.png", "BioScalp", "Sérum Dermoforce Antiqueda", "Cabelos", "sérum capilar"], ["bioscalp-shampoo-dermocasp-anticaspa-1767.png", "BioScalp", "Shampoo Dermocasp Anticaspa", "Cabelos", "shampoo"], ["bioscalp-shampoo-dermoforce-antiqueda-115.png", "BioScalp", "Shampoo Dermoforce Antiqueda", "Cabelos", "shampoo"],
  ["biozenthi-creme-desodorante-pes-83.png", "Biozenthi", "Creme Desodorante para os Pés", "Corpo", "creme para pés"], ["biozenthi-creme-hidratante-maos-cotovelos-433.png", "Biozenthi", "Creme Hidratante para Mãos e Cotovelos", "Corpo", "creme para mãos"], ["biozenthi-desodorante-roll-on-alecrim-melaleuca-1686.png", "Biozenthi", "Desodorante Roll-on Alecrim e Melaleuca", "Corpo", "desodorante roll-on"], ["biozenthi-desodorante-roll-on-lavanda-1211.png", "Biozenthi", "Desodorante Roll-on Lavanda", "Corpo", "desodorante roll-on"], ["biozenthi-desodorante-roll-on-max-389.png", "Biozenthi", "Desodorante Roll-on Max", "Corpo", "desodorante roll-on"], ["biozenthi-desodorante-roll-on-neutro-508.png", "Biozenthi", "Desodorante Roll-on Neutro", "Corpo", "desodorante roll-on"], ["biozenthi-desodorante-roll-on-sensitive-1169.png", "Biozenthi", "Desodorante Roll-on Sensitive", "Corpo", "desodorante roll-on"],
  ["biozenthi-encrespada-condicionador-1479.png", "Biozenthi Encrespada", "Condicionador para Cabelos Encrespados", "Cabelos", "condicionador"], ["biozenthi-encrespada-leave-in-finalizador-1480.png", "Biozenthi Encrespada", "Leave-in Finalizador para Cabelos Encrespados", "Cabelos", "leave-in"], ["biozenthi-encrespada-shampoo-1474.png", "Biozenthi Encrespada", "Shampoo para Cabelos Encrespados", "Cabelos", "shampoo"], ["biozenthi-hidratante-nutritivo-corporal-789.png", "Biozenthi", "Hidratante Nutritivo Corporal", "Corpo", "hidratante corporal"], ["biozenthi-jaborandi-condicionador-805.png", "Biozenthi Jaborandi", "Condicionador de Jaborandi", "Cabelos", "condicionador"], ["biozenthi-jaborandi-shampoo-79.png", "Biozenthi Jaborandi", "Shampoo de Jaborandi", "Cabelos", "shampoo"], ["biozenthi-kids-condicionador-todos-tipos-cabelo.png", "Biozenthi Kids", "Condicionador para Todos os Tipos de Cabelo", "Cabelos", "condicionador"], ["biozenthi-kids-shampoo-todos-tipos-cabelo.png", "Biozenthi Kids", "Shampoo para Todos os Tipos de Cabelo", "Cabelos", "shampoo"], ["biozenthi-leave-in-fluido-oleo-argan-684.png", "Biozenthi", "Leave-in Fluido Óleo de Argan", "Cabelos", "leave-in"],
  ["biozenthi-oleo-de-coco-condicionador-1012.png", "Biozenthi Óleo de Coco", "Condicionador Óleo de Coco", "Cabelos", "condicionador"], ["biozenthi-oleo-de-coco-leave-in-reparador-1037.png", "Biozenthi Óleo de Coco", "Leave-in Reparador Óleo de Coco", "Cabelos", "leave-in"], ["biozenthi-oleo-de-coco-shampoo-1011.png", "Biozenthi Óleo de Coco", "Shampoo Óleo de Coco", "Cabelos", "shampoo"], ["biozenthi-oleo-essencial-alecrim-1555.png", "Biozenthi", "Óleo Essencial de Alecrim", "Bem-estar", "óleo essencial"], ["biozenthi-oleo-essencial-lavanda-1656.png", "Biozenthi", "Óleo Essencial de Lavanda", "Bem-estar", "óleo essencial"], ["biozenthi-oleo-essencial-melaleuca-1658.png", "Biozenthi", "Óleo Essencial de Melaleuca", "Bem-estar", "óleo essencial"], ["biozenthi-sabonete-intimo-refrescante-113.png", "Biozenthi", "Sabonete Íntimo Refrescante", "Higiene", "sabonete íntimo"], ["biozenthi-sabonete-liquido-cha-verde-710.png", "Biozenthi", "Sabonete Líquido Chá Verde", "Corpo", "sabonete líquido"],
  ["epiorganic-condicionador-ervas-funcionais-1199.png", "EpiOrganic", "Condicionador Ervas Funcionais", "Cabelos", "condicionador"], ["epiorganic-creme-dental-limao-siciliano-melaleuca-1597.png", "EpiOrganic", "Creme Dental Limão Siciliano e Melaleuca", "Higiene Bucal", "creme dental"], ["epiorganic-creme-dental-menta-refrescante-1061.png", "EpiOrganic", "Creme Dental Menta Refrescante", "Higiene Bucal", "creme dental"], ["epiorganic-hidratante-facial-niacinamida-acai-vitamina-e.png", "EpiOrganic", "Hidratante Facial Niacinamida, Açaí e Vitamina E", "Skincare", "hidratante facial"], ["epiorganic-shampoo-ervas-funcionais-1198.png", "EpiOrganic", "Shampoo Ervas Funcionais", "Cabelos", "shampoo"],
  ["gato-divino-creme-hidratante-clorofila-1161.png", "Gato Divino", "Creme Hidratante de Clorofila", "Corpo", "hidratante corporal"], ["gato-divino-desodorante-roll-on-1600.png", "Gato Divino", "Desodorante Roll-on", "Corpo", "desodorante roll-on"], ["gato-divino-protetor-solar-fps-65-1687.png", "Gato Divino", "Protetor Solar FPS 65", "Proteção Solar", "protetor solar"], ["gato-divino-sabonete-liquido-clorofila-1162.png", "Gato Divino", "Sabonete Líquido de Clorofila", "Corpo", "sabonete líquido"],
  ["italian-make-batom-liquido-florenca-1561.png", "Italian Make", "Batom Líquido Florença", "Maquiagem", "batom líquido"], ["italian-make-batom-liquido-nude-1537.png", "Italian Make", "Batom Líquido Nude", "Maquiagem", "batom líquido"], ["italian-make-batom-liquido-rosa-elegante-1553.png", "Italian Make", "Batom Líquido Rosa Elegante", "Maquiagem", "batom líquido"], ["italian-make-batom-liquido-vermelho-perigo-1546.png", "Italian Make", "Batom Líquido Vermelho Perigo", "Maquiagem", "batom líquido"], ["italian-make-gloss-hidratante-fantasy-1539.png", "Italian Make", "Gloss Hidratante Fantasy", "Maquiagem", "gloss labial"], ["italian-make-gloss-hidratante-magic-1559.png", "Italian Make", "Gloss Hidratante Magic", "Maquiagem", "gloss labial"], ["italian-make-gloss-hidratante-marsala-1562.png", "Italian Make", "Gloss Hidratante Marsala", "Maquiagem", "gloss labial"],
  ["micozione-pele-1691.png", "Micozione", "Micozione Pele", "Cuidados Especiais", "tratamento para pele"], ["micozione-unhas-577.png", "Micozione", "Micozione Unhas", "Cuidados Especiais", "tratamento para unhas"],
  ["onface-clinical-creme-facial-diurno-vitaminas-1163.png", "Onface Clinical", "Creme Facial Diurno com Vitaminas", "Skincare", "creme facial"], ["onface-clinical-creme-facial-noturno-antissinais-1074.png", "Onface Clinical", "Creme Facial Noturno Antissinais", "Skincare", "creme facial"], ["onface-esfoliante-facial-argila-verde-calendula-182.png", "Onface", "Esfoliante Facial Argila Verde e Calêndula", "Skincare", "esfoliante facial"], ["onface-filtro-solar-fps-35-1700.png", "Onface", "Filtro Solar FPS 35", "Proteção Solar", "filtro solar"], ["onface-filtro-solar-fps-75-bronze-1063-02.png", "Onface", "Filtro Solar FPS 75 Bronze", "Proteção Solar", "filtro solar"], ["onface-filtro-solar-fps-75-claro-1063-01.png", "Onface", "Filtro Solar FPS 75 Claro", "Proteção Solar", "filtro solar"], ["onface-filtro-solar-fps-75-medio-1063.png", "Onface", "Filtro Solar FPS 75 Médio", "Proteção Solar", "filtro solar"], ["onface-hidratante-facial-acido-hialuronico-vitamina-e-1093.png", "Onface", "Hidratante Facial Ácido Hialurônico e Vitamina E", "Skincare", "hidratante facial"], ["onface-protetor-solar-fps-65-1688.png", "Onface", "Protetor Solar FPS 65", "Proteção Solar", "protetor solar"], ["onface-sabonete-facial-lama-vulcanica-569.png", "Onface", "Sabonete Facial Lama Vulcânica", "Skincare", "sabonete facial"],
  ["piugene-balance-shampoo-antioleosidade-1765.png", "Piugene Balance", "Shampoo Antioleosidade", "Cabelos", "shampoo"], ["piugene-calm-shampoo-sabonete-1715.png", "Piugene Calm", "Shampoo Sabonete", "Cabelos", "shampoo"], ["piugene-dermo-desodorante-roll-on-1714.png", "Piugene Dermo", "Desodorante Roll-on", "Corpo", "desodorante roll-on"], ["piugene-emulsao-facial-limpeza-suave-1753.png", "Piugene", "Emulsão Facial de Limpeza Suave", "Skincare", "limpador facial"], ["piugene-mascara-facial-argila-preta-1656.png", "Piugene", "Máscara Facial Argila Preta", "Skincare", "máscara facial"], ["piugene-serum-acido-hialuronico-1653.png", "Piugene", "Sérum Ácido Hialurônico", "Skincare", "sérum facial"], ["piugene-serum-niacinamida-1654.png", "Piugene", "Sérum Niacinamida", "Skincare", "sérum facial"], ["piugene-serum-vitamina-c-1655.png", "Piugene", "Sérum Vitamina C", "Skincare", "sérum facial"],
  ["propodo-creme-alta-hidratacao-pes-1055.png", "Propodo", "Creme de Alta Hidratação para os Pés", "Corpo", "creme para pés"], ["puresun-protetor-solar-bege-claro-1605.png", "PureSun", "Protetor Solar Bege Claro", "Proteção Solar", "protetor solar"], ["puresun-protetor-solar-bege-medio-1606.png", "PureSun", "Protetor Solar Bege Médio", "Proteção Solar", "protetor solar"]
];
const biozenthiProducts = biozenthiCatalog.map(([file, line, name, category, productType]) => {
  const match = file.match(/-(\d+(?:-\d+)?)\.png$/);
  const code = match ? match[1].replace("-", ".") : "";
  return biozenthi({ id: `biozenthi-${file.replace(/\.png$/, "")}`, code, name, line, category, subcategory: "", productType, shortDescription: `${name}.`, image: `assets/images/biozenthi_catalogo/${file}` });
});

// Catálogo Jequiti: sem preços, estoque, carrinho ou checkout.
const products = [
  ...biozenthiProducts,
  jequiti({id:"jequiti-100392",code:"100392",name:"Vida Hidratante Corporal Relax Lavanda",line:"Vida",category:"Corpo",subcategory:"hidratante",productType:"hidratante corporal",volume:"190 ml",fragrance:"Floral Refrescante",shortDescription:"Hidratante corporal com óleos essenciais e textura leve.",image:"assets/images/catalogos/jequiti/corpo/jequiti_100392_vida_hidratante_corporal_relax_lavanda_190_ml_v2.png"}),
  jequiti({id:"jequiti-100394",code:"100394",name:"Vida Hidratante Corporal Alegre Flor de Pitaya",line:"Vida",category:"Corpo",subcategory:"hidratante",productType:"hidratante corporal",volume:"190 ml",fragrance:"Floral Vibrante",shortDescription:"Hidratante corporal com óleos essenciais e textura leve.",image:"assets/images/catalogos/jequiti/corpo/jequiti_100394_vida_hidratante_corporal_alegre_flor_de_pitaya_190_ml_v2.png"}),
  jequiti({id:"jequiti-100794",code:"100794",name:"Hidratante Corporal Hidratação Noturna",line:"Jequiti",category:"Corpo",subcategory:"hidratante",productType:"hidratante corporal",volume:"400 ml",shortDescription:"Promove sensação de relaxamento para um sono mais tranquilo.",image:"assets/images/catalogos/jequiti/corpo/jequiti_100794_hidratante_corporal_hidratacao_noturna_400_ml_v2.png"}),
  jequiti({id:"jequiti-17655",code:"17655",name:"Sensi Gel Esfoliante Corporal",line:"Sensi",category:"Corpo",subcategory:"esfoliante",productType:"gel esfoliante",volume:"200 g",shortDescription:"Partículas esfoliantes limpam e auxiliam na remoção de células mortas.",image:jequitiImage("corpo","jequiti_17655_sensi_gel_esfoliante_corporal_200_g.png")}),
  jequiti({id:"jequiti-18124",code:"18124",name:"Desodorante Hidratante Corporal Eu Provoco",line:"Eu Provoco",category:"Corpo",subcategory:"hidratante",productType:"desodorante hidratante",volume:"200 ml",shortDescription:"Cuidado para deixar a pele macia e perfumada.",image:"assets/images/catalogos/jequiti/corpo/jequiti_18124_desodorante_hidratante_corporal_eu_provoco_200_ml_v2.png"}),
  jequiti({id:"jequiti-19804",code:"19804",name:"Sensi Hidratante Corporal Hipoalergênico",line:"Sensi",category:"Corpo",subcategory:"hidratante",productType:"hidratante corporal",volume:"400 ml",shortDescription:"Até 48 horas de hidratação; sem perfume.",image:"assets/images/catalogos/jequiti/corpo/jequiti_19804_sensi_hidratante_corporal_hipoalergenico_400_ml_v2.png"}),
  jequiti({id:"jequiti-99850",code:"99850",name:"Sensi Creme para as Mãos Luvas de Silicone",line:"Sensi",category:"Corpo",subcategory:"mãos",productType:"creme para mãos",volume:"40 g",shortDescription:"Enriquecido com silicone e manteiga de karité.",image:jequitiImage("corpo","jequiti_99850_sensi_creme_para_as_maos_luvas_de_silicone_40_g.png")}),
  jequiti({id:"jequiti-99851",code:"99851",name:"Sensi Creme para os Pés Meias de Silicone",line:"Sensi",category:"Corpo",subcategory:"pés",productType:"creme para pés",volume:"50 g",shortDescription:"Enriquecido com silicone e manteiga de karité.",image:jequitiImage("corpo","jequiti_99851_sensi_creme_para_os_pes_meias_de_silicone_50_g.png")}),
  ...[["100585","Marrom Irresistível"],["100587","Vinho Fascinante"],["100588","Vermelho Luxo"],["100931","Marsala Paixão"],["100932","Vermelho Delírio"]].map(([code,shade])=>jequiti({id:`jequiti-${code}`,code,name:`Batom Líquido Aviva ${shade}`,line:"Aviva",category:"Maquiagem",subcategory:"lábios",audience:"feminino",productType:"batom líquido",volume:"4 ml",shade,shortDescription:`Batom Líquido Aviva, tom ${shade}.`,image:`assets/images/catalogos/jequiti/maquiagem/jequiti_${code}_${code==="100585"?"batom_liquido_aviva_marrom_irresistivel":code==="100587"?"batom_liquido_aviva_vinho_fascinante":code==="100588"?"batom_liquido_aviva_vermelho_luxo":code==="100931"?"batom_liquido_aviva_irresistivel_marsala_paixao":"batom_liquido_aviva_irresistivel_vermelho_delirio"}_4_ml_v2.png`})),
  jequiti({id:"jequiti-base-hidra-matte",code:"",codeRange:"100852–100863",toneRange:"J10 a J120",name:"Base Corretiva Hidra Matte Aviva",line:"Aviva",category:"Maquiagem",subcategory:"rosto",audience:"feminino",productType:"base",volume:"30 ml",shortDescription:"Cobre manchas e olheiras com niacinamida e vitamina E; alta cobertura e acabamento confortável.",imageStatus:"general_variation_image",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100852_a_100863_base_corretiva_hidra_matte_30_ml_v2.png",variations:[{name:"J10",code:"100852",swatch:"#F4DFC5"},{name:"J20",code:"100853",swatch:"#EFD8CC"},{name:"J30",code:"100854",swatch:"#F0D8B3"},{name:"J40",code:"100855",swatch:"#EFCF9E"},{name:"J50",code:"100856",swatch:"#E8BEA4"},{name:"J60",code:"100857",swatch:"#E2B58B"},{name:"J70",code:"100858",swatch:"#D7AB7A"},{name:"J80",code:"100859",swatch:"#B8957D"},{name:"J90",code:"100860",swatch:"#B6814B"},{name:"J100",code:"100861",swatch:"#9D6336"},{name:"J110",code:"100862",swatch:"#79544F"},{name:"J120",code:"100863",swatch:"#633316"}]}),
  jequiti({id:"jequiti-100864",code:"100864",name:"Pó Facial Solto Translúcido Soft Matte Aviva",line:"Aviva",category:"Maquiagem",subcategory:"rosto",audience:"feminino",productType:"pó facial",volume:"12 g",shortDescription:"Efeito natural, acabamento aveludado, textura ultrafina e ajuda a controlar o brilho.",image:jequitiImage("maquiagem","jequiti_100864_po_facial_solto_translucido_soft_matte_aviva_12_g.png")}),
  jequiti({id:"jequiti-100866",code:"100866",name:"Gel para Sobrancelha Fix Brow Aviva",line:"Aviva",category:"Maquiagem",subcategory:"sobrancelhas",audience:"feminino",productType:"gel para sobrancelha",volume:"4 ml",shortDescription:"Dá estrutura e fixação aos fios, com efeito natural.",image:jequitiImage("maquiagem","jequiti_100866_gel_para_sobrancelha_fix_brow_aviva_4_ml.png")}),
  jequiti({id:"jequiti-blush-po-compacto-aviva",code:"",codeRange:"100947–100949",toneRange:"Coral, Rosa e Marsala",defaultVariationCode:"100947",name:"Blush em Pó Compacto Aviva",line:"Aviva",category:"Maquiagem",subcategory:"rosto",audience:"feminino",productType:"blush",volume:"10 g",shortDescription:"Realça a cor natural das maçãs do rosto, com toque aveludado e textura confortável.",imageStatus:"has_shade_panel",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100947_blush_po_compacto_aviva_coral_10_g_v2.png",variations:[{name:"Coral",code:"100947",swatch:"#E37B66",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100947_blush_po_compacto_aviva_coral_10_g_v2.png"},{name:"Rosa",code:"100948",swatch:"#DD716F",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100948_blush_po_compacto_aviva_rosa_10_g_v2.png"},{name:"Marsala",code:"100949",swatch:"#875E5B",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100949_blush_po_compacto_aviva_marsala_10_g_v2.png"}]}),
  jequiti({id:"jequiti-iluminador-po-compacto-aviva",code:"",codeRange:"100951–100952",toneRange:"Dourado e Bronze",defaultVariationCode:"100951",name:"Iluminador em Pó Compacto Aviva",line:"Aviva",category:"Maquiagem",subcategory:"rosto",audience:"feminino",productType:"iluminador",volume:"10 g",shortDescription:"Efeito glow, partículas ultrafinas e textura aveludada.",imageStatus:"has_shade_panel",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100951_iluminador_po_compacto_aviva_dourado_10_g_v2.png",variations:[{name:"Dourado",code:"100951",swatch:"#E6B986",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100951_iluminador_po_compacto_aviva_dourado_10_g_v2.png"},{name:"Bronze",code:"100952",swatch:"#C58A69",image:"assets/images/catalogos/jequiti/maquiagem/jequiti_100952_iluminador_po_compacto_aviva_bronze_10_g_v2.png"}]}),
  jequiti({id:"jequiti-101066",code:"101066",name:"Lápis Multifuncional Aviva Olhos e Lábios",line:"Aviva",category:"Maquiagem",subcategory:"olhos e lábios",audience:"feminino",productType:"lápis multifuncional",volume:"1,1 g",shortDescription:"Longa duração, alta cobertura, ácido hialurônico e acabamento matte confortável.",image:jequitiImage("maquiagem","jequiti_101066_lapis_multifuncional_aviva_olhos_labios_1_1_g.png")}),
  jequiti({id:"jequiti-101139",code:"101139",name:"Lápis para Olhos Superfix Preto Aviva",line:"Aviva",category:"Maquiagem",subcategory:"olhos",audience:"feminino",productType:"lápis para olhos",volume:"1,2 g",shade:"Preto",shortDescription:"Preto intenso, textura macia, traço definido e fácil de aplicar.",image:jequitiImage("maquiagem","jequiti_101139_lapis_para_olhos_superfix_preto_aviva_1_2_g.png")}),
  jequiti({id:"jequiti-80606",code:"80606",name:"Demaquilante Bifásico Aviva",line:"Aviva",category:"Maquiagem",subcategory:"remoção",audience:"feminino",productType:"demaquilante",volume:"120 ml",shortDescription:"Remove maquiagem à prova d’água e não deixa a pele oleosa.",image:jequitiImage("maquiagem","jequiti_80606_demaquilante_bifasico_aviva_120_ml.png")}),
  jequiti({id:"jequiti-99994",code:"99994",name:"Estojo Make Aviva",line:"Aviva",category:"Maquiagem",subcategory:"estojo",audience:"feminino",productType:"estojo",volume:"4 x 1,5 g",shortDescription:"Contém sombra marrom, sombra nude, iluminador e blush multifuncional.",image:jequitiImage("maquiagem","jequiti_99994_estojo_make_aviva_4x1_5_g.png")}),
  ...[
    ["100130","Desodorante Colônia Feminina Deluxe Moonlight","Deluxe","feminino","90 ml","Floral Elegante","jequiti_100130_desodorante_colonia_feminina_deluxe_moonlight_90_ml.png"],
    ["10075","Desodorante Colônia Masculina Aire Azure","Aire","masculino","100 ml","Fougère Sensual","jequiti_10075_desodorante_colonia_masculina_aire_azure_100_ml_v2.png"],
    ["10077","Fléur Rose","Fléur","feminino","25 ml","Floral Vibrante","jequiti_10077_fleur_rose_25_ml.png"],
    ["10080","Fléur Orchidee","Fléur","feminino","25 ml","Floral Adocicado","jequiti_10080_fleur_orchidee_25_ml.png"],
    ["101619","Desodorante Colônia Feminina Rebeca Abravanel Reale","Rebeca Abravanel","feminino","50 ml","Frutal Elegante","jequiti_101619_desodorante_colonia_feminina_rebeca_abravanel_reale_50_ml.png"],
    ["102453","Desodorante Colônia Feminina Radiance Passion","Radiance","feminino","90 ml","Chypre Sensual","jequiti_102453_desodorante_colonia_feminina_radiance_passion_90_ml.png"],
    ["102455","Desodorante Colônia Masculina Portiolli Original","Portiolli","masculino","90 ml","Fougère Elegante","jequiti_102455_desodorante_colonia_masculina_portiolli_original_90_ml.png"],
    ["102461","Desodorante Colônia Masculina Aire Azure","Aire","masculino","25 ml","Fougère Sensual","jequiti_102461_desodorante_colonia_masculina_aire_azure_25_ml.png"],
    ["102462","Desodorante Colônia Feminina Patricia Abravanel Essence","Patricia Abravanel","feminino","25 ml","Oriental Elegante","jequiti_102462_desodorante_colonia_feminina_patricia_abravanel_essence_25_ml.png"],
    ["102463","Desodorante Colônia Masculina Fabio Jr Legacy","Fabio Jr","masculino","25 ml","Madeira Vibrante","jequiti_102463_desodorante_colonia_masculina_fabio_jr_legacy_25_ml.png"],
    ["102464","Desodorante Colônia Masculina Aire Azure Intense","Aire","masculino","25 ml","Amadeirado Refrescante","jequiti_102464_desodorante_colonia_masculina_aire_azure_intense_25_ml.png"],
    ["11128","Desodorante Colônia Masculina Portiolli Gold Intenso","Portiolli","masculino","90 ml","Oriental Sensual","jequiti_11128_desodorante_colonia_masculina_portiolli_gold_intenso_90_ml.png"],
    ["17885","Desodorante Colônia Splash Feminina Deluxe","Deluxe","feminino","200 ml","Oriental Sensual","jequiti_17885_desodorante_colonia_splash_feminina_deluxe_200_ml.png"],
    ["19159","Desodorante Colônia Masculina Portiolli Gold","Portiolli","masculino","25 ml","Oriental Sensual","jequiti_19159_desodorante_colonia_masculina_portiolli_gold_25_ml.png"],
    ["19342","Desodorante Colônia Candy Land Bala de Morango","Candy Land","feminino","25 ml","Frutal Adocicado","jequiti_19342_candy_land_bala_de_morango_25_ml.png"],
    ["19352","Desodorante Colônia Masculina Uzon Original","Uzon","masculino","90 ml","Fougère Sensual","jequiti_19352_desodorante_colonia_masculina_uzon_original_90_ml.png"],
    ["19640","Desodorante Colônia Splash Refresca Com Leveza","Refresca","unissex","350 ml","Frutal Vibrante","jequiti_19640_desodorante_colonia_splash_refresca_com_leveza_350_ml_v2.png"],
    ["19642","Desodorante Colônia Splash Refresca Com Conforto","Refresca","unissex","350 ml","Floral Confortável","jequiti_19642_desodorante_colonia_splash_refresca_com_conforto_350_ml_v2.png"],
    ["80702","Desodorante Colônia Feminina Adriane Galisteu Ella","Adriane Galisteu","feminino","90 ml","Chypre Vibrante","jequiti_80702_desodorante_colonia_feminina_adriane_galisteu_ella_90_ml.png"],
    ["99951","Desodorante Colônia Candy Land Marshmallow","Candy Land","feminino","25 ml","Floral Adocicado","jequiti_99951_candy_land_marshmallow_25_ml.png"],
    ["99952","Desodorante Colônia Candy Land Maçã do Amor","Candy Land","feminino","25 ml","Frutal Adocicado","jequiti_99952_candy_land_maca_do_amor_25_ml.png"]
  ].map(([code,name,line,audience,volume,fragrance,file])=>jequiti({id:`jequiti-${code}`,code,name,line,category:"Perfumaria",subcategory:"fragrância",audience,productType:"desodorante colônia",volume,fragrance,shortDescription:`Fragrância ${fragrance}.`,image:jequitiImage("perfumaria",file)})),
  jequiti({id:"jequiti-101103",code:"101103",name:"Estojo Aire",line:"Aire",category:"Perfumaria",subcategory:"estojo",audience:"masculino",productType:"estojo",volume:"2 x 25 ml",shortDescription:"Contém Desodorante Colônia Masculina Aire Altitude e Aire Azure.",image:jequitiImage("perfumaria","jequiti_101103_estojo_aire_2x25_ml.png")}),
  ...[["100291","Creme Facial Uniformizador","creme facial","50 g","jequiti_100291_sensi_creme_facial_uniformizador_50_g.png"],["100292","Sérum Efeito Clareador","sérum","30 ml","jequiti_100292_sensi_serum_efeito_clareador_30_ml_v2.png"],["18703","Gel de Limpeza Revigorante","gel de limpeza","100 g","jequiti_18703_sensi_gel_de_limpeza_revigorante_100_g.png"],["18705","Creme Facial Diurno Multirreparador","creme facial","50 g","jequiti_18705_sensi_creme_facial_diurno_multirreparador_50_g.png"],["18706","Creme Facial Noturno Regenerador","creme facial","50 g","jequiti_18706_sensi_creme_facial_noturno_regenerador_50_g.png"],["18707","Sérum Efeito Lipofilling","sérum","30 ml","jequiti_18707_sensi_serum_efeito_lipofilling_30_ml_v2.png"]].map(([code,name,productType,volume,file])=>jequiti({id:`jequiti-${code}`,code,name:`Sensi ${name}`,line:"Sensi",category:"Skincare",subcategory:"facial",audience:"unissex",productType,volume,shortDescription:`${name} para a rotina de skincare.`,image:jequitiImage("skincare",file)})),
];
const catalogContexts = {
  biozenthi: { primaryFilters: ["search", "type"], refinementFilters: ["category", "line"], showOnlyUsefulFilters: true },
  jequiti: { primaryFilters: ["search", "type"], refinementFilters: ["category", "line", "fragrance", "shade", "volume"], showOnlyUsefulFilters: true },
  natura: { primaryFilters: ["search", "category"], refinementFilters: ["category", "presentation"] },
  combined: { primaryFilters: ["search", "category"], refinementFilters: ["category", "brand", "presentation", "line", "fragrance", "shade", "volume"] },
  brandSmall: { primaryFilters: ["search", "type"], refinementFilters: ["category"], showOnlyUsefulFilters: true },
};
function getProductSearchText(product) {
  return [product.name, product.shortDescription, product.code, product.codeRange, product.line, product.category, product.productType, product.fragrance, product.shade, product.volume, ...(product.variations || []).flatMap((variation) => [variation.name, variation.code])]
    .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
}
const assetBase = new URL("../../", document.querySelector('script[src$="app.js"]').src);

/* Tema visual persistente: claro é o padrão e dark é uma preferência opcional. */
const themeStorageKey = "carol-scherer-theme";
function initializeThemeToggle() {
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(themeStorageKey) || "light"; } catch (_) { /* armazenamento indisponível: mantém claro */ }
  const root = document.documentElement;
  root.dataset.theme = savedTheme === "dark" ? "dark" : "light";

  const head = document.querySelector(".head");
  if (!head) return;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.setAttribute("aria-live", "polite");
  function renderThemeToggle() {
    const isDark = root.dataset.theme !== "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Mudar para tema claro" : "Mudar para tema escuro");
    toggle.innerHTML = `<span aria-hidden="true">${isDark ? "Claro" : "Escuro"}</span><span class="theme-toggle-state">${isDark ? "Dark" : "Claro"}</span>`;
  }
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem(themeStorageKey, root.dataset.theme); } catch (_) { /* preferência vale nesta página */ }
    renderThemeToggle();
  });
  const menuToggle = head.querySelector(".menu-toggle");
  if (menuToggle) menuToggle.before(toggle); else head.append(toggle);
  renderThemeToggle();
}
initializeThemeToggle();

const menuButton = document.querySelector(".menu-toggle");
const menuNav = document.querySelector("#nav");
if (menuButton && menuNav) menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuNav.classList.toggle("open", open);
});
const categoryName = (category) => ({
  Skincare: "Cuidados com a pele",
  Rosto: "Cuidados com a pele",
  Corpo: "Corpo e banho",
  "Corpo e Banho": "Corpo e banho",
  "Cuidados Masculinos": "Cuidados masculinos",
})[category] || category;

// Navegação progressiva: os links originais permanecem disponíveis sem JavaScript.
if (menuNav && menuButton) {
  const brandRoutes = { "Natura": "natura", "Avon": "avon", "Mary Kay": "mary-kay", "Eudora": "eudora", "dōTERRA": "doterra", "Jequiti": "jequiti", "O Boticário": "o-boticario", "Biozenthi": "biozenthi", "Herbia": "herbia", "Acqua Di Cleo": "acqua-di-cleo" };
  const routes = { feminino: "pages/feminino.html", masculino: "pages/masculino.html", marcas: "pages/marcas.html" };
  const media = window.matchMedia("(max-width: 959px)");
  const entries = [];
  let active = null, closeTimer, restoringMegaFocus = false;
  const url = (path) => new URL(path, assetBase).href;
  function closePanel(restore = false) {
    clearTimeout(closeTimer);
    if (!active) return;
    const previous = active; active = null; previous.panel.hidden = true;
    previous.trigger.setAttribute("aria-expanded", "false"); previous.wrapper.classList.remove("is-open");
    if (restore) { restoringMegaFocus = true; previous.trigger.focus(); restoringMegaFocus = false; }
  }
  function openPanel(entry) {
    clearTimeout(closeTimer);
    if (active === entry) return;
    closePanel(); active = entry; entry.panel.hidden = false;
    entry.trigger.setAttribute("aria-expanded", "true"); entry.wrapper.classList.add("is-open");
  }
  function addLink(parent, label, href) {
    const a = document.createElement("a"); a.href = href; a.textContent = label; parent.append(a); return a;
  }
  function heading(parent, label) { const h = document.createElement("h3"); h.textContent = label; parent.append(h); }
  const catalogLink = document.createElement("a");
  catalogLink.href = url("pages/todos-os-produtos.html");
  catalogLink.textContent = "Todos os produtos";
  const aboutLink = [...menuNav.querySelectorAll(":scope > a")].find((link) => link.getAttribute("href").endsWith("/sobre.html"));
  if (aboutLink) aboutLink.before(catalogLink); else menuNav.append(catalogLink);
  for (const key of ["feminino", "masculino", "marcas"]) {
    const original = [...menuNav.querySelectorAll(":scope > a")].find((a) => a.getAttribute("href").endsWith(key + ".html"));
    if (!original) continue;
    const wrapper = document.createElement("div"); wrapper.className = "mega-item";
    original.before(wrapper); wrapper.append(original);
    const trigger = document.createElement("button"); trigger.type = "button"; trigger.className = "mega-trigger";
    trigger.setAttribute("aria-label", `Abrir menu ${original.textContent.trim()}`); trigger.setAttribute("aria-expanded", "false"); trigger.setAttribute("aria-controls", `mega-${key}`); trigger.textContent = "⌄"; wrapper.append(trigger);
    const panel = document.createElement("div"); panel.id = `mega-${key}`; panel.className = "mega-panel"; panel.hidden = true;
    const content = document.createElement("div"); content.className = "mega-content";
    const top = document.createElement("div"); top.className = "mega-top";
    const title = document.createElement("strong"); title.textContent = original.textContent.trim(); top.append(title);
    const close = document.createElement("button"); close.type = "button"; close.className = "mega-close"; close.textContent = "Fechar ×"; close.setAttribute("aria-label", `Fechar menu ${title.textContent}`); top.append(close); content.append(top);
    const columns = document.createElement("div"); columns.className = "mega-columns";
    const scope = key === "marcas" ? products : products.filter((product) => product.audience === key);
    const naturaCategories = {"feminino":["Corpo e Banho","Perfumaria"],"masculino":["Corpo e Banho","Cuidados Masculinos","Cuidados pessoais","Perfumaria"]};
    const categories = [...new Set([...scope.map((product) => product.category), ...(naturaCategories[key] || [])].map(categoryName))].sort((a,b) => a.localeCompare(b,"pt-BR"));
    const brandScope = key === "marcas" ? products : products.filter((product) => product.audience === key || product.audience === "unissex");
    const brands = [...new Set([...brandScope.map((product) => product.brand), "Natura"])].filter((name) => brandRoutes[name]).sort((a,b) => a.localeCompare(b,"pt-BR"));
    if (key !== "marcas") {
      const section = document.createElement("section"); heading(section, "Categorias");
      categories.forEach((category) => {
        const destination = new URL(routes[key], assetBase);
        destination.searchParams.set("categoria", category);
        addLink(section, category, destination.href);
      });
      columns.append(section);
    }
    const brandSection = document.createElement("section"); heading(brandSection, "Marcas");
    if (key === "marcas") {
      const label = document.createElement("label"); label.className = "mega-search"; label.textContent = "Buscar marca";
      const input = document.createElement("input"); input.type = "search"; input.placeholder = "Nome da marca"; label.append(input); brandSection.append(label);
      const links = document.createElement("div"); links.className = "mega-brand-list";
      brands.forEach((name) => { const a = addLink(links, name, url(`pages/marcas/${brandRoutes[name]}.html`)); a.dataset.brandName = name; });
      const noResults = document.createElement("p"); noResults.className = "mega-no-results"; noResults.hidden = true; noResults.textContent = "Nenhuma marca encontrada.";
      input.addEventListener("input", () => { let visible = 0; links.querySelectorAll("a").forEach((a) => { const matches = a.dataset.brandName.toLocaleLowerCase("pt-BR").includes(input.value.trim().toLocaleLowerCase("pt-BR")); a.hidden = !matches; if (matches) visible++; }); noResults.hidden = visible > 0; });
      brandSection.append(links, noResults);
    } else {
      brands.forEach((name) => { const destination = new URL(routes[key], assetBase); destination.searchParams.set("marca", name); addLink(brandSection, name, destination.href); });
    }
    columns.append(brandSection); content.append(columns);
    const all = addLink(content, key === "marcas" ? "Ver todas as marcas →" : "Ver todo o catálogo →", url(routes[key])); all.className = "mega-all";
    const generalCatalog = addLink(content, "Todos os produtos →", url("pages/todos-os-produtos.html")); generalCatalog.className = "mega-all";
    panel.append(content); wrapper.append(panel);
    const entry = { wrapper, trigger, panel }; entries.push(entry);
    wrapper.addEventListener("pointerenter", (event) => { if (!media.matches && event.pointerType === "mouse") openPanel(entry); });
    wrapper.addEventListener("pointerleave", (event) => { if (!media.matches && event.pointerType === "mouse") { clearTimeout(closeTimer); closeTimer = setTimeout(() => { if (!wrapper.contains(document.activeElement)) closePanel(); }, 180); } });
    trigger.addEventListener("focus", () => { if (!restoringMegaFocus) openPanel(entry); });
    trigger.addEventListener("click", (event) => { event.stopPropagation(); if (active === entry && (trigger.dataset.wasOpen === "true" || event.detail === 0)) closePanel(); else openPanel(entry); delete trigger.dataset.wasOpen; });
    trigger.addEventListener("pointerdown", () => { trigger.dataset.wasOpen = String(active === entry); });
    close.addEventListener("click", () => closePanel(true));
  }
  menuNav.classList.add("has-mega");
  menuNav.addEventListener("focusout", (event) => { if (active && !active.wrapper.contains(event.relatedTarget)) closePanel(); });
  document.addEventListener("pointerdown", (event) => { if (!menuNav.contains(event.target)) closePanel(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { if (active) { event.preventDefault(); closePanel(true); } else if (menuNav.classList.contains("open")) { menuNav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.focus(); } } });
  menuButton.addEventListener("click", () => { if (!menuNav.classList.contains("open")) closePanel(); });
}

function productCard(product) {
  const card = document.createElement("article"); card.className = "favorite-card";
  card.dataset.brand = product.brand;
  const picture = document.createElement("div"); picture.className = "favorite-image";
  if (product.brand === "Jequiti" && /_v2\.png(?:$|[?#])/.test(product.image)) picture.classList.add("jequiti-v2-image");
  const image = document.createElement("img"); image.src = new URL(product.image, assetBase).href; image.alt = `${product.name} - ${product.brand}`; image.loading = "lazy"; image.decoding = "async"; picture.append(image);
  const body = document.createElement("div"); body.className = "favorite-body";
  const brand = document.createElement("span"); brand.className = "favorite-brand"; brand.textContent = product.brand;
  const name = document.createElement("h3"); name.textContent = product.name;
  const category = document.createElement("p"); category.className = "favorite-category"; category.textContent = product.category;
  const details = document.createElement("p"); details.className = "product-details";
  details.textContent = [product.volume, product.shade ? `Tom: ${product.shade}` : "", product.fragrance ? `Fragrância: ${product.fragrance}` : ""].filter(Boolean).join(" · ");
  const description = document.createElement("p"); description.className = "product-description"; description.textContent = product.shortDescription || "";
  const link = document.createElement("a"); link.className = "favorite-link"; link.textContent = "Consultar com a Carol ↗";
  const whatsappHref = (selectedVariation) => {
    const code = selectedVariation?.code || product.code || product.codeRange;
    const lines = [`Olá, Carol! Tenho interesse neste produto:`, "", `Produto: ${product.name}`, `Código: ${code}`];
    if (selectedVariation) { lines.push(`Tom: ${selectedVariation.name}`); if (product.volume) lines.push(`Volume: ${product.volume}`); }
    else if (product.variations?.length) { lines.push(`Tons disponíveis: ${product.toneRange || "J10 a J120"}`, ...(product.volume ? [`Volume: ${product.volume}`] : []), "", "Informe o tom desejado no atendimento."); }
    else { if (product.shade) lines.push(`Tom: ${product.shade}`); if (product.fragrance) lines.push(`Fragrância: ${product.fragrance}`); if (product.volume) lines.push(`Volume: ${product.volume}`); }
    return "https://wa.me/5547997854773?text=" + encodeURIComponent(lines.join("\n"));
  };
  link.href = whatsappHref();
  if (product.brand === "Natura") details.textContent = `SKU: ${product.code}`;
  body.append(brand, name, category, details, description);
  if (product.variations?.length) {
    const picker = document.createElement("div"); picker.className = "variation-picker";
    const trigger = document.createElement("button"); trigger.type = "button"; trigger.className = "variation-trigger"; trigger.textContent = `${product.variations.length} tons disponíveis ▾`; trigger.setAttribute("aria-expanded", "false"); trigger.setAttribute("aria-haspopup", "listbox");
    const selected = document.createElement("p"); selected.className = "variation-selection"; selected.hidden = true;
    const menu = document.createElement("div"); menu.className = "variation-menu"; menu.setAttribute("role", "listbox"); menu.setAttribute("aria-label", `Tons de ${product.name}`); menu.hidden = true;
    const optionButtons = []; let suppressFocusOpen = false; let menuWasOpenOnPointerDown = null; let hoverCloseTimer;
    const setOpen = (open) => {
      picker.classList.toggle("is-open", open); trigger.setAttribute("aria-expanded", String(open)); menu.hidden = !open;
      if (open) {
        const triggerBounds = trigger.getBoundingClientRect();
        const menuHeight = menu.getBoundingClientRect().height;
        const opensUp = window.innerHeight - triggerBounds.bottom < menuHeight + 12 && triggerBounds.top > menuHeight + 12;
        picker.classList.toggle("opens-up", opensUp);
      } else picker.classList.remove("opens-up");
    };
    const selectVariation = (variation, option, restoreFocus = true) => {
      optionButtons.forEach((button) => { const isSelected = button === option; button.classList.toggle("is-selected", isSelected); button.setAttribute("aria-selected", String(isSelected)); });
      selected.textContent = `Tom selecionado: ${variation.name}`; selected.hidden = false; if (variation.image) image.src = new URL(variation.image, assetBase).href; link.href = whatsappHref(variation); setOpen(false);
      if (restoreFocus) { suppressFocusOpen = true; trigger.focus(); requestAnimationFrame(() => { suppressFocusOpen = false; }); }
    };
    product.variations.forEach((variation) => {
      const option = document.createElement("button"); option.type = "button"; option.className = "variation-option"; option.setAttribute("role", "option"); option.setAttribute("aria-selected", "false");
      const swatch = document.createElement("span"); swatch.className = "variation-swatch"; swatch.style.backgroundColor = variation.swatch; swatch.setAttribute("aria-hidden", "true");
      const tone = document.createElement("span"); tone.className = "variation-name"; tone.textContent = variation.name;
      const variationCode = document.createElement("span"); variationCode.className = "variation-code"; variationCode.textContent = variation.code;
      option.append(swatch, tone, variationCode); option.addEventListener("click", () => selectVariation(variation, option)); optionButtons.push(option); menu.append(option);
    });
    const initialVariation = product.variations.find((variation) => variation.code === product.defaultVariationCode);
    if (initialVariation) selectVariation(initialVariation, optionButtons.find((option) => option.querySelector(".variation-code")?.textContent === initialVariation.code), false);
    trigger.addEventListener("pointerdown", () => { menuWasOpenOnPointerDown = !menu.hidden; });
    trigger.addEventListener("click", () => { if (menuWasOpenOnPointerDown !== null) { setOpen(!menuWasOpenOnPointerDown); menuWasOpenOnPointerDown = null; } else setOpen(true); });
    trigger.addEventListener("keydown", (event) => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); optionButtons[0]?.focus(); } });
    picker.addEventListener("keydown", (event) => { if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.focus(); } });
    picker.addEventListener("focusin", () => { if (!suppressFocusOpen) setOpen(true); });
    picker.addEventListener("focusout", () => requestAnimationFrame(() => { if (!picker.contains(document.activeElement)) setOpen(false); }));
    document.addEventListener("pointerdown", (event) => { if (!picker.contains(event.target)) setOpen(false); });
    if (window.matchMedia?.("(hover: hover)").matches) {
      const cancelHoverClose = () => { window.clearTimeout(hoverCloseTimer); };
      const scheduleHoverClose = () => {
        cancelHoverClose();
        hoverCloseTimer = window.setTimeout(() => { if (!picker.matches(":hover") && !picker.contains(document.activeElement)) setOpen(false); }, 220);
      };
      picker.addEventListener("mouseenter", () => { cancelHoverClose(); setOpen(true); });
      picker.addEventListener("mouseleave", scheduleHoverClose);
    }
    picker.append(trigger, selected, menu); body.append(picker);
  }
  body.append(link); card.append(picture, body); return card;
}
function loadProducts(items) {
  return Promise.all(items.filter((p) => p.image).map((p) => new Promise((resolve) => {
    const image = new Image(); image.onload = () => resolve(p); image.onerror = () => resolve(null); image.src = new URL(p.image, assetBase).href;
  }))).then((results) => results.filter(Boolean));
}
const brandGrid = document.querySelector("#brand-products, #natura-products, #products");
if (brandGrid) {
  const filter = document.querySelector("#type-filter");
  const empty = document.querySelector("#brand-empty, #empty");
  const count = document.querySelector("#brand-count, #catalog-count");
  const combined = brandGrid.id === "products";
  const audience = combined ? brandGrid.dataset.category : "";
  const brandName = brandGrid.dataset.brand || "Natura";
  const integrated = combined || brandGrid.id === "natura-products";
  const brandContext = combined ? catalogContexts.combined : catalogContexts[brandName.toLowerCase()] || catalogContexts.brandSmall;
  const sharedFilters = combined || integrated || ["Jequiti", "Biozenthi"].includes(brandName);
  if (brandContext.primaryFilters.includes("search") && !document.querySelector("#catalog-search")) {
    const oldLabel = filter?.closest("label");
    const toolbar = document.createElement("div"); toolbar.className = "filters catalog-toolbar jequiti-filters";
    const searchLabel = document.createElement("label"); searchLabel.textContent = "Buscar por nome ou código";
    const input = document.createElement("input"); input.id = "catalog-search"; input.type = "search"; input.placeholder = "Buscar por nome ou código"; searchLabel.append(input);
    const typeLabel = document.createElement("label"); typeLabel.textContent = "Filtrar por tipo"; if (filter) typeLabel.append(filter);
    const trigger = document.createElement("button"); trigger.type = "button"; trigger.id = "catalog-refine-trigger"; trigger.className = "catalog-refine-trigger"; trigger.textContent = "Refinar filtros";
    const panel = document.createElement("section"); panel.id = "catalog-refine-panel"; panel.className = "catalog-refine-panel"; panel.hidden = true;
    const head = document.createElement("div"); head.className = "catalog-refine-header"; const title = document.createElement("h3"); title.textContent = "Refinar filtros"; const close = document.createElement("button"); close.type = "button"; close.className = "catalog-refine-close"; close.textContent = "×"; close.setAttribute("aria-label", "Fechar refinamento"); head.append(title, close);
    const fields = document.createElement("div"); fields.className = "catalog-refine-fields";
    brandContext.refinementFilters.map((id) => [id, ({ category: "Categoria", brand: "Marca", presentation: "Apresentação", line: "Linha", fragrance: "Fragrância", shade: "Tom", volume: "Volume" })[id]]).forEach(([id, label]) => { const field = document.createElement("label"); field.textContent = label; const select = document.createElement("select"); select.id = `catalog-${id}-filter`; select.disabled = true; field.append(select); fields.append(field); });
    const footer = document.createElement("div"); footer.className = "catalog-refine-footer"; const clear = document.createElement("button"); clear.type = "button"; clear.className = "catalog-refine-clear"; clear.textContent = "Limpar filtros"; const apply = document.createElement("button"); apply.type = "button"; apply.className = "catalog-refine-apply"; apply.textContent = "Aplicar filtros"; footer.append(clear, apply); panel.append(head, fields, footer);
    const chips = document.createElement("div"); chips.className = "catalog-active-filters"; chips.hidden = true; chips.setAttribute("aria-live", "polite");
    const categoryField = fields.querySelector("#catalog-category-filter")?.closest("label");
    if (sharedFilters && categoryField) {
      toolbar.append(searchLabel, categoryField, trigger);
      if (filter) fields.prepend(typeLabel);
    } else {
      toolbar.append(searchLabel, typeLabel, trigger);
    }
    const previousToolbar = oldLabel?.closest(".filters");
    count.before(toolbar, panel, chips);
    oldLabel?.remove();
    if (combined) previousToolbar?.remove(); trigger.setAttribute("aria-controls", panel.id); trigger.setAttribute("aria-expanded", "false"); upgradeSelects();
  }
  const controls = (brandContext.refinementFilters || []).map((name) => document.querySelector(`#catalog-${name}-filter`)).filter(Boolean);
  if (sharedFilters && filter) controls.unshift(filter);
  const search = document.querySelector("#catalog-search");
  const refine = document.querySelector("#catalog-refine-trigger"), panel = document.querySelector("#catalog-refine-panel"), chips = document.querySelector(".catalog-active-filters");
  let available = [];
  const cards = new WeakMap();
  const value = (id) => document.querySelector(`#catalog-${id}-filter`)?.value || "";
  const setPanel = (open) => { if (!panel || !refine) return; panel.hidden = !open; refine.setAttribute("aria-expanded", String(open)); if (open) panel.querySelector("button, select:not(:disabled)")?.focus(); };
  const updateRefinementUi = () => { const active = controls.filter((control) => control.value); if (refine) refine.textContent = active.length ? `Refinar filtros · ${active.length}` : "Refinar filtros"; if (!chips) return; chips.replaceChildren(); chips.hidden = !active.length; active.forEach((control) => { const chip = document.createElement("button"); chip.type = "button"; chip.className = "catalog-filter-chip"; const label = control.closest("label")?.childNodes[0]?.textContent?.trim() || "Filtro"; const option = control.selectedOptions[0]?.textContent || ""; chip.textContent = `${label}: ${option} ×`; chip.setAttribute("aria-label", `Remover filtro ${label}: ${option}`); chip.addEventListener("click", () => { control.value = ""; renderBrand(); }); chips.append(chip); }); if (active.length) { const clearAll = document.createElement("button"); clearAll.type = "button"; clearAll.className = "catalog-filter-clear-all"; clearAll.textContent = "Limpar tudo"; clearAll.addEventListener("click", () => { controls.forEach((control) => { control.value = ""; }); if (sharedFilters && search) search.value = ""; renderBrand(); }); chips.append(clearAll); } };
  function renderBrand() {
    const query = search?.value.trim().toLocaleLowerCase("pt-BR") || "";
    const result = available.filter((p) => {
      const hasVariation = (term) => p.variations?.some((variation) => variation.name === term || variation.code === term);
      return (!filter?.value || p.productType === filter.value) && (!value("brand") || p.brand === value("brand")) && (!value("presentation") || p.presentation === value("presentation")) && (!value("category") || (sharedFilters ? categoryName(p.category) : p.category) === value("category")) && (!value("line") || p.line === value("line")) && (!value("audience") || p.audience === value("audience")) && (!value("fragrance") || p.fragrance === value("fragrance")) && (!value("shade") || p.shade === value("shade") || hasVariation(value("shade"))) && (!value("volume") || p.volume === value("volume")) && (!query || getProductSearchText(p).includes(query));
    });
    brandGrid.replaceChildren(...result.map((product) => {
      if (!cards.has(product)) cards.set(product, productCard(product));
      return cards.get(product);
    })); count.textContent = `${result.length} ${result.length === 1 ? "produto exibido" : "produtos exibidos"}`;
    empty.hidden = result.length > 0; empty.textContent = available.length ? "Nenhum produto encontrado para os filtros selecionados." : "O catálogo de produtos está sendo preparado."; updateRefinementUi();
  }
  if (sharedFilters) document.querySelector("#catalog-category-filter")?.addEventListener("change", renderBrand);
  else filter?.addEventListener("change", renderBrand);
  search?.addEventListener("input", renderBrand); refine?.addEventListener("click", () => setPanel(panel?.hidden)); document.querySelector(".catalog-refine-close")?.addEventListener("click", () => { setPanel(false); refine?.focus(); }); document.querySelector(".catalog-refine-apply")?.addEventListener("click", () => { renderBrand(); setPanel(false); refine?.focus(); }); document.querySelector(".catalog-refine-clear")?.addEventListener("click", () => { controls.forEach((control) => { control.value = ""; }); }); document.addEventListener("pointerdown", (event) => { if (panel && !panel.hidden && !panel.contains(event.target) && !refine?.contains(event.target)) setPanel(false); }); document.addEventListener("keydown", (event) => { if (event.key === "Escape" && panel && !panel.hidden) { event.preventDefault(); setPanel(false); refine?.focus(); } }); renderBrand();
  const otherProducts = products.filter((product) => {
    if (!combined) return product.brand === brandName;
    return !audience || product.audience === audience || product.audience === "unissex";
  });
  const loading = integrated
    ? Promise.all([otherProducts.filter((product) => product.image), (window.loadNaturaCatalog?.() || Promise.resolve([])).catch((error) => {
      console.error("Catálogo Natura indisponível.", error);
      return [];
    })]).then(([others, natura]) => [
      ...others.map((product) => ({ ...product, presentation: "Produto regular" })),
      ...natura.filter((product) => !audience || product.audience === audience),
    ])
    : loadProducts(otherProducts);
  loading.then((items) => {
    available = items;
    if (filter) {
      const types = [...new Set(items.map((p) => p.productType).filter(Boolean))].sort((a,b) => a.localeCompare(b, "pt-BR"));
      filter.replaceChildren(new Option("Todos os tipos", ""));
      types.forEach((type) => filter.add(new Option(type, type)));
      filter.disabled = !types.length;
    }
    const populate = (id, key, label) => { const select = document.querySelector(`#catalog-${id}-filter`); if (!select) return; const values=[...new Set(items.flatMap((p)=>key === "shade" ? [p[key], ...(p.variations || []).map((variation)=>variation.name)] : [sharedFilters && key === "category" ? categoryName(p[key]) : p[key]]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR")); select.replaceChildren(new Option(label,"")); values.forEach((v)=>select.add(new Option(v,v))); select.disabled=!values.length; const field = select.closest("label"); if (field) field.hidden = values.length <= 1 && !(sharedFilters && id === "category" && values.length); };
    const refinementLabels = { category: "Todas as categorias", brand: "Todas as marcas", presentation: "Todas as apresentações", line: "Todas as linhas", fragrance: "Todas as fragrâncias", shade: "Todos os tons", volume: "Todos os volumes" }; brandContext.refinementFilters.forEach((id) => populate(id, id, refinementLabels[id]));
    const params = new URL(window.location.href).searchParams;
    for (const [param, id] of [["marca", "brand"], ["categoria", "category"], ["apresentacao", "presentation"]]) {
      const select = document.querySelector("#catalog-" + id + "-filter");
      const requested = params.get(param);
      if (select && Array.from(select.options).some((option) => option.value === requested)) select.value = requested;
    }
    renderBrand();
  });
}

function upgradeSelects() {
  document.querySelectorAll("select").forEach((select) => {
    if (select.dataset.premiumSelect) return;
    select.dataset.premiumSelect = "true";
    const shell = document.createElement("div"); shell.className = "premium-select";
    const button = document.createElement("button"); button.type = "button"; button.className = "premium-select-trigger";
    const list = document.createElement("div"); list.className = "premium-select-list"; list.id = `premium-${select.id}`; list.setAttribute("role", "listbox"); list.hidden = true;
    button.setAttribute("aria-haspopup", "listbox"); button.setAttribute("aria-controls", list.id); button.setAttribute("aria-expanded", "false");
    select.before(shell); shell.append(select, button, list); select.classList.add("premium-select-native"); select.tabIndex = -1;
    const close = () => { list.hidden = true; button.setAttribute("aria-expanded", "false"); shell.classList.remove("is-open"); };
    const render = () => {
      const selected = select.selectedOptions[0]; button.textContent = selected ? selected.textContent : ""; button.disabled = select.disabled;
      list.replaceChildren(...[...select.options].map((option) => {
        const item = document.createElement("button"); item.type = "button"; item.className = "premium-select-option"; item.setAttribute("role", "option"); item.textContent = option.textContent; item.dataset.value = option.value; item.disabled = option.disabled; item.setAttribute("aria-selected", String(option.selected)); return item;
      }));
    };
    const open = () => { if (button.disabled) return; document.querySelectorAll(".premium-select.is-open").forEach((other) => { if (other !== shell) other.querySelector(".premium-select-trigger").click(); }); list.hidden = false; button.setAttribute("aria-expanded", "true"); shell.classList.add("is-open"); };
    button.addEventListener("click", () => list.hidden ? open() : close());
    button.addEventListener("keydown", (event) => { if (["ArrowDown", "ArrowUp", " ", "Enter"].includes(event.key)) { event.preventDefault(); open(); list.querySelector(".premium-select-option:not(:disabled)")?.focus(); } if (event.key === "Escape") close(); });
    list.addEventListener("click", (event) => { const item = event.target.closest(".premium-select-option"); if (!item || item.disabled) return; select.value = item.dataset.value; select.dispatchEvent(new Event("change", { bubbles: true })); close(); button.focus(); });
    list.addEventListener("keydown", (event) => { const options = [...list.querySelectorAll(".premium-select-option:not(:disabled)")]; const index = options.indexOf(document.activeElement); const focus = (next) => options[(next + options.length) % options.length]?.focus(); if (event.key === "Escape") { event.preventDefault(); close(); button.focus(); } else if (event.key === "ArrowDown") { event.preventDefault(); focus(index + 1); } else if (event.key === "ArrowUp") { event.preventDefault(); focus(index - 1); } else if (event.key === "Home") { event.preventDefault(); options[0]?.focus(); } else if (event.key === "End") { event.preventDefault(); options.at(-1)?.focus(); } else if (["Enter", " "].includes(event.key)) { event.preventDefault(); document.activeElement?.click(); } });
    select.addEventListener("change", render); new MutationObserver(render).observe(select, { childList: true, subtree: true, attributes: true, attributeFilter: ["disabled"] });
    document.addEventListener("pointerdown", (event) => { if (!shell.contains(event.target)) close(); }); render();
  });
}
upgradeSelects();

const carousel = document.querySelector(".carousel");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const controls = carousel.querySelector(".carousel-controls");
  const pause = carousel.querySelector("[data-carousel-pause]");
  const status = carousel.querySelector(".carousel-status");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationDelay = 6000;
  let index = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let resumeWhileHovered = false;
  let timer;

  function updatePause() {
    const label = paused ? "Retomar rotação" : "Pausar rotação";
    pause.setAttribute("aria-label", label);
    pause.title = label;
    pause.querySelector("[data-carousel-pause-label]").textContent = label;
    pause
      .querySelector("[data-carousel-pause-icon]")
      .setAttribute(
        "d",
        paused ? "M7 4v16l13-8z" : "M6 4h4v16H6z M14 4h4v16h-4z",
      );
  }
  function stopTimer() {
    clearTimeout(timer);
    timer = undefined;
  }
  function startTimer() {
    stopTimer();
    if (!paused && !document.hidden && (!hovered || resumeWhileHovered)) {
      timer = setTimeout(() => show(index + 1, false), rotationDelay);
    }
  }
  function show(next, announce = true) {
    const nextIndex = (next + slides.length) % slides.length;
    // Uma seta acionada sobre o link não pode deixar o foco em um slide oculto.
    if (nextIndex !== index && slides[index].contains(document.activeElement)) {
      carousel.focus({ preventScroll: true });
    }
    index = nextIndex;
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
    });
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (announce) {
      paused = true;
      updatePause();
      status.textContent = `Slide ${index + 1} de ${slides.length}: ${slides[index].querySelector("h2").textContent}`;
    }
    startTimer();
  }
  carousel
    .querySelector("[data-carousel-prev]")
    .addEventListener("click", () => show(index - 1));
  carousel
    .querySelector("[data-carousel-next]")
    .addEventListener("click", () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
  pause.addEventListener("click", () => {
    paused = !paused;
    // Retomar tem efeito mesmo se o foco e o ponteiro ainda estiverem no botão.
    resumeWhileHovered = !paused;
    updatePause();
    startTimer();
  });
  carousel.addEventListener("keydown", (event) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest("input, select, textarea, [contenteditable]")
    ) {
      return;
    }
    const destinations = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: slides.length - 1,
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    show(destinations[event.key]);
  });
  carousel.addEventListener("mouseenter", () => {
    hovered = true;
    resumeWhileHovered = false;
    startTimer();
  });
  carousel.addEventListener("mouseleave", () => {
    hovered = false;
    resumeWhileHovered = false;
    startTimer();
  });
  carousel.addEventListener("focusin", (event) => {
    if (event.target === pause) return;
    paused = true;
    updatePause();
    stopTimer();
  });
  document.addEventListener("visibilitychange", startTimer);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      paused = true;
      updatePause();
      stopTimer();
    }
  });
  controls.hidden = false;
  updatePause();
  startTimer();
}

// Destaques de categorias: um estado para abertura e sele??o.
const categoryExplorer = document.querySelector(".category-explorer");
if (categoryExplorer) {
  const categoryGrid = categoryExplorer.querySelector(".category-grid");
  const detail = categoryExplorer.querySelector(".category-detail");
  const cards = [...categoryGrid.querySelectorAll("[data-category]")];
  const controls = [...detail.querySelectorAll("[data-category]")];
  const panels = [...detail.querySelectorAll("[data-panel]")];
  const positions = ["center center", "center center", "center center"];
  let active = null;
  let isOpen = false;
  let opener = null;
  let restoringFocus = false;
  function openCategory(index, moveFocus = false) {
    if (!isOpen) opener = cards.find((button) => button.dataset.category === index);
    active = index;
    isOpen = true;
    const panel = panels.find((item) => item.dataset.panel === active);
    const card = cards.find((item) => item.dataset.category === active);
    // Os caminhos do HTML devem ser resolvidos em rela??o ? p?gina, n?o ao CSS.
    const desktopImage = new URL(card.querySelector("img").getAttribute("src"), document.baseURI).href;
    const mobileImage = new URL(panel.dataset.mobileImage, document.baseURI).href;
    detail.style.setProperty("--category-image", `url("${desktopImage}")`);
    detail.style.setProperty("--category-mobile-image", `url("${mobileImage}")`);
    detail.style.setProperty("--category-position", positions[Number(active)]);
    panels.forEach((item) => { item.hidden = item !== panel; });
    controls.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.category === active)));
    cards.forEach((button) => button.setAttribute("aria-expanded", String(button.dataset.category === active)));
    detail.inert = false;
    detail.setAttribute("aria-hidden", "false");
    categoryExplorer.classList.add("is-open");
    if (moveFocus) controls.find((button) => button.dataset.category === active).focus();
    categoryGrid.inert = true;
    categoryGrid.setAttribute("aria-hidden", "true");
  }
  function closeCategory(moveFocus = false) {
    if (!isOpen) return;
    isOpen = false;
    categoryGrid.inert = false;
    categoryGrid.removeAttribute("aria-hidden");
    categoryExplorer.classList.remove("is-open");
    cards.forEach((button) => button.setAttribute("aria-expanded", "false"));
    if (moveFocus && opener) {
      restoringFocus = true;
      opener.focus();
      restoringFocus = false;
    }
    detail.inert = true;
    detail.setAttribute("aria-hidden", "true");
  }
  cards.forEach((button) => {
    button.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") openCategory(button.dataset.category); });
    button.addEventListener("focus", () => { if (!restoringFocus) openCategory(button.dataset.category, true); });
    button.addEventListener("click", () => openCategory(button.dataset.category, true));
  });
  controls.forEach((button) => {
    button.addEventListener("click", () => openCategory(button.dataset.category));
    button.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") openCategory(button.dataset.category); });
    button.addEventListener("focus", () => openCategory(button.dataset.category));
  });
  detail.querySelector(".category-close").addEventListener("click", () => closeCategory(true));
  categoryExplorer.addEventListener("pointerleave", (event) => { if (event.pointerType === "mouse" && !categoryExplorer.contains(document.activeElement)) closeCategory(); });
  categoryExplorer.addEventListener("focusout", (event) => { if (!categoryExplorer.contains(event.relatedTarget)) closeCategory(); });
  categoryExplorer.addEventListener("keydown", (event) => { if (event.key === "Escape" && isOpen) { event.preventDefault(); closeCategory(true); } });
}

const favorites = document.querySelector(".favorites");
if (favorites) {
  const grid = favorites.querySelector(".favorites-grid");
  const count = favorites.querySelector(".favorites-count");
  const empty = favorites.querySelector(".favorites-empty");
  const filters = [...favorites.querySelectorAll("[data-favorite-filter]")];
  let selected = "";
  let available = [];
  function renderFavorites() {
    const shown = available.filter((product) => !selected || categoryName(product.category) === selected);
    grid.replaceChildren();
    shown.forEach((product) => {
      const card = document.createElement("article"); card.className = "favorite-card";
      const image = document.createElement("img"); image.src = product.image; image.alt = `${product.name} - ${product.brand}`; image.loading = "lazy"; image.decoding = "async";
      const picture = document.createElement("div"); picture.className = "favorite-image"; picture.append(image);
      const body = document.createElement("div"); body.className = "favorite-body";
      const brand = document.createElement("span"); brand.className = "favorite-brand"; brand.textContent = product.brand;
      const name = document.createElement("h3"); name.textContent = product.name;
      const category = document.createElement("p"); category.className = "favorite-category"; category.textContent = product.category;
      const link = document.createElement("a"); link.className = "favorite-link"; link.textContent = "Consultar com a Carol ↗";
      link.href = "https://wa.me/5547997854773?text=" + encodeURIComponent(`Olá, Carol! Gostaria de saber mais sobre ${product.brand} ${product.name}.`);
      body.append(brand, name, category, link); card.append(picture, body); grid.append(card);
    });
    count.textContent = `${shown.length} ${shown.length === 1 ? "produto exibido" : "produtos exibidos"}`;
    empty.hidden = shown.length > 0;
    empty.textContent = available.length ? "Nenhum produto nesta categoria por enquanto." : "A seleção de produtos está sendo preparada.";
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.favoriteFilter === selected)));
  }
  filters.forEach((button) => button.addEventListener("click", () => { selected = button.dataset.favoriteFilter; renderFavorites(); }));
  renderFavorites();
  // Só apresenta imagens que carregam; preserva a ordem dos registros.
  Promise.all(products.filter((product) => product.image).map((product) => new Promise((resolve) => {
    const image = new Image(); image.onload = () => resolve(product); image.onerror = () => resolve(null); image.src = product.image;
  }))).then((results) => { available = results.filter(Boolean); renderFavorites(); });
}

// Atualiza o ano do rodapé compartilhado.
document.querySelectorAll("[data-footer-year]").forEach((year) => { year.textContent = String(new Date().getFullYear()); });
