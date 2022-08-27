import { NavMenuElements } from '../types/types';

export const createHTMLElement = (name: string, styles?: string): HTMLElement => {
    const element = document.createElement(name);
    element.className = `${styles}`;

    return element;
};

export const createTitle = (name: string, title: string): HTMLElement => {
    const container = createHTMLElement('div', `${name}-title-container`);
    const element = createHTMLElement('h1', `${name}-title_text`);
    element.innerText = title;

    container.append(element);

    return container;
};

export const createNavMenu = (name: string, pages: string[]): NavMenuElements => {
    const containerNavMenu = createHTMLElement('ul', `${name}-menu`);

    const pageElements = pages.map((page) => {
        const element = createHTMLElement('li', `${name}-menu_item menu-${page}`);
        element.innerText = page;
        containerNavMenu.append(element);

        return element;
    });

    return {
        containerNavMenu: containerNavMenu,
        pageElements: pageElements,
    };
};
