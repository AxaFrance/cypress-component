import { isSelectorIdClassOrAttribute } from './components.utils';
import { RouteHandler } from './route-handler';

/**
 * Bind a parent component to and child object to create a hiarchy between the elements
 * @param baseElement the parent element or its selector
 * @param object the child components
 * @returns An HtmlElement or another high level components
 *  @example
 *    const myTopLevelComponent = bindComponents('#myPage', {
 *      mySubCompenent1: new HtmlElement('#subComp1'),
 *      mySubCompenent2: new Button('#button')
 *    });
 *    //OR
 *    const myTopLevelComponent = bindComponents(new TextField('#myTextField') , {
 *      errorMessage: new HtmlElement('#myTextField .error-message')
 *    });
 */
export const bindComponents = <ExtendedElementType, BaseElementType extends HtmlElement = HtmlElement>(
    baseElement: BaseElementType | string,
    object: ExtendedElementType,
): BaseElementType & ExtendedElementType => {
    if (typeof baseElement === 'string') {
        return Object.assign(new HtmlElement(baseElement) as BaseElementType, object);
    } else {
        return Object.assign(baseElement, object);
    }
};

/**
 * @deprecated Use HtmlElement function instead
 *
 * Example:
 *
 * import { HtmlElement } from '@axa-fr/cypress-component';
 *
 * const myElement = HtmlElement('my-selector');
 */
export class HtmlElement {
    constructor(public readonly selector: string) {}

    /**
     * Get one or more DOM elements by element selector.
     * You can also add a children selector
     * The querying behavior of this command matches exactly how $(…) works in jQuery.
     * @see https://on.cypress.io/get
     * @example
     *    myElement.get()   // Get the element as a Cypress element with its selector
     *    myElement.get('span:first')   // Get the child element according to the selector
     */
    get(children?: string) {
        return cy.get(`${this.selector} ${children ?? ''}`);
    }

    /**
     * Get the children of each DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/children
     */
    children(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.get().children(selector, options);
    }

    /**
     * Click a DOM element.
     *
     * @see https://on.cypress.io/click
     * @example
     *    myElement.click()          // Click on button
     *    myElement.contains('Welcome').click()    // Click on first el containing 'Welcome'
     */
    click(options?: Partial<Cypress.ClickOptions>) {
        return this.get().click(options);
    }

    /**
     * Get the DOM element containing the text.
     * DOM elements can contain more than the desired text and still match.
     * Additionally, Cypress prefers some DOM elements over the deepest element found.
     *
     * @see https://on.cypress.io/contains
     * @example
     *    // Yield el in myElement containing 'About'
     *    myElement.contains('About')
     *    // you can use regular expression
     *    myElement.contains(/^b\w+/)
     *    // tries to find the given text for up to 1 second
     *    myElement.contains('my text to find', {timeout: 1000})
     */
    contains(
        content: string | number | RegExp,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.CaseMatchable>,
    ) {
        return this.get().contains(content, options);
    }

    /**
     * Double-click a DOM element.
     *
     * @see https://on.cypress.io/dblclick
     */
    dblclick(options?: Partial<Cypress.ClickOptions>) {
        return this.get().dblclick(options);
    }

    /**
     * Returns a new Element chaining the current element selector
     * It works like the get function except it returns a HtmlElement instead of a Cypress Cypress.Chainable
     */
    element(relativeSelector: string) {
        return new HtmlElement(`${this.selector} ${relativeSelector ?? ''}`);
    }

    /**
     * Get A DOM element at a specific index in an array of elements.
     *
     * @see https://on.cypress.io/eq
     * @param {Number} index A number indicating the index to find the element at within an array of elements. A negative number counts index from the end of the list.
     * @example
     *    myElement.eq(0)    // Yield first element from this element selector
     *    myElement.element('ul>li').eq('4')     // Yield fifth 'li' in 'ul' child of this element
     *    myElement.element('li').eq(-2) // Yields second from last 'li' element of this element
     */
    eq(index: number, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.get().eq(index, options);
    }

    /**
     * Get the first DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/first
     */
    first(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.get().first(options);
    }

    /**
     * Get the last DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/last
     */
    last(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.get().last(options);
    }

    /**
     * Right-click a DOM element.
     *
     * @see https://on.cypress.io/rightclick
     */
    rightclick(options?: Partial<Cypress.ClickOptions>) {
        return this.get().rightclick(options);
    }

    /**
     * Create an assertion. Assertions are automatically retried until they pass or time out.
     *
     * @see https://on.cypress.io/should
     * @example
     *   // Assert on the href of the location
     *   myElement.should(element => expect(element).to.be.visible)
     */
    should(fn: (currentSubject: JQuery<HTMLElement>) => void) {
        return this.get().should(fn);
    }
}

