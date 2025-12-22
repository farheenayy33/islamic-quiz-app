# Islamic Quiz Web App

A full-stack web application to take Islamic quizzes, track progress, and store user data locally and in a MySQL database. Built with **HTML, CSS (Tailwind), JavaScript, PHP, and MySQL**.

---

## Features

- User signup 
- Choose quiz categories:  
  - Pillars of Islam  
  - Prophets  
  - Quran
- Timer-based quizzes with multiple-choice questions
- Immediate feedback and explanations
- Score tracking and dashboard with progress charts
- Avatar generation with user initials
- Persistent data storage in **localStorage** and **MySQL database**

---

## Technologies Used

- Frontend: HTML, Tailwind CSS, JavaScript
- Backend: PHP
- Database: MySQL
- Local storage: Browser `localStorage`

---

## Getting Started (Run Locally)

To run this project locally, you need a PHP and MySQL environment like **XAMPP** or **MAMP**.

### Prerequisites

- Install [XAMPP](https://www.apachefriends.org/) or equivalent
- Basic knowledge of MySQL

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   ```
2. **Copy project files** to your local server directory

   * For XAMPP: `C:\xampp\htdocs\your-project-folder`

3. **Create the database**

   * Open phpMyAdmin (`http://localhost/phpmyadmin`)
   * Create a new database, e.g., `islamic_quiz`
   * Import the provided `database.sql` (or create tables manually):

     * `user` – stores registered users
     * `quiz` – quiz categories
     * `question` – questions for all categories
     * `results` – user progress

4. **Configure database connection**

   * Open `api/form.php` and other PHP files that connect to the DB
   * Update:

     ```php
     $servername = "localhost";
     $username = "root"; // your DB username
     $password = "";     // your DB password
     $dbname = "islamic_quiz"; // your database name
     ```

5. **Start the server**

   * Start **Apache** and **MySQL** in XAMPP

6. **Open the app**

   * In your browser, go to: `http://localhost/your-project-folder/`

---

## Local Storage

* The app also stores user data in the browser using `localStorage`.
* This ensures the profile info and quiz progress persist even without logging in again.
* Keys used in localStorage:

  * `user` – stores `{ name, email }` from signup
  * `selectedCategory` – stores the currently selected quiz category
  * `islamicQuizHighScores` – stores user quiz scores

---

## Screenshots & Demo

### Signup Page
![Signup Page](assets/signup.png)
### Dashboard
![Dashboard](assets/home.png)

### Quiz Page
![Quiz Page](assets/quiz.png)

### Dashboard
![Dashboard](assets/dashboard.png)

---

## Notes

* **GitHub Pages cannot run PHP or MySQL**, so live demo is **not possible on GitHub**.
* You can only host this project for **live demo** on a server that supports PHP & MySQL.

---

## Author

**Farheen Laraib**

---

## License

MIT License
