# `postgraphile-artetecha-inflector`

Override some of PostgraPhile's core inflectors with Artetecha's own favourite inflection rules.

## Core inflection rules

### `allRows`:

Given a type, e.g. `Metadatum`:

- Core `allRows` would be `allMetadata`
- Artetecha's is `metadataConnection`

### `allRowsSimple`

Given a type, e.g. `Metadatum`:

- Core `allRowsSimple` would be `allMetadataList`
- Artetecha's is `metadata`

### `singleRelationByKeys`

Given a type `Author` with a 1:1 relationship to `Metadatum` on some `id` field

- Core would create a field `metadatumByAuthorId` field on `Author`
- Artetecha would simply create a field `metadatum`

### `singleRelationByKeysBackwards`

Given a type `Author` with a 1:1 relationship to `Metadatum` on some `id` field

- Core would create a field `authorByAuthorId` field on `Metadatum`
- Artetecha would simply create a field `author`

### `manyRelationByKeys`

Given a type `Author` with a 1:N relationship to `Metadata` on some `id` field

- Core would create a field `metadataByAuthorId` field on `Author`
- Artetecha would simply create a field `metadataConnection`

### `manyRelationByKeysSimple`

Given a type `Author` with a 1:N relationship to `Metadata` on some `id` field

- Core would create a field `metadataByAuthorIdList` field on `Author`
- Artetecha would simply create a field `metadata`

## Third-party inflection rules

### `pgNestedFieldName`

This is implemented by [postgraphile-plugin-nested-mutations](https://github.com/mlipscombe/postgraphile-plugin-nested-mutations).

Given a type `Author` with a 1:N relationship to `Metadata` on some `id` field

- The plugin would create a field `authorToAuthorId` field on the mutation `createMetadatum`
- The plugin would also create a field `metadataUsingId` field on the mutation `createAuthor`
- Artetecha would simply create a field `author` in the first case and a field `metadata` in the second
