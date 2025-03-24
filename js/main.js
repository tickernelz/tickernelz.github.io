/**
 * Portfolio Website - Zhafron Adani Kautsar
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500);
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });

    // Add active class to links and buttons on hover
    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });

    // Header scroll effect and scroll-down visibility
    const header = document.querySelector('.header');
    const scrollDown = document.querySelector('.scroll-down');

    window.addEventListener('scroll', () => {
        // Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide scroll-down indicator when scrolling down
        if (window.scrollY > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.visibility = 'hidden';
        } else {
            scrollDown.style.opacity = '1';
            scrollDown.style.visibility = 'visible';
        }
    });

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('show');
    });

    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('show');
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Project modal
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Fetch GitHub repositories
    fetchGitHubRepos();

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filter);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get name for success message
            const name = document.getElementById('name').value;

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Get form data for email
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Since you don't have templates, we'll use the direct send method
            // Create parameters for a simple email
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'Zhafron Adani Kautsar',
                to_email: 'zhafronadani@gmail.com',
                reply_to: email
            };

            // Send email using EmailJS
            emailjs.send('service_wjre9ld', 'contact_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage(name, contactForm);
                })
                .catch(function(error) {
                    console.log('FAILED...', error);

                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;

                    // Show error message
                    alert('Oops! Something went wrong. Please try again later or contact me directly at zhafronadani@gmail.com');
                });

            // Function to show success message
            function showSuccessMessage(name, form) {
                const formContainer = form.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
                        <button class="btn btn-primary" id="send-another">Send Another Message</button>
                    </div>
                `;

                // Add event listener to "Send Another Message" button
                document.getElementById('send-another').addEventListener('click', () => {
                    window.location.reload();
                });
            }
        });
    }
});

/**
 * Fetch GitHub repositories
 */
async function fetchGitHubRepos() {
    try {
        const username = 'tickernelz';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        
        // Filter out forked repositories
        const ownRepos = repos.filter(repo => !repo.fork);
        
        // Sort by stars (descending)
        ownRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        // Display repositories
        displayRepos(ownRepos);
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        document.getElementById('projects-container').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load projects. Please try again later.</p>
            </div>
        `;
    }
}

/**
 * Display repositories in the projects grid
 * @param {Array} repos - Array of GitHub repositories
 */
function displayRepos(repos) {
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear loading spinner
    projectsContainer.innerHTML = '';
    
    // Display up to 6 repositories
    const displayedRepos = repos.slice(0, 6);
    
    displayedRepos.forEach(repo => {
        // Determine project category
        let category = 'other';
        
        if (repo.language) {
            if (repo.language.toLowerCase() === 'python') {
                category = 'python';
            } else if (repo.language.toLowerCase() === 'javascript' || 
                      repo.language.toLowerCase() === 'html' || 
                      repo.language.toLowerCase() === 'css' || 
                      repo.language.toLowerCase() === 'php') {
                category = 'web';
            }
        }
        
        // Check if it's an Odoo-related project
        if (repo.name.toLowerCase().includes('odoo') || 
            (repo.description && repo.description.toLowerCase().includes('odoo'))) {
            category = 'odoo';
        }
        
        // Create project card
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${category}`;
        projectCard.setAttribute('data-category', category);
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', (displayedRepos.indexOf(repo) * 100).toString());
        
        // Determine icon based on category
        let icon = 'fas fa-code';
        if (category === 'python') {
            icon = 'fab fa-python';
        } else if (category === 'web') {
            icon = 'fas fa-globe';
        } else if (category === 'odoo') {
            icon = 'fas fa-cubes';
        }
        
        // Format description
        const description = repo.description || 'No description available';
        
        // Get languages
        const languages = [];
        if (repo.language) {
            languages.push(repo.language);
        }
        
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                <i class="${icon} project-icon"></i>
            </div>
            <div class="project-body">
                <p class="project-description">${description}</p>
            </div>
            <div class="project-footer">
                <div class="project-languages">
                    ${languages.map(lang => `<span class="project-language">${lang}</span>`).join('')}
                    ${repo.stargazers_count > 0 ? `<span class="project-language"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                </div>
            </div>
        `;
        
        // Add click event to open modal
        projectCard.addEventListener('click', () => {
            openProjectModal(repo);
        });
        
        projectsContainer.appendChild(projectCard);
    });
}

/**
 * Open project modal with repository details
 * @param {Object} repo - GitHub repository object
 */
function openProjectModal(repo) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const modalDemoLink = document.getElementById('modal-demo-link');
    
    // Set modal content
    modalTitle.textContent = repo.name;
    modalDescription.textContent = repo.description || 'No description available';
    
    // Set repository link
    modalRepoLink.href = repo.html_url;
    
    // Set demo link if homepage exists
    if (repo.homepage) {
        modalDemoLink.href = repo.homepage;
        modalDemoLink.style.display = 'inline-flex';
    } else {
        modalDemoLink.style.display = 'none';
    }
    
    // Clear languages
    modalLanguages.innerHTML = '';
    
    // Add language
    if (repo.language) {
        const languageSpan = document.createElement('span');
        languageSpan.className = 'modal-language';
        languageSpan.textContent = repo.language;
        modalLanguages.appendChild(languageSpan);
    }
    
    // Add stars if any
    if (repo.stargazers_count > 0) {
        const starsSpan = document.createElement('span');
        starsSpan.className = 'modal-language';
        starsSpan.innerHTML = `<i class="fas fa-star"></i> ${repo.stargazers_count}`;
        modalLanguages.appendChild(starsSpan);
    }
    
    // Add forks if any
    if (repo.forks_count > 0) {
        const forksSpan = document.createElement('span');
        forksSpan.className = 'modal-language';
        forksSpan.innerHTML = `<i class="fas fa-code-branch"></i> ${repo.forks_count}`;
        modalLanguages.appendChild(forksSpan);
    }
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Filter projects based on category
 * @param {string} filter - Category to filter by
 */
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'flex';
        } else {
            if (card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}