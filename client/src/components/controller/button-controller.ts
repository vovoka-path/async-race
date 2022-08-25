import model from './get-model';
import Model from '../model/model';
import Observer from './observer';
import { SubmitMethodList, NameFunction, CallbaclFunction } from '../types/types';

class ButtonController extends Observer {
    name: string;
    id: string;
    model: Model;
    modelSubmitMethod: NameFunction | CallbaclFunction;
    constructor(buttonName: string, id?: string) {
        super();
        this.name = buttonName;
        this.id = id ? id : '';
        this.model = model;
        const submitMethods: SubmitMethodList = {
            race: () => this.model.race(),
            reset: () => this.model.reset(),
            generate: () => this.model.generate100Cars(),
            prev: () => this.model.prev(),
            next: () => this.model.next(),
            start: (id: string) => this.model.startCarEngine(id),
            stop: (id: string) => this.model.stop(id),
            delete: (id: string) => this.model.delete(id),
        };
        this.modelSubmitMethod = submitMethods[this.name];
    }

    submit() {
        this.modelSubmitMethod(this.id);
    }
}

export default ButtonController;
