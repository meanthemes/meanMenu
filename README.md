meanMenu
===========

A menu system for responsive designs, media query independent.

Just include the jQuery library (http://jquery.com) **- Please note I've just updated the code to run with 1.9.1 of jQuery, we've also tested backwards to 1.7.1 - please let me know if you find any bugs with new or old.**

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

meanMenu: "header nav"
- Target the current HTML markup you wish to replace

meanMenuClose: "X", 
- Single character you want to represent the close menu button

meanMenuCloseSize: "18px", 
- Set font size of close button

meanMenuOpen: "<span /><span /><span />, 
- Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans

meanRevealPosition: "right"
- Left right or center positions

meanRevealPositionDistance: "0"
- Tweak the position of the menu

meanRevealColour: ""
- Override CSS colours for the reveal background

meanRevealHoverColour: ""
- Override CSS colours for the reveal hover
 
meanScreenWidth: "480"
- Set the screen width you want meanmenu to kick in at

meanNavPush: ""
- Set a height here in px, em or % if you want to budge your layout now the navigation is missing.

meanShowChildren: true
- true to show children in the menu, false to hide them

meanShowAttrs: false
- true to remove classes and IDs, false to keep them

