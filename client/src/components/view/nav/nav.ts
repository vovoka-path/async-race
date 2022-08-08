import NavController from '../../controller/nav-controller';
// import { Data, MethodList } from '../../types/types';

class Nav {
    controller: NavController;
    private header: HTMLElement;
    private title: HTMLElement;
    private garage: HTMLElement;
    private winners: HTMLElement;
    navItems: HTMLElement[];
    constructor() {
        this.controller = new NavController();

        const header = this.getHTMLElement('header', 'header');
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

    // DELETE LATER!
    showBanner() {
        const banner = this.getHTMLElement('div', 'header-banner');
        banner.innerHTML = `
        <div style="display: flex; justify-content: center; color: white; background: green; height: 120px;">
	<div style="margin: auto 0; font-size: 22px; text-align: center;">
		Пожалуйста, <span style="font-weight: 700; font-size: 26px;">проверьте мою работу в четверг после 17:00 (МСК)</span>, если это возможно. <br>
		Дело движется к завершению. Сделаю все, чтобы в четверг вам проверять было легко. <br>Огромное спасибо вам за то, идете навстречу с этим непростым таском!
	</div>
</div>
        `;
        return banner;
    }

    render() {
        document.body.append(this.showBanner());
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

export default Nav;
