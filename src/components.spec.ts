import {
    bindComponents,
    Button,
    CheckableInput,
    CheckBox,
    CheckBoxList,
    FormInput,
    HtmlElement,
    Input,
    RadioButton,
    RadioList,
    Select,
    TextField,
    TextInput,
} from './components';
import * as ComponentUtils from './components.utils';
import { RouteHandler } from './route-handler';

describe('bindComponents', () => {
    const selector = 'selector';
    const subComponent = {
        sub: 'subComponent',
    };
    it('should return an HtmlElement bound to the sub object', () => {
        const expectedResult = Object.assign(new HtmlElement(selector), subComponent);

        const result = bindComponents(selector, subComponent);

        expect(result).toStrictEqual(expectedResult);
    });
    it('should return an Element bound to the sub object', () => {
        const expectedResult = Object.assign(new Button(selector), subComponent);

        const result = bindComponents(new Button(selector), subComponent);

        expect(result).toStrictEqual(expectedResult);
    });
});

describe('HtmlElement', () => {
    const options = {
        log: false,
        timeout: 12,
    };
    let htmlElement: HtmlElement;
    beforeEach(() => {
        htmlElement = new HtmlElement('htmlElementSelector');
    });
    describe('get', () => {
        it('should call cy.get with element selector', () => {
            htmlElement.get();

            expect(cy.get).toHaveBeenCalledWith('htmlElementSelector ');
        });
        it('should call cy.get with element selector and a sub selector', () => {
            htmlElement.get('subSelector');

            expect(cy.get).toHaveBeenCalledWith('htmlElementSelector subSelector');
        });
        it('should return cy.get result', () => {
            cy.get = jest.fn().mockReturnValue('result');

            const result = htmlElement.get('subSelector');

            expect(result).toBe('result');
        });
    });
    describe('children', () => {
        const selector = 'childrenSelector';
        let childrenFnSpy: jest.Mock;
        beforeEach(() => {
            childrenFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ children: childrenFnSpy });
        });
        it('should call children with same args', () => {
            htmlElement.children(selector, options);

            expect(childrenFnSpy).toHaveBeenCalledWith(selector, options);
        });
        it('should return children result', () => {
            const result = htmlElement.children(selector, options);

            expect(result).toBe('result');
        });
    });
    describe('click', () => {
        let clickFnSpy: jest.Mock;
        beforeEach(() => {
            clickFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ click: clickFnSpy });
        });
        it('should call click with same args', () => {
            htmlElement.click(options);

            expect(clickFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return click result', () => {
            const result = htmlElement.click(options);

            expect(result).toBe('result');
        });
    });
    describe('contains', () => {
        const containedText = 'containedText';
        let containsFnSpy: jest.Mock;
        beforeEach(() => {
            containsFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ contains: containsFnSpy });
        });
        it('should call contains with same args', () => {
            htmlElement.contains(containedText, options);

            expect(containsFnSpy).toHaveBeenCalledWith(containedText, options);
        });
        it('should return contains result', () => {
            const result = htmlElement.contains(containedText, options);

            expect(result).toBe('result');
        });
    });
    describe('dblclick', () => {
        let dblclickFnSpy: jest.Mock;
        beforeEach(() => {
            dblclickFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ dblclick: dblclickFnSpy });
        });
        it('should call dblclick with same args', () => {
            htmlElement.dblclick(options);

            expect(dblclickFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return dblclick result', () => {
            const result = htmlElement.dblclick(options);

            expect(result).toBe('result');
        });
    });
    describe('element', () => {
        it('should return a HtmlElement with correct selector', () => {
            const result = htmlElement.element('relativeSelector');

            expect(result).toBeInstanceOf(HtmlElement);
            expect(result.selector).toBe('htmlElementSelector relativeSelector');
        });
        it('should return a HtmlElement with no sub secltotr', () => {
            const result = htmlElement.element(undefined);

            expect(result).toBeInstanceOf(HtmlElement);
            expect(result.selector).toBe('htmlElementSelector ');
        });
    });
    describe('eq', () => {
        const index = 12;
        let eqFnSpy: jest.Mock;
        beforeEach(() => {
            eqFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ eq: eqFnSpy });
        });
        it('should call eq with same args', () => {
            htmlElement.eq(index, options);

            expect(eqFnSpy).toHaveBeenCalledWith(index, options);
        });
        it('should return eq result', () => {
            const result = htmlElement.eq(index, options);

            expect(result).toBe('result');
        });
    });
    describe('first', () => {
        let firstFnSpy: jest.Mock;
        beforeEach(() => {
            firstFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ first: firstFnSpy });
        });
        it('should call first with same args', () => {
            htmlElement.first(options);

            expect(firstFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return first result', () => {
            const result = htmlElement.first(options);

            expect(result).toBe('result');
        });
    });
    describe('last', () => {
        let lastFnSpy: jest.Mock;
        beforeEach(() => {
            lastFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ last: lastFnSpy });
        });
        it('should call last with same args', () => {
            htmlElement.last(options);

            expect(lastFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return last result', () => {
            const result = htmlElement.last(options);

            expect(result).toBe('result');
        });
    });
    describe('rightclick', () => {
        let rightclickFnSpy: jest.Mock;
        beforeEach(() => {
            rightclickFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ rightclick: rightclickFnSpy });
        });
        it('should call rightclick with same args', () => {
            htmlElement.rightclick(options);

            expect(rightclickFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return rightclick result', () => {
            const result = htmlElement.rightclick(options);

            expect(result).toBe('result');
        });
    });
    describe('should', () => {
        let shouldFnSpy: jest.Mock;
        const fn: (currentSubject: JQuery<HTMLElement>) => void = (currentSubject: JQuery<HTMLElement>) => {};
        beforeEach(() => {
            shouldFnSpy = jest.fn().mockReturnValue('result');
            htmlElement.get = jest.fn().mockReturnValue({ should: shouldFnSpy });
        });
        it('should call should with same args', () => {
            htmlElement.should(fn);

            expect(shouldFnSpy).toHaveBeenCalledWith(fn);
        });
        it('should return should result', () => {
            const result = htmlElement.should(fn);

            expect(result).toBe('result');
        });
    });
});

