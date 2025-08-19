import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";
import Store from "../core/Store.js";
import { Content } from '../data/Content.js';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async render() {
        const username = Auth.getCurrentUser();
        const userData = Store.getUserData(username);
        if (!userData) return `<h1>Error: Could not load user data.</h1>`;

        const totalQuestionsPracticed = Object.values(userData.scores).flat().length;

        const videoSectionHTML = Content.videos.length > 0 ? `
            <div class="video-section">
                <h2>PTE Tutorial Videos</h2>
                <div class="video-grid">
                    ${this.createVideoGrid()}
                </div>
            </div>
        ` : '';

        return `
            <div class="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, ${username}! Here's a summary of your progress.</p>
            </div>
            <div class="dashboard-grid-stats">
                <div class="stat-card estimated-score">
                    <h4>Estimated Score</h4>
                    <div class="value">N/A</div>
                    <p>Complete mock tests to get an estimate.</p>
                </div>
                <div class="stat-card">
                    <h4>My Statistics</h4>
                    <p>Total Questions Practiced: <strong style="font-size: 1.2rem;">${totalQuestionsPracticed}</strong></p>
                    <p>Total Mocks Practiced: <strong style="font-size: 1.2rem;">0</strong></p>
                </div>
            </div>
            <div class="dashboard-grid-modules">
                ${this.createModuleCard('speaking', userData)}
                ${this.createModuleCard('writing', userData)}
                ${this.createModuleCard('reading', userData)}
                ${this.createModuleCard('listening', userData)}
            </div>
            ${videoSectionHTML}
        `;
    }

    createModuleCard(moduleName, userData) {
        const questionsDone = userData.scores[moduleName]?.length || 0;
        const totalQuestions = Object.values(Content[moduleName]).flat().length;
        return `
            <div class="module-progress-card ${moduleName}-card">
                <h3>${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}</h3>
                <div class="counts">
                    <span>${questionsDone} Done</span>
                    <span>${totalQuestions} Total</span>
                </div>
                <button class="avg-score-btn">View Avg Score</button>
            </div>
        `;
    }

    createVideoGrid() {
        return Content.videos.map(video => `
            <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" rel="noreferrer" class="video-thumb">
                <img src="${video.thumbnailUrl}" alt="${video.title}" onerror="this.src='https://placehold.co/400x225/cccccc/ffffff?text=Video';">
                <div class="video-thumb-info">
                    <h4>${video.title}</h4>
                    <p>${video.tutor}</p>
                </div>
            </a>
        `).join('');
    }
}