
## Description

[NestJS](https://github.com/nestjs/nest) Assessment.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seeding
```bash
# Create migration
$ npm run db:seed

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API endpoints


- Authentication
```bash
POST    /auth/signin
POST    /auth/signup
````
- Cat
```bash
POST    /cats
GET     /cats
GET     /cats/:id
PATCH   /cats/:id
DELETE  /cats/:id
```

- Favorite
```bash
POST    /favorites
DELETE  /favorites?user_id={:id}&cat_id={:id}
```

## Contact

Videl Shaw(email: videl0680@gmail.com)
