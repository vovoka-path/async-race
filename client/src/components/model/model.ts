import { FormsData, CarData, VendorCars, CBfunc, CallbackType, GarageElements, State } from '../types/types';
import { getRandomColor } from '../utils/utils';
import Api from './api';
import Cars from '../view/track/cars';

const INDEXPAGE = 'garage';
const GENERATE_NUMBER_CARS = 100;
const CARS_PER_PAGE = 7;
const btnIsActive = {
    yes: true,
    no: false,
}
const defaultCarData = { text: '', color: '#000000' };

class Model {
    formsData: FormsData;
    inputCreateData: CarData = defaultCarData;
    inputUpdateData: CarData = defaultCarData;
    pageName: string = INDEXPAGE;
    api: Api = new Api();
    carCount = 5;
    lastCarId: number;
    rerenderTrack: CBfunc = () => null;
    rerenderTracks: CBfunc = () => null;
    rerenderTracksTitle: CBfunc = () => null;
    cbs: CallbackType<GarageElements>[] = [];
    buttons: HTMLCollectionOf<HTMLButtonElement>;
    carAnimation: Animation | undefined;
    carImage = new Cars();
    isStop: { [key: string]: boolean } = {};
    timeRace: { [key: string]: boolean } = {};
    constructor() {
        this.lastCarId = this.carCount;
        this.formsData = this.getFormsDataFromLocalStorage();
        this.buttons = this.getButtons();
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
        const carId = +id;
        const res = await this.api.stopEngineCar(carId);

        if (res?.result) {
            window.cancelAnimationFrame(res?.result.velocity);
        }

        this.isStop = { ...this.isStop, [carId]: true };
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

        const carId = +id;
        const start = await this.api.startEngineCar(carId);
        this.isStop = { ...this.isStop, [carId]: false };

        if (start) {
            this.buttons.namedItem('start')?.classList.remove('not-active');
            const { status, result } = start;
            const { velocity, distance } = result;
            const animationTime = Math.round(distance / velocity);
            const screenWidth = document.documentElement.scrollWidth;
            const milliSecInSec = 1000;
            const raceTime = (animationTime / milliSecInSec).toFixed(2);
            this.timeRace = { ...this.timeRace, [carId]: raceTime };

            setTimeout(() => {
                this.toggleButton(startButton as HTMLButtonElement, btnIsActive.yes);
                this.toggleButton(stopButton as HTMLButtonElement, btnIsActive.no);
            }, animationTime);

            const margin = 80;
            const roadLength = screenWidth - margin;

            const car = document.getElementById(`car-${id}`) as HTMLElement;
            if (status === 200) {
                this.animation(car, roadLength, animationTime, carId);
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
        const state = { id: 1 };

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

        this.checkEngineCondition(id, state);

        state.id = window.requestAnimationFrame(getStep);
    }

    checkEngineCondition(id: number, state: State) {
        return async () => {
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
        }
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
        return await this.api.getCarsCount().then(carCount => carCount ? +carCount : 1)
    }

    async getCars(page: number) {
        return await this.api.getCars(page);
    }

    private setFormsDataToLocalStorage(data: FormsData) {
        localStorage.setItem('formsData', JSON.stringify(data));
    }

    private getFormsDataFromLocalStorage(): FormsData {
        return localStorage.getItem('formsData')
            ? JSON.parse(localStorage.getItem('formsData') as string)
            : {
                create: defaultCarData,
                update: defaultCarData,
            };
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
        const pageCount = Math.ceil(this.carCount / CARS_PER_PAGE);

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

    async generateCars(carCount = GENERATE_NUMBER_CARS) {
        const newCars: VendorCars[] = await this.api.getNewCars(carCount);
        let lastCarId = +this.getNextIdFromLocalStorage();

        newCars?.forEach((car: VendorCars, i: number) => {
            const name = `${car.Make} ${car.Model}`;
            const color = getRandomColor();

            this.api.createCar({ name: name, color: color, id: lastCarId + i });
        });

        lastCarId += carCount;
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
        const carsPagePrev = await this.getCarsPageFromLocalStorage();

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
        const carsPagePrev = await this.getCarsPageFromLocalStorage();
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
            const maxPage = Math.ceil(count / CARS_PER_PAGE);

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
