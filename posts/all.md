---
title:      grunt-wendy &#8211; CasperJS for GruntJS
subheader:  Super customizable, with output filtering
date:       2015-09-19T00:00:07+00:00
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
permalink:  http://davidosomething.com/blog/grunt-wendy-casperjs/
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




---
title:      git-my
subheader:  List the remote branches where you were the last committer
date:       2015-03-29T22:39:39+00:00
tags:
  - bash
  - development
  - git
  - script
hero:       
slug:       git-my
permalink:  http://davidosomething.com/blog/git-my/
---


<p><strong>Git</strong> doesn&#8217;t track who created branches. This makes it difficult to keep track of <em>your</em> branches.</p>
<p>To remedy this, I wrote a shell script that gets all the remote git branches and filters them out based on the last committer. It then lists the ones where you were the last committer.</p>
<p>You can find the script here:<br />
<a title="https://github.com/davidosomething/git-my" href="https://github.com/davidosomething/git-my" target="_blank">https://github.com/davidosomething/git-my</a></p>
<p>Here&#8217;s a screenshot of it in action:<br />
<img class="lazy lazy-hidden" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="https://raw.githubusercontent.com/davidosomething/git-my/docs/screenshot.png" alt="Screenshot of git-my" /><noscript><img src="https://raw.githubusercontent.com/davidosomething/git-my/docs/screenshot.png" alt="Screenshot of git-my" /></noscript></p>




---
title:      Developing Online Ad Platforms
subheader:  tl;dr: Garbage in - garbage out. Ads aren’t developer friendly.
date:       2015-01-22T00:42:06+00:00
tags:
  - ads
hero:       
slug:       developing-online-ad-platforms
permalink:  http://davidosomething.com/blog/developing-online-ad-platforms/
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




---
title:      Linux on the Lenovo Thinkpad W510 &#8211; Part 3
subheader:  NVidia 340.xx Legacy Driver Updates
date:       2014-10-30T21:45:11+00:00
tags:
  - archlinux
  - Linux
  - thinkpad
  - w510
hero:       
slug:       linux-lenovo-thinkpad-w510-part-3
permalink:  http://davidosomething.com/blog/linux-lenovo-thinkpad-w510-part-3/
---


<p>The NVidia drivers after 343.22 no longer support the NVidia Quadro FX 880M GPU for the ThinkPad W510 so I had to switch to legacy drivers (340-xx).</p>
<p>To get everything working again, I make some changes to my kernel mode settings and my xorg.conf. In <var>/boot/syslinux/syslinux.cfg</var> and <var>/etc/xorg.conf.d/20-nvidia.conf</var> I am now using this:</p>
<p><script src="https://gist.github.com/davidosomething/87171683d589981225a1.js"></script></p>
<p>And in the <var>syslinux.cfg</var> the line <code>DEFAULT arch</code> is now <code>DEFAULT archnvidia</code> to default to the new kernel settings.</p>




---
title:      How I Work
subheader:  The million things I do for web projects.
date:       2014-06-11T21:35:24+00:00
tags:
  - bower
  - branches
  - bundler
  - composer
  - dependency
  - development
  - docker
  - gem
  - npm
  - package
  - projects
  - structure
  - tooling
  - vagrant
  - vm
  - web
hero:       
slug:       work
permalink:  http://davidosomething.com/blog/work/
---


