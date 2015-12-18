---
title:      LDAP / Active Directory auth in WordPress
subheader:  
datePublished:     2010-11-18T16:12:53+00:00
tags:
  - active directory
  - php
  - wordpress
hero:       
slug:       ldap-active-directory-auth-in-wordpress

---


<p>
 I am going to discuss LDAP / Active Directory authentication in PHP and WordPress using custom directory schemas. If you want to integrate your PHP application or WordPress login with LDAP but aren&#8217;t using a typical LDAP setup (with organizational units and such, or requiring the domain prefix: &#8216;domainusername&#8217;), then read on.
</p>
<h2>First, some technical terms:</h2>
<p>
 <em>LDAP</em> is a protocol for storing directory information, like a guideline for a phonebook.
</p>
<p>
 Microsoft&#8217;s implementation of the LDAP protocol is called <em>Active Directory</em>.
</p>
<h2>Existing plugins</h2>
<p>
 There are many plugins for WordPress that can utilize LDAP/AD for authentication. Here&#8217;s a few of them:
</p>
<ul>
<li><a href="http://wordpress.org/extend/plugins/wpldap/">WordPress LDAP Authentication</a></li>
<li><a href="http://wordpress.org/extend/plugins/simple-ldap-login/">Simple LDAP Login</a></li>
<li><a href="http://wordpress.org/extend/plugins/active-directory-integration/">Active Directory Integration</a></li>
<li><a href="http://wordpress.org/extend/plugins/wp-ldap-auth/">LDAP Authenticator</a></li>
<li><a href="http://wordpress.org/extend/plugins/wpdirauth/">wpDirAuth</a></li>
</ul>
<p>
 Most of these plugins are using the <a href="http://adldap.sourceforge.net/">adLDAP</a> class, which facilitates using the native PHP functions. The native PHP functions are very easy to use, though, which you can see in the <a href="http://wordpress.org/extend/plugins/wpdirauth/">wpDirAuth</a> plugin&#8217;s code.
</p>
<h2>Customizing wpDirAuth</h2>
<p>
 Authentication in LDAP is a two step process:
</p>
<ol>
<li>Connect to the LDAP server.</li>
<li>Bind to the directory using a username and password.</li>
</ol>
<p>
 The <code><a href="http://php.net/manual/en/function.ldap-bind.php">ldap_bind()</a></code> function returns a boolean, which succeeds if the username and password were found in the directory.
</p>
<p>
 Here&#8217;s an example syntax:
</p>
<pre>
&lt;?php
$ldap = array();
$ldap['server'] 	= 'ad.company.domain.com';
$ldap['base_dn']	= 'CN=Users,DC=company,DC=domain,DC=com';
$ldap['ad_domain'] 	= 'company';

$ldap['username']	= 'david';
$ldap['password']	= 'p4ssw0rd';

// connect to LDAP server
$ldap['connection'] = ldap_connect('ldap://' . $ldap['server']);

// set some preferences to specify Active Directory protocol
ldap_set_option($ldap['connection'], LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldap['connection'], LDAP_OPT_REFERRALS, 0);

// bind to LDAP directory
if ($ldap['connection']) {
	$ldap['directory'] = @ldap_bind(
	  $ldap['connection']
	, $ldap['ad_domain'] . '' . $ldap['username']
	, $ldap['password']);
}

$is_logged_in = $ldap['directory'];
?&gt;
</pre>
<p>
 Note that the line reading: <code>$ldap['ad_domain'] . '' . $ldap['username']</code> is what prefixes your username with the Active Directory domain. So if you typically logon to your network with <kbd>MicrosoftBillGates</kbd>, the domain is <var>Microsoft</var>. The <samp></samp> is the escaped backslash character. It is a special symbol, so don&#8217;t forget to escape it!
</p>
<p>
 Using this information, we can modify the wpDirAuth plugin to work with our Active Directory. Pare it down to only use Active Directory (you don&#8217;t need the OpenLDAP stuff around line 300), and look for any instances of <code>ldap_bind()</code>. Make sure the username is prefixed with the domain and escaped backslash. You don&#8217;t need the prebound / prebinding stuff.
</p>
<p>
 When you&#8217;re done with that, install and activate the plugin. Set the Directory Servers and Base DN in the Admin settings, the rest should be okay.
</p>
<h2>More information</h2>
<h3>Microsoft Active Directory Explorer</h3>
<p>
 If you&#8217;re unsure of the structure or Base DN for your users, you can download <a href="http://technet.microsoft.com/en-us/sysinternals/bb963907.aspx">Microsoft&#8217;s Active Directory Explorer</a> to login to your Active Directory and find yourself. The DN will be everything up until the term that is specific to you in the Path bar.
</p>
</p>
<h3>PHP test code</h3>
<p>
 If you want to see some sample PHP code for doing LDAP authentication and retrieving a user, I&#8217;ve uploaded an archive of my test page here.</p>

