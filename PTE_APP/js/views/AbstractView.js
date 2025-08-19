export default class {
    constructor(params) {
        this.params = params;
        this.isPublic = false; // By default, views require authentication
    }

    setTitle(title) {
        document.title = title;
    }

    async render() {
        // This is a base method, intended to be overridden by child classes.
        return "";
    }

    async after_render() {
        // This is a base method, intended to be overridden by child classes.
    }
}