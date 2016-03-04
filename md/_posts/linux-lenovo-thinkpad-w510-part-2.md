---
title: "Linux on the Lenovo ThinkPad W510 – Part 2"
subheader: "A one month retrospective on using linux, only, on my primary laptop"
datePublished: 2014-05-29T18:25:31+00:00
tags:
  - archlinux
  - Linux
  - mint
  - thinkpad
  - w510
slug: linux-lenovo-thinkpad-w510-part-2
---
I’m leaving Linux Mint 16 behind. The RC for Linux Mint 17 is out so maybe that
will fix some things, but the main problem I’ve had is with installing packages.
Apt just doesn’t cut it, especially when I think back to when I was using
ArchLinux. So I’m going back to Arch and the next post will be about that.

Apt’s greatest downfall is that as you add PPAs and when you start needing
multiple architectures, the dependency chain breaks and is almost impossible to
fix.

### Hardware Upgrades

Since I got the laptop, I’ve made some upgrades:

- I’ve upgraded the RAM to 16GB.
- I’ve completely replaced the keyboard with a new one since I got a refurb. The
  springy feeling is much better now.
- I took apart the casing and replaced the laptop display with a FHD one,
  1920×1080\. [This guide
  helped.](http://www.ifixit.com/Guide/Upgrading+the+Lenovo+ThinkPad+T520+Display/9763)
- I replaced the optical drive with a HDD caddy from Lenovo and put a second
  240GB SSD in there.

Who says a laptop isn’t upgradable? The screen in particular was super easy and
worthwhile.

### Display Calibration

One of the things I’ve yet to figure out is how to use the display calibrator.
The ThinkPad comes with a Huey Pro in the palm rest that is supposed to detect
the colors and calibrate the screen when the lid is closed. I’ve installed
[DispCalGui](http://dispcalgui.hoech.net/) but it goes straight to a gray screen
and I’m pretty sure the screen is turning off when I close the lid. The Huey Pro
is a detected device, though, so I’ll keep looking into it.

### Software

The ThinkVantage button can be mapped using the program
[tpb](http://www.thinkwiki.org/wiki/Tpb). I’m mapping it to open
a gnome-terminal. Can’t think of anything else I’d use it for.

