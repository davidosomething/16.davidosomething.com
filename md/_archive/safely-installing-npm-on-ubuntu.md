---
title: "Safely installing npm on Ubuntu"
datePublished: 2010-12-09T17:31:13+00:00
tags:
  - development
  - node.js
  - Ubuntu
slug: safely-installing-npm-on-ubuntu
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

