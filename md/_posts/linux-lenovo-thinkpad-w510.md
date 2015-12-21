---
title: "Linux on the Lenovo ThinkPad W510"
subheader: "A post on configuring and using an old Lenovo ThinkPad W510."
datePublished: 2014-05-01T22:15:13+00:00
tags:
  - cinnamon
  - Linux
  - mint
  - thinkpad
  - w510
slug: linux-lenovo-thinkpad-w510
---
I bought a crappy PC laptop as a backup since my MacBook’s been failing. I’ve
gone full Linux on it since I spend most of the day in a terminal and browser,
so except for Photoshop I’m comfortable. I’ll probably buy a new MacBook when
they release 2014 Pro Retina ones. Until then, I’ll document my experience here.

First off, I’m running [Linux Mint 16 Petra with the Cinnamon Desktop
Environment](http://www.linuxmint.com/). I’ve got to say, it’s really pretty in
comparison to Windows 7 that the laptop came with and Windows 8.1 that my
Shuttle PC is now running.

## Fixes I’ve had to make

### Brightness Controls

The brightness keys cause Linux to crash. Also, software controls like panel
widgets don’t work. Despite [it saying not to on
thinkwiki.org](http://www.thinkwiki.org/wiki/Category:W510), the
<var>EnableBrightnessControl</var> registry flag was the right way to enable
brightness controls. Switching to a virtual console, changing the brightness,
and switching back worked… except that Cinnamon DE crashed upon returning to it.

Here’s what your <var>/etc/X11/xorg.conf</var> file should look like:

```coffee
Section "Device"
  Identifier "Device0"
  Driver "nvidia"
  VendorName "NVIDIA Corporation"
  BoardName "Quadro FX 880M"
  Option "RegistryDwords" "EnableBrightnessControl=1"
EndSection
```

### Keyboard Mapping

I don’t use Caps Lock. I always remap it to Control. To do this in Linux Mint
16, you need to go to the Regional & Language settings, Keyboard Layouts, and
Options in there. Don’t change “Caps Lock key behavior” — change “Ctrl key
position” and add “Caps Lock as Ctrl” there. This is so your Caps Lock key
doesn’t have two KeySyms associated with it (if you’re familiar with
<var>.XModmap</var> settings). Additionally you can add pressing both Shift keys
at once to toggle Caps Lock in the “Miscellaneous compatibility options.”

The mdm display manager doesn’t run <var>.XModmap</var> and it’ll take a lot
more effort than it’s worth to modify the XClient/.Xsession setup that Mint
provides, so I went with the gui setting in this case.

### Suspend Mode

I use the proprietary nVidia graphics driver for full 3d support. There system
freezes when resuming from suspend. To fix that, add this line to the file
<var>/etc/pm/config.d/unload_modules</var> (you may have to create it):

```bash
SUSPEND_MODULES="$SUSPEND_MODULES nvidia"
```

