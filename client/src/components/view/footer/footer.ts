import NavController from '../../controller/nav-controller';
// import { Data, MethodList } from '../../types/types';

class Footer {
    controller: NavController;
    private header: HTMLElement;
    private title: HTMLElement;
    private garage: HTMLElement;
    private winners: HTMLElement;
    navItems: HTMLElement[];
    constructor() {
        this.controller = new NavController();

        const header = this.getHTMLElement('footer', 'footer');
        this.header = header;

        const title = this.getHTMLTitle('Acyns Race');
        this.title = title;

        const navContainer = this.getHTMLElement('div', 'menu-container');

        const navMenu = this.getHTMLElement('ul', 'header-menu');

        const garage = this.getHTMLElement('li', 'header-menu_item menu-garage');
        garage.innerText = 'garage';
        this.garage = garage;

        const winners = this.getHTMLElement('li', 'header-menu_item menu-winners');
        winners.innerText = 'winners';
        this.winners = winners;

        this.navItems = [this.garage, this.winners];

        navMenu.append(garage);
        navMenu.append(winners);
        navContainer.append(navMenu);
        header.append(title);
        header.append(navContainer);
    }

    render() {
        document.body.append(this.header);
        this.setListeners();
    }

    private setListeners() {
        this.navItems.forEach(
            (item) =>
                (item.onclick = () => {
                    this.controller.click(item.innerText);
                    this.controller.broadcast(item.innerText);
                })
        );
    }

    private getHTMLTitle(title: string): HTMLElement {
        const container = this.getHTMLElement('div', 'header-title-container');
        const element = this.getHTMLElement('h1', 'header-title_text');
        element.innerText = title;

        container.append(element);

        return container;
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }
}

export default Footer;
