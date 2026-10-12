let state = {
    currentView: 'store',
    adminTab: 'products',
    searchQuery: '',
    selectedCategory: 'Todos',
    sortBy: 'newest',
    categories: ['Todos', 'Eletrônicos', 'Moda', 'Casa & Cozinha', 'Beleza', 'Esportes', 'Ferramentas'],
    settings: {
        siteName: 'Mega Ofertas',
        tagline: 'Achados & Ofertas',
        heroTitle: 'Achados Imperdíveis & Ofertas Diárias',
        heroSubtitle: 'Os melhores produtos selecionados com desconto para você economizar.',
        heroBanner: '',
        affiliateDisclaimer: 'Este site participa de programas de afiliados. Podemos receber comissões por compras qualificadas realizadas através dos nossos links, sem custo adicional para você.'
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
        },
        {
            id: 3,
            title: 'Tênis Esportivo Casual Confortável para Corrida e Academia',
            price: 159.90,
            oldPrice: 220.00,
            category: 'Moda',
            badge: '30% OFF',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            link: 'https://mercadolivre.com',
            clicks: 21
        },
        {
            id: 4,
            title: 'Air Fryer Fritadeira Sem Óleo 4L Antiaderente',
            price: 389.00,
            oldPrice: 499.00,
            category: 'Casa & Cozinha',
            badge: 'Frete grátis',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
            link: 'https://mercadolivre.com',
            clicks: 89
        }
    ],
    quickProductId: null
};

function initApp() {
    const savedProds = localStorage.getItem('aff_products');
    const savedSets = localStorage.getItem('aff_settings');
    const savedCats = localStorage.getItem('aff_categories');

    if (savedProds) state.products = JSON.parse(savedProds);
    if (savedSets) state.settings = JSON.parse(savedSets);
    if (savedCats) state.categories = JSON.parse(savedCats);

    updateHeaderBranding();
    render();
}

function saveToStorage() {
    localStorage.setItem('aff_products', JSON.stringify(state.products));
    localStorage.setItem('aff_settings', JSON.stringify(state.settings));
    localStorage.setItem('aff_categories', JSON.stringify(state.categories));
}

function updateHeaderBranding() {
    document.getElementById('brandTitle').innerText = state.settings.siteName;
    document.getElementById('brandTagline').innerText = state.settings.tagline;
    document.getElementById('footerBrandName').innerText = 'ACHOO - ' + state.settings.siteName;
    document.getElementById('footerDisclaimerText').innerText = state.settings.affiliateDisclaimer;
}

