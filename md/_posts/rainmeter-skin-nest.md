---
title:      Rainmeter Skin - Nest
subheader:  
date:       2010-06-26T00:43:53+00:00
tags:
  - config
  - Rainmeter
  - skin
  - twitter
hero:       
slug:       rainmeter-skin-nest

---


<p><a href="http://davidosomething.com/content/uploads/nest2.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/nest2-350x300.jpg" alt="" title="nest names below" width="350" height="300" class="lazy lazy-hidden alignright size-thumbnail wp-image-380" /><noscript><img src="http://davidosomething.com/content/uploads/nest2-350x300.jpg" alt="" title="nest names below" width="350" height="300" class="alignright size-thumbnail wp-image-380" /></noscript></a><strong>Updated 2010-06-26 10:52 PM</strong> &#8212; added alternate config (nest-namebelow.ini) with tweets below names so you can see more. See screenshot.</p>
<p><strong>Updated 2010-06-26 5:07 PM</strong> &#8212; packaged as rmskin, showing 6 tweets<br />
<strong>Updated 2010-06-26 3:44 AM</strong> &#8212; fixed ClipString</p>
<p>I&#8217;ve gotten interested in customizing my desktop with <a href="http://rainmeter.net/">Rainmeter</a> again, and this time I went as far as to make a Rainmeter skin.<br />
It&#8217;s using a similar style to the <a href="http://fediafedia.deviantart.com/art/TEASER-WP7-for-Rainmeter-158206288?q=1&#038;qo=1">WP7 skin here</a>, but I wrote it from the ground up just to learn.</p>
<p>Here&#8217;s what it looks like in contrast to WP7:<br />
<a href="http://davidosomething.com/content/uploads/nest.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/nest.jpg" alt="" title="nest Rainmeter Skin" width="519" height="600" class="lazy lazy-hidden alignleft size-full wp-image-371" /><noscript><img src="http://davidosomething.com/content/uploads/nest.jpg" alt="" title="nest Rainmeter Skin" width="519" height="600" class="alignleft size-full wp-image-371" /></noscript></a></p>
<h3>Download</h3>
<p>nest.rmskin &#8211; 4kb<br />
Please leave a comment or suggestions if you download it!</p>
<h3>Installation</h3>
<p>Download and run the rmskin file. Rainstaller should put everything in the right place for you.</p>
<p>Then right click on the skin on your desktop and choose Edit Skin&#8230; from the Skin menu. Notepad will open up with the skin ini file. Fill in the username and password (lines 32&ndash;33):</p>
<pre class="brush: plain">
TWITTER_USERNAME = "YourTwitterUsernameHere"
TWITTER_PASSWORD = "YourTwitterPasswordHere"
</pre>
<p>Not that it&#8217;s hard to figure out, but I wouldn&#8217;t change much else unless you know what you&#8217;re doing.</p>
<p>Finally, do a &#8220;Refresh&#8221; (middle click the skin) or restart Rainmeter.</p>
<h3>Usage</h3>
<p>Clicking the name will open up the user&#8217;s twitter page.<br />
Clicking on a tweet will open that tweet in your browser.<br />
You can middle click on any part to refresh the skin.<br />
The skin will auto-refresh every 600 milliseconds. You can change the interval by editing the code, look for line 10:<br />
<code>Update = 600</code><br />
And line 108:<br />
<code>UpdateRate = 600</code><br />
The first one is the refresh interval of the widget, and the second one is the polling time for twitter.com.</p>
<h3>Known bugs</h3>
<p>I&#8217;d appreciate if anyone could help with these:</p>
<ul>
<li>FIXED <del><code>ClipString = 1</code> doesn&#8217;t add elipses. In fact, it doesn&#8217;t work at all. For some reason the tweets are just truncated after a certain width.</del></li>
<li>Can&#8217;t add plain text meters below the tweets. I wanted to add four more tweets without avatars at the bottom, but they don&#8217;t show up. Something wrong with positioning?</li>
</ul>

