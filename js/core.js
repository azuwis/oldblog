// append inc/translate.html to doc
(function () {
    jQuery(document).ready(function() {
        jQuery.ajax({
            url: "/inc/translate.html",
            success: function (html) {
                jQuery('body').append(html);
            }
        });
    });
})();

// display tag cloud in side bar
(function () {
    jQuery(document).ready(function() {
        jQuery.ajax({
            url: "/inc/tagcloud.html",
            success: function (html) {
                jQuery('div#tag_cloud.widget').append(html);
            }
        });
    });
})();

// display feeds in side bar
(function () {
    jQuery(document).ready(function() {
        jQuery.ajax({
            url: "/inc/feeds.html",
            success: function (html) {
                jQuery('div#subscribe').append(html)
                .hover(function () {
                    jQuery(this).find('ul').css({
                        left: jQuery('#feedrss').cumulativeOffset(this)[0],
                        top: jQuery('#feedrss').cumulativeOffset(this)[1]
                    }).fadeIn(200)
                },
                function () {
                    jQuery(this).find('ul').fadeOut(400)
                });
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

var gcse = function(text){
    var url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?&rsz=large&cx=009024607379464921389:3-je6z-lleq&q=";
    url += encodeURIComponent(text);
    var main = jQuery("div#main");
    main.html("Searching on Google Custom Search...");
    jQuery.getJSON(url, function (data) {
        if (data.responseData.results && data.responseData.results.length > 0) {
            main.html("");
            jQuery.each(data.responseData.results, function(i,item){
                var title = item.titleNoFormatting.replace("| AzuWis Blog", "");
                main.append(jQuery('<div class="post">').html(
                    jQuery('<h1>').html(
                        jQuery('<a class="title">').attr('href', item.url).text(title)
                    )
                ).append(
                        jQuery('<div class="content">').html(item.content)
                ));
            });
        } else {
            main.append(" found nothing.");
        }
    });
};

jQuery(document).ready(function () {
    var searchbox = jQuery("form#cse-search-box");
    searchbox.submit(function(){
        gcse(searchbox.find("input#searchtxt").val());
        return false;
    });
});

// disqus api
jQuery(document).ready(function () {
    jQuery.jsonp({
        cache: true,
        url: "http://azuwis-comments.appspot.com/?limit=8&exclude=spam,killed",
        success: function(data){
            var comment = jQuery('<ul>');
            jQuery.each(data.message, function(i,item){
                var author = 'anonymous';
                var avatar = 'http://www.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=32';
                if(item.is_anonymous == false) {
                    author = item.author.username;
                    if(item.author.has_avatar == true) {
                        avatar = item.author.avatar.small;
                    }
                }
                comment.append(
                    jQuery('<li class="rc_item">').html(
                        jQuery('<div class="rc_avatar rc_left">').html(
                            jQuery('<img>').attr({
                                class: 'avatar avatar-32 photo',
                                width: '32',
                                height: '32',
                                src: avatar
                            })
                        )
                    ).append(
                        jQuery('<div class="rc_info">').html(
                            jQuery('<span class="author_name">').html(
                                jQuery('<a>').attr('href', item.thread.url + '#comment-' + item.id).text(author)
                            )
                        )
                    ).append(
                        jQuery('<div class="rc_excerpt">').text(item.message)
                    )
                );
            });
            jQuery('div#recent_comments.widget').append(comment);
        }
    });
});

// extract from base.js of inove theme
jQuery.fn.cumulativeOffset = function (e) {
    var t = 0,
    l = 0;
    do {
        t += e.offsetTop || 0;
        l += e.offsetLeft || 0;
        e = e.offsetParent
    } while (e);
    return[l, t]
};
jQuery(document).ready(function () {
    jQuery('a[rel*="external"]').click(function () {
        window.open(this.href);
        return false
    });
    jQuery('a[href!="#"][href!="#ViewPollResults"][href^="#"]').click(function () {
        jQuery.scrollTo(this.href.replace(/^.*#/g, '#'), 400, {
            offset: 0
        });
        return false
    })
});
