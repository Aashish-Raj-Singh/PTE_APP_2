import AbstractView from "./AbstractView.js";
import { UI } from "../core/UI.js";
import { Content } from '../data/Content.js';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Prediction Files");
    }

    async render() {
        if (!Content.predictions) {
            return UI.ErrorCard("Prediction content is not available at this time.").outerHTML;
        }

        const { title, introduction, sections } = Content.predictions;
        
        let sectionsHTML = sections.map(section => `
            <div class="prediction-card card">
                <div class="card-header" style="font-size: 1.2rem; color: var(--primary-brand-color);">${section.title}</div>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    ${section.items.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <h1>${title}</h1>
            <p>${introduction}</p>
            ${sectionsHTML}
        `;
    }
}