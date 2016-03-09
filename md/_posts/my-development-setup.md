---
title: "My Development Setup"
subheader: "How I set up my dev environment and projects for 2010"
datePublished: 2010-11-29T20:35:48+00:00
tags:
  - apache
  - bitbucket
  - cygwin
  - development
  - LAMP
  - Mercurial
  - MongoDB
  - mysql
  - node
  - php
  - Ubuntu
  - virtualbox
slug: my-development-setup
---
Although I primarily develop on a Windows PC, I still consider Linux (also Unix
and OSX) the most powerful and practical environment for setting up web and
database servers, DNS, and version control repositories (as a master on DVCS).
A few of the benefits include:

- Using SSH to connect to a Linux commandline is faster compared to RDP’ing or
  VNC’ing into a Windows machine (also saves battery life on smartphones).
  Cygwin is a slow alternative.
- Package management for easy (and frequent) upgrades.
- More robustly integrated file permissions between the file system and web
  server (that is, IIS doesn’t use NTFS file permissions, but instead Windows
  account permissions).
- File paths and naming make more sense on \*nix than Windows. For instance,
  <samp>.htaccess</samp> is a system file, not an unnamed file with the
  htaccess extension.

## The setup

For my personal set up, I’ve currently got a VM running on my media center PC
with the following:

- OpenSSH on port 22
- Apache Server 2.2, listening on port 80 for incoming web traffic
- Apache Tomcat, listening on port 8080 for incoming web traffic
- vsFTPd on port 21
- awstats for Apache log file analysis
- PHP 5
- Railo for Adobe Coldfusion
- MySQL
- Git – to get node.js and other source
- Mercurial – for my own version control
- node.js as a daemon
- MongoDB (for Hummingbird and anything else)
- Hummingbird through node.js server, listening on port 8000 for **live**
  analytics… just to play with
- Icinga (Nagios fork) for service monitoring

It’s accessible via RDP using VirtualBox’s VRDP on port 4000\. That means I can
access it using a Remote Desktop client like the one that comes with Windows.
With that I can access an X-Windows environment (xinit, or desktops like Gnome,
KDE, XFCE) without having to do X11 forwarding to the local computer (such as
through XMing or Cygwin/X). For the record, RDP is faster than X11 forwarding
but doesn’t allow for seamless integration.

## Here are the steps I took to set up my VM

### Setting up the host computer

1. Allow Wake-on-LAN
    1. Enable BIOS setting
    1. Enable NIC card setting in Windows Device Manager
    1. Set up router port forwarding
1. Install TightVNC Server
    1. Run as service
    1. Forward ports on router: 5800 for java client, 5900 for vnc clients

### Setting up the Virtual Machine

1. Install Ubuntu Server Edition into new VirtualBox virtual machine
    1. Use default LAMP settings
    1. Install OpenSSH
1. Configure VRDP on Port 4000 instead of port 3389\. This way, RDPing into
    3389 allows you to access the host, 4000 the VM. Forward the ports to the
    computer with the router.
1. Create a shared drive to interact with the host computer, follow this:
    <http://ipggi.wordpress.com/2010/03/11/virtualbox-shared-folders-with-ubuntu-server-guest/>
1. Since the machine runs headless most of the time, the VM is opened using
    VBoxHeadlessTray: <http://www.toptensoftware.com/VBoxHeadlessTray/>
1. Install the following tools:
    - emacs (or whatever you want for text editing)
    - curl
    - wget
    - unzip
    - elinks (or whatever you want)

### Setting up LAMP

There’s so many tutorials on this, it’s ridiculously easy. Also, the default
config is not bad for development purposes.

### Setting up phpMyAdmin

You can basically just let the aptitude installer do everything. The instance
will be accessible at `http://localhost/phpmyadmin`

1. <kbd>sudo apt-get install phpmyadmin</kbd>

### Setting up awstats

Follow <http://maestric.com/doc/ubuntu/awstats>

### Setting up the file system and vsftpd

Regular install, then edit the config file in /etc/ and change some permissions:

1. Add default user to group www-data (apache default group): <kbd>sudo usermod
   -a -G www-data username</kbd>
1. chmod /var/www, allowing group read and write
1. Allow owner and group and write using local_umask = 002
1. Set the default FTP path to /var/www

### Setting up Mercurial

1. Follow this to get apt-add-repository <https://help.ubuntu.com/community/Repositories/CommandLine#Adding%20Launchpad%20PPA%20Repositories>
1. Then, follow this to add the mercurial repository and install it
   <http://icephoenix.us/linuxunix/installing-mercurial-1-5-or-1-6-on-ubuntu-lucid-lynx-10-04/>.
   TortoiseHg is not needed since we’re doing everything from the commandline.
