A smarter way to extract nested JavaScript properties.

[![Build Status](https://travis-ci.org/whirlwin/gracepull.svg?branch=master)](https://travis-ci.org/whirlwin/gracepull)

## Usage

### Syntax

> `gracepull(extractFn, [fallback])`

#### extractFn

The function used to extract the property.

#### fallback

The fallback value to be used if the property is absent. Can either be a value or a function returning a value.

### Basic example

```javascript
var gracepull = require('gracepull');

var person = {
    address: {
        street: {
            name: 'Acacia Avenue',
            number: 22
        }
    }
};

var result = gracepull(() => person.address.street.name); // 'Acacia Avenue'
```

### Missing property example

```javascript
var gracepull = require('gracepull');

var person = {
    address: {}
};

var result = gracepull(() => person.address.street.name); // null
```

### Missing property fallback example

```javascript
var gracepull = require('gracepull');

var person = {
    address: {}
};

var result = gracepull(() => person.address.street.name, 'Default Road'); // 'Default Road'
```
