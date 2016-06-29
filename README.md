Poker Mavens API Wrapper
==================

Lightweight promise based Node.js wrapper for the Poker Mavens Admin API.

## Installation

    $ npm install pokermavens --save

## Usage

Create new instance and pass in your Poker Mavens API URL and API Password.
```javascript
var PM = require('pokermavens');

var pm = new PM({
  url: 'http://yourpmapiurl.com',
  password: 'yourapipassword'
});
```

All of the commands on the [API Command List](https://www.briggsoft.com/docs/pmavens/Technical_Interface.htm) can be accessed.

**NOTE**: All commands are PascalCase

```javascript
// Create a new account
pm.AccountsAdd({
  player: 'newguy',
  pw: 'pass',
  location: 'Newland',
  email: 'itsnew@guy.com'
})
.then(function(result) {
  console.log(result);
})
.catch(function(err) {
  console.log(err);
});
```

### Running tests

`npm test`
