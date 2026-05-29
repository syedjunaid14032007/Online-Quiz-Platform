document.addEventListener('DOMContentLoaded', () => {
    const questionsListContainer = document.getElementById('questions-list');
    const formContainer = document.getElementById('question-form-container');
    const mainListContainer = document.getElementById('questions-list-container');
    const questionForm = document.getElementById('question-form');
    const addNewBtn = document.getElementById('add-new-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const formTitle = document.getElementById('form-title');
    const searchInput = document.getElementById('search-questions');
    
    let questions = JSON.parse(localStorage.getItem('quiz_questions_v3')) || [];

    function renderQuestions(filter = '') {
        questionsListContainer.innerHTML = '';
        
        const filtered = questions.filter(q => 
            q.question.toLowerCase().includes(filter.toLowerCase()) || 
            q.category.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filtered.length === 0) {
            questionsListContainer.innerHTML = '<p class="text-tertiary text-center p-4">No questions found.</p>';
            return;
        }
        
        filtered.forEach((q, index) => {
            const div = document.createElement('div');
            div.className = 'question-item flex justify-between items-center';
            div.innerHTML = `
                <div>
                    <h4 class="mb-1">${q.question}</h4>
                    <div class="flex gap-2">
                        <span class="badge badge-primary">${q.category}</span>
                        <span class="badge ${q.difficulty === 'Easy' ? 'badge-success' : q.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}">${q.difficulty}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-secondary btn-icon edit-btn" data-id="${q.id}">✏️</button>
                    <button class="btn btn-danger btn-icon delete-btn" data-id="${q.id}">🗑️</button>
                </div>
            `;
            questionsListContainer.appendChild(div);
        });

        // Attach event listeners to buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => editQuestion(parseInt(e.currentTarget.getAttribute('data-id'))));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => deleteQuestion(parseInt(e.currentTarget.getAttribute('data-id'))));
        });
    }

    function toggleForm(show, title = 'Add Question') {
        if (show) {
            formContainer.classList.remove('hidden');
            mainListContainer.style.gridColumn = '2 / -1';
            formTitle.textContent = title;
            // responsive reset
            if(window.innerWidth <= 992) {
                 mainListContainer.style.gridColumn = '1 / -1';
                 formContainer.scrollIntoView({behavior: 'smooth'});
            }
        } else {
            formContainer.classList.add('hidden');
            mainListContainer.style.gridColumn = '1 / -1';
            questionForm.reset();
            document.getElementById('q-id').value = '';
        }
    }

    addNewBtn.addEventListener('click', () => {
        toggleForm(true, 'Add New Question');
    });

    cancelFormBtn.addEventListener('click', () => {
        toggleForm(false);
    });

    searchInput.addEventListener('input', (e) => {
        renderQuestions(e.target.value);
    });

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const idInput = document.getElementById('q-id').value;
        const newQuestion = {
            id: idInput ? parseInt(idInput) : Date.now(),
            question: document.getElementById('q-text').value,
            options: [
                document.getElementById('q-opt1').value,
                document.getElementById('q-opt2').value,
                document.getElementById('q-opt3').value,
                document.getElementById('q-opt4').value
            ],
            correctAnswer: parseInt(document.getElementById('q-correct').value) - 1,
            category: document.getElementById('q-category').value,
            difficulty: document.getElementById('q-difficulty').value
        };

        if (idInput) {
            const index = questions.findIndex(q => q.id === parseInt(idInput));
            if (index !== -1) questions[index] = newQuestion;
            showToast('Question updated successfully!');
        } else {
            questions.push(newQuestion);
            showToast('Question added successfully!');
        }

        localStorage.setItem('quiz_questions_v3', JSON.stringify(questions));
        toggleForm(false);
        renderQuestions(searchInput.value);
    });

    function editQuestion(id) {
        const q = questions.find(q => q.id === id);
        if (!q) return;
        
        document.getElementById('q-id').value = q.id;
        document.getElementById('q-text').value = q.question;
        document.getElementById('q-opt1').value = q.options[0];
        document.getElementById('q-opt2').value = q.options[1];
        document.getElementById('q-opt3').value = q.options[2];
        document.getElementById('q-opt4').value = q.options[3];
        document.getElementById('q-correct').value = q.correctAnswer + 1;
        document.getElementById('q-category').value = q.category;
        document.getElementById('q-difficulty').value = q.difficulty;
        
        toggleForm(true, 'Edit Question');
    }

    function deleteQuestion(id) {
        if (confirm('Are you sure you want to delete this question?')) {
            questions = questions.filter(q => q.id !== id);
            localStorage.setItem('quiz_questions_v3', JSON.stringify(questions));
            renderQuestions(searchInput.value);
            showToast('Question deleted!', 'danger');
        }
    }

    const demoDataBtn = document.getElementById('demo-data-btn');
    if (demoDataBtn) {
        demoDataBtn.addEventListener('click', () => {
            if (confirm('Load perfect demo data? This will overwrite the leaderboard.')) {
                const demoLeaderboard = [
                    { name: "Recruiter A", score: 100, date: new Date().toISOString() },
                    { name: "Senior Engineer", score: 90, date: new Date(Date.now() - 3600000).toISOString() },
                    { name: "Intern Candidate", score: 80, date: new Date(Date.now() - 86400000).toISOString() }
                ];
                localStorage.setItem('quiz_leaderboard', JSON.stringify(demoLeaderboard));
                
                // Force reload of questions from SAMPLE_QUESTIONS
                localStorage.removeItem('quiz_questions_v3');
                
                showToast('Demo data loaded! Refreshing...', 'success');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    // --- Tabs Logic ---
    const tabQuestions = document.getElementById('tab-questions');
    const tabAnalytics = document.getElementById('tab-analytics');
    const questionsSection = document.getElementById('questions-section');
    const analyticsSection = document.getElementById('analytics-section');

    if (tabQuestions && tabAnalytics) {
        tabQuestions.addEventListener('click', () => {
            tabQuestions.classList.replace('btn-secondary', 'btn-primary');
            tabAnalytics.classList.replace('btn-primary', 'btn-secondary');
            questionsSection.classList.remove('hidden');
            analyticsSection.classList.add('hidden');
        });

        tabAnalytics.addEventListener('click', () => {
            tabAnalytics.classList.replace('btn-secondary', 'btn-primary');
            tabQuestions.classList.replace('btn-primary', 'btn-secondary');
            analyticsSection.classList.remove('hidden');
            questionsSection.classList.add('hidden');
            renderAnalytics();
        });
    }

    // --- Bulk Upload Logic ---
    const bulkUploadInput = document.getElementById('bulk-upload');
    if (bulkUploadInput) {
        bulkUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedQuestions = JSON.parse(event.target.result);
                    if (!Array.isArray(importedQuestions)) throw new Error("File must contain an array of questions.");
                    
                    // Simple validation
                    const validQuestions = importedQuestions.filter(q => q.question && q.options && q.options.length === 4);
                    
                    // Assign new IDs
                    let maxId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) : 0;
                    validQuestions.forEach(q => {
                        maxId++;
                        q.id = maxId;
                        questions.push(q);
                    });

                    localStorage.setItem('quiz_questions_v3', JSON.stringify(questions));
                    renderQuestions(searchInput.value);
                    showToast(`Successfully imported ${validQuestions.length} questions!`, 'success');
                } catch (error) {
                    showToast('Invalid JSON file format.', 'danger');
                }
                // Reset input
                bulkUploadInput.value = '';
            };
            reader.readAsText(file);
        });
    }

    // --- Analytics Logic ---
    function renderAnalytics() {
        const users = JSON.parse(localStorage.getItem('quiz_users')) || [];
        const allResults = JSON.parse(localStorage.getItem('quiz_all_results')) || [];

        document.getElementById('stat-users').textContent = users.length;
        document.getElementById('stat-quizzes').textContent = allResults.length;

        if (allResults.length > 0) {
            const totalScorePercents = allResults.reduce((acc, curr) => {
                const perc = curr.totalPoints > 0 ? (curr.score / curr.totalPoints) * 100 : 0;
                return acc + perc;
            }, 0);
            const avg = Math.round(totalScorePercents / allResults.length);
            document.getElementById('stat-score').textContent = `${avg}%`;
        } else {
            document.getElementById('stat-score').textContent = `0%`;
        }
    }

    // Initial render
    renderQuestions();
});
