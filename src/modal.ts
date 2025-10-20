export class Modal {
    private container: HTMLElement;

    constructor(containerSelector: string = '#modal-root') {
        const container = document.querySelector(containerSelector);
        if (!container) {
            const div = document.createElement('div');
            div.id = containerSelector.replace('#', '');
            document.body.appendChild(div);
            this.container = div;
        } else {
            this.container = container as HTMLElement;
        }
    }

    show(message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info'): void {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.role = 'alert';
        alertDiv.textContent = message;
        this.container.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
}