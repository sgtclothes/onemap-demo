var checkSpacesInString = function (string) {
    if (/\s/.test(string)) {
        return true
    } else return false
}

var convertToCamelCase = function (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

var createFormula = function (formula) {
    return formula
}