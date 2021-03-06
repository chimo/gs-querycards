( function( $, i18n ) {

    /**
     * Internationalization
     */
    if ( i18n === undefined ) {
        i18n = {
            acctID: "Your Accound ID",
            bio: "Bio",
            description: "Description",
            latest: "Latest",
            members: "members",
            notices: "notices",
            placeholder: "e.g. user@example.org",
            subscribe: "Subscribe",
            subscribers: "subscribers"
        };
    }

    /* private */
    function buildHTML( data, group ) {
        var at = "",
            desc = i18n.description,
            notices = "",
            latest = "",
            subs = i18n.members,
            html,
            uid = new Date().getTime();

        // Redefine some things if we're dealing with @user
        if ( !group ) {
            at   = "@";
            desc = i18n.bio;
            subs = i18n.subscribers;
            notices = "<span class='hc-notices'>" +
                    "<span class='hc-count'>" + data.statuses_count + "</span> " + i18n.notices + ", " +
                    "</span>";
            latest = "<h3>" + i18n.latest + "</h3>" +
                "<span class='hc-status'>" + data.status.text + "</span>";
        }

        html = "<div class='gs-hovercard'>" +
                  "<div class='hc-content'>" +
                    "<h2>" + ( data.name || data.fullname ) + "</h2>" +
                    "<a href='" + ( data.statusnet_profile_url || data.url ) + "'>" + at + ( data.screen_name || data.fullname ) +
                      "<img src='" + ( data.profile_image_url || data.stream_logo ) + "' />" +
                    "</a>" +
                    "<p class='hc-stats'>" + notices +
                      "<span class='hc-subs'>" +
                        "<span class='hc-count'>" + ( data.friends_count || data.member_count ) + "</span> " + subs +
                      "</span>" +
                    "</p>" +
                    "<h3>" + desc + "</h3>" +
                    "<span class='hc-bio'>" + ( data.description || "" ) + "</span>" + latest +
                  "</div>" +
                  "<div class='hc-actions'><a href='#' class='hc-follow'>" + i18n.subscribe + "</a>" +
                  "<div class='hc-follow-form'>" +
                    "<form>" +
                      "<fieldset>" +
                        "<label for='hc-profile-" + uid + "'>" + i18n.acctID + "</label>" +
                        "<input id='hc-profile-" + uid + "' type='text' placeholder='" + i18n.placeholder + "' />" +
                        "<input type='hidden' name='profile' value='" + ( data.statusnet_profile_url || data.url ) + "' />" +
                        "<button type='submit'>" + i18n.subscribe + "</button>" +
                      "</fieldset>" +
                    "</form>" +
                  "</div>" +
                "</div>" +
              "</div>";

        return html;
    }

    function buildCard( data, $link ) {
        $link.on( "mouseenter", function() {
            setTimeout( function() {
                $( ".gs-hovercard" ).hide(); /* Only show one hovercard at a time */
                $link.data( "gs-hovercard" ).show();
            }, 400 );
        } );

        var offset = $link.offset(),
            group  = ( $link.text().charAt( 0 ) === "!" ),
            html   = buildHTML( data, group );

        html = $( html ).appendTo( "body" )
            .on( "mouseleave", function() {
                setTimeout( function() {
                    html.hide();
                }, 400 );
            } )
            .css( { top: offset.top, left: offset.left } );

        html.find( ".hc-follow" ).on( "click", function( e ) {
            e.preventDefault();
            $( this ).parent().find( ".hc-follow-form" ).slideToggle();
        } );

        html.find( "form" ).on( "submit", function( e ) {
            e.preventDefault();

            var $form   = $( this ),
                $input  = $form.find( "input[type=text]" ),
                profile = $input.val().split( "@" );

            if ( profile.length !== 2 ) {
                /* TODO: show error msg */
                $input.css( "border", "1px solid #f00" );
            } else {
                profile = profile[ 1 ];
                if ( !group ) {
                    $form.attr( "action", "http://" + profile + "/main/ostatussub" );
                } else {
                    $form.attr( "action", "http://" + profile + "/main/ostatusgroup" );
                }
                this.submit();
            }
        } );

        $link.data( "gs-hovercard", html ); /* Could use ARIA instead */
        $link.trigger( "mouseenter" );      /* Initial show() after we got the data */
    }

    function buildErrorCard() {
       /* TODO */
    }

    function getData() {
        var $this = $( this ),
            id = $this.text().substr( 1 ),
            group = ( $this.text().charAt( 0 ) === "!" ),
            url = $this.attr( "href" ),
            patt, api, match;

        if ( group ) {

            // Groups can be referenced in two ways:
            //   1. http://example.org/group/$ID/id
            //   2. http://example.org/group/$NAME
            patt = new RegExp( "group\/([0-9]+)/id$" );
            match = url.match( patt );

            // Try 1.
            if ( match ) {
                id = match[ 1 ];
            } else {
                patt = new RegExp( "group\/" + id + "$" ); // Try 2.
            }

            url = $this.attr( "href" ).replace( patt, "" );
            api = "/api/statusnet/groups/show.json?id=" + id;
        } else {
            patt = new RegExp( id + "$" );
            url = url.replace( patt, "" );
            api = "/api/users/show.json?id=" + id;
        }

        // NOTE:  Doesn't support api at non-default locations
        $.getJSON( url + api ) /* Fancy URL */
            .success( function( data ) {
                buildCard( data, $this );
            } )
            .error( function() { /* Try non-fancy URL */
                $.getJSON( url + "/index.php" + api )
                    .success( function( data ) {
                        buildCard( data, $this );
                    } )
                    .error( function() {
                        buildErrorCard();
                    } );
            } );
    }

    // public
    var methods = {
        init: function() {
            return this.each( function() {
                var $this = $( this ),
                    $collection;

                if ( $this.is( "a[href]" ) ) {
                    $collection = $this;
                } else {
                    $collection = $this.find( "a[href]" );
                }

                if ( $collection ) {
                    $collection.each( function() {
                        if ( $( this ).text().match( /@\w+/ ) ) {
                            $( this ).one( "mouseenter", getData );
                        } else if ( $( this ).text().match( /!\w+/ ) ) {
                            $( this ).one( "mouseenter", getData );
                        }
                    } );
                }
            } );
        }
    };

    // Method calling logic
    $.fn.gsHovercard = function( method ) {
        var elm;

        if ( methods[ method ] ) {
            elm = methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof method === "object" || !method ) {
            elm = methods.init.apply( this, arguments );
        } else {
            $.error( "Method " +  method + " does not exist on jQuery.gsHovercard" );
        }

        return elm;
    };

}( jQuery, window.i18n ) );
