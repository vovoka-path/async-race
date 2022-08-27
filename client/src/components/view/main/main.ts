import NavController from '../../controller/nav-controller';
import Garage from '../garage/garage';
import Winners from '../winners/winners';

class Main {
    private pageName: string;
    private main: HTMLElement;
    private navController = new NavController();
    private garage = new Garage();
    private winners = new Winners();
    constructor() {
        this.pageName = this.navController.getPageName();
        this.main = this.getHTMLElement('main');
    }

    render() {
        this.clear();
        this.pageName = this.navController.getPageName();

        const currentPage = this.pageName.toLowerCase();

        switch (currentPage) {
            case 'garage':
                this.garage.render(this.main);
                break;
            case 'winners':
                this.winners.render(this.main);
                break;
        }

        document.body.append(this.main);
    }

    private getHTMLElement(name: string) {
        const element = document.createElement(name);
        element.className = `${name}`;

        return element;
    }

    private clear() {
        if (this.winners) this.winners.clear();
        if (this.garage) this.garage.clear();
    }
}

export default Main;
