const chai = require('chai');
const gracepull = require('../index');
const mocha = require('mocha');

mocha.describe('gracepull', function() {

    const testObj = { foo: { bar: { baz: 'qux' } } };

    mocha.it('should fail when number of arguments is 0', function() {
        chai.expect(function() {
            gracepull();
        }).to.throw(Error);
    });

    mocha.it('should fail when number of arguments is 3', function() {
        const firstArgument = testObj.foo;
        const secondArgument = function() { return 'something'; };
        const thirdArgument = 'I can haz third arg?';

        chai.expect(function() {
            gracepull(firstArgument, secondArgument, thirdArgument);
        }).to.throw(Error);
    });

    mocha.it('should fail when first argument is not a function', function() {
        const firstArgument = testObj.foo;
        const secondArgument = function() { return 'something' };

        chai.expect(function() {
            gracepull(firstArgument, secondArgument);
        }).to.throw();
    });

    mocha.it('should throw Error when first argument yields an error', function() {
        const firstArgument = function() { throw new URIError('Random error!') };
        const secondArgument = function() { return 'some fallback value'; };

        chai.expect(function() {
            gracepull(firstArgument, secondArgument);
        }).to.throw(Error);
    });

    mocha.it('should return fallback function result when no match is present', function() {
        const fallbackValue = 'graceful fallback';
        const firstArgument = function() { return testObj.unknownProperty; };
        const secondArgument = function() { return fallbackValue; };

        const result = gracepull(firstArgument, secondArgument );

        chai.assert.equal(result, fallbackValue);
    });

    mocha.it('should return fallback value when no match is present', function() {
        const firstArgument = function() { return testObj.unknownProperty; };
        const secondArgument = 'graceful fallback';

        const result = gracepull(firstArgument, secondArgument);

        chai.assert.equal(result, secondArgument);
    });

    mocha.it('should return value if present', function() {
        const firstArgument = function() { return testObj.foo.bar.baz; };
        const secondArgument = function() { return fallbackValue; };

        const result = gracepull(firstArgument, secondArgument);

        chai.assert.equal(result, testObj.foo.bar.baz);
    });
});