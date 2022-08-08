import Model from '../model/model';
import Api from '../model/api';
import { CarData } from '../types/types';
// import { CarsData, CarData } from '../../types/types';
// import Observer from './observer';
// import { FormData } from '../types/types';

class TrackController {
    // name: string;
    model: Model;
    api: Api;
    // Coming: 'create' or 'update'
    constructor() {
        this.model = new Model();
        this.api = new Api();
        // this.modelInputMethod = this.assignInputMethodByName(formName);
        // this.modelSubmitMethod = this.assignSubmitMethodByName(formName);
        // console.log('this.modelInputMethod', this.modelInputMethod);
        // this.assignMethodsByName(this.name);
    }

    async getCarsCurrentPage() {
        return await this.model.getCarsPageFromLocalStorage();
    }

    async getCarsCount() {
        const count = await this.model.getCarsCount();
        console.log('# TRACK contr: getCarsCount() = ', count);

        return count;
    }

    async getCars(pageNumber: number) {
        const cars = await this.model.getCars(pageNumber);
        return cars;
    }

    createCar(carData: CarData) {
        return this.model.createCar(carData);
    }
}

export default TrackController;
