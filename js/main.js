// ============================================
// UniRobot — script principal
// Cada init só roda se os elementos existirem
// na página atual (site multi-página).
// ============================================
// x
// --- Dados da equipe ---
const teamMembers = [
    // Liderança
    { name: "João Souza",             role: "Capitão",               image: "assets/images/team/joao-souza.webp" },
    { name: "Matheus Torquato",       role: "Vice-Capitão",          image: "assets/images/team/matheus-torquato.webp" },
    // Gestores
    { name: "Felipe Grabias",         role: "Gestor de Montagem",    image: "assets/images/team/felipe-grabias.webp" },
    { name: "Gustavo Britto Triaquim",role: "Gestor de Eletrônica",  image: "assets/images/team/gustavo-britto.webp" },
    { name: "João Pedro",             role: "Gestor de Eletrônica",  image: "assets/images/team/joao-pedro.webp" },
    // Programação
    { name: "Adrian Netto",           role: "Membro de Programação", image: "assets/images/team/adrian-netto.webp" },
    { name: "Bianca Millek",          role: "Membro de Programação", image: "assets/images/team/bianca-millek.webp" },
    
    // Modelo para add links de contato
    //{ name: "Felipe Santos",          role: "Membro de Programação", image: "assets/images/team/felipe-santos.webp", linkedin: "https://www.linkedin.com/in/oofelipesantos/", github: "https://github.com/felipe-santos-tech" },
    
    { name: "Felipe Santos",          role: "Membro de Programação", image: "assets/images/team/felipe-santos.webp", linkedin: "https://www.linkedin.com/in/oofelipesantos/", github: "https://github.com/felipe-santos-tech" },
    { name: "Lucas Guzatti",          role: "Membro de Programação", image: "assets/images/team/lucas-guzatti.webp" },
    { name: "Jean Pierre Franz",      role: "Membro de Programação", image: "assets/images/team/jean-pierre.webp" },
    // Eletrônica
    { name: "Kauã da Silva",          role: "Membro de Eletrônica",  image: "assets/images/team/kaua-silva.webp" },
    { name: "Maria Eduarda Wons",     role: "Membro de Eletrônica",  image: "assets/images/team/maria-wons.webp" },
    // Montagem (Engenharia + Mecânica)
    { name: "Bruno Barbato",          role: "Membro de Montagem",    image: "assets/images/team/bruno-barbato.webp" },
    { name: "Eduardo Riad",           role: "Membro de Montagem",    image: "assets/images/team/eduardo-riad.webp" },
    { name: "Kauan Fiori",            role: "Membro de Montagem",    image: "assets/images/team/kauan-fiori.webp" },
    { name: "Lorenzo Riboli",         role: "Membro de Montagem",    image: "assets/images/team/lorenzo-riboli.webp" },
    { name: "Poliane Sampaio",        role: "Membro de Montagem",    image: "assets/images/team/Poli Sampaio - Engenharia.webp" },
    { name: "Caio André",             role: "Membro de Montagem",    image: "assets/images/team/caio-andre.webp" },
    { name: "Maria Vitória",          role: "Membro de Montagem",    image: "assets/images/team/maria-vitoria.webp" },
    { name: "Marina Cardoso",         role: "Membro de Montagem",    image: "assets/images/team/marina-cardoso.webp" },
    { name: "Pamela da Silva Machado",role: "Membro de Montagem",    image: "assets/images/team/pamela-machado.webp" },
    // Marketing
    { name: "Jhiury",                 role: "Membro de Marketing",   image: "assets/images/team/jhiury.webp" },
    { name: "Mariana",                role: "Membro de Marketing",   image: "assets/images/team/mariana.webp" },
    { name: "Maycon Tateiwa",         role: "Membro de Marketing",   image: "assets/images/team/maycon-tateiwa.webp" }
];

