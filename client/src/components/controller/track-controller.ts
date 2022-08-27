import Model from '../model/model';
import Api from '../model/api';
import { CarData } from '../types/types';

class TrackController {
    model: Model;
    api: Api;
    constructor() {
        this.model = new Model();
        this.api = new Api();
    }

    async getCarsCurrentPage() {
        return await this.model.getCarsPageFromLocalStorage();
    }

    async getCarsCount() {
        return await this.model.getCarsCount();
    }

    async getCars(pageNumber: number) {
        return await this.model.getCars(pageNumber);
    }

    createCar(carData: CarData) {
        return this.model.createCar(carData);
    }
}

export default TrackController;
