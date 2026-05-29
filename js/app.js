// Global utility functions and state initialization

const SAMPLE_QUESTIONS = [
    {
        id: 1,
        question: "What is the output of `typeof null` in JavaScript?",
        options: ["'null'", "'object'", "'undefined'", "'boolean'"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Medium"
    },
    {
        id: 2,
        question: "Which of the following is NOT a valid CSS position property value?",
        options: ["static", "relative", "float", "sticky"],
        correctAnswer: 2,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 3,
        question: "What does the `bind()` method do in JavaScript?",
        options: ["Binds an event handler to an element", "Creates a new function that, when called, has its `this` keyword set to the provided value", "Attaches a variable to the global scope", "None of the above"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Hard"
    },
    {
        id: 4,
        question: "In CSS Grid, which property is used to place an item across multiple columns?",
        options: ["grid-column", "grid-area", "grid-span", "Both A and B"],
        correctAnswer: 3,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 5,
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswer: 2,
        category: "Computer Science",
        difficulty: "Hard"
    },
    {
        id: 6,
        question: "Which HTML5 API allows for drawing graphics via JavaScript?",
        options: ["WebGL", "SVG", "Canvas", "WebRTC"],
        correctAnswer: 2,
        category: "HTML5",
        difficulty: "Medium"
    },
    {
        id: 7,
        question: "What does CORS stand for?",
        options: ["Cross-Origin Resource Sharing", "Cross-Object Resource Sharing", "Central-Origin Request System", "Central-Object Response System"],
        correctAnswer: 0,
        category: "Web Security",
        difficulty: "Hard"
    },
    {
        id: 8,
        question: "What is the result of `0.1 + 0.2 === 0.3` in JavaScript?",
        options: ["true", "false", "undefined", "TypeError"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Medium"
    },
    {
        id: 9,
        question: "Which pseudo-class targets the first child of an element ONLY if it is of a specific type?",
        options: [":first-child", ":first-of-type", ":nth-child(1)", ":only-child"],
        correctAnswer: 1,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 10,
        question: "What is event delegation in JavaScript?",
        options: ["Passing an event to a child element", "Creating a custom event", "Attaching a single event listener to a parent element to manage events for its children", "Preventing an event from bubbling up the DOM"],
        correctAnswer: 2,
        category: "JavaScript",
        difficulty: "Hard"
    },
    {
        id: 11,
        question: "Which of the following is a CSS preprocessor?",
        options: ["Sass", "PostCSS", "Babel", "Webpack"],
        correctAnswer: 0,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 12,
        question: "What is a closure in JavaScript?",
        options: ["A way to close browser windows using JS", "A function bundled together with references to its surrounding state", "A block of code that executes immediately", "A method to restrict variable access entirely"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Hard"
    },
    {
        id: 13,
        question: "Which HTTP method is idempotent?",
        options: ["POST", "PATCH", "PUT", "CONNECT"],
        correctAnswer: 2,
        category: "Web Networking",
        difficulty: "Hard"
    },
    {
        id: 14,
        question: "In responsive web design, what does the `em` unit represent?",
        options: ["Viewport width", "Root font size", "Parent element's font size", "Exact millimeters"],
        correctAnswer: 2,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 15,
        question: "What is the purpose of the `Symbol` primitive type in JavaScript?",
        options: ["To format text", "To create unique, immutable identifiers for object properties", "To encode base64 strings", "To represent monetary values"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Hard"
    },
    {
        id: 16,
        question: "How do you optimize CSS rendering performance?",
        options: ["Using deep selectors (e.g., div ul li a)", "Avoiding universal selectors (*)", "Using inline styles exclusively", "Writing all CSS in a single file without imports"],
        correctAnswer: 1,
        category: "CSS",
        difficulty: "Hard"
    },
    {
        id: 17,
        question: "What does the `async` keyword do when placed before a function?",
        options: ["Makes the function execute synchronously", "Forces the function to return a Promise", "Pauses the main thread", "Prevents the function from taking arguments"],
        correctAnswer: 1,
        category: "JavaScript",
        difficulty: "Medium"
    },
    {
        id: 18,
        question: "What is the default value of the `position` property in CSS?",
        options: ["relative", "absolute", "static", "fixed"],
        correctAnswer: 2,
        category: "CSS",
        difficulty: "Medium"
    },
    {
        id: 19,
        question: "Which DOM method is most efficient for creating multiple DOM elements?",
        options: ["innerHTML", "document.createElement() inside a loop", "DocumentFragment", "outerHTML"],
        correctAnswer: 2,
        category: "JavaScript",
        difficulty: "Hard"
    },
    {
        id: 21,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
        correctAnswer: 0,
        category: "HTML",
        difficulty: "Easy"
    },
    {
        id: 22,
        question: "Which CSS property controls the text size?",
        options: ["text-style", "text-size", "font-size", "font-style"],
        correctAnswer: 2,
        category: "CSS",
        difficulty: "Easy"
    },
    {
        id: 23,
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correctAnswer: 3,
        category: "JavaScript",
        difficulty: "Easy"
    },
    {
        id: 24,
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
        correctAnswer: 2,
        category: "HTML",
        difficulty: "Easy"
    },
    {
        id: 25,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        correctAnswer: 2,
        category: "HTML",
        difficulty: "Easy"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize sample questions if local storage is empty
    const savedQuestions = localStorage.getItem('quiz_questions_v3');
    if (!savedQuestions) {
        localStorage.setItem('quiz_questions_v3', JSON.stringify(SAMPLE_QUESTIONS));
    }

    // Setup mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isActive ? '✕' : '☰';
        });
    }

    // Ensure active nav link is highlighted
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle Global Auth State
    const loggedInUser = sessionStorage.getItem('logged_in_user');
    const navAuthItem = document.getElementById('nav-auth-item');
    
    // If not logged in and on a protected page, redirect
    const protectedPages = ['quiz.html', 'result.html'];
    if (!loggedInUser && protectedPages.includes(currentPath)) {
        window.location.href = 'auth.html';
        return;
    }

    if (navAuthItem) {
        if (loggedInUser) {
            navAuthItem.innerHTML = `<a href="#" id="logout-btn" class="nav-link text-danger font-weight-bold">Logout (${loggedInUser})</a>`;
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('logged_in_user');
                sessionStorage.removeItem('current_player');
                window.location.href = 'index.html';
            });
        } else {
            navAuthItem.innerHTML = `<a href="auth.html" class="nav-link ${currentPath === 'auth.html' ? 'active' : ''}">Login</a>`;
        }
    }
});

// Toast notification system
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger reflow to apply transition
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
