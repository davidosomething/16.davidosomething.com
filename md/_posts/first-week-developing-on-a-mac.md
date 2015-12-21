---
title: "First week developing on a Mac"
subheader: Anecdotal writing about my experience switching from Windows XP to OSX
datePublished: 2011-06-20T19:59:45+00:00
slug: first-week-developing-on-a-mac
tags:
  - osx
  - development
---
The following is a whining session about developing on OSX. It’s not all bad.

I had been using an old (2004) DELL machine at work with Windows XP. Needless to
say, the machine was pagefaulting and had a bunch of problems with its RAM. So
they finally got me a new computer to work on — a 24″ iMac with an i3 processor.
Not exactly a beast, but it’s a big upgrade.

I was using Notepad++ on my PC and I am ridiculously fast on it. Maybe it’s
a sad thing, but I’ve never seen anyone move lines and refactor and reorganize
code at the speed I can on a PC. That speed, along with file management in
Explorer and on the commandline, were the two things I used to benchmark my
effectiveness on a PC.

## Finder sucks.

Immediately, the crappiest part of OSX is the Finder. Granted, it’s pretty, but
you can’t do simple things like cut files for moving without some 3rd party
software or AppleScripting. At this point, I have most of the Finder keyboard
shortcuts down (window management, opening programs, creating folders) and can
do everything without a mouse.

## TextMate is nice, but MacVim is free.

Next point — all the good software requires a license. I hear Mac developers all
love using TextMate or Coda. I used the trials for each of those up, and
TextMate is the winner in that category. Coda is like many programs in one, but
not robust enough in any single aspect that I would use it. SublimeEdit, which
I experimented on PC for a bit is similar to TextMate, but still requires too
much work to get it going. Smultron and TextWrangler are just okay but they lack
features like transposing lines of text and column editing. I decided to learn
VIM instead (abandoning my emacs roots since aquamacs was hideous) and I’ve
gotten pretty fast at it. IMO on a Mac — VIM is still the way to go in terms of
non-IDE editors. If I can get a TextMate license I might go that route, but it’s
a good idea to learn VIM too since I’m in terminals often and emacs isn’t on
every server. I’ll be looking forward to the development of Bespin and Kod for
the future.

## I want Transmit.

FTP on a mac is a nightmare. This is in part due to the Finder design. I had
been using FileZilla on Windows, and it is available on OSX as well, but there
are quirks here and there (like a missing bookmarks dropdown). Transmit was
lovely, especially the bookmarks screen. I would use that as well if I can
convince the company to get a license. I went through Interarchy, Cyberduck (so
slow), FileZilla OSX, Fetch, Forklift, and even Finder’s native FTP to decide on
Transmit. With the trial expired, I’ve effectively forsaken FTP clients and am
using ANT to do all my uploading (which won’t last long since it’s a waste of
time to write a build script to up/download some one-off projects). Cyberduck,
for its ability to name bookmarks (which Finder cannot) and property as a native
  OSX app (which Filezilla is not), is my emergency client.

## Made for IDEs?

Perhaps I will try the all-IDE route for my next project — Eclipse, Dreamweaver,
Aptana, Coda seem to have a lot of features build in like SVN and FTP. I’ve used
them before, but that was in the 2GB of RAM/2Ghz CPU days, when it was a pain to
load or keep the RAM-hogging IDEs open.

## Remote computing on a Mac?

OSX VNC clients all suck (I’m using the built-in CMD-K one, ChickenoftheVNC is
outdated and slow, and Jollysfast doesn’t render everything correctly). Maybe
I can get an NX server going instead. The Remote Desktop client is alright.

## E-mail is nice.

I’m using Entourage as an Outlook replacement. It lacks the ability to traverse
through Active Directory groups (displaying users and recursing). I’m sure
Outlook 2011 can do this, so this is only a budget limitation. Sparrow and
mail.app look nice, but I actually like the web client for gmail.

## Interactive version control is pretty but not functional.

I miss the TortoiseGit shell extensions. I have a license for Versions
(Cornerstone is pretty much the same, after using the trial) and it’s just not
as easy as right clicking to commit. I think there’s a shell extension for SVN
out there but not for Hg and git. I guess it’s time I switched everything over
to git and commandline it anyway. I’m not even going to try Tower for git since
it’s probably like Versions. If it ain’t integrated with Finder, it ain’t worth
it.

## It’s a UNIX system. I know this.

What I’ve actually liked so far is that OSX has its own terminal and is POSIX
compliant. Its UNIXness is great, and with DTerm and iTerm 2 (both free
programs) it’s easy to do commandline things (i.e., version control or “touch
file.txt” since there’s no context-menu to create a blank file). The AppStore is
cool, but I hear Win8 will get one, too. I’m a fan of MacPorts (haven’t tried
Homebrew because I already have things going in /usr/local/).

## Beachball of doom, unhappy mac face, grey screen of death, shit happens!

Finally, programs still crash ALL THE TIME. I have to force quit things every
now and then, too. It’s the software’s fault, of course, but anyone who says
Macs don’t crash is probably just browsing the internet all day or crunching
numbers.

