"use strict";


document.addEventListener("DOMContentLoaded", function () {

    // sliders
    if (document.querySelector('.hero__slider')) {
        new Swiper('.hero__slider', {
            effect: "fade",
            loop: true,
            speed: 800,
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                stopOnLastSlide: true,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero__pagination',
                clickable: true
            }
        })
    }

    if (document.querySelector('.doctors__slider')) {
        new Swiper('.doctors__slider', {
            slidesPerView: 3,
            spaceBetween: 96,
            navigation: {
                prevEl: '.doctors__prev',
                nextEl: '.doctors__next'
            }
        })
    }
})

