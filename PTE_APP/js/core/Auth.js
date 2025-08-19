import Store from './Store.js';

// User database is still loaded once from localStorage
let userDB = new Map(Object.entries(JSON.parse(localStorage.getItem('users') || '{}')));

const Auth = {
    register(username, password) {
        if (!username || !password) return { success: false, message: 'Username and password are required.' };
        if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
        if (userDB.has(username)) return { success: false, message: 'Username already exists.' };

        const hashedPassword = btoa(password);
        userDB.set(username, { password: hashedPassword });
        this._persistUsers();

        Store.initUserData(username);
        return { success: true, message: 'Registration successful! Redirecting to login...' };
    },

    login(username, password) {
        const user = userDB.get(username);
        if (user && user.password === btoa(password)) {
            // The only state it writes to is sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify({ username }));
            Store.dispatch('authChange');
            return true;
        }
        return false;
    },

    logout() {
        sessionStorage.removeItem('currentUser');
        Store.dispatch('authChange');
        window.location.hash = '/login';
    },

    isLoggedIn() {
        // ALWAYS reads the latest info directly from sessionStorage
        return sessionStorage.getItem('currentUser') !== null;
    },

    getCurrentUser() {
        // ALWAYS reads the latest info directly from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        return user ? user.username : null;
    },

    _persistUsers() {
        localStorage.setItem('users', JSON.stringify(Object.fromEntries(userDB)));
    }
};

export default Auth;