import { htmlElementIdentificationToCypressChainableElement } from './components.utils';
import { HtmlElementIdentificationArgs } from './html-element-identification.types';
import { isHtmlElementIdentification } from './type-guards';

export const get = (htmlElementIdenficationArg: HtmlElementIdentificationArgs): Cypress.Chainable => {
    if (typeof htmlElementIdenficationArg === 'string') {
        return cy.get(`${htmlElementIdenficationArg}`);
    } else if (isHtmlElementIdentification(htmlElementIdenficationArg)) {
        return htmlElementIdentificationToCypressChainableElement(htmlElementIdenficationArg);
    } else {
        return htmlElementIdenficationArg.reduce(
            (cypressElement, htmlElementIdentification) =>
                htmlElementIdentificationToCypressChainableElement(htmlElementIdentification, cypressElement),
            undefined as Cypress.Chainable,
        );
    }
};
