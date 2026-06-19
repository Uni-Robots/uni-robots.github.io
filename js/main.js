// Team members data
const teamMembers = [
    // Liderança
    {
        name: "João Souza",
        role: "Capitão",
        image: "assets/images/1 - lideranca/joao_not_white.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Matheus Torquato",
        role: "Vice-Capitão",
        image: "assets/images/1 - lideranca/Matheus S. Torquato - Vice-Capitão_.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Gestores
    {
        name: "Felipe Grabias",
        role: "Gestor de Montagem",
        image: "assets/images/2 - gestores/Felipe_Grabias_Szostak.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Gustavo Britto Triaquim",
        role: "Gestor de Eletrônica",
        image: "assets/images/2 - gestores/gustavo seguidor linha.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "João Pedro",
        role: "Gestor de Eletrônica",
        image: "assets/images/gestores/joao_pedro.webp",
        social: { linkedin: "#", github: "#" }
    },
    // Programação
    {
        name: "Adrian Netto",
        role: "Membro de Programação",
        image: "assets/images/3 - programacao/Adrian Netto - Programação.webp",
        social: { linkedin: "#", github: "#" }
    },  
    {
        name: "Bianca Millek",
        role: "Membro de Programação",
        image: "assets/images/3 - programacao/Bianca Millek - Programação.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Felipe Santos",
        role: "Membro de Programação",
        image: "assets/images/3 - programacao/felipe.webp",
        social: { linkedin: "#", github: "#" }
    },
   {
        name: "Lucas Guzatti",
        role: "Membro de Programação",
        image: "assets/images/3 - programacao/Lucas.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Jean Pierre Franz",
        role: "Membro de Programação",
        image: "assets/images/3 - programacao/Jean Pierre - Programação.webp",
        social: { linkedin: "#", github: "#" }
    },
    
    // Eletrônica
    {
        name: "Kauã da Silva",
        role: "Membro de Eletrônica",
        image: "assets/images/4 - eletronica/Kauã Ricardo - Eletronica.webp",
        social: { linkedin: "#", github: "#" }
    },    
    {
        name: "Maria Eduarda Wons",
        role: "Membro de Eletrônica",
        image: "assets/images/4 - eletronica/Maria Wons - Eletrônica.webp",
        social: { linkedin: "#", github: "#" }
    },

    // Engenharia


   {
        name: "Bruno Barbato",
        role: "Membro de Engenharia",
        image: "assets/images/5 - engenharia/Bruno Barbato - Engenharia.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Eduardo Riad",
        role: "Membro de Engenharia",
        image: "assets/images/5 - engenharia/Eduardo Riad - Engenharia.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Kauan Fiori",
        role: "Membro de Engenharia",
        image: "assets/images/5 - engenharia/Kauan Fiori - Engenharia.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Lorenzo Riboli",
        role: "Membro de Engenharia",
        image: "assets/images/5 - engenharia/Lorenzo de Souza Riboli - Montagem.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Poliane Sampaio",
        role: "Membro de Montagem",
        image: "assets/images/6 - mecanica/poli.webp",
        social: { linkedin: "#", github: "#" }
    },
  
    // Mecanica

    {
        name: "Caio André",
        role: "Membro de Mecânica",
        image: "assets/images/6 - mecanica/Caio André - Mecânica.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Marina Cardoso",
        role: "Membro de Mecânica",
        image: "assets/images/6 - mecanica/Marina - Mecânica.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Pamela da Silva Machado",
        role: "Membro de Mecânica",
        image: "assets/images/6 - mecanica/Pamela - Mecânica.webp",
        social: { linkedin: "#", github: "#" }
    },
    
    // Marketing
     {
        name: "Jhiury",
        role: "Membro de Marketing",
        image: "assets/images/7 - marketing/Jhiury- marketing_.webp",
        social: { linkedin: "#", github: "#" }
    },
     {
        name: "Mariana",
        role: "Membro de Marketing",
        image: "assets/images/7 - marketing/Mariana - Marketing.webp",
        social: { linkedin: "#", github: "#" }
    },
    {
        name: "Maycon Tateiwa",
        role: "Membro de Marketing",
        image: "assets/images/7 - marketing/Maycon Tateiwa - Marketing.webp",
        social: { linkedin: "#", github: "#" }
    }
];

// Projects data
const projects = [
    {
        title: "Pimpolho",
        description: "Seguidor de Linha",
        icon: "fas fa-shoe-prints",
        category: "seguidor"
    },
    {
        title: "Hockey League",
        description: "Hockey Micro",
        icon: "fas fa-hockey-puck",
        category: "hockey"
    },
    {
        title: "Tribagual",
        description: "Sumô Mini 500g (Auto)",
        icon: "fas fa-dumbbell",
        category: "sumo"
    },
    {
        title: "Taz",
        description: "Sumô Lego 1kg (Auto)",
        icon: "fas fa-cubes",
        category: "sumo"
    },
    {
        title: "Uninho",
        description: "Sumô Lego 1kg (Auto)",
        icon: "fas fa-cubes",
        category: "sumo"
    },
    {
        title: "Perry o Ornintorrinco",
        description: "Artbot",
        icon: "fas fa-paintbrush",
        category: "artbot"
    }
];

// EASTER EGG: Protocolo Resenha
let protocoloResenhaAtivo = false;

// Função para tocar som de easter egg
function playEasterEggSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
        oscillator.stop(audioContext.currentTime + 1);
        
        audioContext.resume();
    } catch(e) {
        console.log('Áudio não suportado');
    }
}

