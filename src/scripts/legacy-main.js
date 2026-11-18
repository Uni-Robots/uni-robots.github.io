// PONTE TEMPORÁRIA: restos de legacy/js/main.js (menu, modais, formulários, animações,
// easter egg). Equipe e projetos já vêm prontos do build (Fase 3). Dividido em módulos na Fase 5.
// ============================================
// UniRobot — script principal
// Cada init só roda se os elementos existirem
// na página atual (site multi-página).
// ============================================
// ============================================
// PROJETOS (página projetos.html) + Easter Egg
// ============================================
// Os cards vêm prontos do build (src/content/projects.json); aqui só liga o easter egg.
function initSumoEasterEggs() {
    document.querySelectorAll('.project-card[data-easter-egg]').forEach(card => {
        const title = card.querySelector('h3')?.textContent ?? '';
        const description = card.querySelector('p')?.textContent ?? '';
        checkAndActivateSumoEasterEgg(card, title, description);
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
    img.src = '/assets/images/resenha.webp';
    img.alt = 'PROTOCOLO RESENHA ATIVADO';
    img.style.cssText = `max-width:100%;max-height:80vh;border-radius:20px;
        box-shadow:0 0 50px rgba(0,168,255,.5);border:3px solid #00a8ff;`;
    img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });

    const title = document.createElement('h2');
    title.textContent = '🔓 PROTOCOLO RESENHA ATIVADO! 🔓';
    title.style.cssText = `color:#00a8ff;margin-top:20px;font-family:var(--font-inter),sans-serif;
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
        display:flex;justify-content:center;align-items:center;animation:fadeIn .3s ease;font-family:var(--font-inter),sans-serif;`;

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

    document.querySelectorAll('.project-card, .team-member, .sponsor-card:not(.sponsor-slide), .social-card').forEach(el => {
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
        formData.append("access_key", "94497f20-3275-4881-8932-580120d73607");
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
        formData.append("access_key", "4593f6f1-6990-4e36-b3f1-e3da349f372e");

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
        formData.append("access_key", "4593f6f1-6990-4e36-b3f1-e3da349f372e");
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
    initSumoEasterEggs();

    initMobileMenu();
    initSmoothScroll();

    initSponsorModal();
    initSponsorFormModal();
    initContactForm();
    initNewsletterForm();

    initScrollAnimations();
});
