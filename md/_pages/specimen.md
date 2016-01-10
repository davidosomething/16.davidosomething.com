---
title:          "Specimen"
subheader:      "Typography and layout samples for this website."
private:        true
---

## Second level header (H2) with very long text content to test wrapping of headers

Some normal paragraph text. Bibendum irure. Neque arcu perspiciatis ridiculus
necessitatibus dolorum cillum fuga ullamco luctus, illo luctus suspendisse,
diamlorem pede anim, ornare. Porttitor, viverra temporibus tempora ipsum
aliquid, eligendi torquent proident excepturi dictum.

## Another second level

### Third level (H3) immediately following second level

#### Fourth level (H4) immediately following. Bibendum irure. Neque arcu perspiciatis ridiculus

##### Fifth level (H5) immediately following. Bibendum irure. Neque arcu perspiciatis ridiculus

- Unordered list
    - Nested item
        1. Nested ordered list
        1. Another item
        1. Bibendum irure. Neque arcu perspiciatis ridiculusBibendum irure.
           Neque arcu perspiciatis ridiculusBibendum irure. Neque arcu
           perspiciatis ridiculusBibendum irure. Neque arcu perspiciatis
           ridiculus
    - Nested item Bibendum irure. Neque arcu perspiciatis ridiculusBibendum
      irure. Neque arcu perspiciatis ridiculusBibendum irure. Neque arcu
      perspiciatis ridiculusBibendum irure. Neque arcu perspiciatis ridiculus

1. Ordered list
    1. Bibendum irure. Neque arcu perspiciatis ridiculus Bibendum irure. Neque arcu perspiciatis ridiculus.
    1. Something
        - Nested unordered. Bibendum irure. Neque arcu perspiciatis ridiculusBibendum irure. Neque arcu perspiciatis ridiculus.
    1. Something else Bibendum irure. Neque arcu perspiciatis ridiculus.

Bibendum irure. Neque arcu perspiciatis ridiculus Porttitor nonummy amet
feugiat. Nam alias. Magnam perferendis magnam! Nesciunt parturient quibusdam,
molestias repudiandae reiciendis proident, laudantium voluptas? Aliqua
torquent? Venenatis. Error, incidunt sit est dictum illum nec irure, augue.

## More elements

Porttitor nonummy amet feugiat. Nam alias. ~~Magnam~~ perferendis magnam!
**Nesciunt** parturient quibusdam, _molestias_ repudiandae reiciendis proident,
laudantium voluptas? [Aliqua](http://google.com/) torquent? Venenatis. Error,
incidunt sit est dictum illum nec irure, augue.

> Block quoted thing. Porttitor nonummy amet ~~feugiat~~. Nam alias. Magnam
> perferendis magnam! **Nesciunt** parturient quibusdam, molestias repudiandae
> reiciendis proident, laudantium _voluptas?_ liqua torquent? Venenatis. Error,
> incidunt sit est dictum illum nec irure, augue.

Porttitor nonummy amet feugiat. Nam alias. Magnam perferendis magnam! Nesciunt
parturient quibusdam, molestias repudiandae reiciendis proident, laudantium
voluptas? Aliqua torquent? Venenatis. Error, incidunt sit est dictum illum nec
irure, augue.

| Table Header | Cell | Another table cell |
| ------------ | ---- | :----------------: |
| Item 1       |      | Centered Item      |
| Item 1       |      | Centered Item      |
| Porttitor nonummy amet feugiat. Nam alias. Magnam perferendis magnam! Nesciunt parturient quibusdam, molestias repudiandae reiciendis proident, laudantium voluptas? Aliqua torquent? Venenatis. Error, incidunt sit est dictum illum nec irure, augue. | abc | centered Porttitor nonummy amet feugiat. Nam alias. Magnam perferendis magnam! Nesciunt parturient quibusdam, molestias repudiandae reiciendis proident, laudantium voluptas? Aliqua torquent? Venenatis. Error, incidunt sit est dictum illum nec irure, augue. |
| Item 1       |      | Centered Item      |
| Item 1       |      | Centered Item      |

Nam alias. Magnam perferendis magnam! Nesciunt parturient quibusdam, molestias
repudiandae reiciendis proident, laudantium voluptas? Aliqua torquent?
Venenatis. Error, incidunt sit est dictum illum nec irure, augue.

```javascript
return function(files, metalsmith, done){
  setImmediate(done);
  Object.keys(files).forEach(function(file){
    debug('checking file: %s', file);
    if (!markdown(file)) return;
    var data = files[file];
    var dir = dirname(file);
    var html = basename(file, extname(file)) + '.html';
    if ('.' != dir) html = dir + '/' + html;
  }
}
```

Magnam perferendis magnam! Nesciunt parturient quibusdam, molestias repudiandae
reiciendis proident, laudantium voluptas? Aliqua torquent? Venenatis. Error,
incidunt sit est dictum illum nec irure, augue. Nam alias. Magnam perferendis
magnam! Nesciunt parturient quibusdam, molestias repudiandae reiciendis
proident, laudantium voluptas? Aliqua torquent? Venenatis. Error, incidunt sit
est dictum illum nec irure, augue.


