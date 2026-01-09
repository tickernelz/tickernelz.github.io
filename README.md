# Dark Modern Portfolio Website

A modern, dark-themed portfolio website with smooth animations and dynamic GitHub integration. Built with performance and user experience in mind.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)

## ✨ Features

### 🎨 Design
- **Dark Modern Theme** - Pure black background with neon green accents
- **Brutalist Minimalism** - Clean, bold typography with strong grid system
- **Space Grotesk Typography** - Modern geometric font for headings
- **Subtle Grid Background** - Professional texture without distraction
- **Profile Photo Integration** - Auto-fetched from GitHub API

### 🎬 Animations & Interactions
- **GSAP ScrollTrigger** - Smooth scroll-based animations
- **Lenis Smooth Scroll** - Buttery smooth scrolling experience
- **Magnetic Buttons** - Interactive hover effects
- **Custom Cursor** - Enhanced cursor with follower
- **Scroll Progress Bar** - Visual feedback for page position
- **Shimmer Effects** - Subtle animations on skill bars and buttons

### 🔗 GitHub Integration
- **Dynamic Repository Display** - Auto-fetch from GitHub API
- **Starred Repositories** - Show repos you've starred
- **Latest Updates** - Display last update time (2d ago, 1w ago, etc.)
- **Enhanced Filtering** - Filter by All/Starred/Latest/Python/Odoo/Web
- **Stars & Forks Count** - Show repository statistics
- **Project Cards** - Modern cards with glow effects on hover

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for all devices
- **Breakpoints** - 1024px, 768px, 576px, 375px
- **Touch-Friendly** - Optimized interactions for mobile
- **Adaptive Layout** - Content reflows beautifully on all screens

### 📧 Contact Form
- **EmailJS Integration** - Serverless email sending
- **Form Validation** - Client-side validation
- **Success Feedback** - Beautiful sss message
- **Rate Limiting** - Prevent spam (1 request per 10 seconds)

## 🚀 Tech Stack

### Frontend
```
├── HTML5 (Semantic markup)
├── CSS3 (Custom properties, Grid, Flexbox)
└── JavaScript (ES6+)
```

### Libraries & Tools
```
├── GSAP 3.12.5 (Animation engine)
│   └── ScrollTrigger (Scroll-based animations)
├── Lenis 1.3.17 (Smooth scroll)
├── EmailJS (Contact form)
└── Font Awesome 6.5.1 (Icons)
```

### APIs
```
├── GitHub REST API v3
│   ├── /users/{username}/repos (Your repositories)
│   └── /users/{username}/starred (Starred repositories)
```

### Hosting
```
└── GitHub Pages (Free, fast, reliable)
```

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/tickernelz/tickernelz.github.io.git
cd tickernelz.github.io
```

### 2. Customize Content

#### Update Personal Information
Edit `index.html`:
- Change name, title, description in hero section
- Update about section text
- Modify skills and percentages
- Update social media links

#### Update GitHub Username
Edit `js/main.js`:
```javascript
// Line ~250
const username = 'tickernelz'; // Change to your username
```

#### Customize Colors
Edit `css/style.css`:
```css
:root {
    --bg-primary: #0a0a0a;        /* Background */
    --accent-primary: #00ff88;     /* Neon green */
    --accent-secondary: #ff0055;   /* Hot pink */
    /* ... */
}
```

### 3. EmailJS Setup (Optional)

The contact form uses EmailJS. To set it up:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail recommended)
3. Create email template with these parameters:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Email subject
   - `message` - Email message
   - `to_name` - Your name
   - `to_email` - Your email
   - `reply_to` - Sender's email

4. Update credentials in `index.html`:
```javascript
// Line ~460
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY",
    // ...
});

// Line ~210
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### 4. Deploy to GitHub Pages

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin master
```

Then enable GitHub Pages:
1. Go to repository Settings
2. Navigate to Pages section
3. Select `master` branch as source
4. Click Save

Your portfolio will be live at `https://yourusername.github.io`

## 🎨 Customization Guide

### Change Animation Speed
```javascript
// js/main.js - Line ~3
const lenis = new Lenis({
    duration: 1.2,  // Change to 1.5 for slower scroll
    // ...
});
```

### Adjust Hover Effects
```css
/* css/style.css */
.project-card:hover {
    transform: translateY(-8px);  /* Adjust lift amount */
    box-shadow: var(--shadow-glow);
}
```

### Modify Skill Bars
```html
<!-- index.html -->
<div class="skill-progress" style="width: 90%"></div>
<!-- Change percentage -->
```

### Update Profile Photo
The photo is auto-fetched from GitHub:
```html
<img src="https://github.com/tickernelz.png" alt="Your Name">
<!-- Change username to yours -->
```

Or use custom photo:
```html
<img src="path/to/your-photo.jpg" alt="Your Name">
```

## 🎯 Performance Optimizations

- ✅ **Lazy Loading** - Images and animations load on demand
- ✅ **Efficient Animations** - GPU-accelerated transforms
- ✅ **Debounced Events** - Optimized scroll listeners
- ✅ **Minimal DOM Manipulation** - Efficient rendering
- ✅ **CDN Resources** - Fast library loading
- ✅ **Cached API Responses** - Reduced API calls

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Custom cursor disabled on mobile for better UX.

## 🐛 Troubleshooting

### Smooth Scroll Not Working
- Ensure Lenis CDN is loaded correctly
- Check browser console for errors
- Verify `autoRaf: false` and manual raf loop

### GitHub API Not Loading
- Check username in `js/main.js`
- Verify internet connection
- Check browser console for CORS errors
- GitHub API has rate limit (60 requests/hour unauthenticated)

### Animations Not Triggering
- Ensure GSAP and ScrollTrigger are loaded
- Check if elements have correct classes
- Verify ScrollTrigger.update() is called

### Contact Form Not Sending
- Verify EmailJS credentials
- Check browser console for errors
- Ensure all form fields are filled
- Check EmailJS dashboard for quota

## 📝 Project Structure

```
tickernelz.github.io/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles (1400+ lines)
├── js/
│   └── main.js            # All JavaScript (400+ lines)
├── README.md              # This file
├── robots.txt             # SEO configuration
└── sitemap.xml            # Site map for search engines
```

## 🎓 Learning Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [EmailJS Docs](https://www.emailjs.com/docs/)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

**Design & Development:** Zhafron Adani Kautsar

**Inspiration:**
- Obys Agency - Minimal animations
- Basement Studio - Dark theme aesthetics
- Darkroom Engineering - Lenis smooth scroll

**Libraries:**
- GSAP by GreenSock
- Lenis by Darkroom Engineering
- EmailJS
- Font Awesome

## 🔗 Links

- **Live Site:** [tickernelz.github.io](https://tickernelz.github.io)
- **GitHub:** [@tickernelz](https://github.com/tickernelz)
- **LinkedIn:** [zhafronk](https://www.linkedin.com/in/zhafronk)

---

**Made with ❤️ and lots of ☕**

*Last updated: January 2026*
