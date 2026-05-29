document.addEventListener('DOMContentLoaded', () => {
    const resultData = JSON.parse(sessionStorage.getItem('last_quiz_result'));
    
    if (!resultData) {
        window.location.href = 'index.html';
        return;
    }

    // Populate Data
    document.getElementById('player-greeting').textContent = `Great job, ${resultData.playerName}!`;
    document.getElementById('final-score').textContent = resultData.score;
    document.getElementById('total-score').textContent = `/ ${resultData.totalPoints}`;
    
    const percentage = resultData.totalPoints > 0 ? Math.round((resultData.score / resultData.totalPoints) * 100) : 0;
    document.getElementById('percentage-val').textContent = `${percentage}%`;
    
    document.getElementById('correct-count').textContent = resultData.correctCount;
    document.getElementById('wrong-count').textContent = resultData.totalCount - resultData.correctCount;

    // Performance Message
    const perfMsg = document.getElementById('performance-msg');
    const resultCircle = document.querySelector('.result-circle');
    
    if (percentage >= 80) {
        perfMsg.textContent = 'Excellent Performance! 🌟';
        perfMsg.className = 'mb-6 text-success text-center';
        resultCircle.style.borderColor = 'var(--success-color)';
        createConfetti();
    } else if (percentage >= 50) {
        perfMsg.textContent = 'Good Job! 👍';
        perfMsg.className = 'mb-6 text-primary text-center';
    } else {
        perfMsg.textContent = 'Needs Improvement. Keep trying! 💪';
        perfMsg.className = 'mb-6 text-warning text-center';
        resultCircle.style.borderColor = 'var(--warning-color)';
    }

    // Detailed Review
    const reviewContainer = document.getElementById('detailed-review');
    resultData.details.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `review-item ${item.isCorrect ? 'review-correct' : 'review-incorrect'}`;
        
        let answerHTML = '';
        if (item.isCorrect) {
            answerHTML = `<p class="mt-2 text-success"><strong>Your Answer:</strong> ${item.selected} (+1 points)</p>`;
        } else if (item.isSkipped) {
            answerHTML = `
                <p class="mt-2 text-warning"><strong>Your Answer:</strong> Skipped (0 points)</p>
                <p class="mt-1 text-success"><strong>Correct Answer:</strong> ${item.correct}</p>
            `;
        } else {
            answerHTML = `
                <p class="mt-2 text-danger"><strong>Your Answer:</strong> ${item.selected} (-0.25 points)</p>
                <p class="mt-1 text-success"><strong>Correct Answer:</strong> ${item.correct}</p>
            `;
        }

        div.innerHTML = `
            <h4>Q${index + 1}: ${item.question}</h4>
            ${answerHTML}
        `;
        reviewContainer.appendChild(div);
    });

    function createConfetti() {
        const colors = ['#f43f5e', '#6366f1', '#10b981', '#f59e0b', '#8b5cf6'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
});
