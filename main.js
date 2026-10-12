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
    adminTab: 'products',
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
            id: 1,
            title: 'Smartwatch Watch 8 Ultra Série 8 com Tela HD e Bluetooth',
            price: 189.90,
            oldPrice: 349.90,
            category: 'Eletrônicos',
            badge: '45% OFF',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            link: 'https://mercadolivre.com',
            clicks: 34
        },
        {
            id: 2,
            title: 'Fone de Ouvido Bluetooth Sem Fio com Cancelamento de Ruído',
            price: 129.00,
            oldPrice: 199.00,
            category: 'Eletrônicos',
            badge: 'Mais vendido',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            link: 'https://mercadolivre.com',
            clicks: 56
        }
    ],
    favorites: []
};

async function initApp() {
    const savedProds = localStorage.getItem('aff_products');
    if (savedProds) state.products = JSON.parse(savedProds);

    if (supabaseClient) {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            state.currentUser = session.user;
        }
        supabaseClient.auth.onAuthStateChange((_event, session) => {
            state.currentUser = session ? session.user : null;
            updateAuthUI();
        });
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
