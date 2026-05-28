// Team members data
const teamMembers = [
    // Liderança
    {
        name: "João Souza",
        role: "Capitão",
        image: "assets/images/joao_not_white.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Matheus Torquato",
        role: "Vice-Capitão",
        image: "assets/images/torquato.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Gestores
    {
        name: "Felipe Grabias",
        role: "Gestor de Montagem",
        image: "assets/images/grabias.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Gustavo Britto Triaquim",
        role: "Gestor de Eletrônica",
        image: "assets/images/gustavo.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "João Pedro",
        role: "Gestor de Eletrônica",
        image: "assets/images/joao_pedro.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Natália Soltovski",
        role: "Gestora de Marketing",
        image: "assets/images/natalia.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Programação
    {
        name: "Adrian Netto",
        role: "Membro de Programação",
        image: "assets/images/adrian.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Felipe Santos",
        role: "Membro de Programação",
        image: "assets/images/felipe.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Jean Pierre Franz",
        role: "Membro de Programação",
        image: "assets/images/jean.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Maria Eduarda Wons",
        role: "Membro de Programação",
        image: "assets/images/maria.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Kauã da Silva",
        role: "Membro de Programação",
        image: "assets/images/kauan.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Eike Petroski",
        role: "Membro de Programação",
        image: "assets/images/eike.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Lucas Guzatti",
        role: "Membro de Programação",
        image: "assets/images/lucas.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Montagem
    {
        name: "Pamela da Silva Machado",
        role: "Membro de Montagem",
        image: "assets/images/pamela.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Thais Vitoria dos Santos",
        role: "Membro de Montagem",
        image: "assets/images/thais.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Marina Cardoso",
        role: "Membro de Montagem",
        image: "assets/images/marina.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Eduardo Riad",
        role: "Membro de Montagem",
        image: "assets/images/riad.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Lorenzo Riboli",
        role: "Membro de Montagem",
        image: "assets/images/lorenzo.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Kauan Fiori",
        role: "Membro de Montagem",
        image: "assets/images/kauan_ricardo.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Poliane Sampaio",
        role: "Membro de Montagem",
        image: "assets/images/poli.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Bruno Barbato",
        role: "Membro de Montagem",
        image: "assets/images/bruno.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Vinicius Eduardo",
        role: "Membro de Montagem",
        image: "assets/images/default.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Bianca",
        role: "Membro de Montagem",
        image: "assets/images/default.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Marketing
    {
        name: "Maycon Tateiwa",
        role: "Membro de Marketing",
        image: "assets/images/maycon.webp",
        social: { linkedin: "#", github: "#" }
    }
];

// Projects data
const projects = [
    {
        title: "Pimpolho",
        description: "Seguidor de Linha",
        icon: "fas fa-shoe-prints"
    },
    {
        title: "Hockey League",
        description: "Hockey Micro",
        icon: "fas fa-hockey-puck"
    },
    {
        title: "Tribagual",
        description: "Sumô Mini 500g (Auto)",
        icon: "fas fa-dumbbell"
    },
    {
        title: "Taz",
        description: "Sumô Lego 1kg (Auto)",
        icon: "fas fa-cubes"
    },
    {
        title: "Uninho",
        description: "Sumô Lego 1kg (Auto)",
        icon: "fas fa-cubes"
    },
    {
        title: "Perry o Ornintorrinco",
        description: "Artbot",
        icon: "fas fa-paintbrush"
    }
];

// Render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Helper function to get random color for placeholder
function getRandomColor() {
    const colors = ['00a8ff', '9c88ff', '4cd964', 'ff3b30', 'ff9500', 'ffcc00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create member card
function createMemberCard(member) {
    const memberCard = document.createElement('div');
    memberCard.className = 'team-member';
    const placeholderColor = getRandomColor();
    
    memberCard.innerHTML = `
        <div class="member-image">
            <img src="${member.image}" 
                 alt="${member.name}" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/150/${placeholderColor}/ffffff?text=${member.name.charAt(0)}'; this.onerror=null;">
        </div>
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <div class="member-social">
            <a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>
        </div>
    `;
    return memberCard;
}

// Render team members
function renderTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    const categories = {
        '👑 Liderança': teamMembers.filter(m => m.role === 'Capitão' || m.role === 'Vice-Capitão'),
        '📊 Gestores': teamMembers.filter(m => m.role.includes('Gestor')),
        '💻 Programação': teamMembers.filter(m => m.role === 'Membro de Programação'),
        '🔧 Montagem': teamMembers.filter(m => m.role === 'Membro de Montagem'),
        '📢 Marketing': teamMembers.filter(m => m.role === 'Membro de Marketing')
    };
    
    Object.entries(categories).forEach(([category, members]) => {
        if (members.length === 0) return;
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `<h3>${category}</h3><span class="member-count">${members.length} membro${members.length > 1 ? 's' : ''}</span>`;
        slide.appendChild(categoryHeader);
        
        const membersGrid = document.createElement('div');
        membersGrid.className = 'members-grid';
        
        members.forEach(member => {
            membersGrid.appendChild(createMemberCard(member));
        });
        
        slide.appendChild(membersGrid);
        teamGrid.appendChild(slide);
    });
}

// Swiper instance
let swiperInstance = null;
let isPlaying = true;

// Initialize carousel
function initTeamCarousel() {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper not loaded!');
        return;
    }
    
    const swiperContainer = document.querySelector('.team-swiper');
    if (!swiperContainer) {
        console.error('Swiper container not found!');
        return;
    }
    
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    
    swiperInstance = new Swiper('.team-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '#carouselNext',
            prevEl: '#carouselPrev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
        },
        loop: true,
        grabCursor: true,
        effect: 'slide',
        speed: 600,
        autoHeight: true,
        on: {
            init: function() {
                console.log('Swiper initialized!');
                updateCategoryButtons(this.activeIndex);
            },
            slideChange: function() {
                updateCategoryButtons(this.activeIndex);
            },
            autoplayStart: function() {
                isPlaying = true;
                updatePlayPauseButton(true);
            },
            autoplayStop: function() {
                isPlaying = false;
                updatePlayPauseButton(false);
            }
        }
    });
    
    createCategoryNavigation();
    setupPlayPauseButton();
}

// Create category navigation
function createCategoryNavigation() {
    const categoryNav = document.getElementById('categoryNav');
    if (!categoryNav) return;
    
    const categories = ['👑 Liderança', '📊 Gestores', '💻 Programação', '🔧 Montagem', '📢 Marketing'];
    
    categoryNav.innerHTML = '';
    
    categories.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-nav-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => {
            if (swiperInstance) {
                swiperInstance.slideToLoop(index);
                document.querySelectorAll('.category-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
        categoryNav.appendChild(btn);
    });
}

function updateCategoryButtons(activeIndex) {
    const btns = document.querySelectorAll('.category-nav-btn');
    btns.forEach((btn, index) => {
        if (index === activeIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function setupPlayPauseButton() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (!playPauseBtn) return;
    
    playPauseBtn.addEventListener('click', () => {
        if (swiperInstance && swiperInstance.autoplay) {
            if (isPlaying) {
                swiperInstance.autoplay.stop();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                swiperInstance.autoplay.start();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        }
    });
}

function updatePlayPauseButton(playing) {
    const btn = document.getElementById('playPauseBtn');
    if (btn) {
        if (playing) {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            btn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

// Mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
}

// Form handlers
function initForms() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input) {
                input.placeholder = '✅ Inscrito!';
                input.value = '';
                setTimeout(() => input.placeholder = 'Seu e-mail', 2000);
            }
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .team-member, .sponsor-card, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing...');
    
    renderProjects();
    renderTeamMembers();
    
    setTimeout(() => {
        initTeamCarousel();
    }, 100);
    
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initForms();
    initScrollAnimations();
});

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (swiperInstance) {
            swiperInstance.update();
        }
    }, 250);
});