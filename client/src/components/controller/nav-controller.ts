import Observer from './observer';
import Model from '../model/model';

class NavController extends Observer {
    model: Model;
    constructor() {
        super();
        this.model = new Model();
    }

    click(name: string) {
        this.model.setPage(name);
    }
}

export default NavController;
