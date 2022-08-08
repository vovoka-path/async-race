import Model from '../model/model';
import Observer from './observer';
// import { CarData } from '../types/types';
import { InputMethodList, GetMethodList, CarData } from '../types/types';

class FormController extends Observer {
    name: string;
    model: Model;
    id: string;
    // modelInputMethod: DataFunction;
    // modelSubmitMethod: DataFunction;
    // Coming: 'create' or 'update'
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
        // this.modelInputMethod(data);
    }

    submit(data: CarData) {
        const submitMethods: InputMethodList = {
            create: (data) => this.model.createCar(data),
            update: (data) => this.model.updateCar(data),
        };

        submitMethods[this.name](data);
        // this.modelSubmitMethod(data);
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
        // let formData;

        // switch (this.name) {
        //     case 'create':
        //         formData = this.model.getInputCreate();
        //         break;
        //     case 'update':
        //         formData = this.model.getInputUpdate();
        //         break;
        // }

        // return formData;
    }
}

export default FormController;

//=======================================

// const inputMethods: InputMethodList = {
//     create: (data) => this.model.setInputCreate(data),
//     update: (data) => this.model.setInputUpdate(data),
// };

// this.modelInputMethod = inputMethods[this.name];

// const submitMethods: InputMethodList = {
//     create: (data) => this.model.createCar(data),
//     update: (data) => this.model.updateCar(data),
// };

// this.modelSubmitMethod = submitMethods[this.name];

// const model = new Model();

// const inputMethods: MethodList = {
//     create: model.setInputCreate as DataFunction,
//     update: model.setInputUpdate as DataFunction,
// };

// const submitMethods: MethodList = {
//     create: model.createCar,
//     update: model.updateCar,
// };

// console.log('inputMethods[create]', inputMethods['create']);

// this.modelInputMethod = this.assignInputMethodByName(formName);
// this.modelSubmitMethod = this.assignSubmitMethodByName(formName);
// console.log('this.modelInputMethod', this.modelInputMethod);
// this.assignMethodsByName(this.name);

// private assignInputMethodByName(formName: string) {
//     // if (formName === 'test') return null;
//     const inputMethods: MethodList = {
//         create: this.model.setInputCreate as DataFunction,
//         update: this.model.setInputUpdate as DataFunction,
//     };

//     // this.modelInputMethod = inputMethods[formName];
//     console.log('formName', formName);
//     console.log('assignMethodsByName this.modelInputMethod', this.modelInputMethod);
//     return inputMethods[formName];
// }

// private assignSubmitMethodByName(formName: string) {
//     const submitMethods: MethodList = {
//         create: this.model.createCar,
//         update: this.model.updateCar,
//     };

//     // console.log('formName', formName);
//     // console.log('submitMethods[formName]', submitMethods[formName]);
//     // this.modelSubmitMethod = submitMethods[formName];
//     // console.log('this.modelSubmitMethod', this.modelSubmitMethod);
//     return submitMethods[formName];
// }

// console.log('this.modelInputMethod', this.modelInputMethod);
// (() => this.modelInputMethod(data))();

// const method = methods[this.name];
// this.model[method](data);
// switch (this.name) {
//     case 'create':
//         this.model.setInputCreate(data);
//         break;
//     case 'update':
//         this.model.setInputUpdate(data);
//         break;
// }
// console.log(this.formName, '### MyController.input = ', data)

// if (Math.ceil(this.model.carCount / 7) === this.model.getCarsPageFromLocalStorage()) {

// }
// // this.model[method](data);
// switch (this.name) {
//     case 'create':
//         this.model.createCar(data);
//         break;
//     case 'update':
//         this.model.updateCar(data);
//         break;
// }
// console.log(this.formName, '### MyController.submit = ', data)
