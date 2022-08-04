import Model from '../model/model';
import Observer from './observer';
import { MethodList, Data } from '../types/types';

const model = new Model();

const inputMethods: MethodList = {
    create: model.setInputCreate,
    update: model.setInputUpdate,
};

const submitMethods: MethodList = {
    create: model.createCar,
    update: model.updateCar,
};

class ControllerForm extends Observer {
    name: string;
    model: Model;
    modelInputMethod: Function;
    modelSubmitMethod: Function;
    // Coming: 'create' or 'update'
    constructor(formName: string) {
        super();
        this.name = formName;
        this.model = new Model();
        this.modelInputMethod = inputMethods[this.name];
        this.modelSubmitMethod = submitMethods[this.name];
    }

    input(data: Data) {
        this.modelInputMethod(data);
        // const method = methods[this.name];
        // this.model[method](data);
        // switch (this.formName) {
        //     case 'create': this.model.setInputCreate(data);
        //         break;
        //     case 'update': this.model.setInputUpdate(data);
        //         break;
        // }
        // console.log(this.formName, '### MyController.input = ', data)
    }

    submit(data: Data) {
        this.modelSubmitMethod(data);
        // const method = methods[this.name];
        // this.model[method](data);
        // switch (this.formName) {
        //     case 'create': this.model.createCar(data);
        //         break;
        //     case 'update': this.model.updateCar(data);
        //         break;
        // }
        // console.log(this.formName, '### MyController.submit = ', data)
    }
}

export default ControllerForm;
