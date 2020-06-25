# Note

I'm done with this. If someone wants to maintain it send me a note and I'll transfer the repo. Or just fork it, or whatever.

# GNU social Querycards

## Intro

This tiny jQuery plugin scans your selectors for a link that contains an @-mention.  
It adds a popup to those links that contains more information about this user.  
The popup appears on when you hover over the @-mention.

## Demo

Visit: https://chromic.org/gs-querycards/

## Usage

### Relevant snippet

```html
<div class="hovercard">
  <a href="https://sn.chromic.org/chimo">@chimo</a>
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
      <a href="https://sn.chromic.org/chimo">@chimo</a>
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="hovercard.js"></script>
    <script>
      $('.hovercard').gsHovercard();
    </script>
  </body>
</html>
```

## Translations

If the widget has been translated in your language, you use it on your page by adding the locale *before* hovercard.js

To use the French translation, for example:

```html
    <script src="locale/fr.js"></script>
    <script src="hovercard.js"></script>
```

## Screenshot

![Screenshot of a GNU social Querycard](https://chromic.org/gs-querycards/gsqc.png)

You can of course change the look by including your own CSS on your page.
