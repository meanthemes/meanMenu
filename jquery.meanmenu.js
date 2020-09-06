(function( $ ) {
	"use strict";

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

	$.fn.meanmenu = function( options ) {
		options = $.extend( defaults, options );

		var meanMenu = this;

		return this.each(function() {
			var menuOn = false;
			var menuOpen = false;

			// set menu reveal placement
			function placeReveal( meanRevealPosition ) {
				var meanRevealPos;
				switch( meanRevealPosition ) {
					case "right" :
					meanRevealPos = {right: options.meanRevealPositionDistance, left: "auto"};
					break;

					case "left" :
					meanRevealPos = {left: options.meanRevealPositionDistance, right: "auto"};
					break;

					case "center" :
					meanRevealPos = {left: 0, right: 0, marginLeft: "auto", marginRight: "auto"};
					break;
				}

				return meanRevealPos;
			};

			// set menu reveal glyph
			function toggleRevealVisual() {
				var glyph = $( ".mean-reveal", options.meanMenuContainer ).is( ".mean-reveal.meanclose" ) ? options.meanMenuClose :  options.meanMenuOpen;
				$( ".mean-reveal", options.meanMenuContainer ).html( glyph );
			};

			// re-instate original nav (and call this on window.width functions)
			function showMeanOriginal() {
				menuOn = false;
				$( ".mean-bar, .mean-push" ).remove();
				$( options.meanMenuContainer ).removeClass( "mean-container" );
				$( options.removeElements ).removeClass( "mean-remove" );
				$( meanMenu ).css( "display", options.meanDisplay );
			};

			// navigation reveal
			function showMeanMenu() {
				menuOn = true;
				var meanBarStyles = {backgroundColor: options.meanBarColour};
				var meanRevealStyles = $.extend({}, placeReveal( options.meanRevealPosition ), {backgroundColor: options.meanRevealColour} );
				var meanNavStyles = {backgroundColor: options.meanNavColour};
				
				var meanBar = $( '<div />' ).addClass( "mean-bar" ).css( meanBarStyles );
				$( '<a href="#nav" title="Toggle navigation" />' ).addClass( "mean-reveal" ).css( meanRevealStyles ).appendTo( meanBar );
				$( '<nav />' ).addClass("mean-nav").css( meanNavStyles ).appendTo( meanBar );

				$( options.meanMenuContainer ).addClass( "mean-container" ).prepend( meanBar );

				// copy meanMenu navigation into .mean-nav
				$( ".mean-nav", options.meanMenuContainer ).html( $( meanMenu ).html() );
				
				// add classes for things that will be hidden when mean menu is displayed
				$( options.removeElements ).addClass( "mean-remove");

				// remove all classes from EVERYTHING inside meanmenu nav
				options.meanRemoveAttrs && $( "nav.mean-nav ul, nav.mean-nav ul *", options.meanMenuContainer )
					.removeAttr( "id" )
					.not( ".mean-remove" )
					.removeAttr( "class" );

				// push in a holder div (this can be used if removal of nav is causing layout issues)
				options.meanNavPush && $( '<div class="mean-push" />' )
					.css( "margin-top", options.meanNavPush )
					.insertBefore( meanMenu );
				
				// hide current navigation
				$( meanMenu ).hide();
				
				// hide mean-nav ul
				$( ".mean-nav ul", options.meanMenuContainer ).hide();
				
				// toggle, show, or hide sub nav
				if( options.meanShowChildren && options.meanExpandableChildren ) {
					$( ".mean-nav ul ul", options.meanMenuContainer ).each( function() {
						if( $( this ).children().length ) {
							$( this ).parent().append( '<a href="#" title="Toggle submenu" class="mean-expand">' + options.meanExpand + '</a>' );
						}
					} );
				}
				else {
					$( ".mean-nav ul ul", options.meanMenuContainer ).toggle( options.meanShowChildren );
				}

				$( ".mean-reveal", options.meanMenuContainer ).click( function( e ) {
					e.preventDefault();

					menuOpen = !menuOpen;
					$( ".mean-nav ul:first", options.meanMenuContainer ).slideToggle();
					$( ".mean-reveal" ).toggleClass( "meanclose" );
					toggleRevealVisual();
				} );

				// for one page websites, reset all variables...
				options.onePage && $( ".mean-nav ul > li > a:first-child", options.meanMenuContainer).click( function() {
					menuOpen = false;
					$( ".mean-nav ul:first", options.meanMenuContainer ).slideUp();
					$( ".mean-reveal", options.meanMenuContainer ).toggleClass( "meanclose" );
					toggleRevealVisual();
				} );
			};

			function applyMean() {
				var currentWidth = window.innerWidth || document.documentElement.clientWidth;

				if( currentWidth <= options.meanScreenWidth && !menuOn ) {
					showMeanMenu();
					toggleRevealVisual();
				}
				else if( currentWidth > options.meanScreenWidth && menuOn ) {
					showMeanOriginal();
				}
			}

			// defer submenu expansion
			$( options.meanMenuContainer ).on( "click", ".mean-expand", function( e ) {
				e.preventDefault();

				var closing = $(this).hasClass( "mean-clicked" );
				$( this )
					.toggleClass( "mean-clicked" )
					.text( closing ? options.meanExpand : options.meanContract )
					.prev( "ul" )
					.slideToggle();
			} );

			// reset menu on resize above options.meanScreenWidth
			$( window ).resize( function() {
				applyMean();
			} );

			applyMean();
		} );
	};
} )(jQuery);
