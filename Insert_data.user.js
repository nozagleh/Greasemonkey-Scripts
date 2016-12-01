// ==UserScript==
// @name        Insert data
// @namespace   http://mediaw.tk:82/
// @include     http://mediaw.tk:82/*&action=edit    
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(function(){
  //call load event listener for waiting after the page has loaded fully, prevents greasemonkey to run to fast
  window.addEventListener('load', function() {
    text = "";
     //use Ajax to call on a PHP script for getting the content text for a new page in the Wiki
     $.ajax({
     url: "http://mediaw.tk:82/ContextFreeGrammar.php",
     }).done(function(data){
       //insert the data fetched into the main edit textbox
      document.getElementById("wpTextbox1").value = data;
       text = data;
     }); 
    
    //set a counter with the greasemonkey value of "nrofpages" to see how many pages have been created
    counter = GM_getValue("nrofpages");

    //set a timeout so greasemonkey does not run all of this too quickly, currently timeout is set to be 250ms
    setTimeout(function(){
      //check if the nr of pages is equal or more than n, if so then redirect to an escape page and reset the counter value
      if(counter >= 10){
      GM_setValue("nrofpages", 0);
      window.location.href = "http://mediaw.tk:82/index.php/User:Sventheman";
    }else{
      
      //check if the content of the main textbox is empty, if so then fill it with the previously fetched text
      if(document.getElementById("wpTextbox1").value == ""){
        document.getElementById("wpTextbox1").value = text;
        
        //else we add counter + 1 and click the save button for the Wiki article being created
        GM_setValue("nrofpages", counter + 1);
        
        //wait for 240ms before clicking the save button, giving the script some time to insert the text
        setTimeout(function(){
          //click the save button
          document.getElementById("wpSave").click();
        },250);
        
      }else{
        //else we add counter + 1 and click the save button for the Wiki article being created
        GM_setValue("nrofpages", counter + 1);
        
        //if textbox is not empty then go ahead and click the save button
        document.getElementById("wpSave").click();
      }
    }
      
    },250);
}, false);
  
});