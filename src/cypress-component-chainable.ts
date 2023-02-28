export type CypressComponentChainableMethods =
    | 'as'
    | 'selectFile'
    | 'blur'
    | 'check'
    | 'children'
    | 'clear'
    | 'click'
    | 'closest'
    | 'contains'
    | 'dblclick'
    | 'rightclick'
    | 'each'
    | 'eq'
    | 'filter'
    | 'find'
    | 'first'
    | 'focus'
    | 'its'
    | 'last'
    | 'next'
    | 'nextAll'
    | 'nextUntil'
    | 'parent'
    | 'parents'
    | 'parentsUntil'
    | 'prev'
    | 'prevAll'
    | 'prevUntil'
    | 'scrollIntoView'
    | 'scrollTo'
    | 'select'
    | 'should'
    | 'siblings'
    | 'submit'
    | 'spread'
    | 'then'
    | 'type'
    | 'uncheck';

export type CypressComponentChainable<
    PropFilter extends CypressComponentChainableMethods = undefined,
    Subject = any,
> = CypressChainable<CypressComponentChainableMethods | PropFilter, Subject>;

export type CypressChainable<PropFilter extends keyof GenericCypressChainable<undefined>, Subject = any> = Pick<
    GenericCypressChainable<PropFilter, Subject>,
    PropFilter
>;

interface GenericCypressChainable<PropKeys extends keyof GenericCypressChainable<undefined>, Subject = any> {
    /**
     * Create an assertion. Assertions are automatically retried until they pass or time out.
     *
     * @alias should
     * @see https://on.cypress.io/and
     */
    and: CypressChainable<PropKeys, Subject>;

    /**
     * Assign an alias for later use. Reference the alias later within a
     * [cy.get()](https://on.cypress.io/get) or
     * [cy.wait()](https://on.cypress.io/wait) command with a `@` prefix.
     * You can alias DOM elements, routes, stubs and spies.
     *
     * @see https://on.cypress.io/as
     * @see https://on.cypress.io/variables-and-aliases
     * @see https://on.cypress.io/get
     * @example
    ```
    // Get the aliased ‘todos’ elements
    cy.get('ul#todos').as('todos')
    //...hack hack hack...
    // later retrieve the todos
    cy.get('@todos')
    ```
     */
    as(alias: string): CypressChainable<PropKeys, Subject>;

    /**
     * Select a file with the given <input> element, or drag and drop a file over any DOM subject.
     *
     * @param {FileReference} files - The file(s) to select or drag onto this element.
     * @see https://on.cypress.io/selectfile
     * @example
     *    cy.get('input[type=file]').selectFile(Cypress.Buffer.from('text'))
     *    cy.get('input[type=file]').selectFile({
     *      fileName: 'users.json',
     *      fileContents: [{name: 'John Doe'}]
     *    })
     */
    selectFile(
        files: Cypress.FileReference | Cypress.FileReference[],
        options?: Partial<Cypress.SelectFileOptions>,
    ): CypressChainable<PropKeys, Subject>;

