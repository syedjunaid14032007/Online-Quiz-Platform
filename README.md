# Online Quiz & Assessment Platform

## Objective
The **Online Quiz & Assessment Platform** is a modern, responsive, and interactive web application designed to allow users to participate in timed multiple-choice quizzes, view instant detailed results, and track their rankings on a live leaderboard. 

This project aims to deliver a production-ready, beginner-friendly yet highly polished platform with a stunning UI, without relying on external UI frameworks or backend servers, using `localStorage` for data persistence.

## Features
- **User Quiz System**: Timed quizzes, one question at a time, instant score calculation.
- **Leaderboard System**: Top player rankings stored and sorted locally.
- **Admin Panel**: Add, edit, delete, and search quiz questions.
- **Result Page**: Detailed review of correct/incorrect answers, percentage score, and dynamic performance feedback (with confetti animation for high scores!).
- **Dark Mode**: Seamless toggle between light and dark themes with persistent user preference.
- **Responsive Design**: Mobile-first approach for smooth experience across all devices.
- **Modern UI**: Glassmorphism design system using Vanilla CSS, custom variables, and micro-animations.

## Tech Stack
- **HTML5**: Semantic markup.
- **CSS3**: Vanilla CSS with custom properties (CSS variables), Flexbox, Grid, and animations.
- **JavaScript (Vanilla JS)**: DOM manipulation, event handling, logic, and state management.
- **Data Persistence**: LocalStorage & SessionStorage API.

## Folder Structure
```
quiz-platform/
│
├── index.html          # Home page
├── quiz.html           # Active quiz page
├── result.html         # Final score and detailed review
├── leaderboard.html    # Global rankings
├── admin.html          # Admin dashboard for questions
├── about.html          # Instructions & Start screen
│
├── css/
│   └── style.css       # Core styling, themes, animations
│
├── js/
│   ├── app.js          # Global utilities, sample data init
│   ├── quiz.js         # Core quiz logic & timer
│   ├── admin.js        # Admin CRUD operations
│   ├── leaderboard.js  # Ranking and sorting logic
│   ├── result.js       # Score calculation and UI
│   └── theme.js        # Light/Dark mode toggler
│
├── assets/
│   ├── images/         # (Empty for now)
│   └── sounds/         # (Empty for now)
│
└── README.md
```

## Installation Steps
This project requires absolutely no backend setup or build tools.
1. Clone the repository or download the ZIP file.
2. Extract the contents to a folder.
3. You're ready to go!

## How to Run
1. Open the project folder.
2. Double-click on `index.html` to open it in your default web browser.
3. Alternatively, you can use a local server like VS Code's "Live Server" extension for a better development experience.

## Screenshots
> *Placeholders for future screenshots.*
- **Home Page**: `[Insert Home Screen Screenshot Here]`
- **Quiz Page**: `[Insert Quiz Screen Screenshot Here]`
- **Admin Dashboard**: `[Insert Admin Screen Screenshot Here]`

## Future Improvements
- **Backend Integration**: Replace `localStorage` with a real database (e.g., Firebase, MongoDB) for global multiplayer leaderboards.
- **User Authentication**: Allow users to create accounts, login, and save their quiz history.
- **Category Selection**: Allow users to pick specific topics before starting the quiz.
- **Audio Feedback**: Add subtle sound effects for correct/incorrect answers and timer warnings.

## Author
Developed as part of a modern assessment platform build.
