---
slug:           "vim-for-javascript"
title:          "Setting up Vim for JavaScript development"
subheader:      "Configuring Vim and comparisons of JavaScript-specific Vim plugins"
datePublished:  2016-01-09
image:          "/assets/img/posts/Vimlogo.svg.png"
tags:
  - vim
  - plugins
  - javascript
  - linting
  - tern
changelog:
  -
    date: 2016-11-20
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/3686c4d83d51538d96d28c991a1766e6ea4f76d9"
    body: |
      - Updated general completion details and caveat that I've moved on to
        Neovim.
  -
    date: 2016-11-17
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/5f0086be063229030c1d75832bdd2c26f14118dd"
    body: |
      - Added a preface in case any n00bs run into this article.
  -
    date: 2016-09-13
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/9d66de11d8c69350e2f9284c2c0b85e0b2cd25c7"
    body: |
      - vim-javascript's indent is now part up upstream! Thanks for the heads
        up @bounceme!
  -
    date: 2016-09-06
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/8a351757ac4434faffc7ddc188ef63573c9093e0"
    body: |
      - Updated what I use and fixed a backtick
  -
    date: 2016-05-03
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/4e84c59ea266aae491cf58bc0662985204c23c88"
    body: |
      - Updated pangloss/vim-javascript and sheerun/vim-polyglot descriptions
  -
    date: 2016-01-25
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/10fa0c69759d390905ee31a7dc3a108ddeea6e7e"
    body: |
      - Found a new indent script
  -
    date: 2016-01-17
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/348ee68aee9e6c0e9d00f1754a2507a4d6be347f"
    body: |
      - More on `makeprg` and linting
  -
    date: 2016-01-16
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/2e232bdf72ee1b703c361bebead7a3267402c602"
    body: |
      - Clean up some grammar
      - Added heavenshell/vim-jsdoc
      - Change omnifunc example to ensure copypasters don't set global omnifunc
      - More on linters
      - Added Chiel92/vim-autoformat to formatters
      - Added vim-js-context-coloring
  -
    date: 2016-01-12
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/ee240b48380070a4f68c1063c29b79b6a724c8f6"
    body: |
      - Make sure plugin names are all linkified. Add more notes on what the indent plugins do
      - Added example of multi-omni-completion for neocomplete
      - Some language changes
  -
    date: 2016-01-11
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/0eb309472728f5855823d4d1b35bf4e52e524d7b"
    body: |
      - Update omni-completion with basic info on how `omnifunc` works and added vim-better-javascript-completion.
---

Before you read any of this I will caveat with the fact that Vim is perfectly
adequate for modern JavaScript development _without_ plugins. The Vim runtime
comes with syntax highlighting and omni-completion already, and you can even
configure Vim as a task runner without plugins.

This is geared towards people who already know how to use Vim. E.g., if you
understand minutiae like the difference between `set autoindent` and
`set indentexpr`, and have found neither to your liking, then read on.
Otherwise, I highly advise you learn a little more about what the standard
Vim runtime comes with.

## Installing plugins

I recommend using [vim-plug] to install plugins. It's simple, works on both Vim
and Neovim, and can perform operations asynchronously.

- [vim-plug]

## Syntax

Vim comes with a JavaScript syntax file. It is automatically loaded when you
open up a JavaScript file (where the value of `filetype` is `javascript`).

By default Vim doesn't automatically detect filetypes, so if you aren't using
[vim-plug] (for which the call to `call plug#end()` enables this), you'll need
to enable it manually by adding this to your vimrc:

```vim
filetype plugin indent on
```

This will enable filetype detection, running filetype specific plugins, and
loading filetype specific indentation settings.

You may also need to enable syntax highlighting in your vimrc file if you're not
using [vim-plug]. To manually enable syntax highlighting, add the following line
to your vimrc file:

```vim
syntax enable
```

### Plugins that provide better syntax support

