document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('leaderboard-body');
    const noDataMsg = document.getElementById('no-data-msg');

    let leaderboard = JSON.parse(localStorage.getItem('quiz_leaderboard')) || [];

    // Optional: Add some dummy data if empty for demonstration purposes
    if (leaderboard.length === 0) {
        leaderboard = [
            { name: "Alice", score: 90, date: new Date(Date.now() - 86400000).toISOString() },
            { name: "Bob", score: 70, date: new Date(Date.now() - 172800000).toISOString() },
            { name: "Charlie", score: 100, date: new Date(Date.now() - 43200000).toISOString() }
        ];
        localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));
    }

    if (leaderboard.length === 0) {
        noDataMsg.classList.remove('hidden');
        return;
    }

    // Sort by score descending
    leaderboard.sort((a, b) => b.score - a.score);

    // Render table
    leaderboard.forEach((entry, index) => {
        const tr = document.createElement('tr');
        
        // Rank formatting
        let rankHtml = `${index + 1}`;
        if (index === 0) rankHtml = `<span class="rank-1">🥇 1</span>`;
        else if (index === 1) rankHtml = `<span class="rank-2">🥈 2</span>`;
        else if (index === 2) rankHtml = `<span class="rank-3">🥉 3</span>`;

        // Date formatting
        const dateObj = new Date(entry.date);
        const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

        tr.innerHTML = `
            <td>${rankHtml}</td>
            <td style="font-weight: 500;">${entry.name}</td>
            <td class="text-secondary">${dateStr}</td>
            <td style="text-align: right; font-weight: 700; color: var(--primary-color);">${entry.score}</td>
        `;
        
        tbody.appendChild(tr);
    });
});
