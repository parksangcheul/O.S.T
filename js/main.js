$(function ($) {
    'use strict';


    var _ost = _ost || {};

       // Document Ready
    $(function () {
       _init();
       _initEvent();
    });

    //정의
    function _init() {
        _ost.currentSecIndex = 0;
    }

    //실행
    function _initEvent() {
        sideMenuHandler();
        togglePromotionHandler();
        noticeSliderHandler();
        setReturnToPosition();
        windowScroll();
        checkSectionOffsetTop();
        respondSliderHandler();
        promotionSliderHandler();

    }

    function sideMenuHandler() {
        var sideMenu = new SideMenu({
            selector: {
                menu: '.side_menu',
                showBtn: '.side_menu_btn',
                shadow: '.side_shadow'
            },
            duration: 500
        });
    }



    function togglePromotionHandler() {
        $('.toggle-promotion .arrow-btn').on('click', function () {
            if ($('.promotion .inner').data('opened') === 'opened') {
                closePromotion();
            } else {
                openPromotion();
            }
        });
    }

    function openPromotion() {
        $('.promotion .inner')
            .stop()
            .slideDown(400)
            .data({opened: 'opened'});
        _ost.promotionSlider.reloadSlider();
    }

    function closePromotion() {
        $('.promotion .inner')
            .stop()
            .slideUp()
            .data({opened: ''});
    }

    function respondSliderHandler() {
        $(window).on('scroll', function () {
           if ($(this).width() > 1025) {
               itemSliderHandler();
           } else if ($(this).width() < 1025) {
               itemResSliderHandler();
           } else if ($(this).width() <= 768) {
               itemResSliderHandler();
           }

        });
    }

    function noticeSliderHandler() {
        $('.notice-line .slider ul').bxSlider({
            mode: 'vertical',
            pager: false,
            controls: false,
            auto: true,
            pause: 5000
        });
    }

    function promotionSliderHandler() {
        _ost.promotionSlider = $('.promotion .slider ul').bxSlider({
            pager: false,
            controls: false,
            auto: true,
            pause: 5000,
            minSlides: 1,
            maxSlides: 3,
            moveSlides: 1,
            slideWidth: 566,
            slideMargin: 30,
            onSliderLoad: function () {
                $('.promotion .slider li').removeClass('active');
                $('.promotion .slider li.first').addClass('active');
            },
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                $('.promotion .slider li').removeClass('active');
                $slideElement.addClass('active');
            }
        });
    }

    function itemSliderHandler() {
        _ost.oneSlider = $('.best-item .slider-one ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            responsive: true,
            pause: 4000,
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 1,
            slideWidth: 305,
            slideMargin: 25
        });

        _ost.twoSlider = $('.best-item .slider-two ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            responsive: true,
            useCSS: true,
            pause: 3000,
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 1,
            slideWidth: 305,
            slideMargin: 25
        });

        $('.best-item .item-arrow-left').on('click', function () {
            _ost.oneSlider.goToPrevSlide();
            _ost.oneSlider.stopAuto();
            _ost.twoSlider.goToPrevSlide();
            _ost.twoSlider.stopAuto();
            restarOneSlider();
            restarTwoSlider();
        });

        $('.best-item .item-arrow-right').on('click', function () {
            _ost.oneSlider.goToNextSlide();
            _ost.oneSlider.stopAuto();
            _ost.twoSlider.goToPrevSlide();
            _ost.twoSlider.stopAuto();
            restarOneSlider();
            restarTwoSlider();
        });
    }

    function itemResSliderHandler() {
        _ost.oneSlider = $('.best-item .slider-one ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            responsive: true,
            pause: 4000,
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 1,
            slideWidth: 160,
            slideMargin: 10
        });

        _ost.twoSlider = $('.best-item .slider-two ul').bxSlider({
            auto: true,
            controls: false,
            pager: false,
            responsive: true,
            useCSS: true,
            pause: 3000,
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 1,
            slideWidth: 160,
            slideMargin: 10
        });

        $('.best-item .item-arrow-left').on('click', function () {
            _ost.oneSlider.goToPrevSlide();
            _ost.oneSlider.stopAuto();
            _ost.twoSlider.goToPrevSlide();
            _ost.twoSlider.stopAuto();
            restarOneSlider();
            restarTwoSlider();
        });

        $('.best-item .item-arrow-right').on('click', function () {
            _ost.oneSlider.goToNextSlide();
            _ost.oneSlider.stopAuto();
            _ost.twoSlider.goToPrevSlide();
            _ost.twoSlider.stopAuto();
            restarOneSlider();
            restarTwoSlider();
        });

    }



    function restarOneSlider() {
        setTimeout(function () {
            _ost.oneSlider.startAuto();
        }, 4000);
    }
    function restarTwoSlider() {
        setTimeout(function () {
            _ost.twoSlider.startAuto();
        }, 3000);
    }

    function windowScroll() {
        $(window).on('scroll', function () {
            _ost.scrollLocate = $(this).scrollTop() + ($(this).height() / 2);

            checkCurrentSection();
        });
    }


    function checkSectionOffsetTop() {
        _ost.secOffsetTop = [];
        $('.section').each(function () {
            _ost.secOffsetTop.push(
                $(this).offset().top
            );
        });
        console.log(_ost.secOffsetTop);
    }


    function checkCurrentSection() {
        var sectionLength = _ost.secOffsetTop.length;

        for (var i = 0; i < sectionLength; i++) {
            if (_ost.scrollLocate >= _ost.secOffsetTop[i] && _ost.scrollLocate < _ost.secOffsetTop[i + 1]) {
                if (_ost.currentSecIndex === i ) {
                    return;
                } else {
                    _ost.currentSecIndex = i;

                    changeSectionHandler();
                }
            }
        }
    }


    function setReturnToPosition() {
        $('.return-to-position').each(function () {
            var x = 100;

            if ($(this).hasClass('to-right')) {
                // 왼쪽에서 오른쪽 음수
                x *= -1;
            } else if ($(this).hasClass('to-left')) {
                //오른쪽에서 왼쪽 양수
                x =Math.abs(x);
            }

            TweenMax.set(this, { x: x, opacity: 0 });
        });
    }

    function changeSectionHandler() {
        console.log('현재 섹션' + _ost.currentSecIndex);

        returnToPosition('.watch', 1, 3);
        returnToPosition('.ring', 1, 4);
        returnToPosition('.neck', 1, 5);
        returnToPosition('.brand', 1.5, 7);

        resetReturnToPosition();
    }

    function returnToPosition(sectionSelector, duration, whichSectionIndex) {
        if ( _ost.currentSecIndex === whichSectionIndex) {
            $(sectionSelector + ' .return-to-position').each(function (index) {
                TweenMax.to(this, duration, {
                    delay: index * .3,
                    x: 0,
                    opacity: 1
                });
            });
        }
    }

    function resetReturnToPosition() {
        if (_ost.currentSecIndex <= 1) {
            setReturnToPosition();
        }
    }










}(jQuery));