The standard JavaScript syntax highlighting is typically adequate, but you may
want more features such as ES2015 support, or better distinguishing of keywords.

There are quite a few options:

- [pangloss/vim-javascript]
    - Includes custom indent settings. These indent settings are also the ones
      included in the Vim default runtime now, and the one in the plugin may
      be trailing what comes with Vim (i.e., Vim has a newer version of the same
      indent file!)
    - Adds special concealing symbols so to make your code pretty at a glance
    - Last updated April 2016 with additional ES2015 support (better arrow
      function and highlighting among other things) and some regex performance
      updates.
- [sheerun/vim-polyglot]
    - This is a plugin that bundles a bunch of language syntax plugins into
      one. It includes [pangloss/vim-javascript] at the latest version, as well
      as some other plugins like [mxw/vim-jsx]. Worth checking out if you don't
      want to maintain syntax plugins on your own, but you should double-check
      to make sure you aren't manually adding the bundled plugins outside of
      the pack (resulting in having the plugin twice).
- [jelera/vim-javascript-syntax]
    - Does not include custom indent settings (not that you need them...)
    - Updated about once a month according to the GitHub contributors graph
- [othree/yajs.vim]
    - This is a fork of [jelera/vim-javascript-syntax]
    - Does not include custom indent settings (again, you might not need one)
    - Updated very often to keep in line with ES specifications
- [bigfish/vim-js-context-coloring]
    - This is an interesting new method of syntax highlighting. It picks out
      function scopes from your program by running it through a node.js binary
      that runs a JavaScript parser and assigns a color to the scope. Things
      within that scope are assigned a color. Because it requires in-depth
      parsing of your code, it may not color your code when it is incomplete
      (i.e., the syntax is not yet valid).
    - This syntax plugin can be used in combination with any of the above, and
      you can toggle it on and off.

With the exception of vim-js-context-coloring, **all of these provide ES2015
(ES6) and JSDoc support to varying degrees**, which Vim lacks by default.
I personally use and recommend [pangloss/vim-javascript] purely because it has
started active development again. I have not experienced any issues since
switching to this from [othree/yajs.vim].

