import Home from './views/public/Home.js';
import Plans from './views/public/Plans.js';
import LoginView from './views/Login.js';
import RegisterView from './views/Register.js';
import Dashboard from './views/Dashboard.js';
import PracticeMaterial from './views/PracticeMaterial.js';
import Tracking from './views/Tracking.js';
import Settings from './views/Settings.js';
import Feedback from './views/Feedback.js';
import Help from './views/Help.js';
import PracticeView from './views/practice/PracticeView.js';
import Prediction from './views/Prediction.js';
import MockTestView from './views/mock/MockTestView.js';

import Auth from './core/Auth.js';
import AppLayout from './views/AppLayout.js';

// Define which URLs are public (accessible without login)
const publicRoutes = {
    '/': Home,
    '/login': LoginView,
    '/register': RegisterView,
    '/plans': Plans,
};

// Define which URLs are private (require login)
const privateRoutes = {
    '/dashboard': Dashboard,
    '/practice-material': PracticeMaterial,
    '/tracking': Tracking,
    '/settings': Settings,
    '/feedback': Feedback,
    '/help': Help,
    '/prediction-files': Prediction,
    '/mock-test': MockTestView,
    '/practice/:module/:taskType': PracticeView,
};

const router = {
    async navigate() {
        const path = this.parseURL();
        const appContainer = document.getElementById('app-container');

        const findViewClass = (routes, routePath) => {
            // Direct match (e.g., '/dashboard')
            if (routes[routePath.route]) return routes[routePath.route];
            // Parameterized match (e.g., '/practice/:module/:taskType')
            for (const key in routes) {
                if (key.includes(':') && key.split('/').length === routePath.route.split('/').length) {
                    return routes[key];
                }
            }
            return null;
        };

        const PublicView = findViewClass(publicRoutes, path);
        
        if (PublicView) {
            // Render a public page
            const view = new PublicView(path.params);
            appContainer.innerHTML = await view.render();
            if (view.after_render) await view.after_render();
        } else {
            // It must be a private app route
            if (!Auth.isLoggedIn()) {
                window.location.hash = '/login'; // If not logged in, go to login
                return;
            }
            // If the main app layout isn't on the page yet, render it.
            if (!document.getElementById('app-sidebar')) {
                const layout = new AppLayout();
                appContainer.innerHTML = await layout.render();
                if (layout.after_render) await layout.after_render();
            }

            // Find the correct private view to render inside the main content area
            const PrivateView = findViewClass(privateRoutes, path) || Dashboard; // Default to Dashboard
            const viewInstance = new PrivateView(path.params);
            document.getElementById('app-root').innerHTML = await viewInstance.render();
            if (viewInstance.after_render) await viewInstance.after_render();
        }
    },

    parseURL() {
        const url = location.hash.slice(1) || '/';
        const parts = url.split('/').filter(p => p); // filter removes empty strings from start/end
        const pathInfo = {
            base: `/${parts[0] || ''}`, // e.g., '/', '/login', '/practice'
            params: {},
            route: `/${parts.join('/')}`
        };

        if (parts[0] === 'practice' && parts.length === 3) {
             pathInfo.route = '/practice/:module/:taskType';
             pathInfo.params = { module: parts[1], taskType: parts[2] };
        }
        
        return pathInfo;
    }
};

export default router;