import { CallbackType, CbData } from '../types/types';

class Observer {
    subscribers: Partial<CallbackType<CbData>>[];
    constructor() {
        this.subscribers = [];
    }

    subscribe<T>(fn: Partial<CallbackType<T>>): void {
        this.subscribers.push(fn);
    }

    unsubscribe<T>(fn: Partial<CallbackType<T>>): void {
        this.subscribers.filter((subscriber: Partial<CallbackType<T>>) => subscriber !== fn);
    }
    //CarData | string | number | never // ObserverFunction | CBfunc |
    broadcast<T>(data: T): void {
        // console.log('this.subscribers.length = ', this.subscribers.length);
        this.subscribers.forEach(async (subscriber: Partial<CallbackType<T>>) => {
            await (subscriber as CallableFunction)(data);
            // console.log('%%% ------------------------');
            // console.log('%%% data =', data, 'subscriber =', subscriber);
        });
    }
}

export default Observer;

// if (typeof data === 'string') {
//     subscriber(data as string);
// } else if (typeof data === 'number') {
//     subscriber(data as number);
// } else if (typeof data === 'CarData') {
//     subscriber(data as CarData);
// } else {
//     subscriber();
// }