    /**
     * Blur a focused element. This element must currently be in focus.
     * If you want to ensure an element is focused before blurring,
     * try using .focus() before .blur().
     *
     * @see https://on.cypress.io/blur
     */
    blur(options?: Partial<Cypress.BlurOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Check checkbox(es) or radio(s). This element must be an `<input>` with type `checkbox` or `radio`.
     *
     * @see https://on.cypress.io/check
     * @example
     *    // Check checkbox element
     *    cy.get('[type="checkbox"]').check()
     *    // Check first radio element
     *    cy.get('[type="radio"]').first().check()
     */
    check(options?: Partial<Cypress.CheckOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Check checkbox(es) or radio(s). This element must be an `<input>` with type `checkbox` or `radio`.
     *
     * @see https://on.cypress.io/check
     * @example
     *    // Select the radio with the value of ‘US’
     *    cy.get('[type="radio"]').check('US')
     *    // Check the checkboxes with the values ‘ga’ and ‘ca’
     *    cy.get('[type="checkbox"]').check(['ga', 'ca'])
     */
    check(value: string | string[], options?: Partial<Cypress.CheckOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Get the children of each DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/children
     */
    children<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    children<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    children<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Clear the value of an `input` or `textarea`.
     * An alias for `.type({selectall}{backspace})`
     *
     * @see https://on.cypress.io/clear
     */
    clear(options?: Partial<Cypress.ClearOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Clear a specific browser cookie.
     * Cypress automatically clears all cookies before each test to prevent state from being shared across tests. You shouldn’t need to use this command unless you’re using it to clear a specific cookie inside a single test.
     *
     * @see https://on.cypress.io/clearcookie
     */
    clearCookie(
        name: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Clear all browser cookies.
     * Cypress automatically clears all cookies before each test to prevent state from being shared across tests. You shouldn’t need to use this command unless you’re using it to clear a specific cookie inside a single test.
     *
     * @see https://on.cypress.io/clearcookies
     */
    clearCookies(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Clear data in local storage.
     * Cypress automatically runs this command before each test to prevent state from being
     * shared across tests. You shouldn’t need to use this command unless you’re using it
     * to clear localStorage inside a single test. Yields `localStorage` object.
     *
     * @see https://on.cypress.io/clearlocalstorage
     * @param {string} [key] - name of a particular item to remove (optional).
     * @example
      ```
      // Removes all local storage keys
      cy.clearLocalStorage()
        .should(ls => {
          expect(ls.getItem('prop1')).to.be.null
        })
      // Removes item "todos"
      cy.clearLocalStorage("todos")
      ```
     */
    clearLocalStorage(key?: string): Pick<GenericCypressChainable<PropKeys, Storage>, PropKeys>;
    /**
     * Clear keys in local storage that match given regular expression.
     *
     * @see https://on.cypress.io/clearlocalstorage
     * @param {RegExp} re - regular expression to match.
     * @example
    ```
    // Clears all local storage matching /app-/
    cy.clearLocalStorage(/app-/)
    ```
     */
    clearLocalStorage(re: RegExp): Pick<GenericCypressChainable<PropKeys, Storage>, PropKeys>;
    /**
      * Clear data in local storage.
      * Cypress automatically runs this command before each test to prevent state from being
      * shared across tests. You shouldn’t need to use this command unless you’re using it
      * to clear localStorage inside a single test. Yields `localStorage` object.
      *
      * @see https://on.cypress.io/clearlocalstorage
      * @param {options} [object] - options object
      * @example
       ```
       // Removes all local storage items, without logging
       cy.clearLocalStorage({ log: false })
       ```
      */
    clearLocalStorage(options: Partial<Cypress.Loggable>): Pick<GenericCypressChainable<PropKeys, Storage>, PropKeys>;
    /**
      * Clear data in local storage.
      * Cypress automatically runs this command before each test to prevent state from being
      * shared across tests. You shouldn’t need to use this command unless you’re using it
      * to clear localStorage inside a single test. Yields `localStorage` object.
      *
      * @see https://on.cypress.io/clearlocalstorage
      * @param {string} [key] - name of a particular item to remove (optional).
      * @param {options} [object] - options object
      * @example
       ```
       // Removes item "todos" without logging
       cy.clearLocalStorage("todos", { log: false })
       ```
      */
    clearLocalStorage(
        key: string,
        options: Partial<Cypress.Loggable>,
    ): Pick<GenericCypressChainable<PropKeys, Storage>, PropKeys>;

    /**
     * Click a DOM element.
     *
     * @see https://on.cypress.io/click
     * @example
     *    cy.get('button').click()          // Click on button
     *    cy.focused().click()              // Click on el with focus
     *    cy.contains('Welcome').click()    // Click on first el containing 'Welcome'
     */
    click(options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Click a DOM element at specific corner / side.
     *
     * @param {PositionType} position - The position where the click should be issued.
     * The `center` position is the default position.
     * @see https://on.cypress.io/click
     * @example
     *    cy.get('button').click('topRight')
     */
    click(position: Cypress.PositionType, options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Click a DOM element at specific coordinates
     *
     * @param {number} x The distance in pixels from the element’s left to issue the click.
     * @param {number} y The distance in pixels from the element’s top to issue the click.
     * @see https://on.cypress.io/click
     * @example
    ```
    // The click below will be issued inside of the element
    // (15px from the left and 40px from the top).
    cy.get('button').click(15, 40)
    ```
     */
    click(x: number, y: number, options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * `cy.clock()` overrides native global functions related to time allowing them to be controlled
     * synchronously via [cy.tick()](https://on.cypress.io/tick) or the yielded clock object.
     * This includes controlling:
     * * `setTimeout`
     * * `clearTimeout`
     * * `setInterval`
     * * `clearInterval`
     * * `Date` Objects
     *
     * The clock starts at the unix epoch (timestamp of 0).
     * This means that when you instantiate new Date in your application,
     * it will have a time of January 1st, 1970.
     *
     * To restore the real clock call `.restore()`
     *
     * @example
     *  cy.clock()
     *  ...
     *  // restore the application clock
     *  cy.clock().then(clock => {
     *    clock.restore()
     *  })
     *  // or use this shortcut
     *  cy.clock().invoke('restore')
     *
     * @see https://on.cypress.io/clock
     */
    clock(): Pick<GenericCypressChainable<PropKeys, Cypress.Clock>, PropKeys>;
    /**
     * Mocks global clock and sets current timestamp to the given value.
     * Overrides all functions that deal with time.
     *
     * @see https://on.cypress.io/clock
     * @example
     *    // in your app code
     *    $('#date').text(new Date().toJSON())
     *    // in the spec file
     *    // March 14, 2017 timestamp or Date object
     *    const now = new Date(2017, 2, 14).getTime()
     *    cy.clock(now)
     *    cy.visit('/index.html')
     *    cy.get('#date').contains('2017-03-14')
     *    // to restore the real clock
     *    cy.clock().then(clock => {
     *      clock.restore()
     *    })
     *    // or use this shortcut
     *    cy.clock().invoke('restore')
     */
    clock(
        now: number | Date,
        options?: Cypress.Loggable,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Clock>, PropKeys>;
    /**
     * Mocks global clock but only overrides specific functions.
     *
     * @see https://on.cypress.io/clock
     * @example
     *    // keep current date but override "setTimeout" and "clearTimeout"
     *    cy.clock(null, ['setTimeout', 'clearTimeout'])
     */
    clock(
        now: number | Date,
        functions?: Array<'setTimeout' | 'clearTimeout' | 'setInterval' | 'clearInterval' | 'Date'>,
        options?: Cypress.Loggable,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Clock>, PropKeys>;
    /**
     * Mocks global clock and all functions.
     *
     * @see https://on.cypress.io/clock
     * @example
     *    // mock clock but do not log this command
     *    cy.clock({ log: false })
     */
    clock(options: Cypress.Loggable): Pick<GenericCypressChainable<PropKeys, Cypress.Clock>, PropKeys>;

    /**
     * Get the first DOM element that matches the selector (whether it be itself or one of its ancestors).
     *
     * @see https://on.cypress.io/closest
     */
    closest<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    closest<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get the DOM element containing the text.
     * DOM elements can contain more than the desired text and still match.
     * Additionally, Cypress prefers some DOM elements over the deepest element found.
     *
     * @see https://on.cypress.io/contains
     * @example
     *    // Yield el in .nav containing 'About'
     *    cy.get('.nav').contains('About')
     *    // Yield first el in document containing 'Hello'
     *    cy.contains('Hello')
     *    // you can use regular expression
     *    cy.contains(/^b\w+/)
     *    // yields <ul>...</ul>
     *    cy.contains('ul', 'apples')
     *    // tries to find the given text for up to 1 second
     *    cy.contains('my text to find', {timeout: 1000})
     */
    contains(
        content: string | number | RegExp,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.CaseMatchable & Cypress.Shadow>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Get the child DOM element that contains given text.
     *
     * @see https://on.cypress.io/contains
     * @example
     *    // Yield el in .nav containing 'About'
     *    cy.get('.nav').contains('About')
     */
    contains<E extends Node = HTMLElement>(
        content: string | number | RegExp,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the DOM element with name "selector" containing the text or regular expression.
     *
     * @see https://on.cypress.io/contains
     * @example
     *    // yields <ul>...</ul>
     *    cy.contains('ul', 'apples')
     */
    contains<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        text: string | number | RegExp,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.CaseMatchable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get the DOM element using CSS "selector" containing the text or regular expression.
     *
     * @see https://on.cypress.io/contains
     * @example
     *    // yields <... class="foo">... apples ...</...>
     *    cy.contains('.foo', 'apples')
     */
    contains<E extends Node = HTMLElement>(
        selector: string,
        text: string | number | RegExp,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.CaseMatchable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Double-click a DOM element.
     *
     * @see https://on.cypress.io/dblclick
     */
    dblclick(options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Double-click a DOM element at specific corner / side.
     *
     * @param {PositionType} position - The position where the click should be issued.
     * The `center` position is the default position.
     * @see https://on.cypress.io/dblclick
     * @example
     *    cy.get('button').dblclick('topRight')
     */
    dblclick(
        position: Cypress.PositionType,
        options?: Partial<Cypress.ClickOptions>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Double-click a DOM element at specific coordinates
     *
     * @param {number} x The distance in pixels from the element’s left to issue the click.
     * @param {number} y The distance in pixels from the element’s top to issue the click.
     * @see https://on.cypress.io/dblclick
     * @example
    ```
    // The click below will be issued inside of the element
    // (15px from the left and 40px from the top).
    cy.get('button').dblclick(15, 40)
    ```
     */
    dblclick(x: number, y: number, options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Right-click a DOM element.
     *
     * @see https://on.cypress.io/rightclick
     */
    rightclick(options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Right-click a DOM element at specific corner / side.
     *
     * @param {PositionType} position - The position where the click should be issued.
     * The `center` position is the default position.
     * @see https://on.cypress.io/click
     * @example
     *    cy.get('button').rightclick('topRight')
     */
    rightclick(
        position: Cypress.PositionType,
        options?: Partial<Cypress.ClickOptions>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Right-click a DOM element at specific coordinates
     *
     * @param {number} x The distance in pixels from the element’s left to issue the click.
     * @param {number} y The distance in pixels from the element’s top to issue the click.
     * @see https://on.cypress.io/rightclick
     * @example
    ```
    // The click below will be issued inside of the element
    // (15px from the left and 40px from the top).
    cy.get('button').rightclick(15, 40)
    ```
     */
    rightclick(x: number, y: number, options?: Partial<Cypress.ClickOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Set a debugger and log what the previous command yields.
     *
     * @see https://on.cypress.io/debug
     */
    debug(options?: Partial<Cypress.Loggable>): CypressChainable<PropKeys, Subject>;

    /**
     * Save/Restore browser Cookies, LocalStorage, and SessionStorage data resulting from the supplied `setup` function.
     *
     * Only available if the `experimentalSessionSupport` config option is enabled.
     *
     * @see https://on.cypress.io/session
     */
    session(
        id: string | object,
        setup?: Cypress.SessionOptions['validate'],
        options?: Cypress.SessionOptions,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Get the window.document of the page that is currently active.
     *
     * @see https://on.cypress.io/document
     * @example
     *    cy.document()
     *      .its('contentType')
     *      .should('eq', 'text/html')
     */
    document(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Document>, PropKeys>;

    /**
     * Iterate through an array like structure (arrays or objects with a length property).
     *
     * @see https://on.cypress.io/each
     */
    each<E extends Node = HTMLElement>(
        fn: (element: JQuery<E>, index: number, $list: E[]) => void,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>; // Can't properly infer type without breaking down GenericCypressChainable
    each(fn: (item: any, index: number, $list: any[]) => void): CypressChainable<PropKeys, Subject>;

    /**
     * End a chain of commands
     *
     * @see https://on.cypress.io/end
     */
    end(): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Get A DOM element at a specific index in an array of elements.
     *
     * @see https://on.cypress.io/eq
     * @param {Number} index A number indicating the index to find the element at within an array of elements. A negative number counts index from the end of the list.
     * @example
     *    cy.get('tbody>tr').eq(0)    // Yield first 'tr' in 'tbody'
     *    cy.get('ul>li').eq('4')     // Yield fifth 'li' in 'ul'
     *    cy.get('li').eq(-2) // Yields second from last 'li' element
     */
    eq<E extends Node = HTMLElement>(
        index: number,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Execute a system command.
     * @see https://on.cypress.io/exec
     */
    exec(
        command: string,
        options?: Partial<Cypress.ExecOptions>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Exec>, PropKeys>;

    /**
     * Get the DOM elements that match a specific selector. Opposite of `.not()`
     *
     * @see https://on.cypress.io/filter
     */
    filter<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>; // automatically returns the correct HTMLElement type
    /**
     * Get the DOM elements that match a specific selector. Opposite of `.not()`
     *
     * @see https://on.cypress.io/filter
     */
    filter<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the DOM elements that match a specific selector. Opposite of `.not()`
     *
     * @see https://on.cypress.io/filter
     */
    filter<E extends Node = HTMLElement>(
        fn: (index: number, element: E) => boolean,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get the descendent DOM elements of a specific selector.
     *
     * @see https://on.cypress.io/find
     * @example
     *    cy.get('.article').find('footer') // Yield 'footer' within '.article'
     */
    find<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Finds the descendent DOM elements with the given selector.
     *
     * @see https://on.cypress.io/find
     * @example
     *    // Find the li’s within the nav
     *    cy.get('.left-nav>.nav').find('>li')
     */
    find<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get the first DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/first
     */
    first(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): CypressChainable<PropKeys, Subject>;

    /**
     * Load a fixed set of data located in a file.
     *
     * @see https://on.cypress.io/fixture
     */
    fixture<Contents = any>(
        path: string,
        options?: Partial<Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Contents>, PropKeys>; // no log?
    /**
     * Load a fixed set of data located in a file with given encoding.
     *
     * @see https://on.cypress.io/fixture
     */
    fixture<Contents = any>(
        path: string,
        encoding: Cypress.Encodings,
        options?: Partial<Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Contents>, PropKeys>; // no log?

    /**
     * Focus on a DOM element.
     *
     * @see https://on.cypress.io/focus
     * @example
     * cy.get('input').first().focus() // Focus on the first input
     */
    focus(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): CypressChainable<PropKeys, Subject>;

    /**
     * Get the DOM element that is currently focused.
     *
     * @see https://on.cypress.io/focused
     * @example
     *    // Get the element that is focused
     *    cy.focused().then(function($el) {
     *       // do something with $el
     *    })
     *    // Blur the element with focus
     *    cy.focused().blur()
     *    // Make an assertion on the focused element
     *    cy.focused().should('have.attr', 'name', 'username')
     */
    focused(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery>, PropKeys>;

    /**
     * Get one or more DOM elements by node name: input, button, etc.
     * @see https://on.cypress.io/get
     * @example
     *    cy.get('input').should('be.disabled')
     *    cy.get('button').should('be.visible')
     */
    get<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get one or more DOM elements by selector.
     * The querying behavior of this command matches exactly how $(…) works in jQuery.
     * @see https://on.cypress.io/get
     * @example
     *    cy.get('.list>li')    // Yield the <li>'s in <.list>
     *    cy.get('ul li:first').should('have.class', 'active')
     *    cy.get('.dropdown-menu').click()
     */
    get<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get one or more DOM elements by alias.
     * @see https://on.cypress.io/get#Alias
     * @example
     *    // Get the aliased ‘todos’ elements
     *    cy.get('ul#todos').as('todos')
     *    //...hack hack hack...
     *    //later retrieve the todos
     *    cy.get('@todos')
     */
    get<S = any>(
        alias: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;

    /**
     * Get a browser cookie by its name.
     *
     * @see https://on.cypress.io/getcookie
     */
    getCookie(
        name: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Cookie | null>, PropKeys>;

    /**
     * Get all of the browser cookies.
     *
     * @see https://on.cypress.io/getcookies
     */
    getCookies(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Cookie[]>, PropKeys>;

    /**
     * Navigate back or forward to the previous or next URL in the browser’s history.
     *
     * @see https://on.cypress.io/go
     */
    go(
        direction: Cypress.HistoryDirection | number,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;

    /**
     * Get the current URL hash of the page that is currently active.
     *
     * @see https://on.cypress.io/hash
     */
    hash(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, string>, PropKeys>;

    /**
     * Invoke a function on the previously yielded subject.
     *
     * @see https://on.cypress.io/invoke
     */
    invoke<K extends keyof Subject, F extends ((...args: any[]) => any) & Subject[K], R = ReturnType<F>>(
        functionName: K,
        ...args: any[]
    ): GenericCypressChainable<PropKeys, R>;
    invoke<K extends keyof Subject, F extends ((...args: any[]) => any) & Subject[K], R = ReturnType<F>>(
        options: Partial<Cypress.Loggable & Cypress.Timeoutable>,
        functionName: K,
        ...args: any[]
    ): GenericCypressChainable<PropKeys, R>;

    /**
     * Invoke a function in an array of functions.
     * @see https://on.cypress.io/invoke
     */
    invoke<T extends (...args: any[]) => any, Subject extends T[]>(
        index: number,
    ): GenericCypressChainable<PropKeys, ReturnType<T>>;
    invoke<T extends (...args: any[]) => any, Subject extends T[]>(
        options: Partial<Cypress.Loggable & Cypress.Timeoutable>,
        index: number,
    ): GenericCypressChainable<PropKeys, ReturnType<T>>;

    /**
     * Invoke a function on the previously yielded subject by a property path.
     * Property path invocation cannot be strongly-typed.
     * Invoking by a property path will always result in any.
     *
     * @see https://on.cypress.io/invoke
     */
    invoke(propertyPath: string, ...args: any[]): GenericCypressChainable<PropKeys>;

    /**
     * Get a property’s value on the previously yielded subject.
     *
     * @see https://on.cypress.io/its
     * @example
     *    // Get the 'width' property
     *    cy.wrap({width: '50'}).its('width')
     *    // Drill into nested properties by using dot notation
     *    cy.wrap({foo: {bar: {baz: 1}}}).its('foo.bar.baz')
     */
    its<K extends keyof Subject>(
        propertyName: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Subject[K]>, PropKeys>;
    its(
        propertyPath: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): GenericCypressChainable<PropKeys>;

    /**
     * Get a value by index from an array yielded from the previous command.
     * @see https://on.cypress.io/its
     * @example
     *    cy.wrap(['a', 'b']).its(1).should('equal', 'b')
     */
    its<T, Subject extends T[]>(
        index: number,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, T>, PropKeys>;

    /**
     * Get the last DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/last
     */
    last<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get the global `window.location` object of the page that is currently active.
     *
     * @see https://on.cypress.io/location
     * @example
     *    cy.location() // Get location object
     */
    location(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Location>, PropKeys>;
    /**
     * Get a part of the global `window.location` object of the page that is currently active.
     *
     * @see https://on.cypress.io/location
     * @example
     *    cy.location('host') // Get the host of the location object
     *    cy.location('port') // Get the port of the location object
     *    // Assert on the href of the location
     *    cy.location('href').should('contain', '/tag/tutorials')
     */
    location<K extends keyof Location>(
        key: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Location[K]>, PropKeys>;

    /**
     * Print a message to the Cypress Command Log.
     *
     * @see https://on.cypress.io/log
     */
    log(message: string, ...args: any[]): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Get the immediately following sibling of each DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/next
     */
    next<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get the immediately following sibling of each DOM element within a set of DOM elements.
     *
     * @see https://on.cypress.io/next
     * @example
     *    cy.get('nav a:first').next()
     */
    next<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the immediately following sibling of each DOM element within a set of DOM elements that match selector
     *
     * @see https://on.cypress.io/next
     * @example
     *    cy.get('nav a:first').next('.menu-item)
     */
    next<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements.
     *
     * @see https://on.cypress.io/nextall
     */
    nextAll<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements.
     *
     * @see https://on.cypress.io/nextall
     */
    nextAll<E extends HTMLElement = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements.
     *
     * @see https://on.cypress.io/nextall
     */
    nextAll<E extends HTMLElement = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/nextuntil
     */
    nextUntil<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/nextuntil
     */
    nextUntil<E extends HTMLElement = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all following siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/nextuntil
     */
    nextUntil<E extends HTMLElement = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Filter DOM element(s) from a set of DOM elements. Opposite of `.filter()`
     *
     * @see https://on.cypress.io/not
     */
    not(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery>, PropKeys>;

    /**
     * These events come from Cypress as it issues commands and reacts to their state. These are all useful to listen to for debugging purposes.
     * @see https://on.cypress.io/catalog-of-events#App-Events
     */
    on: Cypress.Actions;

    /**
     * These events come from Cypress as it issues commands and reacts to their state. These are all useful to listen to for debugging purposes.
     * @see https://on.cypress.io/catalog-of-events#App-Events
     */
    once: Cypress.Actions;

    /**
     * These events come from Cypress as it issues commands and reacts to their state. These are all useful to listen to for debugging purposes.
     * @see https://on.cypress.io/catalog-of-events#App-Events
     */
    off: Cypress.Actions;

    /**
     * Get the parent DOM element of a set of DOM elements.
     *
     * @see https://on.cypress.io/parent
     */
    parent<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get the parent DOM element of a set of DOM elements.
     *
     * @see https://on.cypress.io/parent
     */
    parent<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the parent DOM element of a set of DOM elements.
     *
     * @see https://on.cypress.io/parent
     */
    parent<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get the parent DOM elements of a set of DOM elements.
     *
     * @see https://on.cypress.io/parents
     */
    parents<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get the parent DOM elements of a set of DOM elements.
     *
     * @see https://on.cypress.io/parents
     */
    parents<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the parent DOM elements of a set of DOM elements.
     *
     * @see https://on.cypress.io/parents
     */
    parents<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get all ancestors of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/parentsuntil
     */
    parentsUntil<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all ancestors of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/parentsuntil
     */
    parentsUntil<E extends Node = HTMLElement>(
        selector: string,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all ancestors of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     *
     * @see https://on.cypress.io/parentsuntil
     */
    parentsUntil<E extends Node = HTMLElement>(
        element: E | JQuery<E>,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Stop cy commands from running and allow interaction with the application under test. You can then "resume" running all commands or choose to step through the "next" commands from the Command Log.
     * This does not set a `debugger` in your code, unlike `.debug()`
     *
     * @see https://on.cypress.io/pause
     */
    pause(options?: Partial<Cypress.Loggable>): CypressChainable<PropKeys, Subject>;

    /**
     * Get the immediately preceding sibling of each element in a set of the elements.
     *
     * @example
     *    cy.get('nav').prev('a') // Yield previous 'a'
     * @see https://on.cypress.io/prev
     */
    prev<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get the immediately preceding sibling of each element in a set of the elements.
     *
     * @example
     *    cy.get('li').prev() // Yield previous 'li'
     * @see https://on.cypress.io/prev
     */
    prev<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get the immediately preceding sibling of each element in a set of the elements that match selector.
     *
     * @example
     *    cy.get('nav').prev('.menu-item') // Yield previous '.menu-item'
     * @see https://on.cypress.io/prev
     */
    prev<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements.
     * > The querying behavior of this command matches exactly how [.prevAll()](http://api.jquery.com/prevAll) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevAll<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements.
     * > The querying behavior of this command matches exactly how [.prevAll()](http://api.jquery.com/prevAll) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevAll<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements.
     * > The querying behavior of this command matches exactly how [.prevAll()](http://api.jquery.com/prevAll) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevAll<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     * > The querying behavior of this command matches exactly how [.prevUntil()](http://api.jquery.com/prevUntil) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevUntil<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     * > The querying behavior of this command matches exactly how [.prevUntil()](http://api.jquery.com/prevUntil) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevUntil<E extends Node = HTMLElement>(
        selector: string,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all previous siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided.
     * > The querying behavior of this command matches exactly how [.prevUntil()](http://api.jquery.com/prevUntil) works in jQuery.
     *
     * @see https://on.cypress.io/prevall
     */
    prevUntil<E extends Node = HTMLElement>(
        element: E | JQuery<E>,
        filter?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Read a file and yield its contents.
     *
     * @see https://on.cypress.io/readfile
     */
    readFile<Contents = any>(
        filePath: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Contents>, PropKeys>;
    /**
     * Read a file with given encoding and yield its contents.
     *
     * @see https://on.cypress.io/readfile
     * @example
     *    cy.readFile('foo.json', 'utf8')
     */
    readFile<Contents = any>(
        filePath: string,
        encoding: Cypress.Encodings,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Contents>, PropKeys>;

    /**
     * Reload the page.
     *
     * @see https://on.cypress.io/reload
     * @example
     *    cy.reload()
     */
    reload(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;
    /**
     * Reload the page without cache
     *
     * @see https://on.cypress.io/reload
     * @param {Boolean} forceReload Whether to reload the current page without using the cache. true forces the reload without cache.
     * @example
     *    // Reload the page without using the cache
     *    cy.visit('http://localhost:3000/admin')
     *    cy.reload(true)
     */
    reload(forceReload: boolean): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;

    /**
     * Make an HTTP GET request.
     *
     * @see https://on.cypress.io/request
     * @example
     *    cy.request('http://dev.local/seed')
     */
    request<T = any>(
        url: string,
        body?: Cypress.RequestBody,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Response<T>>, PropKeys>;
    /**
     * Make an HTTP request with specific method.
     *
     * @see https://on.cypress.io/request
     * @example
     *    cy.request('POST', 'http://localhost:8888/users', {name: 'Jane'})
     */
    request<T = any>(
        method: Cypress.HttpMethod,
        url: string,
        body?: Cypress.RequestBody,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Response<T>>, PropKeys>;
    /**
     * Make an HTTP request with specific behavior.
     *
     * @see https://on.cypress.io/request
     * @example
     *    cy.request({
     *      url: '/dashboard',
     *      followRedirect: false // turn off following redirects
     *    })
     */
    request<T = any>(
        options: Partial<Cypress.RequestOptions>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Response<T>>, PropKeys>;

    /**
     * Get the root DOM element.
     * The root element yielded is `<html>` by default.
     * However, when calling `.root()` from a `.within()` command,
     * the root element will point to the element you are "within".
     *
     * @see https://on.cypress.io/root
     */
    root<E extends Node = HTMLHtmlElement>(
        options?: Partial<Cypress.Loggable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>; // can't do better typing unless we ignore the `.within()` case

    /**
     * @deprecated Use `cy.intercept()` instead.
     *
     * Use `cy.route()` to manage the behavior of network requests.
     * @see https://on.cypress.io/route
     * @example
     *    cy.server()
     *    cy.route('https://localhost:7777/users', [{id: 1, name: 'Pat'}])
     */
    route(url: string | RegExp, response?: string | object): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * @deprecated Use `cy.intercept()` instead.
     *
     * Spy or stub request with specific method and url.
     *
     * @see https://on.cypress.io/route
     * @example
     *    cy.server()
     *    // spy on POST /todos requests
     *    cy.route('POST', '/todos').as('add-todo')
     */
    route(
        method: string,
        url: string | RegExp,
        response?: string | object,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * @deprecated Use `cy.intercept()` instead.
     *
     * Set a route by returning an object literal from a callback function.
     * Functions that return a Promise will automatically be awaited.
     *
     * @see https://on.cypress.io/route
     * @example
     *    cy.server()
     *    cy.route(() => {
     *      // your logic here
     *      // return an appropriate routing object here
     *      return {
     *        method: 'POST',
     *        url: '/comments',
     *        response: this.commentsFixture
     *      }
     *    })
     */
    route(fn: () => Cypress.RouteOptions): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * @deprecated Use `cy.intercept()` instead.
     *
     * Spy or stub a given route.
     *
     * @see https://on.cypress.io/route
     * @example
     *    cy.server()
     *    cy.route({
     *      method: 'DELETE',
     *      url: '/users',
     *      status: 412,
     *      delay: 1000
     *      // and other options, see documentation
     *    })
     */
    route(options: Partial<Cypress.RouteOptions>): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Take a screenshot of the application under test and the Cypress Command Log.
     *
     * @see https://on.cypress.io/screenshot
     * @example
     *    cy.screenshot()
     *    cy.get(".post").screenshot()
     */
    screenshot(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.ScreenshotOptions>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * Take a screenshot of the application under test and the Cypress Command Log and save under given filename.
     *
     * @see https://on.cypress.io/screenshot
     * @example
     *    cy.get(".post").screenshot("post-element")
     */
    screenshot(
        fileName: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.ScreenshotOptions>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Scroll an element into view.
     *
     * @see https://on.cypress.io/scrollintoview
     */
    scrollIntoView(options?: Partial<Cypress.ScrollIntoViewOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Scroll to a specific position.
     *
     * @see https://on.cypress.io/scrollto
     */
    scrollTo(
        position: Cypress.PositionType,
        options?: Partial<Cypress.ScrollToOptions>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Scroll to a specific X,Y position.
     *
     * @see https://on.cypress.io/scrollto
     */
    scrollTo(
        x: number | string,
        y: number | string,
        options?: Partial<Cypress.ScrollToOptions>,
    ): CypressChainable<PropKeys, Subject>;

    /**
     * Select an `<option>` with specific text, value, or index within a `<select>`.
     *
     * @see https://on.cypress.io/select
     */
    select(
        valueOrTextOrIndex: string | number | Array<string | number>,
        options?: Partial<Cypress.SelectOptions>,
    ): CypressChainable<PropKeys, Subject>;

    /**
     * @deprecated Use `cy.intercept()` instead.
     *
     * Start a server to begin routing responses to `cy.route()` and `cy.request()`.
     *
     * @example
     *    // start server
     *    cy.server()
     *    // get default server options
     *    cy.server().should((server) => {
     *      expect(server.delay).to.eq(0)
     *      expect(server.method).to.eq('GET')
     *      expect(server.status).to.eq(200)
     *      // and many others options
     *    })
     *
     * @see https://on.cypress.io/server
     */
    server(
        options?: Partial<Cypress.ServerOptions>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.ServerOptions>, PropKeys>;

    /**
     * Set a browser cookie.
     *
     * @see https://on.cypress.io/setcookie
     */
    setCookie(
        name: string,
        value: string,
        options?: Partial<Cypress.SetCookieOptions>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Cookie>, PropKeys>;

    /**
     * Traverse into an element's shadow root.
     *
     * @example
     *    cy.get('my-component')
     *    .shadow()
     *    .find('.my-button')
     *    .click()
     * @see https://on.cypress.io/shadow
     */
    shadow(): CypressChainable<PropKeys, Subject>;

    /**
     * Create an assertion. Assertions are automatically retried until they pass or time out.
     *
     * @see https://on.cypress.io/should
     * @example
     *   // Assert on the href of the location
     *   cy.location('href').should('contain', '/tag/tutorials/')
     */
    // should: CypressChainer<PropKeys, Subject>;
    /**
     * Create an assertion. Assertions are automatically retried until they pass or time out.
     * Passing a function to `.should()` enables you to make multiple assertions on the yielded subject. This also gives you the opportunity to massage what you’d like to assert on.
     * Just be sure _not_ to include any code that has side effects in your callback function. The callback function will be retried over and over again until no assertions within it throw.
     * @example
     *    cy
     *      .get('p')
     *      .should(($p) => {
     *        // should have found 3 elements
     *        expect($p).to.have.length(3)
     *
     *        // make sure the first contains some text content
     *        expect($p.first()).to.contain('Hello World')
     *
     *        // use jquery's map to grab all of their classes
     *        // jquery's map returns a new jquery object
     *        const classes = $p.map((i, el) => {
     *          return Cypress.$(el).attr('class')
     *        })
     *
     *        // call classes.get() to make this a plain array
     *        expect(classes.get()).to.deep.eq([
     *          'text-primary',
     *          'text-danger',
     *          'text-default'
     *        ])
     *      })
     * @see https://on.cypress.io/should
     */
    should(fn: (currentSubject: Subject) => void): CypressChainable<PropKeys, Subject>;

    /**
     * Get sibling DOM elements.
     *
     * @see https://on.cypress.io/siblings
     * @example
     *    cy.get('td').siblings('a') // Yield all link siblings of "td"
     */
    siblings<K extends keyof HTMLElementTagNameMap>(
        selector: K,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<HTMLElementTagNameMap[K]>>, PropKeys>;
    /**
     * Get all sibling DOM elements.
     *
     * @see https://on.cypress.io/siblings
     * @example
     *    cy.get('td').siblings() // Yield all siblings of "td"
     */
    siblings<E extends Node = HTMLElement>(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Get all sibling DOM elements that match given selector.
     *
     * @see https://on.cypress.io/siblings
     * @example
     *    // Yield all elements with class "foo" that are siblings of "td"
     *    cy.get('td').siblings('.foo')
     */
    siblings<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;

    /**
     * Returns a new spy function.
     * > Note: `.spy()` assumes you are already familiar with our guide: [Stubs, Spies, and Clocks](https://on.cypress.io/stubs-spies-and-clocks)
     *
     * @see https://on.cypress.io/spy
     * @example
     *    const fn = cy.spy() // returns "dumb" spy function
     *    fn(42)
     *    expect(fn).to.have.been.calledOnce
     *    expect(fn).to.have.always.been.calledWithExactly(42)
     */
    spy(): Cypress.Agent<sinon.SinonSpy>;
    /**
     * Wraps existing function and spies on it, while passing arguments and results.
     * @see https://on.cypress.io/spy
     * @example
     *    const add = (a, b) => a + b
     *    const spy = cy.spy(add)
     *    expect(spy(2, 3)).to.equal(5)
     *    expect(spy).to.have.been.calledWithExactly(2, 3)
     */
    spy(func: (...args: any[]) => any): Cypress.Agent<sinon.SinonSpy>;
    /**
     * Spy on a method.
     * @see https://on.cypress.io/spy
     * @example
     *    // assume App.start calls util.addListeners
     *    cy.spy(util, 'addListeners')
     *    App.start()
     *    expect(util.addListeners).to.be.called
     */
    spy<T>(obj: T, method: keyof T): Cypress.Agent<sinon.SinonSpy>;

    /**
     * Replace a function, record its usage and control its behavior.
     * > Note: `.stub()` assumes you are already familiar with our guide:
     * [Stubs, Spies, and Clocks](https://on.cypress.io/stubs-spies-and-clocks)
     *
     * @see https://on.cypress.io/stub
     * @example
     *    const fn = cy.stub() // stub without any arguments acts like a spy
     *    fn(42)
     *    expect(fn).to.have.been.calledOnce
     *    expect(fn).to.have.always.been.calledWithExactly(42)
     */
    stub(): Cypress.Agent<sinon.SinonStub>;
    /**
     * Stubs all the object’s methods.
     *
     * @see https://on.cypress.io/stub
     * @example
     * const o = {
     *  toString () {
     *    return 'foo'
     *  }
     * }
     * expect(o.toString()).to.equal('foo')
     * cy.stub(o)
     * // because stub does not call original function
     * expect(o.toString()).to.equal(undefined)
     * expect(o.toString).to.have.been.calledOnce
     */
    stub(obj: any): Cypress.Agent<sinon.SinonStub>;
    /**
     * Stubs single method of an object.
     *
     * @see https://on.cypress.io/stub
     * @example
     *    const o = {}
     *    expect(o.toString()).to.equal('[object Object]')
     *    cy.stub(o, 'toString').callsFake(() => 'foo')
     *    expect(o.toString()).to.equal('foo')
     *    expect(o.toString).to.have.been.calledOnce
     */
    stub<T>(obj: T, method: keyof T): Cypress.Agent<sinon.SinonStub>;
    /**
     * Stubs a method on an object
     *
     * @deprecated Use `cy.stub(object, name).callsFake(fn)` instead
     */
    stub<T>(obj: T, method: keyof T, func: (...args: any[]) => any): Cypress.Agent<sinon.SinonStub>;

    /**
     * Submit a form.
     *
     * @see https://on.cypress.io/submit
     */
    submit(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): CypressChainable<PropKeys, Subject>;

    /**
     * Expand an array into multiple arguments.
     * @see https://on.cypress.io/spread
     * @example
     *    cy.getCookies().spread((cookie1, cookie2, cookie3) => {
     *      // each cookie is now an individual argument
     *    })
     */
    spread<S extends object | any[] | string | number | boolean>(
        fn: (...args: any[]) => S,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Expand an array into multiple arguments.
     * @see https://on.cypress.io/spread
     * @example
     *    cy.getCookies().spread((cookie1, cookie2, cookie3) => {
     *      // each cookie is now an individual argument
     *    })
     */
    spread(fn: (...args: any[]) => void): CypressChainable<PropKeys, Subject>;

    /**
     * Run a task in Node via the plugins file.
     *
     * @see https://on.cypress.io/api/task
     */
    task<S = unknown>(
        event: string,
        arg?: any,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;

    /**
     * Enables you to work with the subject yielded from the previous command.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => GenericCypressChainable<PropKeys, S>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => GenericCypressChainable<PropKeys, S>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => PromiseLike<S>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => PromiseLike<S>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends string | number | boolean>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends HTMLElement>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<S>>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends ArrayLike<HTMLElement>>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<S extends ArrayLike<infer T> ? T : never>>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends any[] | object>(
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S): Cypress.ThenReturn<Subject, S>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends HTMLElement>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<S>>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends ArrayLike<HTMLElement>>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<S extends ArrayLike<infer T> ? T : never>>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S extends object | any[] | string | number | boolean>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Enables you to work with the subject yielded from the previous command / promise.
     *
     * @see https://on.cypress.io/then
     */
    then<S>(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => S,
    ): Cypress.ThenReturn<Subject, S>;
    /**
     * Enables you to work with the subject yielded from the previous command.
     *
     * @see https://on.cypress.io/then
     * @example
     *    cy.get('.nav').then(($nav) => {})  // Yields .nav as first arg
     *    cy.location().then((loc) => {})   // Yields location object as first arg
     */
    then(fn: (this: Cypress.ObjectLike, currentSubject: Subject) => void): CypressChainable<PropKeys, Subject>;
    /**
     * Enables you to work with the subject yielded from the previous command.
     *
     * @see https://on.cypress.io/then
     * @example
     *    cy.get('.nav').then(($nav) => {})  // Yields .nav as first arg
     *    cy.location().then((loc) => {})   // Yields location object as first arg
     */
    then(
        options: Partial<Cypress.Timeoutable>,
        fn: (this: Cypress.ObjectLike, currentSubject: Subject) => void,
    ): CypressChainable<PropKeys, Subject>;

    /**
     * Move time after overriding a native time function with [cy.clock()](https://on.cypress.io/clock).
     * `cy.clock()` must be called before `cy.tick()`
     *
     * @see https://on.cypress.io/clock
     * @example
     *  cy.clock()
     *  ...
     *  // advance time by 10 minutes
     *  cy.tick(600*1000)
     *  // you can restore the real clock
     *  cy.tick(1000).then(clock => {
     *    clock.restore()
     *  })
     *  // or use this shortcut
     *  cy.tick(5000).invoke('restore')
     */
    tick(
        milliseconds: number,
        options?: Partial<Cypress.Loggable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.Clock>, PropKeys>;

    /**
     * Get the `document.title` property of the page that is currently active.
     *
     * @see https://on.cypress.io/title
     */
    title(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, string>, PropKeys>;

    /**
     * Trigger an event on a DOM element.
     *
     * @see https://on.cypress.io/trigger
     */
    trigger<K extends keyof DocumentEventMap>(
        eventName: K,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike & DocumentEventMap[K]>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Trigger an event on a DOM element.
     *
     * @see https://on.cypress.io/trigger
     */
    trigger<K extends keyof DocumentEventMap>(
        eventName: K,
        position?: Cypress.PositionType,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike & DocumentEventMap[K]>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Trigger an event on a DOM element.
     *
     * @see https://on.cypress.io/trigger
     */
    trigger<K extends keyof DocumentEventMap>(
        eventName: K,
        x: number,
        y: number,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike & DocumentEventMap[K]>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Trigger an event on a DOM element.
     * Custom events... If the following were `.triggerCustom`,
     * `.trigger` strongly typed with event data
     *
     * @see https://on.cypress.io/trigger
     * @example
     *    cy.get('a').trigger('mousedown')
     */
    trigger(
        eventName: string,
        position?: Cypress.PositionType,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Trigger an event on a DOM element.
     * Custom events... If the following were `.triggerCustom`,
     * `.trigger` strongly typed with event data
     *
     * @see https://on.cypress.io/trigger
     * @example
     *    cy.get('a').trigger('mousedown')
     */
    trigger(
        eventName: string,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike>,
    ): CypressChainable<PropKeys, Subject>;
    /**
     * Trigger an event on a DOM element.
     * Custom events... If the following were `.triggerCustom`,
     * `.trigger` strongly typed with event data
     *
     * @see https://on.cypress.io/trigger
     * @example
     *    cy.get('a').trigger('mousedown')
     */
    trigger(
        eventName: string,
        x: number,
        y: number,
        options?: Partial<Cypress.TriggerOptions & Cypress.ObjectLike>,
    ): CypressChainable<PropKeys, Subject>;

    /**
     * Type into a DOM element.
     *
     * @see https://on.cypress.io/type
     * @example
     *    cy.get('input').type('Hello, World')
     *    // type "hello" + press Enter
     *    cy.get('input').type('hello{enter}')
     */
    type(text: string, options?: Partial<Cypress.TypeOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Uncheck checkbox(es).
     *
     * @see https://on.cypress.io/uncheck
     * @example
     *    // Unchecks checkbox element
     *    cy.get('[type="checkbox"]').uncheck()
     *    // Uncheck element with the id ‘saveUserName’
     *    cy.get('#saveUserName').uncheck()
     *    // Uncheck all checkboxes
     *    cy.get(':checkbox').uncheck()
     *    // Uncheck the checkbox with the value of ‘ga’
     *    cy.get('input[type="checkbox"]').uncheck(['ga'])
     */
    uncheck(options?: Partial<Cypress.CheckOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Uncheck specific checkbox.
     *
     * @see https://on.cypress.io/uncheck
     * @example
     *    // Uncheck the checkbox with the value of ‘ga’
     *    cy.get('input[type="checkbox"]').uncheck('ga')
     */
    uncheck(value: string, options?: Partial<Cypress.CheckOptions>): CypressChainable<PropKeys, Subject>;
    /**
     * Uncheck specific checkboxes.
     *
     * @see https://on.cypress.io/uncheck
     * @example
     *    // Uncheck the checkbox with the value of ‘ga’, 'ma'
     *    cy.get('input[type="checkbox"]').uncheck(['ga', 'ma'])
     */
    uncheck(values: string[], options?: Partial<Cypress.CheckOptions>): CypressChainable<PropKeys, Subject>;

    /**
     * Get the current URL of the page that is currently active.
     *
     * @alias cy.location('href')
     * @see https://on.cypress.io/url
     */
    url(options?: Partial<Cypress.UrlOptions>): Pick<GenericCypressChainable<PropKeys, string>, PropKeys>;

    /**
     * Control the size and orientation of the screen for your application.
     *
     * @see https://on.cypress.io/viewport
     * @example
     *    // Set viewport to 550px x 750px
     *    cy.viewport(550, 750)
     *    // Set viewport to 357px x 667px
     *    cy.viewport('iphone-6')
     */
    viewport(
        preset: Cypress.ViewportPreset,
        orientation?: Cypress.ViewportOrientation,
        options?: Partial<Cypress.Loggable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * Set viewport to the given resolution.
     *
     * @see https://on.cypress.io/viewport
     * @example
     *    // Set viewport to 550px x 750px
     *    cy.viewport(550, 750)
     */
    viewport(
        width: number,
        height: number,
        options?: Partial<Cypress.Loggable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * Visit the given url
     *
     * @param {string} url The URL to visit. If relative uses `baseUrl`
     * @param {VisitOptions} [options] Pass in an options object to change the default behavior of `cy.visit()`
     * @see https://on.cypress.io/visit
     * @example
     *    cy.visit('http://localhost:3000')
     *    cy.visit('/somewhere') // opens ${baseUrl}/somewhere
     *    cy.visit({
     *      url: 'http://google.com',
     *      method: 'POST'
     *    })
     *
     */
    visit(
        url: string,
        options?: Partial<Cypress.VisitOptions>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;
    visit(
        options: Partial<Cypress.VisitOptions> & { url: string },
    ): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;

    /**
     * Wait for a number of milliseconds.
     * You almost never need to wait for an arbitrary period of time.
     * There are always better ways to express this in Cypress, see the documentation.
     *
     * @see https://on.cypress.io/wait
     * @param {number} ms - Milliseconds to wait.
     * @example
     *    cy.wait(1000) // wait for 1 second
     */
    wait(ms: number, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): CypressChainable<PropKeys, Subject>;

    /**
     * Get the window object of the page that is currently active.
     *
     * @see https://on.cypress.io/window
     * @example
    ```
    cy.visit('http://localhost:8080/app')
    cy.window().then(function(win){
      // win is the remote window
      // of the page at: http://localhost:8080/app
    })
    ```
     */
    window(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, Cypress.AUTWindow>, PropKeys>;

    /**
     * Scopes all subsequent cy commands to within this element.
     * Useful when working within a particular group of elements such as a `<form>`.
     * @see https://on.cypress.io/within
     * @example
    ```
    cy.get('form').within(($form) => {
      // cy.get() will only search for elements within form,
      // not within the entire document
      cy.get('input[name="username"]').type('john')
      cy.get('input[name="password"]').type('password')
      cy.root().submit()
    })
    ```
     */
    within(fn: (currentSubject: Subject) => void): CypressChainable<PropKeys, Subject>;
    /**
     * Scopes all subsequent cy commands to within this element.
     * Useful when working within a particular group of elements such as a `<form>`.
     * @see https://on.cypress.io/within
     */
    within(
        options: Partial<Cypress.Loggable>,
        fn: (currentSubject: Subject) => void,
    ): CypressChainable<PropKeys, Subject>; // inconsistent argument order

    /**
     * Yield the element passed into `.wrap()`.
     *
     * @see https://on.cypress.io/wrap
     * @example
    ```
    // wraps DOM element
    cy.get('form').within(($form) => {
      // more commands
      cy.wrap($form).should('have.class', 'form-container')
    })
    ```
     */
    wrap<E extends Node = HTMLElement>(
        element: E | JQuery<E>,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, JQuery<E>>, PropKeys>;
    /**
     * Yield the element passed into `.wrap()` to the next command in the Cypress chain.
     *
     * @see https://on.cypress.io/wrap
     * @example
    ```
    cy.wrap(new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    }).then(result => {})
    ```
     */
    wrap<F extends Promise<S>, S>(
        promise: F,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;
    /**
     * Yields whatever is passed into `.wrap()` to the next command in the Cypress chain.
     *
     * @see https://on.cypress.io/wrap
     * @example
    ```
    // Make assertions about object
    cy.wrap({ amount: 10 })
      .should('have.property', 'amount')
      .and('eq', 10)
    ```
     */
    wrap<S>(
        object: S,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, S>, PropKeys>;

    /**
     * Write to a file with the specified contents.
     *
     * @see https://on.cypress.io/writefile
    ```
    cy.writeFile('path/to/message.txt', 'Hello World')
    ```
     */
    writeFile(
        filePath: string,
        contents: Cypress.FileContents,
        encoding: Cypress.Encodings,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * Write to a file with the specified encoding and contents.
     *
     * @see https://on.cypress.io/writefile
    ```
    cy.writeFile('path/to/ascii.txt', 'Hello World', {
      flag: 'a+',
      encoding: 'ascii'
    })
    ```
     */
    writeFile(
        filePath: string,
        contents: Cypress.FileContents,
        options?: Partial<Cypress.WriteFileOptions & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;
    /**
     * Write to a file with the specified encoding and contents.
     *
     * An `encoding` option in `options` will override the `encoding` argument.
     *
     * @see https://on.cypress.io/writefile
    ```
    cy.writeFile('path/to/ascii.txt', 'Hello World', 'utf8', {
      flag: 'a+',
    })
    ```
     */
    writeFile(
        filePath: string,
        contents: Cypress.FileContents,
        encoding: Cypress.Encodings,
        options?: Partial<Cypress.WriteFileOptions & Cypress.Timeoutable>,
    ): Pick<GenericCypressChainable<PropKeys, null>, PropKeys>;

    /**
     * jQuery library bound to the AUT
     *
     * @see https://on.cypress.io/$
     * @example
     *    cy.$$('p')
     */
    $$<TElement extends Element = HTMLElement>(
        selector: JQuery.Selector,
        context?: Element | Document | JQuery,
    ): JQuery<TElement>;
}
