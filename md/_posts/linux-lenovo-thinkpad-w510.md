---
title:      Linux on the Lenovo ThinkPad W510
subheader:  A post on this laptop's configuration and use.
datePublished:     2014-05-01T22:15:13+00:00
tags:
  - cinnamon
  - Linux
  - mint
  - thinkpad
  - w510
hero:       
slug:       linux-lenovo-thinkpad-w510

---


<p>I bought a crappy PC laptop as a backup since my MacBook&#8217;s been failing. I&#8217;ve gone full Linux on it since I spend most of the day in a terminal and browser, so except for Photoshop I&#8217;m comfortable. I&#8217;ll probably buy a new MacBook when they release 2014 Pro Retina ones. Until then, I&#8217;ll document my experience here.</p>
<p>First off, I&#8217;m running <a href="http://www.linuxmint.com/" target="_blank">Linux Mint 16 Petra with the Cinnamon Desktop Environment</a>. I&#8217;ve got to say, it&#8217;s really pretty in comparison to Windows 7 that the laptop came with and Windows 8.1 that my Shuttle PC is now running.</p>
<h2>Fixes I&#8217;ve had to make</h2>
<h3>Brightness Controls</h3>
<p>The brightness keys cause Linux to crash. Also, software controls like panel widgets don&#8217;t work. Despite <a href="http://www.thinkwiki.org/wiki/Category:W510" target="_blank">it saying not to on thinkwiki.org</a>, the <var>EnableBrightnessControl</var> registry flag was the right way to enable brightness controls. Switching to a virtual console, changing the brightness, and switching back worked&#8230; except that Cinnamon DE crashed upon returning to it.</p>
<p>Here&#8217;s what your <var>/etc/X11/xorg.conf</var> file should look like:</p>
<pre><code>Section "Device"
  Identifier "Device0"
  Driver "nvidia"
  VendorName "NVIDIA Corporation"
  BoardName "Quadro FX 880M"
  Option "RegistryDwords" "EnableBrightnessControl=1"
EndSection</code></pre>
<h3>Keyboard Mapping</h3>
<p>I don&#8217;t use Caps Lock. I always remap it to Control. To do this in Linux Mint 16, you need to go to the Regional &amp; Language settings, Keyboard Layouts, and Options in there. Don&#8217;t change &#8220;Caps Lock key behavior&#8221; &#8212; change &#8220;Ctrl key position&#8221; and add &#8220;Caps Lock as Ctrl&#8221; there. This is so your Caps Lock key doesn&#8217;t have two KeySyms associated with it (if you&#8217;re familiar with &lt;var&gt;.XModmap&lt;/var&gt; settings). Additionally you can add pressing both Shift keys at once to toggle Caps Lock in the &#8220;Miscellaneous compatibility options.&#8221;</p>
<p>The mdm display manager doesn&#8217;t run &lt;var&gt;.XModmap&lt;/var&gt; and it&#8217;ll take a lot more effort than it&#8217;s worth to modify the XClient/.Xsession setup that Mint provides, so I went with the gui setting in this case.</p>
<h3>Suspend Mode</h3>
<p>I use the proprietary nVidia graphics driver for full 3d support. There system freezes when resuming from suspend. To fix that, add this line to the file <var>/etc/pm/config.d/unload_modules</var> (you may have to create it):</p>
<pre><code>SUSPEND_MODULES="$SUSPEND_MODULES nvidia"</code></pre>

