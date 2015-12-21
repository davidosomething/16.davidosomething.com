---
title: "Shuttle PC - new harddrive, Clonezilla &#038; Windows 7"
subheader: "Description of my Shuttle PC hardware build - part 3"
datePublished: 2010-12-03T23:12:44+00:00
tags:
  - Shuttle
  - windows
slug: shuttle-pc-new-harddrive-clonezilla-windows-7
---
I bought a [new harddrive](http://www.newegg.com/Product/Product.aspx?Item=N82E16822145304)
on sale after Cyber Monday to replace the 250 GB harddrive in my Shuttle. It’s
a bare drive, which means it doesn’t come with a SATA cable or box. Now I’ve got
a total of 2 TB of storage with 1 TB already full.

I used my super-difficult-to-open Lacie case (pried it open with scissors) to
house and connect the bare drive while I formatted it. This was a time when
I really wished I had an eSata dock or enclosure.

I did a full format rather than quick; the difference is that a full format
attempts to write empty bytes to each sector and does a <kbd>chkdsk /r</kbd> at
the same time to fix any bad sectors. Knowing that UPS didn’t damage my drive,
I felt safer using it as my new primary/boot drive. The full format took about
8 hours D:

[Clonezilla](http://clonezilla.org/) was used to image the old harddrive to the
new one. I did a device to device image of the entire disk (as opposed to
a single partition), which was faster but not necessarily safer than going from
the old disk to image, image to new disk. The master boot record and Windows
system partition were also preserved in this manner, so I didn’t need to boot
from a Windows install/repair CD. I swapped the drives, moving the 250 GB into
the Lacie case and the 1 TB into the Shuttle.

The system started perfectly, although some new Hitachi driver had to be
installed upon booting. I extended the 250 GB partition to occupy the additional
space using the Windows Disk Management tool (right click on My Computer ->
Manage). After a final reboot, I’ve got an additional 750 GB to play with.
