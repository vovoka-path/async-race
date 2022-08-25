import { FormsData, CarData, VendorCars, CBfunc, CallbackType, GarageElements } from '../types/types'; // Car
import Api from './api';
import Cars from '../view/track/cars';

const INDEXPAGE = 'garage';
const GENERATE_NUMBER_CARS = 100;
const btnIsActive = {
    yes: true,
    no: false,
}

class Model {
    formsData: FormsData;
    inputCreateData: CarData;
    inputUpdateData: CarData;
    pageName: string;
    api: Api;
    carCount: number;
    lastCarId: number;
    rerenderTrack: CBfunc;
    rerenderTracks: CBfunc;
    rerenderTracksTitle: CBfunc;
    cbs: CallbackType<GarageElements>[];
    buttons: HTMLCollectionOf<HTMLButtonElement>;
    carAnimation: Animation | undefined;
    carImage: Cars;
    isStop: { [key: string]: boolean };
    timeRace: { [key: string]: boolean };
    constructor() {
        this.api = new Api();
        this.carCount = 5;
        this.lastCarId = this.carCount;
        this.formsData = this.getFormsDataFromLocalStorage();
        this.inputCreateData = { name: '', color: '#000000' };
        this.inputUpdateData = { name: '', color: '#000000' };
        this.pageName = INDEXPAGE;
        this.cbs = [];
        this.rerenderTrack = () => null;
        this.rerenderTracks = () => null;
        this.rerenderTracksTitle = () => null;
        this.buttons = this.getButtons();
        this.carImage = new Cars();
        this.isStop = {};
        this.timeRace = {};
    }

    async race() {
        const tracks = document.body.getElementsByClassName('container-track');

        for (let i = 0; i < tracks.length; i++) {
            const element = tracks[i];

            if (element.getAttribute('id') !== null) {
                const id = element.getAttribute('id') ? element.getAttribute('id') : '0';
                if (id) this.startCarEngine(id);
            }
        }
    }

    async stop(id: string) {
        const id_ = +id;
        const res = await this.api.stopEngineCar(id_);

        if (res?.result) {
            window.cancelAnimationFrame(res?.result.velocity);
        }

        this.isStop = { ...this.isStop, [id_]: true };
    }

    async startCarEngine(id: string): Promise<void> {
        const startButton = (document.body.getElementsByClassName('container-track').namedItem(id) as HTMLElement)
            .getElementsByTagName('button')
            .namedItem('start');
        const stopButton = (document.body.getElementsByClassName('container-track').namedItem(id) as HTMLElement)
            .getElementsByTagName('button')
            .namedItem('stop');

        this.toggleButton(startButton as HTMLButtonElement, btnIsActive.no);
        this.toggleButton(stopButton as HTMLButtonElement, btnIsActive.yes);

        const id_ = +id;
        const start = await this.api.startEngineCar(id_);
        this.isStop = { ...this.isStop, [id_]: false };

        if (start) {
            this.buttons.namedItem('start')?.classList.remove('not-active');
            const { status, result } = start;
            const { velocity, distance } = result;
            const animationTime = Math.round(distance / velocity);
            const screenWidth = document.documentElement.scrollWidth;
            const raceTime = Math.round(animationTime / 10) / 100;
            this.timeRace = { ...this.timeRace, [id_]: raceTime };

            setTimeout(() => {
                this.toggleButton(startButton as HTMLButtonElement, btnIsActive.yes);
                this.toggleButton(stopButton as HTMLButtonElement, btnIsActive.no);
            }, animationTime);

            const roadLength = screenWidth - 80;

            const car = document.getElementById(`car-${id}`) as HTMLElement;
            if (status === 200) {
                this.animation(car, roadLength, animationTime, id_);
            }
        }
    }

    toggleButton(button: HTMLButtonElement, state: boolean) {
        switch (state) {
            case btnIsActive.yes:
                button.disabled = false;
                if (button.classList.contains('not-active')) {
                    button.classList.remove('not-active');
                }
                break;
            case btnIsActive.no:
                button.disabled = true;
                if (!button.classList.contains('not-active')) {
                    button.classList.add('not-active');
                }
        }
    }

