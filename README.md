# GNU social Querycards

## Intro

This tiny jQuery plugin scans your selectors for a link that contains an @-mention.  
It adds a popup to those links that contains more information about this user.  
The popup appears on when you hover over the @-mention.

## Demo

Visit: http://chimo.github.io/gnusocial-querycards/

## Usage

### Relevant snippet

```html
<div class="hovercard">
  <a href="http://identi.ca/x11r5">@x11r5</a>
</div>
<script>
  $('.hovercard').gsHovercard();
</script>
```

### Complete example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>GNU social Querycards</title>
    <link rel="stylesheet" href="hovercard.css" />
  </head>
  <body>
    <div class="hovercard">
      <a href="http://identi.ca/x11r5">@x11r5</a>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="hovercard.js"></script>
    <script>
      $('.hovercard').gsHovercard();
    </script>
  </body>
</html>
```

## Screenshot

![Screenshot of a GNU social Querycard](http://chimo.github.com/gnusocial-querycards/gsqc.png)

You can of course change the look by including your own CSS on your page.
