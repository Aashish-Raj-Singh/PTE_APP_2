import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";
import Store from "../core/Store.js";
import { UI } from "../core/UI.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Score Tracking");
    }

    async render() {
        const username = Auth.getCurrentUser();
        const userData = Store.getUserData(username);
        if (!userData) return UI.ErrorCard("Could not load user data.").outerHTML;

        const mainContainer = UI.createElement('div');
        const summaryCard = this.createSummaryCard(userData);
        mainContainer.appendChild(summaryCard);

        const detailsCard = this.createDetailedResultsCard(userData.scores);
        mainContainer.appendChild(detailsCard);

        return mainContainer.outerHTML;
    }
    
    createSummaryCard(userData) {
        const targets = userData.settings.targets;
        const scores = userData.scores;
        let summaryHtml = '<table class="summary-table" style="width:100%; text-align:left; border-collapse: collapse;"><thead><tr><th>Module</th><th>Attempts</th><th>Avg. Score</th><th>Target</th></tr></thead><tbody>';

        for (const module of ['speaking', 'writing', 'reading', 'listening']) {
            const attempts = scores[module] || [];
            const validAttempts = attempts.filter(a => typeof a.score === 'number');
            const avgScore = validAttempts.length ? (validAttempts.reduce((acc, cur) => acc + (cur.score / cur.maxScore * 90), 0) / validAttempts.length).toFixed(1) : 'N/A';
            summaryHtml += `
                <tr>
                    <td style="text-transform:capitalize; padding: 0.75rem 0;">${module}</td>
                    <td>${attempts.length}</td>
                    <td>${avgScore}</td>
                    <td>${targets[module]}</td>
                </tr>
            `;
        }
        summaryHtml += '</tbody></table>';
        const summaryContainer = UI.createElement('div');
        summaryContainer.innerHTML = summaryHtml;
        return UI.Card("Overall Progress Summary", [summaryContainer]);
    }
    
    createDetailedResultsCard(scores) {
        let detailsHtml = `
            <table class="detailed-log-table">
                <thead>
                    <tr>
                        <th>Task Type</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let hasAttempts = false;
        for (const module of ['speaking', 'writing', 'reading', 'listening']) {
            if (scores[module] && scores[module].length > 0) {
                hasAttempts = true;
                // Add a header row for the module
                detailsHtml += `
                    <tr class="module-header-row">
                        <td colspan="4">${module.charAt(0).toUpperCase() + module.slice(1)}</td>
                    </tr>
                `;
                // Add the attempt rows
                scores[module].forEach(attempt => {
                    const taskName = attempt.taskType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    const scoreDisplay = typeof attempt.score === 'number' ? `${attempt.score}/${attempt.maxScore}` : 'Completed';
                    const date = new Date(attempt.timestamp).toLocaleString();
                    const details = attempt.details ? `<i>"${attempt.details.substring(0, 50)}..."</i>` : 'N/A';
                    detailsHtml += `<tr><td>${taskName}</td><td>${scoreDisplay}</td><td>${date}</td><td>${details}</td></tr>`;
                });
            }
        }

        detailsHtml += '</tbody></table>';

        if (!hasAttempts) {
            detailsHtml = '<p>No practice attempts recorded yet. Go to the dashboard to get started!</p>';
        }

        const detailsContainer = UI.createElement('div');
        detailsContainer.innerHTML = detailsHtml;
        return UI.Card("Detailed Attempts Log", [detailsContainer]);
    }
}