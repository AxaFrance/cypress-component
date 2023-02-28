import { CypressChainable } from './cypress-component-chainable';

export type HtmlElementMethods =
    | 'as'
    | 'children'
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
    | 'should'
    | 'siblings'
    | 'spread'
    | 'then';

export type HtmlElementType = CypressChainable<HtmlElementMethods>;
