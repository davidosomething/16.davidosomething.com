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
slug:       how-i-work
permalink:  http://davidosomething.com/blog/how-i-work/
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

