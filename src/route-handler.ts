import { Interception, StaticResponse } from 'cypress/types/net-stubbing';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}
export type Route = {
    urlPattern: string | RegExp;
    httpMethod?: HttpMethod;
    defaultStub?: Stub;
    afterResponseDelay?: number;
};

export type RoutesDefinition = {
    [alias: string]: Route;
};

export type Stub = {
    body: StubBody;
    httpStatus?: number;
    headers?: object;
    responseDelay?: number;
};

export type StubBody = string | object;

export type StubsDefinition = {
    [alias: string]: Stub;
};

let correlationIdCounter = 1;

export class RouteHandlerImpl {
    private readonly definedRoutes: RoutesDefinition = {};
    private registeredRoute: RoutesDefinition = {};
    private readonly correlationIdByRoute: { [key: string]: string } = {};

    /**
     * Configure the routes
     * @param routesDefinition
     */
    public configure(routesDefinition: RoutesDefinition) {
        Object.keys(routesDefinition).forEach((routeAlias) => {
            this.definedRoutes[routeAlias] = { ...routesDefinition[routeAlias] };
            this.register(routeAlias, {
                ...routesDefinition[routeAlias],
            });
        });
    }

    /**
     * Get the correlationId for the supplied route
     * @param routeAlias
     * @returns
     */
    public getCorrelationId(routeAlias: string) {
        return this.correlationIdByRoute[routeAlias];
    }

    /**
     * Register a route with an alias
     * @param routeAlias
     * @param route
     */
    public register(routeAlias: string, route: Route) {
        routeAlias = routeAlias.replace('@', '');
        this.registeredRoute[routeAlias] = route;
        cy.intercept(route.httpMethod, route.urlPattern, undefined).as(routeAlias);
    }

    /**
     * Wait for one or many requests
     * @see https://on.cypress.io/wait
     * @param routesToWait - The routes to wait
     */
    public wait(...routesToWait: string[]) {
        let result: Cypress.Chainable<Interception>;
        routesToWait.forEach((routeAlias) => {
            routeAlias = routeAlias?.replace('@', '');
            if (!routeAlias) {
                throw new Error('A route alias cannot be null§undefined or empty');
            }
            const route = this.definedRoutes[routeAlias];
            result = cy.wait(`@${routeAlias}`, { requestTimeout: 15000 });
            if (route.afterResponseDelay) {
                cy.wait(route.afterResponseDelay);
            }
        });
        return result;
    }

    /**
     * Stub HTTP responses.
     *
     * @see https://on.cypress.io/intercept
     * @example
     *    RouteHandler.stub('@MyRouteAlias', {
     *      name: 'bob',
     *       age: 67,
     *    });
     */
    public stub(
        routeAlias: string,
        stub: string | object,
        httpStatus?: number,
        responseDelay?: number,
        headers?: object,
    ) {
        this.correlationIdByRoute[routeAlias] = `correlationId-${correlationIdCounter++}`;
        const route = this.getRoute(routeAlias);
        const staticResponse: StaticResponse = {
            statusCode: httpStatus ?? 200,
            headers: {
                'correlation-id': this.correlationIdByRoute[routeAlias],
                ...headers,
            },
            delayMs: responseDelay ?? 0,
        };
        if (typeof stub === 'string' && stub.startsWith('fixture:')) {
            staticResponse.fixture = stub.replace('fixture:', '');
        } else {
            staticResponse.body = stub;
        }
        return cy.intercept(route.httpMethod, route.urlPattern, staticResponse).as(routeAlias);
    }

    /**
     * Stub all routes configured with the default stub
     */
    public stubDefault() {
        Object.keys(this.registeredRoute).forEach((routeAlias) => {
            const route = this.registeredRoute[routeAlias];
            if (!!route.defaultStub) {
                this.stub(routeAlias, route.defaultStub.body, route.defaultStub.httpStatus);
            }
        });
    }

    /**
     * Restore a stubbed route
     */
    public stubRestore(routeAlias: string) {
        const route = this.getRoute(routeAlias);
        return cy.intercept(route.httpMethod, route.urlPattern, undefined).as(routeAlias);
    }

    /**
     * Expect a route to have been called x times
     */
    public shouldHaveBeenCalled(routeAlias: string, timesCalled?: number) {
        this.getRoute(routeAlias);
        // @ts-ignore
        cy.shouldBeCalled(routeAlias, timesCalled ?? 1);
    }

    private getRoute(routeAlias: string) {
        routeAlias = routeAlias.replace('@', '');
        const route = this.registeredRoute[routeAlias];
        if (!route) {
            throw new Error(`The route ${routeAlias} has not been registered`);
        }
        return route;
    }
}

export const RouteHandler = new RouteHandlerImpl();
