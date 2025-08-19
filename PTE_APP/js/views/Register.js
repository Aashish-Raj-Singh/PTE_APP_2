import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Join PTE Ascent");
        this.isPublic = true;
    }

    async render() {
        return `
            <div class.auth-page">
                <div class="auth-card">
                    <div class="logo">PTE Ascent</div>
                    <div id="message" style="display:none; text-align:left; padding-bottom:1rem; font-weight: 500;"></div>
                    <form id="register-form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password (min. 6 characters)</label>
                            <input type="password" id="password" minlength="6" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
                    </form>
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem;">
                        Already have an account? <a href="#/login">Sign In</a>
                    </p>
                </div>
            </div>
        `;
    }

    async after_render() {
        document.getElementById('register-form').addEventListener('submit', e => {
            e.preventDefault();
            const result = Auth.register(document.getElementById('username').value, document.getElementById('password').value);
            const msgEl = document.getElementById('message');
            msgEl.innerText = result.message;
            msgEl.style.display = 'block';
            msgEl.style.color = result.success ? '#2ecc71' : '#e74c3c';
            if (result.success) {
                setTimeout(() => window.location.hash = '/login', 2000);
            }
        });
    }
}