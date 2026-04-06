 var topRange      = 200,  // measure from the top of the viewport to N pixels down
     edgeMargin    = 150,   // margin above the top or margin from the end of the page
	 positioningOffset = 0;
     animationTime = 500, // time in milliseconds
     contentTop = [];
var isMatch = false
var isHeaderOpen = true;
var isFooterOpen = true;

$(document).ready(function(){
	//Social icons hover animation
	$('#social_icons li').hover(function() {
		$(this).stop().animate({ top: -17 }, 200);
	},
	function() {
		$(this).stop().animate({ top: 0 }, 200);
	})

	//---------------------------------------------------------------------
	$('.arrow_container').css( {backgroundPosition: "0px -36px"} );
	function enableFooterClick()
	{
		$('.footer_arrow').click(function(){
		//console.log(isFooterOpen);
			if(isFooterOpen == false)
			{
				$('.footer_arrow').animate({
					marginTop: 4
				}, 500);
				
				$('#footer').stop().animate({
					bottom: 0
				}, 500)
				isFooterOpen = true;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px -36px'
				}, 500);
			}else{
				$('.footer_arrow').delay(500).animate({
					marginTop: -25
				}, 500);
				
				$('#footer').stop().animate({
					bottom: -29
				}, 500)
				isFooterOpen = false;
				$('.arrow_container').stop().animate({
					backgroundPosition: '0px 0px'
				}, 500);
			}
		})
	}
	setTimeout(function()
	{
		$('#footer').stop().animate({
			queue: false,
			bottom: -29
		}, 500)
		$('.footer_arrow').delay(500).animate({
				marginTop: -25
			}, 500, function(){
				enableFooterClick();
			});
			
		$('.arrow_container').stop().animate({
			backgroundPosition: '0px 0px'
		}, 500)
		isFooterOpen = false;
	}, 1500);
	
	//================================
	$('body').mousemove(function(){
		if(isHeaderOpen == false)
		{
			$('#header').animate({
				top: 0
			}, 500, function(){
				//$('#header').stop();
			});
			positioningOffset = 0;
			isHeaderOpen = true;
			
			if($.browser.opera)
			{
				$("html:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - $('#header').height() + 35}, animationTime );
			}
			else
			{
				$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: $(window).scrollTop() - $('#header').height() + 35}, animationTime );
			}
		}
	});
	//===============================
	
	$('#image-grid').fGallery('#filter');
	
	$("a.zoom").fancybox({
		'opacity'		: true,
		'overlayColor'	: '#000',
		'overlayOpacity' : 0.8,
		'centerOnScroll' : false,
		'titlePosition'	: 'over',
		'onComplete'	:	function() {
			$("#fancybox-title").hide();
			$("#fancybox-wrap").hover(function() {
				$("#fancybox-title").show();
			}, function() {
				$("#fancybox-title").hide();
			});
		}
	});
	$("a.vimeo").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("([0-9])","i"),'moogaloop9f1a.html?clip_id=$1'),
			'type'          : 'swf'
		});
		return false;
	})
	
	$("a.youtube").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("watch\\?v=","i"),'v/index.html'),
			'type'          : 'swf'
		});
		return false;
	})
	
	// Set up content an array of locations
	$('#nav').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
	})
	// adjust navigation menu
	$(window).scroll(function(){
		var winTop = $(window).scrollTop(),
		bodyHt = $(document).height(),
		vpHt = $(window).height() + edgeMargin;  // viewport height + margin
		
		$.each( contentTop, function(i,loc){
			if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){
				$('#nav li').removeClass('current').eq(i).addClass('current');
				currentSection = i;
				s = i;
			}
		})
	})
	//
	var nameVal = $('#name').val();
	
	$('#name').focus(function(){
		if($(this).val() == nameVal)
		{
			$(this).val('');
		}
	});
	
	$('#name').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(nameVal);
		}
	});
	//==================================================================
	var emailVal = $('#email').val();
	
	$('#email').focus(function(){
		if($(this).val() == emailVal)
		{
			$(this).val('');
		}
	});
	
	$('#email').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(emailVal);
		}
	});
	//==================================================================
	var messageVal = $('#message').val();
	
	$('#message').focus(function(){
		if($(this).val() == messageVal)
		{
			$(this).val('');
		}
	});
	
	$('#message').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(messageVal);
		}
	});
	//------------------------------
	$('#contact_form').submit(function(){
		$('.name_error, .email_error, .message_error').remove();
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#email").val();
		
		if($("#name").val() == '' || $("#name").val() == nameVal) 
		{
			$("#name").after('<span class="name_error">*</span>');
			return false; 
        }else{
			$('.name_error').remove();
		}
		//
        if(emailaddressVal == '' || emailaddressVal == emailVal) 
		{
            $("#email").after('<span class="email_error">*</span>');
			return false; 
        }
        else if(!emailReg.test(emailaddressVal)) 
		{
            $("#email").after('<span class="email_error">*</span>');
			return false; 
        }else{
			$('.email_error').remove();
		}
		//
		if($("#message").val() == '' || $("#message").val() == messageVal) 
		{
			
            $("#message").after('<span class="message_error">*</span>');
			return false; 
        }else{
			$('.message_error').remove();
		}
		$.ajax({
			type        : "POST",
			cache       : false, 
			url         : "contactform.php",
			data        : $(this).serializeArray(),
			success: function(data) {
				$.fancybox(data,{
					'opacity'		: true,
					'overlayColor'	: '#000',
					'overlayOpacity' : 0.8,
					'centerOnScroll' : false,
					'titlePosition'	: 'over'
				});
			}
		});
		return false;
	});
	//==================================================================
	var subscribeVal = $('#subscribtion').val();
	
	$('#subscribtion').focus(function(){
		if($(this).val() == subscribeVal)
		{
			$(this).val('');
		}
	});
	
	$('#subscribtion').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(subscribeVal);
		}
	});
	
	var subscribeVal = $("#subscribtion").val();
	
	$('#subscribe').submit(function(){
	
		var hasError = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
 
        var emailaddressVal = $("#subscribtion").val();
        if(emailaddressVal == '') 
		{
            hasError = true;
        }
 
        else if(!emailReg.test(emailaddressVal)) 
		{
            hasError = true;
        }
 
        if(hasError == true) { 
			$("#subscribtion").after('<span class="subscribe_error">*</span>');
			return false; 
		}
	});
	//==================================================================
	var matchArr = new Array();
	var n = 0;
	var selection = 'p, h1, h2, h3, h4, h5, ';
	var searchVal = $('#search').val();
	
	$('#search').focus(function(){
		if($(this).val() == searchVal)
		{
			$(this).val('');
			$(selection).highlightRegex();
		}
	});
	
	$('#search').focusout(function(){
		if($(this).val() == '' )
		{
			$(this).val(searchVal);
		}
	});
	
	$('#search').keyup(function(){
		
		n = 0;
		matchArr = new Array();
		//
		$(selection).highlightRegex();
		//
		if($(this).val() != '' && $(this).val().length > 2) {
			
			$(selection).highlightRegex(new RegExp($(this).val(), 'ig'));

			
			$('.highlight').each(function(){
			
				if($(this).is(":visible") && $(this).parents().css('visibility') != 'hidden')
				{
					//console.debug($(this));
					var topOffset = $(this);
					matchArr.push(topOffset);
				}
			});
			
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}

			if(matchArr.length > 2)
			{
				matchArr[0].attr('id', 'current_match');
				$("#next").fadeIn("slow");
			}
			else
			{
				//$("#next").fadeOut("slow");
			}
			//=================================
			if(matchArr.length > 0)
			{
				animateScroll();
				isMatch = true;
			}
			if(matchArr.length < 1)
			{
				isMatch = false;
			}
			n = 1;
			//$('#trace').text(matchArr.length);
		}
		else
		{
			//$("#next").fadeOut("slow");
		}
	})
	
	if(!isMatch)
	{
		$('#next').css('cursor', 'pointer');
		$('#next').click(function(){

			setIdToMatch(n);
			animateScroll();
			
			//$('#trace').text(n + " : " + (matchArr.length - 1));
			
			n++;
			
			if(n > matchArr.length - 1)
			{
				n = 0;
			}
			
		});
		
		function setIdToMatch(num)
		{
			for(var i = 0; i<matchArr.length; i++)
			{
				matchArr[i].removeAttr('id');
			}
			
			matchArr[num].attr('id', 'current_match');
		}
	}else{
		$('#next').css('cursor', 'auto');
	}
	
	function animateScroll()
	{
		var MatchElement = matchArr[n];
   		var destination = $(MatchElement).offset().top - positioningOffset - 40;
		if($.browser.opera)
		{
			//$("html:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
   			$("html:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
		else
		{
			//$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination},{queue:false, duration:500, easing:"quadEaseInOut"});
			$("html:not(:animated),body:not(:animated)").animate({ queue:false, scrollTop: destination}, 500);
		}
	}
	//console.debug('ready')
})

