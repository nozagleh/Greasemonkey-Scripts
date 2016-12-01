// ==UserScript==
// @name        Redirect after edit
// @namespace   http://mediaw.tk:82/
// @include     http://mediaw.tk:82/index.php/*
// @exclude     http://mediaw.tk:82/index.php?title=*&action=edit
// @exclude     http://mediaw.tk:82/index.php/User:Sventheman
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
//Use Ajax to call a PHP script to get a title for the page that is to be created
$.ajax({
  url: 'http://mediaw.tk:82/ContextFreeGrammarTitle.php',
}).done(function (data) {
  //Insert the title into a URL and redirect the browser to the newly created URL, this URL should take the browser to an unexisting wiki site
  window.location.href ="http://mediaw.tk:82/index.php?title=" + data + "&action=edit";
});
