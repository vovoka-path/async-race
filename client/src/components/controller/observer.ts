import { Data } from '../types/types';

class Observer {
    subscribers: Function[];
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn: Function) {
        this.subscribers.push(fn);
    }

    unsubscribe(fn: Function) {
        this.subscribers.filter((subscriber) => subscriber !== fn);
    }

    broadcast(data: Data) {
        this.subscribers.forEach((subscriber) => subscriber(data));
    }
}

export default Observer;
