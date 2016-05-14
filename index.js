function gracepull(tentativeValueFn, fallbackValueFn) {

    validateTentativeParam(tentativeValueFn);
    validateFallbackParam(fallbackValueFn);

    var value = tryPullValue(tentativeValueFn);

    if (shouldReturnFallbackValue(value, fallbackValueFn)) {
        return fallbackValueFn();
    } else {
        return value;
    }
}
function validateTentativeParam(tentativeParam) {
    if (typeof tentativeParam !== 'function') {
        throw new TypeError('Argument 1 should be of type function');
    }
}

function validateFallbackParam(fallbackParam) {
    if (fallbackParam !== undefined && typeof fallbackParam !== 'function') {
        throw new TypeError('Argument 2 should be of type function');
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

function shouldReturnFallbackValue(value, fallbackValueFn) {
    return (value === null || value === undefined) && fallbackValueFn !== undefined;
}

module.exports = gracepull;
