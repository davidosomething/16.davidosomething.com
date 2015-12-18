---
title:      grunt-wendy &#8211; CasperJS for GruntJS
subheader:  Super customizable, with output filtering
datePublished:     2015-09-19T00:00:07+00:00
tags:
  - casper
  - casperjs
  - e2e
  - grunt
  - gruntjs
  - gruntplugin
  - phantomjs
  - plugin
  - task
  - testing
hero:       
slug:       grunt-wendy-casperjs

---


<hr />
<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/wendy.png" alt="wendy" width="100" height="160" class="lazy lazy-hidden alignleft size-full wp-image-1870" /><noscript><img src="http://davidosomething.com/content/uploads/wendy.png" alt="wendy" width="100" height="160" class="alignleft size-full wp-image-1870" /></noscript></p>
<p><a href="https://github.com/davidosomething/grunt-wendy">grunt-wendy</a> is my latest Grunt plugin. It&#8217;s a CasperJS test runner with customizable filtering and formatting options, which CasperJS alone lacks.</p>
<h2>Start using it?</h2>
<pre><code>npm install --save-dev grunt-wendy</code></pre>
<p>See the docs and contribute to grunt-wendy on the GitHub repository here: <a title="grunt-wendy on GitHub" href="https://github.com/davidosomething/grunt-wendy" target="_blank">https://github.com/davidosomething/grunt-wendy</a></p>
<h2>VS others</h2>
<p>Compared to <a href="https://github.com/iamchrismiller/grunt-casper">iamchrismiller/grunt-casper</a> and <a href="https://github.com/ronaldlokers/grunt-casperjs">ronaldlokers/grunt-casperjs</a>, the top two Grunt CasperJS test runners (all others are no longer maintained), this task:</p>
<ul>
<li>adds formatting options to format CasperJS&#8217; output</li>
<li>adds filtering to filter out unwanted CasperJS output</li>
<li>adds option to <strong>not fail</strong> on conditions &#8212; e.g. just output a warning when there are dubious or skipped tests</li>
<li>is version locked to PhantomJS 1.9.7 via the <a href="https://github.com/Medium/phantomjs">node phantomjs 1.9.11 module</a> &#8212; this is a troublemaker for a lot of errors with the other tasks</li>
<li>fully exposes the casper cli (iamchrismiller&#8217;s uses options only), including allowing custom test runner instead of just <kbd>casper test</kbd> (neither of the others do)</li>
<li>currently maintained by original developer (ronaldloker&#8217;s is not, and although pull requests are merged by <a href="https://github.com/gorillamania">@gorillamania</a> other chores are not guaranteed: changelog, bump, npm publish)</li>
</ul>
<h2>What&#8217;s next?</h2>
<p>Planned additions are:</p>
<ul>
<li>SlimerJS support for gecko (use iamchrismiller&#8217;s if you need this) and possibly trifleJS support for IE.</li>
<li>Optional polyfill auto-injection for <var>Function.prototype.bind</var>, since PhantomJS 1.9.7 doesn&#8217;t implement it.</li>
<li>Inclusion of other output formats for reporting besides CasperJS&#8217; included xunit xml file</li>
</ul>

