import NavController from '../../controller/nav-controller';
import { HeaderData, ViewElements } from '../../types/types';
import { createHTMLElement, createNavMenu, createTitle } from '../../utils/create-elements';

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
            () => main.render(),
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
}

export default Header;
