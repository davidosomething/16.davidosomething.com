---
title: "My Development Setup"
datePublished: 2010-11-29T20:35:48+00:00
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
slug: my-development-setup
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

