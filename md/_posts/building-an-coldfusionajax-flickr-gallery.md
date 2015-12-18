---
title: "Building a ColdFusion/AJAX flickr Gallery"
subheader:  
datePublished: "2010-05-08T15:27:15+00:00"
tags:
  - API
  - coldfusion
  - flickr
  - jquery
slug: building-an-coldfusionajax-flickr-gallery
---


<p>This is a long article that will show you how to do any/all of the following:</p>
<ul>
<li><a href="#section_utfawc">Use the flickr API with ColdFusion</a></li>
<li><a href="#section_apwcaj">Create AJAX pagination with jQuery and ColdFusion</a></li>
<li><a href="#section_etbbb">Enable the browser back button for AJAX content</a></li>
<li><a href="#section_ushadowbox">Install and enable Shadowbox</a></li>
<li><a href="#section_rtsg">Enable Shadowbox and reset it for AJAX content</a></li>
</ul>
<p><strong>The code included in this article is by no means a complete<br />
example.</strong> It is only sample code and may contain errors from what I&#8217;ve<br />
excluded of the finished product.</p>
<h3>The project</h3>
<p>I&#8217;ve recently built a flickr gallery for a project at work that looks like this:<br />
<a href="http://davidosomething.com/content/uploads/flickr_gallery.jpg"><img class="lazy lazy-hidden aligncenter size-full wp-image-320" title="flickr Gallery" alt="" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/flickr_gallery.jpg" width="500" height="266" /><noscript><img class="aligncenter size-full wp-image-320" title="flickr Gallery" alt="" src="http://davidosomething.com/content/uploads/flickr_gallery.jpg" width="500" height="266" /></noscript></a></p>
<p>The images and data are pulled in from flickr with the API. When you click on a thumbnail, the image loads in Shadowbox, like so:<br />
<a href="http://davidosomething.com/content/uploads/flickr_shadowbox.jpg"><img class="lazy lazy-hidden aligncenter size-full wp-image-321" title="Shadowbox" alt="" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/flickr_shadowbox.jpg" width="500" height="339" /><noscript><img class="aligncenter size-full wp-image-321" title="Shadowbox" alt="" src="http://davidosomething.com/content/uploads/flickr_shadowbox.jpg" width="500" height="339" /></noscript></a></p>
<p>And finally, the pagination works using AJAX. The browser&#8217;s back and next button are functional, and AJAX-loaded content is <a href="http://www.shadowbox-js.com/">Shadowbox</a> enabled (I&#8217;ll explain why this was annoying later).</p>
<h3 id="section_utfawc">Using the flickr API with Coldfusion</h3>
<p>Using the same format as in my previous article about the YouTube API, I&#8217;m using the ColdFusion <code>&lt;cfhttp&gt;</code> tag to make a request to the flickr API. There is <a href="http://chris.m0nk3y.net/projects/CFlickr/">a CFC that has abstracted this</a>, but rather than use those I decided to just use the native functionality of ColdFusion (which, when using REST/JSON, is just as easy/easier than figuring out how to use the CFC).</p>
<p>Here&#8217;s the commented code for making an HTTP GET request to the flickr API:</p>
<pre><code class="language-xml">&lt;cfset flickr.api.url = "http://api.flickr.com/services/rest/"&gt;
&lt;cfset flickr.api.key = "YOUR_API_KEY_HERE"&gt;
&lt;cfset flickr.user_id = "39140249@N06"&gt;&lt;!--- the user truthtourrider, you can get this from any flickr user's URL ---&gt;
&lt;cfif IsDefined("url.page") And IsNumeric(url.page)&gt;&lt;cfset request.page = url.page&gt;&lt;/cfif&gt;
&lt;cfparam name = "request.page" 	default = 1&gt;
&lt;!--- ======================== Get a User's Photos ======================== ---&gt;
&lt;cfset flickr.api.url = "http://api.flickr.com/services/rest/"&gt;
&lt;cfhttp method = "get" url = "#flickr.api.url#" result = "response" resolveUrl = "Yes"&gt;
	&lt;!--- don't touch ---&gt;
	&lt;cfhttpparam type = "url" name = "api_key" 		value = "#flickr.api.key#"&gt;
	&lt;cfhttpparam type = "url" name = "format" 		value = "json"&gt;&lt;!--- soap/json/xmlrpc ---&gt;
	&lt;cfhttpparam type = "url" name = "nojsoncallback" value = "1"&gt;

	&lt;cfhttpparam type = "url" name = "method" 		value = "flickr.photos.search"&gt;
	&lt;cfhttpparam type = "url" name = "user_id" 		value = "#flickr.user_id#"&gt;
	&lt;!--- &lt;cfhttpparam type = "url" name = "tags" 		value = "test"&gt; ---&gt;
	&lt;cfhttpparam type = "url" name = "sort" 		value = "date-taken-desc"&gt;&lt;!--- date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, ---&gt;
	&lt;cfhttpparam type = "url" name = "content_type" value = "1"&gt;&lt;!--- photos only ---&gt;
	&lt;cfhttpparam type = "url" name = "extras" 		value = "description,date_taken,tags,url_s,url_m"&gt;
	&lt;cfhttpparam type = "url" name = "page" 		value = "#request.page#"&gt;
	&lt;cfhttpparam type = "url" name = "per_page" 	value = "45"&gt;
