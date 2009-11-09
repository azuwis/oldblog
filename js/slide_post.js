(function () {
    var PRE_LOAD = 2;
    jQuery(document).ready(function () {
        jQuery('div.post').each(function () {
            var id = jQuery(this).attr('id');
            var pc = '#' + jq(id) + ' .content';
            if (/^post\-/.test(id)) {
                var toggle = jQuery('<a href="javascript:void(0);" class="toggle"></a>');
                toggle.toggle(function () {
                    if (jQuery(pc).text() == '') {
			loadPost(id);
		    } else if (jQuery(pc).find(".gcse").length > 0) {
			jQuery(pc).hide();
			loadPost(id);
                    }
                    jQuery(pc).slideDown();
		    jQuery(this).removeClass('collapse').addClass('expand');
                },
                function () {
                    jQuery(pc).slideUp();
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
		loadPostContent(id, '<p>Oops, failed to load data. <small><a href="javascript:void(0);" onclick="POS.loadPost(\'' + id + '\');">[Reload]</a></small></p>');
            }
	});
    }
    function loadPostContent(id, data) {
	jQuery('#' + jq(id) + ' .content').html(data);
    }
    window['POS'] = {};
    window['POS']['loadPost'] = loadPost;
})();
