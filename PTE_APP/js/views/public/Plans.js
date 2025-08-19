import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Our Plans");
        this.isPublic = true;
    }

    async render() {
        return `
            <header class="public-header">
                <div class="public-logo">PTE Ascent</div>
                <nav class="public-nav">
                    <a href="#/">Home</a>
                    <a href="#/plans">Plans</a>
                    <a href="#/login" class="btn btn-primary">Login</a>
                </nav>
            </header>

            <section class="hero-section" style="padding: 4rem 2rem;">
                <h1>Our Study Plans</h1>
                <p>Start your PTE learning journey with a free Starter plan. Upgrade to unlock all features.</p>
            </section>

            <section class="features-section" style="background-color: white; padding-bottom: 5rem;">
                <div class="features-grid">
                    <div class="feature-card" style="border: 2px solid var(--primary-brand-color);">
                        <h3 style="font-size: 1.5rem;">Starter</h3>
                        <p style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">USD 0</p>
                        <ul style="text-align: left; list-style: none; padding: 0; margin: 2rem 0;">
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Access to some questions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Limited scoring submissions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-times" style="color: #e74c3c;"></i> Unscored mock tests</li>
                        </ul>
                        <a href="#/register" class="btn btn-primary" style="width: 100%;">Get Started</a>
                    </div>

                    <div class="feature-card">
                        <h3 style="font-size: 1.5rem;">Self Learner 15 Days</h3>
                        <p style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">USD 7.49</p>
                        <ul style="text-align: left; list-style: none; padding: 0; margin: 2rem 0;">
                             <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Access to all questions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Unlimited scoring submissions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Scored mock exams</li>
                        </ul>
                        <a href="#/register" class="btn btn-primary" style="width: 100%;">Buy Now</a>
                    </div>

                    <div class="feature-card">
                        <h3 style="font-size: 1.5rem;">Self Learner 60 Days</h3>
                        <p style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">USD 22.99</p>
                        <ul style="text-align: left; list-style: none; padding: 0; margin: 2rem 0;">
                             <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Access to all questions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Unlimited scoring submissions</li>
                            <li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: #2ecc71;"></i> Scored mock exams</li>
                        </ul>
                        <a href="#/register" class="btn btn-primary" style="width: 100%;">Buy Now</a>
                    </div>
                </div>
            </section>

            <footer class="public-footer">
                <p>© 2025 PTE Ascent. All Rights Reserved.</p>
            </footer>
        `;
    }
}