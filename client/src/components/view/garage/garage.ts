import Button from '../button/button';
import Form from '../form/form';
import Tracks from '../tracks/tracks';
import GarageController from '../../controller/garage-controller';
import model from '../../controller/get-model';
import {
    FormName,
    ButtonName,
    ElementName,
    TypesOfElement,
    Elements,
    GarageElements,
} from '../../types/types';

class Garage {
    controller = new GarageController();
    garage: HTMLElement;
    inputFormElements: Elements;
    buttonElements: Elements;
    tracksElement: Tracks;
    panginationElements: Elements;
    model = model;
    constructor() {
        this.garage = this.getHTMLElement('div', 'garage');
        this.inputFormElements = {};
        this.buttonElements = {};
        this.tracksElement = new Tracks();
        this.panginationElements = {};
    }

    async render(parentElement: HTMLElement) {
        this.renderForms();
        this.renderButtons();
        this.renderPangination();
        await this.renderTracks();
        this.subscribeGarageElements(this.getAllGarageElements());

        parentElement.append(this.garage);
    }

    private renderForms() {
        const container = this.createContainer('forms');

        ['create'].forEach((name) => {
            this.inputFormElements[name] = this.renderChildElement(name as FormName, Form, container);
        });
    }

    private renderButtons() {
        const container = this.createContainer('setting');

        ['race', 'reset', 'generate'].forEach((name) => {
            this.buttonElements[name] = this.renderChildElement(name as ButtonName, Button, container);
        });
    }

    private async renderTracks() {
        const container = this.createContainer('tracks');

        await this.tracksElement.init(container);
    }

    private renderPangination() {
        const container = this.createContainer('pangination');

        ['prev', 'next'].forEach(async (name) => {
            this.panginationElements[name] = this.renderChildElement(name as ButtonName, Button, container);
            const currentPage = await model.getCarsPageFromLocalStorage();
            const isLastCarsPage = await model.isLastCarsPage(currentPage);
            
            if (name === 'prev' && currentPage === 1) {
                (this.panginationElements[name] as Button).toggleActive();
            } else if (name === 'next' && isLastCarsPage) {
                (this.panginationElements[name] as Button).toggleActive();
            }
        });
    }

    getAllGarageElements() {
        return {
            inputFormElements: this.inputFormElements,
            buttonElements: this.buttonElements,
            tracksElement: this.tracksElement,
            panginationElements: this.panginationElements,
        } as GarageElements;
    }

    subscribeGarageElements(garageElements: GarageElements) {
        const { tracksElement } = garageElements;

        const updateTracks = async (currenrPage: number) => {
            const parent = tracksElement.element.parentElement;

            if (parent) {
                await tracksElement.rerenderTracks(parent, currenrPage);
            }
        };

        const updateTracksTitle = async (currenrPage: number) => {
            const parent = tracksElement.element.parentElement;

            if (parent) {
                await tracksElement.rerenderTracksTitle(parent, currenrPage);
            }
        };

        this.model.setRerenderTracks(updateTracks);
        this.model.setRerenderTracksTitle(updateTracksTitle);
    }

    private renderChildElement(name: ElementName, elementClass: TypesOfElement, parentNode: Element) {
        const element = new elementClass(name);
        if (element instanceof Form) {
            element.setData(element.getFormDataFromStorage()[name as FormName]);
        }

        element.init(parentNode);

        return element;
    }

    private createContainer(name: string) {
        const container = document.createElement('div');
        container.className = `container container-${name}`;

        this.garage.append(container);

        return container;
    }

    private getHTMLElement(name: string, styles?: string): HTMLElement {
        const element = document.createElement(name);
        element.className = `${styles}`;

        return element;
    }

    clear() {
        this.garage.innerHTML = '';
    }
}

export default Garage;
