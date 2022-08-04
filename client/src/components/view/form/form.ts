// import styles from './form-input-styles.scss';
import ControllerForm from '../../controller/form-controller';
import { Data, MethodList } from '../../types/types';

// const controller = new ControllerForm();

// const actiosMethods: MethodList = {
//     'create': controller.setInputCreate,
//     'update': controller.setInputUpdate,
// }

class Form{
    name: string;
    controller: ControllerForm;
    data: Data;
    form: Element;
    inputText: HTMLInputElement;
    inputColor: HTMLInputElement;
    labelColor: HTMLLabelElement;
    button: HTMLButtonElement;
    constructor(formName: string) {
        this.name = formName;
        this.controller = new ControllerForm(this.name);
        this.data = {
            input: '',
            color: '',
            name: '',
        };

        const form = document.createElement('div');
        this.form = form;

        const inputText = document.createElement('input');
        inputText.setAttribute('type', 'text');
        this.inputText = inputText;
        form.append(inputText);

        const colorValue = 'color';

        const inputColor = document.createElement('input');
        inputColor.className = 'input-color';
        inputColor.setAttribute('type', 'color');
        inputColor.setAttribute('name', colorValue);
        this.inputColor = inputColor;
        form.append(inputColor);

        const labelColor = document.createElement('label');
        labelColor.className = 'label-color';
        labelColor.setAttribute('for', colorValue);
        this.labelColor = labelColor;
        form.append(labelColor);

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.textContent = formName;
        this.button = button;
        form.append(button);
    }

    init(parentNode: Element) {
        this.setListeners();
        parentNode.append(this.form);
    }

    setListeners() {
        const actionMethods: MethodList = {
            'input': this.controller.input,
            'submit': this.controller.submit,
        }
        
        const callback = (action: string) => {
            return () => {
                actionMethods[action](this.getData());
                this.controller.broadcast(this.getData());
            }
        }

        this.inputText.oninput = callback('input');
        this.inputColor.oninput = callback('input');
        this.button.onclick = callback('submit');
    }

    getData() {
        // console.log('getData() = ', this.inputText.value)
        return {
            input: this.inputText.value,
            color: this.inputColor.value,
            name: this.button.textContent,
        } as Data;
    }

    setData(data: Data) {
        this.data = {...this.data, ...data};
        // console.log('setData() this.data = ', this.data)
        this.inputText.value = this.data.input;
        this.inputColor.value = this.data.color;
        this.button.textContent = this.data.name;
        // console.log('setData() this.data.input = ', this.data.input)
        // console.log('setData() this.inputText.value = ', this.inputText.value)
    }
    
    destroy() {
        this.form.remove();
    }
}

export default Form;
