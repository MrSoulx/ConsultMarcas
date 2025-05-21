// Animación para las tarjetas de servicios
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    animateNumbers();
    initServiceCardAnimation();
});

function initCarousel() {
    $("#owl-example").owlCarousel({
        items: 3,
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3
            }
        }
    });
}

export function initServiceCardAnimation() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

// Función para animar números
export function animateNumbers() {
    const achievementItems = document.querySelectorAll('.achievement-item h3');
    
    if (!achievementItems.length) {
        console.log('No se encontraron elementos para animar');
        return;
    }

    achievementItems.forEach(item => {
        const target = item.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isComma = target.includes(',');

        let baseNumber = parseFloat(target.replace(/[^0-9.]/g, ''));
        let currentNumber = 0;
        const duration = 2000;
        const steps = 60;
        const increment = baseNumber / steps;

        const updateNumber = () => {
            currentNumber += increment;
            if (currentNumber >= baseNumber) {
                currentNumber = baseNumber;
            }

            let displayNumber = Math.floor(currentNumber);
            if (isComma) {
                displayNumber = displayNumber.toLocaleString();
            }
            if (isPercentage) {
                displayNumber += '%';
            }
            if (isPlus) {
                displayNumber += '+';
            }

            item.textContent = displayNumber;

            if (currentNumber < baseNumber) {
                requestAnimationFrame(updateNumber);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px'
        });

        observer.observe(item);
    });
}

export function initAnimations() {
    document.addEventListener('DOMContentLoaded', () => {
        initCarousel();
        animateNumbers();
        initServiceCardAnimation();
    });
}