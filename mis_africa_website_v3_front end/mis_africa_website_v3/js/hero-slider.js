/**
 * Hero Background Slideshow
 * Subtle background transition for the light blue medical horizon
 */

document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-stage, .hero');
    if (!heroSection) return;

    // Images to cycle through
    const images = [
        'assets/images/hero-slide-2.jpg',
        'assets/images/hero-slide-3.jpg',
        'assets/images/hero-slide-4.jpg',
        'assets/images/hero-slide-5.jpg',
        'assets/images/hero-slide-6.jpg'
    ];

    let currentIndex = 0;

    // Preload images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function changeBackground() {
        currentIndex = (currentIndex + 1) % images.length;
        // Soft airy medical gradient in harmony with the EMISC light blue logo
        const gradient = 'linear-gradient(160deg, rgba(234, 243, 247, 0.92) 0%, rgba(245, 249, 252, 0.90) 45%, rgba(226, 238, 245, 0.94) 100%)';
        const imageUrl = `url('${images[currentIndex]}')`;
        heroSection.style.backgroundImage = `${gradient}, ${imageUrl}`;
    }

    // Change image every 8 seconds
    setInterval(changeBackground, 8000);
});
