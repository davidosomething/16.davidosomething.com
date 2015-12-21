---
title: "Quick Access to the YouTube API with ColdFusion"
datePublished: 2010-04-29T19:57:22+00:00
tags:
  - API
  - coldfusion
slug: quick-access-to-the-youtube-api-with-coldfusion
---
<p>I&#8217;ve recently been put on a project that aims to use the YouTube API to grab custom playlists and video queries. Rather than use <a href="http://youtubecfc.riaforge.org/">Raymond Camden&#8217;s CF8+ compatible CFC</a>, I decided to learn the YouTube API and write something up on my own. This was actually quite easy&mdash;here&#8217;s what I came up with.</p>
<h3>Getting videos through a query</h3>
<p>All this takes is a simple <code>cfhttp</code> request:</p>
<pre class="brush: xml">
&lt;cfset youtube.dataApi.url = "http://gdata.youtube.com/feeds/api/videos">
&lt;cfhttp method = "get" url = "#youtube.dataApi.url#" result = "response" resolveUrl = "Yes">
	&lt;!--- ======================= don't touch ======================= --->
	&lt;cfhttpparam type = "url" name = "alt" value = "jsonc">
	&lt;cfhttpparam type = "url" name = "v" value = 2>

	&lt;!--- ======================= query terms ======================= --->
	&lt;!--- see http://code.google.com/apis/youtube/2.0/developers_guide_protocol_api_query_parameters.html --->
	&lt;cfhttpparam type = "url" name = "safeSearch" value = "strict">
	&lt;cfhttpparam type = "url" name = "max-results" value = 2>
	&lt;!--- &lt;cfhttpparam type = "url" name = "author" value = ""> comma-separated, up to 20 usernames --->
	&lt;!--- &lt;cfhttpparam type = "url" name = "q" value = "GoogleDevelopers"> search term --->
	&lt;!--- &lt;cfhttpparam type = "url" name = "category" value = ""> category --->
	&lt;!--- 	Capitalize the names of categories and lowercase the names of 
	--	keywords. For example, the following query identifies videos 
	--	associated with the keyword "comedy" that are not in the "Comedy" 
	--	category: category=comedy%2C%2DComedy&#038;v=2
	-- 	%7C = | = bool OR,	%2D = - = bool not,	%2C = comma,	%20 = space
	--	category should be a urlencoded comma-separated list
	--->
	&lt;!--- &lt;cfhttpparam type = "url" name = "orderby" value = "relevance"> one of: published, viewCount, rating --->
	&lt;!--- ============================================================= --->
&lt;/cfhttp>
</pre>
<p>The <code>alt</code> param tells the YouTube API that we want the JSON-C return format. You can get the data back in any of the other formats you want, but I&#8217;m using the JSON-C data because it&#8217;s rudimentally easier to work with deserialized JSON in ColdFusion than using the XML traversal functions.</p>
<p>The <code>v</code> param is the version of the API we&#8217;re using. Version 2 is the latest.</p>
<p>The actual search parameters come up next. I added some comments there, you can just change the values or add/remove the params as wanted. The google API is pretty good on this.</p>
<h4>What to do with the data returned</h4>
<p>The <code>cfhttp</code> tag has a <code>result</code> attribute. This attribute puts the results of the HTTP Get request into the specified variable. If you <code>cfdump</code> the contents of this variable, you&#8217;ll see the response code and header information along with some crazy Java object. This is actually the serialized JSON string. You can easily turn this into a ColdFusion struct by using the <code>deserialize</code> function:</p>
<pre class="brush: xml">
&lt;cfset videos = deserializeJSON(response.fileContent)>
</pre>
<p>Here&#8217;s an example of how you can use the output:</p>
<pre class="brush: xml">
&lt;cfif IsDefined("videos.data.items")>
&lt;cfloop array = "#videos.data.items#" index = "i">
	&lt;p>&lt;cfoutput>&lt;a href="#i.player.default#">
	 &lt;img src="#i.thumbnail.sqDefault#" alt="" />&lt;br />
	 #i.title# [#i.id#]
	 &lt;/a>
	&lt;/cfoutput>&lt;/p>	
&lt;/cfloop>
&lt;/cfif>
</pre>
<h3>Getting a user&#8217;s playlist</h3>
<p>There is an error in the google documentation. For a single playlist, you shouldn&#8217;t specify the user in the URL. So NOT</p>
<pre class="brush: plain">
http://gdata.youtube.com/feeds/api/<em>users/googleDevelopers/</em>playlists/#youtube.dataApi.playlist#
</pre>
<p>Here&#8217;s the code I&#8217;m using:</p>
<pre class="brush: xml">
&lt;cfset youtube.dataApi.playlist = "">&lt;!--- playlist ID, it's in the URL --->
&lt;cfset youtube.dataApi.url 	= "http://gdata.youtube.com/feeds/api/playlists/#youtube.dataApi.playlist#">
&lt;cfhttp method = "get" url = "#youtube.dataApi.url#" result = "response" resolveUrl = "Yes">
	&lt;!--- ======================= don't touch ======================= --->
	&lt;cfhttpparam type = "url" name = "alt" 	value = "jsonc">
	&lt;cfhttpparam type = "url" name = "v" 	value = 2>
	&lt;!--- &lt;cfhttpparam type = "url" name = "max-results" value = 10> --->
&lt;/cfhttp>
</pre>
<p>The result is similar after you deserialize the JSON part:</p>
<pre class="brush: xml">
&lt;cfset videos = deserializeJSON(response.Filecontent)>
&lt;cfdump var = "#videos.data#" label = "struct dump" expand = "no">
&lt;cfoutput>
&lt;h2>#videos.data.title#&lt;/h2>
&lt;p>Playlist id #videos.data.id#&lt;/p>
&lt;p>#videos.data.totalItems# videos&lt;/p>
&lt;/cfoutput>
&lt;cfif IsDefined("videos.data.items")>
&lt;cfloop array = "#videos.data.items#" index = "i">
	&lt;p>&lt;cfoutput>&lt;a href="#i.video.player.default#">
	 &lt;img src="#i.video.thumbnail.sqDefault#" alt="" />&lt;br />
	 Item #i.position# - #i.video.title# [#i.id#] by #i.author#
	 &lt;/a>
	&lt;/cfoutput>&lt;/p>	
&lt;/cfloop>
&lt;/cfif>
</pre>
<h3>Conclusion</h3>
<p>So if you&#8217;re developing for some legacy, non-CFC site, or you just want to play with the YouTube API, it&#8217;s pretty easy to get started.</p>

