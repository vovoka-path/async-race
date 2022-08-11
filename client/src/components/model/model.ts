import { FormsData, CarData, VendorCars, CBfunc, CallbackType, GarageElements } from '../types/types'; // Car
import Api from './api';
import Cars from '../view/track/cars';

const INDEXPAGE = 'garage';
// const startPage = 0;

class Model {
    formsData: FormsData;
    inputCreateData: CarData;
    inputUpdateData: CarData;
    // method: string;
    pageName: string;
    // maxPage: number;
    // carsPage: number;
    api: Api;
    carCount: number;
    lastCarId: number;
    rerenderTrack: CBfunc;
    rerenderTracks: CBfunc;
    rerenderTracksTitle: CBfunc;
    // getGarageElements: CallbackType3<GarageElements>;
    cbs: CallbackType<GarageElements>[];
    buttons: HTMLCollectionOf<HTMLButtonElement>;
    carAnimation: Animation | undefined;
    carImage: Cars;
    isStop: { [key: string]: boolean };
    timeRace: { [key: string]: boolean };
    constructor() {
        this.api = new Api();
        // let carCount = 0;
        this.carCount = 5; //+(this.getCarsCount() as string);
        // this.getCarsCount();
        this.lastCarId = this.carCount;
        // this.api.getCars(0).then((res) => (this.carCount = +(res?.count as string)));
        // this.carCount = carCount;
        this.formsData = this.getFormsDataFromLocalStorage();
        this.inputCreateData = { name: '', color: '#000000' };
        this.inputUpdateData = { name: '', color: '#000000' };
        // this.method = '';
        this.pageName = INDEXPAGE;
        // this.carsPage = 0;
        // this.getCarsPageFromLocalStorage().then((currentPage) => (this.carsPage = currentPage));
        // this.getCars(0);
        // console.log(this.carsPage, this.page, this.carCount);
        this.cbs = [];
        this.rerenderTrack = () => null;
        this.rerenderTracks = () => null;
        this.rerenderTracksTitle = () => null;
        // this.getGarageElements = () => T;
        this.buttons = this.getButtons();
        this.carImage = new Cars();
        this.isStop = {};
        this.timeRace = {};
    }

    async race() {
        const tracks = document.body.getElementsByClassName('container-track');
        // console.log('### Model.race', tracks);

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
        // const res = await this.api.stopEngineCar(id_);

        // (async () => {
        const res = await this.api.stopEngineCar(id_);
        // console.log(' IsStop status = ', res);
        if (res?.result) {
            window.cancelAnimationFrame(res?.result.velocity);
        }
        // })();

        this.isStop = { ...this.isStop, [id_]: true };
    }

    async startCarEngine(id: string): Promise<void> {
        const startButton = (document.body.getElementsByClassName('container-track').namedItem(id) as HTMLElement)
            .getElementsByTagName('button')
            .namedItem('start');
        const stopButton = (document.body.getElementsByClassName('container-track').namedItem(id) as HTMLElement)
            .getElementsByTagName('button')
            .namedItem('stop');

        if (startButton) {
            startButton.disabled = true;
            if (!startButton.classList.contains('not-active')) {
                startButton.classList.add('not-active');
            }
        }

        if (stopButton) {
            stopButton.disabled = false;
            if (stopButton.classList.contains('not-active')) {
                stopButton.classList.remove('not-active');
            }
        }

        const id_ = +id;
        const start = await this.api.startEngineCar(id_);
        this.isStop = { ...this.isStop, [id_]: false };
        // console.log('# id = ', id, ', start = ', start);
        // const screenWidth = document.documentElement.scrollWidth;
        // const time = screenWidth / start?.result.velocity;

        if (start) {
            this.buttons.namedItem('start')?.classList.remove('not-active');
            const { status, result } = start;
            const { velocity, distance } = result;
            const animationTime = Math.round(distance / velocity);
            const screenWidth = document.documentElement.scrollWidth;
            const raceTime = Math.round(animationTime / 10) / 100;
            // console.log('#()()() animationTime = ', raceTime);
            this.timeRace = { ...this.timeRace, [id_]: raceTime };

            setTimeout(() => {
                if (startButton) {
                    startButton.disabled = false;
                    if (startButton.classList.contains('not-active')) {
                        startButton.classList.remove('not-active');
                    }
                }

                if (stopButton) {
                    stopButton.disabled = true;
                    if (!stopButton.classList.contains('not-active')) {
                        stopButton.classList.add('not-active');
                    }
                }
            }, animationTime);

            const roadLength = screenWidth - 80;

            const car = document.getElementById(`car-${id}`) as HTMLElement;
            if (status === 200) {
                this.animation(car, roadLength, animationTime, id_);
            }
        }
    }

