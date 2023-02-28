import { HtmlElement } from './base-components';
import { CypressComponentChainableMethods } from './cypress-component-chainable';
import * as HtmlElementIdentificationModule from './html-element-identification';
import { CypressMock } from '../mocks/cypress-mock';

describe('HtmlElement', () => {
    const htmlElementIdentificationArgs = 'selector';
    let cyMock: Cypress.Chainable;
    beforeEach(() => {
        cyMock = new CypressMock() as unknown as Cypress.Chainable;
        jest.spyOn(HtmlElementIdentificationModule, 'get').mockReturnValue(cyMock);
    });
    const Act = () => HtmlElement<CypressComponentChainableMethods>(htmlElementIdentificationArgs);
    describe('as', () => {
        it('should call cy.as with correct args', () => {
            const element = Act();
            element.as('alaias');
            expect(cyMock.as).toHaveBeenCalledWith('alaias');
        });
    });
    describe('selectFile', () => {
        it('should call cy.selectFile with correct args', () => {
            const element = Act();
            element.selectFile('FileReference', { force: true });
            expect(cyMock.selectFile).toHaveBeenCalledWith('FileReference', { force: true });
        });
    });
    describe('blur', () => {
        it('should call cy.blur with correct args', () => {
            const element = Act();
            element.blur({ force: true });
            expect(cyMock.blur).toHaveBeenCalledWith({ force: true });
        });
    });
    describe('check', () => {
        it('should call cy.check with correct args', () => {
            const element = Act();
            element.check({ force: true });
            expect(cyMock.check).toHaveBeenCalledWith({ force: true });
        });
    });
    describe('children', () => {
        it('should call cy.children with correct args', () => {
            const element = Act();
            element.children({ log: true });
            expect(cyMock.children).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('clear', () => {
        it('should call cy.clear with correct args', () => {
            const element = Act();
            element.clear({ log: true });
            expect(cyMock.clear).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('click', () => {
        it('should call cy.click with correct args', () => {
            const element = Act();
            element.click({ log: true });
            expect(cyMock.click).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('closest', () => {
        it('should call cy.closest with correct args', () => {
            const element = Act();
            element.closest('selector', { log: true });
            expect(cyMock.closest).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('contains', () => {
        it('should call cy.contains with correct args', () => {
            const element = Act();
            element.contains('selector', 'contains', { log: true });
            expect(cyMock.contains).toHaveBeenCalledWith('selector', 'contains', { log: true });
        });
    });
    describe('dblclick', () => {
        it('should call cy.dblclick with correct args', () => {
            const element = Act();
            element.dblclick({ log: true });
            expect(cyMock.dblclick).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('rightclick', () => {
        it('should call cy.rightclick with correct args', () => {
            const element = Act();
            element.rightclick({ log: true });
            expect(cyMock.rightclick).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('each', () => {
        it('should call cy.each with correct args', () => {
            const element = Act();
            const fnArg = jest.fn();
            element.each(fnArg);
            expect(cyMock.each).toHaveBeenCalledWith(fnArg);
        });
    });
    describe('eq', () => {
        it('should call cy.eq with correct args', () => {
            const element = Act();
            element.eq(12, { log: true });
            expect(cyMock.eq).toHaveBeenCalledWith(12, { log: true });
        });
    });
    describe('filter', () => {
        it('should call cy.filter with correct args', () => {
            const element = Act();
            element.filter('selector', { log: true });
            expect(cyMock.filter).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('find', () => {
        it('should call cy.find with correct args', () => {
            const element = Act();
            element.find('selector', { log: true });
            expect(cyMock.find).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('first', () => {
        it('should call cy.first with correct args', () => {
            const element = Act();
            element.first({ log: true });
            expect(cyMock.first).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('focus', () => {
        it('should call cy.focus with correct args', () => {
            const element = Act();
            element.focus({ log: true });
            expect(cyMock.focus).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('its', () => {
        it('should call cy.its with correct args', () => {
            const element = Act();
            element.its('property', { log: true });
            expect(cyMock.its).toHaveBeenCalledWith('property', { log: true });
        });
    });
    describe('last', () => {
        it('should call cy.last with correct args', () => {
            const element = Act();
            element.last({ log: true });
            expect(cyMock.last).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('next', () => {
        it('should call cy.next with correct args', () => {
            const element = Act();
            element.next({ log: true });
            expect(cyMock.next).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('nextAll', () => {
        it('should call cy.nextAll with correct args', () => {
            const element = Act();
            element.nextAll({ log: true });
            expect(cyMock.nextAll).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('nextUntil', () => {
        it('should call cy.nextAll with correct args', () => {
            const element = Act();
            element.nextUntil({ log: true });
            expect(cyMock.nextUntil).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('parent', () => {
        it('should call cy.parent with correct args', () => {
            const element = Act();
            element.parent({ log: true });
            expect(cyMock.parent).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('parents', () => {
        it('should call cy.parents with correct args', () => {
            const element = Act();
            element.parents({ log: true });
            expect(cyMock.parents).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('parentsUntil', () => {
        it('should call cy.parentsUntil with correct args', () => {
            const element = Act();
            element.parentsUntil('selector', 'filetr', { log: true });
            expect(cyMock.parentsUntil).toHaveBeenCalledWith('selector', 'filetr', { log: true });
        });
    });
    describe('prev', () => {
        it('should call cy.prev with correct args', () => {
            const element = Act();
            element.prev('selector', { log: true });
            expect(cyMock.prev).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('prevAll', () => {
        it('should call cy.prevAll with correct args', () => {
            const element = Act();
            element.prevAll('selector', { log: true });
            expect(cyMock.prevAll).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('prevUntil', () => {
        it('should call cy.prevUntil with correct args', () => {
            const element = Act();
            element.prevUntil('selector', 'filter', { log: true });
            expect(cyMock.prevUntil).toHaveBeenCalledWith('selector', 'filter', { log: true });
        });
    });
    describe('scrollIntoView', () => {
        it('should call cy.scrollIntoView with correct args', () => {
            const element = Act();
            element.scrollIntoView({ log: true });
            expect(cyMock.scrollIntoView).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('scrollTo', () => {
        it('should call cy.scrollTo with correct args', () => {
            const element = Act();
            element.scrollTo('top', { log: true });
            expect(cyMock.scrollTo).toHaveBeenCalledWith('top', { log: true });
        });
    });
    describe('select', () => {
        it('should call cy.select with correct args', () => {
            const element = Act();
            element.select('value', { log: true });
            expect(cyMock.select).toHaveBeenCalledWith('value', { log: true });
        });
    });
    describe('should', () => {
        it('should call cy.should with correct args', () => {
            const element = Act();
            const fnArg = jest.fn();
            element.should(fnArg);
            expect(cyMock.should).toHaveBeenCalledWith(fnArg);
        });
    });
    describe('siblings', () => {
        it('should call cy.siblings with correct args', () => {
            const element = Act();
            element.siblings('selector', { log: true });
            expect(cyMock.siblings).toHaveBeenCalledWith('selector', { log: true });
        });
    });
    describe('submit', () => {
        it('should call cy.submit with correct args', () => {
            const element = Act();
            element.submit({ log: true });
            expect(cyMock.submit).toHaveBeenCalledWith({ log: true });
        });
    });
    describe('spread', () => {
        it('should call cy.spread with correct args', () => {
            const element = Act();
            const fnArg = jest.fn();
            element.spread(fnArg);
            expect(cyMock.spread).toHaveBeenCalledWith(fnArg);
        });
    });
    describe('then', () => {
        it('should call cy.then with correct args', () => {
            const element = Act();
            const fnArg = jest.fn();
            element.then(fnArg);
            expect(cyMock.then).toHaveBeenCalledWith(fnArg);
        });
    });
    describe('type', () => {
        it('should call cy.type with correct args', () => {
            const element = Act();
            element.type('value', { log: true });
            expect(cyMock.type).toHaveBeenCalledWith('value', { log: true });
        });
    });
    describe('uncheck', () => {
        it('should call cy.uncheck with correct args', () => {
            const element = Act();
            element.uncheck('value', { log: true });
            expect(cyMock.uncheck).toHaveBeenCalledWith('value', { log: true });
        });
    });
});