describe('Input', () => {
    const options = {
        log: false,
        timeout: 42,
    };
    let input: Input;
    beforeEach(() => {
        input = new Input('inputElementSelector');
    });
    describe('blur', () => {
        let blurFnSpy: jest.Mock;
        beforeEach(() => {
            blurFnSpy = jest.fn().mockReturnValue('result');
            input.get = jest.fn().mockReturnValue({ blur: blurFnSpy });
        });
        it('should call blur with same args', () => {
            input.blur(options);

            expect(blurFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return blur result', () => {
            const result = input.blur(options);

            expect(result).toBe('result');
        });
    });
    describe('focus', () => {
        let focusFnSpy: jest.Mock;
        beforeEach(() => {
            focusFnSpy = jest.fn().mockReturnValue('result');
            input.get = jest.fn().mockReturnValue({ focus: focusFnSpy });
        });
        it('should call focus with same args', () => {
            input.focus(options);

            expect(focusFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return focus result', () => {
            const result = input.focus(options);

            expect(result).toBe('result');
        });
    });
});

describe('TextInput', () => {
    const options = {
        log: false,
        timeout: 42,
    };
    let textInput: TextInput;
    beforeEach(() => {
        textInput = new TextInput('textInputElementSelector');
    });
    describe('clear', () => {
        let clearFnSpy: jest.Mock;
        beforeEach(() => {
            clearFnSpy = jest.fn().mockReturnValue('result');
            textInput.get = jest.fn().mockReturnValue({ clear: clearFnSpy });
        });
        it('should call clear with same args', () => {
            textInput.clear(options);

            expect(clearFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return clear result', () => {
            const result = textInput.clear(options);

            expect(result).toBe('result');
        });
    });
    describe('type', () => {
        const text = 'text';
        let typeFnSpy: jest.Mock;
        beforeEach(() => {
            typeFnSpy = jest.fn().mockReturnValue('result');
            textInput.get = jest.fn().mockReturnValue({ type: typeFnSpy });
        });
        it('should call type with same args', () => {
            textInput.type(text, options);

            expect(typeFnSpy).toHaveBeenCalledWith(text, options);
        });
        it('should return type result', () => {
            const result = textInput.type(text, options);

            expect(result).toBe('result');
        });
    });
});

describe('CheckableInput', () => {
    const options = {
        log: false,
        timeout: 42,
    };
    let checkableInput: CheckableInput;
    beforeEach(() => {
        checkableInput = new CheckableInput('checkableInputElementSelector');
    });
    describe('check', () => {
        let checkFnSpy: jest.Mock;
        beforeEach(() => {
            checkFnSpy = jest.fn().mockReturnValue('result');
            checkableInput.get = jest.fn().mockReturnValue({ check: checkFnSpy });
        });
        it('should call check with same args', () => {
            checkableInput.check(options);

            expect(checkFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return check result', () => {
            const result = checkableInput.check(options);

            expect(result).toBe('result');
        });
    });
});

describe('CheckBox', () => {
    const options = {
        log: false,
        timeout: 42,
    };
    let checkBox: CheckBox;
    beforeEach(() => {
        checkBox = new CheckBox('checkboxSelector');
    });
    describe('uncheck', () => {
        let uncheckFnSpy: jest.Mock;
        beforeEach(() => {
            uncheckFnSpy = jest.fn().mockReturnValue('result');
            checkBox.get = jest.fn().mockReturnValue({ uncheck: uncheckFnSpy });
        });
        it('should call uncheck with same args', () => {
            checkBox.uncheck(options);

            expect(uncheckFnSpy).toHaveBeenCalledWith(options);
        });
        it('should return uncheck result', () => {
            const result = checkBox.uncheck(options);

            expect(result).toBe('result');
        });
    });
});

type FormInputExtension = {
    routesToWait: string[];
    waitForRoutes(): void;
};
describe('FormInput', () => {
    let formInput: FormInput;
    describe('contructor', () => {
        it('should set routesToWait', () => {
            formInput = new FormInput('selector', 'route1', 'route2');

            expect((formInput as unknown as FormInputExtension).routesToWait).toEqual(['route1', 'route2']);
        });
    });
    describe('waitForRoutes', () => {
        beforeEach(() => {
            jest.spyOn(RouteHandler, 'wait').mockImplementation();
        });
        const Act = () => (formInput as unknown as FormInputExtension).waitForRoutes();
        it('should not call RouteHandler.wait', () => {
            formInput = new FormInput('selector');

            Act();

            expect(RouteHandler.wait).not.toHaveBeenCalled();
        });
        it('should not call RouteHandler.wait', () => {
            formInput = new FormInput('selector', 'route1', 'route2');

            Act();

            expect(RouteHandler.wait).toHaveBeenLastCalledWith('route1', 'route2');
        });
    });
});

describe('TextField', () => {
    const options = {
        log: false,
        timeout: 42,
    };
    let textField: TextField;
    beforeEach(() => {
        textField = new TextField('textFieldSelector');
    });
    describe('constructor', () => {
        it('should instantiate the textInput when selector is a class, id or attribute', () => {
            jest.spyOn(ComponentUtils, 'isSelectorIdClassOrAttribute').mockReturnValue(true);

            textField = new TextField('textFieldSelector');

            expect(textField.textInput.selector).toBe(
                `textFieldSelector input[type=text], input[type=text]textFieldSelector, textFieldSelector textarea, textareatextFieldSelector`,
            );
        });
        it('should instantiate the textInput when selector is not a class, id or attribute', () => {
            jest.spyOn(ComponentUtils, 'isSelectorIdClassOrAttribute').mockReturnValue(false);

            textField = new TextField('textFieldSelector');

            expect(textField.textInput.selector).toBe('textFieldSelector input[type=text], textFieldSelector textarea');
        });
    });
    describe('clear', () => {
        beforeEach(() => {
            textField.textInput.clear = jest.fn().mockReturnValue('result');
        });
        it('should call clear with same args', () => {
            textField.clear(options);

            expect(textField.textInput.clear).toHaveBeenCalledWith(options);
        });
        it('should return clear result', () => {
            const result = textField.clear(options);

            expect(result).toBe('result');
        });
    });
    describe('blur', () => {
        beforeEach(() => {
            textField.textInput.blur = jest.fn().mockReturnValue('result');
        });
        it('should call blur with same args', () => {
            textField.blur(options);

            expect(textField.textInput.blur).toHaveBeenCalledWith(options);
        });
        it('should return blur result', () => {
            const result = textField.blur(options);

            expect(result).toBe('result');
        });
    });
    describe('focus', () => {
        beforeEach(() => {
            textField.textInput.focus = jest.fn().mockReturnValue('result');
        });
        it('should call focus with same args', () => {
            textField.focus(options);

            expect(textField.textInput.focus).toHaveBeenCalledWith(options);
        });
        it('should return focus result', () => {
            const result = textField.focus(options);

            expect(result).toBe('result');
        });
    });
    describe('type', () => {
        const text = 'text';
        beforeEach(() => {
            textField.textInput.type = jest.fn().mockReturnValue('result');
        });
        it('should call type with same args', () => {
            textField.type(text, options);

            expect(textField.textInput.type).toHaveBeenCalledWith(text, options);
        });
        it('should return type result', () => {
            const result = textField.type(text, options);

            expect(result).toBe('result');
        });
    });
    describe('set', () => {
        let firstFnSpy: jest.Mock;
        let clearFnSpy: jest.Mock;
        let typeFnSpy: jest.Mock;
        let blurFnSpy: jest.Mock;
        beforeEach(() => {
            blurFnSpy = jest.fn().mockReturnValue('result');
            typeFnSpy = jest.fn().mockReturnValue({ blur: blurFnSpy });
            clearFnSpy = jest.fn().mockReturnValue({ type: typeFnSpy });
            firstFnSpy = jest.fn().mockReturnValue({ clear: clearFnSpy });
            textField.textInput.first = firstFnSpy;
            (textField as unknown as FormInputExtension).waitForRoutes = jest.fn();
        });
        it('should not do anything when textValue is undefined', () => {
            textField.set(undefined);

            expect(firstFnSpy).not.toHaveBeenCalled();
            expect(clearFnSpy).not.toHaveBeenCalled();
            expect(typeFnSpy).not.toHaveBeenCalled();
            expect(blurFnSpy).not.toHaveBeenCalled();
            expect((textField as unknown as FormInputExtension).waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call first then clear then type then blur from textInput', () => {
            const textValue = 'value';

            textField.set(textValue);

            expect(firstFnSpy).toHaveBeenCalled();
            expect(clearFnSpy).toHaveBeenCalled();
            expect(typeFnSpy).toHaveBeenCalledWith(textValue);
            expect(blurFnSpy).toHaveBeenCalled();
        });
        it('should call waitForRoutes', () => {
            const textValue = 'value';

            textField.set(textValue);

            expect((textField as unknown as FormInputExtension).waitForRoutes).toHaveBeenCalled();
        });
        it('should return result', () => {
            const textValue = 'value';

            const result = textField.set(textValue);

            expect(result).toBe('result');
        });
    });
});

describe('Select', () => {
    const options = {
        log: false,
        timeout: 52,
    };
    let select: Select;
    beforeEach(() => {
        select = new Select('selectSelector');
    });
    describe('select', () => {
        const text = 'text';
        let selectFnSpy: jest.Mock;
        beforeEach(() => {
            selectFnSpy = jest.fn().mockReturnValue('result');
            select.get = jest.fn().mockReturnValue({ select: selectFnSpy });
        });
        it('should call select with same args', () => {
            select.select(text, options);

            expect(selectFnSpy).toHaveBeenCalledWith(text, options);
        });
        it('should return select result', () => {
            const result = select.select(['text1', 'text2'], options);

            expect(result).toBe('result');
        });
    });
    describe('set', () => {
        beforeEach(() => {
            select.select = jest.fn().mockReturnValue('result');
            (select as unknown as FormInputExtension).waitForRoutes = jest.fn();
        });
        it('should not do anything when textValue is undefined', () => {
            select.set(undefined);

            expect(select.select).not.toHaveBeenCalled();
            expect((select as unknown as FormInputExtension).waitForRoutes).not.toHaveBeenCalled();
        });
        it('should call get then select from element', () => {
            const textValue = 'value';

            select.set(textValue);

            expect(select.select).toHaveBeenCalledWith(textValue);
        });
        it('should call waitForRoutes', () => {
            const textValue = 'value';

            select.set(textValue);

            expect((select as unknown as FormInputExtension).waitForRoutes).toHaveBeenCalled();
        });
        it('should return result', () => {
            const textValue = 'value';

            const result = select.set(textValue);

            expect(result).toBe('result');
        });
    });
});

describe('CheckBoxList', () => {
    let checkBoxList: CheckBoxList<number>;
    let checkFnSpy: jest.Mock;
    beforeEach(() => {
        checkBoxList = new CheckBoxList('checkBoxListSelector');
    });
    describe('checkBox', () => {
        it('should return a new CheckBox with child selector', () => {
            const result = checkBoxList.checkBox(1);

            expect(result).toBeInstanceOf(CheckBox);
            expect(result.selector).toBe('checkBoxListSelector input[type=checkbox]:nth(1)');
        });
    });
    describe('set', () => {
        beforeEach(() => {
            checkFnSpy = jest.fn().mockReturnValue('result');
            checkBoxList.checkBoxes.eq = jest.fn().mockReturnValue({ check: checkFnSpy });
        });
        it('should not call eq then check with index', () => {
            expect.assertions(3);
            try {
                checkBoxList.set(undefined);
            } catch (error) {
                expect(error.message).toBe('Index cannot be null or undefined');
            }
            expect(checkBoxList.checkBoxes.eq).not.toHaveBeenCalled();
            expect(checkFnSpy).not.toHaveBeenCalled();
        });
        it('should call eq then check with index', () => {
            checkBoxList.set(2);

            expect(checkBoxList.checkBoxes.eq).toHaveBeenCalledWith(2);
            expect(checkFnSpy).toHaveBeenCalled();
        });
        it('should return type result', () => {
            const result = checkBoxList.set(3);

            expect(result).toBe('result');
        });
    });
});

describe('RadioList', () => {
    let radioButtonList: RadioList<number>;
    let checkFnSpy: jest.Mock;
    beforeEach(() => {
        radioButtonList = new RadioList('radioButtonListSelector');
    });
    describe('radioButton', () => {
        it('should return a new RadioButton with child selector', () => {
            const result = radioButtonList.radioButton(12);

            expect(result).toBeInstanceOf(RadioButton);
            expect(result.selector).toBe('radioButtonListSelector input[type=radio]:nth(12)');
        });
    });
    describe('set', () => {
        beforeEach(() => {
            checkFnSpy = jest.fn().mockReturnValue('result');
            radioButtonList.radioButtons.eq = jest.fn().mockReturnValue({ check: checkFnSpy });
        });
        it('should not call eq then check with index', () => {
            expect.assertions(3);
            try {
                radioButtonList.set(undefined);
            } catch (error) {
                expect(error.message).toBe('Index cannot be null or undefined');
            }
            expect(radioButtonList.radioButtons.eq).not.toHaveBeenCalled();
            expect(checkFnSpy).not.toHaveBeenCalled();
        });
        it('should call eq then check with index', () => {
            radioButtonList.set(2);

            expect(radioButtonList.radioButtons.eq).toHaveBeenCalledWith(2);
            expect(checkFnSpy).toHaveBeenCalled();
        });
        it('should return type result', () => {
            const result = radioButtonList.set(2);

            expect(result).toBe('result');
        });
    });
});
