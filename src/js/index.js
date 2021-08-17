import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.min';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

});

$(function () {
    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 4) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: false,
                centeredSlides: true,
                spaceBetween: 25,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            });
        }
    }


    /*--- Работа с видео в хедере ---*/
    const videoPlay = $('.video-play');
    const headerVideo = $('.header__video');
    if (headerVideo) {

        if (headerVideo[0].paused) {
            headerVideo[0].play();
            videoPlay.removeClass('pausing').addClass('playing');
        } else {
            headerVideo[0].pause();
            videoPlay.removeClass('playing').addClass('pausing');
        }

        videoPlay.click(function () {

            if (headerVideo[0].paused) {
                headerVideo[0].play();
                videoPlay.removeClass('pausing').addClass('playing');
            } else {
                headerVideo[0].pause();
                videoPlay.removeClass('playing').addClass('pausing');
            }
        });
    }

    /*--- Меняем в Хедере подложку в зависимости от разрешения экрана ---*/
    const contactsPage = $('.header');
    const contactsDesktopBg = contactsPage.data('desktop-bg');
    const contactsMobileBg = contactsPage.data('mobile-bg');
    let url;

    function changeBg() {

        if ($(window).width() <= 375 ) {
            url = contactsMobileBg;
        }

        if ($(window).width() > 375 ) {
            url = contactsDesktopBg;
        }

        contactsPage.css('background', 'linear-gradient(180.29deg, #010101 1.42%, rgba(1, 1, 1, 0.753339) 32.5%, rgba(1, 1, 1, 0.551995) 69.38%, rgba(1, 1, 1, 0) 99.75%), url(' + url + ')');
    }

    changeBg();

    if (contactsMobileBg && contactsDesktopBg) {
        $(window).resize(changeBg);
    }

    // ----------- Прилипаем хедер-меню к экрану -------------------

    const headerTopMenu = $('.header__top-menu');
    if (headerTopMenu.length) {
        const coordinats = $('.header').offset().top;

        $(window).scroll(function () {
            const windowScrollTop = $(window).scrollTop();
            if (windowScrollTop >= coordinats) {
                headerTopMenu.addClass('sticky');
                $('.header__container').removeClass('pb-50');
                $('.header__logo').hide();
                $('.header__logo-sticky').addClass('active');
            }
            else {
                headerTopMenu.removeClass('sticky');
                $('.header__container').addClass('pb-50');
                $('.header__logo').show();
                $('.header__logo-sticky').removeClass('active');
            }
        });
    }
    // ----------- (прилипаем  меню к экрану) -------------------

    /*--- Моб меню ---*/
    const burger = $('.header__burger');
    if(burger.length) {
        burger.click(function() {
           $('.header__nav').toggleClass('active');
            $('.body').toggleClass('body-hidden');
        });
    }

    const antiBurger = $('.header-menu__close');
    if(antiBurger.length) {
        antiBurger.click(function() {
            $('.header__nav').toggleClass('active');
            $('.body').toggleClass('body-hidden');
        });
    }

    /* button to top */
    let buttonToTop = $('#to_top');
    $(window).scroll(function (){
        if ($(this).scrollTop() > 50){
            buttonToTop.addClass('show');
        } else{
            buttonToTop.removeClass('show');
            headerTopMenu.removeClass('sticky');
            $('.header__container').addClass('pb-50');
            $('.header__logo').show();
            $('.header__logo-sticky').removeClass('active');
        }
    });

    buttonToTop.click(function (){
        $('body,html').stop().animate({
            scrollTop:0
        }, 800);
    });

    /**--- Открытие малой формы при Клике по наушникам ---**/
    const callCenter = $('.call-center');
    const modalFormSmall = $('.modal-form__small');
    if (callCenter.length && modalFormSmall.length) {
        callCenter.click(function() {
            modalFormSmall.fadeIn('slow','linear');
        });
    }

    /*--- Закрытие малой формы, которая появляется при клике по наушникам ---*/
    const closeSmallForm = $('.modal-form__small .modal-form__close');
    if( closeSmallForm.length ) {
        closeSmallForm.click(function() {
            $(this).closest('.modal-form__small').fadeOut('fast','swing');
        });
    }

    /*--- Открытие малой формы  через 10000 мс ---*/
    setTimeout(function(){
        modalFormSmall.fadeIn('slow','linear');
    }, 10000);

    /*--- Открытие формы Поп-ап ---*/
    const writeUs = $('.write-us');
    if(writeUs.length) {
        writeUs.click(function(){
            $('body').addClass('body-hidden');
            $('.modal').fadeIn('fast','swing');
            $('.modal-form__big').fadeIn('fast','swing');
            $('.modal-form__big-thanks').hide();
        });
    }

    /*--- Закрытие формы Поп-ап ---*/
    const closePopupForm = $('.modal .modal-form__close');
    if( closePopupForm.length ) {
        closePopupForm.click(function() {
            $('.modal').fadeOut('fast','swing');
            $('body').removeClass('body-hidden');
        });
    }

    /*--- Разсадка в болшьшом зале, раскрываем опции ---*/
    const sitOptions = $('.section-sitting__option-comment');
    if (sitOptions.length) {
        sitOptions.each(function(index, item){
            $(item).click(function(){
                let parentDiv = $(this).closest('.section-sitting__option');
                if (parentDiv.hasClass('active')) {
                    parentDiv.removeClass('active');
                    parentDiv.find('.section-sitting__option-comment').text('Подивитись план');
                    parentDiv.find('.section-sitting__option-content').stop().slideUp();
                } else {
                    parentDiv.addClass('active');
                    parentDiv.find('.section-sitting__option-comment').text('Сховати');
                    parentDiv.find('.section-sitting__option-content').stop().slideDown();
                }
            });
        })
    }

    /*--- Прокрутка к блокам-пунктам меню ---*/
    $('[href^="#"]').click(function(){
        let link = $(this).attr('href');
        let coordinates = $(link).offset().top-$('.header__top').height();
        $('html, body').stop().animate({scrollTop:coordinates}, 1000);
        return false;
    });


    // This code must be the last one
    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});