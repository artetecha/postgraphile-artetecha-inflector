/**
 * To be used to enhance inflection.{camelCase,upperCamelCase} so that you
 * do not end up with capital 'S' on some plurals.
 *
 * Credit: https://github.com/graphile-contrib/pg-simplify-inflector
 *
 * @param fn Function to fix
 */
const enhanceCamelCase = (fn) => {
  return function(str) {
    const original = fn.call(this, str);
    return original.replace(/[0-9]S(?=[A-Z]|$)/g, match => match.toLowerCase());
  };
}

/**
 * To be used to enhance inflection.pluralize().
 *
 * @param fn Function to fix
 */
const enhancePluralize = (inflection) => {
  return function(str, plural, ungrammatical = true) {
    const singular = inflection.singularize(str);
    const _plural = inflection.pluralize.call(this, singular, plural);
    if (!ungrammatical || _plural != singular) {
      return _plural;
    }
    if (
      _plural.endsWith("ch") ||
      _plural.endsWith("s") ||
      _plural.endsWith("sh") ||
      _plural.endsWith("x") ||
      _plural.endsWith("z")
    ) {
      return _plural + "es";
    } else {
      if (_plural.endsWith("y")) {
        return _plural.slice(0, -1) + "ies";
      } else {
        return _plural + "s";
      }
    }
  }
}

module.exports = {
  enhanceCamelCase,
  enhancePluralize
}
