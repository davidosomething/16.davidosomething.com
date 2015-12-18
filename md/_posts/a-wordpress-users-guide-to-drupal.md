---
title:      A WordPress User&#8217;s Guide to Drupal
subheader:  
datePublished:       2010-02-26T20:52:35+00:00
tags:
  - cms
  - drupal
  - mysql
  - php
  - wordpress
hero:       
slug:       a-wordpress-users-guide-to-drupal

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

