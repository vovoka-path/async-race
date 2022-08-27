import ButtonController from '../../controller/button-controller';
import Observer from '../../controller/observer';
import { ObserverFunction } from '../../types/types';

class Button extends Observer {
    name: string;
    id: string;
    controller: ButtonController;
    button: HTMLButtonElement;
    callback: ObserverFunction;
    constructor(name: string, id?: string) {
        super();
        this.name = name;
        this.id = id ? id : '';
        this.controller = new ButtonController(name, this.id);
        this.button = this.getHTMLButtonElement();
        this.callback = () => null;
    }

    init(parentNode: Element) {
        this.setListeners();
        parentNode.append(this.button);
    }

    setCallback(cb: ObserverFunction) {
        this.callback = cb;
    }

    toggleActive() {
        this.button.classList.toggle('not-active');
        this.button.disabled = this.button.classList.contains('not-active') ? true : false;
    }

    private setListeners() {
        this.button.onclick = () => {
            this.controller.submit();
            this.controller.broadcast(this.name);
        };
    }

    private getHTMLButtonElement() {
        const button = document.createElement('button');
        button.className = `button button-${this.name}`;
        button.setAttribute('type', 'button');
        button.setAttribute('id', this.name);
        button.setAttribute('name', this.name);
        button.textContent = this.name;

        if (this.name === 'stop') {
            button.classList.add('not-active');
        }

        return button;
    }
}

export default Button;
