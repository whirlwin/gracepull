A smarter way to extract nested JavaScript properties.

## Usage

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
