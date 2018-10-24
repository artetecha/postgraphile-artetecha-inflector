# `postgraphile-artetecha-inflector`

Override some of PostgraPhile's core inflectors with Artetecha's own favourite inflection rules.

Implemented so far:

### `allRows`:

Given a type, e.g. `Metadata`:

- Core `allRows` would be `allMetadata`
- Artetecha's is `metadataConnection`

### `allRowsSimple`

Given a type, e.g. `Metadata`:

- Core `allRowsSimple` would be `allMetadataList`
- Artetecha's is `metadata`
