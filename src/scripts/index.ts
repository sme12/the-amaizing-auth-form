import Form from './components/form';

export const app = {
    initForm(): void {
        const element: HTMLFormElement | null = document.querySelector(
            '.js-form'
        );
        if (element) new Form(element);
    },
};

export const bootstrapApp = (): void => {
    Object.keys(app).forEach((appItem) => {
        app[appItem]();
    });
};

bootstrapApp();
