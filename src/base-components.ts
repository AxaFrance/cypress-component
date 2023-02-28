import { HtmlElementMethods } from './base-components.types';
import { CypressComponentChainable } from './cypress-component-chainable';
import { get } from './html-element-identification';
import { HtmlElementIdentificationArgs } from './html-element-identification.types';

const CypressObject = <CypressComponentChainableType extends CypressComponentChainable = CypressComponentChainable>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
) =>
    ({
        as(...args: Parameters<typeof cy.as>) {
            return get(htmlElementIdenficationArg).as(...args);
        },
        selectFile(...args: Parameters<typeof cy.selectFile>) {
            return get(htmlElementIdenficationArg).selectFile(...args);
        },
        blur(...args: Parameters<typeof cy.blur>) {
            return get(htmlElementIdenficationArg).blur(...args);
        },
        check(...args: Parameters<typeof cy.check>) {
            return get(htmlElementIdenficationArg).check(...args);
        },
        children(...args: any[]) {
            return get(htmlElementIdenficationArg).children(...args);
        },
        clear(...args: Parameters<typeof cy.clear>) {
            return get(htmlElementIdenficationArg).clear(...args);
        },
        click(...args: any[]) {
            return get(htmlElementIdenficationArg).click(...args);
        },
        closest(...args: Parameters<typeof cy.closest>) {
            return get(htmlElementIdenficationArg).closest(...args);
        },
        contains(...args: Parameters<typeof cy.contains>) {
            return get(htmlElementIdenficationArg).contains(...args);
        },
        dblclick(...args: any[]) {
            return get(htmlElementIdenficationArg).dblclick(...args);
        },
        rightclick(...args: any[]) {
            return get(htmlElementIdenficationArg).rightclick(...args);
        },
        each(args: any) {
            return get(htmlElementIdenficationArg).each(args);
        },
        eq(...args: Parameters<typeof cy.eq>) {
            return get(htmlElementIdenficationArg).eq(...args);
        },
        filter(...args: Parameters<typeof cy.filter>) {
            return get(htmlElementIdenficationArg).filter(...args);
        },
        find(...args: Parameters<typeof cy.find>) {
            return get(htmlElementIdenficationArg).find(...args);
        },
        first(...args: Parameters<typeof cy.first>) {
            return get(htmlElementIdenficationArg).first(...args);
        },
        focus(...args: Parameters<typeof cy.focus>) {
            return get(htmlElementIdenficationArg).focus(...args);
        },
        its(...args: Parameters<typeof cy.its>) {
            return get(htmlElementIdenficationArg).its(...args);
        },
        last(...args: any[]) {
            return get(htmlElementIdenficationArg).last(...args);
        },
        next(...args: any[]) {
            return get(htmlElementIdenficationArg).next(...args);
        },
        nextAll(...args: any[]) {
            return get(htmlElementIdenficationArg).nextAll(...args);
        },
        nextUntil(...args: any[]) {
            return get(htmlElementIdenficationArg).nextUntil(...args);
        },
        parent(...args: any[]) {
            return get(htmlElementIdenficationArg).parent(...args);
        },
        parents(...args: any[]) {
            return get(htmlElementIdenficationArg).parents(...args);
        },
        parentsUntil(...args: Parameters<typeof cy.parentsUntil>) {
            return get(htmlElementIdenficationArg).parentsUntil(...args);
        },
        prev(...args: any[]) {
            return get(htmlElementIdenficationArg).prev(...args);
        },
        prevAll(...args: any[]) {
            return get(htmlElementIdenficationArg).prevAll(...args);
        },
        prevUntil(...args: Parameters<typeof cy.prevUntil>) {
            return get(htmlElementIdenficationArg).prevUntil(...args);
        },
        scrollIntoView(...args: any[]) {
            return get(htmlElementIdenficationArg).scrollIntoView(...args);
        },
        scrollTo(...args: Parameters<typeof cy.scrollTo>) {
            return get(htmlElementIdenficationArg).scrollTo(...args);
        },
        select(...args: Parameters<typeof cy.select>) {
            return get(htmlElementIdenficationArg).select(...args);
        },
        should(args: any) {
            return get(htmlElementIdenficationArg).should(args);
        },
        siblings(...args: any[]) {
            return get(htmlElementIdenficationArg).siblings(...args);
        },
        submit(...args: any[]) {
            return get(htmlElementIdenficationArg).submit(...args);
        },
        spread(args: any) {
            return get(htmlElementIdenficationArg).spread(args);
        },
        then(args: any) {
            return get(htmlElementIdenficationArg).then(args);
        },
        type(...args: Parameters<typeof cy.type>) {
            return get(htmlElementIdenficationArg).type(...args);
        },
        uncheck(...args: any[]) {
            return get(htmlElementIdenficationArg).uncheck(...args);
        },
    } as unknown as CypressComponentChainableType);

export const HtmlElement = <FunctionFilter extends keyof CypressComponentChainable = HtmlElementMethods>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
) => {
    return CypressObject(htmlElementIdenficationArg) as Pick<
        CypressComponentChainable,
        HtmlElementMethods | FunctionFilter
    >;
};
