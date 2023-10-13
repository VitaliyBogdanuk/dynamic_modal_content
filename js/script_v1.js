"use strict";

// const token = 'IGQVJWVEtRaWRFa1hteFBRa3ctSHBBdE1ObTgyU0VTSHZAkN0liaVRNWHFqdnAxZA2pqdy04VUtnU1JKVklnVVZA6d3IyeGRLWmlRbXlRYTEwWGxmaVlJeEZAVRTVHVnNPZAEpKeEN5eUE4a0VRMjgxNS03bAZDZD';
// const id = '6450146028363591';

// async function fetchData() {
// 	try {
// 		const response = await fetch('https://graph.instagram.com/'+id+'/media?fields=id,caption,media_type,media_url,permalink&access_token='+token+'&q=funnycat');
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 	}
// }

// const firstFunctionPromise = new Promise(async (resolve) => {
// 	const lightGalleryGroup = document.getElementById('lightGalleryGroup');
// 	// const instaTagName = '#funnycat';
// 	const instaTagName = '#danceforlifevn';


// 	// Handle image click event
// 	let fetchedData = null;
// 	// Fetch data from JSON if it hasn't been fetched before
// 	if (!fetchedData) {
// 		fetchedData = await fetchData();
// 	}

// 	// Filter images based on the presence of the "#funnycat" tag in the caption
// 	const filteredData = fetchedData.data.filter(item => item.caption && item.caption.includes(instaTagName));

// 	// Add slides from the filtered data
// 	filteredData.forEach((item) => {
// 		if (item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') {
// 			let newAnchor = document.createElement("a");
// 			let newImage = document.createElement("img");
// 			newAnchor.className = "thumbnail-classic-img-link";
// 			newAnchor.href = item.media_url;
// 			newAnchor.dataset.lightgallery = "item";
// 			newImage.src = item.media_url;
// 			newImage.alt = "";
// 			newImage.width = 640;
// 			newImage.height = 489;
// 			newAnchor.appendChild(newImage);
// 			lightGalleryGroup.appendChild(newAnchor);
// 		}
// 	});
// 	resolve();
// });


