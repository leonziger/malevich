import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.min';
import L from 'leaflet';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

    /* leaflet */
    if ($('#map').length) {
        const map = L.map('map');
        const mapCenter = [50.46251377176145, 30.525405151883337];
        const baseMap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });
        const markerMap = L.marker(mapCenter).addTo(map).bindPopup('АБУ - Вул. Набережно-хрещатицька 11, м. Київ, 03800');
        baseMap.addTo(map);
        if (map) {
            map.setView(mapCenter, 14).scrollWheelZoom.disable();
        }
    }
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
        videoPlay.click(function () {

            if (headerVideo[0].paused) {
                headerVideo[0].play();
            }
            else {
                headerVideo[0].pause();
            }
        });
    }

    /**--- Отркрытие малой формы при Клике по наушникам ---**/
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

    /*--- Открытие малой формы  через 6000 мс ---*/
    setTimeout(function(){
        modalFormSmall.fadeIn('slow','linear');;
    }, 10000);

    /*--- Открытие формы Поп-ап ---*/
    const writeUs = $('.write-us');
    if(writeUs.length) {
        writeUs.click(function(){
            $('.modal').fadeIn('fast','swing');
            $('body').addClass('body-hidden');
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
        $('html, body').animate({scrollTop:coordinates}, 1000);
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