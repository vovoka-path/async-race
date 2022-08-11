import { CarEngine, Paths } from '../types/types';
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
        const data = await this.getCars(0);
        // console.log('data = ', data?.count);
        return data?.count;
    }

    async getCars(page: number) {
        try {
            const response = await fetch(`${this.paths.garage}?_page=${page}&_limit=${this.carsOnPage}`);

            if (response.status === 200) {
                return {
                    count: response.headers.get('X-Total-Count'),
                    data: await response.json(),
                };
            }

            return null;
        } catch (error) {
            // throw new Error(error as string | undefined);
        }
    }

    async createCar(carData: CarData) {
        // console.log('# createCar: carData =', carData);
        try {
            const response = await fetch(`${this.paths.garage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (response.status === 201) {
                console.log('Success: car was created! Code: 201');
            } else if (response.status === 500) {
                console.log('Unsuccess: car was not created... Code: 500');
            }
        } catch (error) {
            // throw new Error(error as string | undefined);
        }
    }

    async updateCar(carData: CarData) {
        // console.log('# updateCar: carData =', carData);
        const id: number = carData.id || 0;
        const body = {
            name: carData.name,
            color: carData.color,
        };

        try {
            const response = await fetch(`${this.paths.garage}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.status === 200) {
                console.log('Success: car was updated! Code: 200');
                // console.log('response.json() =', response.json());
            } else if (response.status === 404) {
                console.log('Unsuccess: car was not updated... Code: 404');
            }
        } catch (error) {
            // throw new Error(error as string | undefined);
        }
    }

    async deleteCar(id: number) {
        try {
            const response = await fetch(`${this.paths.garage}/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 201) {
                console.log('Success: car was deleted! Code: 201');
            } else if (response.status === 500) {
                console.log('Unsuccess: car was not deleted... Code: 500 ');
            }
        } catch (error) {
            // throw new Error(error as string | undefined);
        }
    }

    async startEngineCar(id: number) {
        try {
            const data = await fetch(`${this.paths.engine}/?id=${id}&status=started`, {
                method: 'PATCH',
            });
            const res: CarEngine = await data.json();
            // console.log('# startEngineCar res = ', res);

            return {
                status: data.status,
                result: res,
            };
        } catch (err) {
            //   throw new Error(err);
        }
    }

    async getEngineCondition(id: number): Promise<{ success: boolean }> {
        try {
            const data = await fetch(`${this.paths.engine}/?id=${id}&status=drive`, {
                method: 'PATCH',
            }); //.catch();
            // const res = await data.json();
            // console.log('# getEngineCondition res.status = ', res.status);

            return data.status !== 200 ? { success: false } : { success: true };
        } catch (err) {
            //   throw new Error(err);
            return { success: false };
        }
    }

    async stopEngineCar(id: number) {
        try {
            const data = await fetch(`${this.paths.engine}/?id=${id}&status=stopped`, {
                method: 'PATCH',
            });
            const res: CarEngine = await data.json();
            // console.log('# stopEngineCar res = ', res);
            return {
                status: data.status,
                result: res,
            };
        } catch (err) {
            //   throw new Error(err);
        }
    }
}

export default Api;