/**
 * @deprecated Use Input function instead
 *
 * Example:
 *
 * import { Input } from '@axa-fr/cypress-component';
 *
 * const myInput = Input('my-selector');
 */
export class Input extends HtmlElement {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Blur a focused element. This element must currently be in focus.
     * If you want to ensure an element is focused before blurring,
     * try using .focus() before .blur().
     *
     * @see https://on.cypress.io/blur
     */
    blur(options?: Partial<Cypress.BlurOptions>) {
        return this.get().blur(options);
    }

    /**
     * Focus on a DOM element.
     *
     * @see https://on.cypress.io/focus
     * @example
     * myInputElement.focus() // Focus on the input
     */
    focus(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.get().focus(options);
    }
}

/**
 * @deprecated Use Button function instead
 *
 * Example:
 *
 * import { Button } from '@axa-fr/cypress-component';
 *
 * const myButton = Button('my-selector');
 */
export class Button extends Input {}

/**
 * @deprecated Use Link function instead
 *
 * Example:
 *
 * import { Link } from '@axa-fr/cypress-component';
 *
 * const myLink = Link('my-selector');
 */
export class Link extends Input {}

/**
 * @deprecated Use TextInput function instead
 *
 * Example:
 *
 * import { TextInput } from '@axa-fr/cypress-component';
 *
 * const myTextInput = TextInput('my-selector');
 */
export class TextInput extends Input {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Clear the value of an `input` or `textarea`.
     * An alias for `.type({selectall}{backspace})`
     *
     * @see https://on.cypress.io/clear
     */
    clear(options?: Partial<Cypress.ClearOptions>) {
        return this.get().clear(options);
    }

    /**
     * Type into a DOM element.
     *
     * @see https://on.cypress.io/type
     * @example
     *    myTextInputElement.type('Hello, World')
     *    // type "hello" + press Enter
     *    myTextInputElement.type('hello{enter}')
     */
    type(text: string, options?: Partial<Cypress.TypeOptions>) {
        return this.get().type(text, options);
    }
}

/**
 * @deprecated
 */
export class CheckableInput extends Input {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Check checkbox(es) or radio(s). This element must be an `<input>` with type `checkbox` or `radio`.
     *
     * @see https://on.cypress.io/check
     * @example
     *    // Check checkbox element
     *    myCheckBoxOrRadioElement.check()
     */
    check(options?: Partial<Cypress.CheckOptions>) {
        return this.get().check(options);
    }
}

/**
 * @deprecated Use Checkbox function instead
 *
 * Example:
 *
 * import { Checkbox } from '@axa-fr/cypress-component';
 *
 * const myCheckbox = Checkbox('my-selector');
 */
export class CheckBox extends CheckableInput {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Uncheck checkbox(es).
     *
     * @see https://on.cypress.io/uncheck
     * @example
     *    // Unchecks checkbox element
     *    myCheckBoxElement.uncheck()
     */
    uncheck(options?: Partial<Cypress.CheckOptions>) {
        return this.get().uncheck(options);
    }
}

/**
 * @deprecated Use Radio function instead
 *
 * Example:
 *
 * import { Radio } from '@axa-fr/cypress-component';
 *
 * const myRadio = Radio('my-selector');
 */
export class RadioButton extends CheckableInput {
    constructor(selector: string) {
        super(selector);
    }
}

/**
 * @deprecated Use FormField function instead
 *
 * Example:
 *
 * import { FormField } from '@axa-fr/cypress-component';
 *
 * const myFormField = FormField('my-selector');
 */
export class FormInput extends Input {
    public readonly errorMessages: HtmlElement;
    protected readonly routesToWait: string[];
    constructor(selector: string, ...routeToWait: string[]) {
        super(selector);
        this.errorMessages = new HtmlElement(`${selector} messages div.has-error.help-block-error`);
        this.routesToWait = routeToWait;
    }

    /**
     * Wait for the list of the element requests to complete.
     *
     * @see https://on.cypress.io/wait
     */
    protected waitForRoutes() {
        if (this.routesToWait?.length) {
            RouteHandler.wait(...this.routesToWait);
        }
    }
}

/**
 * @deprecated Use TextField function instead
 *
 * Example:
 *
 * import { TextField } from '@axa-fr/cypress-component';
 *
 * const myTextField = TextField('my-selector');
 */
export class TextField extends FormInput {
    public readonly textInput: TextInput;
    constructor(selector: string, ...routeToWait: string[]) {
        super(selector, ...routeToWait);
        const textInputSelector = isSelectorIdClassOrAttribute(selector)
            ? `${this.selector} input[type=text], input[type=text]${this.selector}, ${this.selector} textarea, textarea${this.selector}`
            : `${this.selector} input[type=text], ${this.selector} textarea`;
        this.textInput = new TextInput(textInputSelector);
    }

