import AbstractView from "./AbstractView.js";
import { UI } from "../core/UI.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Help & FAQ");
    }

    async render() {
        const helpContent = [
            UI.createElement('h3', { textContent: 'How do I use this application?' }),
            UI.createElement('p', { textContent: 'From the Dashboard, select a skill (e.g., Speaking). This will show you all the available practice tasks for that skill. Click on a task to begin the practice session.' }),
            UI.createElement('h3', { textContent: 'How do I share my results with an instructor?' }),
            UI.createElement('p', { textContent: 'Go to the Settings page. Under "Data Management", click the "Export My Data" button. This will download a JSON file containing all your scores and progress, which you can then send to your instructor.' }),
            UI.createElement('h3', { textContent: 'How does scoring work?' }),
            UI.createElement('p', { textContent: 'Objective tasks (like multiple choice or fill-in-the-blanks) are scored automatically. Subjective tasks (like speaking and essay writing) are saved for manual review. Your spoken responses and written text are saved in your progress data for an instructor to evaluate.' }),
        ];
        
        return UI.Card("Help & Frequently Asked Questions", helpContent).outerHTML;
    }
}