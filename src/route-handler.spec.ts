import { StaticResponse } from 'cypress/types/net-stubbing';
import { HttpMethod, Route, RouteHandlerImpl, RoutesDefinition } from './route-handler';

type RouteHandlerImplExtention = {
    definedRoutes?: RoutesDefinition;
    registeredRoute?: RoutesDefinition;
    getRoute?: (routeAlias: string) => Route;
    correlationIdByRoute: { [key: string]: string };
};

describe('RouteHandler', () => {
    let routeHandler: RouteHandlerImpl;
    const route: Route = {
        urlPattern: '**/api/route',
        httpMethod: HttpMethod.POST,
    };
    beforeEach(() => {
        routeHandler = new RouteHandlerImpl();
    });
    afterEach(() => jest.clearAllMocks());
    describe('configure', () => {
        const routesDefinition: RoutesDefinition = {
            ['Routes1']: {
                urlPattern: '**/api/route1',
            },
            ['Routes2']: {
                urlPattern: '**/api/route2',
            },
        };
        beforeEach(() => {
            routeHandler.register = jest.fn();
        });
        const Act = () => routeHandler.configure(routesDefinition);
        it('should set definedRoutes with routesDefinition values', () => {
            Act();

            expect((routeHandler as unknown as RouteHandlerImplExtention).definedRoutes).toStrictEqual(
                routesDefinition,
            );
        });
        it('should register all routes from routesDefinition', () => {
            Act();

            expect(routeHandler.register).toHaveBeenCalledTimes(2);
            expect(routeHandler.register).toHaveBeenCalledWith('Routes1', routesDefinition['Routes1']);
            expect(routeHandler.register).toHaveBeenLastCalledWith('Routes2', routesDefinition['Routes2']);
        });
    });
    describe('getCorrelationId', () => {
        const Act = () => routeHandler.getCorrelationId('MyRoute');
        it('should add route to registeredRoute', () => {
            (routeHandler as unknown as RouteHandlerImplExtention).correlationIdByRoute = {
                MyRoute: 'correlationId-12',
            };

            const result = Act();

            expect(result).toBe('correlationId-12');
        });
    });
    describe('register', () => {
        const routeAlias = 'alias';
        const Act = () => routeHandler.register(`@${routeAlias}`, route);
        it('should add route to registeredRoute', () => {
            Act();

            expect((routeHandler as unknown as RouteHandlerImplExtention).registeredRoute[routeAlias]).toBe(route);
        });
        it('should call intercapt with httpMethod, urlPattern and an undefined body', () => {
            Act();

            expect(cy.intercept).toHaveBeenCalledWith(route.httpMethod, route.urlPattern, undefined);
        });
        it('should set an alias to the route', () => {
            Act();

            expect(cy.intercept(route.httpMethod, route.urlPattern, undefined).as).toHaveBeenCalledWith(routeAlias);
        });
    });
    describe('wait', () => {
        beforeEach(() => {
            (routeHandler as unknown as RouteHandlerImplExtention).definedRoutes = {
                ['route1']: {
                    urlPattern: '**/api/route1',
                },
                ['route2']: {
                    urlPattern: '**/api/route2',
                },
            };
        });
        it('should call cy.wait with route aliases', () => {
            routeHandler.wait('route1', 'route2');

            expect(cy.wait).toHaveBeenCalledTimes(2);
            expect(cy.wait).toHaveBeenCalledWith('@route1', expect.any(Object));
            expect(cy.wait).toHaveBeenLastCalledWith('@route2', expect.any(Object));
        });
        it('should call cy.wait with route aliases and with afterResponseDelay', () => {
            (routeHandler as unknown as RouteHandlerImplExtention).definedRoutes['route1'].afterResponseDelay = 1212;

            routeHandler.wait('route1', 'route2');

            expect(cy.wait).toHaveBeenCalledTimes(3);
            expect(cy.wait).toHaveBeenCalledWith('@route1', expect.any(Object));
            expect(cy.wait).toHaveBeenCalledWith(1212);
            expect(cy.wait).toHaveBeenLastCalledWith('@route2', expect.any(Object));
        });
        it.each`
            routeAlias
            ${''}
            ${null}
            ${undefined}
        `('should throw an error when route alias is ', ({ routeAlias }) => {
            expect.assertions(1);
            try {
                routeHandler.wait(routeAlias);
            } catch (error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });
    describe('stub', () => {
        beforeEach(
            () => ((routeHandler as unknown as RouteHandlerImplExtention).getRoute = jest.fn().mockReturnValue(route)),
        );
        it('should call intercept with HttpMethod, UrlPattern and staticResponse body', () => {
            const expectedStaticResponse: StaticResponse = {
                statusCode: 200,
                headers: {
                    'correlation-id': 'correlationId-1',
                },
                delayMs: 0,
                body: 'myStub',
            };
            routeHandler.stub('@route1', 'myStub');

            expect(cy.intercept).toHaveBeenCalledWith(route.httpMethod, route.urlPattern, expectedStaticResponse);
        });
        it('should call intercept with HttpMethod, UrlPattern and staticResponse fixture', () => {
            const expectedStaticResponse: StaticResponse = {
                statusCode: 500,
                headers: {
                    'correlation-id': 'correlationId-2',
                    Auhorize: 'Bearer 42',
                },
                delayMs: 42,
                fixture: 'myFixture',
            };
            routeHandler.stub('@route1', 'fixture:myFixture', 500, 42, { Auhorize: 'Bearer 42' });

            expect(cy.intercept).toHaveBeenCalledWith(route.httpMethod, route.urlPattern, expectedStaticResponse);
        });
        it('should set an alias to the route', () => {
            routeHandler.stub('@route1', 'fixture:myFixture', 400, 12, { Auhorize: 'Bearer 12' });

            expect(cy.intercept(route.httpMethod, route.urlPattern, undefined).as).toHaveBeenCalledWith('@route1');
        });
    });
    describe('stubDefault', () => {
        beforeEach(() => {
            (routeHandler as unknown as RouteHandlerImplExtention).registeredRoute = {
                ['route1']: {
                    urlPattern: '**/api/route1',
                    defaultStub: {
                        body: 'response',
                    },
                },
                ['route2']: {
                    urlPattern: '**/api/route2',
                },
                ['route3']: {
                    urlPattern: '**/api/route3',
                    defaultStub: {
                        body: 'response2',
                        httpStatus: 403,
                    },
                },
            };
            routeHandler.stub = jest.fn();
        });
        it('should call stub function', () => {
            routeHandler.stubDefault();

            expect(routeHandler.stub).toHaveBeenCalledTimes(2);
            expect(routeHandler.stub).toHaveBeenCalledWith('route1', 'response', undefined);
            expect(routeHandler.stub).toHaveBeenLastCalledWith('route3', 'response2', 403);
        });
    });
    describe('stubRestore', () => {
        beforeEach(
            () => ((routeHandler as unknown as RouteHandlerImplExtention).getRoute = jest.fn().mockReturnValue(route)),
        );
        it('should call intercept with HttpMethod, UrlPattern', () => {
            routeHandler.stubRestore('@route1');

            expect(cy.intercept).toHaveBeenCalledWith(route.httpMethod, route.urlPattern, undefined);
        });
        it('should set an alias to the route', () => {
            routeHandler.stubRestore('@route1');

            expect(cy.intercept(route.httpMethod, route.urlPattern, undefined).as).toHaveBeenCalledWith('@route1');
        });
    });
    describe('shouldHaveBeenCalled', () => {
        beforeEach(
            () => ((routeHandler as unknown as RouteHandlerImplExtention).getRoute = jest.fn().mockReturnValue(route)),
        );
        it('should call shouldBeCalled with routeAlias and 1', () => {
            routeHandler.shouldHaveBeenCalled('@route1');

            // @ts-ignore
            expect(cy.shouldBeCalled).toHaveBeenCalledWith('@route1', 1);
        });
        it('should call shouldBeCalled with routeAlias and 5', () => {
            routeHandler.shouldHaveBeenCalled('@route1', 5);

            // @ts-ignore
            expect(cy.shouldBeCalled).toHaveBeenCalledWith('@route1', 5);
        });
    });
    describe('getRoute', () => {
        const route2 = {
            urlPattern: '**/api/route2',
        };
        beforeEach(() => {
            (routeHandler as unknown as RouteHandlerImplExtention).registeredRoute = {
                ['route1']: {
                    urlPattern: '**/api/route1',
                    defaultStub: {
                        body: 'response',
                    },
                },
                ['route2']: route2,
                ['route3']: {
                    urlPattern: '**/api/route3',
                    defaultStub: {
                        body: 'response2',
                        httpStatus: 403,
                    },
                },
            };
        });
        it('should return the related route', () => {
            const result = (routeHandler as unknown as RouteHandlerImplExtention).getRoute('@route2');

            expect(result).toBe(route2 as Route);
        });
        it('should throw an error', () => {
            expect.assertions(1);
            try {
                (routeHandler as unknown as RouteHandlerImplExtention).getRoute('@route12');
            } catch (error) {
                expect(error.message).toBe('The route route12 has not been registered');
            }
        });
    });
});
