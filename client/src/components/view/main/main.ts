import Model from '../../model/model';
import Garage from '../garage/garage';
import Winners from '../winners/winners';

class Main {
    private pageName: string;
    private main: HTMLElement;
    private model: Model;
    private garage: Garage;
    private winners: Winners;
    constructor() {
        this.model = new Model();
        this.pageName = this.model.getPage();
        this.main = this.getHTMLElement('main');
        this.winners = new Winners();
        this.garage = new Garage();
    }

    render() {
        this.clear();
        console.log('# this.pageName = ', this.pageName);

        if (this.pageName.toLowerCase() === 'garage') {
            this.garage.render(this.main);
        } else if (this.pageName.toLowerCase() === 'winners') {
            this.winners.render(this.main);
        }
        document.body.append(this.main);
    }

    // getData() {
    //     return this.pageName;
    // }

    setData(pageName: string) {
        this.pageName = pageName;
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
