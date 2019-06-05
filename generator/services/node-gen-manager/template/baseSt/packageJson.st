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
    "mongoose": "^5.4.9",
    "node-async-loop": "^1.2.2",
    "node-vault": "^0.9.5",
    "nodemon": "^1.18.9",
    "stringtemplate-js": "^0.1.1",
    "typescript": "^3.3.1",
    "util": "^0.11.1",
    "winston": "^3.2.1",
    "winston-daily-rotate-file": "^3.6.0"
  }
}

>>