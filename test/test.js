const chai = require('chai');
const gracepull = require('../index');
const mocha = require('mocha');

mocha.describe('gracepull', function() {

    const testObj = { foo: { bar: { baz: 'qux' } } };

    mocha.it('should fail when first argument is not a function', function() {
        const firstArgument = testObj.foo;
        const secondArgument = function() { return 'something' };

        chai.expect(function() {
            gracepull(firstArgument, secondArgument);
        }).to.throw();
    });

    mocha.it('should fail when second argument is not a function', function() {
        const firstArgument = function() { return testObj.foo; };
        const secondArgument = 'plain default value';

        chai.expect(function() {
            gracepull(firstArgument, secondArgument);
        }).to.throw();
    });

    mocha.it('should throw Error when first argument yields an error', function() {
        const firstArgument = function() { throw new URIError('Random error!') };
        const secondArgument = function() { return 'some default value'; };

        chai.expect(function() {
            gracepull(firstArgument, secondArgument);
        }).to.throw(Error);
    });

    mocha.it('should return default when no match is present', function() {
        const defaultValue = 'graceful default';
        const firstArgument = function() { return testObj.unknownProperty; };
        const secondArgument = function() { return defaultValue; };

        const result = gracepull(firstArgument, secondArgument );

        chai.assert.equal(result, defaultValue);
    });

    mocha.it('should return value if present', function() {
        const firstArgument = function() { return testObj.foo.bar.baz; };
        const secondArgument = function() { return defaultValue; };

        const result = gracepull(firstArgument, secondArgument);

        chai.assert.equal(result, testObj.foo.bar.baz);
    });
});