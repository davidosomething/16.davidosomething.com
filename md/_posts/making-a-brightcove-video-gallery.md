---
title:      Making a BrightCove video gallery
subheader:  
date:       2011-12-16T14:00:33+00:00
tags:
  - API
  - brightcove
  - javascript
  - jquery
hero:       
slug:       making-a-brightcove-video-gallery

---


<p><ins>Update 12-19-2011</ins>: Noting that this example uses the Flash/JS API. It would be trivial to convert it to BrightCove&#8217;s &#8220;SmartAPI,&#8221; just replace the <code>loadVideo</code> method with <code>loadVideoById</code>, include the <samp>includeAPI</samp> parameter in the embed code, and copy whatever tiny tweaks to the variables from the SmartAPI code.</p>
<p>In this post I&#8217;ll detail how to create a standard video gallery (you know, one giant video with some thumbnails under it that can switch the video out) using BrightCove and some good coding practices. There&#8217;s no BrightCove widget or plugin that does this in a user friendly manner AFAIK.</p>
<p>Unfortunately BrightCove is a paid-only service so I don&#8217;t have an account to provide examples with.</p>
<h2>The HTML</h2>
<p>First we need the HTML for the video gallery. This includes an empty <code>&lt;div&gt;</code> where the embed tag will be injected and a list of thumbnails.</p>
<p>The list of thumbnails has HTML5 data attributes containing the BrightCove video IDs (this is found in the <var>@videoplayer</var> parameter in the default embed code). Make sure you are using the video IDs and not the player IDs.</p>
<pre>&lt;div id="video-gallery"&gt;
  &lt;div id="video-full"&gt;&lt;/div&gt;
  &lt;ul id="video-thumbs"&gt;
    &lt;li&gt;&lt;a data-videoid="1052878348001"&gt;&lt;img src="img/videos-thumb-1.jpg" alt="thumbnail" /&gt;
      Video 1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a data-videoid="1052868543001"&gt;&lt;img src="img/videos-thumb-2.jpg" alt="thumbnail" /&gt;
      Video 2&lt;br /&gt;Cruises&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a data-videoid="1052868559001"&gt;&lt;img src="img/videos-thumb-3.jpg" alt="thumbnail" /&gt;
      Video 3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a data-videoid="1094040833001"&gt;&lt;img src="img/videos-thumb-4.jpg" alt="thumbnail" /&gt;
      Video 4&lt;br /&gt; America Line&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a data-videoid="1052733197001"&gt;&lt;img src="img/videos-thumb-5.jpg" alt="thumbnail" /&gt;
      Video 5&lt;br /&gt;Cruises&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a data-videoid="1094054647001"&gt;&lt;img src="img/videos-thumb-6.jpg" alt="thumbnail" /&gt;
      Video 6&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;&lt;!-- /#video-gallery --&gt;</pre>
<p>Next, add some script tags to your page:</p>
<pre>&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;window.jQuery || document.write('&lt;script src="js/libs/jquery-1.7.1.min.js"&gt;&lt;/script&gt;')&lt;/script&gt;
&lt;script type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences_all.js"&gt;&lt;/script&gt;
&lt;script src="js/script.js"&gt;&lt;/script&gt;</pre>
<p>You can modify this to fit your page&#8217;s needs. In essence, we need jQuery version 1.4.3 or higher (the jQuery.data() function attribute getter is only available starting in 1.4.3). We&#8217;re using the latest, 1.7.1, from google CDN with a fallback to a local version (this is from <a href="http://html5boilerplate.com/" rel="external" target="_blank">HTML5boilerplate</a>).
</p>
<p>
We also need the BrightCove JavaScript. This is a different version than what is typically given by the BrightCove embed code when you copy and paste. Note the &#8220;_all&#8221; in the filename &mdash; this means all of the API methods are available in this one file. There are other files you can use (you can dig through the BrightCove docs for that), but this is the most thorough one. The BrightCove JavaScript is also responsible for turning our src-less <code>&lt;object&gt;</code> elements into working embeds.</p>
<p>
Finally we include our script file. We will write that next. You can name it whatever you want.
</p>
<h2>The JavaScript</h2>
<p>Aside from including the full version of BrightCove&#8217;s JavaScript file on our page, BrightCove looks for some variables and functions in the global scope (yea, that&#8217;s not a best practice, but YouTube does it, too). This code can be found in the BrightCove API documentation, but here it is for this article. I&#8217;ve modified it slightly, you can check the documentation for updates.</p>
<pre>/**
 * BRIGHTCOVE STUFF
 */
