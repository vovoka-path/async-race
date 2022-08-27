import Model from '../model/model';
import Observer from './observer';
import { InputMethodList, GetMethodList, CarData } from '../types/types';

class FormController extends Observer {
    name: string;
    model: Model;
    id: string;
    constructor(formName: string, id?: string) {
        super();
        this.name = formName;
        this.model = new Model();
        this.id = id ? id : '';
    }

    input(data: CarData) {
        const inputMethods: InputMethodList = {
            create: (data) => this.model.setInputCreate(data),
            update: (data) => this.model.setInputUpdate(data),
        };

        inputMethods[this.name](data);
    }

    submit(data: CarData) {
        const submitMethods: InputMethodList = {
            create: (data) => this.model.createCar(data),
            update: (data) => this.model.updateCar(data),
        };

        submitMethods[this.name](data);
    }

    getFormDataFromStorage() {
        return this.model.formsData;
    }

    getFormData() {
        const getMethods: GetMethodList = {
            create: () => this.model.getInputCreate(),
            update: () => this.model.getInputUpdate(),
        };

        getMethods[this.name]();
    }
}

export default FormController;
