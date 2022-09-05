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
        // hedaer 부분
        SCT > 0
            ? document.querySelector('.Header').classList.add('on')
            : document.querySelector('.Header').classList.remove('on');

        // to+top 버튼
        SCT > 600
            ? document.querySelector('.to_top').classList.add('on')
            : document.querySelector('.to_top').classList.remove('on');
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
    document.querySelector('.MainVisual .slide_handler .next').addEventListener('click', () => {
        MAINSLIDE.slideNext();
    });
    document.querySelector('.MainVisual .slide_handler .prev').addEventListener('click', () => {
        MAINSLIDE.slidePrev();
    });
    slideDots.forEach((it, idx) => {
        it.addEventListener('click', () => {
            console.log(idx);
            MAINSLIDE.slideTo(idx + 1, 3000)
        })
    });



    // 두개 같이 돌아가는 슬라이드
    const PLS = new Swiper('.portfolio_left_slide', {
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
    })
    const PRS = new Swiper('.portfolio_right_slide', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 30,
    });

    // 센터모드?
    const PCS = new Swiper('.portfolio_right_slide', {
        loop: true,
        slidesPerView: 4.5,
        spaceBetween: 30,
    });

    // 슬라이드 화살표에 액션 붙이기
    document.querySelector('.Portfolio .slide_handler .next').addEventListener('click', () => {
        PLS.slideNext();
        PRS.slideNext();
    });
    document.querySelector('.Portfolio .slide_handler .prev').addEventListener('click', () => {
        PLS.slidePrev();
        PRS.slidePrev();
    });

    // 옆슬라이드로 이동하는 하는 거 같은 효과
    PLS.controller.control = PRS;
    PRS.controller.control = PLS;


    const SCBOX = document.querySelectorAll('.Solution .content_box>div');

    const SCS = new Swiper('.Solution .center_slider', {
        loop: true,
        // slidesPerView: 2,
        spaceBetween: 100,
        centeredSlides: true,
        slidesPerView: "auto",
        //width: 1200,
        slideActiveClass: 'on', // .swiper-slide-active 대신 .on을 쓸거임...
        on: {
            slideChangeTransitionEnd: function () {
                let count = this.realIndex; // 0 1 2 3 4 
                SCBOX.forEach(it => it.classList.remove('on'))
                SCBOX[count].classList.add('on');
                solutionDots.forEach(el => el.classList.remove('on'))
                it.classList('on');
                solutionDots[count].classList.add('on');
                document.querySelector('.solution_slider_num').innerHTML = "0" + (this.realIndex + 1) + "<span>  / 0" + SCBOX.length;
            }
        }

    });


    document.querySelector('.Solution .slide_handler .next').addEventListener('click', () => {
        SCS.slideNext();
    });
    document.querySelector('.Solution .slide_handler .prev').addEventListener('click', () => {
        SCS.slidePrev();
    });



    document.querySelector('.Solution .slide_handler .next').addEventListener('click', () => {
        SCS.slideNext();
    });
    document.querySelector('.Solution .slide_handler .prev').addEventListener('click', () => {
        SCS.slidePrev();
    });



    // 솔루션 슬라이드 dots
    const solutionDots = document.querySelectorAll('.solutio_dots>li'); //유사배열이고, 유사배열은 foreach 사용가능

    solutionDots.forEach((it, idx) => {
        it.addEventListener('click', () => {
            solutionDots.forEach(el => el.classList.remove('on'));
            it.classList.add('on');
            SCS.slideTo(idx);
        });
    });


    // family link 연결하기
    document.querySelector('#FL').addEventListener('change', e => {
        let lnk = e.target.value;
        lnk && window.open(lnk) // =  if (lnk) window.open(lnk)
    })


    // to_top 스크롤
    document.querySelector('.to_top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }) //scrollTo는 함수
        gsap.to(window, { duration: 0.5, scrollTo0 })
    })

    const LINK_LI = document.querySelectorAll('.ft_top .right li');
    const LINK_CON = document.querySelectorAll('.ft_top .right .link');

    console.log(LINK_LI, LINK_CON);

    LINK_LI.forEach((it, idx) => {
        it.addEventListener('click', () => {
            if (it.classList.contains('on')) {
                it.classList.remove('on');
                LINK_CON[idx].classList.remove('on');
            } else {
                LINK_LI.forEach(el => el.classList.remove('on'));
                it.classList.add('on');
                LINK_CON.forEach(el => el.classList.remove('on'));
                LINK_CON[idx].classList.add('on');
            }
        });
    });
    console.log(document.cookie);

    const COOKIE = document.cookie;
    if (!COOKIE) {
        document.querySelector('.popup').style.display = 'block';
    }
    document.querySelector('.popup button').addEventListener('click', function () {
        document.querySelector('.popup').style.display = 'none'
    })
    document.querySelector('.popup input').addEventListener('change', () => {
        const d = new Date();
        d.setDate(d.getTime() + 60 * 1000);
        let expires = "expires" + d.toUTCString();
        document.cookie = `name=pop; expires=$(date); path=/`;
        document.querySelector('.popup').style.display = 'none';
    })


    //
});





 // scroll event
    // const SEC = document.querySelectorAll('.action');
    // const WT=window.innerHeight;

    // window.addEventListener('scroll', () => {
    //     let sct = window.scrollY;
    //     SEC.forEach(ele => {
    //         let secTop = ele.offsetTop;
    //         let secH = ele.clientHeight;
    //         if (sct > secTop - (WT - secH) / 2 - 200) {
    //             ele.classList.add('on');
    //         };
    //         // sct > secTop - (WT-secH) / 2 - 200 ? ele.classList.add('on') : e.classList.remove('on');
    //     });
    // });
