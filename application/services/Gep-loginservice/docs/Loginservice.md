
# To run the login service.

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
