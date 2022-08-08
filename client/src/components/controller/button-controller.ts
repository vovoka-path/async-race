import Model from '../model/model';
import Observer from './observer';
import { SubmitMethodList, NameFunction, CallbaclFunction } from '../types/types';

// const model = new Model();

// const submitMethods: SubmitMethodList = {
//     garage: model.garage,
//     winners: model.winners,
//     race: model.race,
//     reset: model.reset,
//     generate: model.generate100Cars,
//     prev: model.prev,
//     next: model.next,
// };

class ButtonController extends Observer {
    name: string;
    id: string;
    model: Model;
    modelSubmitMethod: NameFunction | CallbaclFunction; // | TrackFunction;
    // callback: ObserverFunction;
    // Coming: 'race', 'reset' or 'generate 100 cars'
    constructor(buttonName: string, id?: string) {
        super();
        this.name = buttonName;
        this.id = id ? id : '';
        this.model = new Model();
        // this.callback = () => 1 + 2;
        const submitMethods: SubmitMethodList = {
            // garage: (buttonName: string) => this.model.garage(buttonName),
            // winners: (buttonName: string) => this.model.winners(buttonName),
            // race: (buttonName: string) => this.model.race(buttonName),
            // reset: (buttonName: string) => this.model.reset(buttonName),
            generate: () => this.model.generate100Cars(),
            prev: () => this.model.prev(),
            next: () => this.model.next(),
            // start: (buttonName: string, id?: string) => this.model.start(buttonName, id),
            // stop: (buttonName: string, id?: string) => this.model.stop(buttonName, id),
            // edit: (buttonName: string, id?: string) => this.model.edit(buttonName, id),
            delete: (id: string) => this.model.delete(id),
        };
        this.modelSubmitMethod = submitMethods[this.name];
    }

    // setCallback(cb: ObserverFunction) {
    //     // console.log('cb = ', cb);
    //     this.callback = cb;
    // }

    submit(buttonName: string) {
        // console.log('this.id =', this.id, buttonName);
        // console.log('this.modelMethod =', this.modelMethod);
        console.log(buttonName);
        this.modelSubmitMethod(this.id);
        // this.model.prev(buttonName);
    }
}

export default ButtonController;
