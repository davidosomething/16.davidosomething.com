---
title:      Linux on the Lenovo Thinkpad W510 &#8211; Part 3
subheader:  NVidia 340.xx Legacy Driver Updates
date:       2014-10-30T21:45:11+00:00
tags:
  - archlinux
  - Linux
  - thinkpad
  - w510
hero:       
slug:       linux-lenovo-thinkpad-w510-part-3
permalink:  http://davidosomething.com/blog/linux-lenovo-thinkpad-w510-part-3/
---


<p>The NVidia drivers after 343.22 no longer support the NVidia Quadro FX 880M GPU for the ThinkPad W510 so I had to switch to legacy drivers (340-xx).</p>
<p>To get everything working again, I make some changes to my kernel mode settings and my xorg.conf. In <var>/boot/syslinux/syslinux.cfg</var> and <var>/etc/xorg.conf.d/20-nvidia.conf</var> I am now using this:</p>
<p><script src="https://gist.github.com/davidosomething/87171683d589981225a1.js"></script></p>
<p>And in the <var>syslinux.cfg</var> the line <code>DEFAULT arch</code> is now <code>DEFAULT archnvidia</code> to default to the new kernel settings.</p>
