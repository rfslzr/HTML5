$(function(){
	$('#beforeafter').beforeAfter({
			animateIntro : true,
			introDelay : 1000,
			introDuration : 500,
			showFullLinks : true
	});
	
	$('.flashinfo').popupWindow({ 
		height:530, 
		width:800, 
		centerBrowser:1 
	}); 
	
	
});




/*
 * jQuery beforeafter plugin
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.0
 * @date June 22, 2009
 * @category jQuery plugin
 * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-No Derivative Works 3.0 - http://creativecommons.org/licenses/by-nd/3.0/
 */
(function($){
	$.fn.extend({ 
		beforeAfter: function(options)
		{
			var defaults = 
			{
				animateIntro : false,
				introDelay : 1000,
				introDuration : 1000,
				showFullLinks : true
			};
		var options = $.extend(defaults, options);

		// var randID =  Math.round(Math.random()*100000000);
		var randID =  "";
	
    		return this.each(function() {
			var o=options;
			var obj = $(this);

			var imgWidth = $('img:first', obj).width();
			var imgHeight = $('img:first', obj).height();
			
			$(obj)
			.width(imgWidth)
			.height(imgHeight)
			.css({'overflow':'hidden','position':'relative','padding':'0'});
			
			// Preload images and assign them IDs
			var image1 = $('<img />').attr('src', $('img:first', obj).attr('src'));
			var image2 = $('<img />').attr('src', $('img:last', obj).attr('src'));
			$('img:first', obj).attr('id','beforeimage'+randID);
			$('img:last', obj).attr('id','afterimage'+randID);
			
			$('div', obj).css('float','left'); // Float all divs within the container left
			
			// Create an inner div wrapper (dragwrapper) to hold the images.
			$(obj).prepend('<div id="dragwrapper'+randID+'"><div id="drag'+randID+'"><img width="8" height="56" alt="handle" src="handle.gif" title="Drag me left or right to see the before and after images" id="handle'+randID+'" /></div></div>'); // Create drag handle
			$('#dragwrapper'+randID).css({'position':'absolute','padding':'0','left':(imgWidth/2)-($('#handle'+randID).width()/2)+'px','z-index':'20'}).width($('#handle'+randID).width()).height(imgHeight);
			$('#dragwrapper'+randID).css({'opacity':.25}); // Sets the dragwrapper and contents to .25 opacity
				
			$('div:eq(2)', obj).height(imgHeight).width(imgWidth/2).css({'position':'absolute','overflow':'hidden','left':'0px','z-index':'10'}); // Set CSS properties of the before image div
			$('div:eq(3)', obj).height(imgHeight).width(imgWidth).css({'position':'absolute','overflow':'hidden','right':'0px'});	// Set CSS properties of the after image div
			$('#drag'+randID).width(2).height(imgHeight).css({'background':'#888','position':'absolute','left':'3px'});	// Set drag handle CSS properties
			$('#beforeimage'+randID).css({'position':'absolute','top':'0px','left':'0px'});
			$('#afterimage'+randID).css({'position':'absolute','top':'0px','right':'0px'});
			$('#handle'+randID).css({'position':'relative','cursor':'w-resize','top':(imgHeight/2)-($('#handle'+randID).height()/2)+'px','left':'-3px'})
			
			$(obj).append('<img src="lt-small.png" width="7" height="15" id="lt-arrow'+randID+'"><img src="rt-small.png" width="7" height="15" id="rt-arrow'+randID+'">');

			if(o.showFullLinks)
			{	
				$(obj).after('<div class="balinks" id="links'+randID+'" style="position:relative"><span class="bflinks"><a id="showleft'+randID+'" href="javascript:void(0)">Show only before</a></span><span class="bflinks"><a id="showright'+randID+'" href="javascript:void(0)">Show only after</a></span></div>');
				$('#links'+randID).width(imgWidth);
				$('#showleft'+randID).css({'position':'relative','left':'0px'}).click(function(){
					$('div:eq(2)', obj).animate({width:imgWidth},200);
					$('#dragwrapper'+randID).animate({left:imgWidth-$('#dragwrapper'+randID).width()+'px'},200);
				});
				$('#showright'+randID).css({'position':'absolute','right':'0px'}).click(function(){
					$('div:eq(2)', obj).animate({width:0},200);
					$('#dragwrapper'+randID).animate({left:'0px'},200);
				});
			}

			var barOffset = $('#dragwrapper'+randID).offset(); // The coordinates of the dragwrapper div
			var startBarOffset = barOffset.left; // The left coordinate of the dragwrapper div
			var originalLeftWidth = $('div:eq(2)', obj).width();
			var originalRightWidth = $('div:eq(3)', obj).width();

			$('#dragwrapper'+randID).draggable({handle:$('#handle'+randID),containment:obj,axis:'x',drag: function(e, ui){
				var offset = $(this).offset();
				var barPosition = offset.left - startBarOffset;
				$('div:eq(2)', obj).width(originalLeftWidth + barPosition);
				$('#lt-arrow'+randID).stop().animate({opacity:0},50);
				$('#rt-arrow'+randID).stop().animate({opacity:0},50);
				}
			});

			if(o.animateIntro)
			{
				$('div:eq(2)', obj).width(imgWidth);
				$('#dragwrapper'+randID).css('left',imgWidth-($('#dragwrapper'+randID).width()/2)+'px');
				setTimeout(function(){
					$('#dragwrapper'+randID).css({'opacity':1}).animate({'left':(imgWidth/2)-($('#dragwrapper'+randID).width()/2)+'px'},o.introDuration,function(){$('#dragwrapper'+randID).animate({'opacity':.25},1000)});
					// The callback function at the end of the last line is there because Chrome seems to forget that the divs have overlay  hidden applied earlier
					$('div:eq(2)', obj).width(imgWidth).animate({'width':imgWidth/2+'px'},o.introDuration,function(){$('div:eq(2)', obj).css('overflow','hidden');clickit();});
				},o.introDelay);
			}
			else
			{
				clickit();
			}

			function clickit()
			{
				$(obj).hover(function(){
						$('#lt-arrow'+randID).stop().css({'z-index':'20','position':'absolute','top':imgHeight/2-$('#lt-arrow'+randID).height()/2+'px','left':parseInt($('#dragwrapper'+randID).css('left'))-10+'px'}).animate({opacity:1,left:parseInt($('#lt-arrow'+randID).css('left'))-6+'px'},500);
						$('#rt-arrow'+randID).stop().css({'position':'absolute','top':imgHeight/2-$('#lt-arrow'+randID).height()/2+'px','left':parseInt($('#dragwrapper'+randID).css('left'))+10+'px'}).animate({opacity:1,left:parseInt($('#rt-arrow'+randID).css('left'))+6+'px'},500);
						$('#dragwrapper'+randID).animate({'opacity':1},500);
					},function(){
						$('#lt-arrow'+randID).animate({opacity:0,left:parseInt($('#lt-arrow'+randID).css('left'))-6+'px'},500);
						$('#rt-arrow'+randID).animate({opacity:0,left:parseInt($('#rt-arrow'+randID).css('left'))+6+'px'},500);
						$('#dragwrapper'+randID).animate({'opacity':.25},500);
					}
				);

				// When clicking in the container, move the bar and imageholder divs
				$(obj).click(function(e){
					
					var clickX = e.pageX - this.offsetLeft;
					var img2Width = imgWidth-clickX;
					$('#dragwrapper'+randID).stop().animate({'left':clickX-($('#dragwrapper'+randID).width()/2)+'px'},600);
					$('div:eq(2)', obj).stop().animate({'width':clickX+'px'},600,function(){$('div:eq(2)', obj).css('overflow','hidden');}); // webkit fix for forgotten overflow
					$('#lt-arrow'+randID).stop().animate({opacity:0},50);
					$('#rt-arrow'+randID).stop().animate({opacity:0},50);
				});
				$(obj).one('mousemove', function(){$('#dragwrapper'+randID).stop().animate({'opacity':1},500);}); // If the mouse is over the container and we animate the intro, we run this to change the opacity since the hover event doesnt get triggered yet
			}
  		});
    	}
	});
})(jQuery);



