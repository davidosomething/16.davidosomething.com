---
slug:           vim-for-javascript
title:          "Setting up Vim for JavaScript development"
subheader:      "Comparisons and information for useful JavaScript-specific plugins"
datePublished:  2016-01-09
image:          "/assets/img/posts/Vimlogo.svg.png"
tags:
  - vim
  - plugins
  - javascript
  - tern
---

### Updates

- Jan 11, 2016
    > Update omni-completion with basic info on how `omnifunc` works and
    > added [1995eaton/vim-better-javascript-completion].

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

```viml
filetype plugin indent on
```

This will enable filetype detection, running filetype specific plugins, and
loading filetype specific indentation settings.

You may also need to enable syntax highlighting in your vimrc file if you're not
using [vim-plug]. To manually enable syntax highlighting, add the following line
to your vimrc file:

```viml
syntax enable
```

### Plugins that provide better syntax support

The standard JavaScript syntax highlighting is typically adequate, but you may
want more features such as ES2015 support, or better distinguishing of keywords.

There are quite a few options:

- [pangloss/vim-javascript]
    - Includes custom indent settings
    - Adds special concealing symbols so to make your code pretty at a glance
    - Not frequently updated (maybe once a month with many months in between
      periods of activity).
- [jelera/vim-javascript-syntax]
    - Does not include custom indent settings
    - Updated about once a month according to the GitHub contributors graph
- [othree/yajs.vim]
    - This is a fork of `jelera/vim-javascript-syntax`
    - Does not include custom indent settings
    - Updated very often
- [sheerun/vim-polyglot], or [sheerun/yajs.vim]
    - This is a plugin that bundles a bunch of language syntax plugins into one.
      It particularly includes `sheerun/yajs.vim`, which is an outdated mirror
      of `othree/yajs.vim`.

