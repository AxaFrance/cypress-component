import { CypressMock } from '../mocks/cypress-mock';
import * as BaseComponentsModule from './base-components';
import * as ComponentsUtilsModule from './components.utils';
import { CypressComponentChainable } from './cypress-component-chainable';
import * as InputModule from './input-components';

const htmlElementIdentificationArgs = 'selector';
const routes = ['route1', 'route2'];
let cyMock: CypressComponentChainable;
beforeEach(() => {
    cyMock = new CypressMock() as unknown as CypressComponentChainable;
    jest.spyOn(BaseComponentsModule, 'HtmlElement').mockReturnValue(cyMock);
    jest.spyOn(ComponentsUtilsModule, 'waitForRoutes').mockImplementation();
});
afterEach(() => {
    jest.restoreAllMocks();
});

describe('Input', () => {
    const Act = () => InputModule.Input(htmlElementIdentificationArgs);
    describe('blur', () => {
        it('should call cy.blur with correct args', () => {
            const element = Act();
            element.blur();
            expect(cyMock.blur).toHaveBeenCalledWith();
        });
    });
    describe('focus', () => {
        it('should call cy.focus with correct args', () => {
            const element = Act();
            element.focus();
            expect(cyMock.focus).toHaveBeenCalledWith();
        });
    });
    describe('set', () => {
        let internalInput: CypressMock;
        let jqueryElement: JQuery;
        let inputHTMLElement: { tagName: string };
        let attributeFn: jest.Mock;
        beforeEach(() => {
            internalInput = new CypressMock();
            inputHTMLElement = {
                tagName: '',
            };
            attributeFn = jest.fn();
            jqueryElement = {
                attr: attributeFn as (attr: string) => string,
                get: (index: number) => inputHTMLElement,
            } as JQuery;
            internalInput.then = jest.fn((fn) => fn(jqueryElement));
            cyMock.find = jest.fn().mockReturnValue(internalInput);
        });
        it('should call cy.find with correct args', () => {
            const input = Act();
            inputHTMLElement.tagName = 'SELECT';
            input.set('');
            Act();
            expect(cyMock.find).toHaveBeenCalledWith(
                'input[type=text], input[type=number], input[type=checkbox], input[type=radio], select, textarea',
                { log: false },
            );
        });
        it('should call cy.select with value when tagname is SELECT', () => {
            const input = Act();
            inputHTMLElement.tagName = 'SELECT';
            input.set('value');
            expect(internalInput.select).toHaveBeenCalledWith('value');
        });
        it('should call focus, clear, type, blur when tagname is TEXTAREA', () => {
            const input = Act();
            inputHTMLElement.tagName = 'TEXTAREA';
            input.set('value');
            expect(internalInput.focus).toHaveBeenCalled();
            expect(internalInput.clear).toHaveBeenCalled();
            expect(internalInput.type).toHaveBeenCalledWith('value');
            expect(internalInput.blur).toHaveBeenCalled();
        });
        it.each`
            type
            ${'text'}
            ${'number'}
        `('should call focus, clear, type, blur when tagname is INPUT and type is $type', ({ type }) => {
            const input = Act();
            inputHTMLElement.tagName = 'INPUT';
            attributeFn.mockReturnValue(type);
            input.set('value');
            expect(internalInput.focus).toHaveBeenCalled();
            expect(internalInput.clear).toHaveBeenCalled();
            expect(internalInput.type).toHaveBeenCalledWith('value');
            expect(internalInput.blur).toHaveBeenCalled();
        });
        it.each`
            type
            ${'radio'}
            ${'checkbox'}
        `('should call cy.select with value when tagname is INPUT and type is $type', ({ type }) => {
            const input = Act();
            inputHTMLElement.tagName = 'INPUT';
            attributeFn.mockReturnValue(type);
            input.set('value');
            expect(cyMock.contains).toHaveBeenCalledWith('value');
            expect(cyMock.click).toHaveBeenCalled();
        });
        it('should throw when tag is unknown', () => {
            const input = Act();
            inputHTMLElement.tagName = 'INPUT';
            attributeFn.mockReturnValue('unexisting-type');
            expect(() => input.set('value')).toThrow('Not implemented for TagName: INPUT / Attribute: unexisting-type');
        });
    });
});

