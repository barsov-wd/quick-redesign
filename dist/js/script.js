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


    // range
    const sumInputOne = document.querySelector('#input-one'),
        sumInputTwo = document.querySelector('#input-two'),
        rangeInputSumOne = document.querySelector('#range__input-one'),
        rangeInputSumTwo = document.querySelector('#range__input-two'),
        rangeTrackSumOne = document.querySelector('#range__track-one'),
        rangeTrackSumTwo = document.querySelector('#range__track-two');

    // маска
    function prettify(num) {
        const n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function range(input$, progress$, content) {
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

    range(rangeInputSumOne, rangeTrackSumOne, sumInputOne);
    range(rangeInputSumTwo, rangeTrackSumTwo, sumInputTwo);


    sumInputOne.addEventListener('input', function () {

        const minSum = rangeInputSumOne.getAttribute('min');
        const maxSum = rangeInputSumOne.getAttribute('max');
        const stepSum = rangeInputSumOne.getAttribute('step');

        this.value = prettify(this.value.replace(/\D/g, ''))
        if (+this.value.replace(/\D/g, '') > +maxSum) {
            this.value = prettify(maxSum)
            return
        }
        if (+this.value.replace(/\D/g, '') < +minSum) {
            rangeInputSumOne.value = 0
            rangeTrackSumOne.style.width = 0 + '%'
            return
        }
        if (+this.value.replace(/\D/g, '') >= +minSum && +this.value.replace(/\D/g, '') <= +maxSum) {
            rangeTrackSumOne.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
            rangeInputSumOne.value = this.value.replace(/\D/g, '')
        }
    });

    sumInputTwo.addEventListener('input', function () {

        const minSum = rangeInputSumTwo.getAttribute('min');
        const maxSum = rangeInputSumTwo.getAttribute('max');
        const stepSum = rangeInputSumTwo.getAttribute('step');

        this.value = prettify(this.value.replace(/\D/g, ''))
        if (+this.value.replace(/\D/g, '') > +maxSum) {
            this.value = prettify(maxSum)
            return
        }
        if (+this.value.replace(/\D/g, '') < +minSum) {
            rangeInputSumTwo.value = 0
            rangeTrackSumTwo.style.width = 0 + '%'
            return
        }
        if (+this.value.replace(/\D/g, '') >= +minSum && +this.value.replace(/\D/g, '') <= +maxSum) {
            rangeTrackSumTwo.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
            rangeInputSumTwo.value = this.value.replace(/\D/g, '')
        }
    })
});
