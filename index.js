module.exports = function ThinSchemaInflectorPlugin(builder, { pgSimpleCollections }) {
  const hasSimpleCollections = pgSimpleCollections === "only" || pgSimpleCollections === "both";
  if (!hasSimpleCollections) {
    throw new Error("This plugin is designed for simple collections only.");
  }

  builder.hook("inflection", inflection => {
    return {
      ...inflection,
      allRowsSimple(table) {
        return this.camelCase(`${this.pluralize(this._singularizedTableName(table))}`);
      },
      allRows(table) {
        return this.camelCase(`${this.pluralize(this._singularizedTableName(table))}-connection`);
      },
    };
  });
};
