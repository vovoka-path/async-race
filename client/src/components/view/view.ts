import Header from './header/header';
import Main from './main/main';
// import Footer from './footer/footer';
// import { ViewElements } from '../types/types';

class View {
    private header: Header;
    private main: Main;
    element: HTMLElement;
    // private footer: Footer;
    constructor() {
        this.element = document.body;
        this.header = new Header();
        this.main = new Main();
        // this.footer = new Footer();
        this.subscribeViewElements();
        // this.subscribeMainToNav();
    }

    render() {
        // HEADER
        this.header.render(this.element);

        // MAIN
        this.main.render();
        // this.main.render('garage');

        // TODO: FOOTER
        // this.footer.render();
    }

    subscribeViewElements() {
        this.header.subscribeViewElements({
            header: this.header,
            main: this.main,
            // parent: this.element,
        });
    }
}

export default View;

// const viewElements: ViewElements = {
//     header: this.header,
//     main: this.main,
//     parent: this.element,
// };

// private subscribeMainToNav() {
//     const setPageName = (pageName: string) => this.main.setpageName(pageName);
//     this.header.controller.subscribe(setPageName as ObserverFunction);

//     const renderMain = () => this.main.render();
//     this.header.controller.subscribe(renderMain as ObserverFunction);
// }

// actonsAfterEvent
// private subscribeNavCallbacks() {
//     const callbacks: CallbackType[] = [
//         (pageName: string) => this.main.setpageName(pageName),
//         () => this.main.render(),
//     ];

//     this.header.subscribeCallbacks(callbacks);
// }
