# 🟡 Pac-Man Web Game

Play Pac-Man directly in your browser! This is a web-based version of the classic Java Swing Pac-Man game.

## 🎮 Play Online

**[🎯 PLAY NOW](https://your-netlify-url.netlify.app)** *(Link will be available after deployment)*

## ✨ Features

- **Browser-based gameplay** - No downloads required!
- **Responsive design** - Works on desktop and mobile
- **Local high score** - Your best score is saved in browser storage
- **Classic mechanics** - Same gameplay as the original Java version
- **Modern UI** - Beautiful gradient background and styling

## 🎯 How to Play

1. **Move**: Use arrow keys (↑ ↓ ← →) to control Pac-Man
2. **Objective**: Eat all the white dots while avoiding ghosts
3. **Lives**: You have 3 lives - losing all ends the game
4. **Restart**: Press SPACE after game over to play again
5. **Score**: Each dot gives you 10 points

## 🚀 Local Development

To run locally:

```bash
# Navigate to web directory
cd web

# Serve with any static server, for example:
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000 in your browser
```

## 🏗️ Technical Details

- **HTML5 Canvas** for game rendering
- **Vanilla JavaScript** - No frameworks needed
- **Responsive CSS** with mobile support
- **60fps gameplay** with smooth animations
- **LocalStorage** for high score persistence

## 📱 Mobile Support

The game works on mobile devices with touch controls:
- Swipe gestures control Pac-Man movement
- Responsive layout adapts to screen size
- Touch-friendly restart button

## 🎨 Differences from Java Version

- **Visual**: Uses canvas-drawn sprites instead of PNG images
- **Controls**: Added SPACE key for restart
- **UI**: Modern web styling with gradients and shadows
- **Storage**: High scores saved in browser instead of memory
- **Platform**: Runs in any modern web browser

---

**Enjoy playing Pac-Man in your browser! 🎮**
