import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";
import Store from "../core/Store.js";
import { UI } from "../core/UI.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async render() {
        const username = Auth.getCurrentUser();
        const userData = Store.getUserData(username);
        const targets = userData.settings.targets;

        return `
            <div class="card">
                <div class="card-header">Score Targets</div>
                <form id="settings-form">
                    <p>Set your target scores for each section (0-90).</p>
                    <div class="form-group">
                        <label for="speaking_target">Speaking</label>
                        <input type="number" id="speaking_target" value="${targets.speaking}" min="0" max="90">
                    </div>
                    <div class="form-group">
                        <label for="writing_target">Writing</label>
                        <input type="number" id="writing_target" value="${targets.writing}" min="0" max="90">
                    </div>
                    <div class="form-group">
                        <label for="reading_target">Reading</label>
                        <input type="number" id="reading_target" value="${targets.reading}" min="0" max="90">
                    </div>
                     <div class="form-group">
                        <label for="listening_target">Listening</label>
                        <input type="number" id="listening_target" value="${targets.listening}" min="0" max="90">
                    </div>
                    <button type="submit" class="btn btn-primary">Save Targets</button>
                    <span id="save-status" style="margin-left: 1rem; color: var(--success-color);"></span>
                </form>
            </div>
            <div class="card">
                <div class="card-header">Data Management</div>
                <p>Export your progress data as a JSON file to share with an instructor or for backup.</p>
                <button id="export-data" class="btn btn-secondary">Export My Data</button>
            </div>
        `;
    }

    async after_render() {
        const form = document.getElementById('settings-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const newTargets = {
                speaking: parseInt(document.getElementById('speaking_target').value),
                writing: parseInt(document.getElementById('writing_target').value),
                reading: parseInt(document.getElementById('reading_target').value),
                listening: parseInt(document.getElementById('listening_target').value)
            };
            const username = Auth.getCurrentUser();
            Store.setUserData(username, { settings: { targets: newTargets } });
            
            const status = document.getElementById('save-status');
            status.textContent = "Saved!";
            setTimeout(() => status.textContent = '', 2000);
        });

        document.getElementById('export-data').addEventListener('click', () => {
            const username = Auth.getCurrentUser();
            const data = Store.getUserData(username);
            const dataStr = JSON.stringify(data, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = UI.createElement('a', { href: url, download: `${username}_pte_progress.json` });
            link.click();
            URL.revokeObjectURL(url);
        });
    }
}