1. I didn’t want to use bitbucket, so I installed hg cgi server (hg serve only
   allows one unsecured connection at a time) to create my own web based
   repository:
    1. Get the mercurial source tar.gz using wget or elinks
    1. Copy hgweb.cgi and all the folders from /templates/ to
       /var/hg (chmod -R g+w www-data:www-data)
    1. Edit hgweb.cgi, set:
       `config = "/var/hg/hgweb.config"`
    1. Put the repo paths/collections on the drive that is shared with the host
       (this way the files aren’t stored in the virtual hard disk–you can back
       them up easily). I mounted my share drive at <samp>/mnt/share</samp> and
       created the <var>repos</var> folder in there. Because the share is on
       a windows host, the permissions are always 777 chowned to root:root
    1. More help here:
       <http://mercurial.selenic.com/wiki/HgWebDirStepByStep#Directory_Structure>
1. I had some existing local repositories on my Windows development PC that
   I wanted centralized onto this computer so I cloned them:
    1. Use hg serve on the development PC (can be done through TortoiseHg!)
    1. From the VM, hg clone the existing repos (use the development PC’s IP as
       the source URL)
1. Currently the repositories are all unsecured, so to secure them:
    1. Use apache to password protect repository (no native security in hg, use basic or digest auth. SSH can be used, too, but then why bother with hgweb?)
    1. Under directory directive of main.conf in /etc/apache/hg/

        ```apache
        <Location /hg>
          AuthType Basic
          AuthName "Mercurial repositories"
          AuthUserFile /var/htpasswd/hg
          Require valid-user
        </Location>
        ```

    1. See more on Apache security here:
       <http://httpd.apache.org/docs/2.0/howto/auth.html>
    1. Allow push using http by following the troubleshooting instructions here:
       <http://mercurial.selenic.com/wiki/PublishingRepositories#Troubleshooting>

### Setting up Railo for ColdFusion

The only thing to note here is that Ubuntu no longer uses
<var>sun-java6-jdk</var>. Instead use <var>openjdk-6-jdk</var> or
<var>default-jdk</var> (same thing).

### Notes on setting up MongoDB

1. <kbd>sudo apt-get install mongodb-stable</kbd> (not mongodb, they’re
   different).
1. Set up for PHP/Apache using php’s PECL (need php-dev for phpize and php-pear
   for pecl)
1. If mongod won’t start, make sure the default dbpath isn’t locked.

### Setting up node.js

1. Set up a la [http://www.codediesel.com/linux/installing-node-js-on-ubuntu-10-04/](http://www.codediesel.com/linux/installing-node-js-on-ubuntu-10-04/)
1. After cloning the git repo, check out a stable tag:
    - To list tags: <kbd>git tag -l</kbd>
    - To checkout a tag: <kbd>git checkout v0.2.4</kbd>
1. Node.js can be set up to run as a daemon following this: [http://howtonode.org/deploying-node-upstart-monit](http://howtonode.org/deploying-node-upstart-monit)
1. See the related post on how to install npm safely (link at bottom).

### Hummingbird

1. Requires STABLE version of node.js
1. Install via
   [https://github.com/mnutt/hummingbird/blob/master/README.md](https://github.com/mnutt/hummingbird/blob/master/README.md)
   – the instructions on the Hummingbird site website are outdated.

### Icinga

1. <kbd>sudo apt-get install icinga</kbd>
1. Use NO CONFIG for postfix when it comes to it. You’ll have to set this up
   later if you want e-mail notifications.
1. The instance will be available at `http://localhost/icinga` – username is
   icingaadmin

### Final router configuration

1. Bridging network connections gives the VM its own network IP. This changes
   the host’s network IP to a new IP so any previous port forwarding or virtual
   servers will have to point to the new IP.
    1. Select host and VirtualBox connection
    1. Bridge connections
1. Router: Port forwarding
    1. Finding your IP addresses:
        1. From the host machine, go to whatismyip.com for the router / external IP.
        1. From the host machine, run cmd > ipconfig for the bridged network IP.
        1. From the VM, type ifconfig for the VM’s network IP.
    1. Final port forwarding configuration:
        - 21 to VM for FTP
        - 22 to VM for SSH
        - 80 to VM for HTTP
        - 443 to VM for HTTPS
        - 3389 to Host PC for RDP
        - 4000 to VM for RDP
        - 5800 to Host PC for VNC
        - 5900 to Host PC for VNC
        - 8000-8888 to VM for node.js, Hummingbird, Tomcat and Railo
    1. DynDNS setup should be done via router, otherwise forward all to Host
       machine and use DynDNS updater software on host machine, have host
       machine forward to VM.

From this point on I was able to access my VM and all of the forwarded ports
using the DynDNS address. It’s really convenient to be able to VNC onto the host
machine if something needs changing, SSH into the VM to do updates or set up
virtual hosts, and do an Hg push to this address as a master repository. Getting
all the puzzle pieces working together and having a good setup has really
improved my workflow.

