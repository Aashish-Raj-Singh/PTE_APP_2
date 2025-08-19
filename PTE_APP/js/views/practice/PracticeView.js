import AbstractView from "../AbstractView.js";
import { Content } from '../../data/Content.js';
import { UI } from "../../core/UI.js";
import Store from "../../core/Store.js";
import Auth from "../../core/Auth.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.module = params.module;
        this.taskType = params.taskType;
        this.taskSet = Content[this.module]?.[this.taskType];
        this.currentTaskIndex = 0;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.timerInterval = null;
        const taskName = this.taskType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        this.setTitle(`Practice: ${taskName}`);
    }

    async render() {
        if (!this.taskSet || this.taskSet.length === 0) {
            return UI.Card("Error", [UI.createElement('p', { textContent: `No practice tasks found for ${this.taskType}.` })]).outerHTML;
        }
        return `<div id="practice-container" class="practice-container"></div>`;
    }

    async after_render() {
        if (!this.taskSet || this.taskSet.length === 0) return;
        this.renderCurrentTask();
    }

    renderCurrentTask() {
        clearInterval(this.timerInterval);
        const container = document.getElementById('practice-container');
        if (this.currentTaskIndex >= this.taskSet.length) {
            container.innerHTML = UI.Card("Practice Complete", [
                UI.createElement('p', { textContent: 'You have completed all available tasks for this set.' }),
                UI.createElement('a', { href: '#/practice-material', textContent: 'Back to Practice List', className: 'btn btn-primary' })
            ]).outerHTML;
            return;
        }
        const taskData = this.taskSet[this.currentTaskIndex];
        container.innerHTML = this.getTaskHTML(taskData);
        this.attachTaskListeners(taskData);
    }

    getTaskHTML(taskData) {
        let interactionHTML = '';
        const taskName = this.taskType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        const timerDurations = { describeImage: 25, readAloud: 35, answerShortQuestion: 10 };
        const timerDuration = timerDurations[this.taskType] || null;

        const timerHTML = timerDuration ? `
            <div id="timer-container" class="timer-clock d-none">
                <svg class="timer-clock-svg"><circle class="timer-circle-bg" cx="50" cy="50" r="45"></circle><circle class="timer-circle-fg" cx="50" cy="50" r="45"></circle></svg>
                <span id="timer-text" class="timer-text">${timerDuration}</span>
            </div>` : '';
        
        switch (this.taskType) {
            case 'readAloud':
                interactionHTML = `<div class="describe-image-layout"><p class="question-text">${taskData.text}</p>${timerHTML}</div>`;
                break;
            case 'describeImage':
                interactionHTML = `<div class="describe-image-layout"><img src="${taskData.image}" class="practice-image">${timerHTML}</div>`;
                break;
            case 'answerShortQuestion':
                interactionHTML = `<div class="describe-image-layout"><audio controls src="${taskData.audio}"></audio><p>${taskData.prompt || ''}</p>${timerHTML}</div>`;
                break;
            case 'repeatSentence':
            case 'retellLecture':
                 interactionHTML = `<audio controls src="${taskData.audio}"></audio><p>${taskData.prompt || ''}</p>`;
                 break;
            case 'summarizeText':
                interactionHTML = `<p class="question-text">${taskData.text}</p><textarea id="writing-input" class="form-group" style="min-height: 150px;" placeholder="Your summary..."></textarea><div id="word-count">0 words</div>`;
                break;
            case 'writeEssay':
                interactionHTML = `<h4>${taskData.prompt}</h4><textarea id="writing-input" class="form-group" style="min-height: 250px;" placeholder="Your essay..."></textarea><div id="word-count">0 words</div>`;
                break;
            case 'multipleChoiceSingle': 
                interactionHTML = `<p class="question-text">${taskData.text}</p><h4>${taskData.question}</h4><form id="practice-form">${taskData.options.map((opt, i) => `<div><input type="radio" name="mcq" value="${opt}" id="opt${i}"><label for="opt${i}" style="margin-left: 0.5rem;">${opt}</label></div>`).join('')}</form>`; 
                break;
            case 'multipleChoiceMultiple':
                interactionHTML = `<p class="question-text">${taskData.text}</p><h4>${taskData.question}</h4><form id="practice-form">${taskData.options.map((opt, i) => `<div><input type="checkbox" name="mcq" value="${opt}" id="opt${i}"><label for="opt${i}" style="margin-left: 0.5rem;">${opt}</label></div>`).join('')}</form>`;
                break;
            case 'reorderParagraphs':
                const items = taskData.paragraphs.map((p, i) => `<div class="reorder-item" draggable="true" data-id="${i}">${p}</div>`).join('');
                interactionHTML = `<p>Drag the paragraphs from the left box to the right box in the correct order.</p><div class="reorder-container" style="display:flex; gap: 1rem;"><div class="reorder-source" style="width:50%; border:1px dashed #ccc; padding:1rem; min-height:150px;">${items}</div><div class="reorder-target" style="width:50%; border:1px dashed #ccc; padding:1rem; min-height:150px;"></div></div>`;
                break;
            case 'readingFillInBlanks':
            case 'readingWritingFillInBlanks':
                let textWithBlanks = taskData.text;
                taskData.options.forEach((optSet) => {
                    textWithBlanks = textWithBlanks.replace('___', `<select class="blank-select" style="margin:0 5px; padding: 5px; border-radius: 5px; border: 1px solid #ccc;"><option value="">Select</option>${optSet.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`);
                });
                interactionHTML = `<div class="question-text" style="font-size: 1.2rem; line-height: 2;">${textWithBlanks}</div>`;
                break;
            case 'summarizeSpokenText':
            case 'writeFromDictation':
            case 'listeningFillInBlanks':
                 interactionHTML = `<audio controls src="${taskData.audio}"></audio><textarea id="writing-input" class="form-group" style="width:100%; margin-top:1rem; min-height:100px;" placeholder="Your answer..."></textarea>`;
                 break;
            default: interactionHTML = `<p>This task type (${taskName}) is not yet implemented in the practice view.</p>`;
        }
        
        return `
            <div class="instruction-panel"><h3>${taskName} (${this.currentTaskIndex + 1}/${this.taskSet.length})</h3><p>${taskData.instruction || 'Follow the instructions and submit your answer.'}</p></div>
            <div class="interaction-panel">
                ${interactionHTML}
                <div id="status-bar" class="status-bar d-none"></div>
                <div class="controls" style="margin-top: 1.5rem; display:flex; gap:1rem; justify-content:center;">
                    ${this.module === 'speaking' ? '<button id="record-btn" class="btn btn-danger">Start Recording</button>' : ''}
                    <button id="submit-btn" class="btn btn-success">Submit & Next</button>
                </div>
            </div>`;
    }

    attachTaskListeners(taskData) {
        document.getElementById('submit-btn').onclick = () => this.handleSubmit(taskData);
        
        if (this.module === 'speaking') {
            const recordBtn = document.getElementById('record-btn');
            const timerDurations = { describeImage: 25, readAloud: 35, answerShortQuestion: 10 };
            const duration = timerDurations[this.taskType];
            if (duration) {
                recordBtn.onclick = () => this.startTimedRecording(duration);
            } else {
                recordBtn.onclick = () => this.toggleRecording(recordBtn); // Regular, non-timed recording
            }
        }
        
        if (this.taskType === 'summarizeText' || this.taskType === 'writeEssay') {
            document.getElementById('writing-input').oninput = e => {
                const count = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                document.getElementById('word-count').textContent = `${count} words`;
            };
        }
        if (this.taskType === 'reorderParagraphs') this.initDragAndDrop();
    }
    
    startTimedRecording(duration) {
        const recordBtn = document.getElementById('record-btn');
        recordBtn.disabled = true;
        this.toggleRecording(null, true); // Start recording
        const timerContainer = document.getElementById('timer-container');
        const timerText = document.getElementById('timer-text');
        const timerCircle = document.querySelector('.timer-circle-fg');
        const circumference = 2 * Math.PI * 45;
        timerCircle.style.strokeDasharray = circumference;
        timerContainer.classList.remove('d-none');
        let timeLeft = duration;
        timerText.textContent = timeLeft;
        this.timerInterval = setInterval(() => {
            timeLeft--;
            timerText.textContent = timeLeft;
            const progress = timeLeft / duration;
            timerCircle.style.strokeDashoffset = circumference * (1 - progress);
            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.toggleRecording(null, false); // Stop recording
                recordBtn.textContent = 'Finished';
            }
        }, 1000);
    }
    
    async toggleRecording(recordBtn, forceStart = null) {
        const statusBar = document.getElementById('status-bar');
        const isRecording = this.mediaRecorder && this.mediaRecorder.state === "recording";
        const start = forceStart === null ? !isRecording : forceStart;

        if (!start && isRecording) {
            this.mediaRecorder.stop();
            if(recordBtn) {
                recordBtn.textContent = 'Start Recording';
                recordBtn.classList.remove('btn-warning');
                recordBtn.classList.add('btn-danger');
            }
            statusBar.textContent = 'Recording Finished.';
            statusBar.className = 'status-bar finished';
        } else if (start) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];
                this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data);
                this.mediaRecorder.onstop = () => { stream.getTracks().forEach(track => track.stop()); };
                this.mediaRecorder.start();
                if(recordBtn) {
                    recordBtn.textContent = 'Stop Recording';
                    recordBtn.classList.remove('btn-danger');
                    recordBtn.classList.add('btn-warning');
                }
                statusBar.textContent = 'Recording...';
                statusBar.className = 'status-bar recording';
                statusBar.classList.remove('d-none');
            } catch (err) { statusBar.textContent = 'Microphone access denied. Please enable it in your browser settings.'; }
        }
    }

    initDragAndDrop() {
        document.querySelectorAll('.reorder-item').forEach(item => {
            item.addEventListener('dragstart', () => item.classList.add('dragging'));
            item.addEventListener('dragend', () => item.classList.remove('dragging'));
        });
        document.querySelectorAll('.reorder-source, .reorder-target').forEach(container => {
            container.addEventListener('dragover', e => { e.preventDefault(); });
            container.addEventListener('drop', e => {
                e.preventDefault();
                const dragging = document.querySelector('.dragging');
                if (dragging) container.appendChild(dragging);
            });
        });
    }

    handleSubmit(taskData) {
        clearInterval(this.timerInterval);
        let score = 0, maxScore = 0, details = 'Task completed.';
        
        // --- SCORING LOGIC ---
        if (this.taskType === 'multipleChoiceSingle') {
            const selected = document.querySelector('input[name="mcq"]:checked');
            maxScore = 1;
            if (selected) {
                score = selected.value === taskData.correctAnswer ? 1 : 0;
                details = `Your answer: ${selected.value}. Correct: ${taskData.correctAnswer}`;
            } else {
                details = `No answer selected. Correct: ${taskData.correctAnswer}`;
            }
        } else if (this.taskType === 'multipleChoiceMultiple') {
            const selected = [...document.querySelectorAll('input[name="mcq"]:checked')].map(cb => cb.value);
            maxScore = taskData.correctAnswers.length;
            score = selected.filter(answer => taskData.correctAnswers.includes(answer)).length;
            details = `Your answers: ${selected.join(', ')}. Correct: ${taskData.correctAnswers.join(', ')}`;
        } else if (this.taskType === 'reorderParagraphs') {
            const userOrder = [...document.querySelector('.reorder-target').children].map(child => parseInt(child.dataset.id));
            maxScore = taskData.correctOrder.length - 1;
            score = 0;
            for(let i = 0; i < userOrder.length - 1; i++) {
                const userPair = [userOrder[i], userOrder[i+1]].toString();
                for (let j = 0; j < taskData.correctOrder.length - 1; j++) {
                    const correctPair = [taskData.correctOrder[j], taskData.correctOrder[j+1]].toString();
                    if (userPair === correctPair) score++;
                }
            }
            details = `Your order provided. Scored ${score}/${maxScore} correct pairs.`;
        } else if (this.taskType === 'readingFillInBlanks' || this.taskType === 'readingWritingFillInBlanks') {
            const userSelections = [...document.querySelectorAll('.blank-select')].map(s => s.value);
            const correctAnswers = Array.isArray(taskData.correctAnswer) ? taskData.correctAnswer : [taskData.correctAnswer];
            maxScore = correctAnswers.length;
            score = 0;
            userSelections.forEach((answer, index) => {
                if (answer === correctAnswers[index]) {
                    score++;
                }
            });
            details = `You scored ${score}/${maxScore}.`;
        }

        Store.addScore(Auth.getCurrentUser(), this.module, this.taskType, { taskId: taskData.id, score, maxScore, details, timestamp: new Date().toISOString() });
        this.currentTaskIndex++;
        this.renderCurrentTask();
    }
}