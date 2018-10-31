const { enhanceCamelCase, enhancePluralize } = require("./enhance-inflection");

module.exports = function PgArtetechaInflectorPlugin(builder) {
  // Support for postgraphile-plugin-nested-mutations plugin.
  // Currently, the plugin is defining its inflection rules in
  // the wrong place ('build' hook rather than 'inflection' hook).
  // @TODO: move this to 'inflection' once postgraphile-plugin-nested-mutations
  // implements it in the right place.
  builder.hook("build", build => {
    const { inflection } = build;
    return {
      ...build,
      pluralize: enhancePluralize(inflection),
      camelCase: enhanceCamelCase(inflection.camelCase),
      pgNestedFieldName(options) {
        const {
          constraint: {
            tags: { forwardMutationName, reverseMutationName },
          },
          isForward,
          foreignTable,
        } = options;
        const tableFieldName = inflection.tableFieldName(foreignTable);
        return isForward
          ? forwardMutationName || this.camelCase(`${tableFieldName}}`)
          : reverseMutationName || this.camelCase(`${this.pluralize(tableFieldName)}`);
      },
    };
  });

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
