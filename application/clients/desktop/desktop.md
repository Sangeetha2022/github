# GeppettoBuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Login funtionality

For Login we have used ORY/Hydra which is open source third party which is widely used for OAuth 2.0. When using ORY/Hydra it helps us on giving the Authorization token ans Authentication token. In here we have used for this ORY/Hydra for OpenId Connect and OAuth2.0.

For this we need to have docker installed in your system.

After you have installed docker you should give the below commands.

To start the ORY/hydra server

docker run -it --rm --name Gep-login -p 4444:4444 -p 4445:4445 \
    -e OAUTH2_SHARE_ERROR_DEBUG=1 \
    -e LOG_LEVEL=debug \
    -e OAUTH2_CONSENT_URL=http://localhost:4200/consent \
    -e OAUTH2_LOGIN_URL=http://localhost:4200/login \
    -e OAUTH2_ISSUER_URL=http://localhost:4444 \
    -e DATABASE_URL=memory \
    -e CORS_ALLOWED_ORIGINS=* \
    oryd/hydra:v1.0.0-beta.9 serve all --dangerous-force-http


Create client in ORY/hydra 

docker run --link Gep-login:hydra oryd/hydra:v1.0.0-beta.9 clients create \
    --endpoint http://hydra:4445 \
    --id test-client \
    --secret test-secret \
    --response-types code,id_token \
    --grant-types refresh_token,authorization_code \
    --scope openid,offline \
    --callbacks http://127.0.0.1:4200/callback


To run the node login service HYDRA_ADMIN_URL=http://localhost:4445 npm run dev

ORY/hydra Token user

docker run -p 4446:4446 --link dream-app-login:hydra oryd/hydra:v1.0.0-beta.9 token user \
    --token-url http://hydra:4444/oauth2/token \
    --auth-url http://localhost:4444/oauth2/auth \
    --scope openid,offline \
    --client-id test-client \
    --client-secret test-secret \
    --redirect http://127.0.0.1:4200/callback