(function () {
	// Global variables
	var
		userAgent = navigator.userAgent.toLowerCase(),
		initialDate = new Date(),

		$document = $(document),
		$window = $(window),
		$html = $("html"),
		$body = $("body"),

		isDesktop = $html.hasClass("desktop"),
		isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		windowReady = false,
		isNoviBuilder = false,
		livedemo = false,

		plugins = {
			customToggle: $('[data-custom-toggle]'),
			captcha: $('.recaptcha'),
			copyrightYear: $('.copyright-year'),
			lightGallery: $('[data-lightgallery="group"]'),
			lightGalleryItem: $('[data-lightgallery="item"]'),
			lightDynamicGalleryItem: $('[data-lightgallery="dynamic"]'),
			materialParallax: $('.parallax-container'),
			owl: $('.owl-carousel'),
			popover: $('[data-toggle="popover"]'),
			preloader: $('.preloader'),
			rdMailForm: $('.rd-mailform'),
			rdInputLabel: $('.form-label'),
			regula: $('[data-constraints]'),
			viewAnimate: $('.view-animate'),
			wow: $('.wow'),
			maps: $('.google-map-container')
		};

	/**
	 * @desc Check the element was been scrolled into the view
	 * @param {object} elem - jQuery object
	 * @return {boolean}
	 */
	function isScrolledIntoView(elem) {
		if (isNoviBuilder) return true;
		return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
	}

	/**
	 * @desc Calls a function when element has been scrolled into the view
	 * @param {object} element - jQuery object
	 * @param {function} func - init function
	 */
	function lazyInit(element, func) {
		var scrollHandler = function () {
			if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
				func.call(element);
				element.addClass('lazy-loaded');
			}
		};

		scrollHandler();
		$window.on('scroll', scrollHandler);
	}

	// Initialize scripts that require a loaded window
	$window.on('load', function () {
		// Page loader & Page transition
		if (plugins.preloader.length && !isNoviBuilder) {
			pageTransition({
				target: document.querySelector('.page'),
				delay: 0,
				duration: 500,
				classIn: 'fadeIn',
				classOut: 'fadeOut',
				classActive: 'animated',
				conditions: function (event, link) {
					return link && !/(\#|javascript:void\(0\)|callto:|tel:|mailto:|:\/\/)/.test(link) && !event.currentTarget.hasAttribute('data-lightgallery');
				},
				onTransitionStart: function (options) {
					setTimeout(function () {
						plugins.preloader.removeClass('loaded');
					}, options.duration * .75);
				},
				onReady: function () {
					plugins.preloader.addClass('loaded');
					windowReady = true;
				}
			});
		}

		// Material Parallax
		if (plugins.materialParallax.length) {
			if (!isNoviBuilder && !isIE && !isMobile) {
				plugins.materialParallax.parallax();
			} else {
				for (var i = 0; i < plugins.materialParallax.length; i++) {
					var $parallax = $(plugins.materialParallax[i]);

					$parallax.addClass('parallax-disabled');
					$parallax.css({ "background-image": 'url(' + $parallax.data("parallax-img") + ')' });
				}
			}
		}
	});

	// Initialize scripts that require a finished document
	// firstFunctionPromise.then(() => {
		$(function () {
			isNoviBuilder = window.xMode;

			/**
			 * @desc Attach form validation to elements
			 * @param {object} elements - jQuery object
			 */
			function attachFormValidator(elements) {
				// Custom validator - phone number
				regula.custom({
					name: 'PhoneNumber',
					defaultMessage: 'Невірний номер.',
					validator: function () {

						if (this.value === '') return true;
						else return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?$/.test(this.value);

					}
				});

				for (var i = 0; i < elements.length; i++) {
					var o = $(elements[i]), v;
					o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
					v = o.parent().find(".form-validation");
					if (v.is(":last-child")) o.addClass("form-control-last-child");
				}

				elements.on('input change propertychange blur', function (e) {
					var $this = $(this), results;

					if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
					if ($this.parents('.rd-mailform').hasClass('success')) return;

					if ((results = $this.regula('validate')).length) {
						for (i = 0; i < results.length; i++) {
							$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
						}
					} else {
						$this.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}).regula('bind');

				var regularConstraintsMessages = [
					{
						type: regula.Constraint.Required,
						newMessage: "Це поле обовʼязкове для запонення."
					},
					{
						type: regula.Constraint.Email,
						newMessage: "The email is not a valid email."
					},
					{
						type: regula.Constraint.Numeric,
						newMessage: "Тільки цифри."
					},
					{
						type: regula.Constraint.Selected,
						newMessage: "Please choose an option."
					}
				];


				for (var i = 0; i < regularConstraintsMessages.length; i++) {
					var regularConstraint = regularConstraintsMessages[i];

					regula.override({
						constraintType: regularConstraint.type,
						defaultMessage: regularConstraint.newMessage
					});
				}
			}

			/**
			 * @desc Check if all elements pass validation
			 * @param {object} elements - object of items for validation
			 * @param {object} captcha - captcha object for validation
			 * @return {boolean}
			 */
			function isValidated(elements, captcha = null) {
				var results, errors = 0;

				if (elements.length) {
					for (var j = 0; j < elements.length; j++) {

						var $input = $(elements[j]);
						if ((results = $input.regula('validate')).length) {
							for (k = 0; k < results.length; k++) {
								errors++;
								$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
							}
						} else {
							$input.siblings(".form-validation").text("").parent().removeClass("has-error")
						}
					}

					// if (captcha) {
					// 	if (captcha.length) {
					// 		return validateReCaptcha(captcha) && errors === 0
					// 	}
					// }

					return errors === 0;
				}
				return true;
			}

			/**
			 * @desc Validate google reCaptcha
			 * @param {object} captcha - captcha object for validation
			 * @return {boolean}
			 */
			function validateReCaptcha(captcha) {
				var captchaToken = captcha.find('.g-recaptcha-response').val();

				if (captchaToken.length === 0) {
					captcha
						.siblings('.form-validation')
						.html('Please, prove that you are not robot.')
						.addClass('active');
					captcha
						.closest('.form-wrap')
						.addClass('has-error');

					captcha.on('propertychange', function () {
						var $this = $(this),
							captchaToken = $this.find('.g-recaptcha-response').val();

						if (captchaToken.length > 0) {
							$this
								.closest('.form-wrap')
								.removeClass('has-error');
							$this
								.siblings('.form-validation')
								.removeClass('active')
								.html('');
							$this.off('propertychange');
						}
					});

					return false;
				}

				return true;
			}

			/**
			 * @desc Initialize Google reCaptcha
			 */
			window.onloadCaptchaCallback = function () {
				for (var i = 0; i < plugins.captcha.length; i++) {
					var
						$captcha = $(plugins.captcha[i]),
						resizeHandler = (function () {
							var
								frame = this.querySelector('iframe'),
								inner = this.firstElementChild,
								inner2 = inner.firstElementChild,
								containerRect = null,
								frameRect = null,
								scale = null;

							inner2.style.transform = '';
							inner.style.height = 'auto';
							inner.style.width = 'auto';

							containerRect = this.getBoundingClientRect();
							frameRect = frame.getBoundingClientRect();
							scale = containerRect.width / frameRect.width;

							if (scale < 1) {
								inner2.style.transform = 'scale(' + scale + ')';
								inner.style.height = (frameRect.height * scale) + 'px';
								inner.style.width = (frameRect.width * scale) + 'px';
							}
						}).bind(plugins.captcha[i]);

					grecaptcha.render(
						$captcha.attr('id'),
						{
							sitekey: $captcha.attr('data-sitekey'),
							size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
							theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
							callback: function () {
								$('.recaptcha').trigger('propertychange');
							}
						}
					);

					$captcha.after("<span class='form-validation'></span>");

					if (plugins.captcha[i].hasAttribute('data-auto-size')) {
						resizeHandler();
						window.addEventListener('resize', resizeHandler);
					}
				}
			};

			/**
			 * @desc Initialize the gallery with set of images
			 * @param {object} itemsToInit - jQuery object
			 * @param {string} [addClass] - additional gallery class
			 */
			function initLightGallery(itemsToInit, addClass) {
				if (!isNoviBuilder) {
					$(itemsToInit).lightGallery({
						thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
						selector: "[data-lightgallery='item']",
						autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
						pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
						addClass: addClass,
						mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
						loop: $(itemsToInit).attr("data-lg-loop") !== "false"
					});
				}
			}

			/**
			 * @desc Initialize the gallery with dynamic addition of images
			 * @param {object} itemsToInit - jQuery object
			 * @param {string} [addClass] - additional gallery class
			 */
			function initDynamicLightGallery(itemsToInit, addClass) {
				if (!isNoviBuilder) {
					$(itemsToInit).on("click", function () {
						$(itemsToInit).lightGallery({
							thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
							selector: "[data-lightgallery='item']",
							autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
							pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
							addClass: addClass,
							mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
							loop: $(itemsToInit).attr("data-lg-loop") !== "false",
							dynamic: true,
							dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
						});
					});
				}
			}

			/**
			 * @desc Initialize the gallery with one image
			 * @param {object} itemToInit - jQuery object
			 * @param {string} [addClass] - additional gallery class
			 */
			function initLightGalleryItem(itemToInit, addClass) {
				if (!isNoviBuilder) {
					$(itemToInit).lightGallery({
						selector: "this",
						addClass: addClass,
						counter: false,
						youtubePlayerParams: {
							modestbranding: 1,
							showinfo: 0,
							rel: 0,
							controls: 0
						},
						vimeoPlayerParams: {
							byline: 0,
							portrait: 0
						}
					});
				}
			}

			// Google ReCaptcha
			if (plugins.captcha.length) {
				$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
			}

			// Additional class on html if mac os.
			if (navigator.platform.match(/(Mac)/i)) {
				$html.addClass("mac-os");
			}

			// Adds some loosing functionality to IE browsers (IE Polyfills)
			if (isIE) {
				if (isIE === 12) $html.addClass("ie-edge");
				if (isIE === 11) $html.addClass("ie-11");
				if (isIE < 10) $html.addClass("lt-ie-10");
				if (isIE < 11) $html.addClass("ie-10");
			}

			// Copyright Year (Evaluates correct copyright year)
			if (plugins.copyrightYear.length) {
				plugins.copyrightYear.text(initialDate.getFullYear());
			}

			// UI To Top
			if (isDesktop && !isNoviBuilder) {
				$().UItoTop({
					easingType: 'easeOutQuad',
					containerClass: 'ui-to-top fl-fill-round-icons fl-fill-round-icons-play76'
				});
			}

			// Add class in viewport
			if (plugins.viewAnimate.length) {
				for (var i = 0; i < plugins.viewAnimate.length; i++) {
					var $view = $(plugins.viewAnimate[i]).not('.active');
					$document.on("scroll", $.proxy(function () {
						if (isScrolledIntoView(this)) {
							this.addClass("active");
						}
					}, $view))
						.trigger("scroll");
				}
			}

			// WOW
			if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
				new WOW().init();
			}

			// RD Input Label
			if (plugins.rdInputLabel.length) {
				plugins.rdInputLabel.RDInputLabel();
			}

			// Regula
			if (plugins.regula.length) {
				attachFormValidator(plugins.regula);
			}

			const botApiKey = '5895677847:AAH3g7W5zFNeRC0I14uji5Nk21MHeb1XoZw';
			const chatId = '-717772716';

			const buttons = document.querySelectorAll('.submitFormButton');

			buttons.forEach((button) => {
				button.addEventListener('click', (e) => {
					e.preventDefault();
					const form = button.closest('form');
					const name = form.elements.name.value;
					const phone = form.elements.phone.value;

					if (name && phone) {
						const message = `Я хочу записатись:\n${name}\n${phone}`;
						const telegramUrl = `https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
						fetch(telegramUrl)
							.then(response => response.json())
							.then(data => {
								if (data.ok) {
									$('.modal-content').load('components/formResponse.html', function () {
										$('#myModal').modal({ show: true, keyboard: true });
									});
									form.reset();
								} else {
									alert('There was an error processing your request');
								}
							})
							.catch(error => {
								console.error(error);
								alert('There was an error processing your request');
							});
					}
					// else {
					//   alert('Please enter your name and phone number');
					// }
				});
			})

			// lightGallery
			if (plugins.lightGallery.length) {
				for (var i = 0; i < plugins.lightGallery.length; i++) {
					initLightGallery(plugins.lightGallery[i]);
				}
			}

			// lightGallery item
			if (plugins.lightGalleryItem.length) {
				// Filter carousel items
				var notCarouselItems = [];

				for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
					if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
						!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
						!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
						notCarouselItems.push(plugins.lightGalleryItem[z]);
					}
				}

				plugins.lightGalleryItem = notCarouselItems;

				for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
					initLightGalleryItem(plugins.lightGalleryItem[i]);
				}
			}

			// Dynamic lightGallery
			if (plugins.lightDynamicGalleryItem.length) {
				for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
					initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
				}
			}

			// Custom Toggles
			if (plugins.customToggle.length) {
				for (var i = 0; i < plugins.customToggle.length; i++) {
					var $this = $(plugins.customToggle[i]);

					$this.on('click', $.proxy(function (event) {
						event.preventDefault();

						var $ctx = $(this);
						$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
					}, $this));

					if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
						$body.on("click", $this, function (e) {
							if (e.target !== e.data[0]
								&& $(e.data.attr('data-custom-toggle')).find($(e.target)).length
								&& e.data.find($(e.target)).length === 0) {
								$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
							}
						})
					}

					if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
						$body.on("click", $this, function (e) {
							if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length === 0 && e.data.find($(e.target)).length === 0) {
								$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
							}
						})
					}
				}
			}
		});
	// });

}());
