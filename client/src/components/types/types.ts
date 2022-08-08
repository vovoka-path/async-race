import Button from '../view/button/button';
import Form from '../view/form/form';

export interface CarsData {
    count: string | null;
    data: CarData[];
}

export interface CarData {
    name: string;
    color: string;
    id?: number;
}

export interface Paths {
    garage: string;
    winners: string;
    engine: string;
}

export type DataFunction = (data: CarData) => void;
export type NameFunction = (id: string) => void;
// export type NameFunction = (name: string | ObserverFunction | CBfunc, id?: string) => void;
export type GetFunction = () => CarData;
// export type TrackFunction = (buttonName: string, id: string) => void;
export type ObserverFunction = (name?: CarData | string | number) => void | Promise<void> | null;
export type CBfunc = (currenrPage: number) => Promise<void> | null;
export type CallbaclFunction = (id: string | number | CarData) => void;
export type FormName = 'create' | 'update';
export type ButtonName = 'race' | 'reset' | 'generate';
export type ElementName = FormName | ButtonName;

export interface InputMethodList {
    [key: string]: DataFunction;
}

export interface SubmitMethodList {
    [key: string]: NameFunction | CallbaclFunction; // | TrackFunction;
}

export interface GetMethodList {
    [key: string]: GetFunction;
}

// export interface SubmitMethodList1 {
//     [key: string]: string;
// }

export interface FormsData {
    create: CarData;
    update: CarData;
}

// export interface FormData {
//     name: string;
//     color: string;
// }

// export interface FormsData {
//     create: FormData;
//     update: FormData;
// }

export type TypesOfElement = typeof Button | typeof Form;
// export type SubmitElement = Button | Form;
export interface Elements {
    [key: string]: Button | Form;
}

export interface FormsState {
    createText: string;
    createColor: string;
}

export interface VendorCars {
    Make: string;
    Model: string;
    [key: string]: string;
}

// export type ElementClass = typeof Button | typeof Form;