    async animation(car: HTMLElement, roadLength: number, animationTime: number, id: number) {
        let start: number | null = null;
        const state: {
            id: number;
        } = { id: 1 };

        const getStep = (timestamp: number) => {
            // console.log('# this.isStop[id] = ', this.isStop[id], state.id);
            if (!start) start = timestamp;
            const time = timestamp - start;
            let passed = Math.round(time * (roadLength / animationTime));

            // let stopPoint = -1;
            if (this.isStop[id] === true) {
                window.cancelAnimationFrame(state.id);
                // stopPoint = passed;
                passed = -1;
            }

            car.style.transform = `translateX(${Math.min(passed, roadLength)}px)`;
            // console.log('# passed = ', passed);
            //  && passed > 0
            if (passed < roadLength && passed >= 0) {
                state.id = window.requestAnimationFrame(getStep);
            }

            // if (passed === 0) {
            // state.id = window.requestAnimationFrame(() => stopPoint);
            // }
        };

        (async () => {
            const { success } = await this.api.getEngineCondition(id);
            // console.log('# isEngineBroken = ', !success, state.id);
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

                if (startButton) {
                    startButton.disabled = false;
                    if (startButton.classList.contains('not-active')) {
                        startButton.classList.remove('not-active');
                    }
                }

                if (stopButton) {
                    stopButton.disabled = true;
                    if (!stopButton.classList.contains('not-active')) {
                        stopButton.classList.add('not-active');
                    }
                }
            }
        })();

