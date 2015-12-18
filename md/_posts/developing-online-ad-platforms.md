---
title:      Developing Online Ad Platforms
subheader:  tl;dr garbage in - garbage out. Ads aren’t developer friendly.
datePublished:       2015-01-22T00:42:06+00:00
tags:
  - ads
hero:       
slug:       developing-online-ad-platforms

---


<p>Ads are a major part of the web. As a developer, the only way to avoid them is to work on a single project that will never serve ads, such as a company website or a well-funded X-as-a-service (SaaS, PaaS, etc.) project (e.g. GitHub probably won’t embed ads, … although I can see native advertising eventually appearing in the feed like Facebook has).</p>
<p>I’m going to go out there and say it: <strong>there are currently no developer-friendly advertising platforms</strong>. If you plan on implementing ads on your site, especially from multiple ad providers, you’re in for a world of hurt. I know this for a fact, having worked both agency-side and client-side. I’ve seen the full gamut when it comes to online advertising — I’ve both built those embeddable ad modules and their micro-APIs, and integrated them into major websites.</p>
<h2 id="the-problems"><a href="#the-problems" name="the-problems"></a>The Problems</h2>
<p>Some of them anyway.</p>
<h3 id="problem-1:-namespacing"><a href="#problem-1:-namespacing" name="problem-1:-namespacing"></a>Problem 1: Namespacing</h3>
<p>For embeddable ads the most prevalent problem is lack of namespacing.</p>
<p>The JavaScript based ads — the ones where you insert a simple <code>&lt;script&gt;</code> tag into your site, most likely isn’t well namespaced. That is, it will pollute the global scope. If you have variables with names like <code>adLocation</code> or CSS selectors like <code>.ad-container</code>, there’s probably some ad platform out there that will serve and ad that overrides them for its own purposes.</p>
<h4 id="solution"><a href="#solution" name="solution"></a>Solution</h4>
<p>The ad JavaScript needs to be written in a closure and not expose <em>anything</em> to the global scope. <em>Nothing</em>. This is just my experienced opinion of course, but there is a way to do everything ads currently do without <code>window</code> scope pollution.</p>
<p>Since nothing is available to the developer when the entirety of the ad code is in a closure, there needs to be a way of communicating. Some ways are the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage">Window.postMessage API</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">Events</a>. Using event listeners and triggers, functions can be called and data can be accessed.</p>
<p>For CSS namespacing, I recommend the <a href="https://bem.info/method/">BEM methodology</a>, prefixed with the ad vendor name, or something unique to the ad. E.g. all classes should be something like <code>.googleDfpAd__wrapper--video</code>. This way there would be no collisions with a website’s generic <code>.wrapper--video</code> or similar classes.</p>
<p>Another solution is to have the ad served in an iFrame. iFrames are from 1997. There are a million other issues with iFrame-contained ads, which I’ll go over next.</p>
<h3 id="problem-2:-iframing"><a href="#problem-2:-iframing" name="problem-2:-iframing"></a>Problem 2: iFraming</h3>
<p>When an ad is served from an iFrame there is a much larger network cost. In an iFrame you have a full HTML document with its own CSS, JavaScript, and other assets. An ad served from an iFrame will load much slower than an ad that just adds an image, and maybe asynchronously loads CSS and another JS file.</p>
<p>Furthermore, iFrames block the connection pool for the main site. This is not so much an issue since usually the ad JavaScript will add iFrames to the page after the <code>window.onload</code> (depends on where in the document the ad script was added and whether it is run on that event or not). But consider this — if you have other things that need to load after <code>window.onload</code>, such as if a user triggered some AJAX load, that will be blocked by the iFrame download.</p>
<p>This is an issue that is or will eventually go away due to browser improvements, but tell me this — are you not targetting older browsers on your website?</p>
<p>Another issue with iFrames is that you can’t reliably tell when they’ve fully loaded. You can get a <code>readyState</code> or do an <code>iframe.onload</code> or whatever if the ad platform allows it, but that isn’t reliable. It most likely won’t account for things like images and other assets loading — only when the DOM is ready in the iFrame. The iFrame needs to tell you somehow when it is really ready. This leads us into problem 3.</p>
<p>(By the way the solution for this problem is — please avoid developing iFrame based ads! The people implementing them will hate it.)</p>
<h3 id="problem-3:-ad-state-management"><a href="#problem-3:-ad-state-management" name="problem-3:-ad-state-management"></a>Problem 3: Ad state management</h3>
<p>Ad platforms typically are only concerned with delivering the ad, and making sure people see it. They leave it up to the developer that will implement the ad to ensure it gets viewability (ad is on the visitor’s screen when it should be).</p>
<h4 id="solution"><a href="#solution" name="solution"></a>Solution</h4>
<p>The issue here is that ad platforms generally provide no feedback mechanism (come on, give me some events!) saying they’re visible other than a dashboard. Then, your ad team will go into their dashboard and see something like 20% visibility (again, when pixels on screen) out of 8 million impressions (when a certain ad was loaded) and complain about it.</p>
<p>If the ad would just tell you “I’ve loaded”, and “I’m on/off screen,” imagine how much easier it would be to control how you render your page and optimize your site (ideally, you should remove or hide offscreen DOM objects and unbind unused JavaScript since it’ll eat up memory). This would greatly improve mobile ad delivery. You know those link-bait websites you visit on your phone are probably slow because of ads, right?</p>
<p>A hacky solution for this since most ad platforms won&#8217;t give you anything is to use a <code>setInterval</code> to check for when the ad has loaded. You can traverse into the iFrame if you need to (not difficult with jQuery, but not recommended since every ad will be different). If you&#8217;re only supporting modern browsers, MutationObservers are a better alternative &#8212; observe the place in the DOM where the ad goes for changes and then do what you need to at that point.</p>
<h3 id="problem-4:-flash"><a href="#problem-4:-flash" name="problem-4:-flash"></a>Problem 4: Flash</h3>
<p>Why does this still exist?</p>
<h2 id="outro"><a href="#outro" name="outro"></a>Outro</h2>
<p>These problems also exist in the realms of things like video embeds, analytics tracking services, and A/B testing services. Basically, any 3rd party stuff that’s going to go on your website needs to be evaluated to see how developer friendly it is, unless your website is extremely simple.</p>
<p>It’s not a developer’s fault — the world of advertising is time-based. You need to get ad campaigns out and develop and sell ad units around the launch of product cycles (before competitors can buy up all the space and take over the market). This impacts development cycles, so the idea of a well-tested, well-documented ad platform is very difficult to achieve. Hopefully by outlining these issues I can save someone from ripping their hair out.</p>

