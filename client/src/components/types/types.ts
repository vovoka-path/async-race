import Button from '../view/button/button';
import Form from '../view/form/form';
import Header from '../view/header/header';
import Main from '../view/main/main';
import Tracks from '../view/tracks/tracks';

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

export interface HeaderData {
    elementName: string;
    titleText: string;
    pages: string[];
}

export interface NavMenuElements {
    containerNavMenu: HTMLElement;
    pageElements: HTMLElement[];
}

export type CbData = string | number | CarData | HTMLElement;
// export type CallbackType<T> = ((pageName: T) => void) | (() => void);
type CallbackType1<T> = (pageName: T) => void;
type CallbackType2 = () => void;
export type CallbackType3<T> = () => T;
export type CallbackType<T> = CallbackType1<T> | CallbackType2 | CallbackType3<T>;
// export type CallbackType = (pageName: string) => void | (() => void);
// export type CallbackTypes = CallbackType[];

export interface ViewElements {
    header: Header;
    main: Main;
    // parent: HTMLElement;
}

// export interface FuncData {
//     [key: string]: string | number;
// }

// export type NameOrId<T extends number | string > = T extends number
// ? IdLabel
// : NameLabel;

export interface GarageElements {
    inputFormElements: Elements;
    buttonElements: Elements;
    tracksElement: Tracks;
    panginationElements: Elements;
}

export interface CarEngine {
    velocity: number;
    distance: number;
}
