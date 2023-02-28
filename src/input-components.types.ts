import { HtmlElementMethods } from './base-components.types';
import { CypressChainable, CypressComponentChainable } from './cypress-component-chainable';

export type AnyInputMethods = TextInputMethods | CheckboxMethods | RadioMethods | SelectMethods;

export type InputMethods = HtmlElementMethods | 'blur' | 'focus';
export type InputType<InputMethods extends AnyInputMethods = AnyInputMethods> = Pick<
    CypressComponentChainable,
    HtmlElementMethods | InputMethods
> & {
    set: (value: string | undefined) => Pick<CypressComponentChainable, HtmlElementMethods | InputMethods>;
};

export type TextInputMethods = InputMethods | 'clear' | 'type';
export type TextInputType = CypressChainable<TextInputMethods> & {
    set: (value: string | undefined) => CypressChainable<TextInputMethods>;
};

export type CheckboxMethods = InputMethods | 'check' | 'uncheck';
export type CheckboxType<CheckboxValue extends string | number = string> = CypressChainable<CheckboxMethods> & {
    set: (value: CheckboxValue | undefined) => CypressChainable<CheckboxMethods>;
};

export type RadioMethods = InputMethods | 'check';
export type RadioType<RadioValue extends string | number = string> = CypressChainable<RadioMethods> & {
    set: (value: RadioValue | undefined) => CypressChainable<RadioMethods>;
};

export type SelectMethods = InputMethods | 'select';
export type SelectType<SelectValue extends string | number = string> = CypressChainable<SelectMethods> & {
    set: (value: SelectValue | undefined) => CypressChainable<SelectMethods>;
};
