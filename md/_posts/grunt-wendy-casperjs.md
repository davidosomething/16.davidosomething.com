---
slug:           grunt-wendy-casperjs
title:          "grunt-wendy – CasperJS for GruntJS"
subheader:      "A super customizable CasperJS test runner with output filtering"
datePublished:  2015-09-19T00:00:07+00:00
image:          "/assets/img/posts/wendy.png"
tags:
  - casperjs
  - e2e
  - grunt
  - phantomjs
  - testing
---
<img src="/assets/img/posts/wendy.png" class="image--left" alt="grunt-wendy logo">
[grunt-wendy](https://github.com/davidosomething/grunt-wendy) is my latest Grunt
plugin. It’s a CasperJS test runner with customizable filtering and formatting
options, which CasperJS alone lacks.

## Installation

```bash
npm install --save-dev grunt-wendy
```

See the docs and contribute to grunt-wendy on the GitHub repository here:
[grunt-wendy on GitHub](https://github.com/davidosomething/grunt-wendy)

## VS others

Compared to
[iamchrismiller/grunt-casper](https://github.com/iamchrismiller/grunt-casper)
and
[ronaldlokers/grunt-casperjs](https://github.com/ronaldlokers/grunt-casperjs),
the top two Grunt CasperJS test runners (all others are no longer maintained),
this task:

- adds formatting options to format CasperJS’ output
- adds filtering to filter out unwanted CasperJS output
- adds option to **not fail** on conditions — e.g. just output a warning when
  there are dubious or skipped tests
- is version locked to PhantomJS 1.9.7 via the [node phantomjs 1.9.11
  module](https://github.com/Medium/phantomjs) — this is a troublemaker for
  a lot of errors with the other tasks
- fully exposes the casper cli (iamchrismiller’s uses options only), including
  allowing custom test runner instead of just <kbd>casper test</kbd> (neither
  of the others do)
- currently maintained by original developer (ronaldloker’s is not, and
  although pull requests are merged by
  [@gorillamania](https://github.com/gorillamania) other chores are not
  guaranteed: changelog, bump, npm publish)

## What’s next?

Planned additions are:

- SlimerJS support for gecko (use iamchrismiller’s if you need this) and possibly trifleJS support for IE.
- Optional polyfill auto-injection for <var>Function.prototype.bind</var>, since PhantomJS 1.9.7 doesn’t implement it.
- Inclusion of other output formats for reporting besides CasperJS’ included xunit xml file

