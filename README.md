# OP FB Video Downloader

A modern, responsive Facebook video downloader website built with pure HTML, CSS, and vanilla JavaScript. No frameworks required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 🚀 Live Demo

Open `index.html` in your browser to see the website in action.

---

## 📁 Project Structure

```
op-fb-video-downloader/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet with dark mode support
├── script.js           # Vanilla JavaScript functionality
└── README.md           # Project documentation
```

---

## ✨ Features

- **Modern UI/UX** — Clean, professional design with smooth animations
- **Fully Responsive** — Works perfectly on desktop, tablet, and mobile
- **Dark Mode** — Toggle between light and dark themes (preference saved)
- **URL Validation** — Validates Facebook URLs before processing
- **Paste from Clipboard** — One-click paste button
- **Loading States** — Visual feedback during processing
- **Quality Selector** — Choose from 360p, 480p, 720p, and 1080p
- **FAQ Accordion** — Expandable frequently asked questions
- **Smooth Scrolling** — Animated navigation between sections
- **Mobile Navigation** — Hamburger menu with overlay
- **Toast Notifications** — Non-intrusive success/error messages
- **SEO Ready** — Meta tags, Open Graph, semantic HTML
- **Accessible** — ARIA labels, keyboard navigation, focus states
- **Keyboard Shortcuts** — `Ctrl/Cmd + Enter` to submit

---

## 🛠️ Backend Integration

The frontend is designed to connect to a backend API. The API placeholder is located in `script.js`:

```javascript
const API_ENDPOINT = '/api/download';
```

### Expected API Request

```http
POST /api/download
Content-Type: application/json

{
  "url": "https://www.facebook.com/watch?v=..."
}
```

### Expected API Response

```json
{
  "success": true,
  "data": {
    "title": "Video Title",
    "thumbnail": "https://...",
    "duration": "2:34",
    "qualities": [
      { "quality": "1080p", "url": "https://..." },
      { "quality": "720p", "url": "https://..." },
      { "quality": "480p", "url": "https://..." },
      { "quality": "360p", "url": "https://..." }
    ]
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Video is private or unavailable"
}
```

> **Note:** The current implementation includes a demo mode that simulates API responses. Replace the demo code with the actual `fetch()` call in the `handleDownload()` function for production use.

---

## 🎨 Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
  --primary: #2563eb;        /* Main brand color */
  --primary-dark: #1d4ed8;   /* Hover state */
  --accent: #0ea5e9;         /* Secondary accent */
}
```

### Content

- Update text content directly in `index.html`
- Modify FAQ questions in the FAQ section
- Add/remove feature cards as needed
- Update footer links and legal pages

---

## 📱 Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## ⚠️ Disclaimer

This tool is intended for downloading Facebook videos that you have permission to download. Respect copyright laws and Facebook's Terms of Service. Only download content that you own or have explicit permission to use.

---

## 📝 License

MIT License — feel free to use, modify, and distribute.

---

## 👨‍💻 Developer

**Developed by OP Web Developer**

© 2026 OP Web Developer. All rights reserved.