describe('TextInput', () => {
    const Act = () => InputModule.TextInput(htmlElementIdentificationArgs, ...routes);
    describe('clear', () => {
        it('should call cy.clear with correct args', () => {
            const element = Act();
            element.clear();
            expect(cyMock.clear).toHaveBeenCalledWith();
        });
    });
    describe('type', () => {
        it('should call cy.type with correct args', () => {
            const element = Act();
            element.type('value');
            expect(cyMock.type).toHaveBeenCalledWith('value');
        });
    });
    describe('set', () => {
        it('should only return input when value is undefined', () => {
            const element = Act();
            element.set(undefined);
            expect(cyMock.focus).not.toHaveBeenCalled();
            expect(cyMock.clear).not.toHaveBeenCalled();
            expect(cyMock.type).not.toHaveBeenCalled();
            expect(cyMock.blur).not.toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call focus, clear, type, blur and waitForRoutes when value is defined', () => {
            const element = Act();
            element.set('value');
            expect(cyMock.focus).toHaveBeenCalled();
            expect(cyMock.clear).toHaveBeenCalled();
            expect(cyMock.type).toHaveBeenCalledWith('value');
            expect(cyMock.blur).toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
    });
});

describe('Checkbox', () => {
    const Act = () => InputModule.Checkbox<string | number>(htmlElementIdentificationArgs, ...routes);
    describe('check', () => {
        it('should call cy.check with correct args', () => {
            const element = Act();
            element.check('value');
            expect(cyMock.check).toHaveBeenCalledWith('value');
        });
    });
    describe('uncheck', () => {
        it('should call cy.uncheck with correct args', () => {
            const element = Act();
            element.uncheck('value');
            expect(cyMock.uncheck).toHaveBeenCalledWith('value');
        });
    });
    describe('set', () => {
        it('should only return input when value is undefined', () => {
            const element = Act();
            element.set(undefined);
            expect(cyMock.eq).not.toHaveBeenCalled();
            expect(cyMock.contains).not.toHaveBeenCalled();
            expect(cyMock.check).not.toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call contains, check and waitForRoutes when value is string', () => {
            const element = Act();
            element.set('value');
            expect(cyMock.eq).not.toHaveBeenCalled();
            expect(cyMock.contains).toHaveBeenCalledWith('value');
            expect(cyMock.check).toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
        it('should call focus, clear, type, blur and waitForRoutes when value is a number', () => {
            const element = Act();
            element.set(0);
            expect(cyMock.eq).toHaveBeenCalledWith(0);
            expect(cyMock.contains).not.toHaveBeenCalled();
            expect(cyMock.check).toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
    });
});

describe('Radio', () => {
    const Act = () => InputModule.Radio<string | number>(htmlElementIdentificationArgs, ...routes);
    describe('check', () => {
        it('should call cy.check with correct args', () => {
            const element = Act();
            element.check('value');
            expect(cyMock.check).toHaveBeenCalledWith('value');
        });
    });
    describe('set', () => {
        it('should only return input when value is undefined', () => {
            const element = Act();
            element.set(undefined);
            expect(cyMock.eq).not.toHaveBeenCalled();
            expect(cyMock.contains).not.toHaveBeenCalled();
            expect(cyMock.check).not.toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call contains, check and waitForRoutes when value is a string', () => {
            const element = Act();
            element.set('value');
            expect(cyMock.eq).not.toHaveBeenCalled();
            expect(cyMock.contains).toHaveBeenCalledWith('value');
            expect(cyMock.check).toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
        it('should call focus, clear, type, blur and waitForRoutes when value is a number', () => {
            const element = Act();
            element.set(0);
            expect(cyMock.eq).toHaveBeenCalledWith(0);
            expect(cyMock.contains).not.toHaveBeenCalled();
            expect(cyMock.check).toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
    });
});

describe('Select', () => {
    const Act = () => InputModule.Select(htmlElementIdentificationArgs, ...routes);
    describe('select', () => {
        it('should call cy.select with correct args', () => {
            const element = Act();
            element.select('value');
            expect(cyMock.select).toHaveBeenCalledWith('value');
        });
    });
    describe('set', () => {
        it('should only return input when value is undefined', () => {
            const element = Act();
            element.set(undefined);
            expect(cyMock.select).not.toHaveBeenCalled();
            expect(ComponentsUtilsModule.waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call focus, clear, type, blur and waitForRoutes when value is defined', () => {
            const element = Act();
            element.set('value');
            expect(cyMock.select).toHaveBeenCalledWith('value');
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
    });
});
