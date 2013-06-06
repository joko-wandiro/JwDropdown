/*
Jwdropdown ( Jquery Dropdown Menu ) by Joko Wandiro
Description: Support Dropdown Menu for NavBar Bootstrap Twitter Hover on Desktop, Click on Tablet, Mobile.
Click can be set on Specific Screen Device - Default Set Hover for Navbar Menu.
Version: 1.0.0
License: http://creativecommons.org/licenses/by-nc-sa/3.0/
Free for Private and Commercial Project
*/
( function($){
$.fn.jwdropdown= function(options){
//	console.log(options);
	var settings= {
	selector: null,
	clickOnScreen: 768, // Numeric or Integer - Set Navbar be clickable on xxxpx screen size
	destroy: function(){
//		console.log("destroy");
		this.selector.off('click.jdropdown');
		this.selector.parent().off('mouseover.jdropdown').off('mouseleave.jdropdown').removeClass('open');
	},
	setBaseDevices: function(){
		screenWidth= $(window).width();
//		console.log(this.selector);
//		console.log(screenWidth + "->" + settings.clickOnScreen);
		if( screenWidth > settings.clickOnScreen ){
			this.destroy();
//			console.log("hover");
			$(this.selector).parent().on('mouseover.jdropdown', this.dropdown_mouseenter);
			$(this.selector).parent().on('mouseleave.jdropdown', this.dropdown_mouseleave);
		}else{
			this.destroy();
//			console.log("click");
			this.selector.on('click.jdropdown', this.dropdown_click);
		}
	},
	dropdown_click: function(e){
		e.preventDefault();
		$parentElem= $(e.target).parent();
//		console.log($(e.target));
		if( ! $parentElem.hasClass('open') ){
			$parentElem.siblings().removeClass('open').end().addClass('open');
//			.find('ul').show();
		}else{
			$parentElem.removeClass('open');
//			.find('ul').hide();
			
		}
		return false;
	},
	dropdown_mouseenter: function(e){
		$parentElem= $(e.target).parent();
//		console.log($(e.target));
//		console.log("mouseenter");
		if( ! $parentElem.hasClass('open') ){
			$parentElem.addClass('open');
		}
	},
	dropdown_mouseleave: function(e){
		$parentElem= $(e.target).parent();
//		console.log($parentElem);		
		if( ! $parentElem.is('li.dropdown') ){
//			console.log("no li.dropdown");
			$parentElem= $parentElem.parent().parent();
		}		
		if( $parentElem.hasClass('open') ){
//			console.log("mouseleave");
//			console.log($(e.target));
			$parentElem.removeClass('open');
		}
	}
	};
	
	settings.selector= this;
	if( $.isPlainObject(options) ){
		settings= $.extend(settings, options);
	}	
	
	if( options === "destroy" ){
		settings.destroy();
		return;
	}
	
	$obj= this;
	$obj.addClass('jdropdown');
	$obj.each( function(){
		$elem= $(this);
		$elem.parent().find('ul').css({'margin-top': '0px'});
		$elem.on('click.jdropdown', settings.dropdown_click);
	});
	
	$('body').on('click.jdropdown', function(e){
		$(this).find('.jdropdown').parent().removeClass('open');
	});
	
	settings.setBaseDevices();
	$(window).resize( function(){
		settings.setBaseDevices();
	});
}
}(jQuery));
