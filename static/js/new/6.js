(function ($) {
	$(document).ready(function () {
		rbtAjax();
	});

	// ajax used to request php file
	function rbtAjax() {
		var rbtTheme = $('.rbt-toolbar').data("theme");
		var rbtFeatured = $('.rbt-toolbar').data("featured");
		var rbtButtonPosition = $('.rbt-toolbar').data("button-position");
		var rbtButtonHorizontal = $('.rbt-toolbar').data("button-horizontal");
		var rbtButtonAlt = $('.rbt-toolbar').data("button-alt");

		$.ajax({
			url: 'https://toolbar.qodeinteractive.com/templates/profile.php',
			type: "GET",
			data: {
				theme: rbtTheme,
				featured: rbtFeatured,
				btnpos: rbtButtonPosition,
				btnhorizontal: rbtButtonHorizontal,
				btnalt: rbtButtonAlt
			},
			success: function (data) {
				$('.rbt-toolbar').html(data);
				rbtLazyLoad();
				rbtListToggle();
				rbtSmoothScrollCompatibility();
				showList();
				rbtLoadScript('https://toolbar.qodeinteractive.com/_toolbar/assets/js/mc-validate.js');
			}
		});
	}

	function rbtLoadScript(url, onSuccess) {
		jQuery.ajax({
			url: url,
			dataType: 'script',
			success: onSuccess,
			async: true
		});
	}

	// lazy-load
	function rbtLazyLoad() {
		var opener = $('.rbt-theme-dropdown .rbt-btn');

		// initial load
		$('.rbt-list .rbt-lazy').lazy({
			appendScroll: $('.rbt-list'),
		});

		// load rest on click
		opener.on('click', function () {
			$('.rbt-list .rbt-lazy').lazy({
				bind: "event",
				delay: 0,
			});
		});
	}

	// open/close logic
	function rbtListToggle() {
		var opener = $('.rbt-theme-dropdown .rbt-btn'),
			list = $('.rbt-sidearea'),
			splitScreenPresent = typeof $.fn.multiscroll !== 'undefined' && typeof $.fn.multiscroll.setMouseWheelScrolling !== 'undefined';

		var toggleList = function () {
			opener.on('click', function () {
				if (list.hasClass('rbt-active')) {
					list.removeClass('rbt-active');
					splitScreenPresent && $.fn.multiscroll.setMouseWheelScrolling(true);
				} else {
					list.addClass('rbt-active');
					splitScreenPresent && $.fn.multiscroll.setMouseWheelScrolling(false);
				}

				if (list.hasClass('rbt-scrolled')) {
					list.removeClass('rbt-scrolled');
				}
			});
		};

		var currentScroll = $(window).scrollTop();
		$(window).scroll(function () {
			var newScroll = $(window).scrollTop();
			if (Math.abs(newScroll - currentScroll) > 1000) {
				if (list.hasClass('rbt-active')) {
					list.removeClass('rbt-active');
					splitScreenPresent && $.fn.multiscroll.setMouseWheelScrolling(true);
				}

				if (!list.hasClass('rbt-scrolled')) {
					list.addClass('rbt-scrolled');
				}
			}
		});

		var clickAwayClose = function () {
			$(document).on('click', function (e) {
				if (!list.is(e.target) &&
					list.has(e.target).length === 0 &&
					list.hasClass('rbt-active')) {
					list.removeClass('rbt-active');
					splitScreenPresent && $.fn.multiscroll.setMouseWheelScrolling(true);
				}
			});
		};

		// init
		if (opener.length) {
			toggleList();
			clickAwayClose();
		}
	}

	// smooth-scroll compatibility
	function rbtSmoothScrollCompatibility() {
		var smoothScrollEnabled = $('body[class*="smooth-scroll"]').length || $('body[class*="smooth_scroll"]').length;

		if (smoothScrollEnabled && !$('html').hasClass('touch')) {
			var opener = $('.rbt-theme-dropdown .rbt-btn'),
				list = $('.rbt-sidearea');

			var disableScroll = function () {
				window.removeEventListener('mousewheel', smoothScrollListener, false);
				window.removeEventListener('DOMMouseScroll', smoothScrollListener, false);
			};

			var enableScroll = function () {
				window.addEventListener('mousewheel', smoothScrollListener, false);
				window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
			};

			opener
				.on('click', function () {
					setTimeout(function () {
						list.hasClass('rbt-active') ? disableScroll() : enableScroll();
					}, 100);
				});

			list
				.on('mouseenter', function () {
					list.hasClass('rbt-active') && disableScroll();
				})
				.on('mouseleave', function () {
					enableScroll();
				});

		}
	}

	// initial load class
	function showList() {
		var list = $('.rbt-sidearea');

		list.length && list.addClass('rbt-loaded');
	}
})(jQuery);