// Categorias (Montagem reúne Engenharia + Mecânica)
const teamCategories = [
    { id: 'lideranca',   label: '👑 Liderança',    test: r => r === 'Capitão' || r === 'Vice-Capitão' },
    { id: 'gestores',    label: '📊 Gestores',     test: r => r.includes('Gestor') },
    { id: 'programacao', label: '👨‍💻 Programação', test: r => r === 'Membro de Programação' },
    { id: 'eletronica',  label: '🔌 Eletrônica',   test: r => r === 'Membro de Eletrônica' },
    { id: 'montagem',    label: '🛠️ Montagem',     test: r => ['Membro de Montagem','Membro de Engenharia','Membro de Mecânica'].includes(r) },
    { id: 'marketing',   label: '📢 Marketing',    test: r => r === 'Membro de Marketing' }
];

// --- Dados dos projetos ---
const projects = [
    { title: "Pimpolho",             description: "Seguidor de Linha",     icon: "fas fa-shoe-prints" },
    { title: "Hockey League",        description: "Hockey Micro",          icon: "fas fa-hockey-puck" },
    { title: "Tribagual",            description: "Sumô Mini 500g (Auto)", icon: "fas fa-dumbbell" },
    { title: "Taz",                  description: "Sumô Lego 1kg (Auto)",  icon: "fas fa-cubes" },
    { title: "Uninho",               description: "Sumô Lego 1kg (Auto)",  icon: "fas fa-cubes" },
    { title: "Perry o Ornintorrinco",description: "Artbot",                icon: "fas fa-paintbrush" }
];

// Avatar local de fallback (SVG inline — não depende de internet)
function fallbackAvatar(initial) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#00a8ff"/><stop offset="1" stop-color="#9c88ff"/>
        </linearGradient></defs>
        <rect width="300" height="300" fill="url(#g)"/>
        <text x="150" y="150" font-family="Arial" font-size="130" font-weight="bold"
              fill="#fff" text-anchor="middle" dominant-baseline="central">${initial}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ============================================
// EQUIPE (página equipe.html)
// ============================================
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'team-member';

    const img = document.createElement('img');
    img.src = member.image;
    img.alt = member.name;
    img.loading = 'lazy';
    img.decoding = 'async';

    img.addEventListener('error', () => {
        img.src = fallbackAvatar(member.name.charAt(0));
    }, { once: true });

    const imgWrap = document.createElement('div');
    imgWrap.className = 'member-image';
    imgWrap.appendChild(img);

    const content = document.createElement('div');
    content.className = 'member-content';

    const memberName = document.createElement('h3');
    memberName.textContent = member.name;

    const memberRole = document.createElement('p');
    memberRole.textContent = member.role;

    const social = document.createElement('div');
    social.className = 'member-social';

    // LinkedIn
    if (member.linkedin) {
        const linkedin = document.createElement('a');

        linkedin.href = member.linkedin;
        linkedin.target = '_blank';
        linkedin.rel = 'noopener noreferrer';
        linkedin.setAttribute(
            'aria-label',
            `LinkedIn de ${member.name}`
        );

        linkedin.innerHTML = '<i class="fab fa-linkedin"></i>';

        social.appendChild(linkedin);
    }

    // GitHub
    if (member.github) {
        const github = document.createElement('a');

        github.href = member.github;
        github.target = '_blank';
        github.rel = 'noopener noreferrer';
        github.setAttribute(
            'aria-label',
            `GitHub de ${member.name}`
        );

        github.innerHTML = '<i class="fab fa-github"></i>';

        social.appendChild(github);
    }

    content.appendChild(memberName);
    content.appendChild(memberRole);

    // Só mostra a área social se houver algum link
    if (social.children.length > 0) {
        content.appendChild(social);
    }

    card.appendChild(imgWrap);
    card.appendChild(content);

    return card;
}

function renderTeamMembers() {
    const container = document.getElementById('team-sections');
    if (!container) return;

    container.innerHTML = '';

    teamCategories.forEach(cat => {
        const members = teamMembers.filter(m => cat.test(m.role));
        if (!members.length) return;

        const section = document.createElement('div');
        section.className = 'team-category';
        section.id = 'cat-' + cat.id;

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `<h3></h3><span class="member-count"></span>`;
        header.querySelector('h3').textContent = cat.label;
        header.querySelector('.member-count').textContent =
            `${members.length} membro${members.length > 1 ? 's' : ''}`;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'members-grid';
        members.forEach(m => grid.appendChild(createMemberCard(m)));
        section.appendChild(grid);

        container.appendChild(section);
    });
}

