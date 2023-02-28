import {
    bindComponents,
    concatHtmlElementIndentificationArg,
    htmlElementIdentificationToCypressChainableElement,
    isSelectorIdClassOrAttribute,
    waitForRoutes,
} from './components.utils';
import { HtmlElementIdentification } from './html-element-identification';
import { Button } from './input-components';
import { CypressMock } from '../mocks/cypress-mock';
import { RouteHandler } from './route-handler';

describe('isSelectorIdClassOrAttribute', () => {
    it.each`
        selector           | expected
        ${''}              | ${false}
        ${'div'}           | ${false}
        ${'#id'}           | ${true}
        ${'.class'}        | ${true}
        ${'[type=button]'} | ${true}
    `('should', ({ selector, expected }) => {
        const result = isSelectorIdClassOrAttribute(selector);

        expect(result).toBe(expected);
    });
});

describe('concatHtmlElementIndentificationArg', () => {
    it.each`
        initial                                        | extra                                          | expected
        ${'initial'}                                   | ${'extra'}                                     | ${'initial extra'}
        ${'initial'}                                   | ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${[{ selector: 'initial' }, { selector: 'sel' }, { contains: 'cont' }]}
        ${'initial'}                                   | ${{ selector: 'sel', contains: 'cont' }}       | ${[{ selector: 'initial' }, { selector: 'sel', contains: 'cont' }]}
        ${'initial'}                                   | ${{ selector: 'sel', contains: 'cont' }}       | ${[{ selector: 'initial' }, { selector: 'sel', contains: 'cont' }]}
        ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${'extra'}                                     | ${[{ selector: 'sel' }, { contains: 'cont' }, { selector: 'extra' }]}
        ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${[{ selector: 'sel' }, { contains: 'cont' }, { selector: 'sel' }, { contains: 'cont' }]}
        ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${{ selector: 'sel', contains: 'cont' }}       | ${[{ selector: 'sel' }, { contains: 'cont' }, { selector: 'sel', contains: 'cont' }]}
        ${{ selector: 'sel', contains: 'cont' }}       | ${'extra'}                                     | ${[{ selector: 'sel', contains: 'cont' }, { selector: 'extra' }]}
        ${{ selector: 'sel', contains: 'cont' }}       | ${[{ selector: 'sel' }, { contains: 'cont' }]} | ${[{ selector: 'sel', contains: 'cont' }, { selector: 'sel' }, { contains: 'cont' }]}
        ${{ selector: 'sel', contains: 'cont' }}       | ${{ selector: 'sel', contains: 'cont' }}       | ${[{ selector: 'sel', contains: 'cont' }, { selector: 'sel', contains: 'cont' }]}
    `('should return $expected when initial is $initial and extra is $extra', ({ initial, extra, expected }) => {
        const result = concatHtmlElementIndentificationArg(initial, extra);

        expect(result).toEqual(expected);
    });
});

describe('htmlElementIdentificationToCypressChainableElement', () => {
    let htmlElementIdentification: HtmlElementIdentification;
    let orignalCypressElement: CypressMock;
    beforeEach(() => {
        htmlElementIdentification = {};
        orignalCypressElement = new CypressMock();
    });
    const Act = () =>
        htmlElementIdentificationToCypressChainableElement(htmlElementIdentification, orignalCypressElement as any);
    it('should call get, contains and eq with correct args when contains is supplied', () => {
        htmlElementIdentification = { contains: 'cont', selector: 'sel' };

        const result = Act();

        expect(result.contains).toHaveBeenCalledWith('sel', 'cont');
        expect(result.find).not.toHaveBeenCalled();
        expect(result.eq).not.toHaveBeenCalled();
    });
    it('should call get, contains and eq with correct args when selector is supplied', () => {
        htmlElementIdentification = { selector: 'sel' };

        const result = Act();

        expect(result.contains).not.toHaveBeenCalled();
        expect(result.find).toHaveBeenCalledWith('sel');
        expect(result.eq).not.toHaveBeenCalled();
    });
    it('should neither call get nor contains but eq with correct args when index is supplied', () => {
        htmlElementIdentification = { index: 2 };

        const result = Act();

        expect(result.contains).not.toHaveBeenCalled();
        expect(result.find).not.toHaveBeenCalled();
        expect(result.eq).toHaveBeenCalledWith(2);
    });
    it('should call get, contains and eq with correct args when contains and index are supplied', () => {
        htmlElementIdentification = { contains: 'cont', index: 2 };

        const result = Act();

        expect(result.contains).toHaveBeenCalledWith(undefined, 'cont');
        expect(result.find).not.toHaveBeenCalled();
        expect(result.eq).toHaveBeenCalledWith(2);
    });
    it('should call get, contains and eq with correct args when selector and index are supplied', () => {
        htmlElementIdentification = { selector: 'sel', index: 2 };

        const result = Act();

        expect(result.contains).not.toHaveBeenCalled();
        expect(result.find).toHaveBeenCalledWith('sel');
        expect(result.eq).toHaveBeenCalledWith(2);
    });
    it('should call get, contains and eq with correct args when nothing is supplied', () => {
        htmlElementIdentification = {};

        const result = Act();

        expect(result.contains).not.toHaveBeenCalled();
        expect(result.find).not.toHaveBeenCalled();
        expect(result.eq).not.toHaveBeenCalled();
    });
    it('should return html element if none was supplied', () => {
        htmlElementIdentification = { selector: 'selector' };
        orignalCypressElement = undefined;

        const result = Act();

        expect(result.get).toHaveBeenCalledWith('selector');
    });
});

describe('waitForRoutes', () => {
    beforeAll(() => {
        jest.spyOn(RouteHandler, 'wait').mockImplementation();
    });
    it('should not call RouteHandler.wait when routesToWait is empty', () => {
        waitForRoutes(...[]);

        expect(RouteHandler.wait).not.toHaveBeenCalled();
    });
    it('should not call RouteHandler.wait when no route is provided', () => {
        waitForRoutes();

        expect(RouteHandler.wait).not.toHaveBeenCalled();
    });
    it('should call RouteHandler.wait with "route1, "route2" when routesToWait are "route1, "route2"', () => {
        waitForRoutes('route1', 'route2');

        expect(RouteHandler.wait).toHaveBeenCalledWith('route1', 'route2');
    });
});

describe('bindComponents', () => {
    const selector = 'selector';
    const subComponent = {
        sub: 'subComponent',
    };
    it('should return an HtmlElement bound to the sub object', () => {
        const result = bindComponents(selector, subComponent);

        expect(result.sub).toEqual('subComponent');
        expect(result.contains).toBeDefined();
    });
    it('should return an Element bound to the sub object', () => {
        const result = bindComponents(Button(selector), subComponent);

        expect(result.sub).toEqual('subComponent');
        expect(result.blur).toBeDefined();
    });
});
