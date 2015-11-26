#!/usr/bin/env php
<?php

function prependFile($filename) {
  $text = file_get_contents('md/' . $filename);
  $new_text = "---\n" . $text;
  file_put_contents('md/' . $filename, $new_text);
}

$dir = new DirectoryIterator(dirname(__FILE__) . '/md');
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDot()) {
      continue;
    }
    prependFile($fileinfo->getFilename());
}

