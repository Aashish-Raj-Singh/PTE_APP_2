import router from './router.js';

const App = {
    init() {
        // This single handler will run on page load and all subsequent navigation events.
        const navigateAndRefreshUI = async () => {
            document.getElementById('loading-overlay').classList.remove('hidden');
            await router.navigate(); // Let the router handle everything
            document.getElementById('loading-overlay').classList.add('hidden');
        };

        window.addEventListener('load', navigateAndRefreshUI);
        window.addEventListener('hashchange', navigateAndRefreshUI);
    }
};

// Start the application
App.init();