// import TrackController from '../../controller/track-controller';
import TracksController from '../../controller/tracks-controller';
import Track from '../track/track';
import { CarData, CarsData, CBfunc } from '../../types/types';
import Observer from '../../controller/observer';
// import App from '../../app/app';

class Tracks extends Observer {
    controller = new TracksController();
    // page: number;
    // cars: CarsData;
    element: HTMLElement;
    trackElements: Element[];
    rerenderCallback: CBfunc;
    // title: Promise<HTMLElement>;
    constructor() {
        super();
        // this.controller = new TracksController();
        // this.page = this.getCarsCurrentPage() || 0;
        this.trackElements = [];
        this.rerenderCallback = () => null;
        // this.title = this.createTitle(currentPage);
        // this.cars = {
        //     count: '0',
        //     data: [],
        // };
        // this.getCars(this.page);
        // this.page = this.controller.getCarsNumber() || 0;

        this.element = this.getContainer();
        // console.log('# TRACKS constructor: this.trackElements = ', this.trackElements);
    }

    async createTitle(currentPage: number) {
        const carCount = await this.controller.getCarsCount();
        // const currentPage = await this.controller.getCarsCurrentPage();
        // console.log('## TRacks init()| carsPage =', currentPage);
        // title = this.getTitle(`Garage contains ${carCount} cars. Box: ${carsPage}.`);
        return this.getTitle(`Garage contains ${carCount} cars. Box: ${currentPage}.`);
    }

    async rerenderTracksTitle(parentNode: Element, currentPage: number) {
        parentNode.firstElementChild?.firstElementChild?.firstElementChild?.remove();

        // const title = await this.createTitle(currentPage);
        const carCount = await this.controller.getCarsCount();
        const title = this.getHTMLElement('h2', 'tracks-title_text');
        title.innerText = `Garage contains ${carCount} cars. Box: ${currentPage}.`;

        // console.log(
        //     '# parentNode.firstElementChild?.firstElementChild? = ',
        //     parentNode.firstElementChild?.firstElementChild
        // );

        parentNode.firstElementChild?.firstElementChild?.append(title);
    }

    async rerenderTracks(parentNode: Element, currentPage: number) {
        if (currentPage !== 0) {
            await this.getCars(currentPage);
            this.element.outerHTML = '';
            this.element = this.getContainer();
            this.init(parentNode);
        }
    }

    async init(parentNode: Element) {
        this.element.innerHTML = '';
        const currentPage = await this.controller.getCarsCurrentPage();

        const title = await this.createTitle(currentPage);
        this.element.append(title);

        const cars = await this.getCars(currentPage);
        const trackElements = this.createTrackElements(cars as CarsData);

        this.renderCars(trackElements);

        parentNode.append(this.element);
    }

    private getContainer() {
        const container = this.getHTMLElement('div', 'tracks');

        return container;
    }

    private getTitle(text: string) {
        const container = this.getHTMLElement('div', 'container-title');
        const title = this.getHTMLElement('h2', 'tracks-title_text');
        title.innerText = text;

        container.append(title);

        return container;
    }

    private renderCars(trackElements: Element[]) {
        trackElements.forEach((trackElement) => {
            this.element.append(trackElement);
        });
    }

    private createTrackElements(cars: CarsData) {
        const trackElements: Element[] = [];

        cars?.data.forEach((carData: CarData) => {
            const track = new Track(carData);
            const trackElement = track.getTrackContainer();
            // console.log('this.cb = ', this.cb);
            track.deleteButton.controller.subscribe(this.rerenderCallback);
            track.updateForm.controller.subscribe(this.rerenderCallback);
            trackElements.push(trackElement);

            // console.log('## createTrackElements: this.trackElements = ', trackElements[i]);
        });

        this.trackElements = trackElements;

        return trackElements;
    }

    // clear() {
    //     this.element.outerHTML = '';
    // }

    async getCars(pageNumber: number) {
        const cars = await this.controller.getCars(pageNumber);

        // if (cars) {
        //     this.cars = cars;
        // }

        return cars;
    }

    async getCarsCurrentPage() {
        // this.page = this.controller.getCarsCurrentPage();
        return await this.controller.getCarsCurrentPage();
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }
}

export default Tracks;

// subscribeGarageElements(garageElements: GarageElements) {
//     const { tracksElement } = garageElements;
//     const updateTracksSubscriber = async (currenrPage: number) => {
//         const parent = tracksElement.element.parentElement;
//         console.log('$$$ currenrPage =', currenrPage);
//         if (parent) {
//             await tracksElement.rerender(parent, currenrPage);
//         }
//     };
//     // const { header, main } = viewElements;
//     const callbacks = [updateTracksSubscriber];

//     callbacks.forEach((callback) => tracksElement.controller.subscribe(callback));
// }

// setRerenderCallback(cb: CBfunc) {
//     // console.log('cb = ', cb);
//     this.rerenderCallback = cb;
// }
