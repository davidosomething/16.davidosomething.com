---
title:      Time Input Interfaces
subheader:  
date:       2010-02-05T16:27:41+00:00
tags:
  - css
  - jquery
  - ui
hero:       
slug:       time-input-interfaces
permalink:  http://davidosomething.com/blog/time-input-interfaces/
---


<p>Digital clocks are better than analog clocks at telling time. You know it&#8217;s true<br />
and I won&#8217;t go into any more detail than that. Analog clocks still serve a very<br />
practical function, though: that of time input.<br />
Until voice command (the easiest form of time input) becomes a more prominent<br />
part of our lives, the tactile input of time is one of the more difficult<br />
things.</p>
<h3>The Problem</h3>
<p>Here are some examples of the hassle we have to put up with:</p>
<h4>iPhone</h4>
<div><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/iphone-alarm.png" alt="" title="iPhone Alarm Program" width="320" height="480" class="lazy lazy-hidden aligncenter size-full wp-image-40" /><noscript><img src="http://davidosomething.com/content/uploads/iphone-alarm.png" alt="" title="iPhone Alarm Program" width="320" height="480" class="aligncenter size-full wp-image-40" /></noscript></div>
<p>You have to drag or flick to pick your time.<br />
<strong>Pros:</strong> Infinite scroll if you miss it the first time. Combines input with result.<br />
<strong>Cons:</strong> You have to go SLOW to have a level of control/accuracy. End up going<br />
up and down really slow to get your hour/minute right.<br />
<strong>Quick fix:</strong> More space between each item.<br />
<span id="more-39"></span></p>
<h4>Android</h4>
<div><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/android-alarm.jpg" alt="" title="Android Alarm program" width="320" height="480" class="lazy lazy-hidden aligncenter size-full wp-image-42" /><noscript><img src="http://davidosomething.com/content/uploads/android-alarm.jpg" alt="" title="Android Alarm program" width="320" height="480" class="aligncenter size-full wp-image-42" /></noscript></div>
<p>Tap the plus/minus controls.<br />
<strong>Pros:</strong> Fine control.<br />
<strong>Cons:</strong> Cumbersome, would rather type.</p>
<h4>Windows (XP, but not much has changed)</h4>
<div><a href="http://davidosomething.com/content/uploads/windows-time.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/windows-time-350x300.png" alt="" title="Windows Time Set" width="350" height="300" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-43" /><noscript><img src="http://davidosomething.com/content/uploads/windows-time-350x300.png" alt="" title="Windows Time Set" width="350" height="300" class="aligncenter size-thumbnail wp-image-43" /></noscript></a></div>
<p>Select the field, type time or click the arrows.<br />
<strong>Pros:</strong> Analog clock shown with digital.<br />
<strong>Cons:</strong> Too hard to use in general.</p>
<h4>A popular jQuery plugin</h4>
<div><a href="http://davidosomething.com/content/uploads/jquery-time.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/jquery-time-350x254.png" alt="" title="jQuery Timepickr plugin" width="350" height="254" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-45" /><noscript><img src="http://davidosomething.com/content/uploads/jquery-time-350x254.png" alt="" title="jQuery Timepickr plugin" width="350" height="254" class="aligncenter size-thumbnail wp-image-45" /></noscript></a></div>
<p>Click the hour and minute.<br />
<strong>Pros:</strong> One click interface.<br />
<strong>Cons:</strong> Unfamiliar interface takes a second to register. Would take up a lot of<br />
screen space to show every minute.</p>
<h4>Outlook (2002, but, again, much has changed)</h4>
<div><a href="http://davidosomething.com/content/uploads/outlook-time.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/outlook-time-350x250.png" alt="" title="Outlook Meeting Scheduler" width="350" height="250" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-44" /><noscript><img src="http://davidosomething.com/content/uploads/outlook-time-350x250.png" alt="" title="Outlook Meeting Scheduler" width="350" height="250" class="aligncenter size-thumbnail wp-image-44" /></noscript></a></div>
<p>Use the dropdown.<br />
<strong>Pros:</strong> Obvious interface? I don&#8217;t know.<br />
<strong>Cons:</strong> Worst case scenarion is click to open -> click-and-drag to scroll -><br />
click to select.</p>
<h4>OSX (Leopard)</h4>
<div><a href="http://davidosomething.com/content/uploads/osx-time.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/osx-time-350x300.jpg" alt="" title="OSX Time" width="350" height="300" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-46" /><noscript><img src="http://davidosomething.com/content/uploads/osx-time-350x300.jpg" alt="" title="OSX Time" width="350" height="300" class="aligncenter size-thumbnail wp-image-46" /></noscript></a></div>
<p>OSX Time, either type/click, or drag the hands.<br />
<strong>Pros:</strong> Familiar interface. Drag the hands is intuitive!<br />
<strong>Cons:</strong> Too hard to click anything, too small, hands are too thin to target, and they overlap.</p>
<h3>Solution</h3>
<p>I feel that the one true solution for time picking would be inherently effective<br />
for both touch and mouse interfaces. This is what I propose:</p>
<ul>
<li>You first set the time by dragging the hour and minute hands near the time you<br />
want.</li>
<li>Clicking/tapping the center of the analog clock toggles AM/PM.</li>
<li>The hand overlap downfall (when hour and minute are on top of each other) is<br />
resolved by using giant, non-overlapping handles at the end of the hour and<br />
minute hands.</li>
<li>The digital clock updates in tandem with the analog one.</li>
<li>Use the digital inputs to fine tune.</li>
<li>Alternatively, you can use only the digital buttons, or type the time in<br />
the digital fields.</li>
</ul>
<p>With three (drag, tap, type) modes of input, you will always instinctively pick<br />
the one that is most convenient for your purpose.</p>
<p>I&#8217;ve already implemented the hard part&mdash;the analog clock&mdash;in jQuery<br />
here, and it is the only one of its kind AFAIK. The prototype is functioning in all major browsers:</p>
<div><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/timepicker-350x300.png" alt="" title="My jQuery Analog Time Picker" width="350" height="300" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-47" /><noscript><img src="http://davidosomething.com/content/uploads/timepicker-350x300.png" alt="" title="My jQuery Analog Time Picker" width="350" height="300" class="aligncenter size-thumbnail wp-image-47" /></noscript></div>
<p>See the demo at http://sandbox.hokuten.net/atimepicker</p>
<h3>Conclusion</h3>
<p>Maybe someone has already made this better, if so I wish it were more widely<br />
used. I hope this inspires someone to come up with an even better time input<br />
interface, or improve on mine.</p>

