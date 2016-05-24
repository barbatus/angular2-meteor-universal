# Angular2-Universal-Meteor

Porting of Angular2-Universal for Angular2-Meteor based on FlowRouter.

## Usage

There are several points to consider before using this library:

- These two Atmosphere packages are a prerequisite:
  `angular2-runtime` and `kadira:flow-router-ssr`.

- Angular 2 components - you want to render both on the client and server parts - should be placed
  in the 'imports' folder and imported from there;

- Routing is based on the FlowRouter package. In order to add routers, 
  create a `route.ts` file at the root level of your app and
  add URL of the main Angular2 component to render it both on the client and server.
  Use `Router.route` and `Router.group` to add routers and groups of the routes
  as you can check out here [route.ts](./examples/app/route.ts).

- If your main app component has own Angular 2 routing (like you can see in the Socially app),
  you'll need to create a FlowRouter's routing group, like [here](),
  and add paths you want to render on the both sides.
  Please note that you'll need to set `target` property of HTML links to either `_blank` or `_top`
  in order to reload current page with a new component rendered on the server side.
  Otherwise, Angular 2 will load components dynamically w/o reloading the page, thus,
  bypassing server rendering.

- If you want to render some component on the client side only, then you
  need to work with the `client` folder as most do regularly by 
  putting there Angular 2 components, and also defining client routes for the components
  to be rendered on the client only.

- `Router.route` and `Router.group` are only wrappers over the same `FlowRouter` methods, 
  so take same parameters as original methods. If want to use other `FlowRouter`'s API methods,
  do it in the same way as described in the `FlowRouter` docs.

- Having ability to define different routes for different Angular 2 components and pre-render
  them on the server side, allows us to have multiple Angular 2 apps in one Meteor app structure.
  Please check out a demo app in `example/app` folder that have Angular 2 Socially and ToDo components
  that you can load them separately at `/parties` and `/todo` routes accordingly.

