import { createHTMLElement } from '../../utils/create-elements';

class Winners {
    winners: HTMLDivElement;
    constructor() {
        const winners = document.createElement('div');
        this.winners = winners;
    }

    render(parentElement: HTMLElement) {
        const test = createHTMLElement('div', 'winners');
        test.innerText = 'Winners!';
        this.winners.append(test);
        parentElement.append(this.winners);
    }

    clear() {
        this.winners.innerHTML = '';
    }
}

export default Winners;