var bcExp;
var modVP;
var modExp;
var modCon;

/**
 * Called when template loads, this function stores a reference to the player and modules.
 * Then event listeners will be added for when the template is ready and when a user clicks on a video.
 */
function onTemplateLoaded(experienceID) {
  bcExp = brightcove.getExperience(experienceID);
  modVP = bcExp.getModule(APIModules.VIDEO_PLAYER);
  modExp = bcExp.getModule(APIModules.EXPERIENCE);
  modCon = bcExp.getModule(APIModules.CONTENT);
}
function initPlayer() {
  runMobileCompatibilityScript('myExperience');
  brightcove.createExperiences();
}
</pre>
<p>You&#8217;ll never need to call these functions yourself, but <var>modVP</var> is set to an object with methods that interact with the video player. We&#8217;ll use those methods to load a new video.</p>
<p>Next up is our code. As a best practice, we&#8217;ll keep as much of it out of the window scope as possible by wrapping it in an <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/" rel="external" target="_blank">immediately invoked function expression</a>.
</p>
<pre>var brightcoveGallery = (function($) { // IIFE

  /**
   * Use JS to append brightcove object embed code, cheats us past HTML validators.
   * An array of strings is joined together to build the HTML, which is pretty quick.
   * You could also just put the embed code directly into the HTML.
   * @param videoId string contains id of initial video to load.
   * @return jquery object for the &lt;object&gt;, useful for debugging
   */
  this.embedVideo = function(videoId) {
    var html = [
      '&lt;object id="myExperience', videoId, '" class="BrightcoveExperience"&gt;'
      , '&lt;param name="bgcolor"          value="#164476" /&gt;'
      , '&lt;param name="width"            value="608" /&gt;'
      , '&lt;param name="height"           value="343" /&gt;'
      , '&lt;param name="playerKey"        value="-SOME-CRAZY-LONG-STRING-" /&gt;' // replace this with the playerKey from your video's embed code
      , '&lt;param name="playerID"         value="9999999999999" /&gt;' // replace this with the playerID (not video ID) from your video's embed code
      , '&lt;param name="isVid"            value="true" /&gt;'
      , '&lt;param name="isUI"             value="true" /&gt;'
      , '&lt;param name="videoSmoothing"   value="true" /&gt;'
      , '&lt;param name="@videoPlayer"     value="' + videoId + '" /&gt;' // replace this with the videoID (not the player ID) from your video's embed code
      , '&lt;param name="dynamicStreaming" value="true" /&gt;'
      , '&lt;param name="wmode"            value="transparent" /&gt;'
    , '&lt;/object&gt;'
    ];
    return $(html.join('""')).appendTo('body'); // change body to the selector you'd like the video to appear in
  };

  /**
   * depends on the modVP variable in the global scope
   * bind the thumbnails and embed the first video
   */
  this.init = function() {
    var videoThumbs = $('#video-thumbs').find('a');

    videoThumbs.click(function(e) {
      e.preventDefault();
      modVP.loadVideo($(this).data('videoid'));
    });

    var initialVideoId = videoThumbs.first().data('videoid');
    this.embedVideo(initialVideoId);
  }

  return this;

}).call({}, jQuery);
</pre>
<p>I modified this code for this article so haven&#8217;t really tested it (sorry). The code creates a variable, <var>brightcoveGallery</var>, that is assigned the return value of an IIFE. The return value is just <code>this</code>, which includes the two functions <code>this.embedVideo</code> and <code>this.init</code>.
</p>
<p>The IIFE is invoked with the <code>call</code> method, which takes as its first parameter the value of <code>this</code> and then some standard arguments (we&#8217;re passing the jQuery object, which gets bound to the parameter <code>$</code> for compatibility. You could also pass things like <code>window</code> or other variables you need).
</p>
<p>So now you can call <samp>brightcoveGallery.embedVideo()</samp>, which we won&#8217;t do,<br />
and <samp>brightcoveGallery.init()</samp>, which we will. So after the brightcoveGallery variable, put the following:</p>
<pre>brightcoveGallery.init();</pre>
<p>That should do it. If you find any mistakes, leave a comment.</p>

