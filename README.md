# 🏆 Online Quiz & Assessment Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-success?style=for-the-badge)](#)

A polished, fully responsive, and highly interactive Single Page Application (SPA) built entirely with Vanilla web technologies. It is designed to administer timed multiple-choice quizzes, provide detailed analytics, and maintain a competitive leaderboard—all without a backend server.

---

## 🎯 Project Overview & Objective

This project was built to demonstrate proficiency in core frontend engineering principles, avoiding the abstraction of bloated frameworks. The objective is to deliver a production-ready application that emphasizes:
- **Clean Architecture:** Modular JavaScript logic and semantic HTML5.
- **Flawless UI/UX:** A bespoke CSS variables-driven design system utilizing modern "Glassmorphism" aesthetics.
- **Accessibility & Edge Cases:** Focus states, robust data validation, and memory leak prevention (e.g., timer cleanup).
- **Responsive Design:** A mobile-first layout with smooth CSS transitions.

## 🚀 Core Features

- **Dynamic Quiz Engine:** 
  - Randomizes the subset of questions per user.
  - Dynamically shuffles the multiple-choice options per question to prevent answer memorization.
  - 15-second auto-submitting timer per question.
- **Instant Result Analytics:** Detailed breakdown of performance, percentage calculations, and custom feedback (including CSS-animated confetti for high scores!).
- **Global Leaderboard:** Ranks top players based on score, utilizing the `localStorage` API.
- **Admin Dashboard:** Full CRUD operations allowing administrators to add, edit, and delete questions securely.
- **Theme Switcher:** Persistent Dark/Light mode utilizing CSS custom properties.

## 🏗️ Architecture & Design Decisions

- **Why Vanilla JS?** To showcase a deep understanding of DOM manipulation, the `window.localStorage` API, and event delegation without relying on React or Vue. 
- **CSS Design System:** No Tailwind or Bootstrap. Uses a custom `:root` variable system for easy theming, coupled with modern Flexbox and CSS Grid.
- **State Management:** All state (current question, timer, options selected) is handled via clean modular functions in `quiz.js` and synced efficiently to the DOM.

## 📂 Project Structure

```text
quiz-platform/
├── index.html          # Landing Page
├── quiz.html           # Active Quiz Engine
├── result.html         # Performance Analytics
├── leaderboard.html    # Ranked Scores
├── admin.html          # Question Management Dashboard
├── about.html          # Registration & Instructions
├── css/
│   └── style.css       # Core Design System
├── js/
│   ├── app.js          # Global Utilities & Sample Data
│   ├── quiz.js         # Timer & Randomization Logic
│   ├── admin.js        # CRUD Logic
│   ├── leaderboard.js  # Sorting Algorithms
│   ├── result.js       # Score Calculation
│   └── theme.js        # Theme Toggle Logic
└── .gitignore
```

## 🛠️ Local Setup (No Build Required!)

Because this project uses zero external dependencies, running it is incredibly simple:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/quiz-platform.git
   ```
2. **Navigate to the folder**:
   ```bash
   cd quiz-platform
   ```
3. **Run the App**:
   - **Easiest:** Simply double-click `index.html` to open it in your browser.
   - **Best for Development:** Use VS Code's "Live Server" extension, or run a local python server:
     ```bash
     python -m http.server 8000
     ```

## 👨‍💻 Author Notes

Developed with a strong focus on clean code, edge-case handling (e.g., preventing divide-by-zero errors in analytics, trimming whitespace in auth), and creating a rich user experience that stands out in a professional environment.