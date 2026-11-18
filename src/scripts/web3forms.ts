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
        button.innerHTML = busyHTML;
        button.disabled = true;
        try {
            const response = await fetch(ENDPOINT, { method: 'POST', body: data });
            const result = await response.json();
            if (response.ok) {
                onSuccess(form);
            } else {
                alert('❌ Erro: ' + result.message);
            }
        } catch {
            alert('❌ Algo deu errado. Tente novamente.');
        } finally {
            button.innerHTML = original;
            button.disabled = false;
        }
    });
}
