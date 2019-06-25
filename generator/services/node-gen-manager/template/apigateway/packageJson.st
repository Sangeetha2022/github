packageJson(object) ::= <<
{
  "name": "$object.name$",
  "version": "1.0.0",
  "description": "$object.description$",
  "main": "dist/server.js",
  "scripts": {
    "test": "ng test",
    "build": "tsc",
    "dev": "ts-node ./src/server.ts",
    "start": "nodemon ./dist/server.js",
    "prod": "npm run build && npm run start"
  },
  "author": "Dan Castillo <dan.castillo@geppettosoftware.com>",
  "license": "ISC",
  "dependencies": {
    "@types/express": "^4.16.1",
    "body-parser": "^1.18.3",
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-winston": "^3.0.1",
    "node-vault": "^0.9.5",
    "nodemon": "^1.18.9",
    "request": "^2.88.0",
    "request-promise-native": "^1.0.5",
    "typescript": "^3.2.4",
    "winston": "^3.2.1",
    "winston-daily-rotate-file": "^3.6.0"
  }
}

>>