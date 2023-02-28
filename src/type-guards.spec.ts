import { isHtmlElementIdentification } from './type-guards';

describe('isHtmlElementIdentification', () => {
    it.each`
        value               | expected
        ${{}}               | ${false}
        ${undefined}        | ${false}
        ${{ index: '' }}    | ${true}
        ${{ selector: '' }} | ${true}
        ${{ contains: '' }} | ${true}
    `('should return $expected when value is $value', ({ value, expected }) => {
        const result = isHtmlElementIdentification(value);

        expect(result).toEqual(expected);
    });
});
