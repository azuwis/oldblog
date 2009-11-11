(function () {
    var PRE_LOAD = 2;
    jQuery(document).ready(function () {
        jQuery('div.post').each(function () {
            var id = jQuery(this).attr('id');
	    var pc = jQuery('#' + jq(id) + ' .content-wrap');
            if (/^post\-/.test(id)) {
                var toggle = jQuery('<a href="javascript:void(0);" class="toggle"></a>');
                toggle.toggle(function () {
		    if (pc.find(".content").text() == '') {
			loadPost(id);
		    } else if (pc.find(".gcse").length > 0) {
			pc.hide();
			loadPost(id);
                    }
		    pc.show();
		    jQuery(this).removeClass('collapse').addClass('expand');
                },
                function () {
                    pc.hide();
		    jQuery(this).removeClass('expand').addClass('collapse');
		}).prependTo(jQuery('#' + jq(id) + ' h1'));
            }
        });
        if (PRE_LOAD > 0) {
            jQuery('div.post a.toggle').each(function (index) {
                if (index < PRE_LOAD) {
		    if(jQuery(this).parent().parent().find(".gcse").length == 0) {
			jQuery(this).click();
                    }
                }
	    });
        }
    });
    function jq(myid) {
        return myid.replace(/:/g,"\\:").replace(/\./g,"\\.").replace(/\//g,"\\/");
    }
    function loadPost(id) {
        var postId = id.slice(5);
        jQuery.ajax({
            type: 'GET',
            url: postId.replace(/__/g,"/") + '.html',
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
		loadPostContent(id, '<p>Oops, It seems the post does not exist. Try the direct post link or <small><a href="javascript:void(0);" onclick="POS.loadPost(\'' + id + '\');">[Reload]</a></small>.</p><p>If you are searching or click any tag link, please see the note below.</p>');
            }
	});
    }
    function loadPostContent(id, data) {
	jQuery('#' + jq(id) + ' .content').html(data).truncate({max_length: 1200});
    }
    window['POS'] = {};
    window['POS']['loadPost'] = loadPost;
})();
