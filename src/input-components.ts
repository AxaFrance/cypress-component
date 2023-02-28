import { HtmlElement } from './base-components';
import { waitForRoutes } from './components.utils';
import { HtmlElementIdentificationArgs } from './html-element-identification.types';
import {
    AnyInputMethods,
    CheckboxMethods,
    CheckboxType,
    InputMethods,
    InputType,
    RadioMethods,
    RadioType,
    SelectMethods,
    SelectType,
    TextInputMethods,
    TextInputType,
} from './input-components.types';

export const Input = <InputExtentionType extends AnyInputMethods = AnyInputMethods>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
): InputType<InputExtentionType> => {
    const baseElement = HtmlElement<InputMethods | InputExtentionType>(htmlElementIdenficationArg);

    const set = (value: string) => {
        const input = baseElement.find(
            'input[type=text], input[type=number], input[type=checkbox], input[type=radio], select, textarea',
            { log: false },
        );
        return input.then(($: JQuery) => {
            var tagName = $.get(0).tagName;
            if (tagName == 'SELECT') {
                return input.select(value);
            }
            if (tagName == 'TEXTAREA') {
                return input.focus().clear().type(value).blur();
            }
            var attr = $.attr('type');
            if (attr === 'text' || attr === 'number') {
                return input.focus().clear().type(value).blur();
            }
            if (attr === 'radio' || attr === 'checkbox') {
                return baseElement.contains(value).click();
            }
            throw new Error(`Not implemented for TagName: ${tagName} / Attribute: ${attr}`);
        });
    };
    return Object.assign({}, baseElement, { set });
};

export const TextInput = (
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): TextInputType => {
    const input = Input<TextInputMethods>(htmlElementIdenficationArg);
    const set = (value: string) => {
        if (value == null) return input;
        input.focus().clear().type(value).blur();
        waitForRoutes(...routesToWait);
        return input;
    };
    return Object.assign(input, { set });
};

export const Checkbox = <CheckboxValue extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): CheckboxType<CheckboxValue> => {
    const input = Input<CheckboxMethods>(htmlElementIdenficationArg);
    const set = (value: CheckboxValue) => {
        if (value == null) return input;
        if (typeof value === 'number') {
            input.eq(value).check();
        } else {
            input.contains(value).check();
        }
        waitForRoutes(...routesToWait);
        return input;
    };
    return Object.assign(input, { set });
};

export const Radio = <RadioValue extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): RadioType<RadioValue> => {
    const input = Input<RadioMethods>(htmlElementIdenficationArg);
    const set = (value: RadioValue) => {
        if (value == null) return input;
        if (typeof value === 'number') {
            input.eq(value).check();
        } else {
            input.contains(value).check();
        }
        waitForRoutes(...routesToWait);
        return input;
    };
    return Object.assign(input, { set });
};

export const Select = <SelectValue extends string | number = string>(
    htmlElementIdenficationArg: HtmlElementIdentificationArgs,
    ...routesToWait: string[]
): SelectType<SelectValue> => {
    const input = Input<SelectMethods>(htmlElementIdenficationArg);
    const set = (value: SelectValue) => {
        if (value == null) return input;
        input.select(value);
        waitForRoutes(...routesToWait);
        return input;
    };
    return Object.assign(input, { set });
};

export const Button = Input;
export const Link = Input;