function createCategoryNavigation() {
    const nav = document.getElementById('categoryNav');
    if (!nav) return;

    nav.innerHTML = '';
    const present = teamCategories.filter(c => teamMembers.some(m => c.test(m.role)));

    present.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-nav-btn';
        btn.textContent = cat.label;
        btn.dataset.target = 'cat-' + cat.id;
        btn.addEventListener('click', () => {
            const el = document.getElementById('cat-' + cat.id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        nav.appendChild(btn);
    });

    const first = nav.querySelector('.category-nav-btn');
    if (first) first.classList.add('active');

    const sections = present.map(c => document.getElementById('cat-' + c.id)).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll('.category-nav-btn').forEach(b =>
                        b.classList.toggle('active', b.dataset.target === e.target.id));
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
        sections.forEach(s => spy.observe(s));
    }
}

// ============================================
// PROJETOS (página projetos.html) + Easter Egg
// ============================================
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-icon"><i class="${project.icon}"></i></div>
            <h3></h3><p></p>`;
        card.querySelector('h3').textContent = project.title;
        card.querySelector('p').textContent = project.description;
        grid.appendChild(card);
        checkAndActivateSumoEasterEgg(card, project.title, project.description);
    });
}

function checkAndActivateSumoEasterEgg(el, title, description) {
    const isSumo = (title + ' ' + description).toLowerCase().includes('sum');
    if (!isSumo) return;

    el.style.cursor = 'pointer';
    el.classList.add('sumo-project');

    const tooltip = document.createElement('div');
    tooltip.className = 'sumo-tooltip';
    tooltip.textContent = '🥋 Clique para ativar PROTOCOLO RESENHA 🥋';
    tooltip.style.cssText = `position:absolute;bottom:100%;left:50%;transform:translateX(-50%);
        background:linear-gradient(135deg,#00a8ff,#9c88ff);color:#fff;padding:5px 10px;border-radius:10px;
        font-size:12px;white-space:nowrap;opacity:0;transition:opacity .3s;pointer-events:none;
        margin-bottom:10px;z-index:10;`;
    el.style.position = 'relative';
    el.appendChild(tooltip);
    el.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    el.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
    el.addEventListener('click', e => { e.stopPropagation(); showCustomDialog(title); });
}

function playEasterEggSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880; gain.gain.value = 0.3;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
        osc.stop(ctx.currentTime + 1);
        ctx.resume();
    } catch (e) { /* áudio não suportado */ }
}

function ativarProtocoloResenha() {
    const modal = document.createElement('div');
    modal.id = 'protocoloResenhaModal';
    modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:10000;
        display:flex;justify-content:center;align-items:center;animation:fadeIn .3s ease;cursor:pointer;`;

    const content = document.createElement('div');
    content.style.cssText = 'text-align:center;animation:zoomIn .3s ease;max-width:90%;max-height:90%;';

    const img = document.createElement('img');
    img.src = 'assets/images/resenha.webp';
    img.alt = 'PROTOCOLO RESENHA ATIVADO';
    img.style.cssText = `max-width:100%;max-height:80vh;border-radius:20px;
        box-shadow:0 0 50px rgba(0,168,255,.5);border:3px solid #00a8ff;`;
    img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });

    const title = document.createElement('h2');
    title.textContent = '🔓 PROTOCOLO RESENHA ATIVADO! 🔓';
    title.style.cssText = `color:#00a8ff;margin-top:20px;font-family:'Inter',sans-serif;
        text-shadow:0 0 10px rgba(0,168,255,.5);animation:pulse 1s ease infinite;`;

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Clique em qualquer lugar para fechar';
    subtitle.style.cssText = 'color:#fff;margin-top:10px;font-size:14px;opacity:.8;';

    content.append(img, title, subtitle);
    modal.appendChild(content);
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
    playEasterEggSound();
}

