---
title:      Shuttle PC - new harddrive, Clonezilla &#038; Windows 7
subheader:  
date:       2010-12-03T23:12:44+00:00
tags:
  - Shuttle
  - windows
hero:       
slug:       shuttle-pc-new-harddrive-clonezilla-windows-7

---


<p><a href="http://davidosomething.com/content/uploads/hitachi.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/hitachi.jpg" alt="" title="Hitachi 1 TB 7200 RPM bare drive" width="300" height="225" class="lazy lazy-hidden alignright size-full wp-image-440" /><noscript><img src="http://davidosomething.com/content/uploads/hitachi.jpg" alt="" title="Hitachi 1 TB 7200 RPM bare drive" width="300" height="225" class="alignright size-full wp-image-440" /></noscript></a> I bought a <a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16822145304">new harddrive</a> on sale after Cyber Monday to replace the 250 GB harddrive in my Shuttle. It&#8217;s a bare drive, which means it doesn&#8217;t come with a SATA cable or box. Now I&#8217;ve got a total of 2 TB of storage with 1 TB already full.</p>
<p>I used my super-difficult-to-open Lacie case (pried it open with scissors) to house and connect the bare drive while I formatted it. This was a time when I really wished I had an eSata dock or enclosure.</p>
<p>I did a full format rather than quick; the difference is that a full format attempts to write empty bytes to each sector and does a <kbd>chkdsk /r</kbd> at the same time to fix any bad sectors. Knowing that UPS didn&#8217;t damage my drive, I felt safer using it as my new primary/boot drive. The full format took about 8 hours D:</p>
<p><a href="http://davidosomething.com/content/uploads/clonzilla.jpg"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/clonzilla.jpg" alt="" title="Clonezilla" width="300" height="300" class="lazy lazy-hidden alignleft size-thumbnail" /><noscript><img src="http://davidosomething.com/content/uploads/clonzilla.jpg" alt="" title="Clonezilla" width="300" height="300" class="alignleft size-thumbnail" /></noscript></a><a href="http://clonezilla.org/">Clonezilla</a> was used to image the old harddrive to the new one. I did a device to device image of the entire disk (as opposed to a single partition), which was faster but not necessarily safer than going from the old disk to image, image to new disk. The master boot record and Windows system partition were also preserved in this manner, so I didn&#8217;t need to boot from a Windows install/repair CD. I swapped the drives, moving the 250 GB into the Lacie case and the 1 TB into the Shuttle.</p>
<p>The system started perfectly, although some new Hitachi driver had to be installed upon booting. I extended the 250 GB partition to occupy the additional space using the Windows Disk Management tool (right click on My Computer -> Manage). After a final reboot, I&#8217;ve got an additional 750 GB to play with.</p>

