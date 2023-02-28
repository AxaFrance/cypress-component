import { HtmlElementIdentification } from './html-element-identification.types';

export const isHtmlElementIdentification = (value: object): value is HtmlElementIdentification => {
    if (!value) {
        return false;
    }
    return 'selector' in value || 'contains' in value || 'index' in value;
};