    /**
     * Clear the value of the child `input` or `textarea`.
     * An alias for `.type({selectall}{backspace})`
     *
     * @see https://on.cypress.io/clear
     */
    clear(options?: Partial<Cypress.ClearOptions>) {
        return this.textInput.clear(options);
    }

    /**
     * Blur the child input of this element. This element must currently be in focus.
     * If you want to ensure an element is focused before blurring,
     * try using .focus() before .blur().
     *
     * @see https://on.cypress.io/blur
     */
    blur(options?: Partial<Cypress.BlurOptions>) {
        return this.textInput.blur(options);
    }

    /**
     * Focus the child input of this element.
     *
     * @see https://on.cypress.io/focus
     * @example
     * myInputElement.focus() // Focus on the input
     */
    focus(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) {
        return this.textInput.focus(options);
    }

    /**
     * Type into the child input of this element.
     *
     * @see https://on.cypress.io/type
     * @example
     *    myTextInputElement.type('Hello, World')
     *    // type "hello" + press Enter
     *    myTextInputElement.type('hello{enter}')
     */
    type(text: string, options?: Partial<Cypress.TypeOptions>) {
        return this.textInput.type(text, options);
    }

    /**
     * Set a value to the child input of this element.
     * It will clear, type and blur the element
     *
     * @see https://on.cypress.io/type
     * @example
     *    myTextInputElement.set('Hello, World')
     */
    set(textValue: string) {
        if (textValue != null) {
            const element = this.textInput.first().clear().type(textValue).blur();
            this.waitForRoutes();
            return element;
        }
    }
}

/**
 * @deprecated Use TextField function instead
 *
 * Example:
 *
 * import { TextField } from '@axa-fr/cypress-component';
 *
 * const myTextField = TextField('my-selector');
 */
export class Select<SelectEnum extends string = string> extends FormInput {
    constructor(selector: string, ...routeToWait: string[]) {
        super(selector, ...routeToWait);
    }

    /**
     * Select an `<option>` with specific text within a `<select>`.
     *
     * @see https://on.cypress.io/select
     */
    select(value: string | string[], options?: Partial<Cypress.SelectOptions>) {
        return this.get().select(value, options);
    }

    /**
     * Select an `<option>` based on the RadioList enum then wait for the element requests
     */
    set(value: SelectEnum) {
        if (value != null) {
            const element = this.select(value);
            this.waitForRoutes();
            return element;
        }
    }
}

/**
 * @deprecated Use CheckboxField function instead
 *
 * Example:
 *
 * import { CheckboxField } from '@axa-fr/cypress-component';
 *
 * const myCheckboxField = CheckboxField('my-selector');
 */
export class CheckBoxList<CheckBoxListEnum extends number> extends FormInput {
    public readonly checkBoxes: CheckBox;
    constructor(selector: string, ...routesToWait: string[]) {
        super(selector, ...routesToWait);
        this.checkBoxes = new CheckBox(`${this.selector} input[type=checkbox]`);
    }

    /**
     * Returns the nth CheckBox of this CheckBoxList
     */
    checkBox(index: CheckBoxListEnum) {
        return new CheckBox(`${this.checkBoxes.selector}:nth(${index})`);
    }

    /**
     * Check the CheckBox based on this CheckBoxList enum then wait for the element requests
     */
    set(index: CheckBoxListEnum): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index == null) {
            throw new Error('Index cannot be null or undefined');
        }
        const element = this.checkBoxes.eq(index).check();
        this.waitForRoutes();
        return element;
    }
}

/**
 * @deprecated Use RadioField function instead
 *
 * Example:
 *
 * import { RadioField } from '@axa-fr/cypress-component';
 *
 * const myRadioField = RadioField('my-selector');
 */
export class RadioList<RadioListEnum extends number> extends FormInput {
    public readonly radioButtons: RadioButton;
    constructor(selector: string, ...routesToWait: string[]) {
        super(selector, ...routesToWait);
        this.radioButtons = new RadioButton(`${this.selector} input[type=radio]`);
    }

    /**
     * Returns the nth RadioButton of this RadioList
     */
    radioButton(index: RadioListEnum) {
        return new RadioButton(`${this.radioButtons.selector}:nth(${index})`);
    }

    /**
     * Check the RadioButton based on this RadioList enum then wait for the element requests
     */
    set(index: RadioListEnum): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index == null) {
            throw new Error('Index cannot be null or undefined');
        }
        const element = this.radioButtons.eq(index).check();
        this.waitForRoutes();
        return element;
    }
}
