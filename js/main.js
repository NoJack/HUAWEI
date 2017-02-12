$(document).ready(function() {
	huaweiIndex.init();
});

var huaweiIndex = {};
huaweiIndex.init = function() {
		huaweiIndex.header.init();
		huaweiIndex.banner.init();
		huaweiIndex.items.init();
		huaweiIndex.video.init();
	}
	// header
huaweiIndex.header = function() {
	function init() {
		bind();
	}

	function bind() {

		// 二级菜单
		$('.nav_list>li').each(function(index, el) {
			var timmer = null;
			$(this).hover(function() {
				if (index > 4) {
					return;
				}
				$('.level2').eq(index).stop().slideDown(200);
				$('.level2').eq(index).find('div[class$=_item]').delay(100).animate({
					top: 0,
					opacity: 1
				}, 200);
			}, function() {
				timmer = setTimeout(function() {
					$('.level2').eq(index).stop().slideUp(200);
					$('.level2').eq(index).find('div[class$=_item]').delay(100).animate({
						top: '-36px',
						opacity: 0
					}, 200);
				}, 100);
			});
			$('.level2').eq(index).find('div[class$=_item]').hover(function() {
				clearTimeout(timmer);

			}, function() {
				timmer = setTimeout(function() {
					$('.level2').eq(index).stop().slideUp(200);
					$('.level2').eq(index).find('div[class$=_item]').delay(100).animate({
						top: '-36px',
						opacity: 0
					}, 200);
				}, 100);
			});
		});
		// #lan resize
		$(window).resize(function() {
			lanTog(h);
		});
		// #lan scroll 
		var h = $(this).scrollTop();
		lanTog(h)
		$(window).scroll(function() {
			h = $(this).scrollTop();
			lanTog(h);
		});

		// #lan show
		function lanTog(h) {
			// header 
			$('#header').css('transform', 'translate3D(0px,' + h + 'px,0px)')
			if (h > 20 && $(window).width() > 991) {
				$('#header').css('height', '53');
				$('#lan').css('display', 'none');
			} else if (h < 20 && $(window).width() > 991) {
				$('#header').css('height', '81');
				$('#lan').css('display', 'block');
			} else {
				$('#header').css('height', '53');
				$('#lan').css('display', 'none');
			}
		}
		// /bind
	}

	return {
		init: init
	};

}();
// banner
huaweiIndex.banner = function() {
	var url = 'http://www-file.huawei.com/~/media/CORPORATE/Images/home/big-banner/newyear2017_banner_bg.jpg';

	function init() {
		imgLoad();
	}

	function imgLoad() {
		var img = new Image();
		var timmer = null;
		var delayTime = 200;
		img.src = url;
		// loadAnm init
		$('.banner_btn').find('div').each(function(index, el) {

			loadAnm($(el), index, delayTime);
			timmer = setInterval(function() {
				loadAnm($(el), index, delayTime);
			}, 3000);
		});
		img.onload = function() {
			setTimeout(function() {
				$('.loading').fadeOut(200);
				clearTimeout(timmer);
			}, 300);
		}
	}

	function loadAnm(obj, index, delayTime) {

		obj.delay(delayTime * index).animate({
			opacity: 1,
			top: 0
		}, 300).delay(1500).delay(delayTime * index).animate({
			opacity: 0,
			top: 25
		}, 300, function() {
			obj.css({
				top: -25
			});
		});
	}
	return {
		init: init
	};
}();
// items
huaweiIndex.items = function() {

	function init() {
		$('.item>div').css({
			top: 30,
			opacity: 0
		});
		$('.figcation').find('p').css('opacity', 0);
		itmesAnm();
		bind();
		$(window).scroll(function() {
			bind();
		});
	}

	function itmesAnm() {
		$('.item').find('a').each(function(index, el) {

			if (index > 1) {
				$(this).find('p').css({
					top: 30
				});
			} else {
				top: 0
			}

			$(this).hover(function() {

				$(this).find('.figcation').animate({
					bottom: 52
				}, 200, 'easeOut').find('p').animate({
					opacity: 1,
					top: 0
				}, 100);

			}, function() {
				if (index < 2) {
					$('.figcation').animate({
						bottom: 22
					}, 200).find('p').animate({
						opacity: 0
					}, 80);
				} else {
					$('.figcation').animate({
						bottom: 22
					}, 200).find('p').animate({
						opacity: 0,
						top: 30
					}, 80);
				}
			});
		});
	}
	var dTime = 70;

	function bind() {
		$('#items').find('.col-md-12').each(function(index, el) {
			if ($(this).offset().top <= $(window).scrollTop() + 650) {
				$(this).delay(dTime * (index % 3)).animate({
					top: 0,
					opacity: 1
				}, 700, 'easeOut');
			}
		});
	}


	return {
		init: init
	};
}();

// video
huaweiIndex.video = function() {
	var w = 0;
	var h = 0;
	var t = 0;
	var vd_boxTop = 0;

	function init() {
		$('.play_btn').css({
			'left': ($('#video').width() - $('.play_btn').width()) * 0.5
		});
		maxWH();

		bind();
	}

	function bind() {

		$('#video').click(function(event) {
			$('.mask').css({
				display: 'block'
			});
			$('.vd_box').css({
				display: 'block'
			});
		});

		$('.close').click(function(event) {
			$('#movie').get(0).pause();
			$('.mask').css({
				display: 'none'
			});
			$('.vd_box').css({
				display: 'none'
			});
		});
		$(window).resize(function() {
			maxWH();
			t = parseInt($('.vd_box').css('top')) - $(window).scrollTop();
			vd_boxTop = t + $(window).scrollTop();
			$('.vd_box').css({
				top: vd_boxTop
			});
			$('.play_btn').css({
				'left': ($('#video').width() - $('.play_btn').width()) * 0.5
			});
		});
		var vd_boxScroll = parseInt($('.vd_box').css('top')) - $(window).scrollTop();
		$(window).scroll(function() {
			vd_boxTop = vd_boxScroll + $(window).scrollTop();
			$('.vd_box').css({
				top: vd_boxTop
			});
		});
	}

	function maxWH() {

		w = Math.max($(window).width(), $(document).width());
		h = Math.max($(window).height(), $(document).height());
		t = $(window).scrollTop();

		$('.mask').width(w);
		$('.mask').height(h);

		$('.vd_box').width($(window).width() * 0.5);
		var boxW = $('.vd_box').width();
		var boxH = $('.vd_box').height();
		$('.vd_box').css({
			left: ($(window).width() - boxW) * 0.5,
			top: ($(window).height() - boxH) * 0.5 + t
		});

	}
	return {
		init: init
	};
}();


// extend
$.extend(jQuery.easing, {

	easeIn: function(x, t, b, c, d) { //加速曲线
		return c * (t /= d) * t + b;
	},
	easeOut: function(x, t, b, c, d) { //减速曲线
		return -c * (t /= d) * (t - 2) + b;
	}

});
