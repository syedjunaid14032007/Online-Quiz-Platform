document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Switch Forms
    if(showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.classList.add('hidden');
            registerSection.classList.remove('hidden');
        });
    }

    if(showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        });
    }

    // Initialize mock DB
    let usersDB = JSON.parse(localStorage.getItem('quiz_users')) || [];

    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value;

            if (username.length < 3 || password.length < 6) {
                showToast('Username min 3 chars, Password min 6 chars.', 'danger');
                return;
            }

            // Check if user exists
            const userExists = usersDB.some(u => u.username.toLowerCase() === username.toLowerCase());
            if (userExists) {
                showToast('Username already taken!', 'danger');
                return;
            }

            // Save user
            usersDB.push({ username, password });
            localStorage.setItem('quiz_users', JSON.stringify(usersDB));
            
            showToast('Registration successful! Please login.', 'success');
            registerForm.reset();
            
            // Switch to login
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        });
    }

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;

            const user = usersDB.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

            if (user) {
                sessionStorage.setItem('logged_in_user', user.username);
                // Also set current_player for the quiz logic compatibility
                sessionStorage.setItem('current_player', user.username);
                
                showToast(`Welcome back, ${user.username}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast('Invalid username or password.', 'danger');
            }
        });
    }
});
