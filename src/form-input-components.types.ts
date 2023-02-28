import { HtmlElementMethods } from './base-components.types';
import { CypressChainable } from './cypress-component-chainable';
import {
    AnyInputMethods,
    InputMethods,
    TextInputMethods,
    SelectMethods,
    CheckboxMethods,
    RadioMethods,
    TextInputType,
    SelectType,
    CheckboxType,
    RadioType,
} from './input-components.types';

type FormFieldMethods<InputType extends AnyInputMethods, InputValueType extends string | number = string> = {
    errorMessages: CypressChainable<HtmlElementMethods>;
    set: (value: InputValueType | undefined) => CypressChainable<HtmlElementMethods | InputType>;
    waitForRoutes: () => void;
};

export type FormFieldType<
    InputType extends AnyInputMethods,
    InputValueType extends string | number = string,
> = CypressChainable<HtmlElementMethods | InputMethods | InputType> & FormFieldMethods<InputType, InputValueType>;

export type TextFieldType = FormFieldType<TextInputMethods, string> & {
    textInput: TextInputType;
};

export type SelectFieldType<SelectEnum extends string | number = string> = FormFieldType<SelectMethods, SelectEnum> & {
    selectInput: SelectType<SelectEnum>;
};

export type CheckboxFieldType<CheckboxEnum extends string | number = string> = FormFieldType<
    CheckboxMethods,
    CheckboxEnum
> & {
    checkboxInput: CheckboxType<CheckboxEnum>;
};

export type RadioFieldType<RadioEnum extends string | number = string> = FormFieldType<RadioMethods, RadioEnum> & {
    radioInput: RadioType<RadioEnum>;
};
