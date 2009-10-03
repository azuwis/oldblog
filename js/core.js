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

// base.js from inove
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2.h.6=3(e){i t=0,l=0;j{t+=e.k||0;l+=e.m||0;e=e.n}o(e);7[l,t]};2(p).q(3(){2(\'a[r*="s"]\').8(3(){u.v(4.5);7 9});2(\'#w\').x(3(){2(4).b(\'c\').y({z:2(\'#d\').6(4)[0],A:2(\'#d\').6(4)[1]}).B(C)},3(){2(4).b(\'c\').D(f)});2(\'a[5!="#"][5!="#E"][5^="#"]\').8(3(){2.F(4.5.G(/^.*#/g,\'#\'),f,{H:0});7 9})});',44,44,'||jQuery|function|this|href|cumulativeOffset|return|click|false||find|ul|feedrss||400||fn|var|do|offsetTop||offsetLeft|offsetParent|while|document|ready|rel|external||window|open|subscribe|hover|css|left|top|fadeIn|200|fadeOut|ViewPollResults|scrollTo|replace|offset'.split('|'),0,{}))
