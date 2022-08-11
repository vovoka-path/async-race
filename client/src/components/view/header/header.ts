import NavController from '../../controller/nav-controller';
import { HeaderData, ViewElements } from '../../types/types';
import { createHTMLElement, createNavMenu, createTitle } from '../../utils/create-elements';
// import Main from '../main/main';

class Header {
    controller: NavController;
    private headerData = {
        elementName: 'header',
        titleText: 'Acyns Race',
        pages: ['garage', 'winners'],
    };
    private header: HTMLElement;
    private pageElements: HTMLElement[];
    constructor() {
        this.controller = new NavController();

        const { header, pageElements } = this.createHeader(this.headerData);

        this.header = header;
        this.pageElements = pageElements;
    }

    render(parent: HTMLElement) {
        parent.append(this.showBanner()); // DELETE
        parent.append(this.header);
        this.setListeners();
    }

    private setListeners() {
        this.pageElements.forEach(
            (item) =>
                (item.onclick = () => {
                    this.controller.click(item.innerText);
                    this.controller.broadcast(item.innerText);
                })
        );
    }

    subscribeViewElements(viewElements: ViewElements) {
        const { header, main } = viewElements;

        const callbacks = [
            // (pageName: string) => {
            //     main.setPageName(pageName);
            // },
            () => {
                main.render();
            },
        ];

        callbacks.forEach((callback) => header.controller.subscribe(callback));
    }

    private createHeader(headerData: HeaderData) {
        const { elementName, titleText, pages } = headerData;
        const header = createHTMLElement(`${elementName}`, `${elementName}`);
        const title = createTitle(elementName, titleText);
        const { containerNavMenu, pageElements } = createNavMenu(elementName, pages);

        header.append(title);
        header.append(containerNavMenu);

        return {
            header: header,
            pageElements: pageElements,
        };
    }

    // DELETE

    showBanner() {
        const banner = createHTMLElement('div', 'header-banner');
        banner.innerHTML = `
        <div style="display: flex; justify-content: center; color: white; background: green; min-height: 200px;">
	        <div style="margin: auto 0; font-size: 22px; text-align: center;">
		        <span style="font-weight: 700; font-size: 26px;">Спасибо огромное за то, что пошли навстречу!</span><br>
		        К сожаление, я не успел все сделать. Простите меня... Winners не сделано.
	        </div>
        </div>
        `;
        return banner;
    }
}

export default Header;

// subscribeCallbacks(callbacks: CallbackType[]) {
//     callbacks.forEach((callback) => this.controller.subscribe(callback));
// }
