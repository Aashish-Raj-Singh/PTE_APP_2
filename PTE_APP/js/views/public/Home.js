import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("PTE Ascent - Home");
        this.isPublic = true; // Mark this view as public
    }

    async render() {
        return `
            <header class="public-header">
                <div class="public-logo">PTE Ascent</div>
                <nav class="public-nav">
                    <a href="#/plans">Plans</a>
                    <a href="#/login" class="btn btn-primary">Login</a>
                </nav>
            </header>

            <section class="hero-section">
                <h1>Confidently Achieve Your PTE Target Score</h1>
                <p>Discover the missing piece in PTE exam success. Join thousands of students using our platform to master the Academic/UK VI or the Core exam.</p>
                <div>
                    <a href="#/register" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">Start Practicing For Free</a>
                </div>
            </section>

            <section class="features-section">
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fa-solid fa-brain"></i>
                        <h3>Practice with AI Scoring</h3>
                        <p>Get feedback for PTE practice questions with a cutting-edge AI scoring engine, personalized for each user.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fa-solid fa-file-lines"></i>
                        <h3>Section, Mini, and Full Mock Tests</h3>
                        <p>Progress incrementally with different practice tests that match your schedules and build your confidence.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fa-solid fa-chart-pie"></i>
                        <h3>Revolutionary Detailed Score Report</h3>
                        <p>A comprehensive diagnostic tool that acts like an x-ray scan of your language skills to pinpoint weaknesses.</p>
                    </div>
                </div>
            </section>

            <footer class="public-footer">
                <p>© 2025 PTE Ascent. All Rights Reserved.</p>
            </footer>
        `;
    }
}