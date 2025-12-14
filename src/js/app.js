"use strict";


document.addEventListener("DOMContentLoaded", function () {


    const body = document.body;
    const headerMenu = document.querySelector('.header__menu');
    const menuToggler = document.querySelector('.header__menu-toggler');
    const searchToggler = document.querySelector('.header__search-toggler');
    const searchForm = document.querySelector('.header__search');

    let searchInput = null;
    let searchIconUse = null;
    let originalIconHref = null;
    let crossIconHref = null;


    const closeAllSubmenus = (excludedArrow = null) => {
        const menuArrows = document.querySelectorAll('.menu__arrow');
        menuArrows.forEach(arrow => {
            if (arrow !== excludedArrow) {
                const parentItem = arrow.closest('.menu__item--parent');
                if (parentItem) {
                    parentItem.classList.remove('active');
                }
            }
        });
    };

    const closeMobileMenu = () => {
        if (headerMenu) {
            headerMenu.classList.remove('active');
        }
        if (menuToggler) {
            menuToggler.classList.remove('active');
        }
        body.classList.remove('open-mobile-menu');
        closeAllSubmenus();
    };

    const openMobileMenu = () => {
        closeSearch();
        if (headerMenu) {
            headerMenu.classList.add('active');
        }
        if (menuToggler) {
            menuToggler.classList.add('active');
        }
        body.classList.add('open-mobile-menu');
    };

    const closeSearch = () => {
        if (searchForm) {
            searchForm.classList.remove('search--active');
        }
        if (searchIconUse && originalIconHref) {
            searchIconUse.setAttribute('xlink:href', originalIconHref);
        }
        if (searchInput) {
            searchInput.value = '';
        }
    };

    const openSearch = () => {
        closeMobileMenu();
        if (searchForm) {
            searchForm.classList.add('search--active');
        }
        if (searchIconUse && crossIconHref) {
            searchIconUse.setAttribute('xlink:href', crossIconHref);
        }
        if (searchInput) {
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        }
    };


    if (searchToggler && searchForm) {
        searchInput = searchForm.querySelector('.form__control');
        const searchIconContainer = searchToggler.querySelector('.header__search-icon');

        if (searchIconContainer) {
            searchIconUse = searchIconContainer.querySelector('use');
            if (searchIconUse) {
                originalIconHref = searchIconUse.getAttribute('xlink:href');
                if (originalIconHref) {
                    crossIconHref = originalIconHref.replace('#icon-search', '#icon-cross');
                }
            }
        }
    }


    document.addEventListener('click', (event) => {
        const target = event.target;


        const isSearchTogglerClick = searchToggler && searchToggler.contains(target);
        const isMenuTogglerClick = menuToggler && menuToggler.contains(target);
        const isMenuArrowClick = target.closest('.menu__arrow');


        if (isSearchTogglerClick) {
            event.preventDefault();
            event.stopPropagation();
            if (searchForm.classList.contains('search--active')) {
                closeSearch();
            } else {
                openSearch();
            }
        } else if (isMenuTogglerClick) {
            event.preventDefault();
            event.stopPropagation();
            if (body.classList.contains('open-mobile-menu')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        } else if (isMenuArrowClick) {
            event.preventDefault();
            event.stopPropagation();
            const arrow = isMenuArrowClick;
            const parentItem = arrow.closest('.menu__item--parent');
            if (parentItem) {
                const isOpened = parentItem.classList.contains('active');

                closeAllSubmenus(isOpened ? null : arrow);

                parentItem.classList.toggle('active', !isOpened);
            }
        }


        const isSearchForm = searchForm && searchForm.contains(target);
        const isMenu = headerMenu && headerMenu.contains(target);
        const isSearchActive = searchForm && searchForm.classList.contains('search--active');
        const isMenuOpen = body.classList.contains('open-mobile-menu');


        if (isSearchActive && !isSearchForm && !isSearchTogglerClick) {
            closeSearch();
        }

        if (isMenuOpen && !isMenu && !isMenuTogglerClick) {
            closeMobileMenu();
        }

        if (!isMenuArrowClick && headerMenu && headerMenu.contains(target)) {
            closeAllSubmenus();
        }

    });


    // init Sliders

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

    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchOverflow: true,
            centeredSlides: true,
            pagination: {
                el: '.reviews__pagination',
                clickable: true
            },
            breakpoints: {
                1199.98: {
                    centeredSlides: false,
                    slidesPerView: 5,
                    spaceBetween: 38,
                }
            }
        })
    }

    if (document.querySelector('.doctors__slider')) {
        new Swiper('.doctors__slider', {
            navigation: {
                prevEl: '.doctors__prev',
                nextEl: '.doctors__next'
            },
            pagination: {
                el: '.doctors__pagination',
                dynamicBullets: true,
                dynamicMainBullets: 3,
                clickable: true
            },
            breakpoints: {
                576.98: {
                    slidesPerView: 2,
                    spaceBetween: 48,
                },
                991.98: {
                    slidesPerView: 3,
                    spaceBetween: 48,
                },
                1199.98: {
                    slidesPerView: 3,
                    spaceBetween: 96,
                }
            }
        })
    }

    if (document.querySelector('.values__slider')) {
        new Swiper('.values__slider', {
            spaceBetween: 20,
            slidesPerView: "auto",
            watchOverflow: true,
            centeredSlides: true,
            pagination: {
                el: '.values__pagination',
                clickable: true
            },
            breakpoints: {
                1199.98: {
                    slidesPerView: 4,
                    spaceBetween: 37,
                    centeredSlides: false,
                }
            }
        })
    }
    if (document.querySelector('.news__slider')) {
        new Swiper('.news__slider', {
            spaceBetween: 20,
            slidesPerView: "auto",
            watchOverflow: true,
            pagination: {
                el: '.news__pagination',
                clickable: true
            },
            breakpoints: {
                1199.98: {
                    slidesPerView: 3,
                    spaceBetween: 37,
                }
            }
        })
    }
})