---
slug:           "gulp-markdown-linter"
title:          "Lint your markdown files with gulp‑remark‑lint‑dko"
subheader:      "A gulp plugin to lint markdown using remark-lint"
datePublished:  2016-01-22
image:          "/assets/img/posts/gulp.png"
tags:
  - gulp
  - markdown
  - plugins
  - linting
  - remark
---

I've just [published on npm][npm], my gulp plugin to lint markdown files using
[remark] and [remark-lint]. It's fully functional right now, and you can
install it from npm to start using it in your gulpfile:

```bash
npm install --save-dev gulp-remark-lint-dko
```

I am planning to add more features, which you can follow in the [README] or
help contribute with a pull request.

- [gulp-remark-lint-dko on GitHub][github]
- [gulp-remark-lint-dko on npmjs.com][npm]

Here's a screenshot of the output:

![Example output](https://raw.githubusercontent.com/davidosomething/gulp-remark-lint-dko/master/screenshot.png)


[npm]: https://www.npmjs.com/package/gulp-remark-lint-dko
[github]: https://github.com/davidosomething/gulp-remark-lint-dko
[README]: https://github.com/davidosomething/gulp-remark-lint-dko/blob/master/README.md
[remark]: https://github.com/wooorm/remark
[remark-lint]: https://github.com/wooorm/remark-lint