[othree/yajs.vim] with
[es.next.syntax.vim](https://github.com/othree/es.next.syntax.vim) might better
suit your needs if you use ES2016 (ES7). The author also writes a few other
plugins that can be used in conjunction with it (although they may work with
the other syntaxes, too, depending on the syntax groups provided). I've used
this plugin extensively in place of the default syntax and haven't had any
problems.

Using [vim-plug], I recommend installing the plugin like this:

```vim
Plug 'othree/yajs.vim', { 'for': 'javascript' }
```

The additional requirement at the end makes sure the syntax plugin is loaded in
a Vim autocommand based on filetype detection (as opposed to relying on Vim's
`runtimepath` based sourcing mechanism. This way the main Vim syntax plugin
will have already run, and the plugin's syntax will override it.

### Plugins that provide better indentation support

Vim's bundled JavaScript indent may be enough for you, especially if you use
a strictly C-style whitespace (Vim's C-style indent options is even called
`cindent`). Vim, as of August 26, 2016, comes with a modified version of the
[pangloss/vim-javascript] indent rules that does not include the reformatting
`gq` action. This means 99% of people probably won't need to change their indent
file.

Some notable options in this case are:

- [pangloss/vim-javascript]
    - Using this entire syntax plugin will provide you with a more JavaScript-y
      indent for things like switch/case and multi-line var declarations.
    - This indent plugin has a side-effect in that it also changes the format
      expression -- that is, if you highlight a block and use `gq` to reformat
      it, it will re-indent the code using this plugin as well.
    - The Vim runtime (stuff that comes with Vim) may include a newer version of
      this indent file that does not have the modified `gq`.
- [gavocanov/vim-js-indent]
    - I don't recommend this one, but I've listed it here because you'll
      probably find it and have questions. The author no longer uses it, so it
      should not be considered.
    - This is the indent portion of [pangloss/vim-javascript], ripped out into
      its own plugin.
    - There are modifications to it, diverging it from
      [pangloss/vim-javascript], notably support for the syntax group names in
      [othree/yajs.vim]. That helps it pick out keywords and when you are
      inside comments if you are using [othree/yajs.vim].
    - The format expression from the pangloss plugin has been removed.
- [itspriddle/vim-javascript-indent]
    - This is a git mirror of [Ryan Fabella's indent script]
    - It mostly detects closing brackets and parentheses and indents based on
      what it finds.
- [jiangmiao/simple-javascript-indenter]
    - An indent plugin with an option for alignment under functions.
- [jason0x43/vim-js-indent]
    - This is a somewhat new (last updated 2014, as of this writing) indent
      script that also has some TypeScript support. It is based on an
      [older indent script by Tye Zdrojewski] and the default JS-in-HTML indent
      logic that comes with Vim.
    - The indent logic starts with normal `cindent` styles and adds special
      cases for comments, JSDoc, arrays, and switch/case.

Your best bet is to stick with what comes with Vim by default, and only try
out the others if your coding style does not match what the rest of the
JavaScript community is converging towards. If there's a quirk, it is probably
better to submit an issue with the [pangloss/vim-javascript] repo.

## Related syntaxes

During JavaScript development you may find yourself editing a lot of other
filetypes that plain JavaScript.

### es.next / ES2016 / ES7 support

othree has a syntax plugin that provides support for planned, but not-yet-final
EcmaScript features: [othree/es.next.syntax.vim]. I personally don't use it
since I currently stick to the ES2015 feature set at most.

- [othree/es.next.syntax.vim]

### JSX support for React

If you write React and use its optional JSX syntax, adding the following plugin
will provide you with syntax highlighting for those inline XML-nodes:

```vim
Plug 'mxw/vim-jsx'
```

This plugin requires a JavaScript syntax plugin from above to define certain
JavaScript regions. It specifically mentions pangloss' extension in the docs but
[actually supports any of them].

- [mxw/vim-jsx]

### JSON

A lot of things use JSON for configuration, so I recommend [elzr/vim-json] for
that. Check out its options, though; I don't like some of the defaults so
I turn them off, but you might want them. Install with:

```vim
Plug 'elzr/vim-json'
```

- [elzr/vim-json]

### JSDoc syntax highlighting

If you document using JSDoc, all of the syntax plugins above support JSDoc
highlighting already. There's a plugin called [othree/jsdoc-syntax.vim] that
pulls that support out of [othree/yajs.vim], but it is only for adding JSDoc
support to _other_ languages like TypeScript.

- [othree/jsdoc-syntax.vim]

### JSDoc auto-snippets

The plugin [heavenshell/vim-jsdoc] can automatically insert JSDoc comments for
you if your cursor is on a function definition. It'll check for the function
name, arguments, and add the doc-block comment for you.

I use this plugin quite often (I actually have a fork of it with some additions
but hopefully they get merged into the upstream).

- [heavenshell/vim-jsdoc]

### jQuery plugins

Files named `jquery.*.js` are typically jQuery plugins. There's a specific
syntax highlighting plugin for such files: [itspriddle/vim-jquery], but it's
pretty old and you'll have better support combining an up-to-date syntax plugin
with the JavaScript libraries plugin in the next section.

- [itspriddle/vim-jquery]

### JavaScript libraries

othree has a syntax plugin, [othree/javascript-libraries-syntax.vim], that
supports special highlighting of functions and keywords for various libraries
such as jQuery, lodash, React, Handlebars, Chai, etc. For an extensive list, see
the README at the plugin's homepage.

I personally do use this plugin.

- [othree/javascript-libraries-syntax.vim]

## Code completion for Vim

This is what you might know as "autocomplete" or "Intellisense."

Vim has a built-in completion feature that you can trigger by just using
`<C-X>` (that's the `control-x` key) and then another control-key sequence like
`<C-F>` to complete filenames or `<C-O>` to trigger omni-completion. You should
try it before trying to install a bunch of plugins to modify this behavior.

### Omni completion

I won't go into too much detail about this since it isn't JavaScript specific.

Vim includes basic code completion built in. See [this wikia article] for
information on how to use that. The gist is that the completion system will
run a function, the `omnifunc`, to populate autocompletion pop-up with results.

To use the default completion function, you may need to add this to your
`.vimrc` file:

```vim
autocmd FileType javascript setlocal omnifunc=javascriptcomplete#CompleteJS
```

You might not need to add it if the `<C-X><C-O>` trigger already works for you,
it depends on what version of Vim and the Vim runtime you have.

For even better completion, consider using a plugin like
[Shougo/neocomplete.vim] or [Valloric/YouCompleteMe]. On Neovim, an option is
[Shougo/deoplete.nvim].  
These plugins will add features like automatically popping up the completion
menu, caching of keywords, and integration with other sources of completion
than what's in the current Vim buffer (allowing for multiple `omnifunc`s).

For portability across my systems without needing a recompile, I use
[Shougo/neocomplete.vim]. Shougo's plugins and YouCompleteMe both offer roughly
the same feature set, though, so whatever might be missing in one can probably
be configured into it.

With [Shougo/neocomplete.vim], using multiple sources of completion can be done
by providing a list of function names like so:

```vim
  let g:neocomplete#sources#omni#functions.javascript = [
        \   'jspc#omni',
        \   'tern#Complete',
        \ ]
```

I won't guarantee that the above works, since the plugins get updated regularly
and neocomplete does not like `omnifunc`s that move the cursor around when the
function is executed.

### Extended omni-completion

The plugin [1995eaton/vim-better-javascript-completion] provides a somewhat
up-to-date JavaScript with HTML5 methods (e.g. `localStorage` and `canvas`
methods).

This plugin creates a new omni-completion function, `js#CompleteJS`, and
replaces your current JS `omnifunc` with that. That means you'll have to use
a completion plugin or write some VimL yourself if you want to use it in
conjunction with another `omnifunc` like TernJS in the next section.

- [1995eaton/vim-better-javascript-completion]

### Code-analysis based completion via TernJS

TernJS is kind of like IntelliSense if you've ever used Visual Studio, or like
the autocompletion for many very robust IDEs. It parses your code and extracts
various symbols, like function names, variable names, and values.

The official vim plugin can also show you function signatures (what parameters
parameters it expects) and can extract values from related files (e.g. CommonJS
`require()`'d files) if you configure it to do so (via a `.tern-project`).

The completion is provided to Vim's auto-completion engine via an `omnifunc`,
`tern#Complete`. Again, you'll have to setup your `omnifunc` appropriately to
use TernJS results instead of the default omni-completion results.

Installing via [vim-plug], which can run additional commands before plugin
installation, is done like this:

```vim
Plug 'ternjs/tern_for_vim', { 'do': 'npm install' }
```

This will install its npm dependencies for you (Tern runs a node-based analyzer
in the background while you're editing).

I use this plugin with many of its extra features turned off, just keeping the
completion.

- [ternjs/tern_for_vim]

### Function parameter completion

othree has a plugin called JavaScript Parameter Complete that detects when
you're inside a function argument and provides some common autocomplete
suggestions for it. This is not a feature that TernJS provides, since Tern only
adds existing symbols. For example, if you're writing an event listener, it'll
suggest things like `click`, and `mouseover` for you. You can see all the
suggestions it provides in its [GitHub source](https://github.com/othree/jspc.vim/blob/master/autoload/jspc/javascript.vim).
Install the plugin via:

```vim
Plug 'othree/jspc.vim'
```

On load, the jspc.vim plugin automatically detects whatever `omnifunc` you
already have set as your default. It wraps it with the parameter completion,
and falls back to your default if you are not in a parameter completion.
Because of this you should specify `jspc#omni` _instead_ of whatever your
default completion is (typically `javascriptcomplete#CompleteJS`).

- [othree/jspc.vim]

## Code navigation

### Jumping between CommonJS modules

The plugin [moll/vim-node] adds keybindings like for jumping to files in your
CommonJS `require` statements.

```vim
Plug 'moll/vim-node'
```

- [moll/vim-node]

### CTags - Symbol based navigation

CTags are lists of all symbols in your projects (function names, variable names,
filenames, etc.). Vim provides ctag support by default, with keybindings to jump
to declarations and definitions, and there are a slew of plugins (e.g.
[ludovicchabant/vim-gutentags]) that can auto-generate the tags file for you.
Using [majutsushi/tagbar], [Shougo/unite.vim], [ctrlpvim/ctrlp.vim], or a bunch
of other plugins (and plugins that work with them -- plugin-plugins), you can
browse through those tags.

Of particular note on the generation side is [ramitos/jsctags], which will
generate ctags using TernJS.

Personally, I find ctags too annoying to use since the files need to be
regenerated to search them (except with [majutsushi/tagbar] which runs ctags
on every open, but only for the current file). Usually just using `git grep` or
[the_silver_searcher] is adequate, and there are plugins for those, too (out
of scope for this article).

- [ramitos/jsctags]

## Linting

While there are actually JSHint, JSLint, eslint, etc. runners for Vim, for your
own sanity just use [scrooloose/syntastic]. It supports a variety of syntax
checkers, but you may need to install them first. For example, for eslint
support, which is the standard these days, `npm install -g eslint` first.
Refer to syntastic's [wiki page on configuring various JavaScript linters].

Syntastic's pitfalls are that it is large (it is essentially a linter
framework for Vim) and it doesn't run asynchronously (doesn't mean it is slow
though -- depends on the speed of the lint program).

You could alternatively use Vim's built-in `makeprg`, which can run any program
and output the results to Vim, but you miss out on things like using multiple
`makeprg`s at a time (e.g. JSCS, eslint, and the flow type checker at once)
and grouping results. Syntastic actually uses makeprg under the covers, so
besides the minimal overhead of configuring some variables it really isn't
any slower.

There's [osyo-manga/vim-watchdogs], which runs linters asynchronously, but the
docs are only in Japanese. The plugins [Shougo/vimproc.vim] and
[tpope/vim-dispatch] can run any tool async, but they aren't easily
configurable as lint-runners. If you follow modern JS design patterns, your
JavaScript files should ideally be small modules so running linters
asynchronously won't provide noticeable benefit.

If you're running Neovim, [neomake](https://github.com/benekastah/neomake) is
an option that's gaining popularity. It makes full use of Neovim's asynchronous
job support.

- [scrooloose/syntastic]
- [osyo-manga/vim-watchdogs]
- [neomake](https://github.com/benekastah/neomake)

## Formatting

Vim has a built-in re-formatter for whitespace. Visually select some text and
use the `=` key to re-indent all of it.

For minified JS, there's a vim plugin, [vim-jsbeautify], that can run your code
through jsbeautifier for you. I personally don't use this and prefer to go to
the jsbeautifier website, copying and pasting it there if I need to un-minify
something.

There's also [Chiel92/vim-autoformat], which supports formatters for many
different languages. Of note is [jscs](http://jscs.info/) and
[js-beautifier](https://github.com/einars/js-beautify) support.

- [vim-jsbeautify]
- [Chiel92/vim-autoformat]

## My Vim setup

You can dig through [my Vim configuration on GitHub]. Please note that this
article was written a while ago, and since then I've completely switched over
to Neovim so a lot of the configuration may not apply to you. The plugins
I use are all in the main vimrc file, and their configurations are
interspersed into `plugin/`, `ftplugin/`, and `after/*/` to cope with the
order in which Vim loads files.

- [my Vim configuration on GitHub]



[vim-plug]: https://github.com/junegunn/vim-plug
[pangloss/vim-javascript]: https://github.com/pangloss/vim-javascript
[jelera/vim-javascript-syntax]: https://github.com/jelera/vim-javascript-syntax
[othree/yajs.vim]: https://github.com/othree/yajs.vim
[sheerun/vim-polyglot]: https://github.com/sheerun/vim-polyglot
[sheerun/yajs.vim]: https://github.com/sheerun/yajs.vim
[bigfish/vim-js-context-coloring]: https://github.com/bigfish/vim-js-context-coloring
[gavocanov/vim-js-indent]: https://github.com/gavocanov/vim-js-indent
[itspriddle/vim-javascript-indent]: https://github.com/itspriddle/vim-javascript-indent
[jiangmiao/simple-javascript-indenter]: https://github.com/jiangmiao/simple-javascript-indenter
[Ryan Fabella's indent script]: http://www.vim.org/scripts/script.php?script%5Fid=1936
[jason0x43/vim-js-indent]: https://github.com/jason0x43/vim-js-indent
[older indent script by Tye Zdrojewski]: http://www.vim.org/scripts/script.php?script_id=1840
[othree/es.next.syntax.vim]: https://github.com/othree/es.next.syntax.vim
[mxw/vim-jsx]: https://github.com/mxw/vim-jsx
[actually supports any of them]: https://github.com/mxw/vim-jsx/commit/80dbab7588c615126f47e50fa4d9c329d080ff95#diff-604ad63592f45d351d97cdc9eeae21a3R28
[elzr/vim-json]: https://github.com/elzr/vim-json
[othree/jsdoc-syntax.vim]: https://github.com/othree/jsdoc-syntax.vim
[heavenshell/vim-jsdoc]: https://github.com/heavenshell/vim-jsdoc
[itspriddle/vim-jquery]: https://github.com/itspriddle/vim-jquery
[othree/javascript-libraries-syntax.vim]: https://github.com/othree/javascript-libraries-syntax.vim
[this wikia article]: http://vim.wikia.com/wiki/Omni_completion
[Shougo/neocomplete.vim]: https://github.com/Shougo/neocomplete.vim
[Valloric/YouCompleteMe]: https://github.com/Valloric/YouCompleteMe
[1995eaton/vim-better-javascript-completion]: https://github.com/1995eaton/vim-better-javascript-completion
[Shougo/deoplete.nvim]: https://github.com/Shougo/deoplete.nvim
[ternjs/tern_for_vim]: https://github.com/ternjs/tern_for_vim
[othree/jspc.vim]: https://github.com/othree/jspc.vim
[moll/vim-node]: https://github.com/moll/vim-node
[ludovicchabant/vim-gutentags]: https://github.com/ludovicchabant/vim-gutentags
[majutsushi/tagbar]: https://github.com/majutsushi/tagbar
[Shougo/unite.vim]: https://github.com/Shougo/unite.vim
[ctrlpvim/ctrlp.vim]: https://github.com/ctrlpvim/ctrlp.vim
[ramitos/jsctags]: https://github.com/ramitos/jsctags
[the_silver_searcher]: https://github.com/ggreer/the_silver_searcher
[scrooloose/syntastic]: https://github.com/scrooloose/syntastic
[wiki page on configuring various JavaScript linters]: https://github.com/scrooloose/syntastic/wiki/JavaScript
[osyo-manga/vim-watchdogs]: https://github.com/osyo-manga/vim-watchdogs
[Shougo/vimproc.vim]: https://github.com/Shougo/vimproc.vim
[tpope/vim-dispatch]: https://github.com/tpope/vim-dispatch
[vim-jsbeautify]: https://github.com/maksimr/vim-jsbeautify
[Chiel92/vim-autoformat]: https://github.com/Chiel92/vim-autoformat
[my Vim configuration on GitHub]: https://github.com/davidosomething/dotfiles/tree/master/vim

