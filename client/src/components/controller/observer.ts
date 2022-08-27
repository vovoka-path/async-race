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

    broadcast<T>(data: T): void {
        this.subscribers.forEach(async (subscriber: Partial<CallbackType<T>>) => {
            await (subscriber as CallableFunction)(data);
        });
    }
}

export default Observer;
