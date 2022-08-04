import Model from '../model/model';
import Observer from './observer';
import { MethodList, Data } from '../types/types';

const model = new Model();

const submitMethods: MethodList = {
    garage: model.garage,
    winners: model.winners,
    race: model.race,
    reset: model.reset,
    generate: model.generate100Cars,
};

class ButtonController extends Observer {
    name: string;
    model: Model;
    modelMethod: Function;
    // Coming: 'race', 'reset', 'generate 100 cars'
    constructor(buttonName: string) {
        super();
        this.name = buttonName;
        this.model = new Model();
        this.modelMethod = submitMethods[this.name];
        // this.modelMethod = this[methods[this.name]];
        // this.modelMethod = (this.model as Model)[method as keyof typeof Model] as Function;
    }

    submit(data: Data) {
        this.modelMethod(data);
    }
}

export default ButtonController;
