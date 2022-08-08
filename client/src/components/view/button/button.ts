import ButtonController from '../../controller/button-controller';
import { ObserverFunction } from '../../types/types';
// import { Data } from '../../types/types';

class Button {
    name: string;
    id: string;
    controller: ButtonController;
    button: HTMLButtonElement;
    callback: ObserverFunction;
    constructor(name: string, id?: string) {
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
        // console.log('cb = ', cb);
        // this.controller.setCallback(cb);
        this.callback = cb;
    }

    private setListeners() {
        this.button.onclick = () => {
            this.controller.submit(this.name);
            this.controller.broadcast(this.name);
        };
    }

    private getHTMLButtonElement() {
        const button = document.createElement('button');
        button.className = `button button-${this.name}`;
        button.setAttribute('type', 'button');
        button.setAttribute('id', this.id);
        button.textContent = this.name;

        return button;
    }
}

export default Button;
