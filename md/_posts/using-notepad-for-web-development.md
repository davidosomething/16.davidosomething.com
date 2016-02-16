---
title: "Using Notepad++ for Web Development"
subheader: "Configuring the Notepad++ text editor my way"
datePublished: 2010-02-02T09:27:01+00:00
tags:
  - software
  - windows
slug: using-notepad-for-web-development
---
I like real IDEs for console and application programming, but for web
development I’ve always felt most comfortable using a text editor. Notepad++ is
my editor of choice because it is fast and feature rich.

![Notepad++ screenshot](/assets/img/posts/npp-350x238.png "Notepad++ screenshot")

### Editor Settings

Go to Settings -> Preferences to change the default settings for NP++.

I turn on Multi-Editing Settings, which allows you to make multiple selections
and edit them at the same time. Basically, this gives you multiple cursors that
output the same text. I switch the Folder Margin Style to Circle tree, just as
a preference. I also turn on the vertical edge, setting it to Line mode at 80
columns. There are plenty of other things to switch around if you just poke
around in there. Next, I go to Settings -> Style Configurator and change my
global font settings.

### Useful Plugins

The default interface of NP++ is perfectly fine for web development, but with
a few changes, it becomes much more powerful. One of the best things you can do
is enable the Explorer plugin. Plugins can be added by going to the Plugins
dropdown menu and using the Plugin Manager. Several plugins come installed by
default. I typically add to the defaults: Compare, Explorer, MultiClipboard,
Subversion, WebEdit, and XML Tools. Here are some tips regarding plugins:

1. Enable the Explorer and MultiClipboard plugins in their respective menus in
   the Plugins menu. Check the settings for these plugins to see what they can do.
1. If you use Subversion, the Compare plugin can do quick checks against the
   base. Or, with any of the Tortoise versioning tools and the Explorer plugin,
   you never need to leave NP++ to do your version control.
1. Turn on the Console Dialog if you need to do anything from the command line.
   It even has special variables you can use (type ‘help’). If you type `cmd`
   from the console, you get a standard DOS prompt.
1. WebEdit gives you buttons that turn NP++ to a web editor with code wrapping.
   Use it by highlighting some text and clicking a button. The text will
   automatically be wrapped in tags. Read the instructions in
   Notepad++pluginsdocWebEditWebEdit.txt to learn how to add more.

### Keyboard Shortcuts

There are a few gems I’ve really come to love: Ctrl-D to duplicate a line and
Ctrl-(Shift)-U to toggle case. I also add Ctrl-; as short date format (I always
liked that combination from Excel). The TextFX shortcuts are good things to map.
You can add keyboard shortcuts through Settings -> Shortcut Mapper.

