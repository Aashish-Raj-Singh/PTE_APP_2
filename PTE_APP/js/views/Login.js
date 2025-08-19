import AbstractView from "./AbstractView.js";
import Auth from "../core/Auth.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login to PTE Ascent");
        this.isPublic = true;
    }

    async render() {
        return `
            <div class.auth-page">
                <div class="auth-card">
                    <div class="logo">PTE Ascent</div>
                    <div id="error-message" class="error-message" style="display:none; text-align:left; padding-bottom:1rem;"></div>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
                    </form>
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem;">
                        Don't have an account? <a href="#/register">Sign up</a>
                    </p>
                </div>
            </div>
        `;
    }

    async after_render() {
        document.getElementById('login-form').addEventListener('submit', e => {
            e.preventDefault();
            const success = Auth.login(document.getElementById('username').value, document.getElementById('password').value);
            if (success) {
                window.location.hash = '/dashboard';
            } else {
                const errorEl = document.getElementById('error-message');
                errorEl.innerText = 'Invalid username or password.';
                errorEl.style.display = 'block';
            }
        });
    }
}