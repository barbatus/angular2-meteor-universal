# Angular2-Universal-Meteor

Server Side Rendering for Angular2-Meteor based on [Angular2-Universal](https://github.com/angular/universal) and [FlowRouter](https://atmospherejs.com/kadira/flow-router).

## Usage

There are several points to be aware of for the proper usage of this library:

- Installation of `kadira:flow-router-ssr` is a prerequisite;

- Angular2-Universal-Meteor works in this way: at first, a component is rendered on the server
  and then delivered to the client; at that moment Angular 2's bootstrapping kicks in 
  against a hidden copy of the server pre-rendered DOM element; once Angular 2 is done with the client rendering,
  this "live" (i.e., ready for user iteractions) component becomes visible, while server pre-rendered element is removed;

- Angular 2 components that you want to render both on the client and server sides should be placed
  in the 'imports' folder and imported from there (check out a demo app in `examples/app`);

- Routing is based on the FlowRouter package. In order to add routers,
  create a `route.ts` file at the root level of your app and
  start adding URLs of the main Angular2 components you want to be pre-rendered on the server side.
  Use `Router.route` and `Router.group` to add routers and groups of the routes
  as you can see here [route.ts](./examples/app/server/routes.ts).
  Typical usage will be:
  ```ts
    import {Router, bootstrap} from 'angular2-universal-meteor';
    import {Foo} from './imports/path/to/foo';

    Router.route('/foo', {
      action: function() {
        bootstrap(Foo);
      }
    });
  ```

- If your main app component has own Angular 2 routing (i.e., based on `RouteConfig`),
  you'll need to create a FlowRouter's routing group, like [here](./examples/app/server/routes.ts#L7),
  and add paths that you want to pre-render on the server side.
  Please note that you'll need to set `target` attribute of the `a` links to either `_blank` or `_top`
  in order to reload current page with a new component on it, which has been pre-rendered on the server.
  Otherwise, Angular 2 will load components dynamically w/o reloading the page, thus,
  bypassing the server;

- If you want to render some component on the client side only, then you
  need to work with the `client` folder as most of you do regularly by 
  putting there Angular 2 components, and also create `routes.ts` there with routes that are supposed to be client side solely;

- Note that sometimes it makes sense to keep only basic components in the `imports` folder,
  extending them on the client (server) with some specific only to the client functionality.
  Doing so will let you to avoid unexpected errors and compiler cursing, since every component put in `imports` should use API available on the both sides. Please, check how it's done in the Socially [part](./examples/app/client/parties) of the demo app.

- `Router.route` and `Router.group` are only wrappers over analogous methods of  `FlowRouter`, 
  so they take same parameters as original methods. If want to use other methods of the `FlowRouter`'s API ,
  do it in the same way as described in the `FlowRouter` [docs](https://github.com/kadirahq/flow-router);

- Having the ability to define different routes for different Angular 2 components and pre-render
  them on the server side, allows us to have multiple Angular 2 apps in one Meteor app structure.
  Please, check out a demo app in `example/app` folder that have two Angular 2 - *Socially* and *TODO* - components,
  which are loaded separately at different - `/parties` and `/todo` - routes accordingly.

- `bootstrap` method takes in bootstrapping options as the third parameter.
  Check out all available options for the client and server as interfaces [here](./modules/bootstrap.ts#L28).
  Default values of the options, you can find [here](./modules/bootstrap_client.ts#L12) and [here](./modules/bootstrap_server.ts#L14).
  Some options that are worth mentioning:
    - `debug` - setting it to true will log out to the terminal a lot of useful,
      especially for the server, information such as time it takes to render a page
      or size that page has;
    - `renderLimitMs` - sets page render time limit.
      If some page's component takes more time to render than this limit,
      server will stop awaiting this component to be stable and serialize it to the client as is.
      At this point you'll see a message like `[page_path]: page is not stable after renderLimitMs`.
      *Please note that if you see this message too often for some particular page,
      you'll probably need to optimize it or increase the rendering limit time*.
    - `pageSizeLimitKb` - sets page size limit.
      If some page exceeds this limit you'll see a warning.

- `Angular2-Universal` uses [`Preboot`](https://github.com/angular/universal/tree/master/modules/preboot) library to determine how server   pre-rendered content will iteract with the user when Angular 2 component is still being bootstrapped.
  For example, it can record all actions user makes on the content then replay them on the "live" components when they are ready.
  There are several options available to configure this behaviour. Please, check out [`Preboot`](https://github.com/angular/universal/tree/master/modules/preboot) lib for more info, and use `preboot` option [here](./modules/bootstrap.ts#L11) to pass them to the `bootstrap` method. [Here](./modules/bootstrap_server.ts#L18) is default values.

## Demo

Demo from `examples/app` is deployed at https://ng2-ssr.herokuapp.com. Check out Socially and TODO links at
https://ng2-ssr.herokuapp.com/todo and https://ng2-ssr.herokuapp.com/parties.

Deployed repo - https://github.com/barbatus/ng2-ssr-demo.
