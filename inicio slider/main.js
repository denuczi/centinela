const swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  effect: "fade",
  speed: 1000,
  loop: false,  // Desactivar el loop
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: {
    invert: false,
    forceToAxis: false,
    thresholdDelta: 50,
    sensitivity: 1,
  },
  on: {
    init: function () {
      let activeSlide = this.slides[this.activeIndex];
      let background = activeSlide.querySelector(".background");
      background.classList.add("animation");
    },
    slideChange: function () {
      this.slides.forEach((slide) => {
        let background = slide.querySelector(".background");
        if (background) {
          background.classList.remove("animation");
        }
      });
      let activeSlide = this.slides[this.activeIndex];
      let background = activeSlide.querySelector(".background");
      if (background) {
        background.classList.add("animation");
      }
    },
    reachEnd: function () {
      // Al llegar al último slide, escucha el movimiento del mouse para hacer scroll a la siguiente sección
      const nextSection = document.querySelector("#next-section");

      // Escucha cuando el usuario use la rueda del mouse
      swiper.mousewheel.disable(); // Desactivar la rueda del slider al llegar al final

      window.addEventListener("wheel", function scrollToNextSection(event) {
        if (event.deltaY > 0) { // Detecta si la rueda va hacia abajo
          nextSection.scrollIntoView({ behavior: "smooth" });
          window.removeEventListener("wheel", scrollToNextSection); // Remover el listener después de hacer el scroll
        }
      });
    },
  },
});
