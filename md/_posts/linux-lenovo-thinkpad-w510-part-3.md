---
title: "Linux on the Lenovo Thinkpad W510 – Part 3"
subheader: "ArchLinux NVidia 340.xx Legacy Driver Updates"
datePublished: 2014-10-30T21:45:11+00:00
tags:
  - archlinux
  - Linux
  - thinkpad
  - w510
slug: "linux-lenovo-thinkpad-w510-part-3"
---
The NVidia drivers after 343.22 no longer support the NVidia Quadro FX 880M GPU
for the ThinkPad W510 so I had to switch to legacy drivers (340-xx).

To get everything working again, I make some changes to my kernel mode settings
and my xorg.conf. In <var>/boot/syslinux/syslinux.cfg</var> and
<var>/etc/xorg.conf.d/20-nvidia.conf</var> I am now using this:

<script src="https://gist.github.com/davidosomething/87171683d589981225a1.js"></script>

And in the <var>syslinux.cfg</var> the line <code>DEFAULT arch</code> is now
<code>DEFAULT archnvidia</code> to default to the new kernel settings.

