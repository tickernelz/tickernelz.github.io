/*--------------------------------------------------------------
# GitHub Projects Fetcher
--------------------------------------------------------------*/
(function() {
    'use strict';

    // GitHub username
    const username = 'tickernelz';
    
    // Container for projects
    const projectsContainer = document.querySelector('.projects-container');
    
    // Number of repositories to display
    const reposToShow = 6;
    
    // GitHub API URL for user repositories
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    
    // Project categories mapping
    const categoryMap = {
        'python': ['python', 'django', 'flask', 'fastapi'],
        'odoo': ['odoo', 'booking_order', 'toko_zhafron'],
        'web': ['html', 'css', 'javascript', 'php', 'laravel', 'web'],
        'other': ['shell', 'docker', 'c#', 'java', 'kotlin']
    };
    
    // Function to determine project category
    function getProjectCategory(repo) {
        const language = (repo.language || '').toLowerCase();
        const name = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        
        // Check for Odoo related projects
        if (name.includes('odoo') || description.includes('odoo')) {
            return 'odoo';
        }
        
        // Check for web projects
        if (categoryMap.web.some(tech => name.includes(tech) || description.includes(tech))) {
            return 'web';
        }
        
        // Check for Python projects
        if (language === 'python' || categoryMap.python.some(tech => name.includes(tech) || description.includes(tech))) {
            return 'python';
        }
        
        // Default to other
        return 'other';
    }
    
    // Function to create project HTML
    function createProjectHTML(repo) {
        const category = getProjectCategory(repo);
        const description = repo.description || 'No description available';
        const language = repo.language || 'Not specified';
        
        // Generate a color for the repository based on its name
        const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
        const colorIndex = Math.abs(repo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
        const bgColor = colors[colorIndex];
        
        return `
            <div class="project-item" data-filter="${category}">
                <div class="project-image">
                    <img src="https://raw.githubusercontent.com/${username}/${repo.name}/main/screenshot.png"
                         onerror="this.onerror=null; this.src='assets/img/project-placeholder.svg';"
                         alt="${repo.name}">
                    <div class="project-category">${category}</div>
                </div>
                <div class="project-info">
                    <h3>${repo.name.replace(/_/g, ' ').replace(/-/g, ' ')}</h3>
                    <p>${description}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-code"></i> ${language}</span>
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Function to fetch repositories
    async function fetchRepositories() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const repos = await response.json();
            
            // Filter out forked repositories
            const ownRepos = repos.filter(repo => !repo.fork);
            
            // Take only the specified number of repositories
            const displayRepos = ownRepos.slice(0, reposToShow);
            
            // Clear loading spinner
            projectsContainer.innerHTML = '';
            
            // Add repositories to the container
            displayRepos.forEach(repo => {
                const projectHTML = createProjectHTML(repo);
                projectsContainer.innerHTML += projectHTML;
            });
            
            // Initialize Isotope after adding projects
            const iso = new Isotope(projectsContainer, {
                itemSelector: '.project-item',
                layoutMode: 'fitRows'
            });
            
            // Set up filter functionality
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');
                    
                    if (filterValue === 'all') {
                        iso.arrange({ filter: '*' });
                    } else {
                        iso.arrange({ filter: `[data-filter="${filterValue}"]` });
                    }
                    
                    // Update active button
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    button.classList.add('active');
                });
            });
            
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            projectsContainer.innerHTML = `
                <div class="error-message">
                    <p>Failed to load GitHub repositories. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Fetch repositories when the page loads
    window.addEventListener('load', fetchRepositories);
    
})();