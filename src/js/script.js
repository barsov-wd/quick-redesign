// window.addEventListener('DOMContentLoaded', () => {

//     const swiper = new Swiper('.swiper', {

//         pagination: {
//             el: '.promo__content-pagination',
//             type: 'progressbar',
//         },
//         spaceBetween: 10,
//         slidesPerView: 1,
//     });

//     let mySliderAllSlides = document.querySelector('.promo__content-total');
//     let mySliderCurrentSlide = document.querySelector('.promo__content-current');
//     let myImageSlider = document.querySelector('.promo__content-swiper');

//     mySliderAllSlides.innerHTML = myImageSlider.slides.length;

//     myImageSlider.on('slideChange', function () {
//         let currentSlide = ++myImageSlider.realIndex;
//         mySliderCurrentSlide.innerHTML = currentSlide;
//     })

// });
window.addEventListener('DOMContentLoaded', () => {
    let totalSlide = ('.swiper-wrapper').length;
    const swiper = new Swiper('.promo__content-swiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        loopedSLides: 3,
        simulateTouch: true,
        grabCursor: true,
        speed: 800,
        pagination: {
            el: '.promo__content-pagination',
            type: 'progressbar'
        },
        navigation: {
            nextEl: '.promo__content-button-next'
        },
        autoplay: {
            delay: 2000,
        }
    });


    swiper.on('slideChange', function () {
        var fragment = document.querySelector('.promo__content-current');
        var current = swiper.realIndex + 1;
        if (current > totalSlide)
            current = 1;
        var idx = current < 10 ? ("0" + current) : current;
        var tdx = "0" + 3;
        fragment.innerHTML = (idx + '/' + tdx);
    });

    const sumInput = document.querySelector('.promo__block-form-mininput');

     

    function range(input, progress, content) {
        const input$ = document.querySelector(input);
        const progress$ = document.querySelector(progress);
        if (input$) {
            const val = input$.value;
            const min = input$.getAttribute('min');
            const max = input$.getAttribute('max');
            const step = input$.getAttribute('step');
            const position = 100 / (max - step) * (val - step);
            updateRangePosition(progress$, position);

            input$.addEventListener('input', () => {
                const val = input$.value;
                const min = input$.getAttribute('min');
                const max = input$.getAttribute('max');
                const step = input$.getAttribute('step');
                const position = 100 / (max - step) * (val - step);
                updateRangePosition(progress$, position);
                content.value = prettify(val);
            });
        }
    }

    function updateRangePosition(progress$, position) {
        if (progress$) {
            progress$.style.width = `${position}%`;
        }
    }

    // маска
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }


    range('.range__input--sum', '.range__track--sum', sumInput);
});