    async animation(car: HTMLElement, roadLength: number, animationTime: number, id: number) {
        let start: number | null = null;
        const state: {
            id: number;
        } = { id: 1 };

        const getStep = (timestamp: number) => {
            if (!start) start = timestamp;
            const time = timestamp - start;
            let passed = Math.round(time * (roadLength / animationTime));

            if (this.isStop[id] === true) {
                window.cancelAnimationFrame(state.id);
                passed = -1;
            }

            car.style.transform = `translateX(${Math.min(passed, roadLength)}px)`;
            if (passed < roadLength && passed >= 0) {
                state.id = window.requestAnimationFrame(getStep);
            }
        };

        (async () => {
            const { success } = await this.api.getEngineCondition(id);

            if (!success) {
                window.cancelAnimationFrame(state.id);

                const startButton = (
                    document.body.getElementsByClassName('container-track').namedItem(id.toString()) as HTMLElement
                )
                    .getElementsByTagName('button')
                    .namedItem('start');
                const stopButton = (
                    document.body.getElementsByClassName('container-track').namedItem(id.toString()) as HTMLElement
                )
                    .getElementsByTagName('button')
                    .namedItem('stop');

                this.toggleButton(startButton as HTMLButtonElement, btnIsActive.yes);
                this.toggleButton(stopButton as HTMLButtonElement, btnIsActive.no);
            }
        })();

        state.id = window.requestAnimationFrame(getStep);
    }

    getButtons() {
        return document.getElementsByTagName('button') as HTMLCollectionOf<HTMLButtonElement>;
    }

    setRerenderTracks(cb: CBfunc) {
        this.rerenderTracks = cb;
    }

    setRerenderTracksTitle(cb: CBfunc) {
        this.rerenderTracksTitle = cb;
    }

    setRerenderTrack(cb: CBfunc) {
        this.rerenderTrack = cb;
    }

    async getCarsCount(): Promise<number> {
        const temp = await this.api.getCarsCount();
        const carCount = temp ? +temp : 1;

        return carCount;
    }

    async getCars(page: number) {
        const cars = await this.api.getCars(page);

        return cars;
    }

    private setFormsDataToLocalStorage(data: FormsData) {
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

        return formsData as FormsData;
    }

    setPageName(name: string) {
        localStorage.setItem('pageNameAsyncRace', name);
    }

    getPageName() {
        const pageName = localStorage.getItem('pageNameAsyncRace')
            ? (localStorage.getItem('pageNameAsyncRace') as string)
            : INDEXPAGE;

        this.pageName = pageName;

        return this.pageName;
    }

    setInputCreate(data: CarData) {
        const { update } = this.getFormsDataFromLocalStorage();
        this.setFormsDataToLocalStorage({ create: data, update: update });
    }

    getInputCreate() {
        this.inputUpdateData = this.getFormsDataFromLocalStorage().create;
        return this.inputCreateData;
    }

    setInputUpdate(data: CarData) {
        const { create } = this.getFormsDataFromLocalStorage();

        this.setFormsDataToLocalStorage({ update: data, create });
        this.inputUpdateData = data;
    }

    getInputUpdate() {
        this.inputUpdateData = this.getFormsDataFromLocalStorage().update;
        return this.inputUpdateData;
    }

    getNextIdFromLocalStorage(): number {
        let nextId: number;

        if (localStorage.getItem('lastCarId')) {
            nextId = +(localStorage.getItem('lastCarId') as string);
        } else {
            this.getCarsCount();
            nextId = this.carCount + 1;
            this.setCarsPageToLocalStorage(nextId);
        }

        return nextId;
    }

    async getLastCarsPage() {
        this.carCount = await this.getCarsCount();
        const pageCount = Math.ceil(this.carCount / 7);

        return pageCount;
    }

    async isLastCarsPage(currentCarsPage: number) {
        const lastPage = await this.getLastCarsPage();

        return currentCarsPage === lastPage;
    }

