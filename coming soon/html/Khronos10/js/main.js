/** 
 * ===================================================================
 * Main js
 *
 * ------------------------------------------------------------------- 
 */

(function ($) {

	"use strict";

	/* --------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function () {
		// will first fade out the loading animation 
		$("#loader").fadeOut("slow", function () {

			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(300).fadeOut("slow");

		});
	})


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();


	/* --------------------------------------------------- */
	/*  Vegas Slideshow
	------------------------------------------------------ */
	$(".home-slides").vegas({
		transition: 'fade',
		transitionDuration: 2500,
		delay: 5000,
		slides: [
			{ src: "images/slides/03.jpg" },
			{ src: "images/slides/02.jpg" },
			{ src: "images/slides/01.jpg" }
		]
	});


	/* --------------------------------------------------- */
	/*  Particle JS
	------------------------------------------------------ */
	$('.home-particles').particleground({
		dotColor: '#fff',
		lineColor: '#555555',
		particleRadius: 6,
		curveLines: true,
		density: 10000,
		proximity: 110
	});


	/*-----------------------------------------------------*/
	/* tabs
  	-------------------------------------------------------*/
	$(".tab-content").hide();
	$(".tab-content").first().show();

	$("ul.tabs li").click(function () {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab-content").hide();
		var activeTab = $(this).attr("data-id");
		$("#" + activeTab).fadeIn(700);
	});


	/*----------------------------------------------------*/
	/* Smooth Scrolling
	------------------------------------------------------*/
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});


	/* --------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()


	/*---------------------------------------------------- */
	/* ajaxchimp
	 ------------------------------------------------------ */

	// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'

	$('#mc-form').ajaxChimp({

		language: 'es',
		url: mailChimpURL

	});

	// Mailchimp translation
	//
	//  Defaults:
	//	 'submit': 'Submitting...',
	//  0: 'We have sent you a confirmation email',
	//  1: 'Please enter a value',
	//  2: 'An email address must contain a single @',
	//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
	//  4: 'The username portion of the email address is invalid (the portion before the @: )',
	//  5: 'This email address looks fake or invalid. Please enter a real email address'

	$.ajaxChimp.translations.es = {
		'submit': 'Submitting...',
		0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
	}


	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function (form) {

			var sLoader = $('#submit-loader');

			$.ajax({

				type: "POST",
				url: "inc/sendEmail.php",
				data: $(form).serialize(),
				beforeSend: function () {

					sLoader.fadeIn();

				},
				success: function (msg) {

					// Message was sent
					if (msg == 'OK') {
						sLoader.fadeOut();
						$('#message-warning').hide();
						$('#contactForm').fadeOut();
						$('#message-success').fadeIn();
					}
					// There was an error
					else {
						sLoader.fadeOut();
						$('#message-warning').html(msg);
						$('#message-warning').fadeIn();
					}

				},
				error: function () {

					sLoader.fadeOut();
					$('#message-warning').html("Something went wrong. Please try again.");
					$('#message-warning').fadeIn();

				}

			});
		}

	});


	/*----------------------------------------------------*/
	/* Final Countdown Settings
	------------------------------------------------------ */
	var finalDate = '2018/01/01';

	$('div#counter').countdown(finalDate)
		.on('update.countdown', function (event) {

			$(this).html(event.strftime('<div class=\"half\">' +
				'<span>%D <sup>days</sup></span>' +
				'<span>%H <sup>hours</sup></span>' +
				'</div>' +
				'<div class=\"half\">' +
				'<span>%M <sup>mins</sup></span>' +
				'<span>%S <sup>secs</sup></span>' +
				'</div>'));

		});

	/*----------------------------------------------------*/
	/* Timer
	------------------------------------------------------ */
	function timer() {
		var final = {};
		var ts2 = new Date("2019-08-19 10:20");
		ts2 = ts2.getTime();

		var ts1 = new Date();
		ts1 = ts1.getTime();
		var diff = (ts2 - ts1);

		var days = diff / (3600 * 1000 * 24);
		final.days = days.toFixed(0);

		var hours = parseFloat("0." + String(days).split(".")[1]);
		final.hours = (hours * 24).toFixed(0);

		var mins = parseFloat("0." + String(hours * 24).split(".")[1]);
		final.mins = (mins * 60).toFixed(0);

		var secs = parseFloat("0." + String(mins * 60).split(".")[1]);
		final.secs = (secs * 60).toFixed(0);
		// var hours =
		// console.log(final);
		$("#t-days").html(final.days + " <sup>days</sup>");
		$("#t-hours").html(final.hours + " <sup>hours</sup>");
		$("#t-mins").html(final.mins + " <sup>mins</sup>");
		$("#t-secs").html(final.secs + " <sup>secs</sup>");
	}
	setInterval(function () {
		timer()
	}, 1000);



})(jQuery);