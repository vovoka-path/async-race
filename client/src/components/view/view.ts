import Header from './header/header';
import Main from './main/main';

class View {
    private header: Header;
    private main: Main;
    element: HTMLElement;
    constructor() {
        this.element = document.body;
        this.header = new Header();
        this.main = new Main();
        this.subscribeViewElements();
    }

    render() {
        this.header.render(this.element);
        this.main.render();
    }

    subscribeViewElements() {
        this.header.subscribeViewElements({
            header: this.header,
            main: this.main,
        });
    }
}

export default View;
