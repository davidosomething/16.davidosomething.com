---
slug:           whitespace-in-vim
title:          "Whitespace settings in Vim"
subheader:      "Getting whitespace to behave in Vim using settings and plugins"
datePublished:  2016-01-12
image:          "/assets/img/posts/Vimlogo.svg.png"
tags:
  - vim
  - plugins
  - whitespace
changelog:
  -
    date: 2016-02-06
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/717bbe2c1ebe6514da5d3ade5d860f47ac1db7c6"
    body: |
      - Found another EditorConfig plugin
  -
    date: 2016-02-05
    diff: "https://github.com/davidosomething/16.davidosomething.com/commit/8b464edcc24f3768af8cc1e86e1a87fb82e4b6a4"
    body: |
      - EditorConfig linking and unofficial VimScript version
---

For any good programmer, consistent whitespace is a measure of code-quality.
Vim has a lot of built-in settings and features for handling whitespace, and
this article will go over those with the examples the Vim help pages lack.

For the purposes of this article, tabs are represented as blocks of the
character: `░`.

## Settings

This section pertains to Vim's built-in settings flags. You can use
`:help 'somesettingname'` with single quotes from within in Vim to see the full
details, so the most useful information I can give is an example of how the
setting affects editing. (Why the Vim help pages don't include this? I don't
know.)

To turn a setting on or off, use `set settingname` or `set nosettingname` or
(`set settingname=0` to turn off numeric settings).

## Filetype-local settings

Use `setlocal` in an autocommand or `ftplugin` instead of `set` to make the
setting specific to the buffer. Example of using an autocommand to set
`shiftwidth` on JavaScript files only:

```vim
autocmd FileType javascript setlocal shiftwidth=2
```

Note that autocommands are executed in the order they are added, so if a plugin
decides to use that same autocommand to change the `shiftwidth` later, it will
override yours. That is why I recommend you using an ftplugin instead.

For the ftplugin version, put the line `setlocal shiftwidth=2` into the file
`~/.vim/after/ftplugin/javascript.vim`, where `javascript` is the name of the
filetype you're changing settings for.

A good understanding of the order in which Vim runs files and commands will
help you debug rogue whitespace settings.

> Don't just copy settings from someone else without understanding what they
> do.
> <div class="citation">&mdash; <cite>Everyone in #vim on Freenode</cite></div>

## Persistent file-local settings

To make special cases for a specific file, you can either make an autocommand
specifically to match the filename, or use Vim's `modeline` feature. You need
`set modeline` somewhere in your vimrc to make sure the feature is enabled.

A `modeline` is a comment (in the current syntax) at the beginning or end of
your file that Vim will parse commands from and execute. By default, Vim
assumes the command is `set`. Here's an example of setting the `modeline` in
a vimrc file:

```vim
" vim: set ai sw=4:
```

The double quote at the beginning indicates a VimL comment. This will set
`set autoindent` and `set shiftwidth=4` for the buffer. The use of the short
form is optional.

### Display options

These options affect how whitespace appears in Vim. If someone else were to
open your file, they might see something completely different based on their
display options.

#### list and listchars

The option `set list` will turn this feature on. This is used to highlight
trailing spaces, differentiate tabs from regular spaces, and show a
continuation symbol when you have `set nowrap` and a line is longer than the
window.

My options are:

```vim
set list
set listchars=""                      " reset
set listchars=tab:→\ 
set listchars+=trail:·
```

Note there is a trailing space after the backslash on the tab line (for
escaping the literal space symbol). So 4-character-wide tabs look like this:

```handlebars
    normal code indented with 4 spaces and no trailing spaces
→░░░→░░░code indented with two tabs and with two trailing spaces··
  normal code indented with 2 spaces and no trailing spaces
```

#### tabstop=NUMBER

A real tab will be this wide. E.g. `set tabstop=4`:

```handlebars
→░░░text
```

With `set tabstop=8`:

```handlebars
→░░░░░░░text
```

#### wrap

The `wrap` setting affects display lines. When it is off, text appears like so:

```handlebars
This option changes how text is displayed.  It doesn't change the text in the buffer, see 'textwidth' for that.
```

When it is on, text is displayed as:

```handlebars
This option changes how text is displayed.  It doesn't change the text in the
buffer, see 'textwidth' for that.
```

