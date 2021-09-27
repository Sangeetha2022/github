LAZY LOADING:

For large applications with lots of routes, consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times.

Lazy loading is a technique in Angular that allows you to load JavaScript components asynchronously when a specific route is activated. It improves the speed of the application load time by splitting the application into several bundles. When the user navigates through the app, the bundles are loaded as required.

This concept was included in our latest geppetto version 2 by using Angular 12.