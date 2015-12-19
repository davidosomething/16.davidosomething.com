---
title: "Google Analytics, iFrames, and Multiple Domain Setups"
datePublished: 2010-02-24T14:38:56+00:00
tags:
  - analytics
  - apache
  - domains
  - google
  - iframe
  - javascript
  - tracking
slug: google-analytics-iframes-and-multiple-domain-setups
---


<p>Google&#8217;s FAQ and help pags do a horrible job explaining how to use the tag other than pasting it into your code. Tracking for cross-domain and frame/iframe scenarios are not explained. There is documentation on the Google Analytics javascript, though, and provisions for doing the complex tracking. Here I will try to explain a common scenario I&#8217;ve had to deal with recently:</p>
<h3>The Scenario</h3>
<ul>
<li>You have a parent page with its own tracking code: <samp>UA-xxxxxx-x</samp>.</li>
<li>The parent page has an iframe in it with a child page.</li>
<li>The child page has its own tracking code as well: <samp>UA-yyyyyy-y</samp>.</li>
<li>You want to independently track both pages.</li>
</ul>
<h3>Parent Page</h3>
<p>Because we are dealing with cross-domain cookies, your page needs to serve a P3P header or link to a P3P policy to create the correct cookies in Internet Explorer 7 and 8 (and possibly Safari).<br />
<span id="more-179"></span></p>
<h4>P3P Policies</h4>
<p>P3P is one of the <a href="http://www.w3.org/">W3C</a>&#8216;s <del datetime="2010-02-24T22:49:34+00:00">failed</del> web standards. It was implemented in Internet Explorer 7 and 8, (and possibly Safari,) and prevents browsers from creating cross-domain (third-party) cookies in the default (Medium) privacy setting (See Internet Explorer -> Internet Options -> Privacy Tab -> Settings).</p>
<div class="image"><a href="http://davidosomething.com/content/uploads/ie_p3p.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/ie_p3p.png" alt="Internet Explorer 8&#039;s Privacy Settings" title="Internet Explorer 8&#039;s Privacy Settings" width="414" height="308" class="lazy lazy-hidden aligncenter size-full wp-image-192" /><noscript><img src="http://davidosomething.com/content/uploads/ie_p3p.png" alt="Internet Explorer 8&#039;s Privacy Settings" title="Internet Explorer 8&#039;s Privacy Settings" width="414" height="308" class="aligncenter size-full wp-image-192" /></noscript></a></div>
<p>To create a P3P policy in ASP.net, PHP, JSP, ColdFusion, or through Apache&#8217;s .htaccess, you only need to add some code to the top of your page. See Viral Patel&#8217;s page (and the comments) for the correct header for your pagetype. For IIS settings, see <a href="http://support.microsoft.com/kb/324013">Microsoft&#8217;s support page</a> or <a href="http://www.hanselman.com/blog/TheImportanceOfP3PAndACompactPrivacyPolicy.aspx">Scott Hanselman&#8217;s blog post</a>. If you aren&#8217;t using IIS, Apache, or server-side scripting, you can create an XML policy file and include it into the <code>&lt;head></code> section of your page using the <code>&lt;link></code> tag. <a href="http://www.w3.org/TR/P3P/#syntax_link">The proper code</a>, and more information on P3P is available in the W3C&#8217;s documentation.</p>
<h4>Parent Page Code</h4>
<p>Following the P3P header, here is the code for the parent page (explanation is in the comments within).</p>
<pre class="brush: xml">
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
&lt;html>
&lt;head>
&lt;title>Parent Page&lt;/title>
&lt;!-- add your P3P &lt;link> here if you aren't using server-side scripting to
	deliver a header -->
&lt;/head>
&lt;body>
&lt;h1>Parent Page&lt;/h1>

&lt;!-- Here is the iframe, do not specify an src. You'll see why later. -->
&lt;iframe height="300" width="400" id="childPage">
	&lt;p>Your browser does not support inline frames.&lt;/p>
&lt;/iframe>

&lt;!-- As usual, insert ga.js and run pageTracker before the end of BODY. -->
&lt;script type="text/javascript">
</pre>
<pre class="brush: js">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</pre>
<pre class="brush: xml">
&lt;/script>
&lt;script type="text/javascript">
</pre>
<pre class="brush: js">
/* We are renaming pageTracker to parentPageTracker for clarity. */
try {
	var parentPageTracker = _gat._getTracker("UA-xxxxxx-x"); 
	
	/* The parent domain is the only one setting a cookie, so we have to define
		the cookie parameters here: */
	/* Don't include "www" or "subdomain" -- the period in front means the
		cookie will apply to them as well. */
	parentPageTracker._setDomainName(".PARENTDOMAIN.COM");
	/* Enable the linker, which is used to pass cookie information to another
		domain  */
	parentPageTracker._setAllowLinker(true);
	parentPageTracker._setAllowHash(false);
	
	/* Run the tracker: */
	parentPageTracker._trackPageview();
}
catch (err) {
}

/* The url of the child page (iframe src) is on a different domain.
	We have to let google analytics know about this so the src must be inserted
	with javascript. We're using the linker we enabled above: */
var iframe = document.getElementById("childPage");
iframe.src = parentPageTracker._getLinkerUrl("http://MY.CHILDPAGEURL.COM/");  

/* Now we add a second pageTracker for the child, called childPageTracker */
try {
	var childPageTracker = _gat._getTracker("UA-yyyyyy-y");
	
	/* Setting the domain to none allows us to track across different
		domains. */
	childPageTracker._setDomainName("none");

	/* Allow the linker again, in case the iframe has an iframe that wants to
		be tracked as well: */
	childPageTracker._setAllowLinker(true);
	childPageTracker._setAllowHash(false);
	childPageTracker._trackPageview();
}
catch (err) {
}

/* You can continue adding if you have more analytics codes to track-- e.g.
try {
	var thirdPageTracker = _gat._getTracker("UA-zzzzzz-z");
	thirdPageTracker._setDomainName("none");
	thirdPageTracker._setAllowLinker(true);
	thirdPageTracker._setAllowHash(false);
	thirdPageTracker._trackPageview();
}
catch (err) {
}
*/
</pre>
<pre class="brush: xml">
&lt;/script>
&lt;/body>
&lt;/html>
</pre>
<h3>Child Page(s)</h3>
<p>The child page should contain the standard Google Analytics code. No modifications need to be made for the child page (iframe contents). Lucky you.</p>
<h3>Conclusion</h3>
<p>Hopefully this will soon be outdated with the adoption of the more optimized <a href="http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html">Asynchronous Tracking</a> code and a better help document.</p>
<h3>References</h3>
<ol>
<li><a href="http://code.google.com/apis/analytics/docs/gaJS/gaJSApiDomainDirectory.html">Google Analytics Documentation &mdash; Tracking API: Domains and Directories</a></li>
<li><a href="http://code.google.com/apis/analytics/docs/tracking/gaTrackingSite.html">Google Analytics Documentation &mdash; Cross-Domain Tracking</a></li>
<li><a href="http://viralpatel.net/blogs/2008/12/how-to-set-third-party-cookies-with-iframe.html">How to set third-party cookies with iframe?</a></li>
<li><a href="http://support.microsoft.com/kb/324013">How to configure IIS to use Platform for Privacy Preferences (P3P)</a></li>
<li><a href="http://www.hanselman.com/blog/TheImportanceOfP3PAndACompactPrivacyPolicy.aspx">The importance of P3P and a Compact Privacy Policy</a></li>
<li><a href="http://www.w3.org/TR/P3P">W3C Specification on P3P</a></li>
</ol>

