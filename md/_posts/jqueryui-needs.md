---
title:      JQueryUI needs&#8230;
subheader:  
date:       2010-04-17T15:49:37+00:00
tags:
  - apache
  - javascript
  - jquery
hero:       
slug:       jqueryui-needs

---


<p>One of my old projects an Apache Virtual Host configuration app (built to test the JQueryUI 1.8 release candidates), uses JQueryUI heavily. While building this app, I found a lot of UI elements that were very simple to create and should be part of JQueryUI were completely missing from the library.<br />
<a href="http://davidosomething.com/content/uploads/apachevhost.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/apachevhost-590x326.png" alt="" title="Apache VHost Configurator" width="590" height="326" class="lazy lazy-hidden aligncenter size-medium wp-image-308" /><noscript><img src="http://davidosomething.com/content/uploads/apachevhost-590x326.png" alt="" title="Apache VHost Configurator" width="590" height="326" class="aligncenter size-medium wp-image-308" /></noscript></a></p>
<h3>Collapsible DIV</h3>
<p>Among the missing components is a simple collapsible div for themeroller. The closest thing JQuery UI has is the Accordion class. The main jQuery library has the slideToggle class, which provides the functionality you&#8217;d need, but you have to pick and choose the classes to add manually. This can be demoed on my app by creating a VHost. Clicking on the VHost title will toggle its collapsed state. I chose to use the following classes for the H2 (header) preceding the DIV (content):</p>
<pre class="brush: xml">&lt;h2 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top">header&lt;/h2>
&lt;div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">content&lt;/div></pre>
<p>The jQuery for this is simply:</p>
<pre class="brush: js">$('h2').next().slideToggle();</pre>
<h3>Form Reset</h3>
<p>JQueryUI-themed checkboxes, radio buttons, and custom toggle buttons are pseudo-input elements. They carry a state based on a hidden input element, but the actual display of the element is a themed <code>&lt;label&gt;</code> tag. Because these checkboxes and radio buttons aren&#8217;t real form elements and don&#8217;t have an on/off state, they can&#8217;t be reset using the standard HTML form reset: <code>&lt;input type="reset" /&gt;</code> or a JavaScript reset that just removes the &#8220;checked&#8221; attribute.<br />
To handle form resets, I had to create a custom script, based on the reset code from the <a href="http://jquery.malsup.com/form/">jQuery Form Plugin</a>. My script is as follows:</p>
<pre class="brush: js">
$.fn.clearForm = function() {
	return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form') return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea') this.value = '';
		else if (type == 'checkbox' || type == 'radio') {
			$(this).next('label').removeClass('ui-state-active');
			this.checked = false;
		}
		else if (tag == 'select') this.selectedIndex = -1;
	});
};
</pre>
<p>As you can see, there is an extra line that removes the jQuery class &#8220;ui-state-active&#8221; from the label used to display the pseudo-form element.</p>

