// ==UserScript==
// @name        Timing
// @namespace   http://mediaw.tk:82/MediaWiki/
// @include     http://mediaw.tk:82/index.php*
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==
$("body").append("<a href='" + window.location.href + "' id='reloader' style='display:block;'>Reload current</a>");
$("a").click(function(){
  GM_setValue("testStart",(new Date).getTime());
});
$("button").click(function(){
  GM_setValue("testStart",(new Date).getTime());
});
$("input").click(function(){
  GM_setValue("testStart",(new Date).getTime());
});
$("#n-randompage").click(function(){
  GM_setValue("testStart",(new Date).getTime());
  window.location.href = "/index.php/Special:Random";
  GM_setValue('isRandom',1);
});

window.onload = function () {
  var testStop = (new Date).getTime();
        var testStart = GM_getValue("testStart",0);
        var testTime = (testStop-testStart);
  //set a counter with the greasemonkey value of "nrofpages" to see how many pages have been created
    var counter = GM_getValue("nrofpages");
  //set a timeout so greasemonkey does not run all of this too quickly
    setTimeout(function(){
      //check if the nr of pages is equal or more than n, if so then redirect to an escape page and reset the counter value
      if(counter > 3 && window.location.href != "http://mediaw.tk:82/index.php/Main_Page"){
      window.location.href = "http://mediaw.tk:82/index.php/Main_Page";
    }else if(window.location.href == "http://mediaw.tk:82/index.php/Main_Page"){
      GM_setValue("nrofpages", 0);
      console.log(GM_getValue('timeStore',0));
      $("body").append("<textarea readonly>" + GM_getValue('timeStore',0) + "</textarea>");
      GM_setValue('timeStore', '' );
      GM_setValue('isRandom',0);
    }else{
        
        GM_setValue("testStart", 0);

        var phpTimer = (($("#phpTime").text()) * 1000);

        var oldValues = GM_getValue('timeStore',0);

        if(oldValues != 0){
          var newValue = ";" + testTime + "," + phpTimer.toFixed(0) + "," +  (testTime-phpTimer).toFixed(0);
          oldValues = oldValues += newValue;
        }else{
           var newValue = testTime + "," + phpTimer.toFixed(0) + "," +  (testTime-phpTimer).toFixed(0);
          oldValues = newValue;
        }
        
        //disregards the first time the script is run, because it seems to have a steady delay compared to every other run
        if(counter != 0){
          GM_setValue('timeStore', oldValues );
        }
        
        
        //else we add counter + 1 and click
        GM_setValue("nrofpages", counter + 1);
     
      //get from GreaseMonkey if the random button was clicked
      var isRandom = GM_getValue('isRandom',0);
      
      //check if the random button is active or not
      if(isRandom == 1){
        //redirect to a new random
        $("#n-randompage").click();
      }else{
        //create a click even for the reloader a html tag
        $("#reloader").click(function(){
          window.location.href = $('#reloader').attr('href');
        });
        //click the reloader button
        $("#reloader").click();
      }
      
      
    }
    },250);
}
