// Language switching functionality
async function switchLanguage(lang) {
    console.log("Switching to language:", lang);
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'translation-loading';
    loadingIndicator.style.cssText = 'position:fixed;top:80px;right:16px;background:rgba(0,0,0,0.7);color:white;padding:8px 16px;border-radius:4px;z-index:9999;';
    loadingIndicator.textContent = 'Translating...';
    document.body.appendChild(loadingIndicator);
    
    try {
        // Update document language and direction
        document.documentElement.lang = lang;
        document.documentElement.dir = ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
        
        // Update active language button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.dataset.translatePlaceholder;
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update layout direction for RTL languages
        const container = document.querySelector('.auth-container');
        if (container) {
            container.style.textAlign = ['ar', 'ur'].includes(lang) ? 'right' : 'left';
        }

        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
        
    } catch (error) {
        console.error('Error during language switch:', error);
        // Show error message to user
        const errorToast = document.createElement('div');
        errorToast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(231,76,60,0.9);color:white;padding:12px 24px;border-radius:4px;z-index:9999;';
        errorToast.textContent = 'Translation failed. Please try again later.';
        document.body.appendChild(errorToast);
        setTimeout(() => errorToast.remove(), 5000);
    } finally {
        // Remove loading indicator
        document.body.removeChild(loadingIndicator);
    }
}

// Form handling functions
function handleLogin(event) {
    event.preventDefault();
    
    // Bypass login for testing
    console.log('Login bypassed for testing');
    window.location.href = 'address-app-preview.html';
}

function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const fullName = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    // Add your signup logic here
    console.log('Signup attempt:', { fullName, email, password });
    
    // Show success message and redirect
    showMessage('Account created successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

function handlePasswordReset(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;

    // Add your password reset logic here
    console.log('Password reset requested for:', email);
    
    // Show success message
    showMessage('Password reset link sent to your email!', 'success');
}

// Helper function to show messages
function showMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 4px;
        color: white;
        z-index: 9999;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 
                    type === 'error' ? 'rgba(231, 76, 60, 0.9)' : 
                    'rgba(52, 152, 219, 0.9)'};
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLanguage);
});

// Global logout handler using event delegation for dynamic menus
document.addEventListener('click', function(e) {
    const logoutBtn = e.target.closest('#logout-btn');
    if (logoutBtn) {
        e.preventDefault();
        fetch('/auth/logout', { method: 'GET', credentials: 'include' })
            .then(() => {
                window.location.href = 'login.html';
            });
    }
}); 