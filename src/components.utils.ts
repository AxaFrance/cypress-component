import { HtmlElement } from './base-components';
import { HtmlElementType } from './base-components.types';
import { HtmlElementIdentification, HtmlElementIdentificationArgs } from './html-element-identification.types';
import { RouteHandler } from './route-handler';
import { isHtmlElementIdentification } from './type-guards';

export const isSelectorIdClassOrAttribute = (selector: string) =>
    selector.startsWith('#') || selector.startsWith('.') || selector.startsWith('[');

export const htmlElementIdentificationToCypressChainableElement = (
    { selector, contains, index }: HtmlElementIdentification,
    orignalCypressElement?: Cypress.Chainable<JQuery<HTMLElement>>,
) => {
    let cypressElement: Cypress.Chainable<JQuery<HTMLElement>> = orignalCypressElement ?? cy;
    if (contains) {
        cypressElement = cypressElement.contains(selector, contains);
    } else if (selector) {
        if (!orignalCypressElement) {
            cypressElement = cypressElement.get(selector); // A tester
        } else {
            cypressElement = cypressElement.find(selector);
        }
    }
    if (index != null) {
        cypressElement = cypressElement.eq(index);
    }
    return cypressElement;
};

export const concatHtmlElementIndentificationArg = (
    initial: HtmlElementIdentificationArgs,
    extra: HtmlElementIdentificationArgs,
): HtmlElementIdentificationArgs => {
    if (typeof initial === 'string') {
        if (typeof extra === 'string') {
            return `${initial} ${extra}`;
        } else if (isHtmlElementIdentification(extra)) {
            return [{ selector: initial }, extra];
        } else {
            extra.unshift({ selector: initial });
            return extra;
        }
    } else if (isHtmlElementIdentification(initial)) {
        if (typeof extra === 'string') {
            return [initial, { selector: extra }];
        } else if (isHtmlElementIdentification(extra)) {
            return [initial, extra];
        } else {
            return [initial, ...extra];
        }
    } else {
        if (typeof extra === 'string') {
            return [...initial, { selector: extra }];
        } else if (isHtmlElementIdentification(extra)) {
            return [...initial, extra];
        } else {
            return [...initial, ...extra];
        }
    }
};

export const waitForRoutes = (...routesToWait: string[]) => {
    if (routesToWait?.length) {
        RouteHandler.wait(...routesToWait);
    }
};

/**
 * Bind a parent component to and child object to create a hiarchy between the elements
 * @param baseElement the parent element or its selector
 * @param object the child components
 * @returns An HtmlElement or another high level components
 *  @example
 *    const myTopLevelComponent = bindComponents('#myPage', {
 *      mySubCompenent1: new HtmlElement('#subComp1'),
 *      mySubCompenent2: new Button('#button')
 *    });
 *    //OR
 *    const myTopLevelComponent = bindComponents(new TextField('#myTextField') , {
 *      errorMessage: new HtmlElement('#myTextField .error-message')
 *    });
 */
export const bindComponents = <ExtendedElementType, BaseElementType extends HtmlElementType = HtmlElementType>(
    baseElement: BaseElementType | string,
    object: ExtendedElementType,
): BaseElementType & ExtendedElementType => {
    if (typeof baseElement === 'string') {
        return Object.assign(HtmlElement(baseElement) as BaseElementType, object);
    } else {
        return Object.assign(baseElement, object);
    }
};
