#!/usr/bin/env php
<?php

function renameFile($filename) {
  $text = file_get_contents($filename);
  $slug = getSlug($text);
  if ($slug) {
    var_dump($slug);
    rename($filename, $slug.'.md');
  }
}

function getSlug($text) {
  $pattern = '/slug:\s+(.*)/';
  preg_match($pattern, $text, $matches, PREG_OFFSET_CAPTURE);
  if (!$matches) {
    return null;
  }
  return $matches[1][0];
}

$dir = new DirectoryIterator(dirname(__FILE__));
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDot()) {
      continue;
    }
    if (strpos($fileinfo->getFilename(), 'xx') !== false) {
      renameFile($fileinfo->getFilename());
    }
}

