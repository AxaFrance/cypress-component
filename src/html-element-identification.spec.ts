import * as UtilsModule from './components.utils';
import { get } from './html-element-identification';

describe('get', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should call cy.get and return cy when htmlElementIdenficationArg is string', () => {
        const result = get('selector');

        expect(cy.get).toHaveBeenCalledWith('selector');
        expect(result).toBe(cy);
    });
    it('should return htmlElementIdentificationToCypressChainableElement result when htmlElementIdenficationArg is HtmlElementIdentification', () => {
        const htmlElementIdentificationToCypressChainableElementResult = 'result';
        jest.spyOn(UtilsModule, 'htmlElementIdentificationToCypressChainableElement').mockReturnValue(
            htmlElementIdentificationToCypressChainableElementResult as any,
        );

        const result = get({ contains: 'My Label' });

        expect(result).toBe(htmlElementIdentificationToCypressChainableElementResult);
    });
    it('should reduce htmlElementIdenficationArg by calling htmlElementIdentificationToCypressChainableElement', () => {
        jest.spyOn(UtilsModule, 'htmlElementIdentificationToCypressChainableElement').mockReturnValue(cy);

        const result = get([{ contains: 'My Label' }, { index: 2 }]);

        expect(UtilsModule.htmlElementIdentificationToCypressChainableElement).toHaveBeenNthCalledWith(
            1,
            {
                contains: 'My Label',
            },
            undefined,
        );
        expect(UtilsModule.htmlElementIdentificationToCypressChainableElement).toHaveBeenNthCalledWith(
            2,
            { index: 2 },
            cy,
        );
        expect(result).toBe(cy);
    });
});
