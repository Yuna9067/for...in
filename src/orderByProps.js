export function orderByProps(obj, order) {
    const result = [];
    const orderedKeys = [];
    const restKeys = [];

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (order.includes(key)) {
                orderedKeys.push(key);
            } else {
                restKeys.push(key);
            };
        };
    };

    orderedKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    restKeys.sort();

    const allKeys = [ ...orderedKeys, ...restKeys];
    for (const key in allKeys) {
        result.push({ key, value: obj[key] });
    };

    return result;
}