//Innitiating Nivo slider
$(window).load(function(){ 	
	$('.nivoSlider').nivoSlider({
		directionNavHide:true,
		controlNav:false
	});
})

//Site scroll
$(function(){
	$('#nav a, .inline_navigation').click(function(e){
   		var elementClicked = $(this).attr("href");
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		return false;
	});
});
//zoomable images hover animation

$(function() {
	$('a.zoom, a.vimeo, a.youtube').each(function() {
	/*$(this).append('<div style="position:absolute; top:5px; left:5px; width:200px; height:150px; background:red;"></div>');*/
		$(this).hover(function(){
			$(this).find('img').stop().animate({
				opacity: 0.8
			})
		},function(){
			
			$(this).find('img').stop().animate({
				opacity: 1
			})
		});
	});
});


//Go up buttons hover animation
/*$(function() {
$('.go_up').each(function() {
	$(this).hover(
		function() {
			$(this).stop().animate({ opacity: 0.5 }, 500);
		},
		function() {
			$(this).stop().animate({ opacity: 1 }, 500);
		})
	});
});*/
//Scrolling the page when go up button is clicked
$(function(){
	$('.go_up').click(function(){
		var elementClicked = $(this).attr("href");
   		var destination = $(elementClicked).offset().top - positioningOffset;
		if($.browser.opera)
		{
   			$("html:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		else
		{
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, animationTime );
		}
		
		return false;
	});
});
//Key navigation
var s = 0;
$(document).keyup(function (e) {
	if ($(e.target).is(':not(input, textarea)')) {
		positioningOffset = -95;
		
		function _scroll()
		{
			$('html,body').stop();
			if($.browser.opera)
			{
				$("html:not(:animated)").stop().animate({ scrollTop: contentTop[s] - positioningOffset}, animationTime );
			}
			else
			{
				$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: contentTop[s] - positioningOffset}, animationTime );
			}
		}
		//
		function _scrollByChar(theChar)
		{
			if(e.keyCode >= 65 && e.keyCode <= 90)
			{
				var convertToDataValue = $('body').find(".section[data-key="+ theChar +"]");
				if($(convertToDataValue).get(0) != undefined)
				{
					var destination = $(convertToDataValue).offset().top - positioningOffset;
					
					$('html,body').stop();
					
					if($.browser.opera)
					{
						$("html:not(:animated)").stop().animate({ scrollTop: destination}, animationTime );
					}
					else
					{
						$("html:not(:animated),body:not(:animated)").stop().animate({ scrollTop: destination}, animationTime );
					}
				}
			}
		}
		
		var chr = String.fromCharCode(e.keyCode || e.which);
		_scrollByChar(chr);

		var keyCode = e.keyCode || e.which,
			arrow = {left: 37, right: 39 };

		switch (keyCode) {
			case arrow.left:
			if(s > 0)
			{
				s--;
				_scroll();
			}
			break;
			case arrow.right:
			if(s < contentTop.length - 1)
			{
				s++;
				_scroll();
			}
			break;
		}
		//
		if(isHeaderOpen == true)
		{
			$('#header').stop().animate({
				top: 0 - $('#header').height() + 35
			}, 500, function(){
				isHeaderOpen = false;
			})
			$('.arrow_container').stop().animate({
				backgroundPosition: '0px -36px'
			}, 500)
		}
		$('#footer').animate({
				bottom: -29
		}, 500)
		$('.arrow_container').stop().animate({
			backgroundPosition: '0px 0px'
		}, 500)
		$('.footer_arrow').delay(500).animate({
				marginTop: -25
			}, 500);
		isFooterOpen = false;
		
	}
});