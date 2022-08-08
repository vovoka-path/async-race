class Winners {
    // parent: HTMLElement;
    winners: HTMLDivElement;
    constructor() {
        // this.parent = parentElement;
        const winners = document.createElement('div');
        this.winners = winners;
    }

    render(parentElement: HTMLElement) {
        // this.clear();
        const test = this.getHTMLElement('div', 'winners');
        test.innerText = 'Winners!';
        this.winners.append(test);
        // this.parent = parentElement;
        parentElement.append(this.winners);
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }

    clear() {
        this.winners.innerHTML = '';
        // this.winners.remove();
    }
}

export default Winners;
