import model from './get-model';
import Observer from './observer';

class NavController extends Observer {
    private model = model;
    constructor() {
        super();
    }

    click(name: string) {
        this.model.setPageName(name);
    }

    getPageName() {
        return this.model.getPageName();
    }
}

export default NavController;
