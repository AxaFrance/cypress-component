import * as BaseComponentsModule from './base-components';
import * as ComponentsUtilsModule from './components.utils';
import { CypressComponentChainable } from './cypress-component-chainable';
import { CheckboxField, FormField, RadioField, SelectField, TextField } from './form-input-components';
import * as InputModule from './input-components';
import { CypressMock } from '../mocks/cypress-mock';

const htmlElementIdentificationArgs = 'selector';
const routes = ['route1', 'route2'];
let baseElementMock: CypressComponentChainable;
beforeEach(() => {
    baseElementMock = new CypressMock() as unknown as CypressComponentChainable;
    jest.spyOn(BaseComponentsModule, 'HtmlElement').mockReturnValue(baseElementMock);
    jest.spyOn(ComponentsUtilsModule, 'waitForRoutes').mockImplementation();
});

describe('FormField', () => {
    let inputMock: ReturnType<typeof InputModule.Input>;
    beforeEach(() => {
        inputMock = new CypressMock() as unknown as ReturnType<typeof InputModule.Input>;
        jest.spyOn(InputModule, 'Input').mockReturnValue(inputMock);
    });
    const Act = () => FormField(htmlElementIdentificationArgs, ...routes);
    describe('blur', () => {
        it('should call input.blur with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.blur(options);
            expect(inputMock.blur).toHaveBeenCalledWith(options);
        });
    });
    describe('check', () => {
        it('should call input.check with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.check(options);
            expect(inputMock.check).toHaveBeenCalledWith(options);
        });
    });
    describe('clear', () => {
        it('should call input.clear with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.clear(options);
            expect(inputMock.clear).toHaveBeenCalledWith(options);
        });
    });
    describe('focus', () => {
        it('should call input.focus with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.focus(options);
            expect(inputMock.focus).toHaveBeenCalledWith(options);
        });
    });
    describe('type', () => {
        it('should call input.type with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.type('value', options);
            expect(inputMock.type).toHaveBeenCalledWith('value', options);
        });
    });
    describe('uncheck', () => {
        it('should call input.uncheck with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.uncheck('value', options);
            expect(inputMock.uncheck).toHaveBeenCalledWith('value', options);
        });
    });
    describe('set', () => {
        it('should call input.set with correct args ', () => {
            const element = Act();
            element.set('value');
            expect(inputMock.set).toHaveBeenCalledWith('value');
        });
    });
    describe('waitForRoutes', () => {
        it('should call waitForRoutes with routes', () => {
            const element = Act();
            element.waitForRoutes();
            expect(ComponentsUtilsModule.waitForRoutes).toHaveBeenCalledWith(...routes);
        });
    });
});

describe('TextField', () => {
    let inputMock: ReturnType<typeof InputModule.TextInput>;
    beforeEach(() => {
        inputMock = new CypressMock() as unknown as ReturnType<typeof InputModule.TextInput>;
        jest.spyOn(InputModule, 'TextInput').mockReturnValue(inputMock);
    });
    const Act = () => TextField(htmlElementIdentificationArgs, ...routes);
    describe('blur', () => {
        it('should call input.blur with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.blur(options);
            expect(inputMock.blur).toHaveBeenCalledWith(options);
        });
    });
    describe('clear', () => {
        it('should call input.clear with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.clear(options);
            expect(inputMock.clear).toHaveBeenCalledWith(options);
        });
    });
    describe('focus', () => {
        it('should call input.focus with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.focus(options);
            expect(inputMock.focus).toHaveBeenCalledWith(options);
        });
    });
    describe('type', () => {
        it('should call input.type with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.type('value', options);
            expect(inputMock.type).toHaveBeenCalledWith('value', options);
        });
    });
    describe('set', () => {
        it('should call input.set with correct args', () => {
            const element = Act();
            element.set('value');
            expect(inputMock.set).toHaveBeenCalledWith('value');
        });
    });

    it('should call TextInput with expected parameters', () => {
        Act();
        expect(InputModule.TextInput).toHaveBeenCalledWith(
            `${htmlElementIdentificationArgs} input[type=text]`,
            ...routes,
        );
    });
});

