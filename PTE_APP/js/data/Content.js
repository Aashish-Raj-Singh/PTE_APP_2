export const Content = {
    // Prediction and Mock Test stubs for future implementation
    predictions: {
        title: "August 2025 Prediction File",
        introduction: "Based on recent exam trends, these question types and topics have a high probability of appearing this month. Focus your practice on these areas.",
        sections: [
            { title: "Speaking: High-Frequency Topics", items: ["Impact of technology on society.", "Environmental issues and solutions.", "The importance of education."] },
            { title: "Writing: Common Essay Prompts", items: ["Advantages/disadvantages of online vs. traditional learning.", "Should governments fund arts or practical sciences more?", "The role of advertising in modern society."] },
        ]
    },
    mockTest: {
        structure: [
            // Defines a short mock test structure. Can be expanded.
            { module: 'speaking', taskType: 'readAloud', count: 2 },
            { module: 'writing', taskType: 'summarizeText', count: 1 },
            { module: 'reading', taskType: 'multipleChoiceMultiple', count: 1 },
            { module: 'listening', taskType: 'writeFromDictation', count: 2 }
        ]
    },
    videos: [
        { title: "PTE Write From Dictation - Live Practice", tutor: "Language Academy PTE", youtubeId: "Ube-vG_4s3w", thumbnailUrl: "assets/images/video1.jpg" },
        { title: "PTE Retell Lecture - High Score Strategy", tutor: "PTE Academic Official", youtubeId: "R8bb66hC-dI", thumbnailUrl: "assets/images/video2.jpg" },
        { title: "Describe Image - Full Scoring Explained", tutor: "E2 PTE", youtubeId: "mJTPAp_a_Jg", thumbnailUrl: "assets/images/video3.jpg" },
        { title: "PTE Reading: Fill in the Blanks Strategy", tutor: "PTE Gold", youtubeId: "F_O7m2Zl26c", thumbnailUrl: "assets/images/video4.jpg" },
    ],
    speaking: {
        readAloud: [
            { id: 1, text: "The university's main library provides a quiet and resourceful environment for students to focus on their academic pursuits and research." },
            { id: 2, text: "Technological advancements in communication have fundamentally altered the way people interact in both their personal and professional lives." },
            { id: 3, text: "Economic globalization has led to a more interconnected world, but it also raises important questions about labor standards and environmental protection." },
            { id: 4, text: "Regular physical exercise is crucial for maintaining not only physical health but also for improving mental well-being and reducing stress." },
            { id: 5, text: "The study of history offers valuable insights into the patterns of human behavior and the development of societies across different eras." },
            { id: 6, text: "Sustainable agriculture aims to meet society's current food needs without compromising the ability of future generations to meet their own." },
            { id: 7, text: "Urban planning is essential for managing the growth of cities and ensuring they are functional, livable, and environmentally friendly." },
            { id: 8, text: "Climate change is a complex global issue that requires international cooperation and immediate action to mitigate its long-term effects." },
            { id: 9, text: "Access to quality education is a fundamental right and a key driver of social mobility and economic development for any nation." },
            { id: 10, text: "The art of effective public speaking involves clarity, confidence, and the ability to engage and persuade an audience with a compelling message." }
        ],
        repeatSentence: [
            { id: 1, audio: "assets/audio/rs1.mp3", text: "The next lecture will begin promptly at nine o'clock." },
            { id: 2, audio: "assets/audio/rs2.mp3", text: "Please remember to bring your assignment to the next class." },
            { id: 3, audio: "assets/audio/rs3.mp3", text: "The library is located on the other side of the campus." },
            { id: 4, audio: "assets/audio/rs4.mp3", text: "You will find the economic section on the second floor of the library." },
            { id: 5, audio: "assets/audio/rs5.mp3", text: "The research was funded by a grant from the national science foundation." },
        ],
        describeImage: [
            { id: 1, image: "assets/images/practice/describe-image/dimage1.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 2, image: "assets/images/practice/describe-image/dimage2.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 3, image: "assets/images/practice/describe-image/dimage3.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 4, image: "assets/images/practice/describe-image/dimage4.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 5, image: "assets/images/practice/describe-image/dimage5.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 6, image: "assets/images/practice/describe-image/dimage6.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 7, image: "assets/images/practice/describe-image/dimage7.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 8, image: "assets/images/practice/describe-image/dimage8.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 9, image: "assets/images/practice/describe-image/dimage9.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." },
            { id: 10, image: "assets/images/practice/describe-image/dimage10.jpeg", instruction: "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing." }
        ],
        retellLecture: [
            { id: 1, audio: "assets/audio/rl1.mp3", prompt: "You will hear a lecture. After the lecture, in 10 seconds, please retell what you have just heard." },
            { id: 2, audio: "assets/audio/rl2.mp3", prompt: "You will hear a lecture. After the lecture, in 10 seconds, please retell what you have just heard." },
        ],
        answerShortQuestion: [
            { id: 1, audio: "assets/audio/asq1.mp3", prompt: "What device do you use to look at faraway stars?", correctAnswer: "A telescope" },
            { id: 2, audio: "assets/audio/asq2.mp3", prompt: "What do you call a book containing maps?", correctAnswer: "An atlas" },
            { id: 3, audio: "assets/audio/asq3.mp3", prompt: "What is the opposite of 'export'?", correctAnswer: "Import" },
            { id: 4, audio: "assets/audio/asq4.mp3", prompt: "How many months are in a year?", correctAnswer: "Twelve" },
            { id: 5, audio: "assets/audio/asq5.mp3", prompt: "What is the term for a period of ten years?", correctAnswer: "A decade" },
            { id: 6, audio: "assets/audio/asq6.mp3", prompt: "Which planet is known as the Red Planet?", correctAnswer: "Mars" },
            { id: 7, audio: "assets/audio/asq7.mp3", prompt: "What is the process by which plants make their own food?", correctAnswer: "Photosynthesis" },
            { id: 8, audio: "assets/audio/asq8.mp3", prompt: "If an event happens once every two years, what is it called?", correctAnswer: "Biennial" },
            { id: 9, audio: "assets/audio/asq9.mp3", prompt: "What is the primary gas that we breathe in from the atmosphere?", correctAnswer: "Nitrogen" },
            { id: 10, audio: "assets/audio/asq10.mp3", prompt: "In which direction does the sun rise?", correctAnswer: "East" }
        ],
    },
    writing: {
        summarizeText: [
            { id: 1, text: "The concept of 'rewilding', the mass restoration of ecosystems, is gaining popularity. Proponents argue that it can restore biodiversity and combat climate change. However, critics raise concerns about its impact on existing agricultural communities. A balanced approach is crucial." },
            { id: 2, text: "Artificial intelligence (AI) is rapidly evolving from a niche technology into a general-purpose tool. In medicine, AI algorithms can analyze medical images with a precision that sometimes surpasses human experts. Despite its benefits, the proliferation of AI raises significant ethical questions regarding bias, job displacement, and autonomous systems, requiring careful consideration." }
        ],
        writeEssay: [
            { id: 1, prompt: "Do the advantages of the internet outweigh the disadvantages? Support your point of view with reasons and/or examples from your own experience." },
            { id: 2, prompt: "Some people believe that success in life comes from taking risks or chances. Others believe that success results from careful planning. In your opinion, what does success come from?" }
        ],
    },
    reading: {
        multipleChoiceSingle: [
            { id: 1, text: "The hippocampus is a major component of the brains of humans and other vertebrates. It plays important roles in the consolidation of information from short-term memory to long-term memory, and in spatial memory that enables navigation.", question: "What is a primary function of the hippocampus?", options: ["Controlling motor skills", "Processing visual information", "Regulating emotions", "Consolidating memory"], correctAnswer: "Consolidating memory" },
            { id: 2, text: "The sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, and its diameter is about 109 times that of Earth.", question: "How large is the sun's diameter compared to Earth's?", options: ["50 times larger", "109 times larger", "200 times larger"], correctAnswer: "109 times larger" }
        ],
        multipleChoiceMultiple: [
            { id: 1, text: "Echolocation, also called bio sonar, is used by several animal species, including bats and dolphins. They use these echoes to locate and identify objects for navigation and hunting.", question: "Which of the following statements about echolocation are true?", options: ["It is used exclusively for hunting.", "It helps animals navigate.", "Only flying mammals use it.", "Dolphins are known to use it."], correctAnswers: ["It helps animals navigate.", "Dolphins are known to use it."] }
        ],
        reorderParagraphs: [
            { id: 1, paragraphs: ["This approach, however, ignores that emotions are key to human intelligence.", "The result is products that are logical but lack emotional connection.", "Traditionally, designers focused on cognitive aspects of user experience.", "Therefore, successful design must consider both cognitive and emotional responses."], correctOrder: [2, 1, 0, 3] },
            { id: 2, paragraphs: ["They use this to make informed decisions about crop rotation.", "For example, satellite imagery gives farmers detailed data on soil health.", "This integration is leading to 'precision agriculture'.", "Modern agriculture relies on advanced technology to boost efficiency."], correctOrder: [3, 1, 0, 2] }
        ],
        readingFillInBlanks: [
            { id: 1, text: "The ancient city of Rome was not built in a ___. Its development was a gradual process, evolving over centuries. Its engineers were renowned for their innovative construction ___, including the use of arches and concrete.", options: [["day", "week", "month"], ["materials", "techniques", "designs"]], correctAnswer: ["day", "techniques"] },
        ],
        readingWritingFillInBlanks: [
            { id: 1, text: "The Industrial Revolution marked a major ___ point in history, as it ___ the transition from agrarian societies to industrial economies. This shift had profound ___ on social structures and daily life.", options: [["turning", "stopping"], ["delayed", "initiated"], ["effects", "causes"]], correctAnswer: ["turning", "initiated", "effects"] }
        ],
    },
    listening: {
        summarizeSpokenText: [
            { id: 1, audio: "assets/audio/sst1.mp3", transcript: "A lecture on the importance of bees as pollinators and the threat of colony collapse disorder." },
            { id: 2, audio: "assets/audio/sst2.mp3", transcript: "A discussion about the psychological concept of cognitive dissonance." }
        ],
        mcqSingleAnswer: [
            { id: 1, audio: "assets/audio/l_mcqs1.mp3", question: "What is the main topic of the lecture?", options: ["History of Art", "The physics of light"], correctAnswer: "The physics of light" }
        ],
        mcqMultipleAnswer: [
            { id: 1, audio: "assets/audio/l_mcqm1.mp3", question: "Which two subjects are mentioned as being impacted by the new discovery?", options: ["Geology", "Biology", "Chemistry"], correctAnswers: ["Biology", "Chemistry"] }
        ],
        listeningFillInBlanks: [
            { id: 1, audio: "assets/audio/l_fib1.mp3", transcript: "Today's lecture on urban ___ will cover transportation and ___ services." }
        ],
        highlightCorrectSummary: [
            { id: 1, audio: "assets/audio/l_hcs1.mp3", summaries: ["The speaker argues that a carbon tax is the most effective solution.", "The speaker suggests that a carbon tax has both pros and cons that need to be considered."] }
        ],
        selectMissingWord: [
            { id: 1, audio: "assets/audio/l_smw1.mp3", transcript: "The study concluded with a surprising..." }
        ],
        highlightIncorrectWord: [
            { id: 1, audio: "assets/audio/l_hiw1.mp3", transcript: "The university's large library houses an extensive collection of books and journals." }
        ],
        writeFromDictation: [
            { id: 1, audio: "assets/audio/l_wfd1.mp3", transcript: "The examination will take place in the main lecture hall." },
            { id: 2, audio: "assets/audio/l_wfd2.mp3", transcript: "Students are required to attend all the tutorials." }
        ],
    }
};