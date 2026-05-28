// Team members data
const teamMembers = [
    // Liderança
    {
        name: "João Souza",
        role: "Capitão",
        image: "assets/images/jao.webp",
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
    image: "assets/images/grabias.webp",  // ← remove o src=
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
        name: "Felipe Santos",
        role: "Membro de Programação",
        image: "assets/images/felipe.webp",
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

// Render team members
function renderTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    
    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <div class="member-social">
                <a href="${member.social.linkedin}"><i class="fab fa-linkedin"></i></a>
                <a href="${member.social.github}"><i class="fab fa-github"></i></a>
            </div>
        `;
        teamGrid.appendChild(memberCard);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTeamMembers();
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // You can integrate with your email service here
            showNewsletterSuccess(emailInput);
        }
    });
}

function showNewsletterSuccess(input) {
    const originalPlaceholder = input.placeholder;
    input.placeholder = "Inscrito com sucesso!";
    input.value = '';
    
    setTimeout(() => {
        input.placeholder = originalPlaceholder;
    }, 3000);
}

// Animation on scroll (simple fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project-card, .team-member, .sponsor-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
