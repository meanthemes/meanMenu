(function( $ ) {
	"use strict";
	$.fn.meanmenu = function( options ) {
		var defaults = {
			meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
			meanBarColour: "#0c1923", // override CSS colour for the bar background
			meanNavColour: "inherit", // override CSS colour for the menu background
			meanMenuClose: "x", // single character you want to represent the close menu button
			meanMenuOpen: "≡", // text/markup you want when menu is closed
			meanRevealPosition: "right", // left right or center positions
			meanRevealPositionDistance: "0", // Tweak the position of the menu
			meanRevealColour: "none", // override CSS colour for the reveal background
			meanScreenWidth: "640", // set the screen width you want meanmenu to kick in at
			meanNavPush: false, // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
			meanShowChildren: true, // true to show children in the menu, false to hide them
			meanExpandableChildren: true, // true to allow expand/collapse children
			meanExpand: "+", // single character you want to represent the expand for ULs
			meanContract: "-", // single character you want to represent the contract for ULs
			meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
			onePage: false, // set to true for one page sites
			removeElements: null, // set to hide page elements
			meanDisplay: "block" // override display method for table cell based layouts e.g. table-cell
		};

		options = $.extend( defaults, options );

		var currentWidth = window.innerWidth || document.documentElement.clientWidth;
		var meanMenu = this;
		var meanContainer = options.meanMenuContainer;
		var meanBarColour = options.meanBarColour;
		var meanNavColour = options.meanNavColour;
		var meanMenuClose = options.meanMenuClose;
		var meanMenuOpen = options.meanMenuOpen;
		var meanRevealPosition = options.meanRevealPosition;
		var meanRevealPositionDistance = options.meanRevealPositionDistance;
		var meanRevealColour = options.meanRevealColour;
		var meanScreenWidth = options.meanScreenWidth;
		var meanNavPush = options.meanNavPush;
		var meanShowChildren = options.meanShowChildren;
		var meanExpandableChildren = options.meanExpandableChildren;
		var meanExpand = options.meanExpand;
		var meanContract = options.meanContract;
		var meanRemoveAttrs = options.meanRemoveAttrs;
		var onePage = options.onePage;
		var meanDisplay = options.meanDisplay;
		var removeElements = options.removeElements;

		return this.each(function() {
			var menuOn = false;
			var menuOpen = false;

			// set menu reveal placement
			function placeReveal( meanRevealPosition ) {
				var meanRevealPos;
				switch( meanRevealPosition ) {
					case "right" :
					meanRevealPos = {right: meanRevealPositionDistance, left: "auto"};
					break;

					case "left" :
					meanRevealPos = {left: meanRevealPositionDistance, right: "auto"};
					break;

					case "center" :
					meanRevealPos = {left: ((currentWidth/2)-22) + "px", right: "auto"};
					break;
				}

				return meanRevealPos;
			};

			// set menu reveal glyph
			function toggleRevealVisual() {
				var glyph = $( ".mean-reveal", meanContainer ).is( ".mean-reveal.meanclose" ) ? meanMenuClose :  meanMenuOpen;
				$( ".mean-reveal", meanContainer ).html( glyph );
			};

			// re-instate original nav (and call this on window.width functions)
			function showMeanOriginal() {
				menuOn = false;
				$( ".mean-bar, .mean-push" ).remove();
				$( meanContainer ).removeClass( "mean-container" );
				$( removeElements ).removeClass( "mean-remove" );
				$( meanMenu ).css( "display", meanDisplay );
			};

			// navigation reveal
			function showMeanMenu() {
				menuOn = true;
				var meanBarStyles = {backgroundColor: meanBarColour};
				var meanRevealStyles = $.extend({}, placeReveal( meanRevealPosition ), {backgroundColor: meanRevealColour} );
				var meanNavStyles = {backgroundColor: meanNavColour};
				
				var meanBar = $( '<div />' ).addClass( "mean-bar" ).css( meanBarStyles );
				$( '<a href="#nav" title="Toggle navigation" />' ).addClass( "mean-reveal" ).css( meanRevealStyles ).appendTo( meanBar );
				$( '<nav />' ).addClass("mean-nav").css( meanNavStyles ).appendTo( meanBar );

				$( meanContainer ).addClass( "mean-container" ).prepend( meanBar );

				// copy meanMenu navigation into .mean-nav
				$( ".mean-nav", meanContainer ).html( $( meanMenu ).html() );
				
				// add classes for things that will be hidden when mean menu is displayed
				$( removeElements ).addClass( "mean-remove");

				// remove all classes from EVERYTHING inside meanmenu nav
				meanRemoveAttrs && $( "nav.mean-nav ul, nav.mean-nav ul *", meanContainer )
					.removeAttr( "id" )
					.not( ".mean-remove" )
					.removeAttr( "class" );

				// push in a holder div (this can be used if removal of nav is causing layout issues)
				meanNavPush && $( '<div class="mean-push" />' )
					.css( "margin-top", meanNavPush )
					.insertBefore( meanMenu );
				
				// hide current navigation
				$( meanMenu ).hide();
				
				// hide mean-nav ul
				$( ".mean-nav ul", meanContainer ).hide();
				
				// toggle, show, or hide sub nav
				if( meanShowChildren && meanExpandableChildren ) {
					$( ".mean-nav ul ul", meanContainer ).each( function() {
						if( $( this ).children().length ) {
							$( this ).parent().append( '<a href="#" title="Toggle submenu" class="mean-expand">' + meanExpand + '</a>' );
						}
					} );
				}
				else {
					$( ".mean-nav ul ul", meanContainer ).toggle( meanShowChildren );
				}

				$( ".mean-reveal", meanContainer ).click( function( e ) {
					e.preventDefault();

					menuOpen = !menuOpen;
					$( ".mean-nav ul:first", meanContainer ).slideToggle();
					$( ".mean-reveal" ).toggleClass( "meanclose" );
					toggleRevealVisual();
				} );

				// for one page websites, reset all variables...
				onePage && $( ".mean-nav ul > li > a:first-child", meanContainer).click( function() {
					menuOpen = false;
					$( ".mean-nav ul:first", meanContainer ).slideUp();
					$( ".mean-reveal", meanContainer ).toggleClass( "meanclose" );
					toggleRevealVisual();
				} );
			};

			function applyMean() {
				currentWidth = window.innerWidth || document.documentElement.clientWidth;

				if( currentWidth <= meanScreenWidth && !menuOn ) {
					showMeanMenu();
					toggleRevealVisual();
				}
				else if( currentWidth > meanScreenWidth && menuOn ) {
					showMeanOriginal();
				}
			}

			// defer submenu expansion
			$( meanContainer ).on( "click", ".mean-expand", function( e ) {
				e.preventDefault();

				var closing = $(this).hasClass( "mean-clicked" );
				$( this )
					.toggleClass( "mean-clicked" )
					.text( closing ? meanExpand : meanContract )
					.prev( "ul" )
					.slideToggle();
			} );

			// reset menu on resize above meanScreenWidth
			$(window).resize( function() {
				applyMean();
			} );

			applyMean();
		} );
	};
} )(jQuery);