// Função para ativar o Protocolo Resenha
function ativarProtocoloResenha() {
    protocoloResenhaAtivo = true;
    
    const modal = document.createElement('div');
    modal.id = 'protocoloResenhaModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
        cursor: pointer;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        text-align: center;
        animation: zoomIn 0.3s ease;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = document.createElement('img');
    img.src = 'assets/images/resenha.webp';
    img.alt = 'PROTOCOLO RESENHA ATIVADO';
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 20px;
        box-shadow: 0 0 50px rgba(0,168,255,0.5);
        border: 3px solid #00a8ff;
    `;
    
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/800x600/00a8ff/ffffff?text=PROTOCOLO+RESENHA+ATIVADO!';
    };
    
    const title = document.createElement('h2');
    title.textContent = '🔓 PROTOCOLO RESENHA ATIVADO! 🔓';
    title.style.cssText = `
        color: #00a8ff;
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 0 10px rgba(0,168,255,0.5);
        animation: pulse 1s ease infinite;
    `;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Clique em qualquer lugar para fechar';
    subtitle.style.cssText = `
        color: #fff;
        margin-top: 10px;
        font-size: 14px;
        opacity: 0.8;
    `;
    
    content.appendChild(img);
    content.appendChild(title);
    content.appendChild(subtitle);
    modal.appendChild(content);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    modal.addEventListener('click', () => {
        modal.remove();
        protocoloResenhaAtivo = false;
        
        const toast = document.createElement('div');
        toast.textContent = '⚡ Protocolo Resenha desativado ⚡';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00a8ff, #9c88ff);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    });
    
    document.body.appendChild(modal);
    playEasterEggSound();
    
    console.log('%c🔥 PROTOCOLO RESENHA ATIVADO! 🔥', 'color: #00a8ff; font-size: 20px; font-weight: bold;');
    console.log('%cVocê encontrou o Easter Egg!', 'color: #9c88ff; font-size: 14px;');
}

// Função para verificar e ativar easter egg em projetos de sumô
function checkAndActivateSumoEasterEgg(projectElement, projectTitle, projectDescription) {
    const isSumo = projectTitle.toLowerCase().includes('sumô') || 
                   projectTitle.toLowerCase().includes('sumo') ||
                   projectDescription.toLowerCase().includes('sumô') ||
                   projectDescription.toLowerCase().includes('sumo');
    
    if (isSumo) {
        projectElement.style.cursor = 'pointer';
        projectElement.classList.add('sumo-project');
        
        const tooltip = document.createElement('div');
        tooltip.className = 'sumo-tooltip';
        tooltip.textContent = '🥋 Clique para ativar PROTOCOLO RESENHA 🥋';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00a8ff, #9c88ff);
            color: white;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            margin-bottom: 10px;
            z-index: 10;
        `;
        projectElement.style.position = 'relative';
        projectElement.appendChild(tooltip);
        
        projectElement.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        projectElement.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
        
        projectElement.addEventListener('click', (e) => {
            e.stopPropagation();
            showCustomDialog(projectTitle);
        });
    }
}

