import Model from '../model/model';
import Api from '../model/api';
import { CarData } from '../types/types';
import Observer from './observer';

class TracksController extends Observer {
    model: Model;
    api: Api;
    constructor() {
        super();
        this.model = new Model();
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

export default TracksController;
