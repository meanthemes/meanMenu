/**
 * jQuery meanMenu v1.3
 * Copyright (C) 2012 Chris Wharton (themes@meanthemes.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 *
 * Find more information at http://www.meanthemes.com/plugins/meanmenu/
 *
 */
(function ($) {
    $.fn.meanmenu = function (options) {
        var defaults = {
            meanMenu: "header nav", // Target the current HTML markup you wish to replace
            meanMenuClose: "X", // single character you want to represent the close menu button
            meanMenuCloseSize: "18px", // set font size of close button
            meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
            meanRevealPosition: "right", // left right or center positions
            meanRevealPositionDistance: "0", // Tweak the position of the menu
            meanRevealColour: "", // override CSS colours for the reveal background
            meanRevealHoverColour: "", // override CSS colours for the reveal hover
            meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
            meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
            meanShowChildren: true // true to show children in the menu, false to hide them
        };
        var options = $.extend(defaults, options);
        
        // get browser width
        currentWidth = jQuery(window).width();

        return this.each(function () {
            var meanMenu = options.meanMenu;
            var meanReveal = options.meanReveal;
            var meanMenuClose = options.meanMenuClose;
            var meanMenuCloseSize = options.meanMenuCloseSize;
            var meanMenuOpen = options.meanMenuOpen;
            var meanRevealPosition = options.meanRevealPosition;
            var meanRevealPositionDistance = options.meanRevealPositionDistance;
            var meanRevealColour = options.meanRevealColour;
            var meanRevealHoverColour = options.meanRevealHoverColour;
            var meanScreenWidth = options.meanScreenWidth;
            var meanNavPush = options.meanNavPush;
            var meanTarget = jQuery(this);
            var meanRevealClass = ".meanmenu-reveal";
            meanShowChildren = options.meanShowChildren;
                        
            //detect known mobile/tablet usage
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i))) {
                var isMobile = true;
            }
            
            function meanCentered() {
            	if (meanRevealPosition == "center") {
	            	var newWidth = jQuery(window).width();
	            	var meanCenter = ( (newWidth/2)-22 )+"px";
	            	meanRevealPos = "left:" + meanCenter + ";right:auto;";
	            	
	            	if (!isMobile) {	            	
	            		jQuery('.meanmenu-reveal').css("left",meanCenter); 
	            	} else {
		            	jQuery('.meanmenu-reveal').animate({
		            	    left: meanCenter
		            	});
	            	}
            	}
            }
            
            if (meanRevealPosition == "right") {
                meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
            }
            if (meanRevealPosition == "left") {
                meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
            } 
            // run center function	
            meanCentered();
            
            // set all styles for mean-reveal
            meanStyles = "background:"+meanRevealColour+";color:"+meanRevealColour+";"+meanRevealPos;

            function meanInner() {
                // get last class name
                navOpen = $navreveal.attr('class').split(' ').slice(-1);
                if (navOpen == "meanclose") {
                    $navreveal.html(meanMenuClose);
                } else {
                    $navreveal.html(meanMenuOpen);
                }
            }
            
            //re-instate original nav (and call this on window.width functions)
            function meanOriginal() {
            	jQuery('.mean-bar,.mean-push').replaceWith('');
            	jQuery('body').removeClass("mean-container");
            	jQuery(meanMenu).show();
            }
            
            //navigation reveal 
            function showMeanMenu() {
                if (currentWidth <= meanScreenWidth) {
                	// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
                	jQuery('body').addClass("mean-container");
                	jQuery('.mean-container').prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+meanStyles+'">Show Navigation</a><nav class="mean-nav"></nav></div>');
                    
                    //push meanMenu navigation into .mean-nav
                    var meanMenuContents = jQuery(meanMenu).html();
                    jQuery('.mean-nav').html(meanMenuContents);
                    
                    // push in a holder div (this can be used if removal of nav is causing layout issues)
                    jQuery(meanMenu).before('<div class="mean-push" />');
                    jQuery('.mean-push').css("margin-top",meanNavPush);
                    
                    // hide current navigation and reveal mean nav link
                    jQuery(meanMenu).hide();
                    jQuery(".meanmenu-reveal").show();
                    
                    // turn 'X' on or off 
                    jQuery(meanRevealClass).html(meanMenuOpen);
                    $navreveal = jQuery(meanRevealClass);
                    
                    //hide mean-nav ul
                    jQuery('.mean-nav ul').hide();
                    // hide sub nav
                    if(meanShowChildren) {
                    	jQuery('.mean-nav ul ul').show();
                    } else {
                    	jQuery('.mean-nav ul ul').hide();
                    }
                    $navreveal.removeClass("meanclose");
                    $navreveal.toggle(
                    function (e) {
                        e.preventDefault;
                        $navreveal.toggleClass("meanclose");
                        $navreveal.css("text-align", "center");
                        $navreveal.css("text-indent", "0");
                        $navreveal.css("font-size", meanMenuCloseSize);
                        meanInner();
                        jQuery('.mean-nav ul:first').slideDown();                                                
                    }, function (e) {
                        e.preventDefault;
                        $navreveal.html(meanMenuOpen);
                        $navreveal.toggleClass("meanclose");
                        meanInner();
                        jQuery('.mean-nav ul:first').slideUp();
                        
                    });
                } else {
                	meanOriginal();
                }	
            } 
            showMeanMenu();
            if (!isMobile) {
                //reset menu on resize above meanScreenWidth
                jQuery(window).resize(function () {
                    currentWidth = jQuery(window).width();
                    if (currentWidth > meanScreenWidth) {
                        meanOriginal();
                    } else {
                    	meanOriginal();
                    }	
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    } else {
                    	meanOriginal();
                    }	
                });
            }

       		// adjust menu positioning on centered navigation     
            window.onorientationchange = function() {
            	meanCentered();
            }
            
        });
    };
})(jQuery);