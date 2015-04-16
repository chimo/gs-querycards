# GNU social Querycards

## Intro

This tiny jQuery plugin scans your selectors for a link that contains an @-mention.  
It adds a popup to those links that contains more information about this user.  
The popup appears on when you hover over the @-mention.

## Demo

Visit: http://chromic.org/gs-querycards/

## Usage

### Relevant snippet

```html
<div class="hovercard">
  <a href="http://sn.chromic.org/chimo">@chimo</a>
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
      <a href="http://sn.chromic.org/chimo">@chimo</a>
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

![Screenshot of a GNU social Querycard](https://chimo.github.io/gs-querycards/gsqc.png)

You can of course change the look by including your own CSS on your page.
