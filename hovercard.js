(function ($) {
    // private
    function buildCard(data, $link) {
        $link.on('mouseenter', function () {
            setTimeout(function () {
                $('.sn-hovercard').hide(); // Only show one hovercard at a time
                $.fn.SnHoverCard('show', $link);
            }, 400);
        });

        var offset = $link.offset(),
            uid    = (new Date).getTime(),
            html   = '<div class="sn-hovercard">\
                      <div class="hc-content">\
                        <h2>' + data.name + '</h2>\
                        <a href="' + data.statusnet_profile_url + '">@' + data.screen_name + '<img src="' + data.profile_image_url + '" /></a>\
                        <p class="hc-stats">\
                          <span class="hc-notices">\
                            <span class="hc-count">' + data.statuses_count + '</span> notices,\
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
                      <div class="hc-actions"><a href="#" class="hc-follow">subscribe</a>\
                        <div class="hc-follow-form">\
                          <form>\
                            <fieldset>\
                              <label for="hc-profile-' + uid + '">Your Accound ID</label>\
                              <input id="hc-profile-' + uid + '" type="text" placeholder="e.g. user@identi.ca" />\
                              <input type="hidden" name="profile" value="' + data.statusnet_profile_url + '" />\
                              <button type="submit">Subscribe</button>\
                            </fieldset>\
                          </form>\
                        </div>\
                      </div>\
                   </div>';
        html = $(html).appendTo('body')
            .on('mouseleave', function () { setTimeout(function () { html.hide(); }, 400); })
            .css({top: offset.top, left: offset.left});

        html.find('.hc-follow').on('click', function (e) {
            e.preventDefault();
            $(this).parent().find('.hc-follow-form').slideToggle();
        });

        html.find('form').on('submit', function (e) {
            e.preventDefault();

            var $form   = $(this),
                $input  = $form.find('input[type=text]'),
                profile = $input.val().split('@');

            if (profile.length !== 2) {
                // TODO: show error msg
                $input.css('border', '1px solid #F00');
            } else {
                profile = profile[1];
                $form.attr('action', 'http://' + profile + '/main/ostatussub');
                this.submit();
            }
        });

        $link.data('sn-hovercard', html); // Could use ARIA instead
        $link.trigger('mouseenter');      // Initial show() after we got the data
    }

    function buildErrorCard() {
       // TODO
    }

    function getData(e) {
        var $this = $(this),
            url   = document.createElement('a'),          // Temp <a> so we can modify it without breaking the link.
            user  = $this.text().substr(1),
            patt  = new RegExp('/' + user + '$'),         // Matches username at end of string 
            api   = '/api/users/show.json?id=' + user;
        url.href  = $this.attr('href').replace(patt, ''); // Remove username from URL if present.

        // NOTE:  Doesn't support api at non-default locations
        // FIXME: This (probably) fails if a single-user instance is installed in a subdir that matches the user's nickname
        $.getJSON(url.href + api) // Fancy URL
            .success(function (data) { buildCard(data, $this); })
            .error(function () { // Try non-fancy URL
                $.getJSON(url.href + '/index.php' + api)
                    .success(function (data) { buildCard(data, $this); })
                    .error(function () { buildErrorCard(); });
            });
    }

    // public
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    $collection;

                if ($this.is('a[href]')) {
                    $collection = $this;
                } else {
                    $collection = $this.find('a[href]');
                }

                if (!$collection) {
                    return;
                }

                $collection.each(function () {
                    if ($(this).text().match(/@\w+/)) {
                        $(this).one('mouseenter', getData);
                    }
                });
            });
        },
        show: function (elm) {
            $(elm).data('sn-hovercard').show();
        },
        hide: function (elm) {
            $(elm).data('sn-hovercard').hide();
        }
    };

    // Method calling logic
    $.fn.SnHoverCard = function (method) {
        var elm;

        if (methods[method]) {
            elm = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            elm = methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.SnHoverCard');
        }

        return elm;
    };

}(jQuery));
