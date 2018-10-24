module.exports = function PgArtetechaInflectorPlugin(builder) {
  builder.hook("inflection", inflection => {
    inflection.smartPluralize = input => {
      const singular = inflection.singularize(input);
      const plural = inflection.pluralize(singular);
      if (plural == singular) {
        if (
          plural.endsWith("ch") ||
          plural.endsWith("s") ||
          plural.endsWith("sh") ||
          plural.endsWith("x") ||
          plural.endsWith("z")
        ) {
          return plural + "es";
        } else {
          if (plural.endsWith("y")) {
            return plural.slice(0, -1) + "ies";
          } else {
            return plural + "s";
          }
        }
      }
      return plural;
    };
    return {
      ...inflection,
      allRowsSimple(table) {
        return this.camelCase(
          `${this.smartPluralize(this._singularizedTableName(table))}`
        );
      },
      allRows(table) {
        return this.camelCase(
          `${this.smartPluralize(
            this._singularizedTableName(table)
          )}-connection`
        );
      }
    };
  });
};
