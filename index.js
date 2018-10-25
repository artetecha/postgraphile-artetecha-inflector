const { enhanceCamelCase, enhancePluralize } = require("./enhance-inflection");

module.exports = function PgArtetechaInflectorPlugin(builder) {
  builder.hook("inflection", inflection => {
    return {
      ...inflection,

      pluralize: enhancePluralize(inflection),
      camelCase: enhanceCamelCase(inflection.camelCase),
      upperCamelCase: enhanceCamelCase(inflection.upperCamelCase),

      allRowsSimple(table) {
        return this.camelCase(`${this.pluralize(this._singularizedTableName(table))}`);
      },
      allRows(table) {
        return this.camelCase(`${this.pluralize(this._singularizedTableName(table))}-connection`);
      },

      singleRelationByKeys(detailedKeys, table, _foreignTable, constraint) {
        if (constraint.tags.fieldName) {
          return constraint.tags.fieldName;
        }
        return this.camelCase(`${this._singularizedTableName(table)}`);
      },

      singleRelationByKeysBackwards(
        detailedKeys,
        table,
        _foreignTable,
        constraint
      ) {
        if (constraint.tags.foreignSingleFieldName) {
          return constraint.tags.foreignSingleFieldName;
        }
        if (constraint.tags.foreignFieldName) {
          return constraint.tags.foreignFieldName;
        }
        return this.camelCase(`${this._singularizedTableName(table)}`);
      },

      manyRelationByKeys(detailedKeys, table, _foreignTable, constraint) {
        if (constraint.tags.foreignFieldName) {
          return constraint.tags.foreignFieldName;
        }
        return (
          this.camelCase(this.manyRelationByKeysSimple(
            detailedKeys,
            table,
            _foreignTable,
            constraint
          ) + "-connection")
        );
      },

      manyRelationByKeysSimple(detailedKeys, table, _foreignTable, constraint) {
        if (constraint.tags.foreignSimpleFieldName) {
          return constraint.tags.foreignSimpleFieldName;
        }
        return this.camelCase(`${this.pluralize(this._singularizedTableName(table))}`);
      },
    };
  });
};
