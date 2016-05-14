function gracepull(tentativeValueFn, defaultValueFn) {

    validateTentativeParam(tentativeValueFn);
    validateDefaultParam(defaultValueFn);

    var value = tryPullValue(tentativeValueFn);

    if (shouldReturnDefaultValue(value, defaultValueFn)) {
        return defaultValueFn();
    } else {
        return value;
    }
}
function validateTentativeParam(tentativeParam) {
    if (typeof tentativeParam !== 'function') {
        throw new TypeError('Argument 1 should be of type function');
    }
}

function validateDefaultParam(defaultParam) {
    if (defaultParam !== undefined && typeof defaultParam !== 'function') {
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

function shouldReturnDefaultValue(value, defaultValueFn) {
    return (value === null || value === undefined) && defaultValueFn !== undefined;
}

module.exports = gracepull;
