import Button from '../button/button';
import Form from '../form/form';
import Tracks from '../tracks/tracks';
// import Api from '../../model/api';
// import Track from '../track/track';
import {
    // CarData,
    FormName,
    ButtonName,
    ElementName,
    TypesOfElement,
    Elements,
    // ObserverFunction,
    CBfunc,
} from '../../types/types';

// type ElementClass = typeof Button | typeof Form;

class Garage {
    // parent: HTMLElement;
    garage: HTMLElement;
    inputFormElements: Elements;
    buttonElements: Elements;
    tracksElement: Tracks;
    panginationElements: Elements;
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
        // this.renderTestOutpuElement();
        this.renderPangination();
        await this.renderTracks();
        this.subscribeEvents();

        parentElement.append(this.garage);
    }

    // # Render 2 input forms: 'create', 'update'
    private renderForms() {
        const container = this.createContainer('forms');
        // , 'update'
        ['create'].forEach((name) => {
            this.inputFormElements[name] = this.renderChildElement(name as FormName, Form, container);
        });
    }

    // # Render 3 buttons: 'race', 'reset', 'generate 100 cars'
    private renderButtons() {
        const container = this.createContainer('setting');

        ['race', 'reset', 'generate'].forEach((name) => {
            this.buttonElements[name] = this.renderChildElement(name as ButtonName, Button, container);
        });
    }

    // # Render 7 tracks / 1 page
    private async renderTracks() {
        const container = this.createContainer('tracks');

        const tracks = this.tracksElement;
        await tracks.init(container);
        // this.garage.append

        // console.log('# GARAGE: container = ', container);
        // console.log('# GARAGE: this.trackElement.trackElements = ', this.tracksElement.trackElements);
        // console.log('# GARAGE: this.trackElement.trackElements[1] = ', this.tracksElement.trackElements[1]);
    }

    // # Render prev / next
    private renderPangination() {
        const container = this.createContainer('pangination');

        ['prev', 'next'].forEach((name) => {
            this.panginationElements[name] = this.renderChildElement(name as ButtonName, Button, container);
        });
    }

    subscribeEvents() {
        const updateTracksSubscriber = async (currenrPage: number) => {
            const parent = this.tracksElement.element.parentElement;
            console.log('$$$ currenrPage =', currenrPage);
            if (parent) {
                await this.tracksElement.rerender(parent, currenrPage);
            }
        };

        // this.tracksElement.rerenderCallback(updateTracksSubscriber as CBfunc);
        this.inputFormElements.create.controller.model.setRerenderCallback(updateTracksSubscriber as CBfunc);
        this.tracksElement.controller.model.setRerenderCallback(updateTracksSubscriber as CBfunc);
        // console.log('this.panginationElements.prev.controller.submit =');
        this.buttonElements.generate.controller.model.setRerenderCallback(updateTracksSubscriber as CBfunc);
        this.panginationElements.prev.controller.model.setRerenderCallback(updateTracksSubscriber as CBfunc);
        this.panginationElements.next.controller.model.setRerenderCallback(updateTracksSubscriber as CBfunc);

        // this.panginationElements.prev.controller.subscribe(updateTracksSubscriber as ObserverFunction);
        // this.panginationElements.next.controller.subscribe(updateTracksSubscriber as ObserverFunction);
    }

    private renderChildElement(name: ElementName, elementClass: TypesOfElement, parentNode: Element) {
        const element = new elementClass(name);
        if (element instanceof Form) {
            element.setData(element.getFormDataFromStorage()[name as FormName]);
        }

        element.init(parentNode);

        return element;
    }

    // private renderTestOutpuElement() {
    //     // # Render Show Updates
    //     // const testFormElement: Form = this.renderChildElement('create', Form, this.garage) as Form;

    //     const testFormElement = document.createElement('div');
    //     testFormElement.innerText = '...';
    //     document.body.append(testFormElement);
    //     const subscriberForm = (data: CarData) => (testFormElement.innerText = data.name);
    //     // const subscriberForm = (data: Data) => testFormElement.innerText = data.input ({ ...data, input: data.input });
    //     // const subscriberButton = (name: string) => testFormElement.setData({ name: name, input: name });

    //     // pageElements.garage.controller.subscribe(subscriberButton as ObserverFunction);
    //     // pageElements.winners.controller.subscribe(subscriberButton as ObserverFunction);

    //     // buttonElements.race.controller.subscribe(subscriberButton as ObserverFunction);
    //     // buttonElements.reset.controller.subscribe(subscriberButton as ObserverFunction);
    //     // buttonElements.generate.controller.subscribe(subscriberButton as ObserverFunction);

    //     this.inputFormElements.create.controller.subscribe(subscriberForm as ObserverFunction);
    //     this.inputFormElements.update.controller.subscribe(subscriberForm as ObserverFunction);
    // }

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
        // this.garage.remove();
    }
}

export default Garage;
