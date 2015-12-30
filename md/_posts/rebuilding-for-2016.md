---
title: "Rebuilding davidosomething.com as a static site"
subheader: "Handlebars + Markdown + Metalsmith static site generation"
datePublished: 2015-12-29
tags:
  - static site generation
  - Metalsmith
---

I've rebuilt my website from the ground-up for the new year, finishing it just
in time. This site is now fully static, templates in Handlebars syntax and posts
written in Markdown are combined into plain old HTML, where WordPress and PHP
were previously providing the templating and storing the post formatting as
HTML in a database.

## The new stack

- Replaced PHP templating with Handlebars
- Replaced WordPress serving with Metalsmith generation
- Replaced MySQL storage engine with Markdown files in git

There is no more ruby dependency since I am using node-sass instead of ruby-sass
and sass-lint instead of the scss-lint gem.

JS-wise I am using es2015, but not really using any of its cool features except
arrow functions and dynamic templating. Metalsmith uses generators, so it
requires either node version 4.2+ or 0.12 with the harmony flag on; I opted to
use node v4.2.

## Migrating from WordPress

There was a brief period of time where I secretly added a query parameter to the
WordPress version of this site which would cause it to spit out the raw contents
of each post as plain text. I only had 40 posts so it wasn't a big deal to grab
each one and reformat them into Markdown using an HTML to markdown converter.
I output the post meta data into YAML format above each post and saved it out as
the frontmatter for each new markdown file.

The interim scripts I used to clean up the PHP to HTML to Markdown files are
left in the github repo in
[bin/](https://github.com/davidosomething/16.davidosomething.com/tree/962ba928f4500410d0b2f1469b3fed7361708f97/bin).
It's one of the few times I've ever decided to use PHP from the command-line,
and also the only PHP in the repo.

## SEO

Getting rid of WordPress meant that I would have to do a lot of plugin-provided
SEO work myself. I've fully marked-up this site using
[schema.org](https://schema.org/BlogPosting) Microdata. I prefer that over
JSON-LD since it is more specific regarding which DOM node represents an entity.
Twitter cards, OpenGraph tags, standard meta tags and site validation are all
trivial in comparison to the verbosity of Microdata.

## Templating

I redid the HTML templating with Handlebars, which is amazingly clean compared
to jumping in and out of PHP tags. If you're doing that in WordPress, consider
using twig or something - I really don't know how anyone can live like that.

## Setting up Metalsmith

Metalsmith is like gulp in that it is pretty much just a task runner. Or maybe
it is more like broccoli in that it works on a directory (tree) rather than on
a stream.

You give Metalsmith the path to your markdown files (or any files), and then
tell it to `use(someplugin())`, which will transform those files. This is not
exactly a functional map operation, but it works similarly, and the plugins
basically provide a function that serves as the map iteratee.

Despite Metalsmith providing its own CLI tool and being capable of running
Gulp plugins, I opted to use it as a JS module from within Gulp. It's just
easier to remember `gulp html` to generate my html since it is mentally the same
as `gulp css` and `gulp js` for those respective build steps. Also my CSS task
actually operates on two different streams so it was worth keeping Gulp around.

## Future plan

I'm looking to switch to [gatsby](https://github.com/gatsbyjs/gatsby) -- a react
based static site generator. Basically all this does is use react templating
instead of handlebars, and uses react's output to static html to generate the
file. Converting handlebars templates to react is trivial (it is practically
just wrapping the handlebars template in some React code) and this will have the
added bonus of hot-reloading for previewing posts.

## Open source

The site source is [on github](https://github.com/davidosomething/16.davidosomething.com).
Kinda nice that there's nothing to hide (database pws, dot-env files, whatever),
now that there's no backend.

