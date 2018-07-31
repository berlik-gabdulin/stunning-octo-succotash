if ($('#map').length) {
	function initMap() {
		var	element = document.getElementById('map');
		var	dataLat = parseInt($('.map').attr('data-lat'));
		var	dataLng = parseInt($('.map').attr('data-lng'));
		var	pinPosition = {lat: dataLat, lng: dataLng};
		var	options = {
			zoom: 12,
			center: pinPosition
		};
		var	myMap = new google.maps.Map(element, options);
		var	marker = new google.maps.Marker({
			position: pinPosition,
			map: myMap,
			icon: '../img/pin.png'
		});
		var	InfoWindow = new google.maps.InfoWindow({
			content: '',

		})
	}
}

function resizeHandler() {
	var mvp = document.getElementById('main-viewport'),
	content = 'width=device-width',
	scale = '1.0';

	// if (screen.width > 480) {
	// 	content = 'width=1140';
	// 	scale = '1.0';
	// }

	mvp.setAttribute('content', content);
	mvp.setAttribute('inital-scale', scale);
}

window.onload = resizeHandler;
window.onresize = resizeHandler;


$(window).on('resize orientationchange', function () {
	$('.slider-resize-fix').slick('resize');
});

$(document).ready(function () {

	var x = 0;
	$('.profile__btn').click(function() {
		if (x == 0) {
			$('.profile__menu, .profile__btn').addClass('active');
			x = 1;
		} else {
			$('.profile__menu, .profile__btn').removeClass('active');
			x = 0;
		}
	});

	var y = 0;
	$('.menuTgl, .nav__link').click(function() {
		if (x == 0) {
			$('.navbar, .nav, .menuTgl, body').addClass('active');
			x = 1;
		} else {
			$('.navbar, .nav, .menuTgl, body').removeClass('active');
			x = 0;
		}
	})

	$('.popup').magnificPopup({
		fixedContentPos: 'true',
		closeBtnInside: 'true',
		ShowCloseBtn: 'true'
	});

	$('.calendar__month').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true
	});
	
	setTimeout(function() {
		$('.bars__bar').each(function(){
			var height = $(this).attr('data-height');
			$(this).find('span').css('height', height + '%');
		})
	}, 1000);

	$( ".vslider3" ).slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 60,
		slide: function( event, ui ) {
			$( "#amount" ).val( ui.value );
		}
	});
	$( ".vslider2" ).slider({
      orientation: "vertical",
      range: true,
      values: [ 17, 67 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
	$( ".vslider1" ).slider({
      orientation: "vertical",
      range: true,
      values: [ 47, 90 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });

	$(".callbackInput[type='tel']").mask("+7 (999) 999 99 99");

	$( function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	} );
	$('#video1').gVideo();

	$('.musicPlayer__progressbar').slider({
		value: 60,
		orientation: "horizontal",
		range: "min",
		animate: true
	});

	$('.slider').slick({
		slidesToScroll:1,
		slidesToShow: 1,
		dots: true,
		arrows:true
	})

	$('.news__tab').click(function() {
		$('.news__tab, .news__contentBox').removeClass('active');
		$(this).addClass('active');
		var target = $(this).attr('data-target');
		$(target).addClass('active');
	})


	// Форма обратной связи
	$(".callbackInputWrp button.submit").on('click', function() {
		$(document).on('click','.popupform.call-popup .mfp-close', function () {
			$.magnificPopup.close();
		});

		var form = $(this).closest("form");
		var submitButton = $(this);
		var handlerUrl = 'handler.php';

		submitButton.prop('disabled', true).addClass('buttonDisabled');

		$.ajax({
			type: "POST",
			url: handlerUrl,
			data: form.serialize(),
			error: function(response) {
				submitButton.prop('disabled', false);
			},
			success: function (response) {
				if (Array.isArray(response)) {

					form.find("input").each(function(index) {
						$(this).removeClass('err_input');
					});

					for (i = 0; i < response.length; i++) {
						form.find('input[name="' + response[i] + '"]').addClass('err_input');
					}
				} else {
					form.find('.success').css('display', 'block');

					form.find("input").each(function(index) {
						if (!$(this).hasClass('button'))
							$(this).val('');
						$(this).removeClass('err_input');
					});

					// open popup when success
					$.magnificPopup.close();
					$.magnificPopup.open({
						items: {
							src: '#popupformthanks',
							type: 'inline'
						},
						callbacks: {
							open: function() {
								console.log("open");
								$('.popupform.call-popup').show();
							},
							close: function() {
								console.log("close");
								$(".popupform.call-popup").css("display", "none");
							}
						},
						showCloseBtn : true,
						fixedContentPos : false,
						closeOnBgClick : true,
					});
				}
				submitButton.prop('disabled', false).removeClass('buttonDisabled').addClass('buttonSuccess');
			}
		});
		return false;
	});

});