// Função para mostrar diálogo personalizado
function showCustomDialog(projectTitle) {
    const dialogOverlay = document.createElement('div');
    dialogOverlay.id = 'customDialog';
    dialogOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    const dialogBox = document.createElement('div');
    dialogBox.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: zoomIn 0.3s ease;
        border: 2px solid #00a8ff;
        box-shadow: 0 0 30px rgba(0,168,255,0.3);
    `;
    
    const emoji = document.createElement('div');
    emoji.textContent = '🥋🤖';
    emoji.style.cssText = `font-size: 50px; margin-bottom: 20px;`;
    
    const title = document.createElement('h3');
    title.textContent = `"${projectTitle}"`;
    title.style.cssText = `color: #00a8ff; margin-bottom: 15px; font-size: 1.3rem;`;
    
    const question = document.createElement('p');
    question.textContent = 'Deseja ativar o PROTOCOLO RESENHA?';
    question.style.cssText = `color: white; margin-bottom: 25px; font-size: 1.1rem;`;
    
    const warning = document.createElement('p');
    warning.textContent = '⚠️ Isso vai liberar a resenha máxima! ⚠️';
    warning.style.cssText = `color: #ff9500; margin-bottom: 25px; font-size: 0.9rem; font-weight: bold;`;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.cssText = `display: flex; gap: 15px; justify-content: center;`;
    
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '✅ SIM, ATIVAR!';
    confirmBtn.style.cssText = `
        background: linear-gradient(135deg, #00a8ff, #9c88ff);
        border: none;
        padding: 12px 24px;
        border-radius: 50px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    `;
    confirmBtn.onmouseenter = () => confirmBtn.style.transform = 'scale(1.05)';
    confirmBtn.onmouseleave = () => confirmBtn.style.transform = 'scale(1)';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '❌ NÃO, CANCELAR';
    cancelBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #ff3b30;
        padding: 12px 24px;
        border-radius: 50px;
        color: #ff3b30;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    `;
    cancelBtn.onmouseenter = () => cancelBtn.style.transform = 'scale(1.05)';
    cancelBtn.onmouseleave = () => cancelBtn.style.transform = 'scale(1)';
    
    buttonsDiv.appendChild(confirmBtn);
    buttonsDiv.appendChild(cancelBtn);
    
    dialogBox.appendChild(emoji);
    dialogBox.appendChild(title);
    dialogBox.appendChild(question);
    dialogBox.appendChild(warning);
    dialogBox.appendChild(buttonsDiv);
    dialogOverlay.appendChild(dialogBox);
    
    document.body.appendChild(dialogOverlay);
    
    confirmBtn.addEventListener('click', () => {
        dialogOverlay.remove();
        ativarProtocoloResenha();
    });
    
    cancelBtn.addEventListener('click', () => {
        dialogOverlay.remove();
        const toast = document.createElement('div');
        toast.textContent = '❌ Protocolo Resenha cancelado ❌';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ff3b30;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
    
    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            dialogOverlay.remove();
        }
    });
}

