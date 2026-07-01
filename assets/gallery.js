document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll("[data-gallery]");

  galleries.forEach((gallery) => {
    const slides = gallery.querySelectorAll(".gallery-slide");
    const thumbs = gallery.querySelectorAll(".gallery-thumb");

    if (!slides.length) return;

    let index = 0;
    let timer;

    function showSlide(nextIndex) {
      slides[index].classList.remove("active");
      if (thumbs[index]) thumbs[index].classList.remove("active");

      index = nextIndex;

      slides[index].classList.add("active");
      if (thumbs[index]) thumbs[index].classList.add("active");
    }

    function nextSlide() {
      showSlide((index + 1) % slides.length);
    }

    function startAutoRotate() {
      stopAutoRotate();
      timer = setInterval(nextSlide, 3000);
    }

    function stopAutoRotate() {
      if (timer) clearInterval(timer);
    }

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.addEventListener("click", () => {
        showSlide(thumbIndex);
        startAutoRotate();
      });
    });

    gallery.addEventListener("mouseenter", stopAutoRotate);
    gallery.addEventListener("mouseleave", startAutoRotate);

    let touchStartX = 0;

    gallery.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX;
    });

    gallery.addEventListener("touchend", (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 40) {
        if (difference > 0) {
          nextSlide();
        } else {
          showSlide((index - 1 + slides.length) % slides.length);
        }

        startAutoRotate();
      }
    });

    slides[0].classList.add("active");
    if (thumbs[0]) thumbs[0].classList.add("active");

    startAutoRotate();
  });
});