function toggleSidebar() {
    const sidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

function switchView(view) {
    state.currentView = view;
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

function render() {
    updateHeaderBranding();
    const main = document.getElementById('mainContent');

    if (state.currentView === 'store') {
        main.innerHTML = `
            <section class="hero">
                <div class="hero-inner">
                    <div class="hero-content">
                        <span class="hero-tag">⚡ Ofertas do Dia</span>
                        <h2>${state.settings.heroTitle}</h2>
                        <p>${state.settings.heroSubtitle}</p>
                    </div>
                </div>
            </section>

            <div id="vitrine" class="container">
                <!-- Barra de pesquisa comprida e arredondada acima das categorias -->
                <div class="search-box-top">
                    <span class="search-icon-top">🔍</span>
                    <input type="text" id="searchInput" placeholder="Buscar produtos, marcas e muito mais..." value="${state.searchQuery}" oninput="handleSearch(event)">
                </div>

                <div class="categories-bar">
                    ${state.categories.map(cat => `
                        <button class="cat-btn ${state.selectedCategory === cat ? 'active' : ''}" onclick="selectCategory('${cat}')">${cat}</button>
                    `).join('')}
                </div>

                <div class="section-header">
                    <div>
                        <h3>${state.selectedCategory === 'Todos' ? 'Em destaque' : state.selectedCategory}</h3>
                        <p id="productCountText">Carregando...</p>
                    </div>
                    <div>
                        <select class="sort-select" onchange="handleSort(event)">
                            <option value="newest" ${state.sortBy === 'newest' ? 'selected' : ''}>Mais Recentes</option>
                            <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Menor Preço</option>
                            <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Maior Preço</option>
                            <option value="popular" ${state.sortBy === 'popular' ? 'selected' : ''}>Mais Clicados</option>
                        </select>
                    </div>
                </div>

                <div id="productsGrid" class="products-grid"></div>
            </div>
        `;
        renderStoreProducts();
    } else {
        const totalClicks = state.products.reduce((acc, p) => acc + (p.clicks || 0), 0);
        main.innerHTML = `
            <div class="admin-container">
                <div class="section-header" style="margin-bottom: 20px;">
                    <div>
                        <h2>Painel Administrativo</h2>
                        <p>Gerencie seus produtos, links de afiliado e configurações.</p>
                    </div>
                    <button class="btn btn-primary" onclick="switchView('store')">🏪 Voltar à Vitrine</button>
                </div>

                <div class="flex gap-2" style="margin-bottom: 20px;">
                    <button class="btn ${state.adminTab === 'products' ? 'btn-primary' : 'btn-light'}" onclick="setAdminTab('products')">📦 Produtos</button>
                    <button class="btn ${state.adminTab === 'stats' ? 'btn-primary' : 'btn-light'}" onclick="setAdminTab('stats')">📊 Estatísticas</button>
                    <button class="btn ${state.adminTab === 'settings' ? 'btn-primary' : 'btn-light'}" onclick="setAdminTab('settings')">⚙️ Configurações</button>
                </div>

                <div class="stats-grid">
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
                    <div class="stat-card">
                        <div class="stat-icon">🏷️</div>
                        <div class="stat-info">
                            <p>Categorias</p>
                            <h4>${state.categories.length - 1}</h4>
                        </div>
                    </div>
                </div>

                <div id="adminTabProducts" class="${state.adminTab === 'products' ? '' : 'hidden'}">
                    <div class="table-card">
                        <div class="table-header">
                            <h3>Gerenciar Produtos</h3>
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
                                                <div class="flex gap-2" style="align-items: center;">
                                                    <img src="${p.image}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;" alt="">
                                                    <div>
                                                        <strong style="font-size: 12px; display: block; max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.title}</strong>
                                                        <span style="font-size: 10px; color: #d32f2f;">${p.badge || ''}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span style="background: var(--gray-100); padding: 3px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;">${p.category}</span></td>
                                            <td>
                                                <strong style="color: var(--gray-900);">${formatCurrency(p.price)}</strong>${p.oldPrice ? `<div style="font-size: 10px; color: var(--gray-600); text-decoration: line-through;">${formatCurrency(p.oldPrice)}</div>` : ''}
                                            </td>
                                            <td><span style="background: #ecfdf5; color: var(--emerald-600); font-weight: 700; padding: 3px 6px; border-radius: 4px; font-size: 11px;">${p.clicks || 0}</span></td>
                                            <td><a href="${p.link}" target="_blank" style="font-size: 11px; color: var(--primary); max-width: 150px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.link}</a></td>
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

                <div id="adminTabStats" class="${state.adminTab === 'stats' ? '' : 'hidden'}">
                    <div class="table-card" style="padding: 20px;">
                        <h3 style="margin-bottom: 14px; font-size: 16px;">Produtos Mais Clicados</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${[...state.products].sort((a,b)=>(b.clicks||0)-(a.clicks||0)).map(p => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--gray-50); border-radius: 6px; border: 1px solid var(--gray-200);">
                                    <div class="flex gap-2" style="align-items: center;">
                                        <img src="${p.image}" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;" alt="">
                                        <div>
                                            <strong style="font-size: 12px;">${p.title}</strong>
                                            <div style="font-size: 10px; color: var(--gray-600);">${p.category}</div>
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <strong style="font-size: 14px; color: var(--primary);">${p.clicks || 0} cliques</strong>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div id="adminTabSettings" class="${state.adminTab === 'settings' ? '' : 'hidden'}">
                    <div class="table-card" style="padding: 20px; max-width: 650px;">
                        <h3 style="margin-bottom: 16px; font-size: 16px;">Configurações</h3>
                        <form onsubmit="saveSettings(event)">
                            <div class="form-group">
                                <label>Nome do Site</label>
                                <input type="text" id="settingSiteName" class="form-control" value="${state.settings.siteName}" required>
                            </div>
                            <div class="form-group">
                                <label>Slogan do Header</label>
                                <input type="text" id="settingTagline" class="form-control" value="${state.settings.tagline}" required>
                            </div>
                            <div class="form-group">
                                <label>Título do Banner Principal (Hero)</label>
                                <input type="text" id="settingHeroTitle" class="form-control" value="${state.settings.heroTitle}" required>
                            </div>
                            <div class="form-group">
                                <label>Subtítulo do Banner Principal</label>
                                <textarea id="settingHeroSubtitle" class="form-control" rows="2" required>${state.settings.heroSubtitle}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Texto de Aviso de Afiliado (Rodapé)</label>
                                <textarea id="settingDisclaimer" class="form-control" rows="3" required>${state.settings.affiliateDisclaimer}</textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Salvar Configurações</button>
                        </form>

                        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--gray-200);">
                            <h4 style="font-size: 14px; margin-bottom: 10px;">Backup e Dados</h4>
                            <div class="flex gap-2 flex-wrap">
                                <button class="btn btn-light" onclick="exportBackup()">📥 Exportar JSON</button>
                                <label class="btn btn-light" style="cursor: pointer;">
                                    📤 Importar JSON <input type="file" accept=".json" class="hidden" onchange="importBackup(event)">
                                </label>
                                <button class="btn btn-danger" onclick="resetFactoryData()">🔄 Restaurar Padrões</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function renderStoreProducts() {
    let list = [...state.products];

    if (state.selectedCategory !== 'Todos') {
        list = list.filter(p => p.category === state.selectedCategory);
    }

    if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (state.sortBy === 'newest') {
        list.sort((a, b) => b.id - a.id);
    } else if (state.sortBy === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'popular') {
        list.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    }

    const countEl = document.getElementById('productCountText');
    if (countEl) countEl.innerText = `${list.length} produtos encontrados`;

    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; background: white; border-radius: 8px; border: 1px solid var(--gray-200);">
                <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
                <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Nenhum produto encontrado</h4>
                <p style="font-size: 12px; color: var(--gray-600); margin-bottom: 16px;">Tente buscar por outro termo.</p>
                <button class="btn btn-primary" onclick="state.searchQuery=''; state.selectedCategory='Todos'; render();">Limpar Filtros</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <div class="product-img-wrap" onclick="openQuickView(${p.id})">
                <img src="${p.image}" alt="${p.title}">
                ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
            </div>
            <div class="product-body" onclick="openQuickView(${p.id})">
                <div>
                    <div class="product-title">${p.title}</div>
                </div>
                <div>
                    <div class="product-price-area">
                        ${p.oldPrice ? `<span class="old-price">${formatCurrency(p.oldPrice)}</span>` : ''}
                        <div class="current-price-row">
                            <span class="current-price">${formatCurrency(p.price)}</span>
                        </div>
                    </div>
                    <span class="shipping-badge">Frete grátis</span>
                    <a href="${p.link}" target="_blank" class="btn btn-primary" style="width: 100%; text-align: center; padding: 8px 10px; font-size: 12px;" onclick="event.stopPropagation(); trackClick(${p.id})">
                        Ver Oferta
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function openAdminLogin() {
    document.getElementById('loginPasswordInput').value = '';
    document.getElementById('loginErrorMsg').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const pass = document.getElementById('loginPasswordInput').value;
    if (pass === 'admin123') {
        closeModals();
        switchView('admin');
    } else {
        document.getElementById('loginErrorMsg').classList.remove('hidden');
    }
}

function setAdminTab(tab) {
    state.adminTab = tab;
    render();
}

function closeModals() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('productModal').classList.add('hidden');
    document.getElementById('quickModal').classList.add('hidden');
}

function populateCategoryDropdown(selected = '') {
    const select = document.getElementById('prodCategory');
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
    state.quickProductId = p.id;
    document.getElementById('quickImg').src = p.image;
    document.getElementById('quickTitle').innerText = p.title;
    document.getElementById('quickCategory').innerText = p.category;
    document.getElementById('quickPrice').innerText = formatCurrency(p.price);
    document.getElementById('quickOldPrice').innerText = p.oldPrice ? formatCurrency(p.oldPrice) : '';
    document.getElementById('quickBadge').innerText = p.badge || '';
    document.getElementById('quickBadge').style.display = p.badge ? 'block' : 'none';
    document.getElementById('quickBuyBtn').href = p.link;
    document.getElementById('quickModal').classList.remove('hidden');
}

function trackClick(id) {
    const p = state.products.find(item => item.id === id);
    if (p) {
        p.clicks = (p.clicks || 0) + 1;
        saveToStorage();
    }
}

function trackClickFromQuick() {
    if (state.quickProductId) {
        trackClick(state.quickProductId);
    }
    closeModals();
}

function saveSettings(e) {
    e.preventDefault();
    state.settings.siteName = document.getElementById('settingSiteName').value;
    state.settings.tagline = document.getElementById('settingTagline').value;
    state.settings.heroTitle = document.getElementById('settingHeroTitle').value;
    state.settings.heroSubtitle = document.getElementById('settingHeroSubtitle').value;
    state.settings.affiliateDisclaimer = document.getElementById('settingDisclaimer').value;
    saveToStorage();
    updateHeaderBranding();
    alert('Configurações salvas com sucesso!');
    render();
}

function exportBackup() {
    const data = { products: state.products, settings: state.settings, categories: state.categories };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-vitrine.json';
    a.click();
}

function importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.products) state.products = data.products;
            if (data.settings) state.settings = data.settings;
            if (data.categories) state.categories = data.categories;
            saveToStorage();
            alert('Backup importado com sucesso!');
            render();
        } catch(err) {
            alert('Erro ao ler arquivo JSON.');
        }
    };
    reader.readAsText(file);
}

function resetFactoryData() {
    if (confirm('Deseja restaurar os padrões? Todos os dados atuais serão substituídos.')) {
        localStorage.clear();
        location.reload();
    }
}

window.onload = initApp;
