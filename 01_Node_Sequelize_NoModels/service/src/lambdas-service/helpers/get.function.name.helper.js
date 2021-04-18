const getAllFunctions = (obj) => {
    const photo = Object.getPrototypeOf(obj);
    const names = Object.getOwnPropertyNames(photo);
    return names
        .filter(name => typeof obj[name] === 'function')
        .filter(name => name !== 'constructor');
};

module.exports = getAllFunctions;