When you save the file, the text is saved as one long line -- this setting is
a display setting only.

### Whitespace in lines

These settings affect the actual text content of the file.

#### backspace

This affects what backspace deletes. With the following settings:

```vim
set backspace=indent,eol,start
```

Before backspace:

```handlebars
→░░░→░░░Code that was indented with two tabs
```

After backspace:

```handlebars
→░░░Code that was indented with two tabs
```

The indent can be deleted with backspace. Your settings for `expandtab`, and
`shiftwidth` will determine how many characters are deleted, so if you have
a `set tabstop=4` and `set shiftwidth=2` and you hit backspace, you will delete
two spaces from the tab, leaving a two space indent (if `expandtab` is on).

#### expandtab

Use spaces instead of tabs. This is a personal coding preference, and sometimes
dictated by your language, but I recommend turning this on (`set expandtab`)
for consistency and overriding it using an autocommand or filetype plugin
specific to whatever needs to use real tabs (`set noexpandtab`).

#### shiftwidth=NUMBER

This affects all of the auto-indenting settings like `cindent`. When you use
`>>` or `<<` to indent or un-indent a line it will remove this many spaces
(or tabs).

Before:

```handlebars
    Unindented when sw=2
    Unindented when sw=4
```

After:

```handlebars
  Unindented when sw=2
Unindented when sw=4
```

#### softtabstop=NUMBER

This tells Vim how many spaces or to insert when you hit `<Tab>` in insert
mode. If you use real tabs, it will insert spaces until the number of spaces
is equivalent to a `tabstop`, in which case it will merge that many spaces
into a single tab.

Example when `softtabstop=2` and for varying values of `tabstop`:

```handlebars
  Indented once, ts=4 sts=2
→░░░Indented twice, ts=4 sts=2
    Indented twice, ts=8 sts=2
```

When the **NUMBER** is negative (e.g. -1 or -2 or whatever), this will use the
value of `shiftwidth`. Since I use a `shiftwidth` of 2, I keep it at
`softtabstop=-2` so I know how much it counts for, even though it is using the
value from `shiftwidth`. This may have side effects on 3rd party plugins that
don't account for negative values, but I'd sooner fork the plugin than change
my value.

#### shiftround

This is for `>>` and `<<` indenting. Vim will round odd numbers of leading
spaces to the nearest `shiftwidth`.

Example of when `shiftround` is on, before:

```handlebars
   Three spaces with shiftwidth=4, indent me
```

After, the line gets indented to 4 spaces since that was the nearest
`shiftwidth`:

```handlebars
    Three spaces with shiftwidth=4, indent me
```

I have this setting off (`set noshiftround`) so I can control odd-numbers of
indents, particularly for cases like JSDoc blocks, where you have an extra
alignment space that you want to preserve:

```javascript
    /**
     * <-- alignment space left of asterisk
     */
```

Example of bad unindenting when `set expandtab` and `set shiftround` and you
use `<<` to unindent the JSDoc:

```javascript
  /**
    * <-- alignment space left of asterisk
    */
```

#### joinspaces

When you press `gj` in normal mode, vim takes the line below and moves it to
the end of the current line. With this setting on, Vim inserts spaces after
punctuation.

```handlebars
Before text. _
After text.
```

Becomes:

```handlebars
Before text._  After text.
```

When the `cpoptions` flag has J, it will become:

```handlebars
Before text. After text._
```

In all examples, the `_` is the cursor position.

You probably want to turn this off so you don't get extra spaces when coding.

### Indenting

#### autoindent

Starting from insert mode with:

```handlebars
    Indented line 1_
```

Pressing `<CR>` (Return/Enter) will put you at the next line, same indent
level:

```handlebars
    Indented line 1
    _
```

You probably want this on if you use `smartindent`.  
This setting is modified by `smartindent`, `cindent`, `indentexpr`, and
`paste`.

#### smartindent

This setting tells Vim to parse your code a little, and based on curly-braces
and keywords defined in the indent syntax for the filetype, it will add an
indent going from one line to another.

There are built-in exceptions for lines starting with the character `#`. For no
good reason, in my opinion.

Before:

```handlebars
    if (true) {_
```

After:

```handlebars
    if (true) {
        _
```

This setting modifies `autoindent`. It is recommended to use both of them
together for consistent behavior.

