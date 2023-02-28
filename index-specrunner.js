import { CypressMock } from './mocks/cypress-mock';

Object.defineProperty(global, 'cy', {
    value: new CypressMock(),
});
