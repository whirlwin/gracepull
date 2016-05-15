function gracepull(tentativeValueFn, fallbackValue) {

    validateNumberOfArguments(arguments);
    validateTentativeParam(tentativeValueFn);

    var value = tryPullValue(tentativeValueFn);

    if (shouldReturnFallbackValue(value, arguments)) {
        return handleGetFallbackValue(fallbackValue);
    } else {
        return value;
    }
}

function validateNumberOfArguments(args) {
    if (args.length < 1 || args.length > 2) {
        throw new Error('Function requires 1 or 2 arguments, got ' + args.length);
    }
}

function validateTentativeParam(tentativeParam) {
    if (typeof tentativeParam !== 'function') {
        throw new TypeError('Argument 1 should be of type function');
    }
}

function handleGetFallbackValue(fallbackValue) {
    if (typeof fallbackValue === 'function') {
        return fallbackValue();
    } else {
        return fallbackValue;
    }
}

function tryPullValue(tentativeValueFn) {
    try {
        return tentativeValueFn();
    } catch (err) {
        if (err instanceof TypeError || err instanceof ReferenceError) {
            return null;
        } else {
            throw Error('Failed to pull value due to unknown error: ' + err);
        }
    }
}

function shouldReturnFallbackValue(value, args) {
    return (value === null || value === undefined) && args.length === 2;
}

module.exports = gracepull;
