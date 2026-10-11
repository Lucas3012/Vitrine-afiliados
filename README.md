# 🛍️ Vitrine de Produtos de Afiliado + Painel Admin

Um site moderno, responsivo e profissional de vitrine de produtos voltado para **afiliados** (Amazon, Shopee, Magazine Luiza, AliExpress, Hotmart, Monetizze, etc.), desenvolvido em arquivo único (`index.html`) com **Tailwind CSS**, **Alpine.js** e **Painel Administrativo completo**.

---

## 🚀 Funcionalidades Principais

### 🌟 1. Vitrine (Storefront)
- **Design Moderno e Responsivo**: Aparência profissional inspirada nos maiores marketplaces do mercado.
- **Busca em Tempo Real**: Seus visitantes encontram produtos rapidamente digitando o nome.
- **Filtros por Categoria**: Organização por Eletrônicos, Moda, Casa & Cozinha, Beleza, Esportes e Livros.
- **Ordenação**: Classifique por mais recentes, menor preço, maior preço ou mais populares (clicados).
- **Modal de Detalhes (Quick View)**: Visualização rápida do produto com imagem em alta resolução e botão de destaque.
- **Rastreamento de Cliques**: Cada clique no botão "Ver Oferta" contabiliza nas estatísticas do painel.
- **Aviso de Afiliado**: Rodapé profissional com isenção de responsabilidade exigida pelas principais plataformas de afiliados.

### 🛠️ 2. Painel Administrativo (Admin)
- **Protegido por Senha**: Acesso restrito (Senha padrão: `admin123`).
- **Dashboard de Estatísticas**: Visão geral do total de produtos, cliques totais e categorias.
- **Gerenciamento de Produtos (CRUD)**:
  - Adicionar novos produtos com título, preço, preço riscado (desconto), categoria, imagem, link de afiliado e selos (-30% OFF, Mais Vendido, etc.).
  - Editar produtos existentes a qualquer momento.
  - Excluir produtos desatualizados.
- **Relatório de Desempenho**: Veja quais produtos estão gerando mais cliques de afiliados.
- **Configurações da Vitrine**: Altere o nome do site, slogan, título do banner principal, imagem de fundo e texto de aviso.
- **Backup e Restauração**: Exporte todos os seus produtos e configurações para um arquivo `.JSON` ou importe um backup anterior com um clique.

---

## 💻 Como Usar (Localmente)

1. Baixe ou clone este repositório.
2. Abra o arquivo **`index.html`** em qualquer navegador web (Google Chrome, Safari, Edge, Firefox).
3. Pronto! O site já vem com produtos de exemplo para você testar imediatamente.

---

## 🔐 Como Acessar o Painel Admin

1. Na página principal (Vitrine), clique no botão **"Painel Admin"** no canto superior direito.
2. Digite a senha de acesso: **`admin123`**.
3. Gerencie seus links de afiliado com total liberdade!

---

## 🌐 Como Hospedar Gratuitamente na Internet

Você pode colocar este site no ar gratuitamente em minutos para começar a divulgar seus links de afiliado nas redes sociais (Instagram, TikTok, YouTube, WhatsApp):

### Opção A: Vercel (Recomendado)
1. Crie uma conta gratuita no [Vercel](https://vercel.com).
2. Arraste a pasta do projeto (ou importe o repositório do GitHub).
3. O Vercel publicará seu site instantaneamente com endereço HTTPS grátis (`seu-site.vercel.app`).

### Opção B: Netlify Drop
1. Acesse [Netlify Drop](https://app.netlify.com/drop).
2. Arraste a pasta do seu projeto.
3. Seu site estará no ar em segundos!

### Opção C: GitHub Pages
1. Crie um repositório no GitHub.
2. Envie o arquivo `index.html`.
3. Vá em **Settings > Pages** e ative o GitHub Pages na branch `main`.

---

## 💡 Dica para Afiliados
- Insira seu ID de afiliado nos links que você cadastra (ex: `https://amzn.to/seu-codigo-aqui` ou links rastreados da Shopee / Hotmart).
- O site salva tudo automaticamente no navegador (`localStorage`) do seu dispositivo. Faça backups regulares pelo painel admin na aba **Configurações**.
