---
title:      First week developing on a Mac
subheader:  
date:       2011-06-20T19:59:45+00:00
hero:       
slug:       first-week-developing-on-a-mac
permalink:  http://davidosomething.com/blog/first-week-developing-on-a-mac/
---


<p>The following is a whining session about developing on OSX. It&#8217;s not all bad.</p>
<p>I had been using an old (2004) DELL machine at work with Windows XP. Needless to say, the machine was pagefaulting and had a bunch of problems with its RAM. So they finally got me a new computer to work on &#8212; a 24&#8243; iMac with an i3 processor. Not exactly a beast, but it&#8217;s a big upgrade.</p>
<p>I was using Notepad++ on my PC and I am ridiculously fast on it. Maybe it&#8217;s a sad thing, but I&#8217;ve never seen anyone move lines and refactor and reorganize code at the speed I can on a PC. That speed, along with file management in Explorer and on the commandline, were the two things I used to benchmark my effectiveness on a PC.</p>
<h2>Finder sucks.</h2>
<p>Immediately, the crappiest part of OSX is the Finder. Granted, it&#8217;s pretty, but you can&#8217;t do simple things like cut files for moving without some 3rd party software or AppleScripting. At this point, I have most of the Finder keyboard shortcuts down (window management, opening programs, creating folders) and can do everything without a mouse.</p>
<h2>TextMate is nice, but MacVim is free.</h2>
<p>Next point &#8212; all the good software requires a license. I hear Mac developers all love using TextMate or Coda. I used the trials for each of those up, and TextMate is the winner in that category. Coda is like many programs in one, but not robust enough in any single aspect that I would use it. SublimeEdit, which I experimented on PC for a bit is similar to TextMate, but still requires too much work to get it going. Smultron and TextWrangler are just okay but they lack features like transposing lines of text and column editing. I decided to learn VIM instead (abandoning my emacs roots since aquamacs was hideous) and I&#8217;ve gotten pretty fast at it. IMO on a Mac &#8212; VIM is still the way to go in terms of non-IDE editors. If I can get a TextMate license I might go that route, but it&#8217;s a good idea to learn VIM too since I&#8217;m in terminals often and emacs isn&#8217;t on every server. I&#8217;ll be looking forward to the development of Bespin and Kod for the future.</p>
<h2>I want Transmit.</h2>
<p>FTP on a mac is a nightmare. This is in part due to the Finder design. I had been using FileZilla on Windows, and it is available on OSX as well, but there are quirks here and there (like a missing bookmarks dropdown). Transmit was lovely, especially the bookmarks screen. I would use that as well if I can convince the company to get a license. I went through Interarchy, Cyberduck (so slow), FileZilla OSX, Fetch, Forklift, and even Finder&#8217;s native FTP to decide on Transmit. With the trial expired, I&#8217;ve effectively forsaken FTP clients and am using ANT to do all my uploading (which won&#8217;t last long since it&#8217;s a waste of time to write a build script to up/download some one-off projects). Cyberduck, for its ability to name bookmarks (which Finder cannot) and property as a native OSX app (which Filezilla is not), is my emergency client.</p>
<h2>Made for IDEs?</h2>
<p>Perhaps I will try the all-IDE route for my next project &#8212; Eclipse, Dreamweaver, Aptana, Coda seem to have a lot of features build in like SVN and FTP. I&#8217;ve used them before, but that was in the 2GB of RAM/2Ghz CPU days, when it was a pain to load or keep the RAM-hogging IDEs open.</p>
<h2>Remote computing on a Mac?</h2>
<p>OSX VNC clients all suck (I&#8217;m using the built-in CMD-K one, ChickenoftheVNC is outdated and slow, and Jollysfast doesn&#8217;t render everything correctly). Maybe I can get an NX server going instead. The Remote Desktop client is alright.</p>
<h2>E-mail is nice.</h2>
<p>I&#8217;m using Entourage as an Outlook replacement. It lacks the ability to traverse through Active Directory groups (displaying users and recursing). I&#8217;m sure Outlook 2011 can do this, so this is only a budget limitation. Sparrow and mail.app look nice, but I actually like the web client for gmail.</p>
<h2>Interactive version control is pretty but not functional.</h2>
<p>I miss the Tortoise* shell extensions. I have a license for Versions (Cornerstone is pretty much the same, after using the trial) and it&#8217;s just not as easy as right clicking to commit. I think there&#8217;s a shell extension for SVN out there but not for Hg and git. I guess it&#8217;s time I switched everything over to git and commandline it anyway. I&#8217;m not even going to try Tower for git since it&#8217;s probably like Versions. If it ain&#8217;t integrated with Finder, it ain&#8217;t worth it.</p>
<h2>It&#8217;s a UNIX system. I know this.</h2>
<p>What I&#8217;ve actually liked so far is that OSX has its own terminal and is POSIX compliant. Its UNIXness is great, and with DTerm and iTerm 2 (both free programs) it&#8217;s easy to do commandline things (i.e., version control or &#8220;touch file.txt&#8221; since there&#8217;s no context-menu to create a blank file). The AppStore is cool, but I hear Win8 will get one, too. I&#8217;m a fan of MacPorts (haven&#8217;t tried Homebrew because I already have things going in /usr/local/).</p>
<h2>Beachball of doom, unhappy mac face, grey screen of death, shit happens!</h2>
<p>Finally, programs still crash ALL THE TIME. I have to force quit things every now and then, too. It&#8217;s the software&#8217;s fault, of course, but anyone who says Macs don&#8217;t crash is probably just browsing the internet all day or crunching numbers.</p>
<h2>tl;dr</h2>
<p>This monitor is gorgeous<em><strong>!!</strong></em></p>

