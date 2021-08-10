# startpage

just the startpage i use locally on my laptop with darkhttpd. there's a few cool features:

## mini pages

pages of links to useful locations, or anything else really. 
reads in a directory of the pages from `./content`.
page loads if the page name is typed, checked on each keypress.

![mini pages](images/pages.png)

## shortcuts

shortcuts again executed when a keyword is typed

![shortcuts](images/shortcuts.gif)

## automatic reloading

the page reloads when a new background/colour scheme is set via pywal.
for this to work you need to create the symlink `wal -> /home/user/.cache/wal/wal`

![autoupdate](images/autoupdate.gif)
