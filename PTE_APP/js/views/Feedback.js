import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";
import Store from "../core/Store.js";
import { UI } from "../core/UI.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Your Personalized Feedback"); // UPDATED TITLE
    }

    // Helper function to calculate average scores
    _calculateAverages(scores) {
        const averages = {};
        for (const module of ['speaking', 'writing', 'reading', 'listening']) {
            const attempts = scores[module] || [];
            const validAttempts = attempts.filter(a => typeof a.score === 'number' && a.maxScore > 0);
            if (validAttempts.length > 0) {
                const totalScore = validAttempts.reduce((acc, cur) => acc + (cur.score / cur.maxScore * 90), 0);
                averages[module] = (totalScore / validAttempts.length).toFixed(1);
            } else {
                averages[module] = 'N/A';
            }
        }
        return averages;
    }
    
    // Helper function to generate personalized recommendations
    _generateRecommendations(averages, targets) {
        let recommendations = [];
        let weaknesses = [];
        for (const module in targets) {
            if (averages[module] !== 'N/A' && parseFloat(averages[module]) < targets[module]) {
                weaknesses.push(module);
            }
        }
        if (weaknesses.length === 0) {
            recommendations.push({ title: "Keep Up the Great Work!", tip: "You are meeting all your current targets. To improve further, focus on consistency and reducing your time on each question." });
        }
        if (weaknesses.includes('speaking')) {
            recommendations.push({ title: "Improve Your Speaking Score", tip: "Focus on fluency and pronunciation in 'Read Aloud'. For 'Describe Image', try to speak continuously for the full 40 seconds. Use a clear structure: introduce the image, describe 2-3 key features, and conclude." });
        }
        if (weaknesses.includes('writing')) {
            recommendations.push({ title: "Improve Your Writing Score", tip: "For 'Write Essay', ensure your essay has a clear 4-paragraph structure. For 'Summarize Written Text', focus on creating a single, grammatically correct complex sentence." });
        }
        if (weaknesses.includes('reading')) {
            recommendations.push({ title: "Improve Your Reading Score", tip: "For 'Re-order Paragraphs', find the independent topic sentence first, then look for logical links (like pronouns and transition words) between the others. For 'Fill in the Blanks', pay close attention to grammar and vocabulary context." });
        }
        if (weaknesses.includes('listening')) {
            recommendations.push({ title: "Improve Your Listening Score", tip: "For 'Write From Dictation', type the sentence into the scratchpad first to ensure you don't miss any words. For 'Summarize Spoken Text', focus on capturing the main idea and key supporting points of the lecture." });
        }
        return recommendations;
    }

    async render() {
        const username = Auth.getCurrentUser();
        const userData = Store.getUserData(username);
        if (!userData) return UI.ErrorCard("Could not load user data.").outerHTML;
        
        const averages = this._calculateAverages(userData.scores);
        const targets = userData.settings.targets;
        const recommendations = this._generateRecommendations(averages, targets);

        const summaryHTML = `
            <table style="width:100%; text-align:left;">
                <tr><th>Module</th><th style="text-align:center;">Your Average</th><th style="text-align:center;">Your Target</th></tr>
                ${Object.keys(averages).map(module => `
                    <tr>
                        <td style="text-transform:capitalize;"><strong>${module}</strong></td>
                        <td style="text-align:center;">${averages[module]}</td>
                        <td style="text-align:center;">${targets[module]}</td>
                    </tr>
                `).join('')}
            </table>`;
        
        const recommendationsHTML = recommendations.map(rec => `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--primary-brand-color);">${rec.title}</h4>
                <p style="margin-top: 0;">${rec.tip}</p>
            </div>`).join('');

        const container = document.createElement('div');
        // UPDATED CARD HEADER
        container.appendChild(UI.Card("Your Feedback & Performance Summary", [UI.createElement('div', { innerHTML: summaryHTML })]));
        container.appendChild(UI.Card("Personalized Recommendations", [UI.createElement('div', { innerHTML: recommendationsHTML })]));

        return container.outerHTML;
    }
}