    async createCar(data: CarData) {
        const lastCarId = +this.getNextIdFromLocalStorage();

        this.api.createCar({ ...data, name: data.name, id: this.lastCarId });
        this.lastCarId = lastCarId + 1;
        localStorage.setItem('lastCarId', this.lastCarId.toString());

        const carsPage = +(localStorage.getItem('carsPage') as string);
        const isLastCarsPage = await this.isLastCarsPage(carsPage);

        if (isLastCarsPage) {
            this.rerenderTracks(carsPage);
        } else {
            this.rerenderTracksTitle(carsPage);

            const nextButton = this.buttons.namedItem('next');
            this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.yes);
        }
    }

    async generate100Cars() {
        const newCars: VendorCars[] = await this.getNewCars(GENERATE_NUMBER_CARS);
        let lastCarId = +this.getNextIdFromLocalStorage();

        newCars?.forEach((car: VendorCars, i: number) => {
            const name = `${car.Make} ${car.Model}`;
            const color = this.getRandomColor();

            this.api.createCar({ name: name, color: color, id: lastCarId + i });
        });

        lastCarId += GENERATE_NUMBER_CARS;
        localStorage.setItem('lastCarId', lastCarId.toString());

        const carsPage = await this.getCarsPageFromLocalStorage();
        const mustRenderTracks = await this.isLastCarsPage(carsPage);

        if (mustRenderTracks) {
            this.rerenderTracks(carsPage);
        } else {
            this.rerenderTracksTitle(carsPage);
        }

        const nextButton = this.buttons.namedItem('next');
        this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.yes);
    }

    async prev() {
        const carsPagePrev = +(await this.getCarsPageFromLocalStorage());

        if (carsPagePrev !== 1) {
            this.setCarsPageToLocalStorage(carsPagePrev - 1);
            this.rerenderTracks(carsPagePrev);
        }

        const isLandingOnTheFirstPage = carsPagePrev - 1 === 1;

        if (isLandingOnTheFirstPage) {
            const prevButton = this.buttons.namedItem('prev');
            this.toggleButton(prevButton as HTMLButtonElement, btnIsActive.no);
        }

        const isLastCarsPage = await this.isLastCarsPage(carsPagePrev - 1);

        if (!isLastCarsPage) {
            const nextButton = this.buttons.namedItem('next');
            this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.yes);
        }
    }

    async next() {
        const carsPagePrev = +(await this.getCarsPageFromLocalStorage());
        let isLastCarsPage = await this.isLastCarsPage(carsPagePrev);

        if (!isLastCarsPage) {
            this.setCarsPageToLocalStorage(carsPagePrev + 1);
            this.rerenderTracks(carsPagePrev);

            if (carsPagePrev === 1) {
                const prevButton = this.buttons.namedItem('prev');
                this.toggleButton(prevButton as HTMLButtonElement, btnIsActive.yes);
            } else {
                this.rerenderTracksTitle(carsPagePrev + 1);
            }
        }

        const carsPageNext = +(await this.getCarsPageFromLocalStorage());
        isLastCarsPage = await this.isLastCarsPage(carsPageNext);

        if (isLastCarsPage) {
            const nextButton = this.buttons.namedItem('next');
            this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.no);
        }

        if (carsPageNext === 2) {
            const prevButton = this.buttons.namedItem('prev');
            this.toggleButton(prevButton as HTMLButtonElement, btnIsActive.yes);
        }
    }

    async updateCar(data: CarData) {
        await this.api.updateCar(data);

        const { id, name, color } = data;
        const id_ = id ? id.toString() : '-1';
        const trackElement = document.body.getElementsByClassName('container-track').namedItem(id_) as HTMLElement;
        const titleElement = trackElement?.getElementsByClassName(
            'car-name_title'
        ) as HTMLCollectionOf<HTMLButtonElement>;

        titleElement[0].innerText = `#${id} ${name} (color: ${color})`;

        const car = document.getElementById(`car-${id}`) as HTMLElement;
        car.innerHTML = this.carImage.getSportcar(color);
    }

    private async getNewCars(number: number): Promise<VendorCars[]> {
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

    private getRandomColor(): string {
        let hex = (((1 << 24) * Math.random()) | 0).toString(16);
        if (hex.length < 6) hex = hex + 'f';

        return `#${hex}`;
    }

    reset() {
        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderTracks(carsPage);
    }

    private setCarsPageToLocalStorage(carsPage: number) {
        localStorage.setItem('carsPage', carsPage.toString());
    }

    async getCarsPageFromLocalStorage() {
        let carsPage: number;

        if (localStorage.getItem('carsPage') !== undefined) {
            carsPage = +(localStorage.getItem('carsPage') as string);

            const count = await this.getCarsCount();
            const maxPage = Math.ceil(count / 7);

            if (carsPage > maxPage) {
                carsPage = maxPage;
                this.setCarsPageToLocalStorage(carsPage);
            }
        } else {
            carsPage = 1;
            this.setCarsPageToLocalStorage(carsPage);
        }

        return +carsPage;
    }

    async delete(id?: string) {
        if (id) {
            this.api.deleteCar(+id);
        }

        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderTracks(carsPage);

        const isLastCarsPage = await this.isLastCarsPage(carsPage);

        if (isLastCarsPage) {
            const nextButton = this.buttons.namedItem('next');
            this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.no);
        } else {
            const nextButton = this.buttons.namedItem('next');
            this.toggleButton(nextButton as HTMLButtonElement, btnIsActive.yes);
        }
    }
    
    garage(buttonName: string) {
        console.log('### Model.garage', buttonName);
    }

    winners(buttonName: string) {
        console.log('### Model.winners', buttonName);
    }
}

export default Model;