All of these provide ES2015 (ES6) and JSDoc support to varying degrees. Of
these, I personally use and recommend `othree/yajs.vim` since it has most
up-to-date language support. The author also writes a few other plugins that can
be used in conjunction with it (although they may work with the other syntaxes
too.

Using [vim-plug], I recommend installing the plugin like this:

```viml
Plug 'othree/yajs.vim`, { 'for': 'javascript' }
```

The additional requirement at the end makes sure the syntax plugin is loaded in
a Vim autocommand based on filetype detection (as opposed to relying on Vim's
`runtimepath` based sourcing mechanism. This way the main Vim syntax plugin
will have already run, and the plugin's syntax will override it.

### Plugins that provide better indentation support

Vim's bundled JavaScript indent may be enough for you, especially if you use
a strictly C-style whitespace (Vim's indent options even call themselves
`cindent`).

Some notable options in this case are:

- [pangloss/vim-javascript]
    - Using this entire syntax plugin will provide you with a more JavaScripty
      indent for things like switch/case and multi-line var declarations.
- [gavocanov/vim-js-indent]
    - This is the indent portion of `pangloss/vim-javascript`, ripped out into
      its own plugin.
- [itspriddle/vim-javascript-indent]
    - This is a git mirror of [Ryan Fabella's indent script]
    - It mostly detects closing brackets and parentheses and indents based on
      that.
- [jiangmiao/simple-javascript-indenter]
    - An indent plugin with an option for alignment under functions.

Since I use `othree/yajs.vim` for my syntax, I tack on pangloss's indent via the
`gavocanov/vim-js-indent plugin`.

## Related syntaxes

During JavaScript development you may find yourself editing a lot of other
filetypes that plain JavaScript.

### es.next / ES2016 / ES7 support

othree has a syntax plugin that provides support for planned, but not-yet-final
EcmaScript features: [othree/es.next.syntax.vim]. I personally don't use it
since I currently stick to the ES2015 at most.

- [othree/es.next.syntax.vim]

### JSX support for React

If you write React and use its optional JSX syntax, adding the following plugin
will provide you with syntax highlighting for those inline XML-nodes:

```viml
Plug 'mxw/vim-jsx'
```

This plugin requires a JavaScript syntax plugin from above to define certain
JavaScript regions. It specifically mentions pangloss' extension in the docs but
[actually supports any of them].

- [mxw/vim-jsx]

### JSON

A lot of things use JSON for configuration, so I recommend [elzr/vim-json] for
that. Check out its options, I don't like some of the defaults so I turn them
off, but you might want them:

```viml
Plug 'elzr/vim-json'
```

- [elzr/vim-json]

### JSDoc

If you document using JSDoc, all of the syntax plugins above support JSDoc
already. There's a plugin called `othree/jsdoc-syntax.vim` that pulls that
support out of `othree/yajs.vim`, but it is only for adding JSDoc support to
_other_ languages like TypeScript.

- [othree/jsdoc-syntax.vim]

### jQuery Plugins

Files named `jquery.*.js` are typically jQuery plugins. There's a specific
syntax highlighting plugin for such files: `itspriddle/vim-jquery`, but it's
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

## JavaScript code completion for Vim

### Omni completion

I won't go into too much detail about this since it isn't JavaScript specific.

Vim includes basic code completion built in. See [this wikia article] for
information on how to use that. The gist is that the completion system will
run a function, the `omnifunc`, to populate the pop-up it with results.

To use the default completion function, add this to your `vimrc`:

```viml
set omnifunc=javascriptcomplete#CompleteJS
```

For even better completion, consider using a plugin like
[Shougo/neocomplete.vim] or [Valloric/YouCompleteMe]. On Neovim, an option is
[Shougo/deoplete.nvim].  
These plugins will add features like automatically popping up the completion
menu, caching of keywords, and integration with other sources of completion
(allowing for multiple `omnifunc`s) than what's in the current Vim buffer.

For portability across my systems without needing a recompile, I use
`Shougo/neocomplete.vim`. They're both offer roughly the same feature set,
though, so whatever might be missing in one can probably be configured into it.

### Extended omni-completion

The plugin [1995eaton/vim-better-javascript-completion] provides a somewhat
up-to-date JavaScript with HTML5 methods (e.g. `localStorage` and `canvas`
methods).

This plugin creates a new omni-completion function, `js#CompleteJS`, and
replaces your current JS omnifunc with that. That means you'll have to use
a completion plugin or write some VimL yourself if you want to use it in
conjunction with another `omnifunc` like TernJS in the next section.

- [1995eaton/vim-better-javascript-completion]

### Code-analysis based completion via TernJS

TernJS is kind of like IntelliSense if you've ever used Visual Studio, or like
the autocompletion for many very robust IDEs. It parses your code and extracts
various symbols, like function names, variable names, and values.

The official vim plugin can also show you function signatures (what parameters
parameters it expects) and can extract values from related files if you
configure it to do so (via a `.tern-project`).

The completion is provided to Vim's auto-completion engine via an `omnifunc`,
`tern#Complete`. Again, you'll have to setup your `omnifunc` appropriately to
use TernJS results instead of the default omni-completion results.

Installing via [vim-plug], which can run additional commands before plugin
installation, is done like this:

```viml
Plug 'marijnh/tern_for_vim', { 'do': 'npm install' }
```

This will install its npm dependencies for you (Tern runs a node-based analyzer
in the background while you're editing).

I use this plugin with many of its extra features turned off, just keeping the
completion.

- [marijnh/tern_for_vim]

### Function parameter completion

othree has a plugin called JavaScript Parameter Complete that detects when
you're inside a function argument and provides some common autocomplete
suggestions for it. This is not a feature that TernJS provides, since Tern only
adds existing symbols. For example, if you're writing an event listener, it'll
suggest things like `click`, and `mouseover` for you. You can see all the
suggestions it provides in its [GitHub source](https://github.com/othree/jspc.vim/blob/master/autoload/jspc/javascript.vim).
Install the plugin via:

```viml
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

The plugin [moll/vim-node] adds keybindings for jumping to files in your
CommonJS `require` statements.

```viml
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

- [ramitos/jsctags]

## Linting

While there are actually JSHint, JSLint, eslint, etc. runners for Vim, for your
own sanity just use [scrooloose/syntastic]. It supports a variety of syntax
checkers, but you may need to install them first. Refer to its
[wiki page on configuring various JavaScript linters].

There's also [osyo-manga/vim-watchdogs], which runs linters asynchronously, but
the docs are only in Japanese. The plugins [Shougo/vimproc.vim] and
[tpope/vim-dispatch] can run any tool async, but
it isn't easily configurable as a lint-runner.

If you're running Neovim, [neomake](https://github.com/benekastah/neomake) is
an option.

- [scrooloose/syntastic]

## Formatting

Vim has a built-in reformatter for whitespace. Visually select some text and
use the `=` key to re-indent all of it.

For minified JS, there's a vim plugin, [vim-jsbeautify], that can run your code
through jsbeautifier for you. I personally don't use this and prefer to go to
the jsbeautifier website, copying and pasting it there if I need to un-minify
something.

- [vim-jsbeautify]

## My Vim setup

You can dig through [my Vim configuration on GitHub]. The plugins I use are
all in the main `vimrc` file, and their configurations are interspersed into
`plugin/`, `ftplugin/`, and `after/*/` to cope with the order in which Vim loads
files.

- [my Vim configuration on GitHub]



[vim-plug]: https://github.com/junegunn/vim-plug
[pangloss/vim-javascript]: https://github.com/pangloss/vim-javascript
[jelera/vim-javascript-syntax]: https://github.com/jelera/vim-javascript-syntax
[othree/yajs.vim]: https://github.com/othree/yajs.vim
[sheerun/vim-polyglot]: https://github.com/sheerun/vim-polyglot
[sheerun/yajs.vim]: https://github.com/sheerun/yajs.vim
[gavocanov/vim-js-indent]: https://github.com/gavocanov/vim-js-indent
[itspriddle/vim-javascript-indent]: https://github.com/itspriddle/vim-javascript-indent
[jiangmiao/simple-javascript-indenter]: https://github.com/jiangmiao/simple-javascript-indenter
[Ryan Fabella's indent script]: http://www.vim.org/scripts/script.php?script%5Fid=1936
[othree/es.next.syntax.vim]: https://github.com/othree/es.next.syntax.vim
[mxw/vim-jsx]: https://github.com/mxw/vim-jsx
[actually supports any of them]: https://github.com/mxw/vim-jsx/commit/80dbab7588c615126f47e50fa4d9c329d080ff95#diff-604ad63592f45d351d97cdc9eeae21a3R28
[elzr/vim-json]: https://github.com/elzr/vim-json
[othree/jsdoc-syntax.vim]: https://github.com/othree/jsdoc-syntax.vim
[itspriddle/vim-jquery]: https://github.com/itspriddle/vim-jquery
[othree/javascript-libraries-syntax.vim]: https://github.com/othree/javascript-libraries-syntax.vim
[this wikia article]: http://vim.wikia.com/wiki/Omni_completion
[Shougo/neocomplete.vim]: https://github.com/Shougo/neocomplete.vim
[Valloric/YouCompleteMe]: https://github.com/Valloric/YouCompleteMe
[1995eaton/vim-better-javascript-completion]: https://github.com/1995eaton/vim-better-javascript-completion
[Shougo/deoplete.nvim]: https://github.com/Shougo/deoplete.nvim
[marijnh/tern_for_vim]: https://github.com/marijnh/tern_for_vim
[othree/jspc.vim]: https://github.com/othree/jspc.vim
[moll/vim-node]: https://github.com/moll/vim-node
[ludovicchabant/vim-gutentags]: https://github.com/ludovicchabant/vim-gutentags
[majutsushi/tagbar]: https://github.com/majutsushi/tagbar
[Shougo/unite.vim]: https://github.com/Shougo/unite.vim
[ctrlpvim/ctrlp.vim]: https://github.com/ctrlpvim/ctrlp.vim
[ramitos/jsctags]: https://github.com/ramitos/jsctags
[scrooloose/syntastic]: https://github.com/scrooloose/syntastic
[wiki page on configuring various JavaScript linters]: https://github.com/scrooloose/syntastic/wiki/JavaScript
[osyo-manga/vim-watchdogs]: https://github.com/osyo-manga/vim-watchdogs
[Shougo/vimproc.vim]: https://github.com/Shougo/vimproc.vim
[tpope/vim-dispatch]: https://github.com/tpope/vim-dispatch
[vim-jsbeautify]: https://github.com/maksimr/vim-jsbeautify
[my Vim configuration on GitHub]: https://github.com/davidosomething/dotfiles/tree/master/vim
