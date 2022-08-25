import FormController from '../../controller/form-controller';
import { FormsData, CarData, ObserverFunction } from '../../types/types';

class Form {
    name: string;
    id: string;
    controller: FormController;
    data: CarData;
    formsData: FormsData;
    form: Element;
    inputText: HTMLInputElement;
    inputColor: HTMLInputElement;
    labelColor: HTMLLabelElement;
    button: HTMLButtonElement;
    callback: ObserverFunction;
    constructor(formName: string, id?: string) {
        this.name = formName;
        this.id = id ? id : '';
        this.controller = new FormController(this.name);
        this.formsData = this.controller.getFormDataFromStorage();
        this.callback = () => null;
        this.data = {
            name: '',
            color: '',
        };

        this.inputText = this.getHTMLInputTextElement();
        this.inputColor = this.getHTMLInputColorElement();
        this.labelColor = this.getHTMLLabelColorElement();
        this.button = this.getHTMLButtonElement();

        this.form = this.getHTMLFormElement();
    }

    init(parentNode: Element) {
        this.setListeners();
        parentNode.append(this.form);
    }

    setCallback(cb: ObserverFunction) {
        this.callback = cb;
    }

    setListeners() {
        this.inputText.oninput = () => {
            this.controller.input(this.getData());
        };

        this.inputColor.oninput = () => {
            this.controller.input(this.getData());
        };

        this.button.onclick = () => {
            this.controller.submit(this.getData());
            this.controller.broadcast(this.getData());
        };
    }

    getData() {
        const data: CarData = {
            name: this.inputText.value,
            color: this.inputColor.value,
            id: +this.id,
        };

        return data;
    }

    setData(data: CarData) {
        this.data = { ...this.data, ...data };
        this.inputText.value = this.data.name;
        this.inputColor.value = this.data.color;
        this.button.textContent = this.name;
    }

    getFormDataFromStorage() {
        return this.controller.getFormDataFromStorage() as FormsData;
    }

    private getHTMLFormElement() {
        const form = document.createElement('div');
        form.className = 'form form-create';

        form.append(this.inputText);
        form.append(this.inputColor);
        form.append(this.labelColor);
        form.append(this.button);

        return form;
    }

    private getHTMLInputTextElement() {
        const inputText = document.createElement('input');
        inputText.className = `input input-text input-text-${this.name}`;
        inputText.setAttribute('type', 'text');

        return inputText;
    }

    private getHTMLInputColorElement() {
        const inputColor = document.createElement('input');
        inputColor.className = `input input-color input-color-${this.name}`;
        inputColor.setAttribute('type', 'color');
        inputColor.setAttribute('name', 'color');

        return inputColor;
    }

    private getHTMLLabelColorElement() {
        const labelColor = document.createElement('label');
        labelColor.className = `label label-color label-${this.name}`;
        labelColor.setAttribute('for', 'color');

        return labelColor;
    }

    private getHTMLButtonElement() {
        const button = document.createElement('button');
        button.className = `button button-form button-${this.name}`;
        button.setAttribute('type', 'button');
        button.textContent = this.name;
        this.id ? button.setAttribute('id', this.id) : null;

        return button;
    }
}

export default Form;