describe('SelectField', () => {
    let inputMock: ReturnType<typeof InputModule.Select>;
    beforeEach(() => {
        inputMock = new CypressMock() as unknown as ReturnType<typeof InputModule.Select>;
        jest.spyOn(InputModule, 'Select').mockReturnValue(inputMock);
    });
    const Act = () => SelectField(htmlElementIdentificationArgs, ...routes);
    describe('blur', () => {
        it('should call input.blur with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.blur(options);
            expect(inputMock.blur).toHaveBeenCalledWith(options);
        });
    });
    describe('focus', () => {
        it('should call input.focus with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.focus(options);
            expect(inputMock.focus).toHaveBeenCalledWith(options);
        });
    });
    describe('select', () => {
        it('should call input.select with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.select('value', options);
            expect(inputMock.select).toHaveBeenCalledWith('value', options);
        });
    });
    describe('set', () => {
        it('should call input.set with correct args', () => {
            const element = Act();
            element.set('value');
            expect(inputMock.set).toHaveBeenCalledWith('value');
        });
    });
    it('should call Select with expected parameters', () => {
        Act();
        expect(InputModule.Select).toHaveBeenCalledWith(`${htmlElementIdentificationArgs} select`, ...routes);
    });
});

describe('CheckboxField', () => {
    let inputMock: ReturnType<typeof InputModule.Checkbox>;
    beforeEach(() => {
        inputMock = new CypressMock() as unknown as ReturnType<typeof InputModule.Checkbox>;
        jest.spyOn(InputModule, 'Checkbox').mockReturnValue(inputMock);
    });
    const Act = () => CheckboxField(htmlElementIdentificationArgs, ...routes);
    describe('blur', () => {
        it('should call input.blur with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.blur(options);
            expect(inputMock.blur).toHaveBeenCalledWith(options);
        });
    });
    describe('check', () => {
        it('should call input.check with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.check(options);
            expect(inputMock.check).toHaveBeenCalledWith(options);
        });
    });
    describe('focus', () => {
        it('should call input.focus with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.focus(options);
            expect(inputMock.focus).toHaveBeenCalledWith(options);
        });
    });
    describe('uncheck', () => {
        it('should call input.uncheck with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.uncheck('value', options);
            expect(inputMock.uncheck).toHaveBeenCalledWith('value', options);
        });
    });
    describe('set', () => {
        it('should call input.set with correct args', () => {
            const element = Act();
            element.set('value');
            expect(inputMock.set).toHaveBeenCalledWith('value');
        });
    });
    it('should call Checkbox with expected parameters', () => {
        Act();
        expect(InputModule.Checkbox).toHaveBeenCalledWith(
            `${htmlElementIdentificationArgs} input[type=checkbox]`,
            ...routes,
        );
    });
});

describe('RadioField', () => {
    let inputMock: ReturnType<typeof InputModule.Radio>;
    beforeEach(() => {
        inputMock = new CypressMock() as unknown as ReturnType<typeof InputModule.Radio>;
        jest.spyOn(InputModule, 'Radio').mockReturnValue(inputMock);
    });
    const Act = () => RadioField(htmlElementIdentificationArgs, ...routes);
    describe('blur', () => {
        it('should call input.blur with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.blur(options);
            expect(inputMock.blur).toHaveBeenCalledWith(options);
        });
    });
    describe('check', () => {
        it('should call input.check with correct args', () => {
            const options = { force: true };
            const element = Act();
            element.check(options);
            expect(inputMock.check).toHaveBeenCalledWith(options);
        });
    });
    describe('focus', () => {
        it('should call input.focus with correct args', () => {
            const options = { log: true };
            const element = Act();
            element.focus(options);
            expect(inputMock.focus).toHaveBeenCalledWith(options);
        });
    });
    describe('set', () => {
        it('should call input.set with correct args', () => {
            const element = Act();
            element.set('value');
            expect(inputMock.set).toHaveBeenCalledWith('value');
        });
    });
    it('should call Radio with expected parameters', () => {
        Act();
        expect(InputModule.Radio).toHaveBeenCalledWith(`${htmlElementIdentificationArgs} input[type=radio]`, ...routes);
    });
});
