import { HtmlElement } from './base-components';
import { concatHtmlElementIndentificationArg, waitForRoutes } from './components.utils';
import { CypressChainable } from './cypress-component-chainable';
import {
    CheckboxFieldType,
    FormFieldType,
    RadioFieldType,
    SelectFieldType,
    TextFieldType,
} from './form-input-components.types';
import { HtmlElementIdentificationArgs } from './html-element-identification.types';
import { Checkbox, Input, Radio, Select, TextInput } from './input-components';
import {
    AnyInputMethods,
    CheckboxMethods,
    InputMethods,
    RadioMethods,
    SelectMethods,
    TextInputMethods,
} from './input-components.types';

export const FormField = <
    InputType extends AnyInputMethods = AnyInputMethods,
    ValueType extends string | number = string,
>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): FormFieldType<InputType, ValueType> => {
    const baseElement = HtmlElement(htmlElementIdenficationArg);
    const inputObject = Input<AnyInputMethods>(htmlElementIdenficationArg);
    const inputExtension = {
        blur: inputObject.blur,
        check: inputObject.check,
        clear: inputObject.clear,
        focus: inputObject.focus,
        type: inputObject.type,
        uncheck: inputObject.uncheck,
    } as CypressChainable<InputMethods | AnyInputMethods>;
    return Object.assign(baseElement, inputExtension, {
        errorMessages: HtmlElement('messages div.has-error.help-block-error'),
        set(value: ValueType | undefined) {
            inputObject.set(value as string);
            return this;
        },
        waitForRoutes() {
            waitForRoutes(...routesToWait);
        },
    });
};

const textInputSelector = 'input[type=text]';

export const TextField = (
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): TextFieldType => {
    const formField = FormField<TextInputMethods>(htmlElementIdenficationArg, ...routesToWait);
    htmlElementIdenficationArg = concatHtmlElementIndentificationArg(htmlElementIdenficationArg, textInputSelector);
    const textInput = TextInput(htmlElementIdenficationArg, ...routesToWait);
    const inputExtension = {
        blur: textInput.blur,
        clear: textInput.clear,
        focus: textInput.focus,
        type: textInput.type,
    } as CypressChainable<TextInputMethods>;
    return Object.assign(formField, inputExtension, {
        set: textInput.set,
        textInput,
    });
};

const selectInputSelector = 'select';

export const SelectField = <SelectEnum extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): SelectFieldType<SelectEnum> => {
    const formField = FormField<SelectMethods>(htmlElementIdenficationArg, ...routesToWait);
    htmlElementIdenficationArg = concatHtmlElementIndentificationArg(htmlElementIdenficationArg, selectInputSelector);
    const selectInput = Select<SelectEnum>(htmlElementIdenficationArg, ...routesToWait);
    const inputExtension = {
        blur: selectInput.blur,
        focus: selectInput.focus,
        select: selectInput.select,
    } as CypressChainable<SelectMethods>;
    return Object.assign(formField, inputExtension, {
        set: selectInput.set,
        selectInput,
    });
};

const checkboxInputSelector = 'input[type=checkbox]';

export const CheckboxField = <CheckboxEnum extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): CheckboxFieldType<CheckboxEnum> => {
    const formField = FormField<CheckboxMethods>(htmlElementIdenficationArg, ...routesToWait);
    htmlElementIdenficationArg = concatHtmlElementIndentificationArg(htmlElementIdenficationArg, checkboxInputSelector);
    const checkboxInput = Checkbox<CheckboxEnum>(htmlElementIdenficationArg, ...routesToWait);
    const inputExtension = {
        blur: checkboxInput.blur,
        focus: checkboxInput.focus,
        check: checkboxInput.check,
        uncheck: checkboxInput.uncheck,
    } as CypressChainable<CheckboxMethods>;
    return Object.assign(formField, inputExtension, {
        set: checkboxInput.set,
        checkboxInput,
    });
};

const radioInputSelector = 'input[type=radio]';

export const RadioField = <RadioEnum extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): RadioFieldType<RadioEnum> => {
    const formField = FormField<RadioMethods>(htmlElementIdenficationArg, ...routesToWait);
    htmlElementIdenficationArg = concatHtmlElementIndentificationArg(htmlElementIdenficationArg, radioInputSelector);
    const radioInput = Radio<RadioEnum>(htmlElementIdenficationArg, ...routesToWait);
    const inputExtension = {
        blur: radioInput.blur,
        focus: radioInput.focus,
        check: radioInput.check,
    } as CypressChainable<RadioMethods>;
    return Object.assign(formField, inputExtension, {
        set: radioInput.set,
        radioInput,
    });
};
