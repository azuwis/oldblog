(function () {
    /* prettify */
    jQuery.fn.pretty = function () {
        var prettify = false;
        this.find("pre code").filter(function () {
            return (/^#!\//).test(jQuery(this).text());
        }).parent().each(function () {
            jQuery(this).addClass('prettyprint');
            prettify = true;
        });
        if (prettify) {
            if (typeof(prettyPrint) == "function") {
                prettyPrint();
            } else {
                jQuery.ajax({
                    dataType: "script",
                    cache: true,
                    url: "/lib/prettify/prettify.js",
                    success: function () {
                        prettyPrint();
                    }
                });
            }
        }
    };

    /* fancybox */
    jQuery.fn.fancyzoom = function () {
        var $clone = jQuery(this).clone();
        jQuery(this).parent().html(jQuery("<a>").attr({
            "class": "zoom",
            "title": $clone.attr("alt"),
            "href": $clone.attr("src")
        }).html($clone)).find("a.zoom").fancybox({
            "overlayOpacity": 0,
            "zoomSpeedIn": 250
        });
    };

    /* slide post */
    var jq = function (myid) {
        return myid.replace(/:/g, "\\:").replace(/\./g, "\\.").replace(/\//g, "\\/");
    };
    var loadPost = function (id) {
        var loadPostContent = function (id, data) {
            var pc = jQuery('#' + jq(id) + ' .content').html(data);
            pc.find("img").fancyzoom();
            pc.pretty();
            pc.truncate();
        };
        var postId = id.slice(5);
        jQuery.ajax({
            type: 'GET',
            url: postId == "__" ? "/" : postId.replace(/__/g, "/") + '.html',
            //cache: false,
            dataType: 'html',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (data) {
                loadPostContent(id, '<p class="ajax-loader">Loading...</p>');
            },
            success: function (data) {
                data = jQuery(data).find('div.post div.content').html();
                loadPostContent(id, data);
            },
            error: function (data) {
                loadPostContent(id, '<p>Oops, It seems the post does not exist. Try the direct post link above or <small><a href="javascript:void(0);" onclick="loadPost(\'' + id + '\');">[Reload]</a></small>.</p><p>If you are searching or click any tag link, please see the note below.</p>');
            }
        });
    };
    var slide_post = function () {
        var PRE_LOAD = 2;
        jQuery('div.post[id^=post-]:visible').each(function () {
            var id = jQuery(this).attr('id');
            var pc = jQuery('#' + jq(id) + ' .content-wrap');
            var toggle = jQuery('<a href="javascript:void(0);" class="toggle"></a>');
            toggle.toggle(function () {
                if (pc.find(".content").text() == '') {
                    loadPost(id);
                } else if (pc.find(".gcse").length > 0) {
                    pc.hide();
                    loadPost(id);
                }
                pc.fadeIn(200);
                jQuery(this).removeClass('collapse').addClass('expand');
            },

            function () {
                pc.hide();
                jQuery(this).removeClass('expand').addClass('collapse');
            }).prependTo(jQuery(this).find("h1"));
        });
        if (PRE_LOAD > 0) {
            jQuery('div.post:visible a.toggle').each(function (index) {
                if (index < PRE_LOAD) {
                    if (jQuery(this).parent().parent().find(".gcse").length === 0) {
                        jQuery(this).click();
                    }
                }
            });
        }
    };
    /* google cse search box */
    (function () {
        var searchtxt = document.getElementById("searchtxt");
        var searchbtn = document.getElementById("searchbtn");
        var tiptext = "Type text to search here...";
        if (searchtxt.value == "" || searchtxt.value == tiptext) {
            searchtxt.className += " searchtip";
            searchtxt.value = tiptext;
        }
        searchtxt.onfocus = function (e) {
            if (searchtxt.value == tiptext) {
                searchtxt.value = "";
                searchtxt.className = searchtxt.className.replace(" searchtip", "");
            }
        };
        searchtxt.onblur = function (e) {
            if (searchtxt.value == "") {
                searchtxt.className += " searchtip";
                searchtxt.value = tiptext;
            }
        };
        searchbtn.onclick = function (e) {
            if (searchtxt.value == "" || searchtxt.value == tiptext) {
                return false;
            }
        };
    })();
    var gcse = function (text, start) {
        if (typeof(google_cse_cx) == 'undefined') {
            alert("google custom search id not set");
            return;
        }
        if (typeof(start) == 'undefined') {
            start = 0;
        }
        jQuery("form#cse-search-box input#searchtxt").val(text);
        var url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?&rsz=large";
        url += "&cx=" + google_cse_cx;
        url += "&start=" + start;
        url += "&q=" + encodeURIComponent(text);
        var div = jQuery("div#main");
        if (div.length == 1) {
            div.addClass("origin").hide();
            div.after('<div id="main" class="gcse"></div>');
            div = div.find("~ div#main.gcse");
        } else {
            div.filter(".origin").hide();
            div.filter(".gcse").show();
            div = div.filter(".gcse");
        }
        div.html('<p class="ajax-loader">Searching on Google Custom Search"' + text + '"...</p>');
        jQuery.getJSON(url, function (data) {
            jQuery.ajax({
                async: false,
                url: "/inc/gcse.html",
                success: function (tmpl) {
                    div.pureJSTemplate({
                        id: "gcse",
                        data: {
                            r: data.responseData.results,
                            c: data.responseData.cursor,
                            t: text
                        },
                        tmpl: tmpl
                    });
                }
            });
            slide_post();
            div.find("a#back").click(function () {
                jQuery("div#main.gcse").hide();
                jQuery("div#main.origin").fadeIn(200);
            });
        });
    };

    /* extract from base.js of inove theme */
    jQuery.fn.cumulativeOffset = function (e) {
        var t = 0,
            l = 0;
        do {
            t += e.offsetTop || 0;
            l += e.offsetLeft || 0;
            e = e.offsetParent;
        } while (e);
        return [l, t];
    };

    /* display tag cloud in side bar */
    jQuery.ajax({
        url: "/inc/recent.html",
        success: function (html) {
            jQuery("div#recent.widget").append(html);
        }
    });

    /* display tag cloud in side bar */
    jQuery.ajax({
        url: "/inc/tagcloud.html",
        success: function (html) {
            jQuery("div#tag_cloud.widget").append(html).find("a").tagcloud({
                size: {
                    start: 8,
                    end: 16,
                    unit: "pt"
                }
            });
        }
    });

    /* disqus api */
    jQuery.jsonp({
        dataType: "jsonp",
        cache: true,
        url: "http://vi.appspot.com/comment/?limit=8&exclude=spam,killed&callback=?",
        success: function (data) {
            var comment = jQuery('<ul>');
            jQuery.each(data.message, function (i, item) {
                var author = 'anonymous';
                var avatar = 'http://www.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=32';
                if (item.is_anonymous === false) {
                    author = item.author.username;
                    if (item.author.has_avatar === true) {
                        avatar = item.author.avatar.small;
                    }
                }
                comment.append(jQuery('<li class="rc_item">').html(jQuery('<div class="rc_avatar rc_left">').html(jQuery('<img>').attr({
                    "class": 'avatar avatar-32 photo',
                    "width": '32',
                    "height": '32',
                    "src": avatar
                }))).append(jQuery('<div class="rc_info">').html(jQuery('<span class="author_name">').html(jQuery('<a>').attr('href', item.thread.url + '#comment-' + item.id).text(author)))).append(jQuery('<div class="rc_excerpt">').text(item.message)));
            });
            jQuery('div#recent_comments.widget').append(comment);
        }
    });

    /* on document ready */
    jQuery(document).ready(function () {
        jQuery('a[rel*="external"]').click(function () {
            window.open(this.href);
            return false;
        });
        jQuery('a[href!="#"][href!="#ViewPollResults"][href^="#"]').click(function () {
            jQuery.scrollTo(this.href.replace(/^.*#/g, '#'), 400, {
                offset: 0
            });
            return false;
        });

        /* display feeds in side bar */
        jQuery.ajax({
            url: "/inc/feeds.html",
            success: function (html) {
                jQuery('div#subscribe').append(html).hover(function () {
                    jQuery(this).find('ul').css({
                        left: jQuery('#feedrss').cumulativeOffset(this)[0],
                        top: jQuery('#feedrss').cumulativeOffset(this)[1]
                    }).fadeIn(200);
                },

                function () {
                    jQuery(this).find('ul').fadeOut(400);
                });
            }
        });

        /* append inc/translate.html to doc */
        jQuery.ajax({
            url: "/inc/translate.html",
            success: function (html) {
                jQuery('body').append(html);
            }
        });

        /* google ajax search */
        jQuery("form#cse-search-box").submit(function () {
            gcse(jQuery(this).find("input#searchtxt").val());
            return false;
        });
        jQuery(".post .tags a").click(function () {
            gcse(jQuery(this).text());
            return false;
        });
        if (/^\/(index\.|$)/.test(window.location.pathname)) {
            slide_post();
        }

        /* fancybox */
        jQuery(".post .content img").fancyzoom();

        /* truncater */
        jQuery.fn.truncate.defaults = {
            more: 'More &raquo;',
            max_length: 1200,
            less: '&laquo; Less'
        };

        /* prettify */
        jQuery(document).pretty();
    });

    window.gcse = gcse;
    window.loadPost = loadPost;
})();