function showCustomDialog(projectTitle) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:10001;
        display:flex;justify-content:center;align-items:center;animation:fadeIn .3s ease;font-family:'Inter',sans-serif;`;

    const box = document.createElement('div');
    box.style.cssText = `background:linear-gradient(135deg,#1a1a2e,#0f0f1a);border-radius:20px;padding:30px;
        max-width:400px;width:90%;text-align:center;animation:zoomIn .3s ease;border:2px solid #00a8ff;
        box-shadow:0 0 30px rgba(0,168,255,.3);`;

    box.innerHTML = `
        <div style="font-size:50px;margin-bottom:20px;">🥋🤖</div>
        <h3 style="color:#00a8ff;margin-bottom:15px;font-size:1.3rem;"></h3>
        <p style="color:#fff;margin-bottom:25px;font-size:1.1rem;">Deseja ativar o PROTOCOLO RESENHA?</p>
        <div style="display:flex;gap:15px;justify-content:center;">
            <button id="resenhaSim" style="background:linear-gradient(135deg,#00a8ff,#9c88ff);border:none;
                padding:12px 24px;border-radius:50px;color:#fff;font-weight:bold;cursor:pointer;">✅ SIM, ATIVAR!</button>
            <button id="resenhaNao" style="background:rgba(255,255,255,.1);border:1px solid #ff3b30;
                padding:12px 24px;border-radius:50px;color:#ff3b30;font-weight:bold;cursor:pointer;">❌ CANCELAR</button>
        </div>`;
    box.querySelector('h3').textContent = `"${projectTitle}"`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    box.querySelector('#resenhaSim').addEventListener('click', () => { overlay.remove(); ativarProtocoloResenha(); });
    box.querySelector('#resenhaNao').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ============================================
// NAVEGAÇÃO / UI
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

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

// Suaviza apenas âncoras internas da MESMA página (links entre páginas seguem normal)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Animação de entrada dos cards
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // anima uma vez só
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card, .team-member, .sponsor-card, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// FORMULÁRIOS (Web3Forms)
// ============================================
function initSponsorModal() {
    const modal = document.getElementById('sponsorModal');
    const openBtn = document.getElementById('openSponsorModalBtn');
    const closeBtn = document.querySelector('.sponsor-modal-close');
    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    if (closeBtn) closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
    window.addEventListener('click', e => {
        if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none'; document.body.style.overflow = '';
        }
    });
}

function initSponsorFormModal() {
    const form = document.getElementById('sponsorForm');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("access_key", "5bbfcdd2-4d92-440a-bb30-d57ddc83c682");
        formData.append("subject", `Patrocínio - ${formData.get('sponsor_tier')} - ${formData.get('name')}`);

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await response.json();
            if (response.ok) {
                alert("🎉 Proposta de patrocínio enviada com sucesso! Entraremos em contato em breve.");
                form.reset();
                const modal = document.getElementById('sponsorModal');
                if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (err) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("access_key", "bfad3ab4-fcfe-4bf0-900c-5eba22770020");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await response.json();
            if (response.ok) {
                alert("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.");
                form.reset();
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (err) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("access_key", "5bbfcdd2-4d92-440a-bb30-d57ddc83c682");
        formData.append("subject", "Newsletter - Novo inscrito");

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await response.json();
            if (response.ok) {
                const input = form.querySelector('input');
                input.value = '';
                input.placeholder = '✅ Inscrito com sucesso!';
                setTimeout(() => input.placeholder = 'Seu e-mail', 3000);
            } else {
                alert("❌ Erro: " + data.message);
            }
        } catch (err) {
            alert("❌ Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTeamMembers();
    createCategoryNavigation();

    initMobileMenu();
    initSmoothScroll();

    initSponsorModal();
    initSponsorFormModal();
    initContactForm();
    initNewsletterForm();

    initScrollAnimations();
});
