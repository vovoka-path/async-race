import model from './get-model';
import Model from '../model/model';
import Api from '../model/api';
import { CarData } from '../types/types';

class TrackController {
    model: Model;
    api: Api;
    constructor() {
        this.model = model;
        this.api = new Api();
    }

    async getCarsCurrentPage() {
        return await this.model.getCarsPageFromLocalStorage();
    }

    async getCarsCount() {
        const count = await this.model.getCarsCount();

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
