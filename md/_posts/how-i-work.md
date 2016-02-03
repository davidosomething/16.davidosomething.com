---
title: "How I Work (2014)"
subheader: "The things I do for web projects."
datePublished: 2014-06-11T21:35:24+00:00
tags:
  - development
  - tooling
  - vagrant
slug: how-i-work
---

Creating a website is just not as simple as it used to be. In order to do things
right, I need all kinds of tools: compilers, linters, package managers,
optimizers and minifiers, etc. Aside from that I need to consider things like
portability, organization, and maintainability.

I just started a new job so I&#8217;ve had some time to think about the cleanest
way to get everything installed and organized. I follow some basic rules to keep
my environments clean. Here are the principles I follow and the reasoning behind
them:

## Install as many of the dependencies as possible in the userspace.

That is, don&#8217;t run npm or bower or others as root / with sudo. This is
important because I might be deploying to a shared host or I might run into file
permissions problems if my files/binaries are owned or run as root.

Furthermore, if something happens to an executable npm package &#8212; like
grunt gets hacked so that it deletes the filesystem &#8212; I don&#8217;t want
to run it as root.

On OSX, homebrew is pretty much the only thing I need to install with sudo.

## Don&#8217;t use system or system package manager binaries.

The versions of Ruby and PHP that comes with OSX are outdated. The ones in the
apt sources or pacman may be outdated, but more than likely they don&#8217;t
match the ones on my server environment.

To get around using the system/system packaged tools, use environment tools like
[nvm](https://github.com/creationix/nvm) for node (my
choice because it&#8217;s usually already on CentOS hosts),
[chruby](https://github.com/postmodern/chruby) for ruby,
[phpenv](https://github.com/phpenv/phpenv) for php, and
[virtualenv](http://virtualenv.readthedocs.org/en/latest/) for python.
You may need to install these with sudo so they&#8217;re available globally.

There are alternatives for each besides the ones I listed, but the important
part is once they&#8217;re installed I can use them to install the version
I need. Also, they install their respective binaries in the userspace (so I can
use npm, gem, composer, and pip without sudo), which ties back into the previous
rule.

## Everything external needs to be easily upgradable

For instance, it should be trivial to upgrade JavaScript and CSS frameworks.
That should be as simple as doing a `bower update` or `composer update`, or jam
or npm or bundle, whichever you&#8217;re dealing with. The hard part should be
fixing the things that break after the upgrade.

Another big thing to know: you can specify almost ANYTHING (URLs to individual
files, git repositories) as a dependency in bower, bundler, composer, and npm.
If you didn&#8217;t write it, consider using a package manager to manage it.
Whether or not you keep it in version control, it makes it easier to find the
original copy.

## Only commit clean code

To ensure this, there are linters for every language. I don&#8217;t make a big
deal out of committing code that doesn&#8217;t do what it&#8217;s supposed to
(sometimes I commit code just to save it &#8212; I can squash the commit later
before issuing a pull request), but if the indentation is wrong it will be a lot
harder to fix.

Adding a lint task to a pre-commit hook is a good idea. So is running the lint
tasks through some filewatcher like `grunt watch`. Neither is mandatory if
you&#8217;re using an editor with built in linting (e.g. Vim with Syntastic or
Sublime/Atom/Brackets with the right plugins) and you&#8217;re good about
clearing the errors/warnings before you save and commit.

I also run the linter during the build phase on deploy and fail builds on poor
code.

## Don&#8217;t run sites off your system

Welcome to the new world. I use vagrant for everything now, and that&#8217;s
considered old-school (because it&#8217;s slow and memory intensive). The new
school way is to run dev servers (even local ones) off of docker. Docker makes
creating new servers as cheap as making git branches. On my Linux box I actually
plan on running docker with [dokku](https://github.com/progrium/dokku) through
a VirtualBox anyway, just so I can limit memory and CPU usage more closely.

Again, this is a way to ensure my dev environment mirrors the production server
as closely as possible. It also keeps my system lean &#8212; I can shut down the
VM when I&#8217;m not doing dev work and I&#8217;ll reclaim all the memory in
one command: `vagrant suspend`. This beats having to stop the nginx, apache,
php-fpm, unicorn, etc. processes one-by-one (or writing a shell script to do
it). Finally, committing a Vagrantfile or dockerfile with my repo means any
other developer can get a working version of the project up and running easily.

## Create a developer bootstrap script

It&#8217;s simple, it should get a developer up-and-running. Here&#8217;s an
example:

```bash
composer install  # gets framework/plugins/etc.
bundle install    # gets sass/compass
npm install       # gets grunt and plugins, jshint, etc.
vagrant up
```

The `vagrant up` command runs the provisioner (chef, puppet, or docker) and
triggers a build (run your grunt/gulp/npm/etc. tasks). There&#8217;s tools to
get a provisioner setup and repos examples on GitHub so you don&#8217;t really
have to learn those devops DSLs. I prefer Chef for its structure, though.

Check out [PuPHPet](https://puphpet.com/) or [rove.io](http://www.rove.io/) for
custom setups, or search GitHub for stacks (even in ansible or salt if
that&#8217;s your thing).

## Branch and test the branches

With my site running through a VM or docker I can easily stage branches locally.
A separate shallow git clone can be used if I wanted two instances running side
by side. I just change the VM&#8217;s port for the branch clone.

I run a local DNS to map my local dev sites, so that&#8217;s one challenging
thing to manage. In order to remedy that I will eventually set up dokku or
a PaaS-like platform such as
[LayerVault&#8217;s Divergence](http://cosmos.layervault.com/divergence.html).
These would allow me to reach my branches at dev subdomains like
`newfeature.mysite.dev`.

## Directory structure

The directory structure I typically use now is something like the below for
a WordPress site. Note that __anything that can be retrieved or generated is
typically not kept in version control__ (e.g. sqldumps, bower components,
node_modules, compiled css, composer packages, etc.).

This is not a rule &#8212; some servers don&#8217;t allow you to run binaries so
your options are either commit the dependencies or upload them from a separate
server as part of the deploy script. It&#8217;s sometimes advisable to do the
latter if you don&#8217;t want to be dependent on a dependency archive
(packagist/npm/rubygems might be down and you still need to be able to build
a mission critical app).

### Example for a WordPress site

This is what I use for single-server WordPress sites. For multi-server, or when
other kinds of scaling are involved, I&#8217;d break it up even more.

```markdown
- .git/
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
```