(function($){ 		  
	$.fn.popupWindow = function(instanceSettings){
		
		return this.each(function(){
		
		$(this).click(function(){
		
		$.fn.popupWindow.defaultSettings = {
			centerBrowser:0, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
			centerScreen:0, // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
			height:500, // sets the height in pixels of the window.
			left:0, // left position when the window appears.
			location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
			menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
			resizable:0, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
			scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
			status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
			width:500, // sets the width in pixels of the window.
			windowName:null, // name of window set from the name attribute of the element that invokes the click
			windowURL:null, // url used for the popup
			top:0, // top position when the window appears.
			toolbar:0 // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
		};
		
		settings = $.extend({}, $.fn.popupWindow.defaultSettings, instanceSettings || {});
		
		var windowFeatures =    'height=' + settings.height +
								',width=' + settings.width +
								',toolbar=' + settings.toolbar +
								',scrollbars=' + settings.scrollbars +
								',status=' + settings.status + 
								',resizable=' + settings.resizable +
								',location=' + settings.location +
								',menuBar=' + settings.menubar;

				settings.windowName = this.name || settings.windowName;
				settings.windowURL = this.href || settings.windowURL;
				var centeredY,centeredX;
			
				if(settings.centerBrowser){
						
					if ($.browser.msie) {//hacked together for IE browsers
						centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (settings.height/2)));
						centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (settings.width/2)));
					}else{
						centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
						centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
					}
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else if(settings.centerScreen){
					centeredY = (screen.height - settings.height)/2;
					centeredX = (screen.width - settings.width)/2;
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else{
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top).focus();	
				}
				return false;
			});
			
		});	
	};
})(jQuery);
