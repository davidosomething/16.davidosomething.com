---
title:          "git-my"
subheader:      "List the remote branches where you were the last committer"
datePublished:  2015-03-29T22:39:39+00:00
tags:
  - git
  - script
slug: git-my
---
Git doesn’t track who created branches. This makes it difficult to keep track of
your own branches when you have a lot of them checked out locally.

To remedy this, I wrote a shell script that gets all the remote git branches and
filters them out based on the last committer. It then lists the ones where you
were the last committer.

You can find the script here:  
[https://github.com/davidosomething/git-my](https://github.com/davidosomething/git-my)

Here’s a screenshot of it in action:  
![Screenshot of git-my](https://raw.githubusercontent.com/davidosomething/git-my/docs/screenshot.png)

