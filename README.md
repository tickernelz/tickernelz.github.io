# Dynamic GitHub Portfolio Website

A modern, dark-themed, and dynamic portfolio website that automatically fetches and displays GitHub repositories.

## Features

- **Dynamic GitHub Integration**: Automatically fetches and displays your GitHub repositories
- **Responsive Design**: Looks great on all devices (mobile, tablet, desktop)
- **Dark Theme**: Modern dark theme with accent colors
- **Animations**: Smooth animations and transitions using AOS library
- **Custom Cursor**: Interactive custom cursor
- **Project Filtering**: Filter projects by category
- **Contact Form**: Simple contact form (requires backend implementation)
- **SVG Graphics**: All graphics are SVG-based for crisp display at any resolution

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tickernelz/tickernelz.github.io.git
cd tickernelz.github.io
```

### 2. Customize Content

Edit the following files to personalize your portfolio:

- `index.html`: Update personal information, skills, and other content
- `css/style.css`: Customize colors, fonts, and other styling
- `js/main.js`: Modify GitHub username and other functionality

### 3. Deploy to GitHub Pages

1. Push your changes to your GitHub repository:

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. Go to your GitHub repository settings
3. Navigate to the "Pages" section
4. Select the "main" branch as the source
5. Click "Save"

Your portfolio will be available at `https://tickernelz.github.io` after a few minutes.

## Customization

### Changing Colors

Edit the CSS variables in the `:root` selector in `css/style.css`:

```css
:root {
    --primary-color: #8A3FFC;
    --secondary-color: #FF6B6B;
    --accent-color: #4ECDC4;
    --background-color: #0F1624;
    --background-light: #1A2332;
    --text-color: #F7F8F9;
    --text-color-light: #A0AEC0;
    --border-color: #2D3748;
    /* ... */
}
```

### Adding Projects Manually

If you want to add projects manually instead of fetching them from GitHub, modify the `displayRepos` function in `js/main.js`.

### Changing GitHub Username

Update the username in the `fetchGitHubRepos` function in `js/main.js`:

```javascript
async function fetchGitHubRepos() {
    try {
        const username = 'your-username'; // Change this
        // ...
    }
}
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll Library
- [Font Awesome](https://fontawesome.com/) - Icons
- GitHub API

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Created by Zhafron Adani Kautsar