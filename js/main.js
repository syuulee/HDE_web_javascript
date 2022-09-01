window.addEventListener('DOMContentLoaded', () => {
    //

    //탑배너 아이콘 누르면 창이 사라지게 on을 붙이는 방법으로 처리
    document.querySelector('.top_close_btn').addEventListener('click', function () {
        // this.classList.toggle('on');
        document.querySelector('.TopBanner').classList.add('on')
        document.querySelector('.MainVisual').classList.add('on')
    });

    // header 부분에서 언어랑 누르면 숨겨진 창이 나오는
    document.querySelector('.lang strong').addEventListener('click', function () {
        this.classList.toggle('on');
        document.querySelector('.lang').classList.toggle('on');
    });

    document.querySelector('.top_search strong').addEventListener('click', function () {
        this.classList.toggle('on');
        document.querySelector('.top_search').classList.toggle('on');
    });


    //header에 on붙이기(스크롤 내리면 header가 변함)
    window.addEventListener('scroll', () => {
        let SCT = window.scrollY
        SCT > 0
            ? document.querySelector('.Header').classList.add('on')
            : document.querySelector('.Header').classList.remove('on');
    })


    // Swiper - main visual
    const MAINSLIDE = new Swiper('.main_slider', {
        loop: true,
        // 슬라이드가 바뀔 때, on이 붙어서 h2/p/a가 나타나도록
        on: {
            init: function () {
                console.log(this.slides.length - 2);
                const current = document.querySelector('.swiper-slide-active');
                current.classList.add('on');
                document.querySelector('.main_slider_num').innerHTML = (this.realIndex + 1) + " / <span>" + (this.slides.length - 2);
            }
        }
    });

    // 슬라이드가 바뀔 때, on이 붙어서 h2/p/a가 나타나도록
    const totalslide = document.querySelectorAll('.swiper-slide');
    const slideDots = document.querySelectorAll('.slide_dots li')

    MAINSLIDE.on('slideChangeTransitionEnd', function () {
        // 1. 번호 찍는 거
        // 2. 지금 슬라이드에 class에 on붙이기
        const current = document.querySelector('.swiper-slide-active');
        // ↓ 순회를 하면서 on을 제거
        totalslide.forEach(it => it.classList.remove('on'))
        current.classList.add('on')
        console.log(totalslide, current, this.realIndex);
        let count = this.realIndex // 0,1,2
        slideDots.forEach(it => it.classList.remove('on'))
        slideDots[count].classList.add('on');
        document.querySelector('.main_slider_num').innerHTML = (this.realIndex + 1) + " /  <span>" + (this.slides.length - 2);
    });

    // 화살표 만들기
    document.querySelector('.slide_handler .next').addEventListener('click', () => {
        MAINSLIDE.slideNext();
    });
    document.querySelector('.slide_handler .prev').addEventListener('click', () => {
        MAINSLIDE.slidePrev();
    });
    slideDots.forEach((it, idx) => {
        it.addEventListener('click', () => {
            console.log(idx);
            MAINSLIDE.slideTo(idx + 1, 3000)
        })
    });








    //
});