(function ($) {

    // public
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this),
                    $collection;

                if($this.is('a[href]')) {
                    $collection = $this;
                } else {
                    $collection = $this.find('a[href]');
                }

                if(!$collection) {
                    return;
                }

                $collection.each(function() {
                    if($(this).text().match(/@\w+/)) {
                        $(this).one('mouseenter', getData);
                    }
                });
            });
        },
        show: function(elm) {
            $(elm).data('sn-hovercard').show();
        },
        hide: function(elm) {
            $(elm).data('sn-hovercard').hide();
        }
    }

    // private
    function getData(e) {
        var url  = document.createElement('a'),            // Temp <a> so we can modify it without breaking the link.
            user = $(this).text().substr(1),
            patt = new RegExp('/' + user + '$'),           // Matches username at end of string 
            api  = '/api/users/show.json?id=' + user;
        url.href = $(this).attr('href').replace(patt, ''); // Remove username from URL if present.

        var that = this;

        // NOTE:  Doesn't support api at non-default locations
        // FIXME: This (probably) fails if a single-user instance is installed in a subdir that matches the user's nickname
        $.getJSON(url.href + api) // Fancy URL
            .success(function(data){buildCard(data, $(that))})
            .error(function() { // Try non-fancy URL
                $.getJSON(url.href + '/index.php' + api)
                    .success(function(data){buildCard(data, $(that))})
                    .error(function(){buildErrorCard()});
            });

    }

    function buildErrorCard() {
       // TODO
    }

    function buildCard(data, $link) {
        $link.on('mouseenter', function() { 
            setTimeout(function() {
                $('.sn-hovercard').hide(); // Only show one hovercard at a time
                $.fn.SnHoverCard('show', $link); 
            }, 400)
        });

        var offset = $link.offset(),
            html   = '<div class="sn-hovercard">\
                      <div class="hc-content">\
                        <h2>' + data.name + '</h2>\
                        <a href="' + data.statusnet_profile_url + '">@' + data.screen_name + '<img src="' + data.profile_image_url + '" /></a>\
                        <p class="hc-stats">\
                          <span class="hc-notices">\
                            <span class="hc-count">' + data.statuses_count + '</span> notices\
                          </span>\
                          <span class="hc-subs">\
                            <span class="hc-count">' + data.friends_count + '</span> subscribers\
                          </span>\
                        </p>\
                        <h3>Bio</h3>\
                        <span class="hc-bio">' + (data.description || '') + '</span>\
                        <h3>Latest</h3>\
                        <span class="hc-status">' + data.status.text + '</span>\
                      </div>\
                   </div>';
        html = $(html).appendTo('body')
            .on('mouseleave', function(){ setTimeout(function() {html.hide();}, 400)})
            .css({top: offset.top, left: offset.left});

        $link.data('sn-hovercard', html); // Could use ARIA instead
        $link.trigger('mouseenter');      // Initial show() after we got the data
    }

    $.fn.SnHoverCard = function(method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.SnHoverCard' );
        }
    };

})(jQuery);

