import Garage from './garage/garage';
import Winners from './winners/winners';

class View {
    render() {
        const page = 'garage';
        const currentPage = 'garage';

        if (currentPage === page) {
            new Garage(); //.render();
        } else {
            new Winners(); //.render();
        }

        return null;
    }
}

export default View;
