# Flappy Bird Clone 🐦

**A Classic Arcade-Style Game Built with HTML5 Canvas & Vanilla JavaScript**

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Pages Deployment](https://github.com/Antonious-Awad/flappy-bird/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Antonious-Awad/flappy-bird/actions)

A modern implementation of the classic Flappy Bird game featuring responsive design, smooth animations, and authentic gameplay mechanics. Perfect for web gaming enthusiasts and developers looking to learn canvas game development!

**Live Demo:** <a target="_blank" href="https://antonious-awad.github.io/flappy-bird/">Play Now</a>

<p align="center">
<img src="./images/screenshot.png" align="center" alt="Gameplay Screenshot" width="200" height="400">

---

## 🎮 Features

- **Authentic Gameplay Physics**  
  Precise gravity simulation and collision detection
- **Responsive Design**  
  Works flawlessly on desktop and mobile devices
- **Dynamic Background System**  
  Auto-adjusting parallax scrolling pattern
- **Game State Management**  
  Smooth transitions between menu/game/over screens
- **Score Tracking**  
  Persistent high score system
- **Touch & Keyboard Support**  
  Play with spacebar, mouse click, or touch input

---

## 💻 Technologies

- **Core Engine**  
  ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![Canvas API](https://img.shields.io/badge/-Canvas%20API-FF6F61)

- **Key Features**
  - Vanilla JavaScript (No frameworks!)
  - CSS3
  - Mobile-First Design

---

## 🕹️ How to Play

**Objective:** Navigate through pipes without touching them!  
**Controls:**

- `SPACE`/`CLICK`/`TOUCH` - Jump

**Scoring:**

- +1 point for each pipe pair cleared
- Best score persists between sessions

---

## 🛠️ Installation

1.  Clone repository:

    ```bash
    git clone https://github.com/yourusername/flappy-bird.git
    ```

2.  Serve it using a live server (or use any live server option of your choice):

    ```bash
    cd flappy-bird && python3 -m http.server <your desired port>
    ```

---

## 🚀 Deployment

Deploy your own version with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Antonious-Awad/flappy-bird)

**Manual Deployment Options:**

- [Github Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- Traditional web hosting

---

# 🎨 Customization

Easily modify game parameters in `src/constants.js`:

```js
export const GAME_SETTINGS = {
  GRAVITY: 0.5,
  FLAP_FORCE: -6,
  PIPE_GAP: 200,
  PIPE_INTERVAL: 2500,
  // ... other settings
};
```

---

# 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Disclaimer: This project is for educational purposes only. All game assets are original creations or used under appropriate licenses.

Happy Flapping! 🚀
