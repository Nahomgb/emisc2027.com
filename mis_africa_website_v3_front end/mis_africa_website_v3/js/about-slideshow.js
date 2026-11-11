// About Section Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-frame .slide, .about-slideshow .slide, .about-visual .slide');
const dots = document.querySelectorAll('.slideshow-dots .dot, .about-slideshow .dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
if (slides.length > 1) {
    setInterval(nextSlide, 5000);
}

// Click on dots to navigate
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});