        state.id = window.requestAnimationFrame(getStep);
        // console.log('# END! = ');
    }

    // ****
    // async startCarEngine(id: string): Promise<void> {
    //     const id_ = +id;
    //     const data = await this.api.startEngineCar(id_);

    //     if (data?.status === 200) {
    //         // this.updateButtons(true);

    //         const { result } = data;
    //         const time = result.distance / result.velocity;

    //         this.animationCar(time, id_);
    //         await this.switchToDriveMode(result, id_);
    //     }
    // }

    // animationCar(time: number, id: number): void {
    //     const carImageWidth = '75';
    //     const car = document.getElementById(`car-${id}`) as HTMLElement;

    //     if (car) {
    //         this.carAnimation = car.animate([{ left: '75px' }, { left: `calc(100% - ${carImageWidth}px)` }], {
    //             duration: time,
    //             easing: 'ease-in-out',
    //         });

    //         if (this.carAnimation) {
    //             this.carAnimation.play();
    //             this.carAnimation.onfinish = () => {
    //                 car.style.left = `calc(100% - ${carImageWidth}px)`;
    //             };
    //         }
    //     }
    // }

    // private async switchToDriveMode(carEngineData: CarEngine, id: number): Promise<void> {
    //     console.log('#$# car = ', carEngineData);
    //     const driveMode = await this.api.switchToDriveMode(id);
    //     return new Promise((resolve) => {
    //         if (driveMode === 500) {
    //             this.carAnimation?.pause();
    //         }

    //         if (driveMode === 200) {
    //             // const speed = Math.floor(carEngineData.distance / carEngineData.velocity);
    //             // console.log('# speed = ', speed);
    //             const car = document.getElementById(`car-${id}`) as HTMLElement;

    //             this.animation(car, carEngineData.distance, carEngineData.velocity);
    //             resolve();
    //         }
    //     });
    // }

    // animation(el: HTMLElement, distance: number, duration: number): { [id: string]: number } {
    //     const start = performance.now();
    //     const draw = (passed: number) => {
    //         el.style.marginLeft = `${Math.min(passed)}px`;
    //     };
    //     const store: { [id: string]: number } = {};
    //     function animate(time: number) {
    //         const time1 = time - start;
    //         const passed = Math.round(time1 * (distance / duration));
    //         draw(passed);
    //         if (passed < distance) {
    //             store.id = requestAnimationFrame(animate);
    //         }
    //     }
    //     store.id = requestAnimationFrame(animate);
    //     return store;
    // }

    getButtons() {
        return document.getElementsByTagName('button') as HTMLCollectionOf<HTMLButtonElement>;
    }

    // setGarageElements(cb: CallbackType3<GarageElements>) {
    //     this.cbs.
    //     this.getGarageElements = cb;
    // }

    setRerenderTracks(cb: CBfunc) {
        // console.log('### MODEL: cb = ', cb);
        this.rerenderTracks = cb;
    }

    setRerenderTracksTitle(cb: CBfunc) {
        // console.log('### MODEL: cb = ', cb);
        this.rerenderTracksTitle = cb;
    }

    setRerenderTrack(cb: CBfunc) {
        // console.log('### MODEL: cb = ', cb);
        this.rerenderTrack = cb;
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
        // console.log('getCarsCount() = ', carCount);
        return carCount;
    }

    async getCars(page: number) {
        // const carsInStorage = await this.getCarsPageFromLocalStorage();
        const cars = await this.api.getCars(page);
        // const cars = await this.api.getCars(page);
        // console.log('&&&& page = ', page, ' === ', this.getCarsPageFromLocalStorage());
        // console.log(page, 'getCars =', cars);
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

    setPageName(name: string) {
        // console.log('### Model.setPage', name);
        localStorage.setItem('pageNameAsyncRace', name);
    }

    getPageName() {
        // console.log('### Model.getPage', this.pageName);
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
        // console.log('### Model.setInputCreate = ', data);
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
        // console.log('# getLastCarsPage()| carCount = ', this.carCount, ', LastCarsPage =', pageCount);

        return pageCount;
    }

    async isLastCarsPage(currentCarsPage: number) {
        // const currentCarsPage = await this.getCarsPageFromLocalStorage();
        const lastPage = await this.getLastCarsPage();

        return currentCarsPage === lastPage;
    }

    async createCar(data: CarData) {
        const lastCarId = +this.getNextIdFromLocalStorage();
        // console.log('# createCar: this.nextId => ', this.lastCarId, data);

        this.api.createCar({ ...data, name: data.name, id: this.lastCarId });
        this.lastCarId = lastCarId + 1;
        localStorage.setItem('lastCarId', this.lastCarId.toString());

        const carsPage = +(localStorage.getItem('carsPage') as string);
        const isLastCarsPage = await this.isLastCarsPage(carsPage);
        // console.log('### Model.createCar = ', { ...data, name: data.name, id: this.lastCarId });
        // const carsPage = +(localStorage.getItem('carsPage') as string);
        // this.carCount = await this.getCarsCount();
        // const maxPage = Math.ceil(this.carCount / 7);

        if (isLastCarsPage) {
            // console.log('rerenderTracks');
            this.rerenderTracks(carsPage);
        } else {
            // console.log('rerenderTracksTitle');
            this.rerenderTracksTitle(carsPage);

            const nextButton = this.buttons.namedItem('next');

            if (nextButton) {
                nextButton.disabled = false;

                if (nextButton.classList.contains('not-active')) {
                    nextButton.classList.remove('not-active');
                }
            }
        }
        // this.carCount += 1;
        // console.log('### Model.createCar/ carsPage= ', carsPage, 'maxPage= ', maxPage, 'this.carCount=', this.carCount);
        // console.log('### Model.createCar = ', data, this.rerenderCallback);
    }

    async generate100Cars() {
        const newCars: VendorCars[] = await this.getNewCars(100);
        let lastCarId = +this.getNextIdFromLocalStorage();
        // Make Model
        newCars?.forEach((car: VendorCars, i: number) => {
            const name = `${car.Make} ${car.Model}`;
            const color = this.getRandomColor();
            // this.createCar({ name: name, color: color });

            // for (let i = 1; i <= this.lastCarId; i++) {
            this.api.createCar({ name: name, color: color, id: lastCarId + i });
            // }

            // const carsPage = +(localStorage.getItem('carsPage') as string);
            // const isLastCarsPage = await this.isLastCarsPage(carsPage);
        });
        lastCarId += 100;
        localStorage.setItem('lastCarId', lastCarId.toString());

        const carsPage = await this.getCarsPageFromLocalStorage();
        const mustRenderTracks = await this.isLastCarsPage(carsPage);

        if (mustRenderTracks) {
            this.rerenderTracks(carsPage);
        } else {
            this.rerenderTracksTitle(carsPage);
        }

        const nextButton = this.buttons.namedItem('next');

        if (nextButton) {
            nextButton.disabled = false;

            if (nextButton.classList.contains('not-active')) {
                nextButton.classList.remove('not-active');
            }
        }
    }

    async prev() {
        const carsPagePrev = +(await this.getCarsPageFromLocalStorage());

        if (carsPagePrev !== 1) {
            // carsPagePrev -= 1;
            this.setCarsPageToLocalStorage(carsPagePrev - 1);
            // console.log('### Model.prev', 'carsPage = ', carsPagePrev, this.rerenderTracks);
            this.rerenderTracks(carsPagePrev);
        }

        const isLandingOnTheFirstPage = carsPagePrev - 1 === 1;
        // console.log('# isLandingOnTheFirstPage = ', isLandingOnTheFirstPage);

        if (isLandingOnTheFirstPage) {
            // const prevButton: HTMLButtonElement = document.getElementById('prev') as HTMLButtonElement;
            // console.log('# el = ', prevButton);
            // prevButton?.classList.toggle('not-active');
            // prevButton.disabled = true;
            // this.buttons.namedItem('prev')?.classList.toggle('not-active');

            const prevButton = this.buttons.namedItem('prev');

            if (prevButton) {
                prevButton.disabled = true;
                if (!prevButton?.classList.contains('not-active')) {
                    prevButton?.classList.add('not-active');
                }
            }
            // console.log('# prevButton = ', prevButton);

            // const nextButton: HTMLButtonElement = document.getElementById('next') as HTMLButtonElement;
            // nextButton.classList.toggle('not-active');
            // nextButton.disabled = false;
            // this.buttons.namedItem('next')?.classList.toggle('not-active');
        }

        const isLastCarsPage = await this.isLastCarsPage(carsPagePrev - 1);

        if (!isLastCarsPage) {
            const nextButton = this.buttons.namedItem('next');

            if (nextButton) {
                nextButton.disabled = false;
                if (nextButton.classList.contains('not-active')) {
                    nextButton.classList.remove('not-active');
                }
            }
        }
        // const carsPage = +(localStorage.getItem('carsPage') as string);
        // console.log('\n', ' set == ', this.carsPage);
        // console.log('\nGET storageValue = ', +this.getCarsPageFromLocalStorage());
        // const carsPage = await this.getCarsPageFromLocalStorage();
        // this.rerenderCallback(carsPage);
        // console.log('### Model.prev', this.rerenderCallback);
    }

    async next() {
        const carsPagePrev = +(await this.getCarsPageFromLocalStorage());
        let isLastCarsPage = await this.isLastCarsPage(carsPagePrev);

        if (!isLastCarsPage) {
            this.setCarsPageToLocalStorage(carsPagePrev + 1);
            // console.log('### Model.next', 'carsPage = ', carsPagePrev, this.rerenderTracks);
            this.rerenderTracks(carsPagePrev);

            if (carsPagePrev === 1) {
                // carsPage += 1;
                // this.buttons.namedItem('next')?.classList.toggle('not-active');

                const prevButton = this.buttons.namedItem('prev');

                if (prevButton) {
                    prevButton.disabled = false;
                    if (prevButton.classList.contains('not-active')) {
                        prevButton.classList.remove('not-active');
                    }
                }
            } else {
                this.rerenderTracksTitle(carsPagePrev + 1);
            }
        }

        const carsPageNext = +(await this.getCarsPageFromLocalStorage());
        isLastCarsPage = await this.isLastCarsPage(carsPageNext);
        // this.setCarsPageToLocalStorage(carsPageNext);
        // console.log('### carsPage = ', carsPageNext, isLastCarsPage);

        if (isLastCarsPage) {
            // const nextButton: HTMLButtonElement = document.getElementById('next') as HTMLButtonElement;
            // console.log('# el = ', nextButton);
            // this.buttons.namedItem('next')?.classList.toggle('not-active');
            // nextButton.classList.toggle('not-active');
            const nextButton = this.buttons.namedItem('next');

            if (nextButton) {
                nextButton.disabled = true;
                if (!nextButton.classList.contains('not-active')) {
                    nextButton.classList.add('not-active');
                }
            }
        }

        if (carsPageNext === 2) {
            // this.buttons.namedItem('prev')?.classList.toggle('not-active');
            // if (this.buttons.namedItem('prev')?.classList.contains('not-active')) {
            //     this.buttons.namedItem('prev')?.classList.remove('not-active');
            // }

            const prevButton = this.buttons.namedItem('prev');

            if (prevButton) {
                prevButton.disabled = false;
                if (prevButton.classList.contains('not-active')) {
                    prevButton.classList.remove('not-active');
                }
            }
        }

        // console.log('# this.getGarageElements = ', this.getGarageElements());
        //     const storageCount: number = await this.getCarsPageFromLocalStorage();
        //     const count: number = await this.getCarsCount();

        //     if (storageCount < Math.ceil(count / 7)) {
        //         const carsPage = storageCount + 1;
        //         this.setCarsPageToLocalStorage(carsPage);

        //         this.rerenderTracks(carsPage);
        //         console.log('### Model.next', this.rerenderTracks);
        //     }
    }

    async updateCar(data: CarData) {
        await this.api.updateCar(data);

        // const carsPage = +(localStorage.getItem('carsPage') as string);
        const { id, name, color } = data;
        const id_ = id ? id.toString() : '-1';
        const trackElement = document.body.getElementsByClassName('container-track').namedItem(id_) as HTMLElement;
        const titleElement = trackElement?.getElementsByClassName(
            'car-name_title'
        ) as HTMLCollectionOf<HTMLButtonElement>;
        // console.log('#++++ trackElement = ', trackElement, 'titleElement = ', titleElement);
        titleElement[0].innerText = `#${id} ${name} (color: ${color})`;

        const car = document.getElementById(`car-${id}`) as HTMLElement;
        // const carImage = car.getElementsByTagName('svg');
        car.innerHTML = this.carImage.getSportcar(color);

        // console.log('# carImage = ', carImage);
        // this.rerenderTrack(id);
        // console.log('### Model.updateCar = ', data, this.rerenderTracks);
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

    reset() {
        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderTracks(carsPage);
        // const aaa = this.getCarsPageFromLocalStorage();
        // console.log(this.carsPage, this.page, aaa);
        // console.log('### Model.reset', buttonName);
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
        // const nan = NaN;
        // console.log(
        //     'localStorage.getItem(carsPage) (from Storage) = ',
        //     localStorage.getItem('carsPage')?.length,
        //     +(localStorage.getItem('carsPage') as string) !== nan
        // );

        if (localStorage.getItem('carsPage') !== undefined) {
            //  &&             !(+(localStorage.getItem('carsPage') as string) !== nan)
            carsPage = +(localStorage.getItem('carsPage') as string);
            // console.log('carsPage (from Storage) = ', carsPage);
            const count = await this.getCarsCount();
            const maxPage = Math.ceil(count / 7);

            if (carsPage > maxPage) {
                // console.log('maxPage = ', maxPage);
                carsPage = maxPage;
                this.setCarsPageToLocalStorage(carsPage);
            }
        } else {
            // console.log('Was Nan -> else carsPage = 1');
            carsPage = 1;
            this.setCarsPageToLocalStorage(carsPage);
        }

        // this.carsPage = carsPage;
        // console.log('# GET STORAGE, carsPage =', carsPage);

        return +carsPage;
    }

    // start(buttonName: string, id?: string) {
    //     console.log('### Model.start', id, buttonName);
    // }

    // edit(buttonName: string, id?: string) {
    //     console.log('### Model.edit', id, buttonName);
    // }
    async delete(id?: string) {
        if (id) {
            this.api.deleteCar(+id);
        }

        const carsPage = +(localStorage.getItem('carsPage') as string);
        this.rerenderTracks(carsPage);

        const isLastCarsPage = await this.isLastCarsPage(carsPage);

        if (isLastCarsPage) {
            // if (!this.buttons.namedItem('next')?.classList.contains('not-active')) {
            //     this.buttons.namedItem('next')?.classList.add('not-active');
            // }

            const nextButton = this.buttons.namedItem('next');

            if (nextButton) {
                nextButton.disabled = true;
                if (!nextButton.classList.contains('not-active')) {
                    nextButton.classList.add('not-active');
                }
            }
        } else {
            // console.log('rerenderTracksTitle');
            // this.rerenderTracksTitle(carsPage);

            // if (this.buttons.namedItem('next')?.classList.contains('not-active')) {
            //     this.buttons.namedItem('next')?.classList.remove('not-active');
            // }

            const nextButton = this.buttons.namedItem('next');

            if (nextButton) {
                nextButton.disabled = false;
                if (nextButton.classList.contains('not-active')) {
                    nextButton.classList.remove('not-active');
                }
            }
        }

        // this.carCount = await this.getCarsCount();
        // const maxPage = Math.ceil(this.carCount / 7);

        // if (carsPage === maxPage) {
        //     this.rerenderTracks(carsPage);
        // }
        // // this.carCount -= 1;

        // console.log('### Model.delete', id, this.rerenderTracks);
    }
}

export default Model;
