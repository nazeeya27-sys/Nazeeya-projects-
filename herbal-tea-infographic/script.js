// 60-Second Animated Infographic Video
// Tea Slides Timing (in seconds)

const slideTimings = [
    { slide: 1, start: 0, duration: 5 },      // Title: 0-5s
    { slide: 2, start: 5, duration: 4 },      // Chamomile: 5-9s
    { slide: 3, start: 9, duration: 4 },      // Ginger: 9-13s
    { slide: 4, start: 13, duration: 4 },     // Peppermint: 13-17s
    { slide: 5, start: 17, duration: 4 },     // Turmeric: 17-21s
    { slide: 6, start: 21, duration: 4 },     // Green Tea: 21-25s
    { slide: 7, start: 25, duration: 4 },     // Hibiscus: 25-29s
    { slide: 8, start: 29, duration: 4 },     // Fennel: 29-33s
    { slide: 9, start: 33, duration: 4 },     // Cinnamon: 33-37s
    { slide: 10, start: 37, duration: 4 },    // Lemon Balm: 37-41s
    { slide: 11, start: 41, duration: 4 },    // Sage: 41-45s
    { slide: 12, start: 45, duration: 5 },    // Preparation: 45-50s
    { slide: 13, start: 50, duration: 5 },    // Safety: 50-55s
    { slide: 14, start: 55, duration: 4 },    // Hadith: 55-59s
    { slide: 15, start: 59, duration: 1 }     // Closing: 59-60s
];

let currentSlideIndex = 0;
let isPlaying = true;

function initializeVideo() {
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
    });
    
    // Start with first slide active
    allSlides[0].classList.add('active');
    allSlides[0].style.opacity = '1';
    
    startAnimation();
}

function transitionToSlide(slideNumber) {
    const allSlides = document.querySelectorAll('.slide');
    
    // Remove active from all slides
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active to target slide
    const targetSlide = document.querySelector(`.slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
}

function startAnimation() {
    const startTime = performance.now();
    const totalDuration = 60000; // 60 seconds in milliseconds
    
    function animationFrame(currentTime) {
        const elapsed = currentTime - startTime;
        const elapsedSeconds = elapsed / 1000;
        
        if (elapsedSeconds >= 60) {
            // Video ended
            transitionToSlide(15);
            console.log('60-second video completed!');
            // Optional: Loop the video
            // setTimeout(startAnimation, 2000);
            return;
        }
        
        // Find which slide should be active
        for (let timing of slideTimings) {
            if (elapsedSeconds >= timing.start && 
                elapsedSeconds < timing.start + timing.duration) {
                if (currentSlideIndex !== timing.slide) {
                    transitionToSlide(timing.slide);
                    currentSlideIndex = timing.slide;
                    console.log(`Slide ${timing.slide} - Time: ${elapsedSeconds.toFixed(2)}s`);
                }
                break;
            }
        }
        
        if (isPlaying) {
            requestAnimationFrame(animationFrame);
        }
    }
    
    requestAnimationFrame(animationFrame);
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        isPlaying = !isPlaying;
        if (isPlaying) {
            startAnimation();
        }
    }
});

// Initialize when page loads
window.addEventListener('load', initializeVideo);

// Alternative: Manual slide navigation for testing
window.nextSlide = () => {
    const nextSlide = currentSlideIndex + 1;
    if (nextSlide <= 15) {
        transitionToSlide(nextSlide);
        currentSlideIndex = nextSlide;
    }
};

window.prevSlide = () => {
    const prevSlide = currentSlideIndex - 1;
    if (prevSlide >= 1) {
        transitionToSlide(prevSlide);
        currentSlideIndex = prevSlide;
    }
};

console.log('🎬 60-Second Herbal Tea Infographic Video Ready!');
console.log('Press SPACEBAR to play/pause');
console.log('Type nextSlide() or prevSlide() for manual navigation');