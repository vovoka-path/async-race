import './styles.scss';
import View from '../view/view';

class App {
    view: View;
    constructor() {
        this.view = new View();
    }

    start() {
        this.view.render();
    }
}

export default App;
