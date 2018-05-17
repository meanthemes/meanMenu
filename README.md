MeanMenu v2.0.9
===========
**This repo (https://github.com/T-Fletcher/meanMenu/) is a tweaked version, originally forked from  MeanTheme's MeanMenu JS library (https://github.com/meanthemes/meanMenu)**

## Changes
- Added a `meanExpandPosition` option to specify if the expand/contract link appears before or after the target child menu
- Added a `meanSpeed` option to specify animation speed in milliseconds
- Updated the selector for targeting child menus

Note that I haven't updated the demo page or checked the styles, as this is just to cater for my specific project at this stage. I'll try to get to that later, or you can give it a go ;)

Ok, back to the original README now...

-----

Looking for a WordPress version?
---
Our friends over at PluginHero have just released the <a href="http://pluginhero.com/portfolio/meanmenu/">WordPress version of MeanMenu</a>.

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight piece of jQuery to convert a standard navigation into a mobile/tablet navigation.**

**MeanMenu only works for one menu per page.**

If you are looking for drop down functionality on the desktop, MeanMenu doesn't do it. Use <a title="Superfish Drop down menus" href="http://plugins.jquery.com/superfish/">Superfish</a> as well as MeanMenu. You can see Superfish + MeanMenu on all of our themes, for example <a title="Literary Theme" href="http://www.meanthemes.com/theme/literary/">Literary</a>.

And yes, it works with jQuery 2.0 - obviously IE 7 & 8 will not work.

Live Demo:
<a href="http://www.meanthemes.com/demo/meanmenu/demo.html">http://www.meanthemes.com/demo/meanmenu/demo.html</a>


Just include the jQuery library (http://jquery.com)

Then this file (jquery.meanmenu.js)

in your HTML e.g.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="assets/js/plugins/jquery.meanmenu.js"></script>

Then add the CSS for this after all of your other CSS in the &lt;head&gt; section.

	<link rel="stylesheet" href="meanmenu.css" media="all" />

Then in your usual document.ready, this is working under the assumption your navigation is in <header><nav> structure...

    jQuery(document).ready(function () {
    	jQuery('header nav').meanmenu();
    });

There are the following options (Options are shown with their defaults)...

meanMenuContainer: 'body'

- Choose where meanmenu will be placed within the HTML

meanMenuClose: "X"

- Single character you want to represent the close menu button

meanMenuCloseSize: "18px"

- Set font size of close button

meanMenuOpen: "<span /><span /><span />"

- Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans

meanRevealPosition: "right"

- Left right or center positions

meanRevealPositionDistance: "0"

- Tweak the position of the menu

meanRevealColour: ""

- Override CSS colours for the reveal background

meanScreenWidth: "480"

- Set the screen width you want meanmenu to kick in at

meanNavPush: ""

- Set a height here in px, em or % if you want to budge your layout now the navigation is missing

meanShowChildren: true

- true to show children in the menu, false to hide them

meanExpandableChildren: true

- true to allow expand/collapse children

meanExpand: "+"

- single character you want to represent the expand for ULs

meanExpandPostion: "after"

- Set to either before or after to change where the expand/contract icon is inserted in the list markup. Useful for accessibility tweaks

meanSpeed: 300

- an integer that sets the speed of all animations in milliseconds. 1000 = 1 second

meanContract: "-"

- single character you want to represent the contract for ULs

meanRemoveAttrs: false
- true to remove classes and IDs, false to keep them

onePage: false

- set to true for one page sites, the navigation will close back up on itself on click

removeElements: ""

- enter comma separated values in here of elements you want hidden from the container of meanmenu e.g. if you had a search box called .search, enter ".search" in here

meanDisplay: "block"

- by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.
