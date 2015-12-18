---
title: Tips for Faster PSD to HTML Conversions
datePublished: "2010-02-27T21:33:38+00:00"
tags:
  - css
  - photoshop
slug: tips-faster-psd-html-conversions
---


<p>Ever wonder how those PSD to HTML services do the job with such a quick turnaround, sometimes guaranteeing valid code in 24 hours on even the most complex PSDs? The task is roughly 40% breaking up the PSD logically, 20% coding, and 40% moving elements around until everything fits together. Here are some tips I&#8217;ve learned from years of experience and trying to find new techniques in those tutorials the web has too many of.</p>
<h3>Contents</h3>
<ol>
<li><a href="#tffpthc_1">Photoshop Techniques</a></p>
<ol>
<li><a href="#tffpthc_2">Save for Web</a></li>
<li><a href="#tffpthc_3">Convert to Smart Object</a></li>
<li><a href="#tffpthc_4">Selecting Layers</a></li>
<li><a href="#tffpthc_5">Copy merged</a></li>
<li><a href="#tffpthc_6">Slicing’s other use</a></li>
<li><a href="#tffpthc_7">Actions</a></li>
<li><a href="#tffpthc_8">Text</a></li>
<li><a href="#tffpthc_9">Flattened Versions</a></li>
</ol>
</li>
<li><a href="#tffpthc_10">Creating the HTML and CSS</a>
<ol>
<li><a href="#tffpthc_11">Frameworks and Resets</a></li>
<li><a href="#tffpthc_12">Quickly get Image Dimensions</a></li>
</ol>
</li>
<li><a href="#tffpthc_13">Design in Firefox</a>
<ol>
<li><a href="#tffpthc_14">HTML Validator</a></li>
<li><a href="#tffpthc_15">Web Developer</a></li>
<li><a href="#tffpthc_16">Computed Sizes with Firebug</a></li>
<li><a href="#tffpthc_17">In Place CSS Editing with Firebug and the Arrow Keys</a></li>
<li><a href="#tffpthc_18">Pixel Perfect and Inverted Overlays</a></li>
</ol>
</li>
<li><a href="#tffpthc_19">Closing</a></li>
<li><a href="#tffpthc_20">References</a></li>
</ol>
<p><span id="more-207"></span></p>
<h3 id="tffpthc_1">Photoshop Techniques</h3>
<p>I usually start a conversion by preparing the assets. Working with the design first (as opposed to starting with the framework) also gives me a better sense of where everything goes.</p>
<h4 id="tffpthc_2">Save for Web</h4>
<p><a href="http://davidosomething.com/content/uploads/saveforweb.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/saveforweb-350x300.jpg" alt="Save For Web Dialog" title="Save For Web Dialog" width="350" height="300" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-217" /><noscript><img src="http://davidosomething.com/content/uploads/saveforweb-350x300.jpg" alt="Save For Web Dialog" title="Save For Web Dialog" width="350" height="300" class="aligncenter size-thumbnail wp-image-217" /></noscript></a> Alt+Ctrl+Shift+S, or on Macs, Cmd+Opt+Shift+S. This is the key combination you&#8217;ll use to save every piece of the PSD you&#8217;re going to use for your design. From the Save for Web window, you can choose the best filetype for the image you&#8217;re saving based on quality and size.</p>
<h4 id="tffpthc_3">Convert to Smart Object</h4>
<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/converttosmartobject.png" alt="Convert to Smart Object" title="Convert to Smart Object" width="199" height="66" class="lazy lazy-hidden alignright size-full wp-image-218" /><noscript><img src="http://davidosomething.com/content/uploads/converttosmartobject.png" alt="Convert to Smart Object" title="Convert to Smart Object" width="199" height="66" class="alignright size-full wp-image-218" /></noscript> For groups of layers (including text) that doesn&#8217;t use layer blending options and aren&#8217;t affected by adjustment layers, select the layers and/or groups involved and convert them to a Smart Object. A Smart Object is a temporary vector object that you can modify as a separate file (a PSB file). The modifications will appear in the original PSD. Double click on the smart object in the layers menu to edit it as if it were a new image. From the Smart Object edit window, you can Save for Web.</p>
<h4 id="tffpthc_4">Selecting Layers</h4>
<p>Ctrl+Click on the layer thumbnail to select the contents of the layer. This beats using the wand tool or something to select the transparent pixels around it. You can also do Ctrl-shift and Ctrl-Alt clicks on additional layer thumbnails to add and subtract them from the selection.</p>
<h4 id="tffpthc_5">Copy merged</h4>
<p>A godsend of a shortcut. Ctrl+(Macs: Command)+Shift+C. I use this for layers that have blending options set or are affected by adjustment layers. After you&#8217;ve copied it, do a Ctrl+(Macs: Command)+N and paste to the new file. Then Save for Web.</p>
<h4 id="tffpthc_6">Slicing&#8217;s other use</h4>
<p>I feel that slicing is an outdated method to chop up a PSD because complex designs will use overlays of all kinds. Slicing has other uses, though. Sometimes I&#8217;ll slice the document and have Photoshop generate HTML for me. I then open the generated document in Firefox and use Firebug to get the computed sizes for block elements later on.</p>
<h4 id="tffpthc_7">Actions</h4>
<p>Actions are so underused! These are macros that you can create simply by recording what you do. You can create an action that does any of the things I&#8217;ve listed above for you. For instance, next time you make a selection, start recording an action as you Copy Merged -> Create a New File -> Paste -> Save for Web. Stop recording and save your action (you might have to delete the steps after the Save for Web dialog appears). Next time you make a selection that needs to be Copy Merged and saved into a new file, just run the action and save as a new name! Here is a more in-depth <a href="http://morris-photographics.com/photoshop/tutorials/actions.html">tutorial on creating Photoshop Actions</a>.</p>
<h4 id="tffpthc_8">Text</h4>
<p>Take note of the font-face and font-sizes in pixels used before you dive into the HTML. It&#8217;s okay to use pixel font sizes these days, but if you&#8217;re old-school like I am at least you can find the relative size now that you have them all.</p>
<h4 id="tffpthc_9">Flattened Versions</h4>
<p><a href="http://davidosomething.com/content/uploads/invert.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/invert.jpg" alt="Normal and inverted flattened designs" title="Normal and inverted flattened designs" width="500" height="315" class="lazy lazy-hidden aligncenter size-full wp-image-219" /><noscript><img src="http://davidosomething.com/content/uploads/invert.jpg" alt="Normal and inverted flattened designs" title="Normal and inverted flattened designs" width="500" height="315" class="aligncenter size-full wp-image-219" /></noscript></a> Save a flattened version of the site. Print it out if you want. This will be useful for reference by eye, and for working with the Pixel Perfect Firebug extension. Finally, invert the colors of a flattened version and save it as a new file. You&#8217;ll also want this for Pixel Perfect.</p>
<h3 id="tffpthc_10">Creating the HTML and CSS</h3>
<p>This part should be simple&mdash;it just involves creating the <code>&lt;div></code>, <code>&lt;span></code>, headers, and paragraphs you need. If you took note of the font information like I told you to above, now is a good time to define it in your CSS. Besides putting a body background color/image in, the font stack really helps everything look like it&#8217;s nearing completion.</p>
<h4 id="tffpthc_11">Frameworks and Resets</h4>
<p>If you haven&#8217;t already formed your own, try adopting the popular ones (not if you&#8217;re on a deadline, though). Fluency with pre- or self-built, HTML and CSS frameworks means you already have the groundwork complete and only need to add more block elements as needed. You shouldn&#8217;t waste any time finding a reset or creating the same <code>&lt;div id="wrapper"></code> you do for every layout.</p>
<h4 id="tffpthc_12">Quickly get Image Dimensions</h4>
<p><a href="http://davidosomething.com/content/uploads/imagedimensions.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/imagedimensions-350x300.jpg" alt="Image Dimensions Column" title="Image Dimensions Column" width="350" height="300" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-216" /><noscript><img src="http://davidosomething.com/content/uploads/imagedimensions-350x300.jpg" alt="Image Dimensions Column" title="Image Dimensions Column" width="350" height="300" class="aligncenter size-thumbnail wp-image-216" /></noscript></a><br />
For Windows users, in Explorer you can add a Dimensions column to the detail view. Right click on the column names and Dimensions should be one of the options available.</p>
<h3 id="tffpthc_13">Design in Firefox</h3>
<p><a href="http://davidosomething.com/content/uploads/firefox.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/firefox.png" alt="Firefox" title="Firefox" width="128" height="128" class="lazy lazy-hidden alignleft size-full wp-image-223" /><noscript><img src="http://davidosomething.com/content/uploads/firefox.png" alt="Firefox" title="Firefox" width="128" height="128" class="alignleft size-full wp-image-223" /></noscript></a>The number of development tools in Firefox makes it the single, indisputably best browser for web development. This is not to say it is the best at rendering, or fastest browser (both of which are Opera 10.5 beta at the time of this writing), but it is close enough and will make your job easier.</p>
<h4 id="tffpthc_14">HTML Validator</h4>
<p>If you&#8217;re on a PC this instant validation cue on the bottom right of the browser is incredibly helpful. Just make sure it&#8217;s always green. Double click it to see the errors if it isn&#8217;t. If you&#8217;re on a Mac, you can use the shortcut provided in the Web Developer extension for quick validation.</p>
<h4 id="tffpthc_15">Web Developer</h4>
<p><a href="http://davidosomething.com/content/uploads/webdeveloper.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/webdeveloper.png" alt="Element information from Web Developer" title="Element information from Web Developer" width="402" height="297" class="lazy lazy-hidden aligncenter size-full wp-image-229" /><noscript><img src="http://davidosomething.com/content/uploads/webdeveloper.png" alt="Element information from Web Developer" title="Element information from Web Developer" width="402" height="297" class="aligncenter size-full wp-image-229" /></noscript></a><br />
The designer and framework you&#8217;re using and should have covered most things this extension would be used to debug, but there are a few things left that it can help with.<br />
One thing I do is test visited link status by going to Miscellaneous -> Visited Links to test the style of visited links.<br />
I also do a Forms -> Populate Form Fields to test form field fonts.<br />
Again, you can access a quick shortcut to HTML validation with this extension. Use it for both regular and generated source validation. Validate your CSS as well!<br />
Finally, Ctrl+(Macs: Command)+Shift+F will is a quick and lightweight alternative to Firebug for finding out computed styles. Just hover over your element. Press the keys again to finish.</p>
<h4 id="tffpthc_16">Computed Sizes with Firebug</h4>
<p>As I mentioned before in the Photoshop Slicing section, sometimes I&#8217;ll slice the document and have Photoshop generate HTML for me. I then open the generated document in Firefox and use <a href="http://getfirebug.com/">Firebug</a> to get the computed sizes for block level elements.</p>
<h4 id="tffpthc_17">In Place CSS Editing with Firebug and the Arrow Keys</h4>
<p><a href="http://davidosomething.com/content/uploads/firebug_css.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/firebug_css.png" alt="Editing CSS in place with Firebug" title="Editing CSS in place with Firebug" width="424" height="317" class="lazy lazy-hidden aligncenter size-full wp-image-231" /><noscript><img src="http://davidosomething.com/content/uploads/firebug_css.png" alt="Editing CSS in place with Firebug" title="Editing CSS in place with Firebug" width="424" height="317" class="aligncenter size-full wp-image-231" /></noscript></a><br />
One of the best things about Firebug is the ability to edit CSS in place. From either the HTML or CSS tab, you can add and edit rules and properties by clicking on them. If you put the cursor on a numeric property you can use the up and down arrow keys to increment and decrement the value (tip: use Shift+Arrow to increment by 10). In this way, you can move and resize block elements and change margins and paddings. Don&#8217;t forget to copy the final value into your CSS document.</p>
<h4 id="tffpthc_18">Pixel Perfect and Inverted Overlays</h4>
<p>Firebug is much more useful with Pixel Perfect. This extension lets you place elements on the browser screen and adjust their position and opacity. Drag the overlaid image to reposition it. Use the panel to hide or adjust opacity. I usually add a flattened version of the design and an inverted color flattened version. With the inverted version, set the opacity to 0.5. If your block level elements are in the correct place, the screen should turn gray. Anything that doesn&#8217;t match up to the PSD exactly will be in color (this works similar to the Photoshop &#8220;Difference&#8221; blending mode). You can use this with the Firebug technique described earlier to quickly get everything in the exact pixel location.<br />
Here&#8217;s an example of the inverted overlay on top of this post, one pixel off:<br />
<a href="http://davidosomething.com/content/uploads/overlay_off.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/overlay_off-465x400.png" alt="Pixel Perfect inverted overlay, 1px off" title="Pixel Perfect inverted overlay, 1px off" width="465" height="400" class="lazy lazy-hidden aligncenter size-medium wp-image-233" /><noscript><img src="http://davidosomething.com/content/uploads/overlay_off-465x400.png" alt="Pixel Perfect inverted overlay, 1px off" title="Pixel Perfect inverted overlay, 1px off" width="465" height="400" class="aligncenter size-medium wp-image-233" /></noscript></a><br />
And here is the same overlay when the elements are in the exact positions (I shifted the overlay, but for designing you should shift the elements):<br />
<a href="http://davidosomething.com/content/uploads/overlay_on.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/overlay_on-465x400.png" alt="Pixel Perfect inverted overlay, correct position" title="Pixel Perfect inverted overlay, correct position" width="465" height="400" class="lazy lazy-hidden aligncenter size-medium wp-image-234" /><noscript><img src="http://davidosomething.com/content/uploads/overlay_on-465x400.png" alt="Pixel Perfect inverted overlay, correct position" title="Pixel Perfect inverted overlay, correct position" width="465" height="400" class="aligncenter size-medium wp-image-234" /></noscript></a><br />
Using Firefox and Firebug to do your design, you&#8217;re just moving blocks around with the arrow keys. It&#8217;s WYSIWYG editing without the pitfalls!</p>
<h3 id="tffpthc_19">Closing</h3>
<p>I&#8217;m not a fan of those rapid PSD to HTML shops only because I am wary of the quality of work they produce. I&#8217;m sure there are a few good ones, but I still prefer to do it myself. If you&#8217;ve got any tips or tricks of your own, leave me a comment!</p>
<h3 id="tffpthc_20">References</h3>
<ol>
<li><a href="http://getfirebug.com/">Firebug</a></li>
<li>Pixel Perfect Firefox Extension</li>
<li><a href="http://morris-photographics.com/photoshop/tutorials/actions.html">Using Actions to Automate Tasks in Photoshop</a></li>
</ol>

