// slide up animations
const animatedElements = document.querySelectorAll('.slideUpOnView');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add('slideUp');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 
});

animatedElements.forEach(element => observer.observe(element));