// This file's content remains the same as the last working version.
const Store = {
    listeners: {},
    subscribe(event, callback) { if (!this.listeners[event]) this.listeners[event] = []; this.listeners[event].push(callback); },
    dispatch(event, data) { if (!this.listeners[event]) return; this.listeners[event].forEach(callback => callback(data)); },
    initUserData(username) {
        const key = `userData_${username}`;
        if (!localStorage.getItem(key)) {
            const initialData = { scores: { speaking: [], writing: [], reading: [], listening: [] }, settings: { targets: { speaking: 79, writing: 79, reading: 79, listening: 79 } }, feedback: [], mockScores: [] };
            localStorage.setItem(key, JSON.stringify(initialData));
        }
    },
    getUserData(username) { return JSON.parse(localStorage.getItem(`userData_${username}`)) || null; },
    setUserData(username, newData) {
        let data = this.getUserData(username);
        if (data) {
            data = { ...data, ...newData, settings: { ...data.settings, ...newData.settings } };
            localStorage.setItem(`userData_${username}`, JSON.stringify(data));
        }
    },
    addScore(username, module, taskType, result) {
        const userData = this.getUserData(username);
        if (userData) {
            if (!userData.scores[module]) userData.scores[module] = [];
            userData.scores[module].push({ taskType, ...result });
            this.setUserData(username, { scores: userData.scores });
        }
    },
    addMockScore(username, scoreData) {
        const userData = this.getUserData(username);
        if (userData) {
            if (!userData.mockScores) userData.mockScores = [];
            userData.mockScores.push({ ...scoreData, timestamp: new Date().toISOString() });
            this.setUserData(username, { mockScores: userData.mockScores });
        }
    }
};
export default Store;