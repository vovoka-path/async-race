import Nav from './nav/nav';
import Main from './main/main';
// import Footer from './footer/footer';
import { ObserverFunction } from '../types/types';

class View {
    private nav: Nav;
    private main: Main;
    // private footer: Footer;
    constructor() {
        this.nav = new Nav();
        this.main = new Main();
        // this.footer = new Footer();
        this.subscribeMainToNav();
    }

    render() {
        // HEADER
        this.nav.render();

        // MAIN
        this.main.render();

        // TODO: FOOTER
        // this.footer.render();
    }

    private subscribeMainToNav() {
        const setPageName = (pageName: string) => this.main.setData(pageName);
        this.nav.controller.subscribe(setPageName as ObserverFunction);

        const reRenderMain = () => this.main.render();
        this.nav.controller.subscribe(reRenderMain as ObserverFunction);
    }
}

export default View;
