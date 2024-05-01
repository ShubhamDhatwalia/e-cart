var swiper = new Swiper(".mySwiper", {
    autoplay: {
        delay:3500,
        pauseOnMouseEnter: true,
    },
    loop: true,
});


var swiper = new Swiper(".mySwiper1", {
    slidesPerView: "auto",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});
