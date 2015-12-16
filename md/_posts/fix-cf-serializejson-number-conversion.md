---
title:      Fix CF SerializeJSON number conversion
subheader:  
date:       2011-08-30T12:29:56+00:00
hero:       
slug:       fix-cf-serializejson-number-conversion

---


<p>In ColdFusion if you use the SerializeJSON function on an object, the values for each key get converted into JSON values.<br />
This means that zip codes like &#8220;02115&#8221; (regardless if they are strings or integers) are converted to 2115.0 and large numbers like cellphone numbers&mdash;3132123232 are converted to scientific notation (3132123232E9 or something like that, too lazy to get it exactly right).<br />
This blog post: <a href="http://craigkaminsky.blogspot.com/2008/11/coldfusion-serializejson-gotcha.html"></a> from 2008 that addresses it and provides a solution, but the solution doesn&#8217;t work for the larger floating point numbers with the E. I&#8217;ve fixed (and simplified) the code below&mdash;it&#8217;s in cftag form now:</p>
<p><script src="https://gist.github.com/davidosomething/da5acad29f4434e59eef.js"></script></p>

