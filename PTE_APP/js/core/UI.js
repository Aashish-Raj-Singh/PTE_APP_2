export const UI = {
    /**
     * Creates a DOM element with specified attributes and content.
     * @param {string} tag - The HTML tag name.
     * @param {object} attributes - An object of attributes (e.g., { className, id, textContent }).
     * @returns {HTMLElement} The created element.
     */
    createElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'children' && Array.isArray(attributes.children)) {
                attributes.children.forEach(child => element.appendChild(child));
            } else {
                element[key] = attributes[key];
            }
        }
        return element;
    },
    
    /**
     * Generates a standard card component.
     * @param {string} headerText - The text for the card header.
     * @param {HTMLElement[]} contentElements - An array of elements to append to the card body.
     * @returns {HTMLElement} The card element.
     */
    Card(headerText, contentElements = []) {
        const header = this.createElement('div', { className: 'card-header', textContent: headerText });
        const body = this.createElement('div', { className: 'card-body', children: contentElements });
        return this.createElement('div', { className: 'card', children: [header, body] });
    },
    
    /**
     * Generates a card for displaying errors.
     * @param {string} message - The error message.
     * @returns {HTMLElement} The error card element.
     */
    ErrorCard(message) {
        return this.Card('An Error Occurred', [
            this.createElement('p', { textContent: message })
        ]);
    },
    
    /**
     * Generates a grid of links for navigation.
     * @param {object[]} items - Array of {href, title, description}.
     * @returns {HTMLElement} The grid container.
     */
    Grid(items) {
        const grid = this.createElement('div', { className: 'dashboard-grid' });
        items.forEach(item => {
            const title = this.createElement('h3', { textContent: item.title });
            const description = this.createElement('p', { textContent: item.description });
            const cardLink = this.createElement('a', {
                href: item.href,
                className: 'card module-card',
                children: [title, description]
            });
            grid.appendChild(cardLink);
        });
        return grid;
    }
};