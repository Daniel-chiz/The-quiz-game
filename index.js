window.onload = function() {
    // Array of quiz questions
    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 3
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Jupiter", "Mars", "Venus", "Saturn"],
            correctAnswer: 1
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical symbol for water?",
            answers: ["H2O", "CO2", "NaCl", "O2"],
            correctAnswer: 0
        }
    ];

    // DOM elements
    const questionTextElement = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const quizScreen = document.getElementById('quiz-screen');
    const scoreScreen = document.getElementById('score-screen');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');

    // Game state variables
    let currentQuestionIndex = 0;
    let score = 0;

    // Start game
    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        quizScreen.style.display = 'block';
        scoreScreen.style.display = 'none';
        showQuestion();
    }

    // current question
    function showQuestion() {
        // Reset the state for the new question
        resetState();
        
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionTextElement.innerHTML = questionNo + ". " + currentQuestion.question;

        // buttons for answers
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerHTML = answer;
            button.classList.add('btn', 'btn-outline-primary', 'btn-answer');
            answerButtonsElement.appendChild(button);

            // Event listener to check the answer when clicked
            button.addEventListener('click', () => selectAnswer(index, currentQuestion.correctAnswer));
        });
    }

    // Reset the UI before showing a new question
    function resetState() {
        nextButton.disabled = true; // Disable the next button
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    // Answer selection
    function selectAnswer(selectedIndex, correctIndex) {
        // Disable all answer buttons after a selection is made
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        });

        const selectedButton = answerButtonsElement.children[selectedIndex];
        
        // Check if the selected answer is correct
        if (selectedIndex === correctIndex) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Also show the correct answer
            const correctButton = answerButtonsElement.children[correctIndex];
            correctButton.classList.add('correct');
        }
        
        nextButton.disabled = false; // Enable the next button
    }

    // Move to the next question or end the game
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });

    // Show final score screen
    function showScore() {
        quizScreen.style.display = 'none';
        scoreScreen.style.display = 'block';
        finalScoreElement.innerHTML = score;
        totalQuestionsElement.innerHTML = questions.length;
    }
    
    // Restart the game
    restartButton.addEventListener('click', startGame);

    // Initial call to start the game
    startGame();
};