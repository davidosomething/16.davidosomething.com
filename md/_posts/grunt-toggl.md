---
slug:           grunt-toggl
title:          "grunt-toggl"
subheader:      "Automatically start a Toggl timer with a Grunt task"
datePublished:  2014-04-29T22:30:24+00:00
image:          "/assets/img/posts/grunt-toggl-logo.jpg"
tags:
  - grunt
  - toggl
  - timetracking
  - gtd
---
<img src="/assets/img/posts/grunt-toggl-logo.png" alt="grunt-toggl logo" class="image--left">

## Start using grunt-toggl today!

```bash
npm install --save-dev grunt-toggl
```

See the docs and contribute to grunt-toggl on the GitHub repository here:
[https://github.com/davidosomething/grunt-toggl](https://github.com/davidosomething/grunt-toggl
"grunt-toggl on GitHub")

## Some background

I work for many clients and on multiple projects at a time, so it’s important to
keep track of my billable hours. My tool of choice for time tracking is
[Toggl](https://www.toggl.com/ "Toggl"). Check it out if you’re not already
a user — it’s got apps for every device and OS and a great reporting dashboard.

Sometimes I forget to start a Toggl timer when I dive into the fun part of web
development. But one thing I pretty much always do at the start of a web project
is start [grunt](http://gruntjs.com/ "Grunt: The JavaScript Task Runner"). So it
makes sense to have something to tie the two together. For that reason, I’ve
created a Grunt plugin that automatically starts a Toggl timer. It’s available
now [on npm](https://www.npmjs.org/package/grunt-toggl "grunt-toggl on NPM").

Basically the plugin creates a new asynchronous Grunt task. The task uses the
[Request](https://github.com/mikeal/request) library to make an HTTP request to
the [Toggl API](https://github.com/toggl/toggl_api_docs "Toggl API"). There are
helper arguments in the task that to find your Workspace and Project IDs, too.
Anyway, this is my second Grunt plugin and the first one to use [Travis CI for
continuous integration](https://travis-ci.org/ "TravisCI"). Let me know if you
use it!

