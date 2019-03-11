# Request-rate-limiter

A node module to implement request rate limiter with express.

## installation (not available on npm yet)

    npm i request-rate-limiter

## API

The constructor accepts one argument. The argument can be a number (the rate limit) or an config object.


    var RequestRateLimiter = require('request-rate-limiter');


Create a rate limiter which can send 100 requests per hour.

    var requestRateLimiter = new RequestRateLimiter(100, 3600);


Other way to run project as its not available on NPM

1. Add app.js file on root directory
2. Paste following code

import express from 'express';

import RequestRateLimiter from './src';

var app = express();

const port = 3000

var requestRateLimiter = new RequestRateLimiter(100, 3600);

app.get('/', (req, res) => res.send('Hello World!'));

app.use(requestRateLimiter.middleware);
app.start();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

3. run node app.js

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# Installation
Just clone this repo and remove `.git` folder.


# License

MIT © Dinesh Pandiyan
