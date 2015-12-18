---
title:      grunt-toggl
subheader:  Automatically start a Toggl timer with a Grunt task
datePublished:     2014-04-29T22:30:24+00:00
hero:       http://davidosomething.com/content/uploads/header-grunt-toggl.jpg
slug:       grunt-toggl

---


<hr />
<p><img class="lazy lazy-hidden alignleft size-full wp-image-1847" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/grunt-toggl-logo.png" alt="grunt-toggl logo" width="100" height="134" /><noscript><img class="alignleft size-full wp-image-1847" src="http://davidosomething.com/content/uploads/grunt-toggl-logo.png" alt="grunt-toggl logo" width="100" height="134" /></noscript></p>
<h2>Start using grunt-toggl today!</h2>
<pre><code>npm install --save-dev grunt-toggl</code></pre>
<p>See the docs and contribute to grunt-toggl on the GitHub repository here: <a title="grunt-toggl on GitHub" href="https://github.com/davidosomething/grunt-toggl" target="_blank">https://github.com/davidosomething/grunt-toggl</a></p>
<hr />
<h2>Some background</h2>
<p>I work for many clients and on multiple projects at a time, so it&#8217;s important to keep track of my billable hours. My tool of choice for time tracking is <a title="Toggl" href="https://www.toggl.com/" target="_blank">Toggl</a>. Check it out if you&#8217;re not already a user &#8212; it&#8217;s got apps for every device and OS and a great reporting dashboard.</p>
<p>Sometimes I forget to start a Toggl timer when I dive into the fun part of web development. But one thing I pretty much always do at the start of a web project is start <a title="Grunt: The JavaScript Task Runner" href="http://gruntjs.com/" target="_blank">grunt</a>. So it makes sense to have something to tie the two together. For that reason, I&#8217;ve created a Grunt plugin that automatically starts a Toggl timer. It&#8217;s available now <a title="grunt-toggl on NPM" href="https://www.npmjs.org/package/grunt-toggl" target="_blank">on npm</a>.</p>
<p>Basically the plugin creates a new asynchronous Grunt task. The task uses the <a href="https://github.com/mikeal/request" target="_blank">Request</a> library to make an HTTP request to the <a title="Toggl API" href="https://github.com/toggl/toggl_api_docs" target="_blank">Toggl API</a>. There are helper arguments in the task that to find your Workspace and Project IDs, too. Anyway, this is my second Grunt plugin and the first one to use <a title="TravisCI" href="https://travis-ci.org/" target="_blank">Travis CI for continuous integration</a>. Let me know if you use it!</p>

