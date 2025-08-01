document.addEventListener('DOMContentLoaded', () => {
    // Shared Data
    let products = [];
    let content = [];
    let discounts = [];
    let apps = [];
    let themes = [];
    let integrations = [];
    let cart = [];
    let visitCount = 0;
    let salesTotal = 0;

    // Admin Page Logic
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const login = document.getElementById('login');
    const siteSettingsForm = document.getElementById('siteSettingsForm');
    const appForm = document.getElementById('appForm');
    const installedApps = document.getElementById('installedApps');
    const themeForm = document.getElementById('themeForm');
    const installedThemes = document.getElementById('installedThemes');
    const contentForm = document.getElementById('contentForm');
    const contentList = document.getElementById('contentList');
    const discountForm = document.getElementById('discountForm');
    const discountList = document.getElementById('discountList');
    const logoutLink = document.querySelector('#logout a');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
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
            const siteTitle = document.getElementById('siteTitle').value;
            document.getElementById('siteTitle') && (document.getElementById('siteTitle').textContent = siteTitle);
            updateCustomerPage();
        });
    }

    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const appUrl = document.getElementById('appUrl').value;
            if (appUrl) {
                apps.push(appUrl);
                const appDiv = document.createElement('div');
                appDiv.textContent = appUrl;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    apps = apps.filter(a => a !== appUrl);
                    appDiv.remove();
                    updateCustomerPage();
                });
                appDiv.appendChild(removeButton);
                installedApps.appendChild(appDiv);
                updateCustomerPage();
                appForm.reset();
            }
        });
    }

    if (themeForm) {
        themeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const themeUrl = document.getElementById('themeUrl').value;
            if (themeUrl) {
                themes.push(themeUrl);
                const themeDiv = document.createElement('div');
                themeDiv.textContent = themeUrl;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    themes = themes.filter(t => t !== themeUrl);
                    themeDiv.remove();
                    updateCustomerPage();
                });
                themeDiv.appendChild(removeButton);
                installedThemes.appendChild(themeDiv);
                updateCustomerPage();
                themeForm.reset();
            }
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
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    const newContent = prompt('Edit content:', contentDiv.textContent);
                    if (newContent) {
                        contentDiv.textContent = newContent;
                        content = content.map(c => c === contentText ? newContent : c);
                        updateCustomerPage();
                    }
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    content = content.filter(c => c !== contentText);
                    contentDiv.remove();
                    updateCustomerPage();
                });
                contentDiv.appendChild(editButton);
                contentDiv.appendChild(deleteButton);
                contentList.appendChild(contentDiv);
                updateCustomerPage();
                contentForm.reset();
            }
        });
    }

    if (discountForm) {
        discountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const discountCode = document.getElementById('discountCode').value;
            const discountPercent = document.getElementById('discountPercent').value;
            if (discountCode && discountPercent) {
                discounts.push({ code: discountCode, percent: discountPercent });
                const discountDiv = document.createElement('div');
                discountDiv.textContent = `${discountCode}: ${discountPercent}%`;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    const newCode = prompt('Edit code:', discountDiv.textContent.split(':')[0]);
                    const newPercent = prompt('Edit percent:', discountDiv.textContent.split(':')[1].replace('%', ''));
                    if (newCode && newPercent) {
                        discountDiv.textContent = `${newCode}: ${newPercent}%`;
                        discounts = discounts.map(d => d.code === discountCode ? { code: newCode, percent: newPercent } : d);
                        updateCustomerPage();
                    }
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    discounts = discounts.filter(d => d.code !== discountCode);
                    discountDiv.remove();
                    updateCustomerPage();
                });
                discountDiv.appendChild(editButton);
                discountDiv.appendChild(deleteButton);
                discountList.appendChild(discountDiv);
                updateCustomerPage();
                discountForm.reset();
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

    // Customer Page Logic
    const customerProductList = document.getElementById('customerProductList');
    const customerContentList = document.getElementById('customerContentList');
    const siteTitle = document.getElementById('siteTitle');
    const heroContent = document.getElementById('heroContent');
    const openPopup = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const popupForm = document.getElementById('popupForm');
    const cartIcon = document.getElementById('cartIcon');
    const cartPopup = document.getElementById('cartPopup');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const paymentForm = document.getElementById('paymentForm');
    const visitCountDisplay = document.getElementById('visitCount');
    const salesTotalDisplay = document.getElementById('salesTotal');

    // Update customer page
    function updateCustomerPage() {
        if (siteTitle) siteTitle.textContent = document.getElementById('siteTitle')?.value || 'Snagged & Bagged';
        if (heroContent) heroContent.textContent = content[0] || 'Discover unbeatable prices on luxury fashion.';
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
                if (p.image) {
                    const img = document.createElement('img');
                    img.src = p.image;
                    img.style.maxWidth = '200px';
                    card.appendChild(img);
                }
                const addToCart = document.createElement('button');
                addToCart.textContent = 'Add to Cart';
                addToCart.addEventListener('click', () => {
                    cart.push(p);
                    document.getElementById('cartCount').textContent = cart.length;
                    updateCart();
                });
                card.appendChild(addToCart);
                customerProductList.appendChild(card);
            });
        }
        if (visitCountDisplay) visitCountDisplay.textContent = visitCount;
        if (salesTotalDisplay) salesTotalDisplay.textContent = salesTotal;
    }

    // Product Management (Simulated from previous logic)
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('productName').value;
            const productDesc = document.getElementById('productDesc').value;
            const productPrice = document.getElementById('productPrice').value;
            const productImage = document.getElementById('productImage').files[0];
            if (productName && productDesc && productPrice) {
                const product = { name: productName, desc: productDesc, price: productPrice };
                if (productImage) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        product.image = e.target.result;
                        products.push(product);
                        const productDiv = document.createElement('div');
                        productDiv.innerHTML = `<h3>${productName}</h3><p>${productDesc}</p><p>${productPrice}</p>`;
                        if (productImage) {
                            const img = document.createElement('img');
                            img.src = product.image;
                            img.style.maxWidth = '200px';
                            productDiv.appendChild(img);
                        }
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.addEventListener('click', () => {
                            const newName = prompt('Edit name:', productDiv.querySelector('h3').textContent);
                            const newDesc = prompt('Edit description:', productDiv.querySelector('p:nth-child(2)').textContent);
                            const newPrice = prompt('Edit price:', productDiv.querySelector('p:nth-child(3)').textContent);
                            if (newName && newDesc && newPrice) {
                                productDiv.querySelector('h3').textContent = newName;
                                productDiv.querySelector('p:nth-child(2)').textContent = newDesc;
                                productDiv.querySelector('p:nth-child(3)').textContent = newPrice;
                                products = products.map(p => p.name === productName ? { ...p, name: newName, desc: newDesc, price: newPrice } : p);
                                updateCustomerPage();
                            }
                        });
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.addEventListener('click', () => {
                            products = products.filter(p => p.name !== productName);
                            productDiv.remove();
                            updateCustomerPage();
                        });
                        productDiv.appendChild(editButton);
                        productDiv.appendChild(deleteButton);
                        productList.appendChild(productDiv);
                        updateCustomerPage();
                    };
                    reader.readAsDataURL(productImage);
                } else {
                    products.push(product);
                    const productDiv = document.createElement('div');
                    productDiv.innerHTML = `<h3>${productName}</h3><p>${productDesc}</p><p>${productPrice}</p>`;
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => {
                        const newName = prompt('Edit name:', productDiv.querySelector('h3').textContent);
                        const newDesc = prompt('Edit description:', productDiv.querySelector('p:nth-child(2)').textContent);
                        const newPrice = prompt('Edit price:', productDiv.querySelector('p:nth-child(3)').textContent);
                        if (newName && newDesc && newPrice) {
                            productDiv.querySelector('h3').textContent = newName;
                            productDiv.querySelector('p:nth-child(2)').textContent = newDesc;
                            productDiv.querySelector('p:nth-child(3)').textContent = newPrice;
                            products = products.map(p => p.name === productName ? { ...p, name: newName, desc: newDesc, price: newPrice } : p);
                            updateCustomerPage();
                        }
                    });
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        products = products.filter(p => p.name !== productName);
                        productDiv.remove();
                        updateCustomerPage();
                    });
                    productDiv.appendChild(editButton);
                    productDiv.appendChild(deleteButton);
                    productList.appendChild(productDiv);
                    updateCustomerPage();
                }
                productForm.reset();
            }
        });
    }

    // Cart and Payment
    if (cartIcon) {
        cartIcon.addEventListener('click', () => cartPopup.style.display = 'flex');
    }
    if (closeCart) {
        closeCart.addEventListener('click', () => cartPopup.style.display = 'none');
    }
    if (cartPopup) {
        cartPopup.addEventListener('click', (e) => {
            if (e.target === cartPopup) cartPopup.style.display = 'none';
        });
    }
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cardNumber = document.getElementById('cardNumber').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            if (cardNumber && expiry && cvv) {
                salesTotal += cart.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0);
                cart = [];
                document.getElementById('cartCount').textContent = cart.length;
                updateCart();
                alert('Payment processed! Total: $' + salesTotal.toFixed(2));
                paymentForm.reset();
                cartPopup.style.display = 'none';
                updateCustomerPage();
            }
        });
    }

    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach(p => {
            const item = document.createElement('div');
            item.textContent = `${p.name} - ${p.price}`;
            cartItems.appendChild(item);
        });
    }

    // Pop-up Form
    if (openPopup && popup && closePopup && popupForm) {
        openPopup.addEventListener('click', () => popup.style.display = 'flex');
        closePopup.addEventListener('click', () => popup.style.display = 'none');
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.style.display = 'none';
        });
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (email) {
                alert(`Subscribed with email: ${email}`);
                popup.style.display = 'none';
                popupForm.reset();
            }
        });
    }

    // Analytics
    visitCount++;
    updateCustomerPage();

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
});