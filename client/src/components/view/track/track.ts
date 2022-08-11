// import TrackController from '../../controller/button-controller';
import Button from '../button/button';
import Form from '../form/form';
import Cars from './cars';
// import TrackButton from '../button/track-button';
import { CarData } from '../../types/types';

const carImageWidth = '75px';

class Track {
    carData: CarData;
    name: string;
    color: string;
    id: string; // | undefined
    // controller: TrackController;
    // element: Element;
    startButton: Button;
    stopButton: Button;
    // editButton: Button;
    deleteButton: Button;
    updateForm: Form;
    carImage: Cars;
    car: HTMLElement;
    carAnimation: Animation | undefined;
    constructor(carData: CarData) {
        this.carData = carData;
        const { name, color, id } = carData;
        this.name = name;
        this.color = color;
        this.id = (id as number).toString();
        // console.log('$ Track constructor: data =', this.name, this.color, this.id);
        // this.controller = new TrackController(name);
        // this.element = this.getHTMLButtonContainer();
        // this.element = this.getHTMLButtonContainer();

        this.startButton = new Button('start', this.id);
        this.stopButton = new Button('stop', this.id);
        // this.editButton = new Button('edit', this.id);
        this.deleteButton = new Button('delete', this.id);
        this.updateForm = new Form('update', this.id);
        this.carImage = new Cars();
        this.car = this.getCar();
    }

    animationCar(time: number): void {
        this.carAnimation = this.car.animate([{ left: '75px' }, { left: `calc(100% - ${carImageWidth}px)` }], {
            duration: time,
            easing: 'ease-in-out',
        });
        if (this.carAnimation) {
            this.carAnimation.play();
            this.carAnimation.onfinish = () => {
                this.car.style.left = `calc(100% - ${carImageWidth}px)`;
            };
        }
    }

    getTrackContainer() {
        const trackContainer = document.createElement('div');
        trackContainer.className = 'container-track';
        trackContainer.setAttribute('id', this.id);

        trackContainer.append(this.getCarNameContainer());
        trackContainer.append(this.getCarButtons());
        trackContainer.append(this.getRaceContainer());
        trackContainer.append(this.getRoadContainer());
        // parentNode.append(trackContainer);

        return trackContainer;
    }

    private getRaceContainer() {
        const carContainer = document.createElement('div');
        carContainer.className = 'container-car-race';

        const carName = document.createElement('div');
        carName.className = 'car-race';

        carContainer.append(carName);

        return carContainer;
    }

    private getCarNameContainer() {
        const carContainer = document.createElement('div');
        carContainer.className = 'container-car-name';

        const carName = document.createElement('div');
        carName.className = 'car-name_title';
        carName.innerText = `#${this.id} ${this.name} (color: ${this.color})`;

        carContainer.append(carName);

        return carContainer;
    }

    private getCarButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'container-buttons';

        this.updateForm.setData(this.carData);

        this.startButton.init(buttonContainer);
        this.stopButton.init(buttonContainer);
        // this.editButton.init(buttonContainer);
        this.deleteButton.init(buttonContainer);
        this.updateForm.init(buttonContainer);

        return buttonContainer;
    }

    private getRoadContainer() {
        const container = this.getHTMLElement('div', 'container-road');
        // const topLine = this.getLine();
        const bottomLine = this.getLine();

        const svgContainer = this.getHTMLElement('div', 'container-svg');
        svgContainer.append(this.getCar());

        // container.append(topLine);
        container.append(svgContainer);
        container.append(bottomLine);

        return container;
    }

    private getCar() {
        const car = this.getHTMLElement('div', 'car-svg');
        car.innerHTML = this.carImage.getSportcar(this.color);
        car.setAttribute('id', `car-${this.id}`);

        return car;
    }

    private getLine(): HTMLElement {
        const element = this.getHTMLElement('div', 'line');

        return element;
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }
}

export default Track;

// render(parentNode: Element) {
//     const trackContainer = document.createElement('div');
//     trackContainer.className = 'track-container';
//     trackContainer.setAttribute('id', (this.id as number).toString());

//     trackContainer.append(this.getHTMLButtonContainer());
//     trackContainer.append(this.getHTMLCar());
//     parentNode.append(trackContainer);
// }
