---
title: "Drupal 6 - Creating an E-mail Subscription Block"
datePublished: 2010-02-10T12:17:39+00:00
tags:
  - cms
  - drupal
  - php
slug: drupal-creating-an-e-mail-subscription-block
---


<p>The Drupal manual does a good job telling you how to <a href="http://drupal.org/node/206753">create a plain old block module</a> but other tutorials on module development are a hundredfold more complicated. The goal of this article is to follow up on the Drupal developer&#8217;s guide by creating another only slightly more advanced block.</p>
<h4>Prerequisites</h4>
<p>You should:</p>
<ol>
<li>have a <a href="http://drupal.org/getting-started/install">Drupal installation</a> to work with.</li>
<li>know how to administer Drupal (e.g., <a href="http://drupal.org/getting-started/install-contrib">install and activate modules</a>, <a href="http://drupal.org/handbook/modules/block">add blocks</a>).</li>
<li>know how to <a href="http://drupal.org/node/206753">create a basic block</a>.</li>
</ol>
<h4>Learning Objectives</h4>
<p>You will learn:</p>
<ol>
<li>how to create a .install file to create a database table.</li>
<li>how to create a block with a form.</li>
<li>how to process a form in Drupal.</li>
<li>how to perform database transactions in a Drupal module.</li>
<li>how to theme a form.</li>
</ol>
<h3>The proposed block</h3>
<p>The proposed block consists of a form with a fieldset, a text-input field, and a submit button. On submission, the text input field is validated as an e-mail address. If it does not validate, a Drupal error message is returned. Otherwise, the e-mail address will be saved to a database, an e-mail will be sent to the address, and a &#8220;thank you&#8221; message will be displayed. We will call this a &#8220;Persistent E-mail Capture Block&#8221; and use &#8220;pecapture&#8221; as its machine name.</p>
<p>This is what we&#8217;re aiming for:</p>
<div class="aligncenter"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/drupal_pecapture_block.png" alt="" title="Drupal pecapture Block" width="278" height="212" class="lazy lazy-hidden aligncenter size-full wp-image-75" /><noscript><img src="http://davidosomething.com/content/uploads/drupal_pecapture_block.png" alt="" title="Drupal pecapture Block" width="278" height="212" class="aligncenter size-full wp-image-75" /></noscript></div>
<p><span id="more-77"></span></p>
<h3>The .info File</h3>
<p>You know what it is and how it works from the Drupal developer&#8217;s guide. Our .info file will contain the following:</p>
<pre class="brush: plain">
; $Id$  
name = Persistent E-mail Capture
description = Provides a block with a form to enroll in subscriptions.
version = "6.x-0.0.1"
core = 6.x
php = 5.x
package = Other
</pre>
<p>If you need a refresher on what anything does, see the <a href="http://drupal.org/node/171205">Drupal manual page on .info files</a>.</p>
<h3>The .install File</h3>
<p>As described earlier, we are using a database table to store e-mail addresses. Here is our very simple database model:</p>
<div class="aligncenter"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/drupal_pecapture_dbmodel.png" alt="" title="Drupal pecapture Database Model" width="232" height="102" class="lazy lazy-hidden aligncenter size-full wp-image-76" /><noscript><img src="http://davidosomething.com/content/uploads/drupal_pecapture_dbmodel.png" alt="" title="Drupal pecapture Database Model" width="232" height="102" class="aligncenter size-full wp-image-76" /></noscript></div>
<p>We will now transform this model into an .install file schema:</p>
<pre class="brush: php">
&lt;?php
// $Id$

/**
 * Implementation of hook_install().
 */ 
function pecapture_install() {
  drupal_install_schema('pecapture');
}

/**
 * Implementation of hook_uninstall().
 */
function pecapture_uninstall() {
  drupal_uninstall_schema('pecapture');
}

/**
 * Implementation of hook_schema().
 */
function pecapture_schema() {
  $schema = array();
  $schema['pecapture'] = array(
    'fields' =&gt; array(
      'capture_id' =&gt; array(
        'type' 		=&gt; 'serial',
        'unsigned' 	=&gt; TRUE,
        'not null'	=&gt; TRUE,
      ),
      'email'=&gt;array(
        'type'		=&gt; 'varchar',
        'length'	=&gt; '250',
        'not null'	=&gt; TRUE,
        'default'	=&gt; '',
      ),
    ),
    'indexes' =&gt; array('capture_id' =&gt; array('capture_id')),
    'primary_key' =&gt; array('capture_id'), 
  );	
  return $schema;
}
</pre>
<p>When you activate your module, Drupal executes the <code>hook_install()</code> function, <samp>pecapture_install()</samp> in this case. Likewise, in deactivation or removal, the <code>hook_uninstall()</code> function is executed&mdash; <samp>pecapture_uninstall()</samp> for us.<br />
Our hooks are pretty simple. Their one task is to install or uninstall the pecapture schema. The function <samp>pecapture_schema()</samp> returns an array of arrays, which Drupal uses to build a table. The structure of this array of arrays is pretty straightforward and mirrors our database model exactly.</p>
<h3>The .module File</h3>
<p>The .module file should have an opening php tag and a CVS tag as its first two<br />
lines:</p>
<pre class="brush: php">
&lt;?php
// $Id$
</pre>
<p>After that, we will add our own code. I&#8217;ll go over each function based on its dependency on other functions. The hooks are not necessarily the order Drupal executes them, but that doesn&#8217;t matter.</p>
<h4>General Functions</h4>
<p>First up are the standard hooks. These are all described in the Drupal developer&#8217;s guide, so I won&#8217;t reinvent the wheel here.</p>
<pre class="brush: php">
/**
 * Display help and module information
 * @param path which path of the site we're displaying help
 * @param arg array that holds the current path as would be returned from arg() function
 * @return help text for the path
 */
