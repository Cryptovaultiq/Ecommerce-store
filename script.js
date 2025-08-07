document.addEventListener('DOMContentLoaded', () => {
    let products = [
        { name: "Luxury Watch", desc: "Elegant design", price: "$500" },
        { name: "Designer Bag", desc: "High-quality leather", price: "$300" }
    ];
    let content = ["Welcome to HOLLY HUB!"];
    let cart = [];
    let visitCount = 0;
    let salesTotal = 0;

    // Admin Logic
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const login = document.getElementById('login');
    const siteSettingsForm = document.getElementById('siteSettingsForm');
    const contentForm = document.getElementById('contentForm');
    const contentList = document.getElementById('contentList');
    const logoutLink = document.querySelector('#logout a');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log('Login attempt:', username, password);
            if (username === 'admin' && password === 'password123') {
                login.style.display = 'none';
                dashboard.style.display = 'flex';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (siteSettingsForm) {
        siteSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateCustomerPage();
        });
    }

    if (contentForm) {
        contentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contentText = document.getElementById('contentText').value;
            if (contentText) {
                content.push(contentText);
                const contentDiv = document.createElement('div');
                contentDiv.textContent = contentText;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    content = content.filter(c => c !== contentText);
                    contentDiv.remove();
                    updateCustomerPage();
                });
                contentDiv.appendChild(deleteButton);
                contentList.appendChild(contentDiv);
                updateCustomerPage();
                contentForm.reset();
            }
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            dashboard.style.display = 'none';
            login.style.display = 'flex';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        });
    }

    // Customer Logic
    const customerProductList = document.getElementById('customerProductList');
    const customerContentList = document.getElementById('customerContentList');
    const siteTitle = document.getElementById('siteTitle');
    const heroContent = document.getElementById('heroContent');

    function updateCustomerPage() {
        if (siteTitle) siteTitle.textContent = document.getElementById('siteTitle')?.value || 'HOLLY HUB';
        if (heroContent) heroContent.textContent = content[0] || 'Discover unbeatable prices on luxury items.';
        if (customerContentList) {
            customerContentList.innerHTML = '';
            content.forEach(c => {
                const div = document.createElement('div');
                div.textContent = c;
                customerContentList.appendChild(div);
            });
        }
        if (customerProductList) {
            customerProductList.innerHTML = '';
            products.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p><p>${p.price}</p>`;
                customerProductList.appendChild(card);
            });
        }
    }

    // Navigation
    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            document.querySelectorAll('.main-content section').forEach(section => section.style.display = 'none');
            target.style.display = 'block';
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    updateCustomerPage();
});
