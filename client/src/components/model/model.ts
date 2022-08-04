import { Data } from '../types/types';

class Model {
    inputCreateData: Data;
    inputUpdateData: Data;
    method: string;
    constructor() {
        this.inputCreateData = {};
        this.inputUpdateData = {};
        this.method = '';
    }

    setInputCreate(data: Data) {
        this.inputCreateData = data;
        console.log('### Model.setInputCreate = ', data);
    }

    getInputCreate() {
        return this.inputCreateData;
    }

    setInputUpdate(data: Data) {
        this.inputUpdateData = data;
        console.log('### Model.setInputCreate = ', data);
    }

    getInputUpdate() {
        return this.inputUpdateData;
    }

    createCar(data: Data) {
        console.log('### Model.createCar = ', data);
    }

    updateCar(data: Data) {
        console.log('### Model.updateCar = ', data);
    }

    generate100Cars() {
        console.log('### Model.generate100Cars');
    }

    race(data: Data) {
        console.log('### Model.race', data);
    }

    reset(data: Data) {
        console.log('### Model.reset', data);
    }

    garage(data: Data) {
        console.log('### Model.garage', data);
    }

    winners(data: Data) {
        console.log('### Model.winners', data);
    }
}

export default Model;
