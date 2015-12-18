---
title: "Reconfigured WAMP on my laptop"
datePublished: "2011-02-03T21:50:48+00:00"
tags:
  - apache
  - coldfusion
  - Mercurial
  - mysql
  - php
slug: reconfigured-wamp-on-my-laptop
---


<p>I recently made the move from <a href="http://www.apachefriends.org/en/index.html">XAMPP</a> to installing each part of the WAMP stack individually on my laptop. I did it to get tighter control over where each service was installed, and also to properly version my settings files. My <var>httpd.conf</var> file now just has one line at the end of it that includes my <var>httpd-potatobook.conf</var> file. This file defines my Virtual Hosts, loads 3rd-party modules, and is version control in Mercurial.</p>
<p>I&#8217;ve got the latest <a href="http://php.net/manual/en/install.windows.apache2.php">PHP installed as FastCGI</a> instead of as an Apache module and pointed the default <var>php.ini</var> file to the same folder as <var>httpd-potatobook.conf</var> (also under version control). Finally, I&#8217;ve installed Adobe ColdFusion 9 Developer Edition. It was much easier to get up and running (the installer does EVERYTHING) with Apache than is Railo 3.2 now that Tomcat has replaced <a href="http://www.caucho.com/">Caucho Resin</a> as the application server. Tomcat is a beast.</p>
<p>Rather than use <a href="http://www.phpmyadmin.net/home_page/index.php">phpMyAdmin</a>, I&#8217;m trying out <a href="http://www.chive-project.com/">Chive</a> for MySQL administration. With the exception of zipped exports, it&#8217;s doing the job well. Maybe if the phpMyAdmin theme system was more backward compatible&mdash;or a really nice theme came out&mdash;I would switch back.</p>

