import model from './get-model';
// import Model from '../model/model';
import Observer from './observer';

class NavController extends Observer {
    // private pageName: string;
    private model = model;
    constructor() {
        super();
        // this.pageName = this.model.getPage();
    }

    click(name: string) {
        // this.pageName = name;
        this.model.setPageName(name);
    }

    getPageName() {
        return this.model.getPageName();
    }
}

export default NavController;
