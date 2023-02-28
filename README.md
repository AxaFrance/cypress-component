# Cypress components

[![Twitter](https://img.shields.io/twitter/follow/GuildDEvOpen?style=social)](https://twitter.com/intent/follow?screen_name=GuildDEvOpen)

Ce package a pour but de faciliter la lecture et l'écriture de tests Cypress. Il améliore l'accessibilité des éléments du DOM via une approche par composants, comme les frameworks web actuel. Il facilite également la gestion des routes que ce soit dans un environnement bouchonné ou non.

## Install

`npm i @axa-fr/cypress-component`

## Documentation

### Browser

L'objet `Browser` vous permet d'éxécuter n'importe quel action sur le navigateur. Il encapsule les actions Cypress suivantes:

-   [clearCookie](https://docs.cypress.io/api/commands/clearCookie)
-   [clearCookies](https://docs.cypress.io/api/commands/clearCookies)
-   [clearLocalStorage](https://docs.cypress.io/api/commands/clearLocalStorage)
-   [reload](https://docs.cypress.io/api/commands/reload)
-   [screenshot](https://docs.cypress.io/api/commands/screenshot)
-   [scrollTo](https://docs.cypress.io/api/commands/scrollTo)
-   [session](https://docs.cypress.io/api/commands/session)
-   [setCookie](https://docs.cypress.io/api/commands/setCookie)
-   [should](https://docs.cypress.io/api/commands/should)
-   [title](https://docs.cypress.io/api/commands/title)
-   [then](https://docs.cypress.io/api/commands/then)
-   [url](https://docs.cypress.io/api/commands/url)
-   [viewport](https://docs.cypress.io/api/commands/viewport)
-   [visit](https://docs.cypress.io/api/commands/visit)

#### Exemple

```ts
import { Browser } from '@axa-fr/cypress-component';

describe('Test scenario', () => {
    beforeEach(() => {
        Browser.visit('https://example.com');
    });
    it('should...', () => {
        ...
    });
});

```

### RouteHandler

Le `RouteHandler` est un object qui vous permet de facilement gérer vos routes. Les routes sont très importantes dans Cypress car elles vont vous permettre de pouvoir synchroniser l'exécution de votre test en attendant les requêtes HTTP envoyées dépuis votre application. Vous pouvez également mocker ces appels pour tester tous les comportements possible de votre application. Par exemple, simuler qu'un service tombe en erreur.

Il contient les méthode suivantes:

-   configure(routesDefinition: RoutesDefinition): vous permet de configurer l'ensemble de vos routes
-   register(routeAlias: string, route: Route): configure une seule route et l'associe à un alias
-   wait(...routesToWait: string[]): attend qu'une ou plusieurs requête(s) s'éxécutent
-   stub(
    routeAlias: string,
    stub: string | object,
    httpStatus?: number,
    responseDelay?: number,
    headers?: object,
    ): mock une route. Vous avez la possibilité de mocker le body, le statut HTTP, les headers et rajouter du délai de réponse.
-   stubDefault(): mock chaque route configurée via `configure` avec son mock par défaut (c.f. exemple ci-dessous)
-   stubRestore(routeAlias: string): permet d'envlever le mock d'une route pour qu'elle retrouve son comportement inital

#### Exemple

Pour décalrer l'ensemble de vos routes, je vous conseille de créer un fichier spécifique. Par exemples `routes-definition.ts`. Vous aller ensuite définir une constante pour identifier chacune de vos routes. Cette constante servira d'alias pour la route. Ensuite pour chaque route, vous allez lier la constante avec une definition de route. Cette définition de route est défine à travers différents paramètres:

-   httpMehod: le verbe HTTP de la requêtes
-   urlPattern: le pattern de l'url. vous pouvez remplacer les arguments par `*` ou tout un morceau d'url avec `**`
-   defaultStub: définit le mock par défaut de la route. Un mock se définit via un body, un statut HTTP, des headers et un éventuel délai de réponse

```ts
// routes-definition.ts

import { HttpMethod, RoutesDefinition } from '@axa-fr/cypress-component';

export const Routes = {
    loadContract: 'LOAD_CONTRACT_ROUTE',
    // ...
};

export const MyRoutesDefinition: RoutesDefinition = {
    [Routes.loadContract]: {
        httpMethod: HttpMethod.POST,
        urlPattern: '**/api/contract/*',
        defaultStub: {
            body: {
                // CONTRACT
            },
        },
    },
    // ...
};
```

Vous pouvez maintenant facilement gérer vos routes dans vos tests. Dans le cas ci-dessous, je configure mes routes (`RouteHandler.configure(MyRoutesDefinition)` RouteDefinition est l'objet qu'on a définit ci-dessus) et je souhaite que toutes les routes soient mockées (`RouteHandler.stubDefault()`). Je visite ensuite une url et j'attend que la requête qui charge mon contrat soit bien éxécutée avant de commencer l'éxécution de mon test.

```ts
import { Browser, RouteHandler } from '@axa-fr/cypress-component';
import { MyRoutesDefinition, Routes } from '../../routes-definition';

describe('Test scenario', () => {
    beforeEach(() => {
        RouteHandler.configure(MyRoutesDefinition);
        RouteHandler.stubDefault();

        Browser.visit('https://example.com');

        RouteHandler.wait(Routes.loadContract);
    });
    it('should...', () => {
        // Votre test ici
    });
});
```

### Composants

Les composants sont le coeurs de ce package. Il vous permet de définir les composants dont vous avez besoin pour l'éxécution de vos tests dans un fichier externe pour les partager entre vos différents scénarios. Vous allez pouvoir typer ces composants pour ne pas pouvoir exécuter de commandes innapropriées. A l'heure actuel, il existe différents type de composants que vous pouvez utiliser:

-   HtmlElement: Le composant de base
-   Input(TextInput, Checkbox, Radio, Select, Button, Link): les inputs ont la possibilté de `focus` ou `blur`. Ils possèdent aussi une fonctione `set` qui permet de mettre une valeur dans l'input en éxécutant par examples les actions suivantes: `focus` > `type|check|select|click` > `blur`. Le contenu d'un input text est toujours remplacé.
-   FormField(TextField, SelectField, CheckboxField, RadioField): les champs de formulaire vont encapsuler les inputs associées. Et vont exposer les commandes de l'input pour facilement pouvoir gérer les champs de formulaire. Ils permettent aussi d'attendre une ou plusieurs routes après qu'un appel à `set` soit effectué.

Pour délcarer un composant, vous avez différentes possibilités:

-   Via un CSS selector:

```ts
export const HomePage = {
    footer: HtmlElement('#footer'),
    // ...
};
```

-   Via un contains:

```ts
export const HomePage = {
    footer: HtmlElement({ contains: 'Pied de page' }),
    // ...
};
```

-   Via un CSS selector et un contains (et même un index):

```ts
export const HomePage = {
    footer: HtmlElement({ selector: '.container', contains: 'Pied de page', index: 0 }),
    // ...
};
```

-   Via un enchainement de ces proriétés:

```ts
export const HomePage = {
    footer: HtmlElement([
        { selector: 'html' },
        { selector: 'body' },
        { selector: '.container', contains: 'Pied de page', index: 0 },
    ]),
    // ...
};
```

Pour les champs de formulaires, vous quelques exemples:

-   TextField avec un CSS selector contenant un texte donné.

```ts
import { Button, TextField } from '@axa-fr/cypress-component';

export const LoginPage = {
    username: TextField({ selector: '.form-field', contains: 'Username' }),
    password: TextField({ selector: '.form-field', contains: 'Password' }),
    loginButton: Button({ selector: '.submit', contains: 'Login' }),
    successMessage: HtmlElement('.success'),
    // ...
};
```

```ts
import { Browser, RouteHandler } from '@axa-fr/cypress-component';
import { MyRoutesDefinition, Routes } from '../../routes-definition';
import { HomePage } from '../../components';

describe('Test scenario', () => {
    beforeEach(() => {
        RouteHandler.configure(RouteDefinitions);

        Browser.visit('https://example.com');
    });
    it('should show success message when logged in', () => {
        LoginPage.username.set('my-username');
        LoginPage.password.set('********');
        LoginPage.loginButton.click();

        RouteHandler.wait(Routes.login);

        LoginPage.successMessage.should((successMessage) => {
            expect(successMessage).to.be.visible;
            expect(successMessage).to.contain('Vous êtes connecté');
        });
    });
});
```

-   RadioField avec un type de valeur passé comme type générique

> Cela fontionne de la même manière pour les SelectField et les CheckboxField

```ts
import { Button, TextField } from '@axa-fr/cypress-component';

export enum CountriesEnum = {
    France,
    Other
}

export type CountriesType = "France" | "Other";

export const SettingsPage = {
    // Here we use an enum
    country: RadioField<CountriesEnum>({ selector: '.form-field', contains: 'Country' }),
    // But you can also use a type
    country2: RadioField<CountriesType>({ selector: '.form-field', contains: 'Country' }),
    CGU: Checkbox({ selector: '#CGU-checkbox' }),
    updateButton: Button({ selector: '.submit', contains: 'Update' }),
    // ...
};
```

```ts
import { Browser, RouteHandler } from '@axa-fr/cypress-component';
import { MyRoutesDefinition, Routes } from '../../routes-definition';
import { Countries, SettingsPage } from '../../components';

describe('Test scenario', () => {
    beforeEach(() => {
        RouteHandler.configure(RouteDefinitions);

        Browser.visit('https://example.com/settings');
    });
    it('should update settings', () => {
        RouteHandler.wait(Routes.GETsettings);

        SettingsPage.country.set(Countries.France);
        SettingsPage.country2.set('France');

        SettingsPage.CGU.check();
        SettingsPage.updateButton.click();

        RouteHandler.wait(Routes.PUTsettings);
    });
});
```

-   bindComponents: pour créer une hierarchie au seins de vos composants

`bindComponents` est un fonctione qui vous permet de lier un composant parent avec des enfants.

```ts
import { Button, TextField } from '@axa-fr/cypress-component';

export const SettingsPage = bindComponents(HtmlElement('#settings', {
    country: RadioField<"France" | "Other">({ selector: '.form-field', contains: 'Country' }),
    CGU: Checkbox({ selector: '#CGU-checkbox' }),
    updateButton: Button({ selector: '.submit', contains: 'Update' }),
    // ...
});
```

```ts
import { Browser, RouteHandler } from '@axa-fr/cypress-component';
import { MyRoutesDefinition, Routes } from '../../routes-definition';
import { Countries, SettingsPage } from '../../components';

describe('Test scenario', () => {
    beforeEach(() => {
        RouteHandler.configure(RouteDefinitions);

        Browser.visit('https://example.com/settings');
    });
    it('should update settings', () => {
        RouteHandler.wait(Routes.GETsettings);

        SettingsPage.should((page) => expect(page).to.be.visible);

        SettingsPage.CGU.check();
        SettingsPage.updateButton.click();

        RouteHandler.wait(Routes.PUTsettings);
    });
});
```
