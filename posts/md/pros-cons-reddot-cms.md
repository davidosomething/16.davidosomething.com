---
title:      Pros &#038; Cons: RedDot CMS
subheader:  
date:       2010-02-03T19:29:10+00:00
tags:
  - cms
  - reddot
hero:       
slug:       pros-cons-reddot-cms
permalink:  http://davidosomething.com/blog/pros-cons-reddot-cms/
---


<p>As a disclaimer, this article is only a matter of opinion from a professional developer. It should not be taken as business advice.</p>
<p class="image"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/reddot.png" alt="RedDot Logo" title="RedDot Logo" width="350" height="121" class="lazy lazy-hidden size-full wp-image-16" /><noscript><img src="http://davidosomething.com/content/uploads/reddot.png" alt="RedDot Logo" title="RedDot Logo" width="350" height="121" class="size-full wp-image-16" /></noscript></p>
<p>I don&#8217;t claim to be the most knowledgeable resource on the product (I&#8217;ve never written a plugin, for one thing)&mdash; see the people at the <a href="http://www.reddotcmsblog.com/">Unofficial RedDot CMS blog</a> for that. Also, I&#8217;ve only had experience with RedDot 6 through 9 (the latest is called OpenText CMS 10, I believe). I am, however, experienced with the implementation of various content management solutions. </p>
<p>So here they are:</p>
<h3>Pros</h3>
<ul>
<li><strong>Inline editing of content.</strong> With RedDot, you can simply Ctrl-click a dot to add text in place.</li>
<li><strong>Template management.</strong> A content class can have templates for Web, Print, etc. variants, which get published as necessary.</li>
<li><strong>Workflow and groups.</strong> RedDot has a workflow system that is confusing only because it is capable. Structured correctly, user groups and Authorization Packages give an administrator complete control over what each user can do.</li>
<li><strong>Powerful content creation system.</strong> RedDot&#8217;s Content Class system is immensely powerful. Content types can be entire pages or HTML fragments. You can reference and connect content types to other content types or even nodes. It&#8217;s quite well thought out once you learn how it works.</li>
<li><strong>Translation tools.</strong> RedDot actually lists all text for you to translate, making it easy to internationalize a site.</li>
<li><strong>Well-paying market.</strong> With RedDot under your belt, you can find a job in Australia! Really, though, companies looking for Senior RedDot developers typically pay well since the thing is so hard to use. Can&#8217;t speak for anything less than a &#8220;Senior&#8221; role, though.</li>
</ul>
<p><span id="more-15"></span></p>
<h3>Cons</h3>
<ul>
<li><strong>Use of ActiveX/limitation to Internet Explorer for development.</strong> Every click you make in RedDot requires a load/refresh. Because the RedDots can cause invalid markup, you might end up in Quirks mode without realizing it. It&#8217;s just cumbersome. I always thought &#8220;I could do this in WordPress in a quarter of the time.&#8221;</li>
<li><strong>Preview mode does not reflect live site.</strong> It should, obviously.</li>
<li><strong>No underlying architecture to follow.</strong> You have complete control over the structure of your site. You&#8217;re starting from scratch. This is too much power, and is probably the cause of most poor RedDot implementations (just a guess). Whoever owns RedDot (OpenText right now) should include some kind of skeleton. Most implementations end up using the same structure anyhow (either strongly integrated into Navigation Manager or using the List-Container style from the RedDot Best Practices PDF before OpenText acquired them).</li>
<li><strong>Lack of experts.</strong> There&#8217;s only the contributors to the Unofficial RedDot CMS Blog and a few seasoned experts in the Google Groups.</li>
<li><strong>Inconsistent support.</strong> The answers they give are more often than not useless or ambiguous. On more than one occasion the reply was something along the lines of &#8220;It will be in the next release,&#8221; &#8220;We don&#8217;t know,&#8221; or &#8220;If you do that we can no longer support you.&#8221;</li>
<li><strong>Lack of community contribution.</strong> There are what, twenty modules in total for RedDot? All of which extend the Administration interface? The community has provided a guide for how to add RSS to a site&mdash; most CMS/blogging systems have this by default. There are no prebuilt themes/templates and only a few English blogs.</li>
<li><strong>Esoteric system.</strong> If you learn RedDot, you know&#8230; just RedDot. You can&#8217;t switch industries with that. RQL has its uses here and there but not in the real world. You can use any language (.net, VB, CF, even PHP) to extend RedDot, but there&#8217;s no native support for it and you run the risk of breaking everything (e.g., having on Ctrl-Click editing on with PreExecution in RedDot 7 [end of life product] == FAIL). If you&#8217;re really going to supplement with another language, why not use a CMS built in that language as well?</li>
<li><strong>Steep learning curve.</strong> Don&#8217;t plan on learning this using online resources (all three of them), through a book (nonexistent!), or as you go (proprietary&mdash; it&#8217;s not something you can download and play with). You need an instructor. There is a reason OpenText has classes. If you do it yourself, be prepared to give up or learn it completely wrong.</li>
</ul>
<h3>Closing Statement</h3>
<p>RedDot has a few merits, but from being bought and sold, acquired, and flipped, its development has been stunted. OpenText CMS (10) is <em>probably</em> better, and whatever they&#8217;re working on now should be pretty good if it is properly integrated with the recently acquired Vignette CMS. Other than that, I am not a fan.</p>

