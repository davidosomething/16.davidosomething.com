---
title: "Building a Rating System in ColdFusion and SQL Server"
datePublished: 2010-02-22T19:12:45+00:00
tags:
  - coldfusion
  - sql
slug: building-a-rating-system-in-coldfusion-and-sql-server
---


<p>This is a <em>very</em> simple tutorial on how to create a rating system (for rating anything) in Adobe ColdFusion. For this example, we will be creating a game arcade, consisting of a games table and a ratings table.</p>
<h4>Requirements:</h4>
<ul>
<li>Webserver(s) running ColdFusion and SQL Server.</li>
<li>ColdFusion datasource <a href="http://www.peachpit.com/articles/article.aspx?p=29452">already set up</a> (plenty of tutorials for this, too).</li>
</ul>
<h4>Objectives:</h4>
<ul>
<li>Create database tables.</li>
<li>Create rating queries.</li>
</ul>
<h3>Information Architecture</h3>
<p>First we need to create tables in the database. Here is the database structure we will be following:</p>
<div class="image"><a href="http://davidosomething.com/content/uploads/cfgames_db.png"><img src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACwAAAAAAQABAEACAkQBADs=" data-lazy-type="image" data-lazy-src="http://davidosomething.com/content/uploads/cfgames_db.png" alt="" title="Games and games ratings database tables" class="lazy lazy-hidden aligncenter size-thumbnail wp-image-157" /><noscript><img src="http://davidosomething.com/content/uploads/cfgames_db.png" alt="" title="Games and games ratings database tables" class="aligncenter size-thumbnail wp-image-157" /></noscript></a></div>
<p>Not that it matters, but this is an identifying relationship, meaning that the games_ratings table is meaningless without the games table. Also, we have a one game to many ratings relationship.</p>
<p><span id="more-113"></span></p>
<h4>SQL for the games table:</h4>
<pre class="brush: sql">
CREATE TABLE [dbo].[games] (
	[id] [int] IDENTITY (1, 1) NOT NULL ,
	[name] [varchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL ,
	[url] [varchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL ,
	[rating] [tinyint] NULL ,
	[weight] [int] NULL 
) ON [PRIMARY]
GO
</pre>
<p>This is pretty straightforward. The <samp>weight</samp> is for ordering the entries, i.e., manually sorting the games. Rating is an integer from 1-5.</p>
<h4>SQL for the games_ratings table:</h4>
<pre class="brush: sql">
CREATE TABLE [dbo].[games_ratings] (
	[game_id] [int] NOT NULL ,
	[rating] [tinyint] NOT NULL 
) ON [PRIMARY]
GO
</pre>
<p>The <samp>game_id</samp> is a foreign key to the <samp>id</samp> column in the <samp>games</samp> table.</p>
<h4>Add some sample games:</h4>
<p>We won&#8217;t be creating a custom CMS to enter games in this exercise, so let&#8217;s just insert them via SQL:</p>
<pre class="brush: sql">
INSERT INTO [games] ([name], [url]) VALUES('Super Happy Fun Game', '/shfg')
INSERT INTO [games] ([name], [url]) VALUES('Awesome Adventure Omega', '/aao')
GO
</pre>
<p>The IDs will be automatically generated (1 for Super Happy Fun Game and 2 for Awesome Adventure Omega), and we aren&#8217;t using rating or weight.</p>
<h3>A Test UI</h3>
<p>Now that we have the database architecture in place, we need a way to add entries. First, let&#8217;s create an HTML form to add entries for debugging:</p>
<pre class="brush: xml">
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
&lt;html>&lt;head>&lt;title>Add Game Rating&lt;/title>&lt;/head>&lt;body>
&lt;form action="gamesRate.cfm" method="post">
&lt;fieldset>
&lt;table>
&lt;tr>&lt;td>ID:&lt;/td>&lt;td>&lt;input type="text" size="2" name="id" id="id">&lt;/td>&lt;/tr>
&lt;tr>&lt;td>Rating:&lt;/td>&lt;td>&lt;input type="text" size="1" name="rating" id="rating">&lt;/td>&lt;/tr>
&lt;/table>
&lt;input type="submit" />
&lt;/p>
&lt;/fieldset>
&lt;/form>
&lt;/body>
&lt;/html>
</pre>
<p>I&#8217;ve named this file <samp>gamesRate.cfm</samp>. The form posts to itself, as you can see on line 4. There&#8217;s a field for the game ID and a field for the rating. If you check out this file on your server, you should see the form. You can submit values to it, but it won&#8217;t do anything yet.<br />
For convenience, lets add a table that displays the game names and IDs underneath the form (and before the <code>&lt;/body></code> tag):</p>
<pre class="brush: xml">
&lt;cfquery name="getGames" datasource="#MYDATASOURCE#">
	SELECT 		id, name
	FROM 		games
	ORDER BY 	id DESC
&lt;/cfquery>
&lt;table cellpadding="8" cellspacing="0">
&lt;thead>&lt;tr>
&lt;th>Game ID&lt;/th>
&lt;th>Game Title&lt;/th>
&lt;/tr>&lt;/thead>
&lt;tbody>
&lt;cfoutput query="getGames">&lt;tr>
&lt;td>#getGames.id#&lt;/td>
&lt;td>&lt;a href="#getGames.link_url#">#getGames.name#&lt;/a>&lt;/td>
&lt;/tr>&lt;/cfoutput>
&lt;/tbody>
&lt;/table>
</pre>
<p>Here is our first instance of a ColdFusion Query. Replace <samp>MYDATASOURCE</samp> with the correct value for your ColdFusion datasource. If you visit gamesRate.cfm now you should see the form and a table with IDs and game names. The values should be the ones we <code>INSERT</code>ed earlier.</p>
<p>Next, we want to process the form in the event it is submitted. At the beginning of the gamesRate.cfm file, we are going to add a <code>cfif</code> statement that checks for form submissions. We&#8217;ll do some very basic sanitization checks, and finally insert the rating if the values are in the correct format. Here&#8217;s the code:</p>
<pre class="brush: xml">
&lt;!--- Check form submit --->
&lt;cfif IsDefined("form.id")>
	&lt;cfif NOT IsDefined("form.rating")>
		&lt;cfset variables.error = 'No input passed.'>
	&lt;/cfif>

	&lt;!--- Sanity checks --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;cfif NOT IsNumeric(form.id)>
			&lt;cfset variables.error = 'Invalid game ID value.'>
		&lt;/cfif>
		&lt;cfif NOT IsNumeric(form.rating) OR form.rating GT 5>
			&lt;cfset variables.error = 'Invalid rating value #form.rating#.' >
		&lt;/cfif>
	&lt;/cfif>

	&lt;!--- ok to run queries now --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;!--- Check for game exists: --->
		&lt;cfquery name="gameExists" datasource="#datasource#" result="existsResult">
		 SELECT name
		 FROM #games_table#
		 WHERE id = #form.id#
		&lt;/cfquery>
		&lt;cfif existsResult.RecordCount eq 0 >
			&lt;cfset variables.error = 'Invalid game ID.'>
		&lt;/cfif>
	&lt;/cfif>

	&lt;!--- No errors, do insert: --->
	&lt;cfif NOT IsDefined("variables.error")>
		&lt;cfquery name="rateGame" datasource="#datasource#">
		INSERT INTO #game_ratings_table# (
			game_id,
			rating
		) VALUES (
			#form.id#,
			#form.rating#
		)
		&lt;/cfquery>
	&lt;/cfif>
&lt;/cfif>
</pre>
<p>So first we checked for a submit. Then, we checked that the fields were filled in and filled with numbers. We check to see if the game exists. Finally, if everything is ok, we insert the new rating. An error message will stored in <samp>variables.error</samp> if anything went wrong. If you try your form out now, and check your games_ratings table, you should see values inserted.</p>
<h3>Updating the ratings</h3>
<p>Rather than calculate the average ratings on every page request, we will be using a separate script to generate the averages. A DTS package or other query scheduler (ColdFusion has one!) can run your query on a set schedule. This can reduce your SQL server load. We&#8217;ll add the following code to updateGamesRatings.cfm and run it every half hour (or to a DTS package or other scheduled service):</p>
<pre class="brush: xml">
&lt;cfquery name="getRatings" datasource="MYDATASOURCE" result="getRatingsResult">
	SELECT 		AVG(gr.rating) AS new_rating, MAX(g.id) as id, MAX(g.name) as name
	FROM 		games_ratings gr
	LEFT OUTER JOIN games g ON gr.game_id = g.id
	GROUP BY	gr.game_id
&lt;/cfquery>

&lt;html>&lt;head>&lt;title>Generate Ratings&lt;/title>&lt;/head>&lt;body>
&lt;p>&lt;cfoutput>&lt;strong>#getRatingsResult.RecordCount#&lt;/strong> records updated.&lt;/cfoutput>&lt;/p>
&lt;cfoutput query="getRatings">
	&lt;p>The new average rating for &lt;strong>[#id#] #name#&lt;/strong> is &lt;strong>#new_rating#&lt;/strong>&lt;/p>
	&lt;cfquery name="updateRating" datasource="MYDATASOURCE">
		UPDATE 	 	games
		SET 		rating = &lt;cfqueryparam value="#new_rating#" CFSQLType = "CF_SQL_INTEGER">
		WHERE 		id = &lt;cfqueryparam value="#id#" CFSQLType = "CF_SQL_INTEGER">
	&lt;/cfquery>
&lt;/cfoutput>
&lt;/body>
&lt;/html>
</pre>
<p>When you visit this file, it outputs the result of a query. The query output is the game ID, name, and average rating. The ratings are calculated for a particular game ID in the first <code>cfquery</code> and inserted in the output loop.</p>
<h3>Conclusion</h3>
<p>From this code you should be able to deviate any number of displays for the ratings. You can integrate this code with any number of ratings systems, such as <a href="http://www.fyneworks.com/jquery/star-rating/">jQuery Star Rating Plugin</a>, Star Rating widget, or some HTML or Flash system. Simply set the <code>$.post()</code> or <code>action</code> URL to the gamesRate.cfm page you created. It could also benefit from a cookie (ok), user login (recommended), or other tracking system to prevent multiple ratings.</p>

