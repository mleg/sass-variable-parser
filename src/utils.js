const { camelCase, mapKeys, forEach } = require('lodash');

// Finds all matches of regex in a string
function findAll(str, regex) {
  const result = [];

  const next = () => regex.exec(str);
  let found = next();
  while (found !== null) {
    result.push(found);
    found = next();
  }

  return result;
}

// Generates 8-symbols long id
function generateId() {
  return Math.random()
    .toString(36)
    .slice(-8);
}

// Returns a promise resolving after passed time
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

function camelizeDeep(object) {
  const newObj = mapKeys(object, (value, key) => camelCase(key));
  forEach(newObj, (value, key) => {
    if (typeof value === 'object') {
      newObj[key] = camelizeDeep(value);
    }
  });
  return newObj;
}

module.exports = {
  findAll,
  generateId,
  delay,
  camelizeDeep,
};
