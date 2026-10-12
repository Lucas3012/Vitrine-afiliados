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
                { name: 'Camisetas e Regatas', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80' }
            ]
        },
        { name: 'Esportes e Fitness', subcategories: [{ name: 'Suplementos', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80' }] },
        { name: 'Celulares e Telefones', subcategories: [{ name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' }] }
    ],
    categories: ['Todos', 'Eletrônicos', 'Moda', 'Casa & Cozinha', 'Beleza', 'Esportes'],
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
            link: 'https://mercadolivre.com'
        },
        {
            id: 2,
            title: 'Fone de Ouvido Bluetooth Sem Fio com Cancelamento de Ruído',
            price: 129.00,
            oldPrice: 199.00,
            category: 'Eletrônicos',
            badge: 'Mais vendido',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            link: 'https://mercadolivre.com'
        }
    ],
    favorites: []
};

async function initApp() {
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
            alert('Cadastro realizado com sucesso! Verifique seu e-mail se necessário.');
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
    } else if (state.currentView === 'central-afiliados') {
        main.innerHTML = `
            <div class="admin-container">
                <h2>🔗 Central de Afiliados e Criadores</h2>
                <p style="margin-top: 10px; color: var(--gray-600);">Monetize seus links e compartilhe achados com sua audiência.</p>
                ${!state.currentUser ? `
                    <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 1px solid var(--gray-200);">
                        <p>Faça login ou cadastre-se para gerar seus links personalizados de afiliado.</p>
                        <button class="btn btn-primary" style="margin-top: 12px;" onclick="openAuthModal('login')">Entrar na Conta</button>
                    </div>
                ` : `
                    <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px;">
                        <p>Bem-vindo, <strong>${state.currentUser.email}</strong>! Seus links de rastreio estão ativos.</p>
                    </div>
                `}
            </div>
        `;
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
                <a href="${p.link}" target="_blank" class="btn btn-primary" style="width:100%;text-align:center;margin-top:10px;font-size:12px;" onclick="event.stopPropagation()">Ver Oferta</a>
            </div>
        </div>
    `).join('');
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
    document.getElementById('quickModal').classList.add('hidden');
}

window.onload = initApp;
