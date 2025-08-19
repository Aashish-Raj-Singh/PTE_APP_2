import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("PTE Ascent");
    }

    updateActiveLink() {
        const currentPath = window.location.hash || '#/dashboard';
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            if (link) {
                link.classList.remove('active');
                if (currentPath.startsWith(link.getAttribute('href'))) {
                    link.classList.add('active');
                }
            }
        });
    }

    async after_render() {
        document.getElementById('logout-btn').addEventListener('click', () => Auth.logout());
        
        window.addEventListener('hashchange', () => this.updateActiveLink());
        this.updateActiveLink(); // Set initial active link
    }

    async render() {
        const username = Auth.getCurrentUser();
        return `
            <div class="app-layout">
                <aside id="app-sidebar">
                    <div class="sidebar-profile">
                        <div class="avatar"><i class="fa-solid fa-user"></i></div>
                        <h4>${username}</h4>
                    </div>
                    <ul class="sidebar-nav">
                        <li><a href="#/dashboard"><i class="fa-solid fa-table-columns"></i> Dashboard</a></li>
                        <li><a href="#/practice-material"><i class="fa-solid fa-pen-to-square"></i> Practice Material</a></li>
                        <li><a href="#/mock-test"><i class="fa-solid fa-file-alt"></i> Mock Tests</a></li>
                        <li><a href="#/prediction-files"><i class="fa-solid fa-wand-magic-sparkles"></i> Prediction Files</a></li>
                        <li><a href="#/tracking"><i class="fa-solid fa-chart-line"></i> Score Tracking</a></li>
                        <li><a href="#/settings"><i class="fa-solid fa-gear"></i> Settings</a></li>
                        <li><a href="#/feedback"><i class="fa-solid fa-comment-dots"></i> Performance Analysis</a></li>
                        <li><a href="#/help"><i class="fa-solid fa-circle-question"></i> Help</a></li>
                    </ul>
                    <div class="sidebar-logout">
                        <button id="logout-btn" class="btn btn-primary" style="width: 100%;">Logout</button>
                    </div>
                </aside>
                <div id="main-wrapper">
                    <nav class="app-top-nav">
                        <div>
                            </div>
                        <div class="app-top-nav-links">
                             <a href="#/plans">Plans</a>
                        </div>
                    </nav>
                    <main id="app-root">
                        </main>
                </div>
            </div>
        `;
    }
}