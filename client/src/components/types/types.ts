import Button from "../view/button/button";
import Form from "../view/form/form";

export interface MethodList {
    [key: string]: Function;
}

export interface Data {
    [key: string]: string;
}

export type TypesOfElement = typeof Button | typeof Form;
// export type SubmitElement = Button | Form;
export interface Elements {
    [key: string]: Button | Form;
}

// export interface ElementClass {
//     [key: string]: string;
// }

// export type ElementClass = typeof Button | typeof Form;