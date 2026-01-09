document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500);
    });
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    function animateFollower() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
    const links = document.querySelectorAll('a, button, .project-card, .filter-btn, .social-link');
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
    const header = document.querySelector('.header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollDown = document.querySelector('.scroll-down');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / docHeight;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        gsap.to(scrollProgress, {
            scaleX: scrollPercent,
            duration: 0.1
        });
        if (scrollY > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.visibility = 'hidden';
        } else {
            scrollDown.style.opacity = '1';
            scrollDown.style.visibility = 'visible';
        }
    });
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('show');
    });
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('show');
        });
    });
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
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4
    });
    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8
    });
    gsap.from('.hero-cta .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 1.2
    });
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            x: -50,
            opacity: 0,
            duration: 0.8
        });
    });
    gsap.utils.toArray('.skills-category').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1
        });
    });
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(btn, {
                x: (x - rect.width / 2) * 0.2,
                y: (y - rect.height / 2) * 0.2,
                duration: 0.3
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
    fetchGitHubData();
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'Zhafron Adani Kautsar',
                to_email: 'zhafronadani@gmail.com',
                reply_to: email,
                year: new Date().getFullYear()
            };
            emailjs.send('service_wjre9ld','template_svs7h34', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessMessage(name, contactForm);
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    alert('Oops! Something went wrong. Please try again later or contact me directly at zhafronadani@gmail.com');
                });
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
                document.getElementById('send-another').addEventListener('click', () => {
                    window.location.reload();
                });
            }
        });
    }
});
let allRepos = [];
let starredRepos = [];
async function fetchGitHubData() {
    try {
        const username = 'tickernelz';
        const [reposResponse, starredResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/users/${username}/starred?per_page=100`)
        ]);
        const repos = await reposResponse.json();
        const starred = await starredResponse.json();
        allRepos = repos.filter(repo => !repo.fork);
        starredRepos = starred;
        allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        displayRepos(allRepos, 'all');
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.getElementById('projects-container').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load projects. Please try again later.</p>
            </div>
        `;
    }
}
function displayRepos(repos, filter = 'all') {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    let displayedRepos = [];
    if (filter === 'starred') {
        displayedRepos = starredRepos.slice(0, 12);
    } else if (filter === 'latest') {
        displayedRepos = allRepos.slice(0, 6);
    } else if (filter === 'all') {
        displayedRepos = allRepos.slice(0, 12);
    } else {
        displayedRepos = allRepos.filter(repo => {
            let category = determineCategory(repo);
            return category === filter;
        }).slice(0, 12);
    }
    displayedRepos.forEach((repo, index) => {
        const category = determineCategory(repo);
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${category}`;
        projectCard.setAttribute('data-category', category);
        const icon = getCategoryIcon(category);
        const description = repo.description || 'No description available';
        const languages = [];
        if (repo.language) {
            languages.push(repo.language);
        }
        const updatedAt = new Date(repo.updated_at);
        const now = new Date();
        const diffTime = Math.abs(now - updatedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let timeAgo = '';
        if (diffDays === 0) {
            timeAgo = 'Today';
        } else if (diffDays === 1) {
            timeAgo = 'Yesterday';
        } else if (diffDays < 7) {
            timeAgo = `${diffDays}d ago`;
        } else if (diffDays < 30) {
            timeAgo = `${Math.floor(diffDays / 7)}w ago`;
        } else if (diffDays < 365) {
            timeAgo = `${Math.floor(diffDays / 30)}mo ago`;
        } else {
            timeAgo = `${Math.floor(diffDays / 365)}y ago`;
        }
        projectCard.innerHTML = `
            <div class="project-header">
                <div>
                    <h3 class="project-title">${repo.name}</h3>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; align-items: center;">
                        <span style="font-size: 1.2rem; color: var(--text-secondary); font-family: var(--font-mono);">
                            <i class="fas fa-clock"></i> ${timeAgo}
                        </span>
                    </div>
                </div>
                <i class="${icon} project-icon"></i>
            </div>
            <div class="project-body">
                <p class="project-description">${description}</p>
            </div>
            <div class="project-footer">
                <div class="project-languages">
                    ${languages.map(lang => `<span class="project-language">${lang}</span>`).join('')}
                    ${repo.stargazers_count > 0 ? `<span class="project-language"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span class="project-language"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>` : ''}
                </div>
            </div>
        `;
        projectCard.addEventListener('click', () => {
            openProjectModal(repo);
        });
        projectsContainer.appendChild(projectCard);
        gsap.from(projectCard, {
            scrollTrigger: {
                trigger: projectCard,
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.05
        });
    });
}
function determineCategory(repo) {
    let category = 'other';
    if (repo.language) {
        if (repo.language.toLowerCase() === 'python') {
            category = 'python';
        } else if (['javascript', 'html', 'css', 'php', 'typescript'].includes(repo.language.toLowerCase())) {
            category = 'web';
        }
    }
    if (repo.name.toLowerCase().includes('odoo') || 
        (repo.description && repo.description.toLowerCase().includes('odoo'))) {
        category = 'odoo';
    }
    return category;
}
function getCategoryIcon(category) {
    const icons = {
        python: 'fab fa-python',
        web: 'fas fa-globe',
        odoo: 'fas fa-cubes',
        other: 'fas fa-code'
    };
    return icons[category] || icons.other;
}
function openProjectModal(repo) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const modalDemoLink = document.getElementById('modal-demo-link');
    modalTitle.textContent = repo.name;
    modalDescription.textContent = repo.description || 'No description available';
    modalRepoLink.href = repo.html_url;
    if (repo.homepage) {
        modalDemoLink.href = repo.homepage;
        modalDemoLink.style.display = 'inline-flex';
    } else {
        modalDemoLink.style.display = 'none';
    }
    modalLanguages.innerHTML = '';
    if (repo.language) {
        const languageSpan = document.createElement('span');
        languageSpan.className = 'modal-language';
        languageSpan.textContent = repo.language;
        modalLanguages.appendChild(languageSpan);
    }
    if (repo.stargazers_count > 0) {
        const starsSpan = document.createElement('span');
        starsSpan.className = 'modal-language';
        starsSpan.innerHTML = `<i class="fas fa-star"></i> ${repo.stargazers_count}`;
        modalLanguages.appendChild(starsSpan);
    }
    if (repo.forks_count > 0) {
        const forksSpan = document.createElement('span');
        forksSpan.className = 'modal-language';
        forksSpan.innerHTML = `<i class="fas fa-code-branch"></i> ${repo.forks_count}`;
        modalLanguages.appendChild(forksSpan);
    }
    const updatedSpan = document.createElement('span');
    updatedSpan.className = 'modal-language';
    updatedSpan.innerHTML = `<i class="fas fa-clock"></i> Updated ${new Date(repo.updated_at).toLocaleDateString()}`;
    modalLanguages.appendChild(updatedSpan);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function filterProjects(filter) {
    displayRepos(filter === 'starred' ? starredRepos : allRepos, filter);
}
