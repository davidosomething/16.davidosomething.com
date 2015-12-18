---
title:      BASH script to copy files from a git commit
subheader:
datePublished:       2011-08-22T12:29:38+00:00
tags:
  - bash script
  - copy
  - git
hero:
slug:       bash-script-to-copy-files-from-a-git-commit

---


<p>This is a small BASH script I wrote to create a folder of changed files for web deployment. This is useful for a small project that doesn&#8217;t need a complicated deployment system. It should live in a folder within the project. There should be folders called &#8220;deploy&#8221; and &#8220;filelists&#8221; in the folder as well. Of course, you can edit the script to change those requirements.</p>
<p>The script takes a single argument &#8212; a git hash or revision name (e.g., HEAD). It gets the git commit log for that commit and stores the logged filenames into a new file tagged with the date. That files list is then read and each folder mentioned in the list is created in a &#8220;deploy&#8221; folder. The corresponding file (assumed to be a directory level lower) is copied into the appropriate folder in the deploy folder.</p>
<h3>Usage:</h3>
<pre><kbd>./getfiles.sh HEAD</kbd></pre>
<h3>Script:</h3>
<pre><code>#!/bin/bash
if [ $# -ne 1 ]
then
  echo "Usage: `basename $0` {GIT REVISION SHA}"
  exit $E_BADARGS
fi

filelist="files-$(date +"%s").txt"

git show --pretty="format:" --name-only $1 &gt; $filelist

for file in $(&lt;$filelist); do
  mkdir -p "deploy/$(dirname $file)"
  cp "../$file" "deploy/$file"
done

mv $filelist filelists/

ls -GpR deploy

echo "DONE: deploy/ directory populated with files from commit $1"</code></pre>

