# StatusNet Querycards

## Intro

This tiny jQuery plugin scans your selectors for a link that contains an @-mention.  
It adds a popup to those links that contains more information about this user.  
The popup appears on when you hover over the @-mention.


## Usage

### Relevant snippet

```html
<div class="hovercard">
  <a href="http://identi.ca/x11r5">@x11r5</a>
</div>
<script>
  $('.hovercard').SnHoverCard();
</script>
```

### Complete example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>StatusNet Querycards</title>
    <link rel="stylesheet" href="hovercard.css" />
  </head>
  <body>
    <div class="hovercard">
      <a href="http://identi.ca/x11r5">@x11r5</a>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="hovercard.js"></script>
    <script>
      $('.hovercard').SnHoverCard();
    </script>
  </body>
</html>
```

## Screenshot

![Screenshot of a StatusNet Querycard](http://chimo.github.com/statusnet-querycards/snqc.png)

You can of course change the look by including your own CSS on your page.

## Mentions

* This is inspired by the [Hovercards](http://status.net/wiki/Install_the_JavaScript_API_Plugin#Let.27s_add_hovercards) feature part of the [StatusNet JavaScript API](http://status.net/wiki/Install_the_JavaScript_API_Plugin) plugin.
* [Project blog post and examples](https://chimo.chromic.org/2012/10/28/statusnet-querycards/)