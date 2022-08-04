import ButtonController from '../../controller/button-controller';
// import { Data } from '../../types/types';

class Button{
    name: string;
    controller: ButtonController;
    button: HTMLButtonElement;
    constructor(name: string) {
        this.name = name;
        this.controller = new ButtonController(name);

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.textContent = name;
        this.button = button;
    }

    init(parentNode: Element) {
        this.setListeners();
        parentNode.append(this.button);
    }

    setListeners() {
        this.button.onclick = () => {
            this.controller.submit({ name: this.name });
            this.controller.broadcast({ name: this.name });
        }
    }

    destroy() {
        this.button.remove();
    }
}

export default Button;
