export default class Form {
    private form: HTMLFormElement;
    private inputs: HTMLInputElement[];

    constructor(form: HTMLFormElement) {
        this.form = form;
        this.inputs = Array.from(form.querySelectorAll('input'));

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputInput = this.onInputInput.bind(this);

        this.init();
    }

    private setOrUnsetDirty(input: HTMLInputElement) {
        if (input.value) {
            input.classList.add('is-dirty');
            return;
        }
        input.classList.remove('is-dirty');
    }

    private handleValidation(input: HTMLInputElement) {
        const requiredMessage: string | undefined =
            input.dataset.requiredMessage;
        const patternMessage: string | undefined = input.dataset.patternMessage;

        const messageElement: HTMLElement | null = this.form.querySelector(
            `[data-message-for=${input.name}]`
        );

        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            if (messageElement) messageElement.innerText = '';
            return;
        }
        input.classList.add('is-invalid');
        for (const validation in input.validity) {
            if (input.validity[validation]) {
                switch (validation) {
                    case 'patternMismatch':
                        if (messageElement)
                            messageElement.innerText = patternMessage || '';
                        break;
                    case 'valueMissing':
                        if (messageElement)
                            messageElement.innerText = requiredMessage || '';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    private dispatchSubmit() {
        const event = new CustomEvent('auth-form:submit', {
            bubbles: true,
            detail: new FormData(this.form),
        });
        this.form.dispatchEvent(event);
        console.log(event);
    }

    private onInputChange(event) {
        const input = event.target;
        this.setOrUnsetDirty(input);
        this.handleValidation(input);
    }

    private onInputInput(event) {
        const input = event.target;
        if (input.classList.contains('is-invalid')) {
            this.handleValidation(input);
        }
    }

    private onSubmit(event) {
        event.preventDefault();

        this.inputs.forEach((input) => {
            this.handleValidation(input);
        });
        if (!this.form.checkValidity()) {
            return;
        }
        this.dispatchSubmit();
    }

    private init(): void {
        this.form.addEventListener('submit', this.onSubmit);
        this.inputs.forEach((input) => {
            input.addEventListener('change', this.onInputChange);
            input.addEventListener('input', this.onInputInput);
        });
    }
}
