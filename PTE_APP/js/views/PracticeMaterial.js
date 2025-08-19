// Filename: js/views/PracticeMaterial.js

import AbstractView from "./AbstractView.js";
import { UI } from "../core/UI.js";
import { Content } from '../data/Content.js';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Practice Material");
    }

    async render() {
        const mainContainer = document.createElement('div');
        mainContainer.innerHTML = '<h1>Practice Material</h1>';

        const modules = [
            { name: 'Speaking Zone', key: 'speaking' },
            { name: 'Writing Zone', key: 'writing' },
            { name: 'Reading Zone', key: 'reading' },
            { name: 'Listening Zone', key: 'listening' }
        ];

        modules.forEach(module => {
            const zoneDiv = document.createElement('div');
            zoneDiv.className = 'practice-zone';

            const zoneHeader = document.createElement('h2');
            zoneHeader.textContent = module.name;
            zoneDiv.appendChild(zoneHeader);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'task-buttons';

            const taskTypes = Object.keys(Content[module.key]);
            taskTypes.forEach(taskType => {
                const taskName = taskType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const link = UI.createElement('a', {
                    href: `#/practice/${module.key}/${taskType}`,
                    textContent: taskName
                });
                buttonsContainer.appendChild(link);
            });

            zoneDiv.appendChild(buttonsContainer);
            mainContainer.appendChild(zoneDiv);
        });

        return mainContainer.outerHTML;
    }
}