&lt;/cfhttp&gt;
&lt;cfif response.Statuscode Neq "200 OK"&gt;
	&lt;cfoutput&gt;&lt;p&gt;
	 Error getting response from flickr server.
	&lt;/p&gt;&lt;/cfoutput&gt;
&lt;cfelseif Not IsDefined("response.Filecontent") Or Not IsJSON(response.Filecontent)&gt;
	&lt;cfoutput&gt;&lt;p&gt;
	 No Filecontent in flickr response.
	&lt;/p&gt;&lt;/cfoutput&gt;
&lt;cfelse&gt;
	&lt;cfset flickr.response = deserializeJSON(response.Filecontent)&gt;
	&lt;!--- &lt;cfdump var = "#flickr.response#" expand = "no" label = "content"&gt; ---&gt;
&lt;/cfif&gt;
&lt;cfif IsDefined("flickr.response.stat")&gt;&lt;cfif flickr.response.stat Eq "fail"&gt;
	&lt;cfoutput&gt;&lt;p&gt;#flickr.response.message#&lt;/p&gt;&lt;/cfoutput&gt;
&lt;cfelse&gt;
	&lt;cfset photos = flickr.response.photos.photo&gt;&lt;!--- is an array ---&gt;
&lt;/cfif&gt;&lt;/cfif&gt;</code></pre>
<p>Again, instead of using the default REST response format, I&#8217;ve added a couple extra parameters to get a non-callback wrapped JSON, which I then turn into a ColdFusion struct by deserializing. If you <code>&lt;cfdump&gt;</code> the struct, you&#8217;ll see how easy it is to work with the deserialized data.</p>
<h3 id="section_etbbb">Enabling the browser back button</h3>
<p>This features of the <a href="http://benalman.com/projects/jquery-hashchange-plugin/">jQuery hashchange event</a> plugin by Ben Alman should be implemented by the browser in my opinion. This jQuery plugin tricks the browser into saving the page state by changing the fragment identifier (that&#8217;s the thing after the # symbol in the URL). When the fragment identifier is changed, a new history state is saved without performing a page refresh.</p>
<p>The plugin also creates a new event that you can bind with jQuery called a &#8220;hashchange.&#8221; To save a browser state before loading something in it, you should perform a hashchange instead of just loading it. This will trigger the bound hashchange event, which will load what you wanted.</p>
<p>First, include the haschange plugin using the <code>script</code> tag after loading jQuery.<br />
Then, use this JavaScript to binds the click and hashchange events for the pager:</p>
<pre><code class="language-js">/* click a flickr pager link, back button compatible. mother effin witchcraft */
$('body.flickr div.feed_pager a').live('click', function(e) {
	/* create object based on link's href: { page: 1 } */
	// alert(this.getAttribute('href')); // full url
	//alert(this.getAttribute('href', 2)); // 2 = return as string
	var url 		= this.getAttribute('href', 2);
	var param_start	= url.indexOf("=");
	var params		= url.substr(param_start).slice(1);	
	// alert(params);
	location.hash = params;
	return false;
});
$(window).bind('hashchange', function(e) {
	$('div.loading').fadeIn('fast');
	$('#feed_content').load('flickr_content.cfm?page=' + location.hash.slice(1), function() {		
		$('div.loading').fadeOut('fast');
	});
});
if (location.hash) { /* load default content if a hash was given */
	$(window).trigger( 'hashchange' );
}</code></pre>
<h4>A better implementation of the pager&#8230;</h4>
<p>would be to <em>not</em> reload the pager with every AJAX call. Instead, use jQuery to toggle the &#8220;active&#8221; class on the old and new pages when a new page is clicked, and just load the gallery content. You would have to save the page number in the fragment identifier and, parsing the fragment identifier, change it the active page in the pager when the page is changed. (Or use the more versatile and complex <a href="http://benalman.com/projects/jquery-bbq-plugin/">jQuery BBQ plugin</a> instead of the Hashchange plugin to save the parameters and restore them when the back button is clicked.) I didn&#8217;t go this route because the pager was a ColdFusion module I was reusing on other parts of the site.</p>
<h3 id="section_ushadowbox">Using Shadowbox</h3>
<p>I would have preferred the <a href="http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/">prettyPhoto</a> plugin, but <a href="http://www.shadowbox-js.com/">Shadowbox</a> was a project requirement. It would be almost trivial to switch from one to the other, though.<br />
Installing Shadowbox is as easy as including the JS file using the <code>script</code> tag and calling <code>Shadowbox.init();</code>.<br />
To make all of the gallery images open as a Shadowbox gallery, they just need to link to an image file (ending with an image file extension such as &#8220;.jpg&#8221;) and have the same <code>rel</code> value. I used <samp>rel=&#8221;shadowbox[recent]&#8221;</samp>. So the HTML/JavaScript should look like the following snippets:</p>
<p>This is the revised HTML for the anchor link, enabling a Shadowbox gallery:</p>
<pre></pre>
<h4>Enabling Shadowbox for AJAX loaded content</h4>
<p>But it&#8217;s not that easy with AJAX pagination in place. When new content is loaded, Shadowbox is not enabled for them. To fix this, you just need to call <code>Shadowbox.setup();</code> after loading the content. So change your haschange event with an AJAX load and callback to this:</p>
<pre><code class="language-js">$(window).bind('hashchange', function(e) {
	$('div.loading').fadeIn('fast');
	$('#feed_content').load('flickr_content.cfm?page=' + location.hash.slice(1), function() {		
		$('div.loading').fadeOut('fast');
		/* the 'setup' method reinits shadowbox for the new	AJAX loaded 
			content. Recreates all galleries. */
		Shadowbox.setup();
	});
});</code></pre>
<h4 id="section_rtsg">Resetting the Shadowbox Gallery</h4>
<p>There&#8217;s still a problem! When new content is loaded, Shadowbox <em>appends</em> the loaded images to its cached gallery array. This means if you were viewing the 45 images on page 1, and then jump to page 3, the Shadowbox would open as a 90 image gallery from image 1-45 and 91-135. Going to page two would tack images 46-90 to the end of that. And going to page 1 again (provided you aren&#8217;t using jQuery BBQ and caching) would append images 1-45 to the end of that again!<br />
The fix for this is to clear Shadowbox&#8217;s cache after each AJAX load. This can be done with the <code>Shadowbox.teardown(links);</code> or <code>Shadowbox.clearCache();</code> methods (see the very sparse <a href="http://www.shadowbox-js.com/api.html">Shadowbox API here</a>). I used <code>Shadowbox.clearCache();</code> because the other one required more tinkering. Here&#8217;s what the final haschange event and AJAX load callback should look like:</p>
<pre><code class="language-js">$(window).bind('hashchange', function(e) {
	$('div.loading').fadeIn('fast');
	$('#feed_content').load('flickr_content.cfm?page=' + location.hash.slice(1), function() {		
		$('div.loading').fadeOut('fast');
		/* if the shadowbox cache isn't cleared, the new images would be 
			appended to the recent images gallery. By clearing, we create a new
			gallery of 45 images.
			The Shadowbox.teardown() method would be more appropriate (and maybe
			faster), but I couldn't get it to work */
		Shadowbox.clearCache();
		/* the 'setup' method reinits shadowbox for the new	AJAX loaded 
			content. Recreates all galleries. */
		Shadowbox.setup();
	});
});</code></pre>
<h3>Conclusion</h3>
<p>So there you have it, a paginated, AJAX with back button, Shadowboxed flickr gallery! Let me know if you have any questions in the comments.</p>