It is not applied when `cindent` is on or `indentexpr` is set.

#### cindent

This is more programmatic than `smartindent` and uses even more parsing and
some Vim options that can be defined in indent plugins. Your milage may vary
with this, so turn it on or off as desired. It produces pretty much the same
result as `smartindent` for C, but might not do anything for other languages
where the required Vim options like `cinkeys` aren't defined.

This setting modifies the formatting of `autoindent`.  
This setting supercedes `smartindent`.  
This setting is not applied when `indentexpr` is set.

I leave this off in favor of just `smartindent` since the languages I work in
aren't always as C-style.

#### indentexpr

This is typically set by indent plugins (including the ones provided by Vim) to
give programmatic rules for indenting. Unless you're writing custom logic to
indent code, you don't need to set it manually. These settings will override
`smartindent` and `cindent`, so indent plugins have the greatest priority in
determining how to indent.

The [indent plugin code for pangloss/vim-javascript] is a pretty clear example
of how `indentexpr` works -- basically it parses lines of code to determine
what the next line's indent should be.

#### copyindent

If you have mixed tabs and spaces for some reason, and you're a strict coder
when it comes to whitespace, the mix is probably intentional.

When using `autoindent` and the `copyindent` setting is on:

```handlebars
░░░░ ░░░░ code_
```

Will yield the following on the next line:

```handlebars
░░░░ ░░░░ code
░░░░ ░░░░ another line
```

When off, you'll get Vim's attempt to reconstruct the whitespace:

```handlebars
░░░░ ░░░░ code
░░░░░░░░  another line
```

This is a good setting to keep on if you like to control your own whitespace.

#### preserveindent

When this is on:

```handlebars
░░░░ ░░░░ unindentme
░░░░ ░░░░ indentme
░░░░  ░░░░ indentme
```

And you un-indent your code using `<<` or `>>`, you get:

```handlebars
░░░░ unindentme
░░░░ ░░░░ ░░░░ indentme
░░░░  ░░░░ ░░░░ indentme
```

Basically, Vim will keep your original indent pattern if you indent, and remove
as little as possible -- tabs first, and then spaces. In the last line, you'll
notice Vim detected the tab pattern as `<Tab><Space>` so it continues to add
both every time you indent.

I keep this setting on because I don't want Vim to change what I probably
intentially wrote -- which is the only scenario where I would intermix tabs and
spaces.

#### formatoptions and cpoptions

You definitely need to tweak these to your liking, but I think Vim's help info
is sufficient in this case since some visual samples are provided. Check out
`:help formatoptions`, `:help fo-table` and `:help cpoptions`.

## Plugins

Vim's built-in whitespace options may be enough for plain text and C code, but
for other languages, Vim supports indent plugins. There are many indent plugins
that come bundled with vim, and to automatically enable them use this line in
your vimrc:

```vim
filetype indent on
```

You may have `filetype plugin indent on`, which also loads the rest of the
filetype related plugins, so that's fine. If you're using [vim-plug] to manage
plugins, it will automatically turn the setting on after plugins have loaded,
so don't include the line in your vimrc or things will load twice!

### EditorConfig

I recommend using the [EditorConfig] standard for anyone working in open-source
or collaborating with others.

