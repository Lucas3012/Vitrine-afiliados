// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://lbqrxixkfnmbcgyyvdxp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicXJ4aXhrZm5tYmNneXl2ZHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3Nzc0MzksImV4cCI6MjEwNzM1MzQzOX0.WkaQz_mLxlZBbOxNrc8bb2fmCAuXWZSYXYf9AzQpr00';

let supabaseClient = null;
try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch(e) {
    console.warn('Erro ao inicializar Supabase.');
}

let state = {
    currentView: 'store',
    activeCategoryIndex: 0,
    searchQuery: '',
    selectedCategory: 'Todos',
    sortBy: 'newest',
    currentUser: null,
    isRegisterMode: false,
    categoriesData: [
        {
            name: 'Moda e Acessórios',
            subcategories: [
                { name: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80' },
                { name: 'Malas e Bolsas', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80' },
                { name: 'Roupa Íntima e de Dormir', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80' },
                { name: 'Calças', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80' },
                { name: 'Camisetas e Regatas', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80' },
                { name: 'Aces. Moda', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80' },
                { name: 'Vestidos', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
                { name: 'Bermudas e Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=300&q=80' },
                { name: 'Moda Fitness', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=300&q=80' },
                { name: 'Agasalhos', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80' },
                { name: 'Blusas', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=300&q=80' },
                { name: 'Camisas', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80' },
                { name: 'Moda Praia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
                { name: 'Uniformes Trabalho e...', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=300&q=80' },
                { name: 'Saias', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=300&q=80' },
                { name: 'Leggings', image: 'https://images.unsplash.com/photo-1506629082925-2368c4676df1?auto=format&fit=crop&w=300&q=80' },
                { name: 'Ternos', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80' },
                { name: 'Macacão', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80' }
            ]
        },
        { name: 'Esportes e Fitness', subcategories: [{ name: 'Suplementos', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80' }, { name: 'Academia', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Joias e Relógios', subcategories: [{ name: 'Relógios', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Beleza e Saúde', subcategories: [{ name: 'Perfumes', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Celulares e Telefones', subcategories: [{ name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Móveis e Decoração', subcategories: [{ name: 'Salas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Computação', subcategories: [{ name: 'Notebooks', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Videogames', subcategories: [{ name: 'Consoles', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Áudio e Vídeo', subcategories: [{ name: 'Fones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Acessórios Veículos', subcategories: [{ name: 'Capacetes', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Veículos', subcategories: [{ name: 'Carros', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Construção', subcategories: [{ name: 'Ferramentas', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Escritório e Papelaria', subcategories: [{ name: 'Cadernos', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Eletrodomésticos', subcategories: [{ name: 'Air Fryer', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Câmeras e Acessórios', subcategories: [{ name: 'Câmeras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Brinquedos e...', subcategories: [{ name: 'Bonecos', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Livros', subcategories: [{ name: 'Ficção', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Alimentos e Bebidas', subcategories: [{ name: 'Cafés', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Bebês', subcategories: [{ name: 'Carrinhos', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Animais de estimação', subcategories: [{ name: 'Rações', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Instrumentos...', subcategories: [{ name: 'Violões', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Imóveis', subcategories: [{ name: 'Casas', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Serviços', subcategories: [{ name: 'Manutenção', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Outras categorias', subcategories: [{ name: 'Diversos', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80' }] }
    ],
    categories: ['Todos', 'Eletrônicos', 'Moda', 'Casa & Cozinha', 'Beleza', 'Esportes', 'Ferramentas'],
    settings: {
        siteName: 'Mega Ofertas',
        tagline: 'Achados & Ofertas',
        heroTitle: 'Achados Imperdíveis & Ofertas Diárias',
        heroSubtitle: 'Os melhores produtos selecionados com desconto para você economizar.',
        affiliateDisclaimer: 'Este site participa de programas de afiliados. Podemos receber comissões por compras qualificadas.'
    },
        products: [
{
          "id": 1,
          "title": "Redmi Note 17 Pro Max 512gb 8gb+8gb Bateria 10000 Mah Global Preto",
          "price": 3419,
          "oldPrice": 8999,
          "category": "Eletrônicos",
          "badge": "62% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_958405-MLB117542422094_102026-AB.webp",
          "link": "https://meli.la/1Mo2mF9",
          "clicks": 0
        },
{
          "id": 2,
          "title": "Impressora 3d Creality Ender-3 V3 Se Fdm 250mm/s Impressão",
          "price": 1350,
          "oldPrice": 6000,
          "category": "Eletrônicos",
          "badge": "77% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_865947-MLU75482181449_032024-AB.webp",
          "link": "https://meli.la/2joP4Y9",
          "clicks": 0
        },
{
          "id": 3,
          "title": "Relógio Smartwatch Forestory Inteligente Tela 1.83 Bluetooth Ip68 À Prova D'água Notificações Chamadas Saúde Smart Watch Relogio Corrida Com Android E Ios Com 2 Pulseiras Feminino Masculino",
          "price": 101.47,
          "oldPrice": 399,
          "category": "Eletrônicos",
          "badge": "74% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_819112-MLA114248484981_072026-AB.webp",
          "link": "https://meli.la/2SfGx4e",
          "clicks": 0
        },
{
          "id": 4,
          "title": "Suporte Magnético Para Celular Com Ventosa De Vácuo Ajustável 360° Universal Para Carro Painel Vidro Mesa E Superfícies Com Fixação Forte Para Smartphone E Uso Veicular E Ajuste Prático - Swave",
          "price": 18.72,
          "oldPrice": 78.8,
          "category": "Eletrônicos",
          "badge": "76% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_879018-MLA117877454469_092026-AB.webp",
          "link": "https://meli.la/34fBUaU",
          "clicks": 0
        },
{
          "id": 5,
          "title": "Smartwatch NOVANTE HT-1287 com Tela Curva AMOLED de 1.95\" e Chamadas Bluetooth IP68",
          "price": 148.48,
          "oldPrice": 539,
          "category": "Eletrônicos",
          "badge": "72% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_805619-MLA109050164215_032026-AB.webp",
          "link": "https://meli.la/2zdqDoD",
          "clicks": 0
        },
{
          "id": 6,
          "title": "Smartwatch HUAWEI Band 10 Caixa de Polímeros Duráveis Análise do Sono em Nível Profissional Assistente de Bem-estar Emocional Relógio Smartwatch Compatível com Android e iOS Rosa",
          "price": 187.24,
          "oldPrice": 659,
          "category": "Eletrônicos",
          "badge": "71% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_806194-MLA105593417435_012026-AB.webp",
          "link": "https://meli.la/2khc7C6",
          "clicks": 0
        },
{
          "id": 7,
          "title": "Projetor Portátil Bettdowac1093pro 350ansi 4kgtv Com Netflix Cinza-escuro 127/220v",
          "price": 375,
          "oldPrice": 1299,
          "category": "Eletrônicos",
          "badge": "71% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_834366-MLB111594940950_062026-AB.webp",
          "link": "https://meli.la/1a1bd6c",
          "clicks": 0
        },
{
          "id": 8,
          "title": "Fone De Ouvido Bluetooth Bateria de Longa Duração Pro 4 Branco Conecta Rápido Fast Plug Com Case Carregador E Microfone",
          "price": 24.49,
          "oldPrice": 78.99,
          "category": "Eletrônicos",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_846832-MLA115693573446_092026-AB.webp",
          "link": "https://meli.la/1zFyw8D",
          "clicks": 0
        },
{
          "id": 9,
          "title": "Adaptador Receptor Bluetooth 5.4 Xiaowei Usb Para Pc Notebook Conecta Até 7 Dispositivos Simultâneos Gamer Trabalho Estudo",
          "price": 24.9,
          "oldPrice": 75,
          "category": "Eletrônicos",
          "badge": "66% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_962383-MLA116565848952_092026-AB.webp",
          "link": "https://meli.la/27aCjyc",
          "clicks": 0
        },
{
          "id": 10,
          "title": "Smartwatch Alexa Bluetooth Chamada Tela 1.83 Ip68 120 Esport Lilás",
          "price": 156,
          "oldPrice": 499,
          "category": "Eletrônicos",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_682582-MLB115459166700_082026-AB.webp",
          "link": "https://meli.la/2vwfLvj",
          "clicks": 0
        },
{
          "id": 11,
          "title": "Relógio Inteligente Smartwatch Gps Autônomo IP68 3ATM À prova d'água 850mAh Preto NOVANTE Digital Feminino Masculino Esportivo Android IOS Notificações Instantâneas Bluetooth Chamadas Lanterna Bússola",
          "price": 194,
          "oldPrice": 599,
          "category": "Eletrônicos",
          "badge": "67% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_692805-MLA115517949733_082026-AB.webp",
          "link": "https://meli.la/1NYc7zn",
          "clicks": 0
        },
{
          "id": 12,
          "title": "Relógio Inteligente Smartwatch Redondo Peje Pro Amoled Nfc Preto Lançamento Unisexx",
          "price": 159.99,
          "oldPrice": 499,
          "category": "Eletrônicos",
          "badge": "67% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_874071-MLB109386995843_032026-AB.webp",
          "link": "https://meli.la/2oEVmvh",
          "clicks": 0
        },
{
          "id": 13,
          "title": "Fone Ouvido Bluetooth 5.3 Tws M10 A Prova D 'água Microfone",
          "price": 20.89,
          "oldPrice": 59.9,
          "category": "Eletrônicos",
          "badge": "65% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_885015-MLA116702280731_082026-AB.webp",
          "link": "https://meli.la/2mtQjrK",
          "clicks": 0
        },
{
          "id": 14,
          "title": "Smartwatch Multi L2 Tela 1.83 Proteção Ip67 Rosé - Wr203",
          "price": 89.68,
          "oldPrice": 249,
          "category": "Eletrônicos",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_880437-MLA96183538683_102025-AB.webp",
          "link": "https://meli.la/26Qz1dU",
          "clicks": 0
        },
{
          "id": 15,
          "title": "Fone Open Ear Dapon DPF25 Bluetooth 6.0 Sem Fio Com Microfone ENC 6H Tempo de espera de até 200 horas Cor Preto",
          "price": 74.9,
          "oldPrice": 219,
          "category": "Eletrônicos",
          "badge": "65% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_987904-MLA114643497781_072026-AB.webp",
          "link": "https://meli.la/1VfxP7N",
          "clicks": 0
        },
{
          "id": 16,
          "title": "Controle Sem Fio Bluetooth Para P4 Joystick Gamepad Manete Gamer Compatível PC Notebook Smart TV Android Celular Touchpad Vibração Bateria Recarregável Entrada P2 Preto Gatão",
          "price": 50.34,
          "oldPrice": 129.9,
          "category": "Eletrônicos",
          "badge": "61% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_776330-MLA117666047699_092026-AB.webp",
          "link": "https://meli.la/2KYfS2p",
          "clicks": 0
        },
{
          "id": 17,
          "title": "Caixa De Som Bluetooth Grande Alto Falante 8 1000w Pmpo Saida 10w",
          "price": 173,
          "oldPrice": 429.97,
          "category": "Eletrônicos",
          "badge": "59% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_636256-MLA99984790479_112025-AB.webp",
          "link": "https://meli.la/1wZhaBH",
          "clicks": 0
        },
{
          "id": 18,
          "title": "Volante Gamer Pc Ps4 Ps3 Xbox Series X/s/one Nintendo Cor Preto",
          "price": 273.15,
          "oldPrice": 726.99,
          "category": "Eletrônicos",
          "badge": "62% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_955449-MLA99506531294_112025-AB.webp",
          "link": "https://meli.la/33jRSpV",
          "clicks": 0
        },
{
          "id": 19,
          "title": "JBL Caixa De Som Go 4 Black À Prova D'água Cor Preto",
          "price": 283.95,
          "oldPrice": 699,
          "category": "Eletrônicos",
          "badge": "59% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_996829-MLU78614455458_082024-AB.webp",
          "link": "https://meli.la/1aL1t3W",
          "clicks": 0
        },
{
          "id": 20,
          "title": "Smart TV AIWA 43” Android Full HD Borda Ultrafina HDR10 Dolby Áudio AWS-TV-43-BL-02-A",
          "price": 1380,
          "oldPrice": 3400,
          "category": "Eletrônicos",
          "badge": "59% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_994322-MLA99533174096_122025-AB.webp",
          "link": "https://meli.la/2SYeBvV",
          "clicks": 0
        },
{
          "id": 21,
          "title": "Colar Feminino Ponto De Luz Zircônia Folheado A Ouro18k Dourado",
          "price": 23.32,
          "oldPrice": 29.9,
          "category": "Moda",
          "badge": "22% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_699374-MLB82078566201_012025-AB.webp",
          "link": "https://meli.la/2oYUmW7",
          "clicks": 0
        },
{
          "id": 22,
          "title": "Macaquinho Virginia Poli Zero Transparencia Fitness",
          "price": 28.49,
          "oldPrice": 119.99,
          "category": "Moda",
          "badge": "76% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_722310-MLB88477282950_072025-AB.webp",
          "link": "https://meli.la/1yKtK3i",
          "clicks": 0
        },
{
          "id": 23,
          "title": "Legging Trifil Original Feminina Texturizada Sem Costura Preto Legging Academia Fitness M",
          "price": 75.04,
          "oldPrice": 247.77,
          "category": "Moda",
          "badge": "69% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_731345-MLB117872112409_092026-AB.webp",
          "link": "https://meli.la/2WC5EoZ",
          "clicks": 0
        },
{
          "id": 24,
          "title": "Tênis Asics Revelation Couro Corrida Caminhada Treino Barato",
          "price": 99.9,
          "oldPrice": 333,
          "category": "Moda",
          "badge": "70% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_856931-MLB118561877093_102026-AB.webp",
          "link": "https://meli.la/2bDbGS2",
          "clicks": 0
        },
{
          "id": 25,
          "title": "Chinelo Kenner Rakka Masculino Confortável Original Macio Rakka Preto Laranja 39 / 40",
          "price": 99.89,
          "oldPrice": 329.9,
          "category": "Moda",
          "badge": "69% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_976300-MLB115634964148_092026-AB.webp",
          "link": "https://meli.la/2apEwWp",
          "clicks": 0
        },
{
          "id": 26,
          "title": "Tênis Mizuno Academia Creation Caminhada Macio Treino Oferta Mizuno Branco Preto 40 Br",
          "price": 99.9,
          "oldPrice": 333,
          "category": "Moda",
          "badge": "70% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_629879-MLB114160385059_072026-AB.webp",
          "link": "https://meli.la/1krW85t",
          "clicks": 0
        },
{
          "id": 27,
          "title": "Relógio Anel Euro Dourado Unique Eu2035yyi/4d em Aço com aro de pedras Feminino",
          "price": 94.9,
          "oldPrice": 299,
          "category": "Moda",
          "badge": "68% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_637856-MLA95736961618_102025-AB.webp",
          "link": "https://meli.la/1wZyXnk",
          "clicks": 0
        },
{
          "id": 28,
          "title": "Mochila Masculina Grande Notebook Impermeável Reforçada Woosh",
          "price": 37.99,
          "oldPrice": 120,
          "category": "Moda",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_793055-MLA115825214508_092026-AB.webp",
          "link": "https://meli.la/1GPvHqG",
          "clicks": 0
        },
{
          "id": 29,
          "title": "Tenis Sneaker Drx Masculino Macio Leve Moda Stretwear Casual",
          "price": 53,
          "oldPrice": 140.9,
          "category": "Moda",
          "badge": "62% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_604469-MLB114757997039_072026-AB.webp",
          "link": "https://meli.la/2PLAuHf",
          "clicks": 0
        },
{
          "id": 30,
          "title": "Relógio Casio Vintage AQ-230A-7A de Aço Inoxidável Prateado",
          "price": 98.89,
          "oldPrice": 319,
          "category": "Moda",
          "badge": "69% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_641101-MLA114384147135_072026-AB.webp",
          "link": "https://meli.la/1hFnjvC",
          "clicks": 0
        },
{
          "id": 31,
          "title": "Kit 2 Calça Academia Poliamida Elastano Jogger Masculina Preto - Cinza Gg",
          "price": 69.99,
          "oldPrice": 169.99,
          "category": "Moda",
          "badge": "58% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_608724-MLB116321817206_092026-AB.webp",
          "link": "https://meli.la/2iiFEmt",
          "clicks": 0
        },
{
          "id": 32,
          "title": "Tornozeleiras Folheadas Ouro 18k Singapura Coração Presente Dourado 22 Cm",
          "price": 19.76,
          "oldPrice": 49.9,
          "category": "Moda",
          "badge": "60% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_651946-MLB88875003229_072025-AB.webp",
          "link": "https://meli.la/2nNKtqj",
          "clicks": 0
        },
{
          "id": 33,
          "title": "Vestido Feminino Longo Alça Fina Estampado Detalhe Bolsos Branco/pink Único",
          "price": 66,
          "oldPrice": 189.9,
          "category": "Moda",
          "badge": "65% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_612537-MLB109782495621_032026-AB.webp",
          "link": "https://meli.la/2rxMKLw",
          "clicks": 0
        },
{
          "id": 34,
          "title": "Aliança Prata Feminina Masculina Fina Namoro Compromisso 3mm",
          "price": 27.27,
          "oldPrice": 78,
          "category": "Moda",
          "badge": "65% OFF com Cupom",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_697845-MLB112579248699_062026-AB.webp",
          "link": "https://meli.la/2LnPcxa",
          "clicks": 0
        },
{
          "id": 35,
          "title": "Tênis Feminino Casual Sola Alta Moda Tendência",
          "price": 59.9,
          "oldPrice": 79.9,
          "category": "Moda",
          "badge": "25% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_609812-MLB108736522538_032026-AB.webp",
          "link": "https://meli.la/1YunoBL",
          "clicks": 0
        },
{
          "id": 36,
          "title": "Relógio Technos Masculino Quartzo Aço Inoxidável Resistente Água Prata",
          "price": 179.99,
          "oldPrice": 429.59,
          "category": "Moda",
          "badge": "58% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_927298-MLA104676235693_012026-AB.webp",
          "link": "https://meli.la/27xxcsm",
          "clicks": 0
        },
{
          "id": 37,
          "title": "Kit 4 Bermuda Shorts Tactel Sandrini Elastano Academia Praia Sortidos Liso P",
          "price": 55.19,
          "oldPrice": 124.99,
          "category": "Moda",
          "badge": "55% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_740026-MLB86614660221_062025-AB.webp",
          "link": "https://meli.la/1xXx9ux",
          "clicks": 0
        },
{
          "id": 38,
          "title": "Conjunto Colar E Brinco Gota Azul A Ouro 18k Fique Linda Ouro 18k",
          "price": 33,
          "oldPrice": 89.99,
          "category": "Moda",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_806084-MLB113440223416_072026-AB.webp",
          "link": "https://meli.la/1uUmvq1",
          "clicks": 0
        },
{
          "id": 39,
          "title": "Tênis Fila Maxxi Lite Masculino Leve Confortável Original",
          "price": 189.99,
          "oldPrice": 386.63,
          "category": "Moda",
          "badge": "50% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_978253-MLB108366225803_032026-AB.webp",
          "link": "https://meli.la/2JSCb9s",
          "clicks": 0
        },
{
          "id": 40,
          "title": "Tenis Masculino Esportivo Olimpic Academia Caminhada Promoçã Preto/branco 40 Br",
          "price": 97,
          "oldPrice": 199.9,
          "category": "Moda",
          "badge": "51% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_796435-MLB114605939317_072026-AB.webp",
          "link": "https://meli.la/2hktURX",
          "clicks": 0
        },
{
          "id": 41,
          "title": "Mixer Elétrico Portátil 2 em 1 Recarregável Potente Misturador de Bebidas e Ovos 3 Velocidades Usb Batedor e Fue Fouet Woosh",
          "price": 17.93,
          "oldPrice": 78.99,
          "category": "Casa & Cozinha",
          "badge": "77% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_619021-MLA118179806341_092026-AB.webp",
          "link": "https://meli.la/1jCmyqU",
          "clicks": 0
        },
{
          "id": 42,
          "title": "Chuveiro Ducha Lorenzetti Loren Shower Eletrônico Branco 6800w 220V",
          "price": 111.53,
          "oldPrice": 399.7,
          "category": "Casa & Cozinha",
          "badge": "72% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_701411-MLA118019551713_092026-AB.webp",
          "link": "https://meli.la/2Z7YWKh",
          "clicks": 0
        },
{
          "id": 43,
          "title": "Chuveiro elétrico de parede Lorenzetti Futura Multitemperaturas branco 6800W",
          "price": 144.4,
          "oldPrice": 499,
          "category": "Casa & Cozinha",
          "badge": "71% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_779801-MLA99445789764_112025-AB.webp",
          "link": "https://meli.la/2HRoBCE",
          "clicks": 0
        },
{
          "id": 44,
          "title": "WAP Air Heat FW009371 Aquecedor Elétrico Portátil 3 em 1 220V Potência 2000W Triplo Sistema Segurança",
          "price": 46.3,
          "oldPrice": 174,
          "category": "Casa & Cozinha",
          "badge": "73% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_891709-MLA115068451649_072026-AB.webp",
          "link": "https://meli.la/1pMzhrA",
          "clicks": 0
        },
{
          "id": 45,
          "title": "Eps-158 Kit Faqueiro Dourado Luxo Jogo Talheres Inox 24pçs + Maleta Sem Estampa",
          "price": 69.9,
          "oldPrice": 219.9,
          "category": "Casa & Cozinha",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_834599-MLA110520212053_042026-AB.webp",
          "link": "https://meli.la/2bhZvNt",
          "clicks": 0
        },
{
          "id": 46,
          "title": "Cadeira De Escritorio Begonia Tela Mesh Ergonomica Giratoria Preto",
          "price": 119.61,
          "oldPrice": 360.93,
          "category": "Casa & Cozinha",
          "badge": "66% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_704151-MLB116985411119_082026-AB.webp",
          "link": "https://meli.la/2aP9iqh",
          "clicks": 0
        },
{
          "id": 47,
          "title": "Sanduicheira Multilaser Grill Gourmet 750w Preta Ce043 Cor Preto",
          "price": 54.99,
          "oldPrice": 199,
          "category": "Casa & Cozinha",
          "badge": "72% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_798833-MLA99962055785_112025-AB.webp",
          "link": "https://meli.la/2k67Ad4",
          "clicks": 0
        },
{
          "id": 48,
          "title": "Armário de Cozinha Poliman Sicília Médio, 5 Portas e 2 Gavetas, Freijó Off",
          "price": 467.96,
          "oldPrice": 1299,
          "category": "Casa & Cozinha",
          "badge": "64% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_791663-MLA114390069787_072026-AB.webp",
          "link": "https://meli.la/1KwEJAa",
          "clicks": 0
        },
{
          "id": 49,
          "title": "Fritadeira sem óleo air fryer 4L Mondial 1500W AFN-40-BFT",
          "price": 239,
          "oldPrice": 716.9,
          "category": "Casa & Cozinha",
          "badge": "66% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_775407-MLA99776749612_122025-AB.webp",
          "link": "https://meli.la/1Lxkene",
          "clicks": 0
        },
{
          "id": 50,
          "title": "Jogo 6 Taças de Cristal 340ml Diamond Transparente Lapidado Vitrex",
          "price": 29.35,
          "oldPrice": 78.9,
          "category": "Casa & Cozinha",
          "badge": "62% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_941219-MLA112602385648_062026-AB.webp",
          "link": "https://meli.la/1RaM8yV",
          "clicks": 0
        },
{
          "id": 51,
          "title": "Câmera Segurança Ip Externa Wifi A28 App Icsee À Prova Dágua Ip66 Dome Lente Dupla Lentes 2 Em 1 Vigilancia Visão Noturna Infravermelho 4k Uhd Nova Geração Lançamento 2026 Nexgen",
          "price": 127.99,
          "oldPrice": 350,
          "category": "Casa & Cozinha",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_927792-MLB91185357960_092025-AB.webp",
          "link": "https://meli.la/1ce53Kw",
          "clicks": 0
        },
{
          "id": 52,
          "title": "Varal De Chão Grande De Roupas 3 Andares Dobrável Cor Azul Kontuz 170 cm",
          "price": 68.95,
          "oldPrice": 219.9,
          "category": "Casa & Cozinha",
          "badge": "68% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_854633-MLA119226640033_102026-AB.webp",
          "link": "https://meli.la/2xK2cXn",
          "clicks": 0
        },
{
          "id": 53,
          "title": "Fritadeira Air Fryer Oven Philco Paf16a 16l 4 Em 1 - 220v Preto 220v",
          "price": 626.9,
          "oldPrice": 1800,
          "category": "Casa & Cozinha",
          "badge": "65% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_875388-MLA82462695501_022025-AB.webp",
          "link": "https://meli.la/1zyG8Ro",
          "clicks": 0
        },
{
          "id": 54,
          "title": "Armário De Cozinha Completo 5 Portas 1 Gaveta Com Nichos Cinamomo/grafite",
          "price": 318.79,
          "oldPrice": 799,
          "category": "Casa & Cozinha",
          "badge": "60% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_758173-MLB116007686618_092026-AB.webp",
          "link": "https://meli.la/21qRJ2w",
          "clicks": 0
        },
{
          "id": 55,
          "title": "Panela De Pressão Mecânica Preta E Inox 4l Midea Cor Cinza",
          "price": 256,
          "oldPrice": 699,
          "category": "Casa & Cozinha",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_872935-MLA99966963747_112025-AB.webp",
          "link": "https://meli.la/2Q2SkQU",
          "clicks": 0
        },
{
          "id": 56,
          "title": "Fritadeira Elétrica Air Fryer Wap Wafg2s 5 Litros Com Revestimento Antiaderente 1500w 220v",
          "price": 219,
          "oldPrice": 598,
          "category": "Casa & Cozinha",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_646462-MLA89509974686_082025-AB.webp",
          "link": "https://meli.la/1AMNATZ",
          "clicks": 0
        },
{
          "id": 57,
          "title": "Escorredor De Pratos Louça Preto Cozinha Suspensa 65cm 18pçs Preto",
          "price": 139.3,
          "oldPrice": 384.62,
          "category": "Casa & Cozinha",
          "badge": "63% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_645073-MLB114013970360_072026-AB.webp",
          "link": "https://meli.la/2NinuQ2",
          "clicks": 0
        },
{
          "id": 58,
          "title": "Torneira Gourmet Luxo Flexível Cozinha Parede 2 Jatos Pia Metal Cor Aço Inox e Preto- Marca Camperluz",
          "price": 25.97,
          "oldPrice": 59.97,
          "category": "Casa & Cozinha",
          "badge": "56% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_746561-MLA111291534913_052026-AB.webp",
          "link": "https://meli.la/1c5zywX",
          "clicks": 0
        },
{
          "id": 59,
          "title": "Armário de Cozinha Completa Compacta 5 Portas em MDF Cinamomo/Off White - Blue Moby",
          "price": 474,
          "oldPrice": 1099,
          "category": "Casa & Cozinha",
          "badge": "56% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_967733-MLA114241563568_082026-AB.webp",
          "link": "https://meli.la/2Pi9sEm",
          "clicks": 0
        },
{
          "id": 60,
          "title": "Balança Digital Bioimpedância Profissional smart imc 180kg Bluetooth Corporal Aparelho Alta Capacidade aplicativo App para Android e para IOS Balança De Banheiro Academia",
          "price": 32.9,
          "oldPrice": 84.9,
          "category": "Casa & Cozinha",
          "badge": "61% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_750371-MLA116617370667_082026-AB.webp",
          "link": "https://meli.la/2J5Mp54",
          "clicks": 0
        },
{
          "id": 61,
          "title": "Gloss Fran By Franciny Ehlke Liphoney Mel Liphoney-mel",
          "price": 19.01,
          "oldPrice": 69.99,
          "category": "Beleza",
          "badge": "72% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_855365-MLB95050151929_102025-AB.webp",
          "link": "https://meli.la/1Mwpinp",
          "clicks": 0
        },
{
          "id": 62,
          "title": "Aparador De Pelos Saco Homem P D'agua Barberpro Ultra íntimos",
          "price": 155,
          "oldPrice": 450,
          "category": "Beleza",
          "badge": "65% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_608043-MLA99960994505_112025-AB.webp",
          "link": "https://meli.la/2JmoHbn",
          "clicks": 0
        },
{
          "id": 63,
          "title": "Braé Essential Oil Blend Reparação E Proteção Térmica 60ml",
          "price": 57.95,
          "oldPrice": 133.09,
          "category": "Beleza",
          "badge": "56% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_747071-MLA112400438167_052026-AB.webp",
          "link": "https://meli.la/2WbnYHL",
          "clicks": 0
        },
{
          "id": 64,
          "title": "Kit Fran Love Kit Gloss Labial E Lápis Labial By Franciny",
          "price": 48.75,
          "oldPrice": 129.99,
          "category": "Beleza",
          "badge": "62% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_666525-MLB85597283317_062025-AB.webp",
          "link": "https://meli.la/1aDAnV9",
          "clicks": 0
        },
{
          "id": 65,
          "title": "Kit Gloss Hidratante Labial Franboesa + Gloss Labial Lip Bunny Triple Chocolate - Fran By Franciny Ehlke",
          "price": 40.67,
          "oldPrice": 104.7,
          "category": "Beleza",
          "badge": "61% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_842770-MLA116205993339_082026-AB.webp",
          "link": "https://meli.la/1H9sgMx",
          "clicks": 0
        },
{
          "id": 66,
          "title": "Perfume Masculino Boss Bottled Eua de Parfum 100ml Hugo Boss",
          "price": 404.61,
          "oldPrice": 859,
          "category": "Beleza",
          "badge": "52% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_819266-MLU72775679269_112023-AB.webp",
          "link": "https://meli.la/1CRgXQj",
          "clicks": 0
        },
{
          "id": 67,
          "title": "Perfume Arábe Asad Bourbon 100ml - Marca Isabelle La Belle | Fixação Intensa, Notas Amadeiradas Marcantes E Elegância Masculina",
          "price": 88.18,
          "oldPrice": 187.88,
          "category": "Beleza",
          "badge": "53% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_862309-MLB109042590357_032026-AB.webp",
          "link": "https://meli.la/1GdgUSr",
          "clicks": 0
        },
{
          "id": 68,
          "title": "Perfume Feminino Lancôme Miracle EDP 50ml",
          "price": 498.22,
          "oldPrice": 1029,
          "category": "Beleza",
          "badge": "51% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_656662-MLA87309865848_072025-AB.webp",
          "link": "https://meli.la/2dnr4Du",
          "clicks": 0
        },
{
          "id": 69,
          "title": "Creme Multirreparador Pele Sensível Cicaplast Baume B5+ La Roche-Posay 20ml",
          "price": 29.55,
          "oldPrice": 59.9,
          "category": "Beleza",
          "badge": "50% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_906529-MLA115584916886_092026-AB.webp",
          "link": "https://meli.la/2eHZLTP",
          "clicks": 0
        },
{
          "id": 70,
          "title": "Cortador De Cabelo Mondial Super Groom 6 Bg-04 Melhor Categ Preto/verde",
          "price": 91.34,
          "oldPrice": 184.9,
          "category": "Beleza",
          "badge": "50% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_738685-MLA100002770137_112025-AB.webp",
          "link": "https://meli.la/2NA46Go",
          "clicks": 0
        },
{
          "id": 71,
          "title": "PERFUME DA NOIVA ÁRABE DURRAT ALL AROOS 85 ML EDP",
          "price": 133.9,
          "oldPrice": 272.55,
          "category": "Beleza",
          "badge": "50% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_979648-MLA116569704466_092026-AB.webp",
          "link": "https://meli.la/1312QQ3",
          "clicks": 0
        },
{
          "id": 72,
          "title": "L'Oréal Paris Elseve Óleo Extraordinário 100ml - Leave In Anti Frizz Protetor Térmico Tratamento Reconstrutor Para Todos Os Tipos De Cabelo",
          "price": 32.39,
          "oldPrice": 64.19,
          "category": "Beleza",
          "badge": "49% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_605503-MLA114497234356_082026-AB.webp",
          "link": "https://meli.la/21Qn7i2",
          "clicks": 0
        },
{
          "id": 73,
          "title": "Escova Secadora Profissional 1200w 3 Em 1 Alisa Modela Seca Preto 127v",
          "price": 40.39,
          "oldPrice": 78.9,
          "category": "Beleza",
          "badge": "48% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_761502-MLB113976307942_072026-AB.webp",
          "link": "https://meli.la/1xXFEHK",
          "clicks": 0
        },
{
          "id": 74,
          "title": "Kaiak Masculino Tradicional Natura Desodorante Colônia Perfume Clássico Original 100ml",
          "price": 94.41,
          "oldPrice": 185.9,
          "category": "Beleza",
          "badge": "49% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_698757-MLB82072269017_012025-AB.webp",
          "link": "https://meli.la/2XBDXQ7",
          "clicks": 0
        },
{
          "id": 75,
          "title": "Armani Beauty, Perfume Masculino, Acqua di Giò Profondo Parfum, 50ml",
          "price": 363.37,
          "oldPrice": 719,
          "category": "Beleza",
          "badge": "49% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_831743-MLA91145912643_082025-AB.webp",
          "link": "https://meli.la/2MsdgbV",
          "clicks": 0
        },
{
          "id": 76,
          "title": "kit Presente Cuide-Se Bem Deleite O Boticário 3 itens",
          "price": 89.98,
          "oldPrice": 174,
          "category": "Beleza",
          "badge": "48% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_774946-MLA106898902116_022026-AB.webp",
          "link": "https://meli.la/1AXqC7x",
          "clicks": 0
        },
{
          "id": 77,
          "title": "Máscara de Reconstrução Profunda para Cabelos Danificados, Força e Elasticidade Résistance Thérapiste Kérastase 200ml",
          "price": 206.1,
          "oldPrice": 399.9,
          "category": "Beleza",
          "badge": "48% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_753132-MLA99450295832_112025-AB.webp",
          "link": "https://meli.la/11C1zxP",
          "clicks": 0
        },
{
          "id": 78,
          "title": "Kit Eudora Siage Cica-Therapy Shampoo 250ml + Máscara 250g",
          "price": 67.99,
          "oldPrice": 127.09,
          "category": "Beleza",
          "badge": "46% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_658406-MLA117339689810_102026-AB.webp",
          "link": "https://meli.la/2dFx7uu",
          "clicks": 0
        },
{
          "id": 79,
          "title": "Maquina De Cortar Cabelo Profissional Kemei Km-2606 Bivolt Bordô 127/220v",
          "price": 101.18,
          "oldPrice": 219.9,
          "category": "Beleza",
          "badge": "53% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_911550-MLB115259230324_082026-AB.webp",
          "link": "https://meli.la/2mgSVz1",
          "clicks": 0
        },
{
          "id": 80,
          "title": "Perfume Feminino Lancôme Idôle Edt 50ml",
          "price": 406.21,
          "oldPrice": 739,
          "category": "Beleza",
          "badge": "45% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_753868-MLA92374541270_092025-AB.webp",
          "link": "https://meli.la/2psRrKX",
          "clicks": 0
        },
{
          "id": 81,
          "title": "POLARES Z20 Patinete Elétrico Premium 500w Pneu Aderente Velocidade Máxima 32km/h Motorizado Até 30km De Autonomia Polares",
          "price": 1310,
          "oldPrice": 3999,
          "category": "Esportes",
          "badge": "67% OFF com Cupom",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_930984-MLA115093589860_082026-AB.webp",
          "link": "https://meli.la/1UG9mMf",
          "clicks": 0
        },
{
          "id": 82,
          "title": "Bicicleta Ergométrica Spinning Bike Ergométrica It's X11 Bicicleta Ergométrica Preto/vermelho",
          "price": 439.9,
          "oldPrice": 1399,
          "category": "Esportes",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_707080-MLB114235277164_082026-AB.webp",
          "link": "https://meli.la/2TVcx7H",
          "clicks": 0
        },
{
          "id": 83,
          "title": "Alavancas Câmbio X-Time EZ Fire 21V 3x7 Marchas Alumínio",
          "price": 26,
          "oldPrice": 65,
          "category": "Esportes",
          "badge": "60% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_893745-MLA99613302440_122025-AB.webp",
          "link": "https://meli.la/1JDdDuj",
          "clicks": 0
        },
{
          "id": 84,
          "title": "Creatina 100g Creatina Monohidratada Max Titanium Sem Sabor Alta Pureza",
          "price": 22.9,
          "oldPrice": 71.82,
          "category": "Esportes",
          "badge": "68% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_697835-MLA117269994412_102026-AB.webp",
          "link": "https://meli.la/1LjpcD8",
          "clicks": 0
        },
{
          "id": 85,
          "title": "Garrafa Térmica Inox 900ml Tampa Flip Straw Canudo Com Alça Rosa-claro",
          "price": 42.73,
          "oldPrice": 128,
          "category": "Esportes",
          "badge": "66% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_778316-MLB115759692685_082026-AB.webp",
          "link": "https://meli.la/1wcgfZQ",
          "clicks": 0
        },
{
          "id": 86,
          "title": "Bicicleta Ergométrica Bike Spinning 6kg Sensação Inércia Fitness Preto E Vermelho Sevenfit Para Cardio",
          "price": 458.9,
          "oldPrice": 1094,
          "category": "Esportes",
          "badge": "58% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_745785-MLA114987927277_072026-AB.webp",
          "link": "https://meli.la/1wR1Y5w",
          "clicks": 0
        },
{
          "id": 87,
          "title": "Bicicleta Ergometrica Bike Spinning Academia Fitness Ginastica Roda Inercia 8kg Its Profissional Aparelho Cardio Treino Em Casa Vertical Residencial",
          "price": 426.88,
          "oldPrice": 1200,
          "category": "Esportes",
          "badge": "64% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_810036-MLB116554901386_092026-AB.webp",
          "link": "https://meli.la/24e8xH7",
          "clicks": 0
        },
{
          "id": 88,
          "title": "Proteína Max Titanium Whey Pro Concetrado em pó sabor Morango x 1kg",
          "price": 87.72,
          "oldPrice": 199.9,
          "category": "Esportes",
          "badge": "56% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_608162-MLA112813208483_062026-AB.webp",
          "link": "https://meli.la/22Zj4Xw",
          "clicks": 0
        },
{
          "id": 89,
          "title": "Garrafa Térmica 800ml Inox Bico Duplo Canudo Alça Esporte Azul",
          "price": 41,
          "oldPrice": 99.99,
          "category": "Esportes",
          "badge": "58% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_613019-MLB116795899587_082026-AB.webp",
          "link": "https://meli.la/2YxBfLU",
          "clicks": 0
        },
{
          "id": 90,
          "title": "Copo Térmico Inóx Com Canudo E Tampa Grande 1200ml 1.2litros Azul Celeste Liso",
          "price": 30.15,
          "oldPrice": 59.9,
          "category": "Esportes",
          "badge": "49% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_834022-MLB115540972291_082026-AB.webp",
          "link": "https://meli.la/1gvT9wA",
          "clicks": 0
        },
{
          "id": 91,
          "title": "Kit Halteres 3 Em 1 Peso Musculação Até 20kg Ajustável Preto Cor preto-amarelo",
          "price": 194.88,
          "oldPrice": 432.4,
          "category": "Esportes",
          "badge": "54% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_736304-MLA84850918113_052025-AB.webp",
          "link": "https://meli.la/2599HG6",
          "clicks": 0
        },
{
          "id": 92,
          "title": "Kit 500 Anzóis Aço Carbono #3 Ao #12 Caixa Anzol Chinu Pesca",
          "price": 30.99,
          "oldPrice": 58.9,
          "category": "Esportes",
          "badge": "47% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_782318-MLB116097715296_092026-AB.webp",
          "link": "https://meli.la/1ZEkHFL",
          "clicks": 0
        },
{
          "id": 93,
          "title": "Garrafa Térmica 800ml Água Azarte Inox Academia Com Alça Branca",
          "price": 31.55,
          "oldPrice": 59.9,
          "category": "Esportes",
          "badge": "47% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_789750-MLB114582073186_082026-AB.webp",
          "link": "https://meli.la/2YKRsDB",
          "clicks": 0
        },
{
          "id": 94,
          "title": "Copo Térmico Gigante 1,2l Inox Com Tampa Inox Canudo Escova Roxo Claro Cor Pura / Material Fosco",
          "price": 48.36,
          "oldPrice": 99.99,
          "category": "Esportes",
          "badge": "51% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_879721-MLB115920850639_082026-AB.webp",
          "link": "https://meli.la/2rJnNNL",
          "clicks": 0
        },
{
          "id": 95,
          "title": "Bicicleta Scooter Elétrica Xplore 48v/ 12ah 500w Sem Cnh Preto",
          "price": 3399,
          "oldPrice": 5999,
          "category": "Esportes",
          "badge": "43% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_779139-MLA115894400855_082026-AB.webp",
          "link": "https://meli.la/1GSSZBK",
          "clicks": 0
        },
{
          "id": 96,
          "title": "Chuteira Campo Striker Nova Adulto Trava Original Uzze Preto 41 Br",
          "price": 58.99,
          "oldPrice": 119.98,
          "category": "Esportes",
          "badge": "50% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_977441-MLB112202816401_052026-AB.webp",
          "link": "https://meli.la/1NFrdAN",
          "clicks": 0
        },
{
          "id": 97,
          "title": "Creatina Integralmédica Monohidratada Hardcore em pó sabor Limão x 350g",
          "price": 44.5,
          "oldPrice": 79.9,
          "category": "Esportes",
          "badge": "44% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_850696-MLA99470524832_112025-AB.webp",
          "link": "https://meli.la/24jZw5e",
          "clicks": 0
        },
{
          "id": 98,
          "title": "Raquete Beach Tennis adidas Bt 3.0 Fiberglass 24 Furos Cor Azul/lima",
          "price": 218.74,
          "oldPrice": 439.9,
          "category": "Esportes",
          "badge": "50% OFF com Cupom",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_853109-MLA110090526628_042026-AB.webp",
          "link": "https://meli.la/1AYPUv7",
          "clicks": 0
        },
{
          "id": 99,
          "title": "Cinto De Hidratação Com 2x Garrafinhas Para Corrida Pochete",
          "price": 48.36,
          "oldPrice": 78,
          "category": "Esportes",
          "badge": "38% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_812560-MLB101614500393_122025-AB.webp",
          "link": "https://meli.la/1d2buB6",
          "clicks": 0
        },
{
          "id": 100,
          "title": "1000ml Garrafa Térmica Isolada A Vácuo Squeeze Aço Inox 304 para Água Gelada Esporte Academia com Alça e Bico Preto Sólar",
          "price": 36.92,
          "oldPrice": 59.9,
          "category": "Esportes",
          "badge": "38% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_917939-MLA115026330219_072026-AB.webp",
          "link": "https://meli.la/2EdBmH1",
          "clicks": 0
        },
{
          "id": 101,
          "title": "Parafusadeira Furadeira Impacto Sem Fio 2 Baterias Recarregável 48v Bivolt Velocidade Ajustavel Com Travas Mandril Resistente Woosh",
          "price": 122.99,
          "oldPrice": 499.99,
          "category": "Ferramentas",
          "badge": "75% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_956285-MLA115392782062_082026-AB.webp",
          "link": "https://meli.la/2ZRFVjj",
          "clicks": 0
        },
{
          "id": 102,
          "title": "Conjunto 3 Mangueiras Manifold 90cm 1/4 Sae R22 R410a Preta",
          "price": 67,
          "oldPrice": 250,
          "category": "Ferramentas",
          "badge": "73% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_619610-MLB115078296414_082026-AB.webp",
          "link": "https://meli.la/2FrBmEF",
          "clicks": 0
        },
{
          "id": 103,
          "title": "Compressor de Ar Digital Mini Portátil sem Fio para Carro, Moto e Bicicleta",
          "price": 66.6,
          "oldPrice": 195.9,
          "category": "Ferramentas",
          "badge": "66% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_637618-MLA109832243653_032026-AB.webp",
          "link": "https://meli.la/2b4h6wY",
          "clicks": 0
        },
{
          "id": 104,
          "title": "Pistola De Pintura Elétrica Pulverizador Tinta 650w 2.5mm 1l Azul 110v",
          "price": 151.71,
          "oldPrice": 520,
          "category": "Ferramentas",
          "badge": "70% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_687486-MLB116695830475_082026-AB.webp",
          "link": "https://meli.la/2Xjzt4E",
          "clicks": 0
        },
{
          "id": 105,
          "title": "Bolsa Mala De Ferramentas 14 Pol Lona 1200d Para Soldador",
          "price": 34.82,
          "oldPrice": 99,
          "category": "Ferramentas",
          "badge": "64% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_990578-MLB116297130130_092026-AB.webp",
          "link": "https://meli.la/2FJjzi7",
          "clicks": 0
        },
{
          "id": 106,
          "title": "Pulverizador Manual Pressurizado 1,5L Laranja Bico Regulável para Jardim Plantas Limpeza Automotiva Carro Casa Multiuso Pulverização Portátil Ajustável",
          "price": 19,
          "oldPrice": 49.9,
          "category": "Ferramentas",
          "badge": "61% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_659159-MLA115943043890_092026-AB.webp",
          "link": "https://meli.la/2ZjMYgR",
          "clicks": 0
        },
{
          "id": 107,
          "title": "Gravador Elétrico Vonder GRV 7000 Para Metal Vidro Madeira Plástico",
          "price": 121.26,
          "oldPrice": 300,
          "category": "Ferramentas",
          "badge": "59% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_735695-MLA115344585020_082026-AB.webp",
          "link": "https://meli.la/13E3U3U",
          "clicks": 0
        },
{
          "id": 108,
          "title": "Parafusadeira Furadeira 48v Profissional 2 Baterias Sem Fio Amarelo 127/220v 60 Hz",
          "price": 104.31,
          "oldPrice": 299.9,
          "category": "Ferramentas",
          "badge": "65% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_951617-MLB110943565198_052026-AB.webp",
          "link": "https://meli.la/1rYSDmu",
          "clicks": 0
        },
{
          "id": 109,
          "title": "Mini Motosserra a Bateria Portátil Brushless 1000w Bivolt 2 Baterias",
          "price": 180.14,
          "oldPrice": 499,
          "category": "Ferramentas",
          "badge": "63% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_930950-MLA112720924866_062026-AB.webp",
          "link": "https://meli.la/2PbF6wg",
          "clicks": 0
        },
{
          "id": 110,
          "title": "Lavadora de Alta Pressão Kärcher Compacta 1.500 PSI/Libras 1400W 300L/h com Aplicador de Detergente e Lança Regulável 220v",
          "price": 299,
          "oldPrice": 700,
          "category": "Ferramentas",
          "badge": "57% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_681126-MLA115545993062_082026-AB.webp",
          "link": "https://meli.la/2CXDf8T",
          "clicks": 0
        },
{
          "id": 111,
          "title": "Lavadora Portátil Lava Jato De Alta Pressão 2 Baterias Preto 127/220v",
          "price": 99.42,
          "oldPrice": 249.9,
          "category": "Ferramentas",
          "badge": "60% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_970164-MLB111591957617_052026-AB.webp",
          "link": "https://meli.la/1fcTtiT",
          "clicks": 0
        },
{
          "id": 112,
          "title": "Lavadora A Jato De Alta Pressão Portátil Recarregável 2 Baterias Com Maleta Mini Elétrica De Lavar Carro Profissional Potência Turbo Limpeza Compacta Potente Regulável Reservatório Aua",
          "price": 102.84,
          "oldPrice": 249.97,
          "category": "Ferramentas",
          "badge": "58% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_785124-MLA101684683842_122025-AB.webp",
          "link": "https://meli.la/31SJwbJ",
          "clicks": 0
        },
{
          "id": 113,
          "title": "Corrente Motosserra Para Stihl Ms-170 3/8 22 Dentes 1,1m",
          "price": 28.9,
          "oldPrice": 59.9,
          "category": "Ferramentas",
          "badge": "51% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_600016-MLB114241510818_082026-AB.webp",
          "link": "https://meli.la/1XJpRrz",
          "clicks": 0
        },
{
          "id": 114,
          "title": "Chave Catraca Canhão Cachimbo 46 Peças Vermelha 4-14mm",
          "price": 23.44,
          "oldPrice": 49,
          "category": "Ferramentas",
          "badge": "52% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_893170-MLA112240875152_062026-AB.webp",
          "link": "https://meli.la/2tmYWWB",
          "clicks": 0
        },
{
          "id": 115,
          "title": "Máquina Solda Inversora Mma The Black Tools Preto 50/60hz Voltagem",
          "price": 208.91,
          "oldPrice": 429.9,
          "category": "Ferramentas",
          "badge": "51% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_874245-MLA105016034893_012026-AB.webp",
          "link": "https://meli.la/1M6yqwN",
          "clicks": 0
        },
{
          "id": 116,
          "title": "Bolsa De Ferramentas Kinetx 14 Pol Oxford Reforçada Verde",
          "price": 32.33,
          "oldPrice": 75,
          "category": "Ferramentas",
          "badge": "56% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_824237-MLB109003864893_032026-AB.webp",
          "link": "https://meli.la/2ALDzWv",
          "clicks": 0
        },
{
          "id": 117,
          "title": "Lavadora Alta Pressão Portátil Recarregável Sem Fio Bivolt Evolufix",
          "price": 104.97,
          "oldPrice": 245.87,
          "category": "Ferramentas",
          "badge": "57% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_625289-MLA110412192372_052026-AB.webp",
          "link": "https://meli.la/2esYX6r",
          "clicks": 0
        },
{
          "id": 118,
          "title": "Parafusadeira Furadeira De Impacto The Black Tools Profissional TB-21PX 2 Baterias Com Maleta 60Hz Amarelo",
          "price": 159.9,
          "oldPrice": 319.9,
          "category": "Ferramentas",
          "badge": "50% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_981459-MLA117136184907_092026-AB.webp",
          "link": "https://meli.la/2FPNguy",
          "clicks": 0
        },
{
          "id": 119,
          "title": "Kit Multi Ferramentas 4 Em 1 48v Sem Fio Com 2 Baterias Furadeira Parafusadeira Martelete Esmerilhadeira Chave De Impacto Com Maleta Alta Potência Uso Profissional E Doméstico Simake",
          "price": 699,
          "oldPrice": 1599,
          "category": "Ferramentas",
          "badge": "56% OFF",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_706304-MLA110786654236_052026-AB.webp",
          "link": "https://meli.la/2iBpzA6",
          "clicks": 0
        },
{
          "id": 120,
          "title": "Lavadora Lava Jato Portátil Pressão 2 Baterias + Maleta Preto 127/220v 50 Hz X 60 Hz",
          "price": 102.26,
          "oldPrice": 229.9,
          "category": "Ferramentas",
          "badge": "55% OFF no Pix",
          "image": "https://http2.mlstatic.com/D_Q_NP_2X_710675-MLB89102120983_082025-AB.webp",
          "link": "https://meli.la/1u9wPbK",
          "clicks": 0
        }
    ],
    favorites: []
};

async function initApp() {
    const savedProds = localStorage.getItem('aff_products');
    if (savedProds) state.products = JSON.parse(savedProds);

    if (supabaseClient) {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                state.currentUser = session.user;
            }
            supabaseClient.auth.onAuthStateChange((_event, session) => {
                state.currentUser = session ? session.user : null;
                updateAuthUI();
                render();
            });
        } catch(err) {
            console.log('Sessão não recuperada:', err);
        }
    }
    updateAuthUI();
    render();
}

function saveToStorage() {
    localStorage.setItem('aff_products', JSON.stringify(state.products));
}

function updateAuthUI() {
    const label = document.getElementById('sidebarAuthLabel');
    const container = document.getElementById('sidebarAuthSection');
    if (!label || !container) return;

    if (state.currentUser) {
        label.innerText = 'Minha Conta (' + state.currentUser.email + ')';
        container.innerHTML = `
            <a href="#" class="sidebar-item" onclick="toggleSidebar(); handleLogout()">
                <span class="sidebar-icon">🚪</span>
                <span class="sidebar-label" style="color: #dc2626;">Sair da Conta</span>
            </a>
        `;
    } else {
        label.innerText = 'Entrar / Cadastrar';
        container.innerHTML = `
            <a href="#" class="sidebar-item" onclick="toggleSidebar(); openAuthModal('login')">
                <span class="sidebar-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </span>
                <span class="sidebar-label" id="sidebarAuthLabel">Entrar / Cadastrar</span>
            </a>
        `;
    }
}

function openAuthModal(mode = 'login') {
    state.isRegisterMode = (mode === 'register');
    document.getElementById('authModalTitle').innerText = state.isRegisterMode ? 'Criar Nova Conta' : 'Entrar na sua conta';
    document.getElementById('nameFieldGroup').style.display = state.isRegisterMode ? 'block' : 'none';
    document.getElementById('authSubmitBtn').innerText = state.isRegisterMode ? 'Cadastrar' : 'Entrar';
    document.getElementById('authToggleText').innerText = state.isRegisterMode ? 'Já tem uma conta?' : 'Não tem uma conta?';
    document.getElementById('authToggleBtn').innerText = state.isRegisterMode ? 'Faça login' : 'Cadastre-se';
    document.getElementById('authErrorMsg').classList.add('hidden');
    document.getElementById('authModal').classList.remove('hidden');
}

function toggleAuthMode(e) {
    e.preventDefault();
    openAuthModal(state.isRegisterMode ? 'login' : 'register');
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value;
    const errEl = document.getElementById('authErrorMsg');
    errEl.classList.add('hidden');

    if (!supabaseClient) {
        errEl.innerText = 'Erro ao conectar com o Supabase.';
        errEl.classList.remove('hidden');
        return;
    }

    try {
        if (state.isRegisterMode) {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: { data: { full_name: name } }
            });
            if (error) throw error;
            alert('Cadastro realizado com sucesso! Verifique seu e-mail.');
        } else {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            state.currentUser = data.user;
            alert('Login efetuado com sucesso!');
        }
        closeModals();
        updateAuthUI();
        render();
    } catch (err) {
        errEl.innerText = err.message || 'Ocorreu um erro na autenticação.';
        errEl.classList.remove('hidden');
    }
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
    state.currentUser = null;
    updateAuthUI();
    alert('Você saiu da sua conta.');
    render();
}

function toggleSidebar() {
    document.getElementById('leftSidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function setActiveBottomTab(el) {
    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
}

function switchView(view) {
    state.currentView = view;
    render();
}

function selectCategoryTab(index) {
    state.activeCategoryIndex = index;
    renderCategoriesView();
}

function filterBySubcategory(subName) {
    state.searchQuery = subName;
    state.currentView = 'store';
    render();
}

function formatCurrency(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function handleSearch(e) {
    state.searchQuery = e.target.value;
    renderStoreProducts();
}

function selectCategory(cat) {
    state.selectedCategory = cat;
    render();
}

function handleSort(e) {
    state.sortBy = e.target.value;
    renderStoreProducts();
}

function toggleFavorite(id, event) {
    event.stopPropagation();
    const index = state.favorites.indexOf(id);
    if (index > -1) state.favorites.splice(index, 1);
    else state.favorites.push(id);
    render();
}

function renderCategoriesView() {
    const main = document.getElementById('mainContent');
    const currentCat = state.categoriesData[state.activeCategoryIndex] || state.categoriesData[0];

    main.innerHTML = `
        <div class="categories-layout">
            <div class="categories-sidebar-menu">
                ${state.categoriesData.map((cat, idx) => `
                    <div class="category-menu-item ${idx === state.activeCategoryIndex ? 'active' : ''}" onclick="selectCategoryTab(${idx})">
                        ${cat.name}
                    </div>
                `).join('')}
            </div>
            <div class="categories-content-grid">
                ${currentCat.subcategories.map(sub => `
                    <div class="subcat-item" onclick="filterBySubcategory('${sub.name}')">
                        <div class="subcat-img-circle"><img src="${sub.image}" alt="${sub.name}"></div>
                        <span class="subcat-title">${sub.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function render() {
    const main = document.getElementById('mainContent');

    if (state.currentView === 'categories') {
        renderCategoriesView();
    } else if (state.currentView === 'store') {
        main.innerHTML = `
            <section class="hero">
                <div class="hero-inner">
                    <span class="hero-tag">⚡ Ofertas do Dia</span>
                    <h2>${state.settings.heroTitle}</h2>
                    <p>${state.settings.heroSubtitle}</p>
                </div>
            </section>
            <div class="container">
                <div class="search-box-top">
                    <span class="search-icon-top">🔍</span>
                    <input type="text" id="searchInput" placeholder="Buscar produtos, marcas e muito mais..." value="${state.searchQuery}" oninput="handleSearch(event)">
                </div>
                <div class="categories-bar">
                    ${state.categories.map(cat => `<button class="cat-btn ${state.selectedCategory === cat ? 'active' : ''}" onclick="selectCategory('${cat}')">${cat}</button>`).join('')}
                </div>
                <div id="productsGrid" class="products-grid"></div>
            </div>
        `;
        renderStoreProducts();
    } else if (state.currentView === 'favoritos') {
        const favProducts = state.products.filter(p => state.favorites.includes(p.id));
        main.innerHTML = `
            <div class="admin-container">
                <h2>❤️ Meus Favoritos</h2>
                ${favProducts.length === 0 ? '<p style="margin-top:20px;">Nenhum produto favoritado ainda.</p>' : `
                    <div class="products-grid" style="margin-top:20px;">
                        ${favProducts.map(p => `
                            <div class="product-card">
                                <div class="product-img-wrap"><img src="${p.image}"></div>
                                <div class="product-body">
                                    <div class="product-title">${p.title}</div>
                                    <div class="current-price">${formatCurrency(p.price)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    } else if (state.currentView === 'notificacoes') {
        main.innerHTML = `<div class="admin-container"><h2>🔔 Notificações</h2><p style="margin-top:10px;">Nenhuma nova notificação de ofertas relâmpago.</p></div>`;
    } else if (state.currentView === 'compras') {
        main.innerHTML = `<div class="admin-container"><h2>🛍️ Minhas Compras</h2><p style="margin-top:10px;">Nenhum histórico de pedidos registrado.</p></div>`;
    } else if (state.currentView === 'cupons') {
        main.innerHTML = `<div class="admin-container"><h2>🎟️ Cupons Relâmpago</h2><p style="margin-top:10px;">Resgate cupons de desconto exclusivos para parceiros.</p></div>`;
    } else if (state.currentView === 'opinioes') {
        main.innerHTML = `<div class="admin-container"><h2>⭐ Minhas Opiniões</h2><p style="margin-top:10px;">Avaliações sobre suas compras e indicações.</p></div>`;
    } else if (state.currentView === 'lojas') {
        main.innerHTML = `<div class="admin-container"><h2>🏪 Lojas que Sigo</h2><p style="margin-top:10px;">Acompanhe vitrines parceiras.</p></div>`;
    } else if (state.currentView === 'historico') {
        main.innerHTML = `<div class="admin-container"><h2>🕒 Histórico</h2><p style="margin-top:10px;">Produtos visualizados recentemente.</p></div>`;
    } else if (state.currentView === 'supermercado') {
        state.selectedCategory = 'Casa & Cozinha';
        switchView('store');
    } else if (state.currentView === 'configuracoes') {
        main.innerHTML = `<div class="admin-container"><h2>⚙️ Configurações</h2><p style="margin-top:10px;">Ajustes de conta e preferências.</p></div>`;
    } else if (state.currentView === 'central-afiliados') {
        if (!state.currentUser) {
            main.innerHTML = `
                <div class="admin-container" style="text-align: center; padding: 40px 20px;">
                    <h2>🔗 Central de Afiliados e Criadores</h2>
                    <p style="margin-top: 10px; color: var(--gray-600); margin-bottom: 20px;">Faça login ou cadastre-se para acessar o painel de gerenciamento de produtos e links de afiliados.</p>
                    <button class="btn btn-primary" onclick="openAuthModal('login')">Entrar na Conta</button>
                    <button class="btn btn-light" style="margin-left: 10px;" onclick="openAuthModal('register')">Criar Conta</button>
                </div>
            `;
        } else {
            const totalClicks = state.products.reduce((acc, p) => acc + (p.clicks || 0), 0);
            main.innerHTML = `
                <div class="admin-container">
                    <div class="section-header" style="margin-bottom: 20px;">
                        <div>
                            <h2>🔗 Central de Afiliados e Gerenciador</h2>
                            <p>Bem-vindo, <strong>${state.currentUser.email}</strong>. Gerencie seus produtos e links.</p>
                        </div>
                        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="handleLogout()">Sair da Conta</button>
                    </div>

                    <div class="stats-grid" style="margin-bottom: 20px;">
                        <div class="stat-card">
                            <div class="stat-icon">📦</div>
                            <div class="stat-info">
                                <p>Total de Produtos</p>
                                <h4>${state.products.length}</h4>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">👆</div>
                            <div class="stat-info">
                                <p>Cliques nos Links</p>
                                <h4>${totalClicks}</h4>
                            </div>
                        </div>
                    </div>

                    <div class="table-card">
                        <div class="table-header">
                            <h3>Gerenciar Produtos da Vitrine</h3>
                            <button class="btn btn-primary" onclick="openAddProductModal()">+ Novo Produto</button>
                        </div>
                        <div style="overflow-x: auto;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Cliques</th>
                                        <th>Link de Afiliado</th>
                                        <th style="text-align: right;">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.products.map(p => `
                                        <tr>
                                            <td>
                                                <div style="display: flex; align-items: center; gap: 8px;">
                                                    <img src="${p.image}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;" alt="">
                                                    <div>
                                                        <strong style="font-size: 12px; display: block; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.title}</strong>
                                                        <span style="font-size: 10px; color: #d32f2f;">${p.badge || ''}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span style="background: var(--gray-100); padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;">${p.category}</span></td>
                                            <td>
                                                <strong>${formatCurrency(p.price)}</strong>${p.oldPrice ? `<div style="font-size: 10px; color: var(--gray-600); text-decoration: line-through;">${formatCurrency(p.oldPrice)}</div>` : ''}
                                            </td>
                                            <td><span style="background: #ecfdf5; color: var(--emerald-600); font-weight: 700; padding: 3px 6px; border-radius: 4px; font-size: 11px;">${p.clicks || 0}</span></td>
                                            <td><a href="${p.link}" target="_blank" style="font-size: 11px; color: var(--primary); max-width: 140px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.link}</a></td>
                                            <td style="text-align: right;">
                                                <button class="btn btn-light" style="padding: 4px 8px;" onclick="openEditProductModal(${p.id})">✏️</button>
                                                <button class="btn btn-danger" style="padding: 4px 8px;" onclick="deleteProduct(${p.id})">🗑️</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

function renderStoreProducts() {
    let list = [...state.products];
    if (state.selectedCategory !== 'Todos') list = list.filter(p => p.category === state.selectedCategory);
    if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q));
    }
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = list.map(p => `
        <div class="product-card" onclick="openQuickView(${p.id})">
            <div class="product-img-wrap"><img src="${p.image}" alt="${p.title}">${p.badge ? `<span class="badge">${p.badge}</span>` : ''}</div>
            <div class="product-body">
                <div class="product-title">${p.title}</div>
                <div class="current-price">${formatCurrency(p.price)}</div>
                <a href="${p.link}" target="_blank" class="btn btn-primary" style="width:100%;text-align:center;margin-top:10px;font-size:12px;" onclick="event.stopPropagation(); trackClick(${p.id})">Ver Oferta</a>
            </div>
        </div>
    `).join('');
}

function trackClick(id) {
    const p = state.products.find(item => item.id === id);
    if (p) {
        p.clicks = (p.clicks || 0) + 1;
        saveToStorage();
    }
}

function populateCategoryDropdown(selected = '') {
    const select = document.getElementById('prodCategory');
    if (!select) return;
    select.innerHTML = state.categories.filter(c => c !== 'Todos').map(c => `
        <option value="${c}" ${c === selected ? 'selected' : ''}>${c}</option>
    `).join('');
}

function openAddProductModal() {
    document.getElementById('productModalTitle').innerText = 'Adicionar Novo Produto';
    document.getElementById('prodId').value = '';
    document.getElementById('prodTitle').value = '';
    document.getElementById('prodPrice').value = '';
    document.getElementById('prodOldPrice').value = '';
    document.getElementById('prodBadge').value = '';
    document.getElementById('prodImage').value = '';
    document.getElementById('prodLink').value = '';
    populateCategoryDropdown();
    document.getElementById('productModal').classList.remove('hidden');
}

function openEditProductModal(id) {
    const p = state.products.find(item => item.id === id);
    if (!p) return;
    document.getElementById('productModalTitle').innerText = 'Editar Produto';
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodTitle').value = p.title;
    document.getElementById('prodPrice').value = p.price;
    document.getElementById('prodOldPrice').value = p.oldPrice || '';
    document.getElementById('prodBadge').value = p.badge || '';
    document.getElementById('prodImage').value = p.image;
    document.getElementById('prodLink').value = p.link;
    populateCategoryDropdown(p.category);
    document.getElementById('productModal').classList.remove('hidden');
}

function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('prodId').value;
    const title = document.getElementById('prodTitle').value;
    const price = Number(document.getElementById('prodPrice').value);
    const oldPrice = document.getElementById('prodOldPrice').value ? Number(document.getElementById('prodOldPrice').value) : null;
    const category = document.getElementById('prodCategory').value;
    const badge = document.getElementById('prodBadge').value;
    const image = document.getElementById('prodImage').value;
    const link = document.getElementById('prodLink').value;

    if (id) {
        const index = state.products.findIndex(p => p.id == id);
        if (index !== -1) {
            state.products[index] = { ...state.products[index], title, price, oldPrice, category, badge, image, link };
        }
    } else {
        const newId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
        state.products.unshift({
            id: newId,
            title,
            price,
            oldPrice,
            category,
            badge,
            image,
            link,
            clicks: 0
        });
    }

    saveToStorage();
    closeModals();
    render();
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        state.products = state.products.filter(p => p.id !== id);
        saveToStorage();
        render();
    }
}

function openQuickView(id) {
    const p = state.products.find(item => item.id === id);
    if (!p) return;
    document.getElementById('quickImg').src = p.image;
    document.getElementById('quickTitle').innerText = p.title;
    document.getElementById('quickCategory').innerText = p.category;
    document.getElementById('quickPrice').innerText = formatCurrency(p.price);
    document.getElementById('quickOldPrice').innerText = p.oldPrice ? formatCurrency(p.oldPrice) : '';
    document.getElementById('quickBuyBtn').href = p.link;
    document.getElementById('quickModal').classList.remove('hidden');
}

function closeModals() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('productModal').classList.add('hidden');
    document.getElementById('quickModal').classList.add('hidden');
}

window.onload = initApp;
