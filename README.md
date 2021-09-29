MeanMenu v3.0
===========

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://gnu.org/licenses/>.

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight piece of jQuery to convert a standard navigation into a mobile/tablet navigation.**

If you are looking for drop down functionality on the desktop, MeanMenu doesn't do it. Use <a title="Superfish Drop down menus" href="http://plugins.jquery.com/superfish/">Superfish</a> as well as MeanMenu.

Just include the jQuery library (http://jquery.com)

Then this file (jquery.meanmenu.js)

in your HTML e.g.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="jquery.meanmenu.js"></script>

Then add the CSS for this after all of your other CSS in the &lt;head&gt; section.

	<link rel="stylesheet" href="meanmenu.css" media="all" />

Then in your usual document.ready, this is working under the assumption your navigation is in <header><nav> structure...

    jQuery(document).ready(function () {
    	jQuery('header nav').meanmenu();
    });

There are the following options (Options are shown with their defaults)...

meanMenuContainer: 'body'

- Choose where meanmenu will be placed within the HTML

meanBarColour: '#0c1923'

- set colour for the bar background

meanNavColour: 'inherit'

- set colour for the nav background

meanMenuClose: "x"

- Single character you want to represent the close menu button

meanMenuOpen: "≡"

- Single character you want to represent the open menu button

meanRevealPosition: "right"

- Left right or center positions

meanRevealPositionDistance: "0"

- Tweak the position of the menu

meanRevealColour: "none"

- set colour for the reveal background

meanScreenWidth: "640"

- Set the screen width you want meanmenu to kick in at

meanNavPush: false

- Set a height here in px, em or % if you want to budge your layout now the navigation is missing.

meanShowChildren: true

- true to show children in the menu, false to hide them

meanExpandableChildren: true

- true to allow expand/collapse children

meanExpand: "+"

- single character you want to represent the expand for ULs

meanContract: "-"

- single character you want to represent the contract for ULs

meanRemoveAttrs: false
- true to remove classes and IDs, false to keep them

onePage: false

- set to true for one page sites, the navigation will close back up on itself on click

removeElements: null

- enter comma separated values in here of elements you want hidden from the container of meanmenu e.g. if you had a search box called .search, enter ".search" in here

meanDisplay: "block"

- by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.