EditorConfig lets you define whitespace standards in an `.editorconfig` file
(but it's not [a linting plugin]!).  
The rules are grouped by file extension , and it will set the `expandtab`,
`shiftwidth`, `tabstop`, `softtabstop`, and other settings for you after you
open a file with a definition in the `.editorconfig` file you provide.

Many non-Vim text editors and IDEs support EditorConfig, too. This is
especially nice because you can keep the file along with your project and other
EditorConfig users will automatically be conforming to your whitespace
standards.

There are three EditorConfig plugins for Vim. The official one,
[editorconfig/editorconfig-vim] requires Vim to be compiled with Python support
(or takes some configuration to use a binary), so check in command mode
(`:has('python')` or `:has('python3')`) or starting vim with the `--version`
flag:

```bash
vim --version
```

An unofficial one, [sgur/vim-editorconfig], is written in pure VimScript so it
is technically slower, but for something so simple it is unnoticable. I use
this one myself.

There is another unofficial EditorConfig vim plugin written in pure VimScript:
[dahu/EditorConfig] -- but it is in alpha and the implementation does not
include all the EditorConfig features. Instead, it provides a `autocmd` hooks
so you can implement your own interpretation for things it does not implement
like `trim_trailing_whitespace` and `insert_final_newline`. I've checked out
the source code (as I have for all plugins I use) and it's quite well written
so if you want to implement the other features (or don't need them), it is a
viable option.

- [editorconfig/editorconfig-vim] is the official plugin
- [sgur/vim-editorconfig] is the unofficial one that I use
- [dahu/EditorConfig] is another unofficial one with `autocmd` hooks

### Auto-determine whitespace settings

As an alternative to editorconfig, Tim Pope's plugin [tpope/vim-sleuth] will
run through the current file or similar files and try to automatically
determine what `expandtab`, `shiftwidth`, etc. settings were used on them
during creation and set those on the current file. Another option is
[ciaranm/detectindent].

- [tpope/vim-sleuth] detects and applies settings on file open
- [ciaranm/detectindent] detects when you run `:DetectIndent`

### Better indent visibility

The `listchars` option is helpful, but sometimes it gets hard to look at
symbols, or you need a better way to distinguish your current indent level.
There are two _good_ plugins that can provide you with this. Check the links to
their GitHub repos for screenshots.

- [nathanaelkane/vim-indent-guides] changes the background color at each level
  of indent. I use this one and toggle it on/off as desired using its built-in
  commands.
- [Yggdroot/indentLine] actually inserts symbols at the start of each indent.
  This may have some performance problems on large files though, so I'd be wary
  of it.

### Better whitespace visibility

The plugin [ntpeters/vim-better-whitespace], similar to
[nathanaelkane/vim-indent-guides], uses syntax groups to match whitespace. This
plugin can set up very visible background colors for whitespace, making sure
you don't miss anything.

- [ntpeters/vim-better-whitespace]

### Line splitting

For a bunch of programming languages, you can put code all on one line. Using
native Vim, you'd have to manually press `<CR>` at points to properly break it
up into several lines (sure, you could automate it with macros or regex, but
every time is different).

The plugin [AndrewRadev/splitjoin.vim] adds mappings to automaticaly do
this for you (for certain syntaxes only). Check out the plugin's README to see
visual examples, and `doc/` on how to configure it.

- [AndrewRadev/splitjoin.vim]

### Alignment

There are some plugins that will reformat your code for you by adding
whitespace to align things together. See each page for examples:

- [tommcdo/vim-lion]
- [junegunn/vim-easy-align]
- [godlygeek/tabular]

## My Vim setup

You can dig through [my Vim configuration on GitHub]. My whitespace settings
and the plugins I use are all in the main vimrc file, and their configurations
are interspersed into `plugin/`, `ftplugin/`, and `after/*/` to cope with the
order in which Vim loads files.

- [my Vim configuration on GitHub]



[vim-plug]: https://github.com/junegunn/vim-plug
[indent plugin code for pangloss/vim-javascript]: https://github.com/pangloss/vim-javascript/blob/master/indent/javascript.vim
[a linting plugin]: https://github.com/sirbrillig/mixedindentlint
[EditorConfig]: http://editorconfig.org
[editorconfig/editorconfig-vim]: https://github.com/editorconfig/editorconfig-vim
[sgur/vim-editorconfig]: https://github.com/sgur/vim-editorconfig
[dahu/EditorConfig]: https://github.com/dahu/EditorConfig
[tpope/vim-sleuth]: https://github.com/tpope/vim-sleuth
[ciaranm/detectindent]: https://github.com/ciaranm/detectindent
[nathanaelkane/vim-indent-guides]: https://github.com/nathanaelkane/vim-indent-guides
[Yggdroot/indentLine]: https://github.com/Yggdroot/indentLine
[ntpeters/vim-better-whitespace]: https://github.com/ntpeters/vim-better-whitespace
[AndrewRadev/splitjoin.vim]: https://github.com/AndrewRadev/splitjoin.vim
[tommcdo/vim-lion]: https://github.com/tommcdo/vim-lion
[junegunn/vim-easy-align]: https://github.com/junegunn/vim-easy-align
[godlygeek/tabular]: https://github.com/godlygeek/tabular
[my Vim configuration on GitHub]: https://github.com/davidosomething/dotfiles/tree/master/vim

