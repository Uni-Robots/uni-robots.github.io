// Animação de entrada dos cards ao rolar a página.
// O estado inicial (escondido) vem do CSS via classe `js-reveal` no <html>, posta por um script
// inline no <head> antes da primeira pintura — por isso os cards não "piscam" ao carregar.
// Ver a seção "Animação de entrada" em src/styles/main.css.
const SELECTOR = '.project-card, .team-member, .social-card';

declare global {
    interface Window {
        __revealReady?: boolean;
    }
}

window.__revealReady = true;

const observer = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            observer.unobserve(el); // anima uma vez só
            // `revealing` liga a transição de entrada só durante a animação; depois o card
            // volta à transição do próprio CSS (e o efeito de hover funciona).
            el.classList.add('revealed', 'revealing');
            setTimeout(() => el.classList.remove('revealing'), 650);
        }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
);

document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));

export {};
