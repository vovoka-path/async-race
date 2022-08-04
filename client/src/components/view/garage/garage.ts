import Button from "../button/button";
import Form from "../form/form";
import { Data, TypesOfElement, Elements } from '../../types/types';

// type ElementClass = typeof Button | typeof Form;

class Garage {
    render() {
        const renderElement = (name: string, elementClass: TypesOfElement, parentNode: Element) => {
          const element = new elementClass(name);
    
          element.init(parentNode);
    
          return element;
        };
    
            // # Render 2 page buttons: garage, winners
        const pageElements: Elements = {};
        const pageNames = ["garage", "winners"];
    
        pageNames
            .forEach((name) => {
                pageElements[name] = renderElement(name, Button, document.body);
            });
    
        // # Render 2 input forms: 'create', 'update'
        const inputFormElements: Elements = {};
        const inputFormNames = ["create", "update"];
    
        inputFormNames
          .forEach((name) => {
            inputFormElements[name] = renderElement(name, Form, document.body);
          })
    
        // # Render 3 buttons: 'race', 'reset', 'generate 100 cars'
        const buttonElements: Elements = {};
        const buttonNames = ["race", "reset", "generate"];
    
        buttonNames
            .forEach((name) => {
                buttonElements[name] = renderElement(name, Button, document.body);
            });
    
        // # Render Show Updates
        const testFormElement: Form = renderElement('test', Form, document.body) as Form;
        const subscriberForm = (data: Data) => testFormElement.setData({ ...data, input: data.input });
        const subscriberButton = (name: string) => testFormElement.setData({ name: name, input: name });
    
        pageElements.garage.controller.subscribe(subscriberButton);
        pageElements.winners.controller.subscribe(subscriberButton);
    
        buttonElements.race.controller.subscribe(subscriberButton);
        buttonElements.reset.controller.subscribe(subscriberButton);
        buttonElements.generate.controller.subscribe(subscriberButton);
        
        inputFormElements.create.controller.subscribe(subscriberForm);
        inputFormElements.update.controller.subscribe(subscriberForm);
      }
    }

export default Garage;
