import { Browser } from './browser';

describe('Browser', () => {
    it('should call cy.clearCookie with correct args', () => {
        Browser.clearCookie('name', { log: true });
        expect(cy.clearCookie).toHaveBeenCalledWith('name', { log: true });
    });
    it('should call cy.clearCookies with correct args', () => {
        Browser.clearCookies({ log: true });
        expect(cy.clearCookies).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.clearLocalStorage with correct args', () => {
        Browser.clearLocalStorage('name', { log: true });
        expect(cy.clearLocalStorage).toHaveBeenCalledWith('name', { log: true });
    });
    it('should call cy.reload with correct args', () => {
        Browser.reload({ log: true });
        expect(cy.reload).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.screenshot with correct args', () => {
        Browser.screenshot({ log: true });
        expect(cy.screenshot).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.scrollTo with correct args', () => {
        Browser.scrollTo('topLeft', { log: true });
        expect(cy.scrollTo).toHaveBeenCalledWith('topLeft', { log: true });
    });
    it('should call cy.session with correct args', () => {
        Browser.session({ log: true });
        expect(cy.session).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.setCookie with correct args', () => {
        Browser.setCookie('name', 'value', { log: true });
        expect(cy.setCookie).toHaveBeenCalledWith('name', 'value', { log: true });
    });
    it('should call cy.should with correct args', () => {
        const fnArg = jest.fn();
        Browser.should(fnArg);
        expect(cy.should).toHaveBeenCalledWith(fnArg);
    });
    it('should call cy.title with correct args', () => {
        Browser.title({ log: true });
        expect(cy.title).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.then with correct args', () => {
        const fnArg = jest.fn();
        Browser.then(fnArg);
        expect(cy.then).toHaveBeenCalledWith(fnArg);
    });
    it('should call cy.url with correct args', () => {
        Browser.url({ log: true });
        expect(cy.url).toHaveBeenCalledWith({ log: true });
    });
    it('should call cy.viewport with correct args', () => {
        Browser.viewport('ipad-mini', 'landscape', { log: true });
        expect(cy.viewport).toHaveBeenCalledWith('ipad-mini', 'landscape', { log: true });
    });
    it('should call cy.visit with correct args', () => {
        Browser.visit('url', { log: true });
        expect(cy.visit).toHaveBeenCalledWith('url', { log: true });
    });
});
