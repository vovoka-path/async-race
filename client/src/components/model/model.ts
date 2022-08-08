import { FormsData, CarData, VendorCars, CBfunc } from '../types/types'; // Car
import Api from './api';

const indexPage = 'garage';
// const startPage = 0;

class Model {
    formsData: FormsData;
    inputCreateData: CarData;
    inputUpdateData: CarData;
    // method: string;
    HTMLpage: string;
    // carsPage: number;
    api: Api;
    carCount: number;
    nextId: number;
    rerenderCallback: CBfunc;
    constructor() {
        this.api = new Api();
        // let carCount = 0;
        this.carCount = 0; //+(this.getCarsCount() as string);
        // this.getCarsCount();
        this.nextId = this.carCount;
        // this.api.getCars(0).then((res) => (this.carCount = +(res?.count as string)));
        // this.carCount = carCount;
        this.formsData = this.getFormsDataFromLocalStorage();
        this.inputCreateData = { name: '', color: '#000000' };
        this.inputUpdateData = { name: '', color: '#000000' };
        // this.method = '';
        this.HTMLpage = indexPage;
        // this.carsPage = 0;
        // this.getCarsPageFromLocalStorage().then((currentPage) => (this.carsPage = currentPage));
        // this.getCars(0);
        // console.log(this.carsPage, this.page, this.carCount);
        this.rerenderCallback = () => null;
    }

    setRerenderCallback(cb: CBfunc) {
        // console.log('### MODEL: cb = ', cb);
        this.rerenderCallback = cb;
    }

    // async getCarsNumber() {
    //     this.carCount = +((await this.api.getCarsCount()) as string);
    //     console.log(this.carCount);
    //     return this.carCount;
    // }

    async getCarsCount(): Promise<number> {
        // const carCount = await this.api.getCarsCount();
        // this.api.getCarsCount().then((res) => {
        //     this.carCount = +(res as string);
        // });
        const temp = await this.api.getCarsCount();
        const carCount = temp ? +temp : 1;
        console.log('getCarsCount() = ', carCount);
        return carCount;
    }

    async getCars(page: number) {
        // const carsInStorage = await this.getCarsPageFromLocalStorage();
        const cars = await this.api.getCars(page);
        // const cars = await this.api.getCars(page);
        // console.log('&&&& page = ', page, ' === ', this.getCarsPageFromLocalStorage());
        console.log(page, 'getCars =', cars);
        return cars;
    }

    private setFormsDataToLocalStorage(data: FormsData) {
        // console.log('# SET STORAGE, FormsData =', data);
        localStorage.setItem('formsData', JSON.stringify(data));
    }

    private getFormsDataFromLocalStorage() {
        const formsData = localStorage.getItem('formsData')
            ? JSON.parse(localStorage.getItem('formsData') as string)
            : {
                  create: { text: '', color: '#000000' },
                  update: { text: '', color: '#000000' },
              };

        this.formsData = formsData;
        // console.log('# GET STORAGE, FormsData =', formsData);

        return formsData as FormsData;
    }

    setPage(name: string) {
        console.log('### Model.setPage', name);
    }

    getPage() {
        console.log('### Model.getPage', this.HTMLpage);
        return this.HTMLpage;
    }

    setInputCreate(data: CarData) {
        const { update } = this.getFormsDataFromLocalStorage();

        this.setFormsDataToLocalStorage({ create: data, update: update });

        // console.log('### Model.setInputCreate = ', data);
    }

    getInputCreate() {
        this.inputUpdateData = this.getFormsDataFromLocalStorage().create;
        return this.inputCreateData;
    }

    setInputUpdate(data: CarData) {
        const { create } = this.getFormsDataFromLocalStorage();

        this.setFormsDataToLocalStorage({ update: data, create });
        this.inputUpdateData = data;
        // console.log('### Model.setInputCreate = ', data);
    }

    getInputUpdate() {
        this.inputUpdateData = this.getFormsDataFromLocalStorage().update;
        return this.inputUpdateData;
    }

    getNextIdFromLocalStorage(): number {
        let nextId: number;

        if (localStorage.getItem('nextId')) {
            nextId = +(localStorage.getItem('nextId') as string);
        } else {
            this.getCarsCount();
            nextId = this.carCount + 1;
            this.setCarsPageToLocalStorage(nextId);
        }

        return nextId;
    }

    createCar(data: CarData) {
        const storageValue = +this.getNextIdFromLocalStorage();
        console.log('# createCar: this.nextId => ', this.nextId);

        this.api.createCar({ ...data, name: data.name, id: this.nextId });
        this.nextId = storageValue + 1;
        localStorage.setItem('nextId', this.nextId.toString());

        console.log('### Model.createCar = ', { ...data, name: data.name, id: this.nextId });
    }

    async updateCar(data: CarData) {
        await this.api.updateCar(data);

        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderCallback(carsPage);
        console.log('### Model.updateCar = ', data, this.rerenderCallback);
    }

