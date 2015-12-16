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

---


<p><strong>Git</strong> doesn&#8217;t track who created branches. This makes it difficult to keep track of <em>your</em> branches.</p>
<p>To remedy this, I wrote a shell script that gets all the remote git branches and filters them out based on the last committer. It then lists the ones where you were the last committer.</p>
<p>You can find the script here:<br />
<a title="https://github.com/davidosomething/git-my" href="https://github.com/davidosomething/git-my" target="_blank">https://github.com/davidosomething/git-my</a></p>
<p>Here&#8217;s a screenshot of it in action:<br />
<img class="lazy lazy-hidden" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="https://raw.githubusercontent.com/davidosomething/git-my/docs/screenshot.png" alt="Screenshot of git-my" /><noscript><img src="https://raw.githubusercontent.com/davidosomething/git-my/docs/screenshot.png" alt="Screenshot of git-my" /></noscript></p>

