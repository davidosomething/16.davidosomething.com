# metalsmith-grouped-page

A metalsmith plugin that groups pages together and creates a new page for each
group. Similar to `metalsmith-collections` with the addition that it creates
a new page file for each collection among other things.

## Usage

Require the metalsmith plugin:

```javascript
const metalsmithGroupedPage = require('metalsmith-grouped-page');
```

And require any transforms you want the plugin to apply. E.g. to group pages by
tags structured in your YAML frontmatter as:

```yaml
---
tags:
  - vim
  - plugins
---
```

and add the groups to the global metadata, use the following transform plugins:

```javascript
const gptTagPageDefaults  = require('../metalsmith-grouped-page/transforms/tag');
const gptAddToMetadata    = require('../metalsmith-grouped-page/transforms/add-to-metadata');
```

Then use the metalsmith plugin and put the transforms and their configurations
in to the transforms option.

```javascript
.use(metalsmithGroupedPage({
  path:    'tags',
  metadata: {
    type:    'tag',
  },
  transforms: [
    gptTagPageDefaults,
    gptAddToMetadata({
      metakey: 'tags',
    }),
  ],
}))
```

## Options

- `path` is the stringified path to a value in the file object. For instance
  if you have a file with the metadata `tags` as in the YAML data above, you
  can just pass the string `tags`. See the lodash docs for `lodash.get`.
- `metadata` is an object of metadata that will be added to each page created
  by this plugin. Your original files are not affected by this, only the new
  ones.
- `transforms` is an array of functions. Each function is applied to the pages
  created by this plugin, called as `transform(groups, options, metalsmith)`
  where `groups` is an Object keyed with the filename for each new page,
  `options` is the original options passed to the plugin, and `metalsmith` is
  the metalsmith instance (useful if you want to access metadata).

## Transforms

### tag

This transform adds some basic metadata to each page created by this plugin.
For instance, it sets the `layout` of those new pages to `tag.hbs`.

### add-to-metadata

This transform should be added with some options of its own. It adds the
grouped pages as an array to `metalsmith.metadata().groupedPages[metakey]`.

#### add-to-metadata options

- `metakey` is the key under which the grouped pages should be added. E.g.
  `tags` will create an array in `metalsmith.metadata().groupedPages['tags']`
  where each value is the metalsmith file object for a tag.
- `sort` is an array of functions/objects/strings that can be used to sort the
  array that gets added to the metadata. Default is to sort by key, so you'd
  end up with `metalsmith.metadata().groupedPages['tags'][0]` being the page
  for the tag `aardvark`, `metalsmith.metadata().groupedPages['tags'][1]` for
  the tag `abacus`, etc. See lodash.orderby for docs on the implementation.
- `order` is an array of strings, e.g. `[ 'asc' ]`, which determines the sort
  order for each value you're sorting by in `options.sort`. See lodash.orderby
  for docs on the implementation.


