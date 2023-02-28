export type HtmlElementIdentification = {
    selector?: string;
    contains?: string | RegExp;
    index?: number;
};

export type HtmlElementIdentificationArgs = string | HtmlElementIdentification | Array<HtmlElementIdentification>;
