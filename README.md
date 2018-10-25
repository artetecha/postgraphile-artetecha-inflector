# `postgraphile-artetecha-inflector`

Override some of PostgraPhile's core inflectors with Artetecha's own favourite inflection rules.

Implemented so far:

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
