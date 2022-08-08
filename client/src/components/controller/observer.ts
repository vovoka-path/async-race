import { CarData, CBfunc, ObserverFunction } from '../types/types';

class Observer {
    subscribers: (ObserverFunction | CBfunc)[];
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn: ObserverFunction | CBfunc) {
        this.subscribers.push(fn);
    }

    // unsubscribe(fn: ObserverFunction) {
    //     this.subscribers.filter((subscriber) => subscriber !== fn);
    // }

    broadcast(data: CarData | string | number) {
        // console.log('this.subscribers.length = ', this.subscribers.length);
        this.subscribers.forEach((subscriber: ObserverFunction | CBfunc) => {
            // if (typeof data === 'number') {
            subscriber(data as number);
            // }
        });
    }
}

export default Observer;

// if (typeof data === 'string') {
//     subscriber(data as string);
// } else if (typeof data === 'number') {
//     subscriber(data as number);
// } else {
//     subscriber(data as CarData);
// }