    async generate100Cars() {
        const newCars: VendorCars[] = await this.getNewCars(100);
        // Make Model
        newCars?.forEach((car: VendorCars) => {
            const name = `${car.Make} ${car.Model}`;
            const color = this.getRandomColor();
            this.createCar({ name: name, color: color });
        });
        const carsPage = await this.getCarsPageFromLocalStorage();
        // const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderCallback(carsPage);
        console.log('### Model.generate100Cars', this.rerenderCallback);
    }

    private async getNewCars(number: number): Promise<VendorCars[]> {
        const response = await fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=${number}`, {
            headers: {
                'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z', // This is the fake app's application id
                'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', // This is the fake app's readonly master key
            },
        });
        const data = await response.json();
        // console.log(JSON.stringify(data, null, 2));

        const newCars: VendorCars[] = data.results ? data.results : [];

        return newCars;
    }

    private getRandomColor(): string {
        let hex = (((1 << 24) * Math.random()) | 0).toString(16);
        if (hex.length < 6) hex = hex + 'f';

        return `#${hex}`;
    }

    race(buttonName: string) {
        console.log('### Model.race', buttonName);
    }

    reset(buttonName: string) {
        // const aaa = this.getCarsPageFromLocalStorage();
        // console.log(this.carsPage, this.page, aaa);
        console.log('### Model.reset', buttonName);
    }

    garage(buttonName: string) {
        console.log('### Model.garage', buttonName);
    }

    winners(buttonName: string) {
        console.log('### Model.winners', buttonName);
    }

    private setCarsPageToLocalStorage(carsPage: number) {
        // console.log('# SET STORAGE, FormsData =', data);
        localStorage.setItem('carsPage', carsPage.toString());
    }

    async getCarsPageFromLocalStorage() {
        let carsPage: number;
        const nan = NaN;
        console.log(
            'localStorage.getItem(carsPage) (from Storage) = ',
            localStorage.getItem('carsPage')?.length,
            +(localStorage.getItem('carsPage') as string) !== nan
        );

        if (localStorage.getItem('carsPage') !== undefined) {
            //  &&             !(+(localStorage.getItem('carsPage') as string) !== nan)
            carsPage = +(localStorage.getItem('carsPage') as string);
            console.log('carsPage (from Storage) = ', carsPage);
            const count = await this.getCarsCount();
            const maxPage = Math.ceil(count / 7);

            if (carsPage > maxPage) {
                console.log('maxPage = ', maxPage);
                carsPage = maxPage;
                this.setCarsPageToLocalStorage(carsPage);
            }
        } else {
            console.log('Was Nan -> else carsPage = 1');
            carsPage = 1;
            this.setCarsPageToLocalStorage(carsPage);
        }

        // this.carsPage = carsPage;
        // console.log('# GET STORAGE, carsPage =', carsPage);

        return +carsPage;
    }

    async prev() {
        const storageValue = await this.getCarsPageFromLocalStorage();

        if (+storageValue !== 1) {
            const carsPage = +storageValue - 1;
            this.setCarsPageToLocalStorage(carsPage);
            // const carsPage = +(localStorage.getItem('carsPage') as string);
            this.rerenderCallback(carsPage);
        }
        console.log('### Model.prev', 'carsPage = ', storageValue, this.rerenderCallback);
        // console.log('\n', ' set == ', this.carsPage);
        // console.log('\nGET storageValue = ', +this.getCarsPageFromLocalStorage());
    }

    async next() {
        const storageCount: number = await this.getCarsPageFromLocalStorage();
        const count: number = await this.getCarsCount();
        console.log('NEXT count =', count, '| storageCount =', storageCount, Math.ceil(count / 7));
        // console.log(
        //     '\nGET storageValue = ',
        //     storageValue,
        //     'count / 7 = ',
        //     Math.ceil(count / 7),
        //     'currentPage = ',
        //     this.carsPage
        // );
        //  Math.ceil(count / 7) > storageValue

        if (storageCount < Math.ceil(count / 7)) {
            const carsPage = storageCount + 1;
            this.setCarsPageToLocalStorage(carsPage);
            // console.log('###', 'set = ', this.carsPage, 'currentPage = ', this.carsPage);
            // console.log('### Math.ceil(carCount / 7) =', Math.ceil(this.carCount / 7), '<', storageValue);
            const val = +(localStorage.getItem('carsPage') as string);
            console.log('carsPage (CHECK from Storage) = ', val, this.rerenderCallback);
            // const carsPage = +(localStorage.getItem('carsPage') as string);
            this.rerenderCallback(carsPage);
        }
    }

    start(buttonName: string, id?: string) {
        console.log('### Model.start', id, buttonName);
    }
    stop(buttonName: string, id?: string) {
        console.log('### Model.stop', id, buttonName);
    }
    // edit(buttonName: string, id?: string) {
    //     console.log('### Model.edit', id, buttonName);
    // }
    delete(id?: string) {
        if (id) {
            this.api.deleteCar(+id);
        }

        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderCallback(carsPage);

        console.log('### Model.delete', id, this.rerenderCallback);
    }
}

export default Model;