function pecapture_help($path, $arg) {
  $output = '';  //declare your output variable
  switch ($path) {
    case "admin/help#pecapture":
      $output = '&lt;p&gt;'.  t("Provides a block for the persistent e-mail capture form.") .'&lt;/p&gt;';
      break;
  }
  return $output;
} // function pecapture_help

/**
 * Implementation of hook_perm().
 */
function pecapture_perm() {
  return array('access pecapture content', 'administer pecapture');
}
</pre>
<h4>Our Functions</h4>
<p>Now for the good stuff: functions providing the unique functionality of our block. We will begin with the function that actually creates a block: <code>hook_block()</code>. In this case, our function is called <samp>pecapture_block()</samp>.</p>
<pre class="brush: php">
/**
 * Implementation of hook_block
 * @param string $op one of "list", "view", "save" and "configure"
 * @param integer $delta code to identify the block
 * @param array $edit only for "save" operation
 */
function pecapture_block($op = 'list', $delta = 0, $edit = array()) { 
  $block = array();
  if ($op == 'list') { // Generate listing of blocks from this module, for the admin/block page
    $block[0]['info'] = t('Persistent E-mail Capture Form Block');
  } 
  else if ($op == 'view') { // Generate our block content
    $block['subject'] = ''; //'Persistent E-mail Capture Form';
    $block['content'] = pecapture_displayform();
  }
  return $block;
} // function pecapture_block
</pre>
<p>You&#8217;ll recognize the list part from the Drupal guide. Our <samp>&#8216;view&#8217;</samp> operation is different, though. We aren&#8217;t giving it a subject, and we&#8217;re using a function to generate the contents.</p>
<p>Here is that function:</p>
<pre class="brush: php">
function pecapture_displayform() {
  return drupal_get_form('pecapture_blockform');
}
</pre>
<p>All this function does is return another function&#8217;s value! We use it to facilitate theming later on. The return value calls <code>drupal_get_form()</code>, which takes a function name as an argument.</p>
<p>The function name provided is <samp>pecapture_blockform()</samp>:</p>
<pre class="brush: php">
function pecapture_blockform(&#038;$form_state) {
  $form = array();
  $form['pecapture'] = array(
    '#type'			=&gt; 'fieldset',
    '#title'		=&gt; t('Don't Miss Out'),
    '#description'	=&gt; t('Sign up for National Train Day updates.'),
    '#collapsible' 	=&gt; FALSE,
    '#hidefieldsets' =&gt; TRUE,
  );
  $form['pecapture']['email'] = array(
    '#type' =&gt; 'textfield',
    '#title' =&gt; t('E-mail Addresss'),
    '#default_value' =&gt; 'email',
    '#description' =&gt; t("The e-mail address to which you will receive updates."),
    '#maxlength'=&gt; 250,
    '#size'		=&gt; 25,
    '#required' =&gt; TRUE,
  );
  $form['submit'] = array(
    '#type' =&gt; 'submit',
    '#value' =&gt; t('Keep me updated!'),
  );
  $form['#theme']     = 'pecapture_displayform';
  $form['#validate']  = array('pecapture_blockform_validate');
  return $form;
}
</pre>
<p>This function holds a Drupal form definition. Drupal has a special system for creating forms using an array of arrays. It works the same as creating a database table in Drupal. First we build a fieldset with a title (which equates to the <code>&lt;legend&gt;</code> tag and a description, which is simply the first paragraph in the fieldset. Then we create the e-mail field and submit button.</p>
<p>The line <code>$form['#theme']     = 'pecapture_displayform';</code> tells Drupal that when outputting this form, use <samp>&#8216;pecapture_displayform&#8217;</samp> as the argument for the <code>theme()</code> function. The <code>theme()</code> function currently has no clue what to do with <samp>&#8216;pecapture_displayform&#8217;</samp> so we have to give it a definition using <code>hook_theme()</code>:</p>
<pre class="brush: php">
/**
 * Implementation of hook_theme()
 */
function pecapture_theme() {
  $path = drupal_get_path('module', 'pecapture') . '/theme';
  return array(
    'pecapture_displayform' => array(
      'arguments' => array('form' => NULL),
      'template' => 'pecapture-displayform',
      'path' => $path,
    ),
  );
}
</pre>
<p>This tells Drupal that when <samp>theme(&#8216;pecapture_displayform&#8217;)</samp> is called, the file <samp>pecapture/theme/pecapture-displayform.tpl.php</samp> should be returned for output. We have to create that file:</p>
<pre class="brush: php">
&lt;div class="sidebar-email"&gt;

&lt;img src="&lt;?php print base_path().path_to_theme(); ?&gt;/images/headline_dontmissout.jpg" alt="Don't Miss Out" width="211" height="30" border="0" /&gt;
&lt;p&gt;&lt;?php print $form['pecapture']['#description']; ?&gt;&lt;/p&gt;
&lt;br /&gt;
	&lt;?php print drupal_render($form['pecapture']['email']); ?&gt;
	&lt;?php print drupal_render($form['submit']); ?&gt;
	&lt;div style="display: none;"&gt;
	&lt;?php
		unset($form['pecapture']);
		unset($form['submit']);
		print drupal_render($form);
	?&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>
<p>This creates a <code>&lt;div&gt;</code> for the block, displays a header image, prints the description, displays the e-mail field and submit button, and flushes the rest of the form that we don&#8217;t need. You can customize this to your liking. Save this in the <samp>theme</samp> subdirectory in your module&#8217;s directory.</p>
<p>Now that you know what happens with <code>$form['#theme']     = 'pecapture_displayform';</code> we can go back to the function <samp>pecapture_blockform()</samp>, and explain the line: <code>$form['#validate']  = array('pecapture_blockform_validate');</code></p>
<p>This line tells drupal to use the function <samp>pecapture_blockform_validate()</samp> to validate the form before it is submitted. Here is the code:</p>
<pre class="brush: php">
function pecapture_blockform_validate($form, &#038;$form_state) {
  $email = $form_state['values']['email'];
  if (strlen($email) &lt; 1) {
    form_set_error('email', t('Please provide your e-mail address.'));
  }
  else if (!eregi('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.([a-zA-Z]{2,4})$', $email)) {
    form_set_error('email', t('That is not a valid e-mail address.'));
  }
  else if ($email_user = pecapture_getUserByField('email',$email)) {
    if (isset($email_user)) {
      form_set_error('answers', t('Your e-mail address has already been subscribed.'));
    }
  }
}
</pre>
<p>This checks to see if the e-mail address field was blank, if it matches an e-mail regular expression, and if the e-mail address already exists in the database. We are using the function <samp>pecapture_getUserByField(&#8217;email&#8217;,$email)</samp> to find a user in the database, but we need to write that. Here it is:</p>
<pre class="brush: php">
function pecapture_getUserByField($field,$data){
  $q = 'SELECT capture_id FROM {pecapture} WHERE %s LIKE '%s' LIMIT 1';
  $q = db_fetch_array(db_query($q,array($field,$data)));
  if (isset($q['capture_id']))
    return true;
  else 
    return false;
}
</pre>
<p>This very simply selects the e-mail address from the database and returns true or false. This concludes our validation function.</p>
<p>The final function in our module is the <code>hook_submit()</code> function for the form:</p>
<pre class="brush: php">
function pecapture_blockform_submit($form, &#038;$form_state) {
  $values = $form_state['values'];
  $fields = array('email');
  $q = 'INSERT INTO {pecapture} ('.implode(',',$fields).') VALUES ('%s')';
  $insert = array();
  foreach ($fields as $f) {
	$insert[] = $values[$f];
  }
  db_query($q, $insert);
  $user = $insert;
  drupal_set_message('Thanks for subscribing!');
}
</pre>
<p>This just creates a query based on the form values and runs it, then queues a Drupal message.</p>
<h3>Conclusion</h3>
<p>This could have been accomplished with the modules <a href="http://drupal.org/project/webform">Webform</a> and <a href="http://drupal.org/project/webformblock">Webform Block</a> or <a href="http://drupal.org/project/nodeasblock">Node As Block</a> or <a href="http://drupal.org/node/248157">PHPTemplate to insert a node into a region</a>, but creating your own module in this case offers a level of theme output greater than what Webform allows without some intricate hooks (try and remove the form label!). You should now also have a better understanding of how to create a Drupal module, form, and hook into themes.</p>
<h3>Further Reading</h3>
<p>I recommend following these tutorials next, in order:</p>
<ol>
<li>Creating Our First Module using Drupal 6</li>
<li><a href="http://gazebo.commonplaces.com/2009/06/creating-simple-modules-and-filling-the-functionality-gap/">Creating &#8220;Simple&#8221; Drupal Modules, and Filling the Functionality Gap</a></li>
</ol>

