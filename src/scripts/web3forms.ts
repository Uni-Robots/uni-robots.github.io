// Envio de formulários pelo Web3Forms (https://web3forms.com).
// As access keys são públicas por design: só permitem enviar para o e-mail cadastrado.
import spinnerSvg from '../icons/spinner.svg?raw';

const ENDPOINT = 'https://api.web3forms.com/submit';

export const ACCESS_KEYS = {
    contato: '4593f6f1-6990-4e36-b3f1-e3da349f372e', // formulário de contato e newsletter
    patrocinio: '94497f20-3275-4881-8932-580120d73607',
} as const;

export const SPINNER_HTML = `<i class="icon icon-spin" aria-hidden="true">${spinnerSvg}</i>`;

interface Options {
    accessKey: string;
    /** Assunto do e-mail; recebe os campos do formulário. */
    subject?: (data: FormData) => string;
    /** Conteúdo do botão enquanto envia. */
    busyHTML: string;
    onSuccess: (form: HTMLFormElement) => void;
}

const FALLBACK = 'Tente de novo ou escreva para equipe.unirobot@gmail.com.';

/** Mostra o erro no elemento role="status" do formulário (ou num alerta, se não houver). */
function showError(form: HTMLFormElement, what: string) {
    const status = form.querySelector<HTMLElement>('[role="status"]');
    const message = `${what} ${FALLBACK}`;
    if (status) {
        status.textContent = message;
        status.classList.add('erro');
    } else {
        alert(message);
    }
}

/** Intercepta o submit do formulário e envia para o Web3Forms. Não faz nada se o form não existir. */
export function handleWeb3Form(form: HTMLFormElement | null, { accessKey, subject, busyHTML, onSuccess }: Options) {
    if (!form) return;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!button) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        data.append('access_key', accessKey);
        if (subject) data.append('subject', subject(data));

        const original = button.innerHTML;
        const status = form.querySelector<HTMLElement>('[role="status"]');
        if (status) {
            status.textContent = '';
            status.classList.remove('erro');
        }
        button.innerHTML = busyHTML;
        button.disabled = true;
        try {
            const response = await fetch(ENDPOINT, { method: 'POST', body: data });
            const result = await response.json().catch(() => ({}));
            if (response.ok) {
                onSuccess(form);
            } else {
                showError(form, `O envio foi recusado (${result.message ?? response.status}).`);
            }
        } catch {
            showError(form, 'Sem conexão com o serviço de envio.');
        } finally {
            button.innerHTML = original;
            button.disabled = false;
        }
    });
}
