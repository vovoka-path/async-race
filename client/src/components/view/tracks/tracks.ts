import TrackController from '../../controller/track-controller';
import Track from '../track/track';
import { CarData, CarsData, CBfunc } from '../../types/types';
// import App from '../../app/app';

class Tracks {
    controller: TrackController;
    // page: number;
    // cars: CarsData;
    element: HTMLElement;
    trackElements: Element[];
    rerenderCallback: CBfunc;
    constructor() {
        this.controller = new TrackController();
        // this.page = this.getCarsCurrentPage() || 0;
        this.trackElements = [];
        this.rerenderCallback = () => null;
        // this.cars = {
        //     count: '0',
        //     data: [],
        // };
        // this.getCars(this.page);
        // this.page = this.controller.getCarsNumber() || 0;

        this.element = this.getContainer();
        // console.log('# TRACKS constructor: this.trackElements = ', this.trackElements);
    }

    setRerenderCallback(cb: CBfunc) {
        // console.log('cb = ', cb);
        this.rerenderCallback = cb;
    }

    async init(parentNode: Element) {
        this.element.innerHTML = '';

        const carCount = await this.controller.getCarsCount();
        const carPage = await this.controller.getCarsCurrentPage();
        console.log('## TRacks init()', carPage);
        const title = this.getTitle(`Garage contains ${carCount} cars. Box: ${carPage}.`);
        this.element.append(title);

        const carsPromise = await this.getCars(await this.getCarsCurrentPage());
        const cars = carsPromise as CarsData;

        const trackElements = this.createTrackElements(cars);
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

    async rerender(parentNode: Element, currentPage: number) {
        // const currentPage = await this.getCarsCurrentPage();
        // const count: number = await this.controller.getCarsCount();

        // console.log(
        //     '^ rerender:  = currentPage, Math.ceil(count / 7), count => ',
        //     currentPage,
        //     Math.ceil(count / 7),
        //     count
        // );
        // && currentPage < Math.ceil(count / 7)
        if (currentPage !== 0) {
            await this.getCars(currentPage);
            this.element.outerHTML = '';
            this.element = this.getContainer();
            this.init(parentNode);
        }
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
