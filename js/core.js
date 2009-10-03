// append inc/translate.html to doc
(function () {
    jQuery(document).ready(function() {
        jQuery.ajax({
            url: "/inc/translate.html",
            success: function (html) {
                jQuery('body > *:last').after(html);
            }
        });
    });
})();

// google cse search box
(function () {
    var searchbox = document.getElementById("searchbox");
    var searchtxt = document.getElementById("searchtxt");
    var searchbtn = document.getElementById("searchbtn");
    var tiptext = "Type text to search here...";
    if(searchtxt.value == "" || searchtxt.value == tiptext) {
        searchtxt.className += " searchtip";
        searchtxt.value = tiptext;
    }
    searchtxt.onfocus = function(e) {
        if(searchtxt.value == tiptext) {
            searchtxt.value = "";
            searchtxt.className = searchtxt.className.replace(" searchtip", "");
        }
    }
    searchtxt.onblur = function(e) {
        if(searchtxt.value == "") {
            searchtxt.className += " searchtip";
            searchtxt.value = tiptext;
        }
    }
    searchbtn.onclick = function(e) {
        if(searchtxt.value == "" || searchtxt.value == tiptext) {
            return false;
        }
    }
})();