// Render projects com Easter Egg
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
        checkAndActivateSumoEasterEgg(projectCard, project.title, project.description);
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
            <img 
                src="${member.image}" 
                alt="${member.name}" 
                loading="lazy"
                decoding="async"
                onerror="this.src='https://via.placeholder.com/300/${placeholderColor}/ffffff?text=${member.name.charAt(0)}'; this.onerror=null;"
            >
        </div>

        <div class="member-content">
            <h3>${member.name}</h3>
            <p>${member.role}</p>

            <div class="member-social">
                <a href="${member.social.linkedin}" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>

                <a href="${member.social.github}" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    `;

    // Atualiza swiper quando imagem carregar
    const img = memberCard.querySelector('img');

    img.addEventListener('load', () => {
        if (swiperInstance) {
            swiperInstance.update();
        }
    });

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
        '👨‍💻 Programação': teamMembers.filter(m => m.role === 'Membro de Programação'),
        '🔌 Eletrônica': teamMembers.filter(m => m.role === 'Membro de Eletrônica'),
        '⚙️ Engenharia': teamMembers.filter(m => m.role === 'Membro de Engenharia'),
        '🔧 Mecânica': teamMembers.filter(m => m.role === 'Membro de Mecânica'),
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
    
    // Destroy anterior
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    
    swiperInstance = new Swiper('.team-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,

        // IMPORTANTE
        autoHeight: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,

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

        on: {
            init: function () {
                console.log('Swiper initialized!');
                updateCategoryButtons(this.realIndex);

                setTimeout(() => {
                    this.update();
                }, 300);
            },

            slideChange: function () {
                updateCategoryButtons(this.realIndex);
            },

            autoplayStart: function () {
                isPlaying = true;
                updatePlayPauseButton(true);
            },

            autoplayStop: function () {
                isPlaying = false;
                updatePlayPauseButton(false);
            },

            imagesReady: function () {
                this.update();
            },

            resize: function () {
                this.update();
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
    
    const categories = ['👑 Liderança', '📊 Gestores', '👨‍💻 Programação', '🔌 Eletrônica', '⚙️ Engenharia', '🔧 Mecânica', '📢 Marketing'];
    
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

// ============================================
// MODAL DE PATROCÍNIO
// ============================================

// Abrir modal de patrocínio
function initSponsorModal() {
    const modal = document.getElementById('sponsorModal');
    const openBtn = document.getElementById('openSponsorModalBtn');
    const closeBtn = document.querySelector('.sponsor-modal-close');
    
    if (!modal || !openBtn) return;
    
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Formulário de Patrocínio (modal)
// Access Key: 5bbfcdd2-4d92-440a-bb30-d57ddc83c682
function initSponsorFormModal() {
    const form = document.getElementById('sponsorForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        formData.append("access_key", "5bbfcdd2-4d92-440a-bb30-d57ddc83c682");
        
        const sponsorTier = formData.get('sponsor_tier');
        const companyName = formData.get('name');
        formData.append("subject", `Patrocínio - ${sponsorTier} - ${companyName}`);
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("🎉 Proposta de patrocínio enviada com sucesso! Entraremos em contato em breve.");
                form.reset();
                
                const modal = document.getElementById('sponsorModal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (error) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// FORMULÁRIO DE CONTATO
// Access Key: bfad3ab4-fcfe-4bf0-900c-5eba22770020
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        formData.append("access_key", "bfad3ab4-fcfe-4bf0-900c-5eba22770020");
        
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.");
                form.reset();
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (error) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// NEWSLETTER (footer)
// Access Key: 5bbfcdd2-4d92-440a-bb30-d57ddc83c682
// ============================================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        formData.append("access_key", "5bbfcdd2-4d92-440a-bb30-d57ddc83c682");
        formData.append("subject", "Newsletter - Novo inscrito");
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok) {
                const input = form.querySelector('input');
                input.placeholder = '✅ Inscrito com sucesso!';
                input.value = '';
                
                const successMsg = document.createElement('div');
                successMsg.textContent = '✅ Inscrito com sucesso!';
                successMsg.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #4cd964;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: bold;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
                setTimeout(() => input.placeholder = 'Seu e-mail', 3000);
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (error) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
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
    console.log('%c🥋 EASTER EGG: Clique nos projetos de SUMÔ para ativar o PROTOCOLO RESENHA! 🥋', 'color: #ff9500; font-size: 14px; font-weight: bold;');
    console.log('%c📧 Formulários configurados com Web3Forms!', 'color: #00a8ff; font-size: 12px;');
    console.log('%c📧 Patrocínio Access Key: 5bbfcdd2-4d92-440a-bb30-d57ddc83c682', 'color: #4cd964; font-size: 11px;');
    console.log('%c📧 Contato Access Key: bfad3ab4-fcfe-4bf0-900c-5eba22770020', 'color: #ff9500; font-size: 11px;');
    
    renderProjects();
    renderTeamMembers();
    
    setTimeout(() => {
        initTeamCarousel();
    }, 100);
    
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    
    // Inicializar formulários
    initSponsorModal();      // Modal de patrocínio
    initSponsorFormModal();  // Formulário do modal de patrocínio
    initContactForm();       // Formulário de contato
    initNewsletterForm();    // Newsletter do footer
    
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
