---
title: "Drupal 6 - Hiding Drupal Form Labels"
datePublished: 2010-02-16T14:46:10+00:00
tags:
  - cms
  - drupal
  - php
slug: drupal-6-hiding-drupal-form-labels
---
<p><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/howtogetridofthese.png" alt="" title="How to get rid of the form labels" width="350" height="125" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-102" /><noscript><img src="http://davidosomething.com/content/uploads/howtogetridofthese.png" alt="" title="How to get rid of the form labels" width="350" height="125" class="aligncenter size-thumbnail wp-image-102" /></noscript><br />
One of the nuisances of the form output generated by Drupal is that you can&#8217;t output <em>just</em> the form field. The field is always accompanied by a <code>&lt;label&gt;</code> (called the <code>#title</code> in Drupal) and optionally the star denoting field requirement. There is no easy way to remove this field&mdash; you need to do it programmatically.</p>
<h3>Unset == Upset</h3>
<p>One way to remove the label is to unset the title element for the field in question:</p>
<pre class="brush: php">
unset($form['ELEMENT_NAME']['#title']);
</pre>
<p>This would be done in your theme&#8217;s (or module&#8217;s) <code>hook_form_alter()</code>. The downfall to this method is that it will most certainly yield unpleasant results when the theme engine is trying to render the form. The best example of this is the use of the <code>#title</code> element in form validation. If the field does not validate (e.g., not filled in when required or invalid format), then the theme engine outputs <samp><strong>#title</strong> is required</samp> or whatever the case may be. With the <code>#title</code> missing, only the &#8220;is required&#8221; is shown.<br />
<span id="more-101"></span></p>
<h3>A Better Way</h3>
<p>You can unobtrusively extend FormAPI, creating a new property to switch labels on and off. The first step to this is to override <code>theme_form_element()</code>. You can add this code to your theme&#8217;s template.php file. Most of the following code is from the core file form.inc except lines 16-26.</p>
<pre class="brush: php">
/**
 * Overriding drupal form.inc
 * Return a themed form element.
 */
function MYTHEME_form_element($element, $value) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();

  $output = '&lt;div class="form-item"';
  if (!empty($element['#id'])) {
    $output .= ' id="'. $element['#id'] .'-wrapper"';
  }
  $output .= ">n";
  $required = !empty($element['#required']) ? '&lt;span class="form-required" title="'. $t('This field is required.') .'">*&lt;/span>' : '';

  if (!empty($element['#title']) &#038;&#038; !$element['#hidetitle']) {
    $title = $element['#title'];
    if (!empty($element['#id'])) {
      $output .= ' &lt;label for="'. $element['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."&lt;/label>n";
    }
    else {
      $output .= ' &lt;label>'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."&lt;/label>n";
    }
  }
  $output .= " $valuen";
  if (!empty($element['#description']) &#038;&#038; !$element['#hidedesc']) {
    $output .= ' &lt;div class="description">'. $element['#description'] ."&lt;/div>n";
  }
  $output .= "&lt;/div>n";
  return $output;
}
</pre>
<p>On line 16 we are checking for a new condition, the boolean value of <samp>$element[&#8216;#hidetitle&#8217;]</samp>. If the value is true, the if block is skipped, so the label is not displayed. We do a similar thing on line 26, this time with <samp>$element[&#8216;#hidedesc&#8217;]</samp> to hide the description. These two conditions are the only differences from the vanilla form.inc.</p>
<p>Now that the boolean checks are in place for our new elements, we only have to add these new properties to our form elements. If you&#8217;re building a form using FormAPI, do something like this (example is an e-mail textfield):</p>
<pre class="brush: php">
$form['myfieldset']['email'] = array(
  '#type' => 'textfield',
  '#title' => t('E-mail Addresss'),
  '#default_value' => 'email',
  '#description' => t("Your e-mail address."),
  '#maxlength'=> 250,
  '#size'		=> 25,
  '#required' => TRUE,
  '#hidetitle' => TRUE,
  '#hidedesc' => TRUE,
  );
</pre>
<p>The new properties are on lines 9 and 10. When you output this field using <samp>&lt;?php print drupal_render($form[&#8216;myfieldset&#8217;][&#8217;email&#8217;]); ?&gt;</samp>, the label will not be displayed. For a textfield the description is never displayed, so <samp>#hidedesc</samp> really only applies to fieldsets.</p>
<p>If you built your form using the Webform module, or you&#8217;re using someone else&#8217;s form, you&#8217;ll have to perform a <code>hook_form_alter()</code>. I made a webform_hidetitles module for one project that does only this. You would add the new properties like so:</p>
<pre class="brush: php">
if($form_id == 'webform_form_id') {
  $form['submitted']['email']['#hidetitle'] = true;
}
</pre>
<p>Replace form_id on line 1 with your own form id (you can find this with Devel), and the form element (<samp>email</samp> in this case) with your own form element.</p>
<h3>Conclusion</h3>
<p>Now that you know how this works, maybe you can go write and contribute a module that makes it easy to optionally display form labels and descriptions.</p>

