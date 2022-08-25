import TracksController from '../../controller/tracks-controller';
import Track from '../track/track';
import { CarData, CarsData, CBfunc } from '../../types/types';
import Observer from '../../controller/observer';

class Tracks extends Observer {
    controller = new TracksController();
    element: HTMLElement;
    trackElements: Element[];
    rerenderCallback: CBfunc;
    constructor() {
        super();
        this.trackElements = [];
        this.rerenderCallback = () => null;
        this.element = this.getContainer();
    }

    async createTitle(currentPage: number) {
        const carCount = await this.controller.getCarsCount();

        return this.getTitle(`Garage contains ${carCount} cars. Box: ${currentPage}.`);
    }

    async rerenderTracksTitle(parentNode: Element, currentPage: number) {
        parentNode.firstElementChild?.firstElementChild?.firstElementChild?.remove();

        const carCount = await this.controller.getCarsCount();
        const title = this.getHTMLElement('h2', 'tracks-title_text');
        title.innerText = `Garage contains ${carCount} cars. Box: ${currentPage}.`;

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

            track.deleteButton.controller.subscribe(this.rerenderCallback);
            track.updateForm.controller.subscribe(this.rerenderCallback);
            trackElements.push(trackElement);
        });

        this.trackElements = trackElements;

        return trackElements;
    }

    async getCars(pageNumber: number) {
        const cars = await this.controller.getCars(pageNumber);

        return cars;
    }

    async getCarsCurrentPage() {
        return await this.controller.getCarsCurrentPage();
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }
}

export default Tracks;
