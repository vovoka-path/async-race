import { CarEngine, Paths, VendorCars } from '../types/types';
import { CarData } from '../types/types';

class Api {
    serverUrl: string;
    paths: Paths;
    carsOnPage: number;
    constructor() {
        this.serverUrl = 'http://127.0.0.1:3000';
        this.paths = {
            garage: `${this.serverUrl}/garage`,
            winners: `${this.serverUrl}/winners`,
            engine: `${this.serverUrl}/engine`,
        };
        this.carsOnPage = 7;
    }

    async getCarsCount() {
        return this.getCars(0).then(data => data?.count);
    }

    async getCars(page: number) {
        return fetch(`${this.paths.garage}?_page=${page}&_limit=${this.carsOnPage}`)
            .then(async (response) => {
                return {
                    count: response.headers.get('X-Total-Count'),
                    data: await response.json(),
                };
            })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async createCar(carData: CarData): Promise<void> {
            const headers = { 'Content-Type': 'application/json' };

            fetch(`${this.paths.garage}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(carData),
            })
                .catch (error => {
                    throw new Error(error as string | undefined);
                })
    }

    async updateCar(carData: CarData): Promise<void> {
        const id: number = carData.id || 0;
        const body = {
            name: carData.name,
            color: carData.color,
        };

        const headers = { 'Content-Type': 'application/json' };

        fetch(`${this.paths.garage}/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async deleteCar(id: number): Promise<void> {
        fetch(`${this.paths.garage}/${id}`, {
            method: 'DELETE',
        })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async startEngineCar(id: number): Promise<{ status: number, result: CarEngine }> {
        return fetch(`${this.paths.engine}/?id=${id}&status=started`, {
            method: 'PATCH',
        })
            .then(async (response) => {
            const res: CarEngine = await response.json();

                return {
                    status: response.status,
                    result: res,
                };
            })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async getEngineCondition(id: number): Promise<{ success: boolean }> {
        return fetch(`${this.paths.engine}/?id=${id}&status=drive`, {
            method: 'PATCH',
        })
            .then(async (response) => {
                return { success: response.status === 200 };
            })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async stopEngineCar(id: number): Promise<{ status: number, result: CarEngine }> {
        return fetch(`${this.paths.engine}/?id=${id}&status=stopped`, {
            method: 'PATCH',
        })
            .then(async (response) => {
            const res: CarEngine = await response.json();
            return {
                status: response.status,
                result: res,
            };
            })
            .catch (error => {
                throw new Error(error as string | undefined);
            })
    }

    async getNewCars(number: number): Promise<VendorCars[]> {
        const response = await fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=${number}`, {
            headers: {
                'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z',
                'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW',
            },
        });
        const data = await response.json();
        const newCars: VendorCars[] = data.results ? data.results : [];

        return newCars;
    }
}

export default Api;