<p>Creating a website is just not as simple as it used to be. In order to do things right, I need all kinds of tools: compilers, linters, package managers, optimizers and minifiers, etc. Aside from that I need to consider things like portability, organization, and maintainability.</p>
<p>I just started a new job so I&#8217;ve had some time to think about the cleanest way to get everything installed and organized. I follow some basic rules to keep my environments clean. Here are the principles I follow and the reasoning behind them:</p>
<h2>Install as many of the dependencies as possible in the userspace.</h2>
<p>That is, don&#8217;t run npm or bower or others as root / with sudo. This is important because I might be deploying to a shared host or I might run into file permissions problems if my files/binaries are owned or run as root.</p>
<p>Furthermore, if something happens to an executable npm package &#8212; like grunt gets hacked so that it deletes the filesystem &#8212; I don&#8217;t want to run it as root.</p>
<p>On OSX, homebrew is pretty much the only thing I need to install with sudo.</p>
<h2>Don&#8217;t use system or system package manager binaries.</h2>
<p>The versions of Ruby and PHP that comes with OSX are outdated. The ones in the apt sources or pacman may be outdated, but more than likely they don&#8217;t match the ones on my server environment.</p>
<p>To get around using the system/system packaged tools, use environment tools like <a href="https://github.com/creationix/nvm" target="_blank">nvm</a> for node (my choice because it&#8217;s usually already on CentOS hosts), chruby for ruby (check out the anti-features here: <a href="https://github.com/postmodern/chruby" target="_blank">https://github.com/postmodern/chruby</a>, <a href="https://github.com/phpenv/phpenv">phpenv</a> for php, and <a href="http://virtualenv.readthedocs.org/en/latest/">virtualenv</a> for python. You may need to install these with sudo so they&#8217;re available globally.</p>
<p>There are alternatives for each besides the ones I listed, but the important part is once they&#8217;re installed I can use them to install the version I need. Also, they install their respective binaries in the userspace (so I can use npm, gem, composer, and pip without sudo), which ties back into the previous rule.</p>
<h2>Everything external needs to be easily upgradable</h2>
<p>For instance, it should be trivial to upgrade JavaScript and CSS frameworks. That should be as simple as doing a <code>bower update</code> or <code>composer update</code>, or jam or npm or bundle, whichever you&#8217;re dealing with. The hard part should be fixing the things that break after the upgrade.</p>
<p>Another big thing to know: you can specify almost ANYTHING (URLs to individual files, git repositories) as a dependency in bower, bundler, composer, and npm. If you didn&#8217;t write it, consider using a package manager to manage it. Whether or not you keep it in version control, it makes it easier to find the original copy.</p>
<h2>Only commit clean code</h2>
<p>To ensure this, there are linters for every language. I don&#8217;t make a big deal out of committing code that doesn&#8217;t do what it&#8217;s supposed to (sometimes I commit code just to save it &#8212; I can squash the commit later before issuing a pull request), but if the indentation is wrong it will be a lot harder to fix.</p>
<p>Adding a lint task to a pre-commit hook is a good idea. So is running the lint tasks through some filewatcher like `grunt watch`. Neither is mandatory if you&#8217;re using an editor with built in linting (e.g. Vim with Syntastic or Sublime/Atom/Brackets with the right plugins) and you&#8217;re good about clearing the errors/warnings before you save and commit.</p>
<p>I also run the linter during the build phase on deploy and fail builds on poor code.</p>
<h2>Don&#8217;t run sites off your system</h2>
<p>Welcome to the new world. I use vagrant for everything now, and that&#8217;s considered old-school (because it&#8217;s slow and memory intensive). The new school way is to run dev servers (even local ones) off of docker. Docker makes creating new servers as cheap as making git branches. On my Linux box I actually plan on running docker with <a href="https://github.com/progrium/dokku" target="_blank">dokku</a> through a VirtualBox anyway, just so I can limit memory and CPU usage more closely.</p>
<p>Again, this is a way to ensure my dev environment mirrors the production server as closely as possible. It also keeps my system lean &#8212; I can shut down the VM when I&#8217;m not doing dev work and I&#8217;ll reclaim all the memory in one command: <code>vagrant suspend</code>. This beats having to stop the nginx, apache, php-fpm, unicorn, etc. processes one-by-one (or writing a shell script to do it). Finally, committing a Vagrantfile or dockerfile with my repo means any other developer can get a working version of the project up and running easily.</p>
<h2>Create a developer bootstrap script</h2>
<p>It&#8217;s simple, it should get a developer up-and-running. Here&#8217;s an example:</p>
<pre><code>composer install # gets framework/plugins/etc.
bundle install # gets sass/compass
npm install # gets grunt and plugins, jshint, etc.
vagrant up
</code></pre>
<p>The <code>vagrant up</code> command runs the provisioner (chef, puppet, or docker) and triggers a build (run your grunt/gulp/npm/etc. tasks). There&#8217;s tools to get a provisioner setup and repos examples on GitHub so you don&#8217;t really have to learn those devops DSLs. I prefer Chef for its structure, though.</p>
<p>Check out <a href="https://puphpet.com/" target="_blank">PuPHPet</a> or <a href="http://www.rove.io/" target="_blank">rove.io</a> for custom setups, or search GitHub for stacks (even in ansible or salt if that&#8217;s your thing).</p>
<h2>Branch and test the branches</h2>
<p>With my site running through a VM or docker I can easily stage branches locally. A separate shallow git clone can be used if I wanted two instances running side by side. I just change the VM&#8217;s port for the branch clone.</p>
<p>I run a local DNS to map my local dev sites, so that&#8217;s one challenging thing to manage. In order to remedy that I will eventually set up dokku or a PaaS-like platform such as <a href="http://cosmos.layervault.com/divergence.html" target="_blank">LayerVault&#8217;s Divergence</a>. These would allow me to reach my branches at dev subdomains like <code>newfeature.mysite.dev</code>.</p>
<h2>Directory structure</h2>
<p>The directory structure I typically use now is something like the below for a WordPress site. Note that <strong>anything that can be retrieved or generated is typically not kept in version control</strong> (e.g. sqldumps, bower components, node_modules, compiled css, composer packages, etc.).</p>
<p>This is not a rule &#8212; some servers don&#8217;t allow you to run binaries so your options are either commit the dependencies or upload them from a separate server as part of the deploy script. It&#8217;s sometimes advisable to do the latter if you don&#8217;t want to be dependent on a dependency archive (packagist/npm/rubygems might be down and you still need to be able to build a mission critical app).</p>
<h3>Example for a WordPress site</h3>
<p>This is what I use for single-server WordPress sites. For multi-server, or when other kinds of scaling are involved, I&#8217;d break it up even more.</p>
<pre>- .git/
- assets/  -- PSDs and stuff (versioned separately or symlinked to dropbox)
- sqldump/ -- backups (generated on deploy and kept in S3, glacier, dropbox,
                      etc.)
- www/ -- work from here
  - config/ -- capistrano, chef cookbooks, etc.
  - log/ -- I put all server logs (error.log, cachegrind, etc) here
  - migrations/ -- custom sql migrations if this were a custom app
  - node_modules/ -- if using any node modules not part of theme
  - public/ -- this is the webroot
    - config/
    - content/
      - themes/
        - mytheme/ -- for redistributable themes, I sometimes keep these in
                      a separate repository and use composer to pull it into
                      a main project as a dependency, or as a git subtree
          - node_modules/
          - build/
            - components/
            - fonts/
            - img/
            - js/
            - sass/
              - common/
                - mixins, variables, extends, fonts, icons
              - layouts/  -- grid, nav, things that modify sets of modules
              - modules/  -- media unit, post unit, header, footer
              - pages/    -- page specific
              - vendor/   -- 3rd party grids, h5bp, copied css from components/
          - lib/ -- server side
          - release/ -- compiled build ends up here
            - css/
          - tests/
          - .agignore -- because I use the_silver_searcher
          - .bowerrc -- set build/components as the components dir
          - .gitignore
          - .jshintrc -- for portability, set here instead of in gruntfile
          - .sass-lint.yml -- ditto above
          - Gruntfile.js
          - bower.json
          - config.rb -- compass config
          - package.json
          - style.css
        - uploads/ -- usually a symlink to shared folder between releases
    - plugins/
    - wp/
  - Capfile -- I use capistrano and script the build there
  - Gemfile
  - Gemfile.lock -- sometimes in version control even though it is generated
  - Vagrantfile
  - composer.json
  - composer.lock -- sometimes versioned
  - package.json
  - wp-cli.yml
- .gitignore
- README.md
- TODO.md
</pre>




---
title:      Linux on the Lenovo ThinkPad W510 &#8211; Part 2
subheader:  One month later as a pure linux user
date:       2014-05-29T18:25:31+00:00
tags:
  - arch
  - display
  - hardware
  - lenovo
  - Linux
  - mint
  - thinkpad
  - upgrade
  - w510
hero:       
slug:       linux-lenovo-thinkpad-w510-part-2
permalink:  http://davidosomething.com/blog/linux-lenovo-thinkpad-w510-part-2/
---


<p>I&#8217;m leaving Linux Mint 16 behind. The RC for Linux Mint 17 is out so maybe that will fix some things, but the main problem I&#8217;ve had is with installing packages. Apt just doesn&#8217;t cut it, especially when I think back to when I was using ArchLinux. So I&#8217;m going back to Arch and the next post will be about that.</p>
<p>Apt&#8217;s greatest downfall is that as you add PPAs and when you start needing multiple architectures, the dependency chain breaks and is almost impossible to fix.</p>
<h3>Hardware Upgrades</h3>
<p>Since I got the laptop, I&#8217;ve made some upgrades:</p>
<ul>
<li>I&#8217;ve upgraded the RAM to 16GB.</li>
<li>I&#8217;ve completely replaced the keyboard with a new one since I got a refurb. The springy feeling is much better now.</li>
<li>I took apart the casing and replaced the laptop display with a FHD one, 1920&#215;1080. <a href="http://www.ifixit.com/Guide/Upgrading+the+Lenovo+ThinkPad+T520+Display/9763" target="_blank">This guide helped.</a></li>
<li>I replaced the optical drive with a HDD caddy from Lenovo and put a second 240GB SSD in there.</li>
</ul>
<p>Who says a laptop isn&#8217;t upgradable? The screen in particular was super easy and worthwhile.</p>
<h3>Display Calibration</h3>
<p>One of the things I&#8217;ve yet to figure out is how to use the display calibrator. The ThinkPad comes with a Huey Pro in the palm rest that is supposed to detect the colors and calibrate the screen when the lid is closed. I&#8217;ve installed <a href="http://dispcalgui.hoech.net/" target="_blank">DispCalGui</a> but it goes straight to a gray screen and I&#8217;m pretty sure the screen is turning off when I close the lid. The Huey Pro is a detected device, though, so I&#8217;ll keep looking into it.</p>
<h3>Software</h3>
<p>The ThinkVantage button can be mapped using the program <a href="http://www.thinkwiki.org/wiki/Tpb" target="_blank">tpb</a>. I&#8217;m mapping it to open a gnome-terminal. Can&#8217;t think of anything else I&#8217;d use it for.</p>




---
title:      Linux on the Lenovo ThinkPad W510
subheader:  A post on this laptop's configuration and use.
date:       2014-05-01T22:15:13+00:00
tags:
  - cinnamon
  - Linux
  - mint
  - thinkpad
  - w510
hero:       
slug:       linux-lenovo-thinkpad-w510
permalink:  http://davidosomething.com/blog/linux-lenovo-thinkpad-w510/
---


<p>I bought a crappy PC laptop as a backup since my MacBook&#8217;s been failing. I&#8217;ve gone full Linux on it since I spend most of the day in a terminal and browser, so except for Photoshop I&#8217;m comfortable. I&#8217;ll probably buy a new MacBook when they release 2014 Pro Retina ones. Until then, I&#8217;ll document my experience here.</p>
<p>First off, I&#8217;m running <a href="http://www.linuxmint.com/" target="_blank">Linux Mint 16 Petra with the Cinnamon Desktop Environment</a>. I&#8217;ve got to say, it&#8217;s really pretty in comparison to Windows 7 that the laptop came with and Windows 8.1 that my Shuttle PC is now running.</p>
<h2>Fixes I&#8217;ve had to make</h2>
<h3>Brightness Controls</h3>
<p>The brightness keys cause Linux to crash. Also, software controls like panel widgets don&#8217;t work. Despite <a href="http://www.thinkwiki.org/wiki/Category:W510" target="_blank">it saying not to on thinkwiki.org</a>, the <var>EnableBrightnessControl</var> registry flag was the right way to enable brightness controls. Switching to a virtual console, changing the brightness, and switching back worked&#8230; except that Cinnamon DE crashed upon returning to it.</p>
<p>Here&#8217;s what your <var>/etc/X11/xorg.conf</var> file should look like:</p>
<pre><code>Section "Device"
  Identifier "Device0"
  Driver "nvidia"
  VendorName "NVIDIA Corporation"
  BoardName "Quadro FX 880M"
  Option "RegistryDwords" "EnableBrightnessControl=1"
EndSection</code></pre>
<h3>Keyboard Mapping</h3>
<p>I don&#8217;t use Caps Lock. I always remap it to Control. To do this in Linux Mint 16, you need to go to the Regional &amp; Language settings, Keyboard Layouts, and Options in there. Don&#8217;t change &#8220;Caps Lock key behavior&#8221; &#8212; change &#8220;Ctrl key position&#8221; and add &#8220;Caps Lock as Ctrl&#8221; there. This is so your Caps Lock key doesn&#8217;t have two KeySyms associated with it (if you&#8217;re familiar with &lt;var&gt;.XModmap&lt;/var&gt; settings). Additionally you can add pressing both Shift keys at once to toggle Caps Lock in the &#8220;Miscellaneous compatibility options.&#8221;</p>
<p>The mdm display manager doesn&#8217;t run &lt;var&gt;.XModmap&lt;/var&gt; and it&#8217;ll take a lot more effort than it&#8217;s worth to modify the XClient/.Xsession setup that Mint provides, so I went with the gui setting in this case.</p>
<h3>Suspend Mode</h3>
<p>I use the proprietary nVidia graphics driver for full 3d support. There system freezes when resuming from suspend. To fix that, add this line to the file <var>/etc/pm/config.d/unload_modules</var> (you may have to create it):</p>
<pre><code>SUSPEND_MODULES="$SUSPEND_MODULES nvidia"</code></pre>




---
title:      grunt-toggl
subheader:  Automatically start a Toggl timer with a Grunt task
date:       2014-04-29T22:30:24+00:00
hero:       http://davidosomething.com/content/uploads/header-grunt-toggl.jpg
slug:       grunt-toggl
permalink:  http://davidosomething.com/blog/grunt-toggl/
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




---
title:      Podcasts I listen to
subheader:  
date:       2013-07-08T19:20:27+00:00
tags:
  - dev
  - podcasts
  - web
hero:       
slug:       podcasts-i-listen-to
permalink:  http://davidosomething.com/blog/podcasts-i-listen-to/
---


<ul>
<li><a href="http://feeds.feedburner.com/wplatenight">WP Late Night</a></li>
<li><a href="http://feeds.feedburner.com/JsconfLive">JSConf Live</a></li>
<li><a href="http://shoptalkshow.com/feed/podcast/">ShopTalk</a></li>
<li><a href="http://devopscafe.libsyn.com/rss">DevOps Cafe Podcast</a></li>
<li><a href="http://feeds.feedburner.com/younggunsshow">Young Guns Show</a></li>
<li><a href="http://feeds.feedburner.com/the-javascript-show">The Javascript Show</a></li>
<li><a href="http://feeds.feedburner.com/JavascriptJabber">Javascript Jabber</a></li>
<li><a href="http://feeds.soundcloud.com/users/4273388-stack-exchange/tracks">Stack Exchange</a></li>
<li><a href="http://theshipshow.com/podcast.xml">The Ship Show</a></li>
<li><a href="http://feeds.feedburner.com/nbsp-new">The Non Breaking Space Show</a></li>
<li><a href="http://feeds.feedburner.com/theindustryradio">The Industry Radio Show</a></li>
<li><a href="http://feeds.feedburner.com/herdingCode">Herding Code</a></li>
<li><a href="http://feeds.feedburner.com/devhell-podcast">/dev/hell</a></li>
<li><a href="http://feeds.feedburner.com/WebdevradioPodcastHome">WebDevRadio.com &#8211; web development podcast</a></li>
<li><a href="http://feeds.feedburner.com/RailsCoach">Teach Me To Code Podcast</a></li>
<li><a href="http://feeds.FeedBurner.com/coderradiomp3">Coder Radio MP3</a></li>
<li><a href="http://feeds.feedburner.com/NodeUp">NodeUp</a></li>
<li><a href="http://feeds.feedburner.com/umsdraft">Unmatched Style » Draft</a></li>
<li><a href="http://feeds.feedburner.com/thoughtbot/wdpM">Giant Robots Smashing into other Giant Robots</a></li>
<li><a href="http://feeds.feedburner.com/thegentlymad">The Gently Mad</a></li>
<li><a href="http://hired.fm/rss.xml">Hired.</a></li>
<li><a href="http://feeds.feedburner.com/boagworldpodcast">The Boagworld Web Design Show</a></li>
<li><a href="http://voicesoftheelephpant.com/feed/podcast/">Voices of the ElePHPant</a></li>
<li><a href="http://sasscast.podbean.com/feed">SassCast</a></li>
<li><a href="http://hnpod.com/episodes.rss">HNpod</a></li>
<li><a href="http://basementcoders.com/?feed=podcast">The Basement Coders</a></li>
<li><a href="http://netstorage.discovery.com/DMC-FEEDS/xml/Stuff_You_Should_Know06252008_105853.xml">Stuff You Should Know</a></li>
<li><a href="http://feeds.feedburner.com/tedtalks_video">TEDTalks (video)</a></li>
<li><a href="http://doctype.tv/rss">Doctype</a></li>
<li><a href="http://feeds.gitminutes.com/gitminutes-podcast">GitMinutes</a></li>
<li><a href="http://feeds.feedburner.com/TheFoodFightShow">The Food Fight Show</a></li>
<li><a href="http://thewpchick.com/feed/">WordPress Training | StudioPress Training | Genesis Training | The WordPresschick.com</a></li>
<li><a href="http://mattreport.com/feed/">Matt Report</a></li>
<li><a href="http://yourwebsiteengineer.com/feed/">WordPress Resource: Your Website Engineer with Dustin Hartzler</a></li>
</ul>




---
title:      Turn off Annoying Auto-corrections in Outlook 2011
subheader:  
date:       2013-03-05T18:48:04+00:00
tags:
  - apps
  - outlook
hero:       
slug:       turn-off-annoying-auto-corrections-in-outlook-2011
permalink:  http://davidosomething.com/blog/turn-off-annoying-auto-corrections-in-outlook-2011/
---


<p>Outlook 2011 has this annoying feature where it italicizes words surrounded by underscores. For instance, if you were to type <kbd>_test_</kbd>, Outlook would change this to <em>test</em>, sans underscores. As a developer this is VERY annoying.</p>
<p>To turn it off, go to Outlook&#8217;s preferences pane and go to the AutoCorrect panel. The outdated, typewriter-era features are in the AutoFormat tab. If you&#8217;re like me and never make mistakes, you might as well turn off everything in the AutoCorrect section.</p>
<p><a href="http://davidosomething.com/content/uploads/00000101.png"><img class="lazy lazy-hidden size-medium wp-image-767" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/00000101-354x240.png" alt="I don't make mistakes." /><noscript><img class="size-medium wp-image-767" src="http://davidosomething.com/content/uploads/00000101-354x240.png" alt="I don't make mistakes." /></noscript></a></p>
<p><a href="http://davidosomething.com/content/uploads/00000100.png"><img class="lazy lazy-hidden size-medium wp-image-766" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/00000100-354x240.png" alt="And I don't use a typewriter." /><noscript><img class="size-medium wp-image-766" src="http://davidosomething.com/content/uploads/00000100-354x240.png" alt="And I don't use a typewriter." /></noscript></a></p>




---
title:      Things I learned and did in 2012
subheader:  
date:       2013-01-09T00:03:12+00:00
hero:       
slug:       things-i-learned-and-did-in-2012
permalink:  http://davidosomething.com/blog/things-i-learned-and-did-in-2012/
---


<p>Blog&#8217;s been quiet for a while, here&#8217;s a list of things I&#8217;ve learned and some significant experiences from 2012:</p>
<ul>
<li>Used <a href="http://vagrantup.com/">Vagrant</a> to spin up Ubuntu VirtualBox VMs on the fly</li>
<li>Learned to provision LAMP stacks with <a href="http://www.opscode.com/chef/">Chef</a></li>
<li>Learned MySQL command-line tools such as the REPL and mysqldump</li>
<li>Learned how to use <a href="http://betterthangrep.com/">ack</a> and <a href="http://linux.die.net/man/1/sed">sed</a> command-line tools to parse files</li>
<li>Learned how to use find and xargs (or exec) to run commands on multiple files and folders</li>
<li>Switched from BASH to ZSH</li>
<li>Switched from <a href="https://github.com/tpope/vim-pathogen">pathogen</a> to <a href="https://github.com/gmarik/vundle">Vundle</a> for Vim plugins</li>
<li>Revised my entire <a href="https://github.com/davidosomething/dotfiles">dotfiles</a> structure</li>
<li>Started using SASS instead of CSS for websites (<a href="http://mhs.github.com/scout-app/">Scout.app</a> is nice)</li>
<li>Started using JavaScript templating (e.g. <a href="https://github.com/janl/mustache.js/">mustache.js</a> for client-side HTML generation.</li>
<li>Evaluated several project and task management web apps (<a href="http://www.asana.com/">Asana</a> is a winner!)</li>
<li>Evaluated hundreds of WordPress plugins and <a href="http://profiles.wordpress.org/davidosomething" title="favorite WordPress plugins">favorited</a> really useful ones</li>
<li>Contributed to someone else&#8217;s WordPress plugin &#8211; <a href="http://wordpress.org/extend/plugins/per-post-scripts-and-styles/">Per Post Scripts &amp; Styles</a></li>
<li>Evaluated hundreds of <a href="http://delicious.com/davidosomething/">JavaScript/jQuery plugins and bookmarked</a> decent ones</li>
<li>Learned how to do <a href="https://developers.facebook.com/docs/reference/login/">Facebook authentication</a> and work with the <a href="https://developers.facebook.com/docs/reference/api/">Graph API</a></li>
<li>Learned and used the <a href="http://instagram.com/developer/">Instagram API</a></li>
<li>Started linting my JavaScript</li>
<li>Improved tooling with <a href="http://gruntjs.com/">grunt.js</a></li>
<li>Learned the ins and outs of <a href="http://desandro.com/">David DeSandro</a>&#8216;s <a href="http://isotope.metafizzy.co/">jquery.isotope</a></li>
<li>Updated <a href="https://github.com/davidosomething/dkowpconfig">my WordPress setup for multiple environments</a></li>
<li>Started listening to podcasts regularly (links coming soon)</li>
<li>Learned how to deploy to <a href="https://openshift.redhat.com/app/">RedHat&#8217;s OpenShift PaaS</a></li>
<li>Learned how to deploy projects using <a href="http://www.github.com">GitHub&#8217;s</a> webhooks</li>
<li>Taught HTML, CSS, and WordPress courses at <a href="http://www.cdiabu.com/">Boston University Center for Digital Imaging and Arts</a>. My <a href="https://github.com/davidosomething/slides">course slides</a> are on GitHub.</li>
<li>Took basic Mandarin Chinese lessons at the <a href="http://www.bostonchineseinstitute.com">Chinese Institute of Language and Arts in Boston</a></li>
<li>Visited Taiwan</li>
<li>Moved to New York City</li>
</ul>




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
permalink:  http://davidosomething.com/blog/making-a-brightcove-video-gallery/
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




---
title:      Automatic torrenting in Linux / OSX
subheader:  
date:       2011-12-07T18:51:39+00:00
tags:
  - archlinux
  - CouchPotatoApp
  - cron
  - FlexGet
  - Scheduling
  - seedbox
  - torrent
hero:       
slug:       automatic-torrenting-in-linux
permalink:  http://davidosomething.com/blog/automatic-torrenting-in-linux/
---


<p><em>This is all hypothetical. Do this at your own risk.</em></p>
<ul>
<li>12-10-2011 &#8212; updated blocklist script</li>
<li>12-07-2011 &#8212; added encryption and blocklists</li>
</ul>
<p>I&#8217;m writing based on an ArchLinux setup, but this all translates to any other Linux distro and OSX pretty easily.</p>
<h2>The Setup</h2>
<ul>
<li><a href="http://www.archlinux.org/" target="_blank">ArchLinux</a> for the seedbox (or whatever distro you want).</li>
<li><a href="http://showrss.karmorra.info/" target="_blank">ShowRSS</a> to create a feed of torrents for TV shows.</li>
<li><a href="http://www.flexget.com/" target="_blank">FlexGet</a> to read the RSS feed and download the attached torrent file.</li>
<li><a href="http://couchpotatoapp.com/" target="_blank">CouchPotatoApp</a> to grab torrents for movies.</li>
<li><a href="http://www.transmissionbt.com/" target="_blank">TransmissionBT</a> to do the actual torrenting.</li>
</ul>
<h2>The Configs</h2>
<h3>ShowRSS</h3>
<p>Just register, pick your shows, and get the main feed. Note that when we get to the FlexGet configuration, the feed URL includes the namespace parameter. Not sure if it&#8217;s necessary but it works.</p>
<h3>TransmissionBT</h3>
<h4>Installation and Management</h4>
<p><a href="http://davidosomething.com/content/uploads/transdroid-main-180x300.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/transdroid-main-180x300-180x100.png" alt="Transdroid" title="Transdroid" width="180" height="100" class="lazy lazy-hidden alignleft size-thumbnail wp-image-738" /><noscript><img src="http://davidosomething.com/content/uploads/transdroid-main-180x300-180x100.png" alt="Transdroid" title="Transdroid" width="180" height="100" class="alignleft size-thumbnail wp-image-738" /></noscript></a>I run transmission as a daemon (transmission-cli-svn) and access it via <a href="http://www.transdroid.org/" target="_blank">Transdroid</a> on my Droid, <a href="https://github.com/fagga/transmission-remote-cli" target="_blank">transmission-remote-cli</a> (transmission-remote-cli-git in the AUR) in consoles, or the web interface in browsers. Configuring the daemon after installing it from the AUR is pretty straightforward &#8212; just make sure the daemon isn&#8217;t running (<kbd>sudo /etc/rc.d/transmissiond stop</kbd>) and edit the <var>~/.config/transmission-daemon/settings.json</var> file. Be sure to turn on RPC authentication and set a username and password.</p>
<h4>Encryption and Blocklists</h4>
<p>TransmissionBT has native support for encryption and blocklists. In the settings.json file, I set <var>&#8220;encryption&#8221;: 2</var> to require encryption. I also enable blocklists: <var>&#8220;blocklist-enabled&#8221;: true</var>. To get blocklists working, you need to download the list as a text file and store it in the <var>~/.config/transmission-daemon/blocklists</var> directory. The following script does that for you, using the Bluetack level1 blocklist.</p>
<pre>
#!/bin/bash

function downloadUnzipMove {
  echo "* Processing blocklist '$1'..."
  if wget -O "/home/davidosomething/tmp/$1.gz" "http://list.iblocklist.com/?list=bt_$1&#038;fileformat=p2p&#038;archiveformat=gz" >/dev/null 2>&#038;1; then
    gunzip "/home/davidosomething/tmp/$1.gz"
    mv "/home/davidosomething/tmp/$1" "/home/davidosomething/.config/transmission-daemon/blocklists/$1.txt"
  fi
  echo "  DONE"
}

downloadUnzipMove level1
downloadUnzipMove dshield
downloadUnzipMove spyware
downloadUnzipMove hijacked

# restart transmission-daemon (only way to reload blocklists)
echo Restarting transmission-daemon to reload blocklists
/etc/rc.d/transmissiond restart
</pre>
<p>I use cron (as root, since the transmissiond service has to be restarted to reload blocklists) to run this automatically every week.</p>
<p>You can add more blocklists, just modify the function call and maybe the name of the blocklist file from iblocklist if you&#8217;re using non-bluetack lists. To find out more about which blocklists to use, check out the <a href="http://www.iblocklist.com/lists.php" target="_blank">iBlocklist site</a>.</p>
<h3>FlexGet</h3>
<h4>Installation</h4>
<p>I had to install FlexGet manually &#8212; the copy in the AUR was broken. Here are the steps to do this with packer as my AUR helper:</p>
<pre>
# Get python2.7
sudo pacman -S python2

# If you have python2-distribute and it conflicts, remove it (and dependents)
# flask and jinja are in setuptools, btw
sudo pacman -Ru python2-flask python2-jinja python2-distribute

# get python-setuptools from the aur, which has the easy_install script
sudo packer -S python2-setuptools

# run easy_setup (with version suffix "2.7" if needed) to get flexget
sudo easy_install-2.7 flexget

# test install, any errors?
flexget -v

# for communicating with transmissionBT:
sudo packer -S pytransmissionrpc
</pre>
<h4>Config</h4>
<p>Your FlexGet config should be something like the following. You can optionally use the all_series FlexGet plugin so you don&#8217;t have to manually define the series&#8217; names. Thanks to <a href="http://www.twitter.com/#!/danielparker" target="_blank">@danielparker</a> for providing this barebones config:</p>
<pre>
feeds:
  showrss:
    download: true
    rss: http://showrss.karmorra.info/rss.php?user_id=YOURUSERID&#038;hd=null&#038;proper=null&#038;namespaces=true
    series:
      - Thundercats
      - Some Other Show
    set:
      path: /path/to/video/locations/{{series_name}}/Season {{series_season}}
presets:
  global:
    transmission:
      addpaused: false
      host: localhost
      username: yourTransmisionWebUIUsername
      password: yourTransmisionWebUIPass
      port: 9091
      ratio: 1.0
      removewhendone: true
</pre>
<h4>Scheduling via cron</h4>
<p>The <a href="http://flexget.com/wiki/InstallWizard/Linux/Environment/FlexGet/Scheduling" target="_blank">flexget site explains scheduling via cron</a> well.</p>
<h4>Updating FlexGet</h4>
<p>If you installed via python easy_install as I did, you can update FlexGet in the future by using this command:</p>
<pre>sudo easy_install2.7 --upgrade flexget</pre>
<h3>CouchPotatoApp</h3>
<p><a href="http://davidosomething.com/content/uploads/mobilepotato.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/mobilepotato-143x240.jpg" alt="Mobile Potato" title="Mobile Potato" width="143" height="240" class="lazy lazy-hidden alignright size-medium wp-image-740" /><noscript><img src="http://davidosomething.com/content/uploads/mobilepotato-143x240.jpg" alt="Mobile Potato" title="Mobile Potato" width="143" height="240" class="alignright size-medium wp-image-740" /></noscript></a>Grab couchpotato-git from the AUR and hit <samp>http://localhost:5000/</samp> to start configuring it. It runs as a daemon, so start it and put it in your DAEMONS list in <var>/etc/rc.conf</var>. CouchPotatoApp has automatic push into transmission via the RPC client that you should have set up.</p>
<p>Check out <a href="https://market.android.com/details?id=com.oskarsson.mobilepotato" target="_blank">Mobile Potato</a> to add movies via Android. It works alongside the IMDB android app. If you&#8217;re looking through IMDB and see a movie you want, you can send it to CouchPotatoApp.</p>
<h3>Remote management</h3>
<p>Make sure all your services (ssh, transmission, couchpotato) are passworded. Make sure your router ports are forwarded for those apps as well. A dynamic DNS pointing to your router/seedbox would be useful if you need to access this stuff from outside your network and don&#8217;t know your IP all the time.</p>




---
title:      Fix CF SerializeJSON number conversion
subheader:  
date:       2011-08-30T12:29:56+00:00
hero:       
slug:       fix-cf-serializejson-number-conversion
permalink:  http://davidosomething.com/blog/fix-cf-serializejson-number-conversion/
---


<p>In ColdFusion if you use the SerializeJSON function on an object, the values for each key get converted into JSON values.<br />
This means that zip codes like &#8220;02115&#8221; (regardless if they are strings or integers) are converted to 2115.0 and large numbers like cellphone numbers&mdash;3132123232 are converted to scientific notation (3132123232E9 or something like that, too lazy to get it exactly right).<br />
This blog post: <a href="http://craigkaminsky.blogspot.com/2008/11/coldfusion-serializejson-gotcha.html"></a> from 2008 that addresses it and provides a solution, but the solution doesn&#8217;t work for the larger floating point numbers with the E. I&#8217;ve fixed (and simplified) the code below&mdash;it&#8217;s in cftag form now:</p>
<p><script src="https://gist.github.com/davidosomething/da5acad29f4434e59eef.js"></script></p>




---
title:      BASH script to copy files from a git commit
subheader:  
date:       2011-08-22T12:29:38+00:00
tags:
  - bash script
  - copy
  - git
hero:       
slug:       bash-script-to-copy-files-from-a-git-commit
permalink:  http://davidosomething.com/blog/bash-script-to-copy-files-from-a-git-commit/
---


<p>This is a small BASH script I wrote to create a folder of changed files for web deployment. This is useful for a small project that doesn&#8217;t need a complicated deployment system. It should live in a folder within the project. There should be folders called &#8220;deploy&#8221; and &#8220;filelists&#8221; in the folder as well. Of course, you can edit the script to change those requirements.</p>
<p>The script takes a single argument &#8212; a git hash or revision name (e.g., HEAD). It gets the git commit log for that commit and stores the logged filenames into a new file tagged with the date. That files list is then read and each folder mentioned in the list is created in a &#8220;deploy&#8221; folder. The corresponding file (assumed to be a directory level lower) is copied into the appropriate folder in the deploy folder.</p>
<h3>Usage:</h3>
<pre><kbd>./getfiles.sh HEAD</kbd></pre>
<h3>Script:</h3>
<pre><code>#!/bin/bash
if [ $# -ne 1 ]
then
  echo "Usage: `basename $0` {GIT REVISION SHA}"
  exit $E_BADARGS
fi

filelist="files-$(date +"%s").txt"
git show --pretty="format:" --name-only $1 &gt; $filelist
for file in $(&lt;$filelist); do
  mkdir -p "deploy/$(dirname $file)"
  cp "../$file" "deploy/$file"
done
mv $filelist filelists/

ls -GpR deploy
echo "DONE: deploy/ directory populated with files from commit $1"</code></pre>




---
title:      First week developing on a Mac
subheader:  
date:       2011-06-20T19:59:45+00:00
hero:       
slug:       first-week-developing-on-a-mac
permalink:  http://davidosomething.com/blog/first-week-developing-on-a-mac/
---


<p>The following is a whining session about developing on OSX. It&#8217;s not all bad.</p>
<p>I had been using an old (2004) DELL machine at work with Windows XP. Needless to say, the machine was pagefaulting and had a bunch of problems with its RAM. So they finally got me a new computer to work on &#8212; a 24&#8243; iMac with an i3 processor. Not exactly a beast, but it&#8217;s a big upgrade.</p>
<p>I was using Notepad++ on my PC and I am ridiculously fast on it. Maybe it&#8217;s a sad thing, but I&#8217;ve never seen anyone move lines and refactor and reorganize code at the speed I can on a PC. That speed, along with file management in Explorer and on the commandline, were the two things I used to benchmark my effectiveness on a PC.</p>
<h2>Finder sucks.</h2>
<p>Immediately, the crappiest part of OSX is the Finder. Granted, it&#8217;s pretty, but you can&#8217;t do simple things like cut files for moving without some 3rd party software or AppleScripting. At this point, I have most of the Finder keyboard shortcuts down (window management, opening programs, creating folders) and can do everything without a mouse.</p>
<h2>TextMate is nice, but MacVim is free.</h2>
<p>Next point &#8212; all the good software requires a license. I hear Mac developers all love using TextMate or Coda. I used the trials for each of those up, and TextMate is the winner in that category. Coda is like many programs in one, but not robust enough in any single aspect that I would use it. SublimeEdit, which I experimented on PC for a bit is similar to TextMate, but still requires too much work to get it going. Smultron and TextWrangler are just okay but they lack features like transposing lines of text and column editing. I decided to learn VIM instead (abandoning my emacs roots since aquamacs was hideous) and I&#8217;ve gotten pretty fast at it. IMO on a Mac &#8212; VIM is still the way to go in terms of non-IDE editors. If I can get a TextMate license I might go that route, but it&#8217;s a good idea to learn VIM too since I&#8217;m in terminals often and emacs isn&#8217;t on every server. I&#8217;ll be looking forward to the development of Bespin and Kod for the future.</p>
<h2>I want Transmit.</h2>
<p>FTP on a mac is a nightmare. This is in part due to the Finder design. I had been using FileZilla on Windows, and it is available on OSX as well, but there are quirks here and there (like a missing bookmarks dropdown). Transmit was lovely, especially the bookmarks screen. I would use that as well if I can convince the company to get a license. I went through Interarchy, Cyberduck (so slow), FileZilla OSX, Fetch, Forklift, and even Finder&#8217;s native FTP to decide on Transmit. With the trial expired, I&#8217;ve effectively forsaken FTP clients and am using ANT to do all my uploading (which won&#8217;t last long since it&#8217;s a waste of time to write a build script to up/download some one-off projects). Cyberduck, for its ability to name bookmarks (which Finder cannot) and property as a native OSX app (which Filezilla is not), is my emergency client.</p>
<h2>Made for IDEs?</h2>
<p>Perhaps I will try the all-IDE route for my next project &#8212; Eclipse, Dreamweaver, Aptana, Coda seem to have a lot of features build in like SVN and FTP. I&#8217;ve used them before, but that was in the 2GB of RAM/2Ghz CPU days, when it was a pain to load or keep the RAM-hogging IDEs open.</p>
<h2>Remote computing on a Mac?</h2>
<p>OSX VNC clients all suck (I&#8217;m using the built-in CMD-K one, ChickenoftheVNC is outdated and slow, and Jollysfast doesn&#8217;t render everything correctly). Maybe I can get an NX server going instead. The Remote Desktop client is alright.</p>
<h2>E-mail is nice.</h2>
<p>I&#8217;m using Entourage as an Outlook replacement. It lacks the ability to traverse through Active Directory groups (displaying users and recursing). I&#8217;m sure Outlook 2011 can do this, so this is only a budget limitation. Sparrow and mail.app look nice, but I actually like the web client for gmail.</p>
<h2>Interactive version control is pretty but not functional.</h2>
<p>I miss the Tortoise* shell extensions. I have a license for Versions (Cornerstone is pretty much the same, after using the trial) and it&#8217;s just not as easy as right clicking to commit. I think there&#8217;s a shell extension for SVN out there but not for Hg and git. I guess it&#8217;s time I switched everything over to git and commandline it anyway. I&#8217;m not even going to try Tower for git since it&#8217;s probably like Versions. If it ain&#8217;t integrated with Finder, it ain&#8217;t worth it.</p>
<h2>It&#8217;s a UNIX system. I know this.</h2>
<p>What I&#8217;ve actually liked so far is that OSX has its own terminal and is POSIX compliant. Its UNIXness is great, and with DTerm and iTerm 2 (both free programs) it&#8217;s easy to do commandline things (i.e., version control or &#8220;touch file.txt&#8221; since there&#8217;s no context-menu to create a blank file). The AppStore is cool, but I hear Win8 will get one, too. I&#8217;m a fan of MacPorts (haven&#8217;t tried Homebrew because I already have things going in /usr/local/).</p>
<h2>Beachball of doom, unhappy mac face, grey screen of death, shit happens!</h2>
<p>Finally, programs still crash ALL THE TIME. I have to force quit things every now and then, too. It&#8217;s the software&#8217;s fault, of course, but anyone who says Macs don&#8217;t crash is probably just browsing the internet all day or crunching numbers.</p>
<h2>tl;dr</h2>
<p>This monitor is gorgeous<em><strong>!!</strong></em></p>




---
title:      jQuery Wunderkind plugin
subheader:  
date:       2011-03-03T23:18:46+00:00
tags:
  - imagemap
  - javascript
  - jquery
  - plugin
hero:       
slug:       jquery-wunderkind-plugin
permalink:  http://davidosomething.com/blog/jquery-wunderkind-plugin/
---


<p>So I&#8217;m officially a jQuery plugin author now. I wrote a plugin, jQuery Wunderkind that can create a CSS imagemap for you with hover effects (the special thing is the hover effect). There&#8217;s lots of room for improvement, but there aren&#8217;t many imagemap plugins to choose from so it&#8217;s worth something I&#8217;m sure.</p>
<p>I made this plugin as a challenge to myself, after working on a client website that has a similar feature (see the larger flash module on thetruth.com). With this plugin it&#8217;s easy to recreate the entire flash module without flash.</p>
<p>Get the plugin and more details here:<br />
jQuery Wunderkind</p>
<p>For support and comments, use the comments form below.</p>




---
title:      Reconfigured WAMP on my laptop
subheader:  
date:       2011-02-03T21:50:48+00:00
tags:
  - apache
  - coldfusion
  - Mercurial
  - mysql
  - php
hero:       
slug:       reconfigured-wamp-on-my-laptop
permalink:  http://davidosomething.com/blog/reconfigured-wamp-on-my-laptop/
---


<p>I recently made the move from <a href="http://www.apachefriends.org/en/index.html">XAMPP</a> to installing each part of the WAMP stack individually on my laptop. I did it to get tighter control over where each service was installed, and also to properly version my settings files. My <var>httpd.conf</var> file now just has one line at the end of it that includes my <var>httpd-potatobook.conf</var> file. This file defines my Virtual Hosts, loads 3rd-party modules, and is version control in Mercurial.</p>
<p>I&#8217;ve got the latest <a href="http://php.net/manual/en/install.windows.apache2.php">PHP installed as FastCGI</a> instead of as an Apache module and pointed the default <var>php.ini</var> file to the same folder as <var>httpd-potatobook.conf</var> (also under version control). Finally, I&#8217;ve installed Adobe ColdFusion 9 Developer Edition. It was much easier to get up and running (the installer does EVERYTHING) with Apache than is Railo 3.2 now that Tomcat has replaced <a href="http://www.caucho.com/">Caucho Resin</a> as the application server. Tomcat is a beast.</p>
<p>Rather than use <a href="http://www.phpmyadmin.net/home_page/index.php">phpMyAdmin</a>, I&#8217;m trying out <a href="http://www.chive-project.com/">Chive</a> for MySQL administration. With the exception of zipped exports, it&#8217;s doing the job well. Maybe if the phpMyAdmin theme system was more backward compatible&mdash;or a really nice theme came out&mdash;I would switch back.</p>




---
title:      Safely installing npm on Ubuntu
subheader:  
date:       2010-12-09T17:31:13+00:00
tags:
  - development
  - node.js
  - Ubuntu
hero:       
slug:       safely-installing-npm-on-ubuntu
permalink:  http://davidosomething.com/blog/safely-installing-npm-on-ubuntu/
---


<p>npm is a package manager for node.js. Using this to download libraries that extend node.js will make your life a lot easier.</p>
<p>I did this on Ubuntu 10.10, it should work in all versions AFAIK. You can change the paths to your liking. I don&#8217;t really use my home (~) since I don&#8217;t use Ubuntu as my primary OS (it&#8217;s just a VM for a development server), so I just leave stuff wherever.</p>
<pre># make sure you're in your home dir
cd ~

# create .npmrc to install
cat &lt;&lt;NPMRC >>$HOME/.npmrc
root = ~/.node_libraries
manroot = ~/local/share/man
binroot = ~/bin
NPMRC

# pipe install script to shell, running it
curl http://npmjs.org/install.sh | sh

# add ~/bin to PATH
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc

# add ~/share/man to MANPATH (fix warning)
echo 'export MANPATH=$MANPATH:/share/man' >> ~/.bashrc

# run .bashrc startup script
. ~/.bashrc
</pre>




---
title:      Shuttle PC: new harddrive, Clonezilla &#038; Windows 7
subheader:  
date:       2010-12-03T23:12:44+00:00
tags:
  - Shuttle
  - windows
hero:       
slug:       shuttle-pc-new-harddrive-clonezilla-windows-7
permalink:  http://davidosomething.com/blog/shuttle-pc-new-harddrive-clonezilla-windows-7/
---


<p><a href="http://davidosomething.com/content/uploads/hitachi.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/hitachi.jpg" alt="" title="Hitachi 1 TB 7200 RPM bare drive" width="300" height="225" class="lazy lazy-hidden alignright size-full wp-image-440" /><noscript><img src="http://davidosomething.com/content/uploads/hitachi.jpg" alt="" title="Hitachi 1 TB 7200 RPM bare drive" width="300" height="225" class="alignright size-full wp-image-440" /></noscript></a> I bought a <a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16822145304">new harddrive</a> on sale after Cyber Monday to replace the 250 GB harddrive in my Shuttle. It&#8217;s a bare drive, which means it doesn&#8217;t come with a SATA cable or box. Now I&#8217;ve got a total of 2 TB of storage with 1 TB already full.</p>
<p>I used my super-difficult-to-open Lacie case (pried it open with scissors) to house and connect the bare drive while I formatted it. This was a time when I really wished I had an eSata dock or enclosure.</p>
<p>I did a full format rather than quick; the difference is that a full format attempts to write empty bytes to each sector and does a <kbd>chkdsk /r</kbd> at the same time to fix any bad sectors. Knowing that UPS didn&#8217;t damage my drive, I felt safer using it as my new primary/boot drive. The full format took about 8 hours D:</p>
<p><a href="http://davidosomething.com/content/uploads/clonzilla.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/clonzilla.jpg" alt="" title="Clonezilla" width="300" height="300" class="lazy lazy-hidden alignleft size-thumbnail" /><noscript><img src="http://davidosomething.com/content/uploads/clonzilla.jpg" alt="" title="Clonezilla" width="300" height="300" class="alignleft size-thumbnail" /></noscript></a><a href="http://clonezilla.org/">Clonezilla</a> was used to image the old harddrive to the new one. I did a device to device image of the entire disk (as opposed to a single partition), which was faster but not necessarily safer than going from the old disk to image, image to new disk. The master boot record and Windows system partition were also preserved in this manner, so I didn&#8217;t need to boot from a Windows install/repair CD. I swapped the drives, moving the 250 GB into the Lacie case and the 1 TB into the Shuttle.</p>
<p>The system started perfectly, although some new Hitachi driver had to be installed upon booting. I extended the 250 GB partition to occupy the additional space using the Windows Disk Management tool (right click on My Computer -> Manage). After a final reboot, I&#8217;ve got an additional 750 GB to play with.</p>




---
title:      My Development Setup
subheader:  
date:       2010-11-29T20:35:48+00:00
tags:
  - apache
  - bitbucket
  - commandline
  - cygwin
  - development
  - DNS
  - FTP
  - LAMP
  - Linux
  - Mercurial
  - MongoDB
  - mysql
  - node.js
  - php
  - router
  - SSH
  - Ubuntu
  - virtualbox
hero:       
slug:       my-development-setup
permalink:  http://davidosomething.com/blog/my-development-setup/
---


<p>Although I primarily develop on a Windows PC, I still consider Linux (also Unix and OSX) the most powerful and practical environment for setting up web and database servers, DNS, and version control repositories (as a master on DVCS). A few of the benefits include:</p>
<ul>
<li>Using SSH to connect to a linux commandline is faster compared to RDP&#8217;ing or VNC&#8217;ing into a Windows machine (also saves battery life on smartphones). Cygwin is a slow alternative.</li>
<li>Package management for easy (and frequent) upgrades.</li>
<li>More robustly integrated file permissions between the file system and web server (that is, IIS doesn&#8217;t use NTFS file permissions, but instead Windows account permissions).</li>
<li>File paths and naming make more sense on *nix than Windows. For instance, <samp>.htaccess</samp> is a system file, not an unnamed file with the htaccess extension.</li>
</ul>
<h2>The setup</h2>
<p>For my personal set up, I&#8217;ve currently got a VM running on my media center PC with the following:</p>
<ul>
<li>OpenSSH on port 22</li>
<li>Apache Server 2.2, listening on port 80 for incoming web traffic</li>
<li>Apache Tomcat, listening on port 8080 for incoming web traffic</li>
<li>vsFTPd on port 21</li>
<li>awstats for Apache log file analysis</li>
<li>PHP 5</li>
<li>Railo for Adobe Coldfusion</li>
<li>MySQL</li>
<li>Git &#8211; to get node.js and other source</li>
<li>Mercurial &#8211; for my own version control</li>
<li>node.js as a daemon</li>
<li>MongoDB (for Hummingbird and anything else)</li>
<li>Hummingbird through node.js server, listening on port 8000 for <strong>live</strong> analytics&#8230; just to play with</li>
<li>Icinga (Nagios fork) for service monitoring</li>
</ul>
<p>It&#8217;s accessible via RDP using VirtualBox&#8217;s VRDP on port 4000. That means I can access it using a Remote Desktop client like the one that comes with Windows. With that I can access an X-Windows environment (xinit, or desktops like Gnome, KDE, XFCE) without having to do X11 forwarding to the local computer (such as through XMing or Cygwin/X). For the record, RDP is faster than X11 forwarding but doesn&#8217;t allow for seamless integration.</p>
<h2>Here are the steps I took to set up my VM</h2>
<h3>Setting up the host computer</h3>
<ol>
<li>Allow Wake-on-LAN
<ol>
<li>Enable BIOS setting</li>
<li>Enable NIC card setting in Windows Device Manager</li>
<li>Set up router port forwarding</li>
</ol>
</li>
<li>Install TightVNC Server
<ol>
<li>Run as service</li>
<li>Forward ports on router: 5800 for java client, 5900 for vnc clients</li>
</ol>
</li>
</ol>
<h3>Setting up the Virtual Machine</h3>
<ol>
<li>Install Ubuntu Server Edition into new VirtualBox virtual machine
<ol>
<li>Use default LAMP settings</li>
<li>Install OpenSSH</li>
</ol>
</li>
<li>Configure VRDP on Port 4000 instead of port 3389. This way, RDPing into 3389 allows you to access the host, 4000 the VM. Forward the ports to the computer with the router.
	</li>
<li>Create a shared drive to interact with the host computer, follow this: <a href="http://ipggi.wordpress.com/2010/03/11/virtualbox-shared-folders-with-ubuntu-server-guest/">http://ipggi.wordpress.com/2010/03/11/virtualbox-shared-folders-with-ubuntu-server-guest/</a></li>
<li>Since the machine runs headless most of the time, the VM is opened using VBoxHeadlessTray: http://www.toptensoftware.com/VBoxHeadlessTray/</li>
<li>Install the following tools:
<ul>
<li>emacs (or whatever you want for text editing)</li>
<li>curl</li>
<li>wget</li>
<li>unzip</li>
<li>elinks (or whatever you want)</li>
</ul>
</li>
</ol>
<h3>Setting up LAMP</h3>
<p>There&#8217;s so many tutorials on this, it&#8217;s ridiculously easy. Also, the default config is not bad for development purposes.</p>
<h3>Setting up phpMyAdmin</h3>
<p>You can basically just let the aptitude installer do everything. The instance will be accessible at http://localhost/phpmyadmin</p>
<ol>
<li><kbd>sudo apt-get install phpmyadmin</kbd></li>
</ol>
<h3>Setting up awstats</h3>
<p>Follow http://maestric.com/doc/ubuntu/awstats</p>
<h3>Setting up the file system and vsftpd</h3>
<p>Regular install, then edit the config file in /etc/ and change some permissions:</p>
<ol>
<li>Add default user to group www-data (apache default group): <kbd>sudo usermod -a -G www-data username</kbd></li>
<li>chmod /var/www, allowing group read and write</li>
<li>Allow owner and group and write using local_umask = 002</li>
<li>Set the default FTP path to /var/www</li>
</ol>
<h3>Setting up Mercurial</h3>
<ol>
<li>Follow this to get apt-add-repository <a href="https://help.ubuntu.com/community/Repositories/CommandLine#Adding Launchpad PPA Repositories">https://help.ubuntu.com/community/Repositories/CommandLine#Adding Launchpad PPA Repositories</a></li>
<li>Then, follow this to add the mercurial repository and install it <a href="http://icephoenix.us/linuxunix/installing-mercurial-1-5-or-1-6-on-ubuntu-lucid-lynx-10-04/">http://icephoenix.us/linuxunix/installing-mercurial-1-5-or-1-6-on-ubuntu-lucid-lynx-10-04/</a>. TortoiseHg is not needed since we&#8217;re doing everything from the commandline.</li>
<li>I didn&#8217;t want to use bitbucket, so I installed hg cgi server (hg serve only allows one unsecured connection at a time) to create my own web based repository:
<ol>
<li>Get the mercurial source tar.gz using wget or elinks</li>
<li>Copy hgweb.cgi and all the folders from /templates/ to<br />
				/var/hg (chmod -R g+w www-data:www-data)</li>
<li>Edit hgweb.cgi, set:<br />
				<code>config = "/var/hg/hgweb.config"</code></li>
<li>Put the repo paths/collections on the drive that is shared with the host (this way the files aren&#8217;t stored in the virtual hard disk&#8211;you can back them up easily). I mounted my share drive at <samp>/mnt/share</samp> and created the <var>repos</var> folder in there. Because the share is on a windows host, the permissions are always 777 chowned to root:root</li>
<li>More help here: <A href="http://mercurial.selenic.com/wiki/HgWebDirStepByStep#Directory_Structure">http://mercurial.selenic.com/wiki/HgWebDirStepByStep#Directory_Structure</a></li>
</ol>
</li>
<li>I had some existing local repositories on my Windows development PC that I wanted centralized onto this computer so I cloned them:
<ol>
<li>Use hg serve on the development PC (can be done through TortoiseHg!)</li>
<li>From the VM, hg clone the existing repos (use the development PC&#8217;s IP as the source URL)</li>
</ol>
</li>
<li>Currently the repositories are all unsecured, so to secure them:
<ol>
<li>Use apache to password protect repository (no native security in hg, use basic or digest auth. SSH can be used, too, but then why bother with hgweb?)</li>
<li>Under directory directive of main.conf in /etc/apache/hg/
<pre>
&lt;Location /hg&gt;
  AuthType Basic
  AuthName "Mercurial repositories"
  AuthUserFile /var/htpasswd/hg
  Require valid-user
&lt;/Location&gt;
</pre>
</li>
<li>See more on Apache security here: <a href="http://httpd.apache.org/docs/2.0/howto/auth.html">http://httpd.apache.org/docs/2.0/howto/auth.html</a></li>
<li>Allow push using http by following the troubleshooting instructions here: <a href="http://mercurial.selenic.com/wiki/PublishingRepositories#Troubleshooting">http://mercurial.selenic.com/wiki/PublishingRepositories#Troubleshooting</a>
		</ol>
</li>
</ol>
<h3>Setting up Railo for ColdFusion</h3>
<p>The only thing to note here is that Ubuntu no longer uses <var>sun-java6-jdk</var>. Instead use <var>openjdk-6-jdk</var> or <var>default-jdk</var> (same thing).</p>
<h3>Notes on setting up MongoDB</h3>
<ol>
<li><kbd>sudo apt-get install mongodb-stable</kbd> (not mongodb, they&#8217;re different).</li>
<li>Set up for PHP/Apache using php&#8217;s PECL (need php-dev for phpize and php-pear for pecl)</li>
<li>If mongod won&#8217;t start, make sure the default dbpath isn&#8217;t locked.</li>
</ol>
<h3>Setting up node.js</h3>
<ol>
<li>Set up a la <a href="http://www.codediesel.com/linux/installing-node-js-on-ubuntu-10-04/">http://www.codediesel.com/linux/installing-node-js-on-ubuntu-10-04/</a></li>
<li>After cloning the git repo, check out a stable tag:
<ul>
<li>To list tags: <kbd>git tag -l</kbd></li>
<li>To checkout a tag: <kbd>git checkout v0.2.4</kbd></li>
</ul>
</li>
<li>Node.js can be set up to run as a daemon following this: <a href="http://howtonode.org/deploying-node-upstart-monit">http://howtonode.org/deploying-node-upstart-monit</a></li>
<li>See the related post on how to install npm safely (link at bottom).</li>
</ol>
<h3>Hummingbird</h3>
<ol>
<li>Requires STABLE version of node.js</li>
<li>Install via <a href="https://github.com/mnutt/hummingbird/blob/master/README.md">https://github.com/mnutt/hummingbird/blob/master/README.md</a> &#8211; the instructions on the Hummingbird site website are outdated.</li>
</ol>
<h3>Icinga</h3>
<ol>
<li><kbd>sudo apt-get install icinga</kbd></li>
<li>Use NO CONFIG for postfix when it comes to it. You&#8217;ll have to set this up later if you want e-mail notifications.</li>
<li>The instance will be available at http://localhost/icinga &#8211; username is icingaadmin</li>
</ol>
<h3>Final router configuration</h3>
<ol>
<li>Bridging network connections gives the VM its own network IP. This changes the host&#8217;s network IP to a new IP so any previous port forwarding or virtual servers will have to point to the new IP.
<ol>
<li>Select host and VirtualBox connection</li>
<li>Bridge connections</li>
</ol>
</li>
<li>Router: Port forwarding
<ol>
<li>Finding your IP addresses:
<ol>
<li>From the host machine, go to whatismyip.com for the router / external IP.</li>
<li>From the host machine, run cmd > ipconfig  for the bridged network IP.</li>
<li>From the VM, type ifconfig for the VM&#8217;s network IP.</li>
</ol>
</li>
<li>Final port forwarding configuration:
<ul>
<li>21 to VM for FTP</li>
<li>22 to VM for SSH</li>
<li>80 to VM for HTTP</li>
<li>443 to VM for HTTPS</li>
<li>3389 to Host PC for RDP</li>
<li>4000 to VM for RDP</li>
<li>5800 to Host PC for VNC</li>
<li>5900 to Host PC for VNC</li>
<li>8000-8888 to VM for node.js, Hummingbird, Tomcat and Railo</li>
</ul>
</li>
<li>DynDNS setup should be done via router, otherwise forward all to Host machine and use DynDNS updater software on host machine, have host machine forward to VM.</li>
</ol>
</li>
</ol>
<p>From this point on I was able to access my VM and all of the forwarded ports using the DynDNS address. It&#8217;s really convenient to be able to VNC onto the host machine if something needs changing, SSH into the VM to do updates or set up virtual hosts, and do an Hg push to this address as a master repository. Getting all the puzzle pieces working together and gaving a good setup has really improved my workflow.</p>




---
title:      LDAP / Active Directory auth in WordPress
subheader:  
date:       2010-11-18T16:12:53+00:00
tags:
  - active directory
  - php
  - wordpress
hero:       
slug:       ldap-active-directory-auth-in-wordpress
permalink:  http://davidosomething.com/blog/ldap-active-directory-auth-in-wordpress/
---


<p>
 I am going to discuss LDAP / Active Directory authentication in PHP and WordPress using custom directory schemas. If you want to integrate your PHP application or WordPress login with LDAP but aren&#8217;t using a typical LDAP setup (with organizational units and such, or requiring the domain prefix: &#8216;domainusername&#8217;), then read on.
</p>
<h2>First, some technical terms:</h2>
<p>
 <em>LDAP</em> is a protocol for storing directory information, like a guideline for a phonebook.
</p>
<p>
 Microsoft&#8217;s implementation of the LDAP protocol is called <em>Active Directory</em>.
</p>
<h2>Existing plugins</h2>
<p>
 There are many plugins for WordPress that can utilize LDAP/AD for authentication. Here&#8217;s a few of them:
</p>
<ul>
<li><a href="http://wordpress.org/extend/plugins/wpldap/">WordPress LDAP Authentication</a></li>
<li><a href="http://wordpress.org/extend/plugins/simple-ldap-login/">Simple LDAP Login</a></li>
<li><a href="http://wordpress.org/extend/plugins/active-directory-integration/">Active Directory Integration</a></li>
<li><a href="http://wordpress.org/extend/plugins/wp-ldap-auth/">LDAP Authenticator</a></li>
<li><a href="http://wordpress.org/extend/plugins/wpdirauth/">wpDirAuth</a></li>
</ul>
<p>
 Most of these plugins are using the <a href="http://adldap.sourceforge.net/">adLDAP</a> class, which facilitates using the native PHP functions. The native PHP functions are very easy to use, though, which you can see in the <a href="http://wordpress.org/extend/plugins/wpdirauth/">wpDirAuth</a> plugin&#8217;s code.
</p>
<h2>Customizing wpDirAuth</h2>
<p>
 Authentication in LDAP is a two step process:
</p>
<ol>
<li>Connect to the LDAP server.</li>
<li>Bind to the directory using a username and password.</li>
</ol>
<p>
 The <code><a href="http://php.net/manual/en/function.ldap-bind.php">ldap_bind()</a></code> function returns a boolean, which succeeds if the username and password were found in the directory.
</p>
<p>
 Here&#8217;s an example syntax:
</p>
<pre>
&lt;?php
$ldap = array();
$ldap['server'] 	= 'ad.company.domain.com';
$ldap['base_dn']	= 'CN=Users,DC=company,DC=domain,DC=com';
$ldap['ad_domain'] 	= 'company';

$ldap['username']	= 'david';
$ldap['password']	= 'p4ssw0rd';

// connect to LDAP server
$ldap['connection'] = ldap_connect('ldap://' . $ldap['server']);

// set some preferences to specify Active Directory protocol
ldap_set_option($ldap['connection'], LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldap['connection'], LDAP_OPT_REFERRALS, 0);

// bind to LDAP directory
if ($ldap['connection']) {
	$ldap['directory'] = @ldap_bind(
	  $ldap['connection']
	, $ldap['ad_domain'] . '' . $ldap['username']
	, $ldap['password']);
}

$is_logged_in = $ldap['directory'];
?&gt;
</pre>
<p>
 Note that the line reading: <code>$ldap['ad_domain'] . '' . $ldap['username']</code> is what prefixes your username with the Active Directory domain. So if you typically logon to your network with <kbd>MicrosoftBillGates</kbd>, the domain is <var>Microsoft</var>. The <samp></samp> is the escaped backslash character. It is a special symbol, so don&#8217;t forget to escape it!
</p>
<p>
 Using this information, we can modify the wpDirAuth plugin to work with our Active Directory. Pare it down to only use Active Directory (you don&#8217;t need the OpenLDAP stuff around line 300), and look for any instances of <code>ldap_bind()</code>. Make sure the username is prefixed with the domain and escaped backslash. You don&#8217;t need the prebound / prebinding stuff.
</p>
<p>
 When you&#8217;re done with that, install and activate the plugin. Set the Directory Servers and Base DN in the Admin settings, the rest should be okay.
</p>
<h2>More information</h2>
<h3>Microsoft Active Directory Explorer</h3>
<p>
 If you&#8217;re unsure of the structure or Base DN for your users, you can download <a href="http://technet.microsoft.com/en-us/sysinternals/bb963907.aspx">Microsoft&#8217;s Active Directory Explorer</a> to login to your Active Directory and find yourself. The DN will be everything up until the term that is specific to you in the Path bar.
</p>
</p>
<h3>PHP test code</h3>
<p>
 If you want to see some sample PHP code for doing LDAP authentication and retrieving a user, I&#8217;ve uploaded an archive of my test page here.</p>




---
title:      Shuttle PC: Part 2
subheader:  
date:       2010-10-28T15:08:45+00:00
tags:
  - hardware
  - Shuttle
hero:       
slug:       shuttle-pc-part-2
permalink:  http://davidosomething.com/blog/shuttle-pc-part-2/
---


<p>I didn&#8217;t read the parts compatibility guide online before buying the RAM and graphics cards so the Shuttle wasn&#8217;t working up until last week. Since I couldn&#8217;t see anything for lack of graphics and I don&#8217;t have another DDR3 compatible machine lying around, I couldn&#8217;t test the parts. Shuttle PCs don&#8217;t beep on POST so I couldn&#8217;t even tell if the motherboard and CPU worked (power and fans worked though). The only way to proceed would be to buy a new compatible graphics card and RAM.</p>
<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/powercolor.jpg" alt="" title="PowerColor AX5770" width="300" height="225" class="lazy lazy-hidden alignleft size-full wp-image-398" /><noscript><img src="http://davidosomething.com/content/uploads/powercolor.jpg" alt="" title="PowerColor AX5770" width="300" height="225" class="alignleft size-full wp-image-398" /></noscript>It turns out the GT 240 wasn&#8217;t compatible. I bought a (much faster) Radeon 5770, which is running perfectly fine on the 300W power supply. I&#8217;ve got a 500W power supply coming in, too, since I&#8217;ve put so much stuff into this little box already, might as well make sure none of it gets fried or dies from insufficient power. I also got two 2GB sticks of Transcend DDR3, which I don&#8217;t need but might was well keep. The G.Skill Ripjaws sticks work fine, so now I&#8217;ve got a whopping total of 12GB in the Shuttle.</p>
<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/neilpoulton.jpg" alt="" title="Lacie External HDD designed by Neil Poulton" width="200" height="200" class="lazy lazy-hidden alignright size-full wp-image-397" /><noscript><img src="http://davidosomething.com/content/uploads/neilpoulton.jpg" alt="" title="Lacie External HDD designed by Neil Poulton" width="200" height="200" class="alignright size-full wp-image-397" /></noscript>Finally, I needed more space so I took apart my Lacie external HDD and plugged it in the Shuttle. Getting that Neil Poulton screwless case apart was a pain in the ass and I almost broke it! There&#8217;s now 300 GB out of 1.25 TB available. Definitely going to have to get a bigger HDD, then I&#8217;ll put the 250GB HDD into the Lacie case. It took some fiddling to figure out which SATA plugs to use&#8230; apparently you can&#8217;t boot from all of the SATA connections (only the first two). I&#8217;m using 3 out of 4 SATA connections now, and I don&#8217;t see where there&#8217;s room to use the last one (eSATA via PCI card?).</p>




---
title:      Putting together my new Shuttle PC
subheader:  
date:       2010-10-20T12:12:16+00:00
tags:
  - hardware
  - photoshop
  - Shuttle
hero:       
slug:       putting-together-my-new-shuttle-pc
permalink:  http://davidosomething.com/blog/putting-together-my-new-shuttle-pc/
---


<p>Feeling a bit prodigious, I bought a Shuttle PC the other day (SH55). It totally looks like a toaster, but it&#8217;s cool. It&#8217;s going to be an always-on HTPC for the living room.</p>
<p>I am completely out of the consumer PC hardware loop and ended up getting the i7-860 (1156) instead of an i5. The major, major difference for these two would be the availability of integrated graphics on the i5, vs two extra cores on the i7. Wish I had gotten the i5, since then I would be able to play with the PC immediately using the integrated graphics.</p>
<p>As it is now, I&#8217;m waiting for an EVGA GeForce GT 240 video card. The DirectX 11 compatible cards are too expensive for now. Also, it&#8217;s a single slot card that is suitable for the Shuttle stock 300W power supply, so it should be quiet and cool compared to some of the monstrosities out there. This card is just enough since the PC is going to be using the TV as its monitor, with a native 1920 x 1200 resolution.</p>
<p>I got two sticks of 4GB G.Skill Ripjaws DDR3 1333, total of 8GB. Combined with the graphics card, this machine should be able to run Photoshop CS5 swimmingly as well. In the end its way better than any machine I have now. I&#8217;m using the HDD and optical drive from my old PC. The harddrive uses SATA revision 1, so it will probably be the biggest bottleneck for the system. </p>
<p>There&#8217;s a lot of room for upgrade in the system: new GFX card (maybe a full size one if I change the power supply), two more DIMM slots, and another 3.5 inch HDD (hello SSD!), so this machine should be good for many years.</p>




---
title:      Takeaways from An Event Apart DC 2010
subheader:  
date:       2010-09-20T11:02:26+00:00
hero:       
slug:       takeaways-from-an-event-apart-dc-2010
permalink:  http://davidosomething.com/blog/takeaways-from-an-event-apart-dc-2010/
---


<p>So I just got back from the Washington, DC iteration of An Event Apart. I feel that if you follow all the speakers&#8217; blogs and read Smashing Magazine&#8217;s content (or nontent, as it is), they&#8217;re really just saying the same thing. The real experience is paying to see these pioneers and policy-makers speak live and network with them (they are easily approachable at the conference or at the after parties). </p>
<p>The key message this year has been to <em>stop trying to make your site look the same in every browser</em>. You can approach this either through <a href="http://www.alistapart.com/articles/understandingprogressiveenhancement/">Progressive Enhancement</a> or graceful degradation (neither of which are new topics).<br />
Other messages included:</p>
<ul>
<li>CSS3 and HTML5 are already usable if you design with progressive enhancement in mind</li>
<li><a href="http://www.lukew.com/ff/entry.asp?933">Mobile-first design</a> is a great process to address design</li>
<li>A slew of CSS3 animation and style demos to show how easy it is to spice up a website</li>
</ul>
<p>An Event Apart&#8217;s audience seemed to be made up of mostly designers and developers, which I don&#8217;t think is the right crowd since the speakers end up preaching to the choir. <strong>The audience should be made up of clients&mdash;that is, anyone who wants a website.</strong> If you want or have a website, this is where you would go to find out what you should be getting. Clients (i.e., corporations with people who think they know a thing or two about &#8220;the internets&#8221; and &#8220;the twitter&#8221; and how &#8220;they need a facebook page&#8221;) are the ones asking for useless and backwards things like IE6 and 7 compatibility. That&#8217;s like asking for AC on a horse and carriage.</p>




---
title:      Rainmeter Skin: Nest
subheader:  
date:       2010-06-26T00:43:53+00:00
tags:
  - config
  - Rainmeter
  - skin
  - twitter
hero:       
slug:       rainmeter-skin-nest
permalink:  http://davidosomething.com/blog/rainmeter-skin-nest/
---


<p><a href="http://davidosomething.com/content/uploads/nest2.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/nest2-350x300.jpg" alt="" title="nest names below" width="350" height="300" class="lazy lazy-hidden alignright size-thumbnail wp-image-380" /><noscript><img src="http://davidosomething.com/content/uploads/nest2-350x300.jpg" alt="" title="nest names below" width="350" height="300" class="alignright size-thumbnail wp-image-380" /></noscript></a><strong>Updated 2010-06-26 10:52 PM</strong> &#8212; added alternate config (nest-namebelow.ini) with tweets below names so you can see more. See screenshot.</p>
<p><strong>Updated 2010-06-26 5:07 PM</strong> &#8212; packaged as rmskin, showing 6 tweets<br />
<strong>Updated 2010-06-26 3:44 AM</strong> &#8212; fixed ClipString</p>
<p>I&#8217;ve gotten interested in customizing my desktop with <a href="http://rainmeter.net/">Rainmeter</a> again, and this time I went as far as to make a Rainmeter skin.<br />
It&#8217;s using a similar style to the <a href="http://fediafedia.deviantart.com/art/TEASER-WP7-for-Rainmeter-158206288?q=1&#038;qo=1">WP7 skin here</a>, but I wrote it from the ground up just to learn.</p>
<p>Here&#8217;s what it looks like in contrast to WP7:<br />
<a href="http://davidosomething.com/content/uploads/nest.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/nest.jpg" alt="" title="nest Rainmeter Skin" width="519" height="600" class="lazy lazy-hidden alignleft size-full wp-image-371" /><noscript><img src="http://davidosomething.com/content/uploads/nest.jpg" alt="" title="nest Rainmeter Skin" width="519" height="600" class="alignleft size-full wp-image-371" /></noscript></a></p>
<h3>Download</h3>
<p>nest.rmskin &#8211; 4kb<br />
Please leave a comment or suggestions if you download it!</p>
<h3>Installation</h3>
<p>Download and run the rmskin file. Rainstaller should put everything in the right place for you.</p>
<p>Then right click on the skin on your desktop and choose Edit Skin&#8230; from the Skin menu. Notepad will open up with the skin ini file. Fill in the username and password (lines 32&ndash;33):</p>
<pre class="brush: plain">
TWITTER_USERNAME = "YourTwitterUsernameHere"
TWITTER_PASSWORD = "YourTwitterPasswordHere"
</pre>
<p>Not that it&#8217;s hard to figure out, but I wouldn&#8217;t change much else unless you know what you&#8217;re doing.</p>
<p>Finally, do a &#8220;Refresh&#8221; (middle click the skin) or restart Rainmeter.</p>
<h3>Usage</h3>
<p>Clicking the name will open up the user&#8217;s twitter page.<br />
Clicking on a tweet will open that tweet in your browser.<br />
You can middle click on any part to refresh the skin.<br />
The skin will auto-refresh every 600 milliseconds. You can change the interval by editing the code, look for line 10:<br />
<code>Update = 600</code><br />
And line 108:<br />
<code>UpdateRate = 600</code><br />
The first one is the refresh interval of the widget, and the second one is the polling time for twitter.com.</p>
<h3>Known bugs</h3>
<p>I&#8217;d appreciate if anyone could help with these:</p>
<ul>
<li>FIXED <del><code>ClipString = 1</code> doesn&#8217;t add elipses. In fact, it doesn&#8217;t work at all. For some reason the tweets are just truncated after a certain width.</del></li>
<li>Can&#8217;t add plain text meters below the tweets. I wanted to add four more tweets without avatars at the bottom, but they don&#8217;t show up. Something wrong with positioning?</li>
</ul>




---
title:      Building a ColdFusion/AJAX flickr Gallery
subheader:  
date:       2010-05-08T15:27:15+00:00
tags:
  - API
  - coldfusion
  - flickr
  - jquery
hero:       
slug:       building-an-coldfusionajax-flickr-gallery
permalink:  http://davidosomething.com/blog/building-an-coldfusionajax-flickr-gallery/
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




---
title:      Quick Access to the YouTube API with ColdFusion
subheader:  
date:       2010-04-29T19:57:22+00:00
tags:
  - API
  - coldfusion
hero:       
slug:       quick-access-to-the-youtube-api-with-coldfusion
permalink:  http://davidosomething.com/blog/quick-access-to-the-youtube-api-with-coldfusion/
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




---
title:      JQueryUI needs&#8230;
subheader:  
date:       2010-04-17T15:49:37+00:00
tags:
  - apache
  - javascript
  - jquery
hero:       
slug:       jqueryui-needs
permalink:  http://davidosomething.com/blog/jqueryui-needs/
---


<p>One of my old projects an Apache Virtual Host configuration app (built to test the JQueryUI 1.8 release candidates), uses JQueryUI heavily. While building this app, I found a lot of UI elements that were very simple to create and should be part of JQueryUI were completely missing from the library.<br />
<a href="http://davidosomething.com/content/uploads/apachevhost.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/apachevhost-590x326.png" alt="" title="Apache VHost Configurator" width="590" height="326" class="lazy lazy-hidden aligncenter size-medium wp-image-308" /><noscript><img src="http://davidosomething.com/content/uploads/apachevhost-590x326.png" alt="" title="Apache VHost Configurator" width="590" height="326" class="aligncenter size-medium wp-image-308" /></noscript></a></p>
<h3>Collapsible DIV</h3>
<p>Among the missing components is a simple collapsible div for themeroller. The closest thing JQuery UI has is the Accordion class. The main jQuery library has the slideToggle class, which provides the functionality you&#8217;d need, but you have to pick and choose the classes to add manually. This can be demoed on my app by creating a VHost. Clicking on the VHost title will toggle its collapsed state. I chose to use the following classes for the H2 (header) preceding the DIV (content):</p>
<pre class="brush: xml">&lt;h2 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top">header&lt;/h2>
&lt;div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">content&lt;/div></pre>
<p>The jQuery for this is simply:</p>
<pre class="brush: js">$('h2').next().slideToggle();</pre>
<h3>Form Reset</h3>
<p>JQueryUI-themed checkboxes, radio buttons, and custom toggle buttons are pseudo-input elements. They carry a state based on a hidden input element, but the actual display of the element is a themed <code>&lt;label&gt;</code> tag. Because these checkboxes and radio buttons aren&#8217;t real form elements and don&#8217;t have an on/off state, they can&#8217;t be reset using the standard HTML form reset: <code>&lt;input type="reset" /&gt;</code> or a JavaScript reset that just removes the &#8220;checked&#8221; attribute.<br />
To handle form resets, I had to create a custom script, based on the reset code from the <a href="http://jquery.malsup.com/form/">jQuery Form Plugin</a>. My script is as follows:</p>
<pre class="brush: js">
$.fn.clearForm = function() {
	return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form') return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea') this.value = '';
		else if (type == 'checkbox' || type == 'radio') {
			$(this).next('label').removeClass('ui-state-active');
			this.checked = false;
		}
		else if (tag == 'select') this.selectedIndex = -1;
	});
};
</pre>
<p>As you can see, there is an extra line that removes the jQuery class &#8220;ui-state-active&#8221; from the label used to display the pseudo-form element.</p>




---
title:      Honda Metropolitan in Boston
subheader:  
date:       2010-04-02T13:58:46+00:00
tags:
  - boston
  - insurance
  - Scooter
hero:       
slug:       honda-metropolitan-in-boston
permalink:  http://davidosomething.com/blog/honda-metropolitan-in-boston/
---


<p>The Honda Metropolitan is a 49cc gas-powered scooter. Because of its small size and vehicle classification, it is a very convenient mode of transportation in Boston, where the streets are crowded and parking is expensive.</p>
<p>I did some research on the Honda Met to help out a new owner, and wanted to post a compendium of all the information I found (a lot in some areas, not so much in others). I&#8217;m not the expert, the members of <a href="http://www.urbanscootin.com/">urbanscootin.com</a> are, so massive props to them! Some of these are specific to Boston/Massachusetts area, but others, such as technical information, apply to most Honda Metropolitans.</p>
<h3>Reviews</h3>
<p>Some plugs to reviews:<br />
<a href="http://weblog.masukomi.org/2009/04/04/honda-metropolitan-scooter-review">Honda Metropolitan Scooter [Review]</a><br />
<a href="http://www.hondapedia.org/2009/07/30/hondas-little-miracle-the-metropolitan-scooter/">Honda’s Little Miracle – The Metropolitan Scooter</a><br />
<a href="http://flopsylacrosse.blogspot.com/2010/03/proud-owner-of-honda-metropolitan.html">Proud Owner of a Honda Metropolitan</a><br />
Alex Wrege’s blog &#8211; Archive for &#8216;Honda Metropolitan&#8217; This guy&#8217;s scooter got stolen :&lt; lot&#8217;s of good reading, though<br />
A google search will turn up some more. I didn&#8217;t link to the ones on epinions or big sites for that reason.</p>
<h3>Metropolitan I or II?</h3>
<blockquote class="pull-right"><p>just go for a regular Honda Metropolitan</p></blockquote>
<p>Honda Metropolitan II&#8217;s were discontinued in 2005. A stock, unmodified Met II will reach a maximum of 25 MPH. This is only useful to absolutely meet the new moped/limited use vehicle law (see two sections down). Unless it&#8217;s an incredible deal for Boston (i.e., <a href="http://www.kbb.com/motorcycle/retail/2005/honda/chf50p-metropolitan-ii/70203">$1085, the KBB value</a>, like new), just go for a regular Honda Metropolitan. If you&#8217;re experienced with performance tuning you can try to remove the restrictor plate yourself.</p>
<h3>Misc. Information</h3>
<blockquote class="pull-right"><p>this thing weighs 176 pounds</p></blockquote>
<p>I don&#8217;t think people often mention that with a full tank of gas (the tank is only 1.32 gallons), this thing weighs 176 pounds. While this is one of the lighter scooters out there, it is still heavy for most people. Also, there are only two places to lift it: the handlebars and the bar on the rear. If you think a full jug of milk is heavy, you might not be able to lift the scooter off of the kickstand, much less lift it up from a curb. This is light enough for one strong thief to pick up and put in a truck, though. See the securing section for how to avoid that.</p>
<p>Also, there is almost no storage space on the scooter. You can get a basket and a rear trunk, but that doesn&#8217;t help much. The seat compartment can only hold a helmet and chain, most backpacks probably won&#8217;t fit.<br />
<span id="more-254"></span></p>
<h3>Buying a Honda Metropolitan</h3>
<p>Before buying, you should read this article: <a href="http://www.associatedcontent.com/article/13585/buying_a_50_cc_scooter_in_massachusetts.html?cat=27">Buying a 50 CC Scooter in Massachusetts</a>. This will help you decide whether or not you need a scooter and make you a little more aware of what&#8217;s involved.</p>
<p>Another factor to consider is that there may be a significant change coming to the Honda Metropolitan in the form of Fuel Injectors for the 2010 or 2011 models; a patent was recently filed for integrating the injector into the scooter (<a href="http://swdelaw.blogspot.com/2009/03/fuel-injection-coming-to-honda-scooters.html">source</a>). So you may want to wait and get a brand new even more fuel efficient scooter.</p>
<p>Since 2002, not much has changed in terms of the look and specifications. The major difference between models is the carburetor, which has gone from 15 to 16 to 18mm. The seat height has been adjusted slightly as well, less than an inch over the last 7 years. You can compare models here: <a href="http://www.powersportsnetwork.com/enthusiasts/new_vehicle_compare.asp?vehicle1=89538&#038;year2=2002&#038;mfg2=1&#038;vehicle2=3718&#038;go=Go">New Vehicle Compare at the PowerSports Network</a>, but you won&#8217;t find much.</p>
<p>Finally, color does matter. These little scooters are full of personality, and you might not want the hibiscus or checker pattern. They&#8217;re easy to paint, and you can remove the cover and buy replacements, but for most models, here is a listing of the colors you are limited to based on the year the vehicle was released: <a href="http://www.urbanscootin.com/forum/viewtopic.php?f=13&#038;t=4105&#038;start=15">An Overview of Metropolitan Colors 2002 &#8211; present</a>.</p>
<h4>Buying from an Official Honda Dealer</h4>
<blockquote class="pull-right"><p>the major dealerships &#8230; deliver for free</p></blockquote>
<p>While you can get a Vespa (Herb Chambers on Brighton Ave.) or Buddy (Scooters Go Green) within the city limits, there is no place in the city of Boston to buy a Honda Metropolitan. Luckily, the major dealerships in the nearby towns (e.g. Parkway Cycle, GBM) deliver for free (at least, they did when I called). They are also all official dealers so there is not much of a difference who you talk to. Check the <a href="http://powersports.honda.com/">Honda Powersports site</a> to find the dealer nearest you.</p>
<p>If you choose to work with a dealer, they should assist you in handling most things such as finding insurance and registering the vehicle. If you are going through official channels, your vehicle may be registered as a Limited Use vehicle (read about the law later).</p>
<h4>Buying Online/through Craigslist</h4>
<blockquote class="pull-right"><p>a check with a bill of sale . . . leaves a paper trace of the sale and is beneficial for BOTH parties</p></blockquote>
<p>If you&#8217;re buying from someone online, save a copy of the ad they post. Because the Honda Metropolitan is such a small vehicle, there may be some stolen scooters on sale. Avoid these. I wouldn&#8217;t buy from anyone who didn&#8217;t provide a phone number, and if they take cash only, find out why they won&#8217;t take a check with a bill of sale. A check leaves a paper trace of the sale and is beneficial for BOTH parties.</p>
<p>Whatever the case, make sure the seller has the original documentation for the bike. This includes the original bill of sale from a dealership, any hand-drafted bills of sales in between, the original registration. If available, the owner and service manuals are nice to have, and if the seller has a helmet, lock, and cover, see if they can provide you with it as part of the sale.</p>
<blockquote class="pull-right"><p>The odometer &#8230; only goes up to 9999 and then rolls over</p></blockquote>
<p>For your bill of sale, this site has a pretty standard one: <a href="http://www.free-legal-document.com/motorcycle-bill-of-sale.html">Free Motorcycle Bill of Sale</a>. Just change motorcycle to Honda Metropolitan. The site also provides a pre-purchase inspection checklist that applies to scooters: <a href="http://www.free-legal-document.com/motorcycle-bill-of-sale.html">Motorcycle Bill of Sale</a> (inspection checklist).</p>
<p>The odometer on a Honda Metropolitan only goes up to 9999 and then rolls over, so the only way to tell if a scooter has 100 miles or 10100 miles is to inspect it thoroughly!</p>
<h3>That Stupid Law</h3>
<p>All of this information can also be found here: <a href="http://www.dannysscootershop.com/145510.html">Laws in MA</a>, the registration form (you&#8217;ll eventually get to it), and in the <a href="http://www.urbanscootin.com/">urbanscootin.com</a> forums (register if you are going to enter the MA scooter world).</p>
<p>A law was passed in 2009 that creates a new category for scooters in between a motorcycle and a moped. The in-between vehicles are considered &#8220;Limited Use&#8221; motorized bicycles, and are not allowed to have top speeds above 30 MPH among other conditions. For the Honda Metropolitan, this is the only condition under which it fails. Here is a chart showing the legislative differences between a moped and Limited Use vehicle:</p>
<table cellpadding="0" cellspacing="0">
<tr>
<th>&nbsp;</th>
<th>Moped</th>
<th>Limited Use</th>
</tr>
<tr>
<th>Insurance</th>
<td>Not required</td>
<td>Required</td>
</tr>
<tr>
<th>Plate</th>
<td>Sticker</td>
<td>Plate</td>
</tr>
<tr>
<th>Parking</th>
<td>Sidewalks OK</td>
<td>Cars spaces ONLY</td>
</tr>
</table>
<h4>Insurance</h4>
<blockquote class="pull-right"><p>Only a properly registered scooter can be insured</p></blockquote>
<p>Scooter insurance supposedly costs around $100 according to some people on the <a href="http://www.urbanscootin.com/">urbanscootin.com</a> forums. I couldn&#8217;t find insurance for less than $400 (Progressive and Metlife), and my company insurance provider (Progressive) does not have Scooter coverage in MA (yet, but it does in other states) so it would fall under Motorcycle insurance. Insurance is not a bad idea if you live in, say, Roxbury, where your scooter will probably get stolen. Only a properly registered scooter can be insured, so you have to register as a Limited Use vehicle if you are getting insurance.</p>
<h4>Parking</h4>
<p>Luckily the parking requirement is not currently enforced in Boston (<a href="http://www.dannysscootershop.com/145510.html">source</a>), but if a police officer felt like it, they could. Don&#8217;t park anywhere stupid (e.g. fire hydrant, driveway, exits, middle of the sidewalk).</p>
<h4>Recommended Registration</h4>
<p>If you are one to obey laws to the letter, plan to get insurance for the $2000 vehicle, or you have a Honda Metropolitan in good condition and plan on riding it really fast (above 25 MPH), register as a LU vehicle and get insured.</p>
<p>Otherwise, know that I am not advising you to disobey the law, but you should be aware of these points:</p>
<ul>
<li>A used Honda Metropolitan may not be able to reach the manufacturer advertised top speed of 42 MPH. Some of them can barely go 30 MPH due to wear, and the Metropolitan II is intentionally restricted to 25 MPH.</li>
<li>If you have a cover, the model number is not visible without lifitng it.</li>
<li>Traffic/police officers don&#8217;t carry a chart with scooter top speeds and model numbers.</li>
</ul>
<p>As long as you don&#8217;t ride above 25 MPH and get clocked or park somewhere that an officer would check on your vehicle, you could get away with registering as a moped.</p>
<h4>Registering a Scooter</h4>
<p>I didn&#8217;t do this, so I don&#8217;t know any details other than you just bring a completed RMV1 and some cash to the DMV, and you get a sticker (for moped registrations). There is a DMV near the Boylston (Green line)/China Town (Orange line) stop:</p>
<address>
630 Washington Street<br />
Boston, MA 02111-1615<br />
</address>
<h3>Accessories</h3>
<blockquote class="pull-right"><p>$400 on top of the scooter</p></blockquote>
<p>Now that you&#8217;ve purchased, (insured,) and registered your vehicle, you need some accessories before you can ride it:</p>
<ul>
<li>DOT approved helmet &#8211; safety first. Price varies, maybe $40.</li>
<li>A U-lock &#8211; this is to lock the bike to a chain to a pole. Get a good one, 13/14 mm diameter should fit most chains. A good lock also comes with an anti-theft policy which can act as secondary insurance for your scooter. You need to fill out the form and have the broken lock to claim the theft. Kryptonite no longer uses the old style locks that can be picked with a Bic pen, but make sure you get a really good one. Roughly $100.</li>
<li>A strong chain &#8211; A lock is only as good as the chain. 5 feet is JUST enough to go around the back wheel and a street sign. Some locks and chains come as sets. The OnGuard chains are reputable. $50 &#8211; $150.</li>
<li>A durable cover &#8211; This should not only protect from rain, but should be heavy enough or have a cord that prevents the wind from blowing it off. Boston is windy. Also, a heavy/banded cover may discourage officers from trying to find a model number. Be careful with cheap covers, they may melt on a hot day and in contact with the hot parts of the scooter. Roughly $40.</li>
<li>A batter maintainer/float charger &#8211; The Deltran Battery Tender Jr. is the recommended brand by urbanscootin.com. It is the same price as any other brand, but has an ampere rating that is similar to the Honda Metropolitan&#8217;s stock Yuasa battery. In other words, it&#8217;s the best. Get it for the winter/times when you won&#8217;t ride it at least twice a week. No more than $30. Here is the one you should get: <a href="http://www.amazon.com/Battery-Tender-021-0123-Junior-Charger/dp/B000CITK8S/ref=sr_1_1?ie=UTF8&#038;s=automotive&#038;qid=1270232668&#038;sr=8-1">Battery Tender 021-0123 Battery Tender Junior 12V Battery Charger</a>. Read more about batteries in the maintenance section.</li>
<li>The Honda Metropolitan Service manual &#8211; is optional, but if you got a scooter that may not be in perfect condition or you want to take care of the scooter yourself, you&#8217;ll want this. You can order it from <a href="http://www.helminc.com/helm/Result.asp?session=22F94EB788EA4F3C9FD8CFA8D1003906&#038;Style=helm&#038;Mfg=AHC&#038;Make=AHC&#038;Model=SCOO&#038;Year=&#038;Category=&#038;Keyword=&#038;Module=&#038;selected_media=">Helm Incorporated</a>, do a search for the model (CHF50) to get the manuals you want. $20 &#8211; $60 depending on which ones you order.</li>
</ul>
<p>Didn&#8217;t expect the extra costs, huh? That&#8217;s like $400 on top of the scooter.</p>
<h3>Maintenance</h3>
<p>If you ride the scooter often (twice a week for at least five miles a time), use a battery maintainer in the off-season, and change the oil every 1000 miles or year, change the spark plug every 1500 miles, your scooter will be in top shape.</p>
<h4>Securing your Honda Metropolitan</h4>
<p>The rear frame post is the most secure place to run the chain, but it is difficult to get to. The next best place to run the chain is through the rear tire itself. The platform of the scooter is another option if your chain is long enough. A picture can be found in this thread on urbanscootin.com: <a href="http://www.urbanscootin.com/forum/viewtopic.php?f=14&#038;t=10684">Chain/Cable Locks for Scooters.</a>.<br />
Use the kickstand lock found under the seat when you put it down to prevent someone from just running away with your scooter.<br />
Grip-Locks are a relatively new thing, and I&#8217;m not sure if they&#8217;re available in the US, but you can try here: <a href="http://www.grip-lock.com/">GRIP-LOCK</a> if you feel you need the extra security.</p>
<h4>Fueling</h4>
<blockquote class="pull-right"><p>use only regular, 87 octane, gasoline</p></blockquote>
<p>The carburetor mixes impure gasoline for you, and is designed to work with regular gas. The owner&#8217;s manual recommends that you use only regular, 87 octane, gasoline. You should follow this recommendation, unless a professional recommends otherwise (in which case the reason would most likely be something called &#8220;knocking,&#8221; which is when the fuel spontaneously ignites and damages the engine). The gas cap is locked as a safety measure to a) prevent people from putting sugar and other things in your gas tank, and b) prevent people from stealing your single gallon of gas in these desperate, desperate times.</p>
<p>Opening the gas cap can be tricky if you&#8217;ve never seen it done and don&#8217;t have the manual. The gas cap is underneath a plastic cover where the floor board meets the seat. Lift the cover using the tab, and you&#8217;ll see the metal cap. You need your key to open the gas cap. Put the key in and turn it to the right to unlock the cap. The entire metal cap can then be unscrewed by turning it to the left. It is not attached to the vehicle like a car gas cap, so don&#8217;t lose it. When you&#8217;re done putting in gas (and a shot of Sea Foam to clean the carburetor if you need it), screw the gas cap back on and lock it. Close the plastic cover, and you&#8217;re all set.</p>
<h4>Oil Changes</h4>
<p>Regular maintenance includes changing the oil every 1000 miles or year, whichever comes more often. Many of the posts on urbanscootin.com agree to use a synthetic oil (but the effect is not much different from non-synthetic), such as Amsoil Synthetic 10w40 or Castrol Syntec 10w40. Just make sure it&#8217;s 10w40 and NON energy conserving. Oil should cost around $9.00. Here are some guides:<br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;t=857&#038;start=15">Oil changes</a><br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=15&#038;t=8074">HONDA MET:Oil Change/Level Check, Screen Maintenance</a><br />
<a href="http://www.youtube.com/watch?v=zNQ3myoYxdM">YouTube &#8211; Oil Change (Honda Metropolitan)</a><br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;t=13357">Changing the Oil in the Honda Metropolitan—Step by Step</a></p>
<h4>Kickstarting</h4>
<blockquote class="pull-right"><p>Don&#8217;t literally kick it or stomp on it.</p></blockquote>
<p>If your battery is getting old (4 years or so, if you maintained it well), consider replacing it. Until then, you may have to kickstart your scooter. The Honda Metropolitan has a kickstarter next to the kickstand. To use it, put the scooter on the kickstand and turn it on. Then flip the kickstarter peg out and push it down half way. There is a midway point that gives some resistance, once you ease the kickstarter past that, give it a smooth push (should not get stuck or jerk) all the way to the end. It takes about the same energy as pulling the rip cord on a lawn mower. Don&#8217;t literally kick it or stomp on it. Just a strong, fluid push from the midpoint to the end is all it takes.</p>
<h4>Battery</h4>
<p>All Honda Metropolitans use a Yuasa AGM (which implies that it is sealed) lead-acid battery, part number YTZ7S. The battery is 12 volts, 0.6 amps (600 mA). More technical specifications can be found here: <a href="http://store.yuasabatteries.com/products/productdetail/YTZ7S/part_number=YUAM727ZS/1717.0.1.1.32856.48643.49118.48652.0">Yuasa Battery, Inc. YTZ7S</a>. This battery should last for about 5 years with active riding and a Battery Tender during the off-season.</p>
<h4>Battery Maintenance</h4>
<p>The Honda Metropolitan battery is a 0.6 A battery. Because of this, it requires at least 0.6 amps to charge. An ampere is a measure of current, meaning that higher ampere chargers will charge your batter faster. This is not exactly good, because it also kills the battery faster. You wouldn&#8217;t use a $2 phone charger from Chinatown on your new $300 iPhone would you?</p>
<p><strong>Some rules:</strong></p>
<ul>
<li>Don&#8217;t get a trickle charger. If you accidentally leave it on too long, it will start to over charge and kill your battery.</li>
<li>Don&#8217;t charge from a car if the car is on. This will just plain kill your battery.</li>
</ul>
<p><strong>The Deltran Battery Tender Jr.</strong></p>
<blockquote class="pull-right"><p>This battery maintainer is <em>the</em> Battery Tender . . . recommended</p></blockquote>
<p>This is a float charger that delivers a current of 0.75 amps. This rating is safe for the Honda Metropolitan battery. This battery maintainer is <em>the</em> Battery Tender, and is recommended for use. You connect the positive clip or ring to the positive connector of your scooter&#8217;s battery, the negative clip to a metal surface like the engine (the Honda Metropolitan is negatively grounded, like most things), and then plug the Battery Tender into an outlet (never plug it in to the outlet first, it has to check the battery to determine how much to charge).</p>
<p>Many people like to leave the wires connected and just disconnect the charger. Leaving a wire attached is referred to as pigtailing.</p>
<h3>Troubleshooting</h3>
<p>Most issues revolve around starting the Honda Met. Here&#8217;s what you should be checking:</p>
<h4>Battery</h4>
<blockquote class="pull-right"><p>you get what you pay for</p></blockquote>
<p>If your scooter dies/stalls after starting, check your battery. You can use a multimeter if you know how, or just take the battery out to an auto shop. They supposedly check it for free. With batteries, you get what you pay for, and Yuasa is a good brand. If your battery cannot hold a charge, you should replace it with an aftermarket battery of the same type. Yuasa&#8217;s aftermarket brand is Motocross and goes for about <a href="http://www.batterystuff.com/batteries/motorcycle/YTZ7S.html">$84 at Battery Stuff</a>. If you decide to go with another brand, make sure it is an AGM battery (or at least &#8220;sealed,&#8221; if not AGM, which will not last as long, chemically, without a battery maintainer) and pre-filled/activated/charged YTZ7S.<br />
Here&#8217;s how to change the battery:<br />
<a href="http://www.ehow.com/how_5470736_change-battery-honda-metropolitan.html">How to Change a Battery on a Honda Metropolitan</a><br />
You can learn a lot about lead-acid batteries on the Battery Tender website:<br />
<a href="http://batterytender.com/resources/introduction-to-lead-acid-batteries.htm">Introduction To Lead Acid Batteries</a></p>
<h4>Spark Plug</h4>
<p>If it wasn&#8217;t the battery, it could be that the spark plug is dirty. You can take it out with a socket wrench. If the head is black, you can replace it. If it&#8217;s brown you can spray some special cleaner on it. Replacement just involves getting a new spark plug (bring the old one to a car shop) and putting it in. Here&#8217;s some reference material:<br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;t=8050&#038;p=84598">How To: Change Spark Plug, Cross-References</a><br />
<a href="http://www.youtube.com/watch?v=NY6CNbvwkKg&#038;feature=related">YouTube &#8211; Spark Plug (Honda Metropolitan)</a></p>
<h4>Carburetor</h4>
<p>Try draining the carburetor. Then run seafoam through your gas tank (with some clean gas) and let it run. This will clean out your carburetor. If it still doesn&#8217;t start, you may have to jet (remove and clean) your carburetor (or have a professional do it for a fee). Here&#8217;s how to drain the carb:<br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;t=11355">How to Drain Carb?</a><br />
Here&#8217;s how to jet:<br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=15&#038;t=352&#038;sid=0ac01c6d023323825e0b5b93af5a5ba4">Jetting the Carburator</a></p>
<h4>All Else</h4>
<p>The air filter works in a tight system with the spark plug and carburetor. I&#8217;d check that next: <a href="http://www.youtube.com/watch?v=Vya_lAublWA&#038;feature=related">Replacing the Air Filter</a></p>
<p>The fuel pump is another obvious thing to check: <a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;p=93365">Fuel Pump Replacement</a>, you might even want to check it before the battery.</p>
<p>If your scooter is old, it might be overheating so the coolant needs to be replaced. Here&#8217;s some resources:<br />
<a href="http://www.urbanscootin.com/forum/viewtopic.php?f=2&#038;t=13898">View of Coolant Bottle for Metropolitans</a><br />
<a href="http://www.youtube.com/watch?v=1fESFEjrGao&#038;feature=related">YouTube &#8211; Coolant Change (Honda metropolitan)</a></p>
<p>For anything else, unless you&#8217;re a greasemonkey, find someone to do it for you.</p>
<h3>Conclusion</h3>
<p>The Honda Metropolitan has been around for almost a decade now, with almost no change in technology, so much of the information about it is pretty solid. If you have any questions I recommend going to my primary source, <a href="http://www.urbanscootin.com/">http://www.urbanscootin.com/</a>. If you have any corrections or suggestions for this article, post a comment and let me know.</p>




---
title:      Apartment Hunting in Boston
subheader:  
date:       2010-03-27T16:21:38+00:00
tags:
  - apartment
  - boston
hero:       
slug:       apartment-hunting-in-boston
permalink:  http://davidosomething.com/blog/apartment-hunting-in-boston/
---


<p>Allston is no place for a non-college student to live. Roxbury isn&#8217;t so great either. In an effort to get off of the college-populated and super slow B-Line of the MBTA, I&#8217;ve been looking for new apartments near Coolidge Corner. Here&#8217;s what I&#8217;ve been picking up through this experience:</p>
<h3>Searching for results? Let them search for you!</h3>
<p>The only sites worth checking out are specific Realtor sites. Use their search engines if you are feeling ambitious, because they will turn up results not in Craigslist.</p>
<p>For all other searches, such as Craigslist and Apartments.com, use <a href="http://www.padmapper.com/">padmapper</a> to do your searching. After filtering out the results you want, you can subscribe to a search via e-mail, so all new results will be e-mailed to you! Resize your browser to limit it to a specific area, like so:<br />
<a href="http://davidosomething.com/content/uploads/padmapper.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/padmapper-485x400.png" alt="" title="Filtered and Resized padmapper search" width="485" height="400" class="lazy lazy-hidden aligncenter size-medium wp-image-276" /><noscript><img src="http://davidosomething.com/content/uploads/padmapper-485x400.png" alt="" title="Filtered and Resized padmapper search" width="485" height="400" class="aligncenter size-medium wp-image-276" /></noscript></a><br />
I&#8217;ve got a daily subscription of apartments under $800 per room that I follow up on if I see any I like. The searches come to me, instead of hunting and pecking through Craigslists&#8217; mess. There are other similar services, but from personal experience padmapper has the most results for Boston.<br />
<span id="more-275"></span></p>
<h3>One e-mail</h3>
<p>I&#8217;ve also got a standard e-mail with criteria I&#8217;m looking for. This was devised in collaboration with my girlfriend, and is based on living in two different parts of Boston (or outside Boston, as it is). The e-mail is something like this (not exactly):</p>
<blockquote><p>
Hi,</p>
<p>I found your posting on Craigslist: http://url_to_posting/ and would like to schedule a viewing of this apartment on XXXday X:xx PM. Please let me know if you are available.</p>
<p>Also, I am searching for similar units matching the following criteria:</p>
<ul>
<li>Available XXXXXX 1st, 2010</li>
<li>Three or four bedrooms</li>
<li>Maximum rent of $XXXX (or $XXX per room)</li>
<li>Kitchen large enough for two or three people to fit comfortably</li>
<li>Steps away (no more than two blocks) from the T</li>
<li>etc.
</ul>
<p>You can reach me at this e-mail address, or by phone at xxx-xxx-xxxx.</p>
<p>I look forward to working with you,<br />
me.
</p></blockquote>
<p>This template gets modified just slightly for each Realtor, and saves everyone time in terms of finding other properties.</p>
<h3>Walk-ins</h3>
<p>Allston is full of Realtors, so walk-ins are not inconvenient. They have yielded some nice hidden results as well, since not all Realtors post their listings online.</p>
<h3>Meeting the Realtor</h3>
<p>Keep the list of criteria at hand and review the properties you are going to see first. Maybe you can rule out units based on location (10 minute walk to the train? No thanks!), actual price (&#8220;It&#8217;s just a little out of your range&#8230;&#8221; so don&#8217;t waste my time!), or description (e.g. a 4th floor with no moving elevator? No thanks!).</p>
<h3>Visiting the Apartment</h3>
<p>Here&#8217;s a checklist of things to look at:</p>
<ul>
<li>Hopefully you scheduled a daytime visit to get maximum lighting, but sometimes it&#8217;s not possible.</li>
<li>You have a camera right? It takes videos as well, right? Take lots photos and videos! Not just of the rooms, but of the entrance way, the distance to the train, and the stairs leading in.</li>
<li>How was the walk in? Are the stairs super windy and impossible to carry a bed and couch through?</li>
<li>Who lives upstairs, downstairs, and who is in the neighboring units (party animals)?</li>
<li>Did the Realtor fumble the keys (the lock is worn)? Is the door rickety?</li>
<li>Is it just you, or is it really hot/cold in there? Can the temp. be adjusted?</li>
<li>How thin are the walls? How far apart are the rooms from each other?</li>
<li>Do all the light switches work? This can be fixed before you move in as well.</li>
<li>Are the floors coming up? Can they be fixed before you move in?</li>
<li>Do the kitchen cabinets open and close easily? Can they be fixed?</li>
<li>Do all the fires work on the oven range?</li>
<li>Bathroom(s) small? Do you practically have to sit side saddle on the toilet? (I do in Allston!) Full bath? Shower water pressure?</li>
<li>Do the room doors lock?</li>
<li>What do the room windows overlook? (Garbage dumpsters are BAD. It means noise in the morning!)</li>
<li>Do the windows lock? Are they crappy? How easy is it to put in blinds?</li>
<li>Is there a safe place to lock your bike/scooter? Parking area? How far is it REALLY to the train?</li>
<li>Where&#8217;s the laundry facility? And where does garbage go?</li>
<li>Would the landlord drop/lower the fee if you do some repairs? (Only if you went through a broker and the fee isn&#8217;t fully covered).</li>
</ul>
<p>Good luck if you&#8217;re looking, too!</p>
<p>note: Didn&#8217;t realize Realtor was a trademark, not a common word. The noun &#8220;agent&#8221; or &#8220;broker&#8221; can be used instead.</p>




---
title:      My Experience with MasterRental Insurance
subheader:  
date:       2010-03-07T19:57:47+00:00
tags:
  - insurance
hero:       
slug:       my-experience-with-masterrental-insurance
permalink:  http://davidosomething.com/blog/my-experience-with-masterrental-insurance/
---


<p>MasterRental is a service provided by MasterCard when you rent a vehicle and pay for all rental related expenses with your MasterCard. It serves as a supplemental insurance if you are already insured by another plan (i.e., it may cover things your car insurance, the primary insurance, did now). If you aren&#8217;t, MasterRental will serve as your primary insurance (that&#8217;s what I did).</p>
<h3>Disclaimer</h3>
<p>There are specific conditions you must follow in order to qualify for MasterRental, so make sure you check the terms and conditions that came with your card. They should be similar (likely identical) to <a href="http://www.mastercard.com/us/personal/en/cardholderservices/guidetobenefits/pdf/11660_rent_save_2006.pdf">the MasterRental terms on the MasterCard site</a>, but check with your card provider to be sure. The benefits pamphlet is actually a really great read and may enlighten you to the other benefits of using a credit card (e.g., free extended warranties and refunds for things that the store may not accept).</p>
<h3>Deadlines</h3>
<ol>
<li>Report accident to rental company and police within 24 hours</li>
<li>File insurance claim within 30 days of the incident</li>
<li>Submit required documentation within 180 days of the incident</li>
</ol>
<p><span id="more-170"></span></p>
<h3>My Circumstances</h3>
<p>I rented a car with Avis using my HSBC MasterCard, and declined the Collision/Damage Waiver (<abbr title="Collision/Damage Waiver">CDW</abbr>). Well, after some driving on the open road, I ended up in a guardrail (I won&#8217;t go into the details of that). Thankfully, there were no other cars involved in the accident.</p>
<h4>Documents received:</h4>
<ol>
<li>All rental forms (receipt, rental agreement)</li>
<li>Rental car insurance information (Avis&#8217; insurance, in glove compartment)</li>
<li>Rental car registration (also in glove compartment)</li>
</ol>
<h3>Post-Accident Actions</h3>
<p>Some passer-bys called the police for me and came by to see if everything was alright (nice people). After the traffic officer came, we all had a chat about the situation and the people left. An accident report was written up and I was given a summary (in MA you have to request the report by mailing a request and processing fee to a police station). The officer called the local towing facility and soon I was sitting in the waiting room there, with my car in the lot. I had to fill out forms for the towing station. Rather than have the towing station tow the car back to Avis, I called Avis&#8217; roadside assistance line (which took FOREVER and a million call transfers). This call constituted a report of the accident on Avis&#8217; side. I payed the release fee for the towing facility. Unfortunately, the accident happened after 5pm on Friday, so the car couldn&#8217;t be towed until Monday. A friend picked me up from the towing facility.</p>
<h4>Documents received:</h4>
<ol>
<li>Accident report summary</li>
<li>Towing facility receipt</li>
</ol>
<h3>Rental and Report Charge</h3>
<p>On Monday, I went to the Avis facility to check on the status of the car. The car was towed on Monday and arrived at the Avis repair facility. Because it took all weekend, the rental contract wasn&#8217;t closed until Avis received the car again. I was charged for the full term of the rental (I only rented it for the weekend anyway). This showed up on my credit card activity online, and in my statement at the end of the month. I also sent in a check and request for the official police accident report to be sent to MasterCard.</p>
<h4>Documents received:</h4>
<ol>
<li>Credit card statement showing rental charges (end of month)</li>
<li>Police report (sent to MasterCard)</li>
</ol>
<h3>Filing the Insurance Claim</h3>
<p>I called 1-800-MC-ASSIST the Monday after the accident. Within a week I received a packet with details and the required forms from MasterCard (sent to my credit card billing address!) I filled out the forms and sent them out with a copy of my Driver&#8217;s License and copies of all of the documents I received above.<br />
An Avis representative called me within a week for a follow-up about the accident and for information about my insurance (MasterRental). They initiated the contact with MasterCard and supplied their documentation.</p>
<h3>Checking the Claim Status and Lessons Learned</h3>
<p>I was able to check the status of my claim and see what documents they had and still needed at any given time by going to their claim website: <a href="http://www.yourclaimstatus.com/">http://www.yourclaimstatus.com/</a>. The entire ordeal was resolved within four months (~120 days. The final deadline was 180 days). Overall this was an ordeal I hope to never repeat again. If it did happen, I would call MasterCard&#8217;s roadside assistance for the towing service, since they cover towing. It won&#8217;t happen because I was able to get a corporate <a href="http://www.zipcar.com/">ZipCar</a> membership through my employer, and accident-related issues are <a href="http://www.zipcar.com/cities?return_url=/how/faqs/one-faq%3ffaq_number%3d28">handled by ZipCar</a> entirely (the car and authorized driver are covered through Liberty Mutual).</p>
<h3>References</h3>
<ul>
<li><a href="http://www.mastercard.com/us/personal/en/cardholderservices/guidetobenefits/pdf/11660_rent_save_2006.pdf">MasterCard Guide to Benefits</a></li>
<li><a href="http://www.zipcar.com/cities?return_url=/how/faqs/one-faq%3ffaq_number%3d28">ZipCar Insurance Information</a></li>
</ul>




---
title:      Tips for Faster PSD to HTML Conversions
subheader:  
date:       2010-02-27T21:33:38+00:00
tags:
  - css
  - photoshop
hero:       
slug:       tips-faster-psd-html-conversions
permalink:  http://davidosomething.com/blog/tips-faster-psd-html-conversions/
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




---
title:      A WordPress User&#8217;s Guide to Drupal
subheader:  
date:       2010-02-26T20:52:35+00:00
tags:
  - cms
  - drupal
  - mysql
  - php
  - wordpress
hero:       
slug:       a-wordpress-users-guide-to-drupal
permalink:  http://davidosomething.com/blog/a-wordpress-users-guide-to-drupal/
---


<p>Anyone who has worked with both knows that anything you can do in WordPress, you can <a href="http://drupal.org/node/41373">do in Drupal</a>, and <a href="http://podscms.org/">vice</a> <a href="http://www.corephp.com/wordpress/wordpress-integration-for-joomla-1.5.html">versa</a>. It just takes some elbow grease.<br />
I am a huge advocate of WordPress as both a personal blogging engine and a <a href="http://mu.wordpress.org/">multiuser CMS</a>. It is easy to setup and theme, has a largely backed community, and has an extensive selection of plugins (with great focus on SEO and social blogging) making it an excellent choice for sites of any size.<br />
Drupal is <a href="http://www.packtpub.com/award">still regarded as the Best Open Source PHP CMS</a>, though, and is commonly used by large corporations, government, and universities. Drupal has a large following and plugins for nearly any operation as well. It is a great thing to learn because of its broad market, but WordPress developers might find some difficulty getting acclimated&mdash;Drupal has a much higher learning curve.</p>
<p>This information in this article pertains to WordPress 2.8+ and Drupal 6.15. Here are some tips/parallels that may help you as a WordPress user jumping into Drupal.</p>
<h3>Installation</h3>
<p>The installation procedures of Drupal and WordPress are similar, but there are a few operations you have to perform manually in Drupal:</p>
<p>WordPress has greatly simplified its installation procedure by automating the creation of the <var class="php file">wp-config.php</var> file based the the <var class="file_php file">wp-config-sample.php</var> file. Drupal has yet to do this up&mdash;you have to manually create the <var class="file_php file">settings.php</var> file in the sites/default folder by creating a copy of <var class="file_php file">default.settings.php</var> and renaming it.<br />
<span id="more-115"></span></p>
<p>A vanilla WordPress install in simple given that the directory structure is created for you. In Drupal, after you first upload the files, you have to create additional directories. From your root, go to the <var class="folder">sites/default</var> folder and create a files folder. Make the folder writable if it isn&#8217;t already (see the Drupal status report).</p>
<p>I also recommend going to the <var class="folder">sites/modules</var> folder and creating folders called <var class="folder">contrib</var> and <var class="folder">custom</var>. Put modules you download from Drupal.org into <var class="folder">contrib</var> and modules you create into <var class="folder">custom</var>.</p>
<h3>Theming</h3>
<p>Here is a table of Drupal theme file and folder equivalents:</p>
<table cellpadding="0" cellspacing="0" class="comparison">
<thead>
<tr>
<th>Drupal</th>
<th>WordPress</th>
</tr>
</thead>
<tbody>
<tr>
<td><var class="folder">sites/all/modules (/contrib and /custom)</var></td>
<td><var class="folder">wp-content/plugins</var></td>
</tr>
<tr>
<td><var class="folder">sites/all/themes</var></td>
<td><var class="folder">wp-content/themes</var></td>
</tr>
<tr>
<td><var class="file_info file">themename.info</var></td>
<td><var class="file_css file">style.css + wp_head()</var></td>
</tr>
<tr>
<td><dfn>Region<dfn></td>
<td><dfn>Dynamic Sidebar<dfn></td>
</tr>
<tr>
<td><dfn>Block<dfn></td>
<td><dfn>Sidebar Widget<dfn></td>
</tr>
<tr>
<td><dfn>Page<dfn></td>
<td><dfn>Template<dfn></td>
</tr>
<tr>
<td><dfn>Node / Content Type<dfn></td>
<td><dfn>Post + Custom Values<dfn></td>
</tr>
<tr>
<td><dfn>page*.tpl.php<dfn></td>
<td><dfn>Template file: index/single/archive.php, etc.<dfn></td>
</tr>
<tr>
<td><dfn>node*.tpl.php<dfn></td>
<td><dfn>Code <strong>within</strong> the loop<dfn></td>
</tr>
<tr>
<td><var class="file_php file">template.php</var></td>
<td><var class="file_php file">functions.php</var></td>
</tr>
</tbody>
</table>
<p>The similarities in theming begin to diverge at <var class="file_php file">page.php</var>/<var class="file_php file">index.php</var>. From here, Drupal uses different files for &#8220;nodes,&#8221; &#8220;blocks,&#8221; and optionally &#8220;panels,&#8221; &#8220;contexts,&#8221; &#8220;views,&#8221; and so on depending on what modules you are using.</p>
<p>Let me know if you have any more useful parallels to draw. I hope this helps you make sense of things&mdash;I know it would have helped me when I started.</p>




---
title:      Google Analytics, iFrames, and Multiple Domain Setups
subheader:  
date:       2010-02-24T14:38:56+00:00
tags:
  - analytics
  - apache
  - domains
  - google
  - iframe
  - javascript
  - tracking
hero:       
slug:       google-analytics-iframes-and-multiple-domain-setups
permalink:  http://davidosomething.com/blog/google-analytics-iframes-and-multiple-domain-setups/
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




---
title:      Building a Rating System in ColdFusion and SQL Server
subheader:  
date:       2010-02-22T19:12:45+00:00
tags:
  - coldfusion
  - sql
hero:       
slug:       building-a-rating-system-in-coldfusion-and-sql-server
permalink:  http://davidosomething.com/blog/building-a-rating-system-in-coldfusion-and-sql-server/
---


<p>This is a <em>very</em> simple tutorial on how to create a rating system (for rating anything) in Adobe ColdFusion. For this example, we will be creating a game arcade, consisting of a games table and a ratings table.</p>
<h4>Requirements:</h4>
<ul>
<li>Webserver(s) running ColdFusion and SQL Server.</li>
<li>ColdFusion datasource <a href="http://www.peachpit.com/articles/article.aspx?p=29452">already set up</a> (plenty of tutorials for this, too).</li>
</ul>
<h4>Objectives:</h4>
<ul>
<li>Create database tables.</li>
<li>Create rating queries.</li>
</ul>
<h3>Information Architecture</h3>
<p>First we need to create tables in the database. Here is the database structure we will be following:</p>
<div class="image"><a href="http://davidosomething.com/content/uploads/cfgames_db.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/cfgames_db.png" alt="" title="Games and games ratings database tables" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-157" /><noscript><img src="http://davidosomething.com/content/uploads/cfgames_db.png" alt="" title="Games and games ratings database tables" class="aligncenter size-thumbnail wp-image-157" /></noscript></a></div>
<p>Not that it matters, but this is an identifying relationship, meaning that the games_ratings table is meaningless without the games table. Also, we have a one game to many ratings relationship.</p>
<p><span id="more-113"></span></p>
<h4>SQL for the games table:</h4>
<pre class="brush: sql">
CREATE TABLE [dbo].[games] (
	[id] [int] IDENTITY (1, 1) NOT NULL ,
	[name] [varchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL ,
	[url] [varchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL ,
	[rating] [tinyint] NULL ,
	[weight] [int] NULL 
) ON [PRIMARY]
GO
</pre>
<p>This is pretty straightforward. The <samp>weight</samp> is for ordering the entries, i.e., manually sorting the games. Rating is an integer from 1-5.</p>
<h4>SQL for the games_ratings table:</h4>
<pre class="brush: sql">
CREATE TABLE [dbo].[games_ratings] (
	[game_id] [int] NOT NULL ,
	[rating] [tinyint] NOT NULL 
) ON [PRIMARY]
GO
</pre>
<p>The <samp>game_id</samp> is a foreign key to the <samp>id</samp> column in the <samp>games</samp> table.</p>
<h4>Add some sample games:</h4>
<p>We won&#8217;t be creating a custom CMS to enter games in this exercise, so let&#8217;s just insert them via SQL:</p>
<pre class="brush: sql">
INSERT INTO [games] ([name], [url]) VALUES('Super Happy Fun Game', '/shfg')
INSERT INTO [games] ([name], [url]) VALUES('Awesome Adventure Omega', '/aao')
GO
</pre>
<p>The IDs will be automatically generated (1 for Super Happy Fun Game and 2 for Awesome Adventure Omega), and we aren&#8217;t using rating or weight.</p>
<h3>A Test UI</h3>
<p>Now that we have the database architecture in place, we need a way to add entries. First, let&#8217;s create an HTML form to add entries for debugging:</p>
<pre class="brush: xml">
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
&lt;html>&lt;head>&lt;title>Add Game Rating&lt;/title>&lt;/head>&lt;body>
&lt;form action="gamesRate.cfm" method="post">
&lt;fieldset>
&lt;table>
&lt;tr>&lt;td>ID:&lt;/td>&lt;td>&lt;input type="text" size="2" name="id" id="id">&lt;/td>&lt;/tr>
&lt;tr>&lt;td>Rating:&lt;/td>&lt;td>&lt;input type="text" size="1" name="rating" id="rating">&lt;/td>&lt;/tr>
&lt;/table>
&lt;input type="submit" />
&lt;/p>
&lt;/fieldset>
&lt;/form>
&lt;/body>
&lt;/html>
</pre>
<p>I&#8217;ve named this file <samp>gamesRate.cfm</samp>. The form posts to itself, as you can see on line 4. There&#8217;s a field for the game ID and a field for the rating. If you check out this file on your server, you should see the form. You can submit values to it, but it won&#8217;t do anything yet.<br />
For convenience, lets add a table that displays the game names and IDs underneath the form (and before the <code>&lt;/body></code> tag):</p>
<pre class="brush: xml">
&lt;cfquery name="getGames" datasource="#MYDATASOURCE#">
	SELECT 		id, name
	FROM 		games
	ORDER BY 	id DESC
&lt;/cfquery>
&lt;table cellpadding="8" cellspacing="0">
&lt;thead>&lt;tr>
&lt;th>Game ID&lt;/th>
&lt;th>Game Title&lt;/th>
&lt;/tr>&lt;/thead>
&lt;tbody>
&lt;cfoutput query="getGames">&lt;tr>
&lt;td>#getGames.id#&lt;/td>
&lt;td>&lt;a href="#getGames.link_url#">#getGames.name#&lt;/a>&lt;/td>
&lt;/tr>&lt;/cfoutput>
&lt;/tbody>
&lt;/table>
</pre>
<p>Here is our first instance of a ColdFusion Query. Replace <samp>MYDATASOURCE</samp> with the correct value for your ColdFusion datasource. If you visit gamesRate.cfm now you should see the form and a table with IDs and game names. The values should be the ones we <code>INSERT</code>ed earlier.</p>
<p>Next, we want to process the form in the event it is submitted. At the beginning of the gamesRate.cfm file, we are going to add a <code>cfif</code> statement that checks for form submissions. We&#8217;ll do some very basic sanitization checks, and finally insert the rating if the values are in the correct format. Here&#8217;s the code:</p>
<pre class="brush: xml">
&lt;!--- Check form submit --->
&lt;cfif IsDefined("form.id")>
	&lt;cfif NOT IsDefined("form.rating")>
		&lt;cfset variables.error = 'No input passed.'>
	&lt;/cfif>

	&lt;!--- Sanity checks --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;cfif NOT IsNumeric(form.id)>
			&lt;cfset variables.error = 'Invalid game ID value.'>
		&lt;/cfif>
		&lt;cfif NOT IsNumeric(form.rating) OR form.rating GT 5>
			&lt;cfset variables.error = 'Invalid rating value #form.rating#.' >
		&lt;/cfif>
	&lt;/cfif>

	&lt;!--- ok to run queries now --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;!--- Check for game exists: --->
		&lt;cfquery name="gameExists" datasource="#datasource#" result="existsResult">
		 SELECT name
		 FROM #games_table#
		 WHERE id = #form.id#
		&lt;/cfquery>
		&lt;cfif existsResult.RecordCount eq 0 >
			&lt;cfset variables.error = 'Invalid game ID.'>
		&lt;/cfif>
	&lt;/cfif>

	&lt;!--- No errors, do insert: --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;cfquery name="rateGame" datasource="#datasource#">
		INSERT INTO #game_ratings_table# (
			game_id,
			rating
		) VALUES (
			#form.id#,
			#form.rating#
		)
		&lt;/cfquery>
	&lt;/cfif>
&lt;/cfif>
</pre>
<p>So first we checked for a submit. Then, we checked that the fields were filled in and filled with numbers. We check to see if the game exists. Finally, if everything is ok, we insert the new rating. An error message will stored in <samp>variables.error</samp> if anything went wrong. If you try your form out now, and check your games_ratings table, you should see values inserted.</p>
<h3>Updating the ratings</h3>
<p>Rather than calculate the average ratings on every page request, we will be using a separate script to generate the averages. A DTS package or other query scheduler (ColdFusion has one!) can run your query on a set schedule. This can reduce your SQL server load. We&#8217;ll add the following code to updateGamesRatings.cfm and run it every half hour (or to a DTS package or other scheduled service):</p>
<pre class="brush: xml">
&lt;cfquery name="getRatings" datasource="MYDATASOURCE" result="getRatingsResult">
	SELECT 		AVG(gr.rating) AS new_rating, MAX(g.id) as id, MAX(g.name) as name
	FROM 		games_ratings gr
	LEFT OUTER JOIN games g ON gr.game_id = g.id
	GROUP BY	gr.game_id
&lt;/cfquery>

&lt;html>&lt;head>&lt;title>Generate Ratings&lt;/title>&lt;/head>&lt;body>
&lt;p>&lt;cfoutput>&lt;strong>#getRatingsResult.RecordCount#&lt;/strong> records updated.&lt;/cfoutput>&lt;/p>
&lt;cfoutput query="getRatings">
	&lt;p>The new average rating for &lt;strong>[#id#] #name#&lt;/strong> is &lt;strong>#new_rating#&lt;/strong>&lt;/p>
	&lt;cfquery name="updateRating" datasource="MYDATASOURCE">
		UPDATE 	 	games
		SET 		rating = &lt;cfqueryparam value="#new_rating#" CFSQLType = "CF_SQL_INTEGER">
		WHERE 		id = &lt;cfqueryparam value="#id#" CFSQLType = "CF_SQL_INTEGER">
	&lt;/cfquery>
&lt;/cfoutput>
&lt;/body>
&lt;/html>
</pre>
<p>When you visit this file, it outputs the result of a query. The query output is the game ID, name, and average rating. The ratings are calculated for a particular game ID in the first <code>cfquery</code> and inserted in the output loop.</p>
<h3>Conclusion</h3>
<p>From this code you should be able to deviate any number of displays for the ratings. You can integrate this code with any number of ratings systems, such as <a href="http://www.fyneworks.com/jquery/star-rating/">jQuery Star Rating Plugin</a>, Star Rating widget, or some HTML or Flash system. Simply set the <code>$.post()</code> or <code>action</code> URL to the gamesRate.cfm page you created. It could also benefit from a cookie (ok), user login (recommended), or other tracking system to prevent multiple ratings.</p>




---
title:      jQRPG — An Old-School Style RPG in jQuery
subheader:  
date:       2010-02-19T13:55:19+00:00
tags:
  - css
  - games
  - javascript
  - jquery
  - programming
hero:       
slug:       jqrpg-an-old-school-style-rpg-in-jquery
permalink:  http://davidosomething.com/blog/jqrpg-an-old-school-style-rpg-in-jquery/
---


<p>Javascript/<a href="http://docs.jquery.com/Browser_Compatibility">jQuery</a> and CSS compatibility is finally at a decent state amongst major browsers (IE and ACID3 notwithstanding). At least, similar/the same DOM manipulation behavior can be reproduced across those browsers. Not only that, but the JavaScript rendering speed of engines other than Trident (IE&#8217;s) is <a href="http://lifehacker.com/5457242/browser-speed-tests-firefox-36-chrome-4-opera-105-and-extensions">quite fast</a>. With these developments, it is actually possible to <a href="http://gamequery.onaluf.org/">create</a> <a href="http://jonraasch.com/blog/jquery-video-game-remake-tc-surf-designs">playable</a> games (really, check those links out!).</p>
<h3>The Demo</h3>
<p>In about 4 hours I&#8217;ve created a demo RPG here using jQuery, JavaScript, CSS, and the <a href="http://code.google.com/p/js-hotkeys/">Javascript jQuery Hotkeys Plugin</a>. I&#8217;m surprised no one has created a complete, working one yet, as tile-based RPGs are much easier to make than action games with collision detection.<br />
<img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/jqrpg.png" alt="jQRPG Screenshot" title="jQRPG Screenshot" width="370" height="385" class="lazy lazy-hidden aligncenter size-full wp-image-146" /><noscript><img src="http://davidosomething.com/content/uploads/jqrpg.png" alt="jQRPG Screenshot" title="jQRPG Screenshot" width="370" height="385" class="aligncenter size-full wp-image-146" /></noscript><br />
<span id="more-145"></span><br />
If anyone is interested, I might continue building this, adding in turn-based menu battles (oh boy!), a shop system, and AJAX saving and loading with an HTML5 backend. <strong>Leave a comment!</strong></p>
<h3>Outro</h3>
<p>Not that I&#8217;m against Flash (looking at you, Apple), but JavaScript is much easier to learn and there is much potential in using it for things other than special effects and Web Applications. We&#8217;ve already recreated all the basic elements used in the Nintendo games of yore using CSS and jQuery; e.g., sprite animation (with many techniques) and <a href="http://stephband.info/jparallax/">parallax</a> <a href="http://dev.jonraasch.com/scrolling-parallax/examples/scrolling-parallax">scrolling</a>. Combined with the super fance sliding, fading, easing, and opacity animations we are already afforded, the browser is a feature rich playground for game developers. Hopefully we&#8217;ll see more techniques emerge, and with them more games. I am looking forward to jQuery being the new QBASIC.</p>
<h3>References</h3>
<ol>
<li><a href="http://docs.jquery.com/Browser_Compatibility">jQuery Browser Compatibility</a></li>
<li>Acid Browser Tests</li>
<li><a href="http://gamequery.onaluf.org/">gameQuery</a></li>
<li><a href="http://jonraasch.com/blog/jquery-video-game-remake-tc-surf-designs">jQuery Video Game Remake: T&amp;C Surf</a></li>
<li><a href="http://code.google.com/p/js-hotkeys/">Javascript jQuery Hotkeys Plugin</a></li>
<li>JQuery Sprite Animation Plugin</li>
<li><a href="http://stephband.info/jparallax/">jParallax</a></li>
<li><a href="http://dev.jonraasch.com/scrolling-parallax/examples/scrolling-parallax">Scrolling Parallax jQuery Plugin</a></li>
</ol>




---
title:      Drupal 6: Hiding Drupal Form Labels
subheader:  
date:       2010-02-16T14:46:10+00:00
tags:
  - cms
  - drupal
  - php
hero:       
slug:       drupal-6-hiding-drupal-form-labels
permalink:  http://davidosomething.com/blog/drupal-6-hiding-drupal-form-labels/
---


<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/howtogetridofthese.png" alt="" title="How to get rid of the form labels" width="350" height="125" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-102" /><noscript><img src="http://davidosomething.com/content/uploads/howtogetridofthese.png" alt="" title="How to get rid of the form labels" width="350" height="125" class="aligncenter size-thumbnail wp-image-102" /></noscript><br />
One of the nuisances of the form output generated by Drupal is that you can&#8217;t output <em>just</em> the form field. The field is always accompanied by a <code>&lt;label&gt;</code> (called the <code>#title</code> in Drupal) and optionally the star denoting field requirement. There is no easy way to remove this field&mdash; you need to do it programmatically.</p>
<h3>Unset == Upset</h3>
<p>One way to remove the label is to unset the title element for the field in question:</p>
<pre class="brush: php">
unset($form['ELEMENT_NAME']['#title']);
</pre>
<p>This would be done in your theme&#8217;s (or module&#8217;s) <code>hook_form_alter()</code>. The downfall to this method is that it will most certainly yield unpleasant results when the theme engine is trying to render the form. The best example of this is the use of the <code>#title</code> element in form validation. If the field does not validate (e.g., not filled in when required or invalid format), then the theme engine outputs <samp><strong>#title</strong> is required</samp> or whatever the case may be. With the <code>#title</code> missing, only the &#8220;is required&#8221; is shown.<br />
<span id="more-101"></span></p>
<h3>A Better Way</h3>
<p>You can unobtrusively extend FormAPI, creating a new property to switch labels on and off. The first step to this is to override <code>theme_form_element()</code>. You can add this code to your theme&#8217;s template.php file. Most of the following code is from the core file form.inc except lines 16-26.</p>
<pre class="brush: php">
/**
 * Overriding drupal form.inc
 * Return a themed form element.
 */
function MYTHEME_form_element($element, $value) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();

  $output = '&lt;div class="form-item"';
  if (!empty($element['#id'])) {
    $output .= ' id="'. $element['#id'] .'-wrapper"';
  }
  $output .= ">n";
  $required = !empty($element['#required']) ? '&lt;span class="form-required" title="'. $t('This field is required.') .'">*&lt;/span>' : '';

  if (!empty($element['#title']) &#038;&#038; !$element['#hidetitle']) {
    $title = $element['#title'];
    if (!empty($element['#id'])) {
      $output .= ' &lt;label for="'. $element['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."&lt;/label>n";
    }
    else {
      $output .= ' &lt;label>'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."&lt;/label>n";
    }
  }
  $output .= " $valuen";
  if (!empty($element['#description']) &#038;&#038; !$element['#hidedesc']) {
    $output .= ' &lt;div class="description">'. $element['#description'] ."&lt;/div>n";
  }
  $output .= "&lt;/div>n";
  return $output;
}
</pre>
<p>On line 16 we are checking for a new condition, the boolean value of <samp>$element[&#8216;#hidetitle&#8217;]</samp>. If the value is true, the if block is skipped, so the label is not displayed. We do a similar thing on line 26, this time with <samp>$element[&#8216;#hidedesc&#8217;]</samp> to hide the description. These two conditions are the only differences from the vanilla form.inc.</p>
<p>Now that the boolean checks are in place for our new elements, we only have to add these new properties to our form elements. If you&#8217;re building a form using FormAPI, do something like this (example is an e-mail textfield):</p>
<pre class="brush: php">
$form['myfieldset']['email'] = array(
  '#type' => 'textfield',
  '#title' => t('E-mail Addresss'),
  '#default_value' => 'email',
  '#description' => t("Your e-mail address."),
  '#maxlength'=> 250,
  '#size'		=> 25,
  '#required' => TRUE,
  '#hidetitle' => TRUE,
  '#hidedesc' => TRUE,
  );
</pre>
<p>The new properties are on lines 9 and 10. When you output this field using <samp>&lt;?php print drupal_render($form[&#8216;myfieldset&#8217;][&#8217;email&#8217;]); ?&gt;</samp>, the label will not be displayed. For a textfield the description is never displayed, so <samp>#hidedesc</samp> really only applies to fieldsets.</p>
<p>If you built your form using the Webform module, or you&#8217;re using someone else&#8217;s form, you&#8217;ll have to perform a <code>hook_form_alter()</code>. I made a webform_hidetitles module for one project that does only this. You would add the new properties like so:</p>
<pre class="brush: php">
if($form_id == 'webform_form_id') {
  $form['submitted']['email']['#hidetitle'] = true;
}
</pre>
<p>Replace form_id on line 1 with your own form id (you can find this with Devel), and the form element (<samp>email</samp> in this case) with your own form element.</p>
<h3>Conclusion</h3>
<p>Now that you know how this works, maybe you can go write and contribute a module that makes it easy to optionally display form labels and descriptions.</p>




---
title:      Drupal 6: Creating an E-mail Subscription Block
subheader:  
date:       2010-02-10T12:17:39+00:00
tags:
  - cms
  - drupal
  - php
hero:       
slug:       drupal-creating-an-e-mail-subscription-block
permalink:  http://davidosomething.com/blog/drupal-creating-an-e-mail-subscription-block/
---


<p>The Drupal manual does a good job telling you how to <a href="http://drupal.org/node/206753">create a plain old block module</a> but other tutorials on module development are a hundredfold more complicated. The goal of this article is to follow up on the Drupal developer&#8217;s guide by creating another only slightly more advanced block.</p>
<h4>Prerequisites</h4>
<p>You should:</p>
<ol>
<li>have a <a href="http://drupal.org/getting-started/install">Drupal installation</a> to work with.</li>
<li>know how to administer Drupal (e.g., <a href="http://drupal.org/getting-started/install-contrib">install and activate modules</a>, <a href="http://drupal.org/handbook/modules/block">add blocks</a>).</li>
<li>know how to <a href="http://drupal.org/node/206753">create a basic block</a>.</li>
</ol>
<h4>Learning Objectives</h4>
<p>You will learn:</p>
<ol>
<li>how to create a .install file to create a database table.</li>
<li>how to create a block with a form.</li>
<li>how to process a form in Drupal.</li>
<li>how to perform database transactions in a Drupal module.</li>
<li>how to theme a form.</li>
</ol>
<h3>The proposed block</h3>
<p>The proposed block consists of a form with a fieldset, a text-input field, and a submit button. On submission, the text input field is validated as an e-mail address. If it does not validate, a Drupal error message is returned. Otherwise, the e-mail address will be saved to a database, an e-mail will be sent to the address, and a &#8220;thank you&#8221; message will be displayed. We will call this a &#8220;Persistent E-mail Capture Block&#8221; and use &#8220;pecapture&#8221; as its machine name.</p>
<p>This is what we&#8217;re aiming for:</p>
<div class="aligncenter"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/drupal_pecapture_block.png" alt="" title="Drupal pecapture Block" width="278" height="212" class="lazy lazy-hidden aligncenter size-full wp-image-75" /><noscript><img src="http://davidosomething.com/content/uploads/drupal_pecapture_block.png" alt="" title="Drupal pecapture Block" width="278" height="212" class="aligncenter size-full wp-image-75" /></noscript></div>
<p><span id="more-77"></span></p>
<h3>The .info File</h3>
<p>You know what it is and how it works from the Drupal developer&#8217;s guide. Our .info file will contain the following:</p>
<pre class="brush: plain">
; $Id$  
name = Persistent E-mail Capture
description = Provides a block with a form to enroll in subscriptions.
version = "6.x-0.0.1"
core = 6.x
php = 5.x
package = Other
</pre>
<p>If you need a refresher on what anything does, see the <a href="http://drupal.org/node/171205">Drupal manual page on .info files</a>.</p>
<h3>The .install File</h3>
<p>As described earlier, we are using a database table to store e-mail addresses. Here is our very simple database model:</p>
<div class="aligncenter"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/drupal_pecapture_dbmodel.png" alt="" title="Drupal pecapture Database Model" width="232" height="102" class="lazy lazy-hidden aligncenter size-full wp-image-76" /><noscript><img src="http://davidosomething.com/content/uploads/drupal_pecapture_dbmodel.png" alt="" title="Drupal pecapture Database Model" width="232" height="102" class="aligncenter size-full wp-image-76" /></noscript></div>
<p>We will now transform this model into an .install file schema:</p>
<pre class="brush: php">
&lt;?php
// $Id$

/**
 * Implementation of hook_install().
 */ 
function pecapture_install() {
  drupal_install_schema('pecapture');
}

/**
 * Implementation of hook_uninstall().
 */
function pecapture_uninstall() {
  drupal_uninstall_schema('pecapture');
}

/**
 * Implementation of hook_schema().
 */
function pecapture_schema() {
  $schema = array();
  $schema['pecapture'] = array(
    'fields' =&gt; array(
      'capture_id' =&gt; array(
        'type' 		=&gt; 'serial',
        'unsigned' 	=&gt; TRUE,
        'not null'	=&gt; TRUE,
      ),
      'email'=&gt;array(
        'type'		=&gt; 'varchar',
        'length'	=&gt; '250',
        'not null'	=&gt; TRUE,
        'default'	=&gt; '',
      ),
    ),
    'indexes' =&gt; array('capture_id' =&gt; array('capture_id')),
    'primary_key' =&gt; array('capture_id'), 
  );	
  return $schema;
}
</pre>
<p>When you activate your module, Drupal executes the <code>hook_install()</code> function, <samp>pecapture_install()</samp> in this case. Likewise, in deactivation or removal, the <code>hook_uninstall()</code> function is executed&mdash; <samp>pecapture_uninstall()</samp> for us.<br />
Our hooks are pretty simple. Their one task is to install or uninstall the pecapture schema. The function <samp>pecapture_schema()</samp> returns an array of arrays, which Drupal uses to build a table. The structure of this array of arrays is pretty straightforward and mirrors our database model exactly.</p>
<h3>The .module File</h3>
<p>The .module file should have an opening php tag and a CVS tag as its first two<br />
lines:</p>
<pre class="brush: php">
&lt;?php
// $Id$
</pre>
<p>After that, we will add our own code. I&#8217;ll go over each function based on its dependency on other functions. The hooks are not necessarily the order Drupal executes them, but that doesn&#8217;t matter.</p>
<h4>General Functions</h4>
<p>First up are the standard hooks. These are all described in the Drupal developer&#8217;s guide, so I won&#8217;t reinvent the wheel here.</p>
<pre class="brush: php">
/**
 * Display help and module information
 * @param path which path of the site we're displaying help
 * @param arg array that holds the current path as would be returned from arg() function
 * @return help text for the path
 */
function pecapture_help($path, $arg) {
  $output = '';  //declare your output variable
  switch ($path) {
    case "admin/help#pecapture":
      $output = '&lt;p&gt;'.  t("Provides a block for the persistent e-mail capture form.") .'&lt;/p&gt;';
      break;
  }
  return $output;
} // function pecapture_help

/**
 * Implementation of hook_perm().
 */
function pecapture_perm() {
  return array('access pecapture content', 'administer pecapture');
}
</pre>
<h4>Our Functions</h4>
<p>Now for the good stuff: functions providing the unique functionality of our block. We will begin with the function that actually creates a block: <code>hook_block()</code>. In this case, our function is called <samp>pecapture_block()</samp>.</p>
<pre class="brush: php">
/**
 * Implementation of hook_block
 * @param string $op one of "list", "view", "save" and "configure"
 * @param integer $delta code to identify the block
 * @param array $edit only for "save" operation
 */
function pecapture_block($op = 'list', $delta = 0, $edit = array()) { 
  $block = array();
  if ($op == 'list') { // Generate listing of blocks from this module, for the admin/block page
    $block[0]['info'] = t('Persistent E-mail Capture Form Block');
  } 
  else if ($op == 'view') { // Generate our block content
    $block['subject'] = ''; //'Persistent E-mail Capture Form';
    $block['content'] = pecapture_displayform();
  }
  return $block;
} // function pecapture_block
</pre>
<p>You&#8217;ll recognize the list part from the Drupal guide. Our <samp>&#8216;view&#8217;</samp> operation is different, though. We aren&#8217;t giving it a subject, and we&#8217;re using a function to generate the contents.</p>
<p>Here is that function:</p>
<pre class="brush: php">
function pecapture_displayform() {
  return drupal_get_form('pecapture_blockform');
}
</pre>
<p>All this function does is return another function&#8217;s value! We use it to facilitate theming later on. The return value calls <code>drupal_get_form()</code>, which takes a function name as an argument.</p>
<p>The function name provided is <samp>pecapture_blockform()</samp>:</p>
<pre class="brush: php">
function pecapture_blockform(&#038;$form_state) {
  $form = array();
  $form['pecapture'] = array(
    '#type'			=&gt; 'fieldset',
    '#title'		=&gt; t('Don't Miss Out'),
    '#description'	=&gt; t('Sign up for National Train Day updates.'),
    '#collapsible' 	=&gt; FALSE,
    '#hidefieldsets' =&gt; TRUE,
  );
  $form['pecapture']['email'] = array(
    '#type' =&gt; 'textfield',
    '#title' =&gt; t('E-mail Addresss'),
    '#default_value' =&gt; 'email',
    '#description' =&gt; t("The e-mail address to which you will receive updates."),
    '#maxlength'=&gt; 250,
    '#size'		=&gt; 25,
    '#required' =&gt; TRUE,
  );
  $form['submit'] = array(
    '#type' =&gt; 'submit',
    '#value' =&gt; t('Keep me updated!'),
  );
  $form['#theme']     = 'pecapture_displayform';
  $form['#validate']  = array('pecapture_blockform_validate');
  return $form;
}
</pre>
<p>This function holds a Drupal form definition. Drupal has a special system for creating forms using an array of arrays. It works the same as creating a database table in Drupal. First we build a fieldset with a title (which equates to the <code>&lt;legend&gt;</code> tag and a description, which is simply the first paragraph in the fieldset. Then we create the e-mail field and submit button.</p>
<p>The line <code>$form['#theme']     = 'pecapture_displayform';</code> tells Drupal that when outputting this form, use <samp>&#8216;pecapture_displayform&#8217;</samp> as the argument for the <code>theme()</code> function. The <code>theme()</code> function currently has no clue what to do with <samp>&#8216;pecapture_displayform&#8217;</samp> so we have to give it a definition using <code>hook_theme()</code>:</p>
<pre class="brush: php">
/**
 * Implementation of hook_theme()
 */
function pecapture_theme() {
  $path = drupal_get_path('module', 'pecapture') . '/theme';
  return array(
    'pecapture_displayform' => array(
      'arguments' => array('form' => NULL),
      'template' => 'pecapture-displayform',
      'path' => $path,
    ),
  );
}
</pre>
<p>This tells Drupal that when <samp>theme(&#8216;pecapture_displayform&#8217;)</samp> is called, the file <samp>pecapture/theme/pecapture-displayform.tpl.php</samp> should be returned for output. We have to create that file:</p>
<pre class="brush: php">
&lt;div class="sidebar-email"&gt;

&lt;img src="&lt;?php print base_path().path_to_theme(); ?&gt;/images/headline_dontmissout.jpg" alt="Don't Miss Out" width="211" height="30" border="0" /&gt;
&lt;p&gt;&lt;?php print $form['pecapture']['#description']; ?&gt;&lt;/p&gt;
&lt;br /&gt;
	&lt;?php print drupal_render($form['pecapture']['email']); ?&gt;
	&lt;?php print drupal_render($form['submit']); ?&gt;
	&lt;div style="display: none;"&gt;
	&lt;?php
		unset($form['pecapture']);
		unset($form['submit']);
		print drupal_render($form);
	?&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>
<p>This creates a <code>&lt;div&gt;</code> for the block, displays a header image, prints the description, displays the e-mail field and submit button, and flushes the rest of the form that we don&#8217;t need. You can customize this to your liking. Save this in the <samp>theme</samp> subdirectory in your module&#8217;s directory.</p>
<p>Now that you know what happens with <code>$form['#theme']     = 'pecapture_displayform';</code> we can go back to the function <samp>pecapture_blockform()</samp>, and explain the line: <code>$form['#validate']  = array('pecapture_blockform_validate');</code></p>
<p>This line tells drupal to use the function <samp>pecapture_blockform_validate()</samp> to validate the form before it is submitted. Here is the code:</p>
<pre class="brush: php">
function pecapture_blockform_validate($form, &#038;$form_state) {
  $email = $form_state['values']['email'];
  if (strlen($email) &lt; 1) {
    form_set_error('email', t('Please provide your e-mail address.'));
  }
  else if (!eregi('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.([a-zA-Z]{2,4})$', $email)) {
    form_set_error('email', t('That is not a valid e-mail address.'));
  }
  else if ($email_user = pecapture_getUserByField('email',$email)) {
    if (isset($email_user)) {
      form_set_error('answers', t('Your e-mail address has already been subscribed.'));
    }
  }
}
</pre>
<p>This checks to see if the e-mail address field was blank, if it matches an e-mail regular expression, and if the e-mail address already exists in the database. We are using the function <samp>pecapture_getUserByField(&#8217;email&#8217;,$email)</samp> to find a user in the database, but we need to write that. Here it is:</p>
<pre class="brush: php">
function pecapture_getUserByField($field,$data){
  $q = 'SELECT capture_id FROM {pecapture} WHERE %s LIKE '%s' LIMIT 1';
  $q = db_fetch_array(db_query($q,array($field,$data)));
  if (isset($q['capture_id']))
    return true;
  else 
    return false;
}
</pre>
<p>This very simply selects the e-mail address from the database and returns true or false. This concludes our validation function.</p>
<p>The final function in our module is the <code>hook_submit()</code> function for the form:</p>
<pre class="brush: php">
function pecapture_blockform_submit($form, &#038;$form_state) {
  $values = $form_state['values'];
  $fields = array('email');
  $q = 'INSERT INTO {pecapture} ('.implode(',',$fields).') VALUES ('%s')';
  $insert = array();
  foreach ($fields as $f) {
	$insert[] = $values[$f];
  }
  db_query($q, $insert);
  $user = $insert;
  drupal_set_message('Thanks for subscribing!');
}
</pre>
<p>This just creates a query based on the form values and runs it, then queues a Drupal message.</p>
<h3>Conclusion</h3>
<p>This could have been accomplished with the modules <a href="http://drupal.org/project/webform">Webform</a> and <a href="http://drupal.org/project/webformblock">Webform Block</a> or <a href="http://drupal.org/project/nodeasblock">Node As Block</a> or <a href="http://drupal.org/node/248157">PHPTemplate to insert a node into a region</a>, but creating your own module in this case offers a level of theme output greater than what Webform allows without some intricate hooks (try and remove the form label!). You should now also have a better understanding of how to create a Drupal module, form, and hook into themes.</p>
<h3>Further Reading</h3>
<p>I recommend following these tutorials next, in order:</p>
<ol>
<li>Creating Our First Module using Drupal 6</li>
<li><a href="http://gazebo.commonplaces.com/2009/06/creating-simple-modules-and-filling-the-functionality-gap/">Creating &#8220;Simple&#8221; Drupal Modules, and Filling the Functionality Gap</a></li>
</ol>




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




---
title:      Understanding @font-face and Typography
subheader:  
date:       2010-02-04T12:58:10+00:00
tags:
  - css
  - typography
hero:       
slug:       understanding-font-face-and-typography
permalink:  http://davidosomething.com/blog/understanding-font-face-and-typography/
---


<p>davidosomething.com currently uses the @font-face CSS rule to load and define <strong>fonts</strong>. The key point is that fonts, and not typefaces, are defined. A font is &#8220;any variant in a typeface&#8217;s size and style&#8221; (<cite><a href="http://jontangerine.com/log/2008/08/typeface--font">Jon Tan</a></cite>).</p>
<p>A key element missing from many @font-face resources online (e.g., tutorials, and CSS generators like <a href="http://www.fontsquirrel.com/">Font Squirrel</a>) is the definition of weight and style in the @font-face rule. These two properties are vital when you want to properly use a typeface. Many professional typefaces come in multiple files, splitting a typeface into bold, light, italics, oblique, and combinations of those. The font Aurulent used on davidosomething.com is one example, coming in four styles:</p>
<div class="image aligncenter"><a href="http://davidosomething.com/content/uploads/aurulent.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/aurulent.png" alt="Aurulent Sans Typeface" title="Aurulent Sans Typeface" class="lazy lazy-hidden size-thumbnail wp-image-25" /><noscript><img src="http://davidosomething.com/content/uploads/aurulent.png" alt="Aurulent Sans Typeface" title="Aurulent Sans Typeface" class="size-thumbnail wp-image-25" /></noscript></a></div>
<p><cite><a href="http://www.fontsquirrel.com/fonts/Aurulent-Sans">Aurulent Sans on Font Squirrel</a></cite></p>
<h3>A Demonstration of the Problem</h3>
<p>Let&#8217;s take a look at what happens when you use this very typical CSS rule:</p>
<pre class="brush: css">
strong { font-weight: 700; }
</pre>
<p>with this HTML sample:</p>
<pre class="brush: html">
&lt;strong>Hello world!&lt;/strong>
</pre>
<p><span id="more-24"></span></p>
<p>The CSS generated by Font Squirrel for Aurulent Sans (not to pick on them, others may do the same) looks like this:</p>
<pre class="brush: css">
/*
 * This CSS file has been generated by fontsquirrel.com and is based on the work of Paul Irish. 
* 
*/


/*
 *
 * The fonts included are copyrighted by the vendor listed below.
 *
 * @vendor:     Stephen G. Hartke
 * @licenseurl: http://www.fontsquirrel.com/license/Aurulent-Sans
 *
 *
 */

@font-face {
	font-family: 'AurulentSansRegular';
	src: url('AurulentSans-Regular.eot');
	src: local('Aurulent Sans Regular'), local('AurulentSans-Regular'), url('AurulentSans-Regular.ttf') format('truetype');
}

@font-face {
	font-family: 'AurulentSansItalic';
	src: url('AurulentSans-Italic.eot');
	src: local('Aurulent Sans Italic'), local('AurulentSans-Italic'), url('AurulentSans-Italic.ttf') format('truetype');
}

@font-face {
	font-family: 'AurulentSansBold';
	src: url('AurulentSans-Bold.eot');
	src: local('Aurulent Sans Bold'), local('AurulentSans-Bold'), url('AurulentSans-Bold.ttf') format('truetype');
}

@font-face {
	font-family: 'AurulentSansBoldItalic';
	src: url('AurulentSans-BoldItalic.eot');
	src: local('Aurulent Sans BoldItalic'), local('AurulentSans-BoldItalic'), url('AurulentSans-BoldItalic.ttf') format('truetype');
}
</pre>
<p>Properly defined, though, it should really look like this:</p>
<pre class="brush: css">
@font-face {
	font-family: 'Aurulent Sans';
	/* font-style/font-weight are normal/normal (400) when not specified */
	src: url('AurulentSans-Regular.eot');
	src: local('Aurulent Sans Regular'), local('AurulentSans-Regular'), url('AurulentSans-Regular.ttf') format('truetype');
}
@font-face {
	font-family: 'Aurulent Sans';
	font-style: italic; /* not oblique! */
	src: url('AurulentSans-Italic.eot');
	src: local('Aurulent Sans Italic'), local('AurulentSans-Italic'), url('AurulentSans-Italic.ttf') format('truetype');
}

@font-face {
	font-family: 'Aurulent Sans';
	font-weight: bold; /* or 700, but for semantics sake */
	src: url('AurulentSans-Bold.eot');
	src: local('Aurulent Sans Bold'), local('AurulentSans-Bold'), url('AurulentSans-Bold.ttf') format('truetype');
}

@font-face {
	font-family: 'Aurulent Sans';
	font-style: italic;
	font-weight: bold;
	src: url('AurulentSans-BoldItalic.eot');
	src: local('Aurulent Sans BoldItalic'), local('AurulentSans-BoldItalic'), url('AurulentSans-BoldItalic.ttf') format('truetype');
}
</pre>
<p>In some browsers, such as Google Chrome 4 and 5.0beta (and probably other WebKit browsers but I am too lazy to test), the normal weight is used.</p>
<p>Mozilla Firefox 3.6 does a thing called faux bold, which uses math (devil&#8217;s magic!) to stretch the font and make it appear bold. The result is the top sample, while the true bold Aurulent Sans is on the bottom:</p>
<figure id="attachment_23" style="width: 145px;" class="wp-caption aligncenter"><img src="http://davidosomething.com/content/uploads/aurulent_bold.png" alt="Aurulent bold and faux bold" title="Aurulent bold and faux bold" width="145" height="95" class="size-full wp-image-23" /><figcaption class="wp-caption-text">Aurulent bold and faux bold</figcaption></figure>
<p>The difference is pretty clear in the letters e, w, and r. If you care enough about typography to be using @font-face, the top rendering should be considered blasphemous. Using the handcoded CSS with styles and weights in place, the true bold is used.</p>
<h3>Font-family != Typeface != &#8220;font-face&#8221;</h3>
<p>Once again:</p>
<ul>
<li>A typeface is the collective design for a type family (e.g., the Garamond family).</li>
<li>A font is a typeface variant (e.g., Garamond Bold 12pt).</li>
<li>A font-face is your CSS font definition for a typeface, but may contain a fallback font in another typeface (<cite><a href="http://hacks.mozilla.org/2009/06/beautiful-fonts-with-font-face/">see here</a></cite>) (e.g., <code>src: url('garamond.otf'), local('Times New Roman');</code>).</li>
<li>A font-family is a collection defined by font-faces. The members of a font- family are declared in each @font-face tag, counterintuitively. <em>A font-family does not have to consist of one typeface!</em> An example is the following:</li>
</ul>
<p>CSS:</p>
<pre class="brush: css">
@font-face {
 font-family: 'VerdaTica';
 src: local('Helvetica');
}
@font-face {
 font-family: 'VerdaTica';
 font-style: italic;
 src: local('Verdana');
}
em { font-style: italic; }
body { font-family: VerdaTica, Sans-serif; }
</pre>
<p>HTML:</p>
<pre class="brush: html">
&lt;p>I'm in Helvetica!&lt;/p>
&lt;p>I'm in italic Verdana!&lt;/p>
&lt;p>We're different font-faces (i.e. fonts, and also different typefaces) in the same font-family!&lt;/p>
</pre>
<h3>Final Remarks</h3>
<p>The <a href="http://www.w3.org/"><abbr title="World Wide Web Consortium">w3c</abbr></a> is redefining typography. What&#8217;s next, @char-face to let us define our own ampersands? @scar-face to let us define our own font texture overlay? (see what I did there)?</p>
<h3>Cited</h3>
<h5>Typeface != Font</h5>
<p><a href="http://jontangerine.com/log/2008/08/typeface--font">http://jontangerine.com/log/2008/08/typeface&#8211;font</a></p>
<h5>Font Squirrel | Free Font Aurulent Sans by Stephen G. Hartke</h5>
<p><a href="http://www.fontsquirrel.com/fonts/Aurulent-Sans">http://www.fontsquirrel.com/fonts/Aurulent-Sans</a></p>
<h5>beautiful fonts with @font-face</h5>
<p><a href="http://hacks.mozilla.org/2009/06/beautiful-fonts-with-font-face/">http://hacks.mozilla.org/2009/06/beautiful-fonts-with-font-face/</a></p>




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




---
title:      Using Notepad++ for Web Development
subheader:  
date:       2010-02-02T09:27:01+00:00
tags:
  - software
  - windows
hero:       
slug:       using-notepad-for-web-development
permalink:  http://davidosomething.com/blog/using-notepad-for-web-development/
---


<p>I like real IDEs for console and application programming, but for web development I&#8217;ve always felt most comfortable using a text editor. Notepad++ is my editor of choice because it is fast and feature rich.</p>
<figure id="attachment_9" style="width: 350px;" class="wp-caption aligncenter"><a href="http://davidosomething.com/content/uploads/npp.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/npp-350x238.png" alt="Notepad++ screenshot" title="Notepad++ screenshot" width="350" height="238" class="lazy lazy-hidden size-medium wp-image-9" /><noscript><img src="http://davidosomething.com/content/uploads/npp-350x238.png" alt="Notepad++ screenshot" title="Notepad++ screenshot" width="350" height="238" class="size-medium wp-image-9" /></noscript></a><figcaption class="wp-caption-text">Notepad++ screenshot</figcaption></figure>
<h3>Editor Settings</h3>
<p>Go to Settings -> Preferences to change the default settings for NP++.<br />
I turn on Multi-Editing Settings, which allows you to make multiple selections and edit them at the same time. Basically, this gives you multiple cursors that output the same text. I switch the Folder Margin Style to Circle tree, just as a preference. I also turn on the vertical edge, setting it to Line mode at 80 columns. There are plenty of other things to switch around if you just poke around in there. Next, I go to Settings -> Style Configurator and change my global font settings.</p>
<h3>Useful Plugins</h3>
<p>The default interface of NP++ is perfectly fine for web development, but with a few changes, it becomes much more powerful. One of the best things you can do is enable the Explorer plugin. Plugins can be added by going to the Plugins dropdown menu and using the Plugin<br />
Manager. Several plugins come installed by default. I typically add to the defaults: Compare, Explorer, MultiClipboard, Subversion, WebEdit, and XML Tools. Here are some tips regarding plugins:</p>
<ol>
<li>Enable the Explorer and MultiClipboard plugins in their respective menus in the Plugins menu. Check the settings for these plugins to see what they can do.</li>
<li>If you use Subversion, the Compare plugin can do quick checks against the base. Or, with any of the Tortoise versioning tools and the Explorer plugin, you never need to leave NP++ to do your version control.</li>
<li>Turn on the Console Dialog if you need to do anything from the command line. It even has special variables you can use (type &#8216;help&#8217;). If you type <code>cmd</code> from the console, you get a standard DOS prompt.</li>
<li>WebEdit gives you buttons that turn NP++ to a web editor with code wrapping. Use it by highlighting some text and clicking a button. The text will automatically be wrapped in tags. Read the instructions in Notepad++pluginsdocWebEditWebEdit.txt to learn how to add more.</li>
</ol>
<h3>Keyboard Shortcuts</h3>
<p>There are a few gems I&#8217;ve really come to love: Ctrl-D to duplicate a line and Ctrl-(Shift)-U to toggle case. I also add Ctrl-; as short date format (I always liked that combination from Excel). The TextFX shortcuts are good things to map. You can add keyboard shortcuts through Settings -> Shortcut Mapper.</p>




---
title:      Configuring a Local Server on Windows
subheader:  
date:       2010-01-29T08:18:27+00:00
tags:
  - apache
  - server
  - software
  - windows
hero:       
slug:       configuring-a-local-server-on-windows
permalink:  http://davidosomething.com/blog/configuring-a-local-server-on-windows/
---


<p>I will probably use this post as a reference for myself next time I have to set up a local development environment. It&#8217;s a well-learned fact that a properly set-up local server will reduce hiccups in development and ease in the transition to a production server.</p>
<h3 class="noted">XAMPP Post-installation Configuration</h3>
<p>I use the <a href="http://www.apachefriends.org/en/xampp.html">XAMPP</a> package on my laptop. This typically comes well configured (e.g. PHP memory limit is 128mb!), but there are a couple things it doesn&#8217;t do:</p>
<ol>
<li><strong>Add the path to php.exe to the environment variables.</strong> This lets you run the php executable from the command line, which you might need if you plan on using anything that is scripted in or compiles with php (e.g., the <a href="http://www.symfony-project.org/">symfony framework</a>).<br />
To add the path, go to the folder where you installed XAMPP, inside which is a php folder (where php.exe resides). Copy this path (for me it is <em class="folder">D:xamppphp</em>). Then, right-click on (My) Computer, select Properties -> Advanced system settings -> System Properties -> Advanced -> Environment Variables. In the System variables section, find and select Path, then click Edit. Add a semi-colon if there isn&#8217;t one at the end of the Variable value list and paste the path to php.exe after it.</li>
<li><strong>Repeat for perl.</strong> The perl binary was in <em class="folder">D:xamppperlbin</em> for me.</li>
</ol>
<h5>Paths Trouble</h5>
<p>I had a lot of trouble getting WordPress to play nice with local paths in Windows (the slashes go the wrong way when using $_SERVER variables or path functions), so next time I will definitely just set up my development server on a Linux virtual machine and carry that around with me. Apache on Cygwin is another option.<br />
<span id="more-681"></span></p>
<h3>Setting up Windows hosts and libraries</h3>
<p>For each project in its own domain or subdomain on a production server, I set up my &#8220;hosts&#8221; file to recognize a local mirror&#8211;such as &#8220;hokuten.dev&#8221; and &#8220;davidosomething.com.&#8221; The &#8220;hosts&#8221; file can be found in <em class="folder">C:WindowsSystem32driversetc</em>. I&#8217;m using Windows 7, on which there is a feature called &#8220;Libraries&#8221; that collects folders together. The &#8220;etc&#8221; folder is one of the folders I keep in a library I created called Development.<br />
The hosts file is usually write-protected by default. I turn this off and don&#8217;t think of it as a security risk as much as it is a convenience. You can edit the hosts file with any text editor. My file is typically already filled with entries generated by <a href="http://www.safer-networking.org/index2.html">Spybot &#8211; Search &#038; Destroy</a> and other programs. These programs use the hosts file to redirect requests to those addresses to localhost, where they are undefined and load nothing as a result. Using the same syntax as those entries, I create a few of my own at the top of the file:</p>
<pre class="brush: plain">
127.0.0.1	albanypdpsi.dev
127.0.0.1	davidosomething.com
127.0.0.1	hokuten.dev
127.0.0.1	metabook.dev
127.0.0.1	localhost
</pre>
<p>This basically means &#8220;redirect all requests to hokuten.dev to the ip 127.0.0.1.&#8221; 127.0.0.1 is the ip your computer sets as its own local ip. So now, if I type hokuten.dev into the browser, I circle back to localhost, where this host name is not recognized.</p>
<h3>Setting up Virtual Hosts</h3>
<p>Logically, the next step is to make the Apache service recognize this host. To do this, I add a virtual host to the &#8220;httpd-vhosts.conf&#8221; file located in the <em class="folder">D:xamppapacheconfextra</em> folder. I also add <em class="folder">D:xamppapacheconf</em> to my Development library so I can access the vhosts file easily.<br />
When adding virtual hosts, the name &#8220;localhost&#8221; stops working. You can turn it back on by adding the following as a virtual host:</p>
<pre class="brush: xml">
&lt;VirtualHost *:80&gt;
ServerName localhost
&lt;/VirtualHost&gt;
</pre>
<p>Here is part of my virtual hosts configuration file:</p>
<pre class="brush: xml">
# Virtual Hosts
NameVirtualHost *:80

################################################################################
# localhost
################################################################################
&lt;VirtualHost *:80&gt;
ServerName localhost
&lt;/VirtualHost&gt;

################################################################################
# davidosomething.com
################################################################################
&lt;VirtualHost *:80&gt;
	ServerName hokuten.dev
	ServerAlias www.hokuten.dev
	ServerAdmin localhost@hokuten.dev
	DocumentRoot &quot;D:/www/davidosomething.com&quot;
	&lt;Directory &quot;D:/www/davidosomething.com&quot;&gt;
		AllowOverride all
		Allow from all
		Options all
	&lt;/Directory&gt;
	ErrorDocument 404 /404.shtml
&lt;/VirtualHost&gt;
</pre>
<p>This is working, so if it doesn&#8217;t for you, check the Listen directive in httpd.conf and your firewall settings. Also, I turn off a few settings in httpd.conf, such as index colorization and user directories (see the includes section at the bottom of the file).</p>
