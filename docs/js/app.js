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
        if (headerMenu) headerMenu.classList.remove('active');
        if (menuToggler) menuToggler.classList.remove('active');
        body.classList.remove('open-mobile-menu');
        closeAllSubmenus();
    };

    const openMobileMenu = () => {
        closeSearch();
        if (headerMenu) headerMenu.classList.add('active');
        if (menuToggler) menuToggler.classList.add('active');
        body.classList.add('open-mobile-menu');
    };

    const closeSearch = () => {
        if (searchForm) searchForm.classList.remove('search--active');
        if (searchIconUse && originalIconHref) {
            searchIconUse.setAttribute('xlink:href', originalIconHref);
        }
        if (searchInput) searchInput.value = '';
    };

    const openSearch = () => {
        closeMobileMenu();
        if (searchForm) searchForm.classList.add('search--active');
        if (searchIconUse && crossIconHref) {
            searchIconUse.setAttribute('xlink:href', crossIconHref);
        }
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 300);
        }
    };

    const popups = document.querySelectorAll('.popup');

    const closePopup = () => {
        popups.forEach(popup => {
            popup.classList.remove('active');
            popup.setAttribute('hidden', '');
        });
        body.classList.remove('popup-active');
    };

    const openPopup = (modalId) => {
        closeMobileMenu();
        closeSearch();
        closePopup();
        const popup = document.querySelector(modalId);
        if (popup) {
            popup.classList.add('active');
            popup.removeAttribute('hidden');
            body.classList.add('popup-active');
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closePopup();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (searchToggler && searchToggler.contains(target)) {
            event.preventDefault();
            event.stopPropagation();
            if (searchForm.classList.contains('search--active')) {
                closeSearch();
            } else {
                openSearch();
            }
            return;
        }

        if (menuToggler && menuToggler.contains(target)) {
            event.preventDefault();
            event.stopPropagation();
            if (body.classList.contains('open-mobile-menu')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            return;
        }

        const arrow = target.closest('.menu__arrow');
        if (arrow) {
            event.preventDefault();
            event.stopPropagation();
            const parentItem = arrow.closest('.menu__item--parent');
            if (parentItem) {
                const isOpened = parentItem.classList.contains('active');
                closeAllSubmenus(isOpened ? null : arrow);
                parentItem.classList.toggle('active', !isOpened);
            }
            return;
        }

        const popupOpenTrigger = target.closest('[data-modal-open]');
        if (popupOpenTrigger) {
            event.preventDefault();
            openPopup(popupOpenTrigger.dataset.modalOpen || `#${popupOpenTrigger.getAttribute('href')}`);
            return;
        }

        if (target.closest('[data-modal-close]')) {
            event.preventDefault();
            closePopup();
            return;
        }

        if (searchForm && searchForm.classList.contains('search--active')) {
            if (!searchForm.contains(target)) {
                closeSearch();
            }
        }

        if (body.classList.contains('open-mobile-menu')) {
            if (headerMenu && !headerMenu.contains(target)) {
                closeMobileMenu();
            }
        }

        if (body.classList.contains('popup-active')) {
            if (!target.closest('.popup__body')) {
                closePopup();
            }
        }

        if (headerMenu && headerMenu.contains(target)) {
            closeAllSubmenus();
        }
    });

    initSliders();
    initPhoneMask();
});


const servicesNavLinks = document.querySelectorAll('.services__nav-link');
const serviceImages = document.querySelectorAll('.services__image');

if (servicesNavLinks.length > 0 && serviceImages.length > 0) {
    servicesNavLinks.forEach((link, index) => {

        const activateImage = (linkIndex) => {

            servicesNavLinks.forEach(navLink => navLink.classList.remove('active'));
            serviceImages.forEach(image => image.classList.remove('active'));

            link.classList.add('active');
            if (serviceImages[linkIndex]) {
                serviceImages[linkIndex].classList.add('active');
            }
        };


        link.addEventListener('mouseover', (event) => {
            activateImage(index);
        });


    });


    servicesNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {

            const clickedIndex = Array.from(servicesNavLinks).indexOf(link);

            servicesNavLinks.forEach(navLink => navLink.classList.remove('active'));
            serviceImages.forEach(image => image.classList.remove('active'));

            link.classList.add('active');
            if (serviceImages[clickedIndex]) {
                serviceImages[clickedIndex].classList.add('active');
            }
        });
    });
}

const contactBlock = document.querySelector('.header__contact');
const currentLink = document.querySelector('.header__contact-current-link');

if (contactBlock && currentLink) {
    currentLink.addEventListener('click', function (e) {
        if (window.matchMedia('(any-hover: none)').matches) {
            e.preventDefault();
            contactBlock.classList.toggle('active');
        }
    });

    document.addEventListener('click', function (e) {
        if (!contactBlock.contains(e.target)) {
            contactBlock.classList.remove('active');
        }
    });
}

function initSliders() {
    if (document.querySelector('.hero__slider')) {
        new Swiper('.hero__slider', {
            effect: "fade",
            loop: true,
            speed: 800,
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 5000,
                stopOnLastSlide: true,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero__pagination',
                clickable: true
            }
        });
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
        });
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
                576.98: { slidesPerView: 2, spaceBetween: 48 },
                991.98: { slidesPerView: 3, spaceBetween: 48 },
                1199.98: { slidesPerView: 3, spaceBetween: 96 }
            }
        });
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
        });
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
        });
    }
}

function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    const onPhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    };

    const onPhoneInput = (e) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        const selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            input.value = "";
            return;
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = "";
        }
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    });
}