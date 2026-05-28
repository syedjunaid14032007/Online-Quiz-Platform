document.addEventListener('DOMContentLoaded', () => {
    // Check if player name exists
    const playerName = sessionStorage.getItem('current_player');
    if (!playerName) {
        window.location.href = 'about.html';
        return;
    }

    // Load questions from local storage
    const allQuestions = JSON.parse(localStorage.getItem('quiz_questions_v3')) || [];
    if (allQuestions.length === 0) {
        alert("No questions found. Please add questions in the Admin panel.");
        window.location.href = 'index.html';
        return;
    }

    // Shuffle questions for randomness
    let questions = [...allQuestions].sort(() => Math.random() - 0.5);
    // Limit to max 10 questions and shuffle their options
    questions = questions.slice(0, 10).map(q => {
        const clonedQ = JSON.parse(JSON.stringify(q));
        
        // Map options to keep track of the correct one
        const optionsWithOriginal = clonedQ.options.map((opt, i) => ({ opt, isCorrect: i === clonedQ.correctAnswer }));
        
        // Shuffle the options array
        optionsWithOriginal.sort(() => Math.random() - 0.5);
        
        // Re-assign options and correct answer index
        clonedQ.options = optionsWithOriginal.map(o => o.opt);
        clonedQ.correctAnswer = optionsWithOriginal.findIndex(o => o.isCorrect);
        
        return clonedQ;
    });

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let timeLeft = 15;
    let timerInterval;

    // DOM Elements
    const questionCounter = document.getElementById('question-counter');
    const questionCategory = document.getElementById('question-category');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const timeDisplay = document.getElementById('time-left');
    const timerContainer = document.getElementById('timer-display');
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const submitModal = document.getElementById('submit-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelSubmit = document.getElementById('cancel-submit');
    const confirmSubmit = document.getElementById('confirm-submit');

    // Initialize Quiz
    loadQuestion();

    function loadQuestion() {
        clearInterval(timerInterval);
        timeLeft = 15;
        updateTimerDisplay();
        startTimer();

        const q = questions[currentQuestionIndex];
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionCategory.textContent = q.category;
        
        // Update Progress Bar
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        questionText.textContent = q.question;
        
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            
            if (userAnswers[currentQuestionIndex] === index) {
                btn.classList.add('selected');
            }
            
            btn.addEventListener('click', () => selectOption(index, btn));
            optionsContainer.appendChild(btn);
        });

        // Button states
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    function selectOption(index, btnElement) {
        userAnswers[currentQuestionIndex] = index;
        
        // Remove selected class from all
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        // Add to clicked
        btnElement.classList.add('selected');
    }

    function startTimer() {
        timerContainer.classList.remove('timer-warning');
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 5) {
                timerContainer.classList.add('timer-warning');
            }
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timeDisplay.textContent = timeLeft;
    }

    function handleTimeOut() {
        // Auto-move to next or auto-submit
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    // Navigation Events
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    submitBtn.addEventListener('click', () => {
        submitModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => submitModal.classList.remove('show'));
    cancelSubmit.addEventListener('click', () => submitModal.classList.remove('show'));
    
    confirmSubmit.addEventListener('click', () => {
        submitModal.classList.remove('show');
        finishQuiz();
    });

    function finishQuiz() {
        clearInterval(timerInterval);
        
        // Calculate score
        let score = 0;
        let correctAnswers = 0;
        
        const detailedResults = questions.map((q, i) => {
            const isCorrect = userAnswers[i] === q.correctAnswer;
            if (isCorrect) {
                score += 10;
                correctAnswers++;
            }
            return {
                question: q.question,
                selected: userAnswers[i] !== null ? q.options[userAnswers[i]] : null,
                correct: q.options[q.correctAnswer],
                isCorrect: isCorrect
            };
        });

        const finalResult = {
            playerName: playerName,
            score: score,
            totalPoints: questions.length * 10,
            correctCount: correctAnswers,
            totalCount: questions.length,
            details: detailedResults,
            date: new Date().toISOString()
        };

        // Save result
        sessionStorage.setItem('last_quiz_result', JSON.stringify(finalResult));
        
        // Save to leaderboard
        const leaderboard = JSON.parse(localStorage.getItem('quiz_leaderboard')) || [];
        leaderboard.push({
            name: playerName,
            score: score,
            date: finalResult.date
        });
        localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));

        // Redirect
        window.location.href = 'result.html';
    }
});
