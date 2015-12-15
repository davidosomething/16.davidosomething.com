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

