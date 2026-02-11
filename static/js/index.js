// Animation for navbar elements
function animateNavbar() {
    const tl = gsap.timeline({defaults: {ease: "power3.out"}});
    
    // Animation for logo letters
    const logoLetters = document.querySelectorAll('.logo-letter');
    logoLetters.forEach((letter, index) => {
        tl.to(letter, {
            y: 0,
            opacity: 1,
            duration: 0.8,
        }, index * 0.15);
    });
    
    // Animation for nav links and login button
    tl.to('.nav-links', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.4");
    
    tl.to('.login-btn', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.6");
}

// Function to animate home page elements
function animateHomePage() {
    // First animate navbar
    animateNavbar();
    
    const homeTimeline = gsap.timeline({defaults: {ease: "power3.out"}});
    
    // Reset animations first
    gsap.set('.hero-title, .hero-description', {opacity: 0, x: -50});
    gsap.set('.contact-btn', {opacity: 0, y: 20});
    gsap.set('.social-icons', {opacity: 0});
    gsap.set('.media-container', {opacity: 0, scale: 0.8});
    
    // Animate elements
    homeTimeline.to('.hero-title', {
        x: 0,
        opacity: 1,
        duration: 0.8,
    });
    
    homeTimeline.to('.hero-description', {
        x: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.6");
    
    homeTimeline.to('.contact-btn', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.6");
    
    homeTimeline.to('.social-icons', {
        opacity: 1,
        duration: 0.8,
    }, "-=0.4");
    
    homeTimeline.to('.media-container', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.75)"
    }, "-=0.8");
    
    // For the video implementation
    const video = document.getElementById('home-video');
    if (video) {
        video.play();
        // Stop video after 6 seconds
        setTimeout(() => {
            video.pause();
        }, 6000);
    }
    
    // Complete all animations within 6 seconds
    homeTimeline.duration(6);
}

// Update the animateCursosPage function to include the header text fix
function animateCursosPage() {
    // First animate navbar
    animateNavbar();
    
    const cursosTimeline = gsap.timeline({defaults: {ease: "power3.out"}});
    
    // Reset animations first
    gsap.set('.cursos-image-container', {opacity: 0, x: -30});
    gsap.set('.cursos-text', {opacity: 1}); // Make container visible
    gsap.set('.cursos-title, .cursos-text p', {opacity: 0, y: 30}); // Set initial state for text
    gsap.set('.course-navigation', {opacity: 0, y: 20});
    
    // Animate elements
    cursosTimeline.to('.cursos-image-container', {
        x: 0,
        opacity: 1,
        duration: 1,
    });
    
    cursosTimeline.to('.cursos-title', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.7");
    
    cursosTimeline.to('.cursos-text p', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.5");
    
    cursosTimeline.to('.course-navigation', {
        y: 0,
        opacity: 1,
        duration: 0.8,
    }, "-=0.4");
    
    // For the video implementation (if needed)
    const video = document.getElementById('cursos-video');
    if (video) {
        video.play();
        setTimeout(() => {
            video.pause();
        }, 12000);
    }
    
    // Call fixHeaderText explicitly to ensure it runs
    fixHeaderText();
    
    // Complete all animations within 6 seconds
    cursosTimeline.duration(6);
}

// Enhanced Carousel functionality
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.getElementById('carousel-indicators');
    
    if (!track || !prevBtn || !nextBtn || !indicators) return;
    
    // Clear any existing indicators
    while (indicators.firstChild) {
        indicators.removeChild(indicators.firstChild);
    }
    
    const items = track.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) * 2;
    
    // Calculate visible items based on wrapper width
    const wrapperWidth = track.parentElement.offsetWidth;
    const itemsPerSlide = Math.max(1, Math.floor(wrapperWidth / itemWidth));
    const totalSlides = Math.ceil(items.length / itemsPerSlide);
    
    let currentSlide = 0;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            goToSlide(i);
        });
        
        indicators.appendChild(indicator);
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(totalSlides - 1); // Loop to the last slide
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // Loop to the first slide
        }
    });
    
    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -1 * slideIndex * itemsPerSlide * itemWidth;
        
        gsap.to(track, {
            x: translateX,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Update active indicator
        const allIndicators = indicators.querySelectorAll('.carousel-indicator');
        allIndicators.forEach((ind, index) => {
            if (index === slideIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }
    
    // Auto slide functionality
    let autoSlideInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    }, 4000);
    
    // Pause auto-slide on hover
    track.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.parentElement.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0);
            }
        }, 4000);
    });
    
    // Handle window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newWrapperWidth = track.parentElement.offsetWidth;
            const newItemsPerSlide = Math.max(1, Math.floor(newWrapperWidth / itemWidth));
            
            if (newItemsPerSlide !== itemsPerSlide) {
                // Reset position and reinitialize carousel
                track.style.transform = 'translateX(0)';
                clearInterval(autoSlideInterval);
                initCarousel();
            }
        }, 250);
    });
    
    // Initial animation for carousel items
    items.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.5,
            delay: 0.1 * index,
            ease: "power3.out"
        });
    });
}

// Menu button functionality (for mobile)
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
            }
        });
    }
});


// Add this to your existing JavaScript file

// Function to check if ScrollTrigger is available
function setupScrollTrigger() {
    // Check if ScrollTrigger exists (in case you want to add it in the future)
    if (typeof gsap !== 'undefined' && typeof gsap.ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        // If ScrollTrigger is not available, we'll use a simpler animation approach
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const title = section.querySelector('.about-title');
                    const description = section.querySelector('.about-description') || section.querySelector('.values-list');
                    const imageContainer = section.querySelector('.about-image-container');
                    
                    gsap.to(title, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                    });
                    
                    gsap.to(description, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.3
                    });
                    
                    gsap.to(imageContainer, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: 0.5
                    });
                    
                    // Unobserve after animation
                    observer.unobserve(section);
                }
            });
        }, observerOptions);
        
        // Observe all about sections
        document.querySelectorAll('.about-section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Function to animate about page elements
function animateAboutPage() {
    // First animate navbar
    animateNavbar();
    
    const aboutSections = document.querySelectorAll('.about-section');
    
    // Reset animations first for all sections
    aboutSections.forEach(section => {
        const title = section.querySelector('.about-title');
        const description = section.querySelector('.about-description');
        const valuesList = section.querySelector('.values-list');
        const imageContainer = section.querySelector('.about-image-container');
        
        gsap.set(title, {opacity: 0, y: -30});
        gsap.set(description || valuesList, {opacity: 0, y: 20});
        gsap.set(imageContainer, {opacity: 0, scale: 0.9});
    });
    
    // Setup scroll animations
    setupScrollTrigger();
    
    // Animate first section immediately
    if (aboutSections.length > 0) {
        const firstSection = aboutSections[0];
        const title = firstSection.querySelector('.about-title');
        const description = firstSection.querySelector('.about-description');
        const imageContainer = firstSection.querySelector('.about-image-container');
        
        gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3
        });
        
        gsap.to(description, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.6
        });
        
        gsap.to(imageContainer, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.9
        });
    }
}

// Function to initialize course details
function initCourseDetails() {
    // Course data for all available courses
    const courseData = {
        python: {
            title: "Python",
            level: "Principiante",
            description: "Este curso ofrece las bases necesarias de python",
            logo: "static/img/phyton.png",
            duration: "3 horas",
            modules: "5 módulos",
            projects: "2 proyectos"
        },
        java: {
            title: "Java",
            level: "Principiante",
            description: "Aprende la programación orientada a objetos con Java",
            logo: "static/img/java.png",
            duration: "4 horas",
            modules: "6 módulos",
            projects: "3 proyectos"
        },
        javascript: {
            title: "JavaScript",
            level: "Intermedio",
            description: "Desarrolla aplicaciones web interactivas con JavaScript",
            logo: "static/img/javascript.png",
            duration: "3.5 horas",
            modules: "5 módulos",
            projects: "2 proyectos"
        },
        go: {
            title: "Go",
            level: "Avanzado",
            description: "Aprende a desarrollar aplicaciones con Go rápidas y eficientes",
            logo: "static/img/go.png",
            duration: "5 horas",
            modules: "8 módulos",
            projects: "4 proyectos"
        },
        html: {
            title: "HTML",
            level: "Principiante",
            description: "Aprende a crear estructura para sitios web con HTML",
            logo: "static/img/html.png",
            duration: "2 horas",
            modules: "4 módulos",
            projects: "2 proyectos"
        },
        css: {
            title: "CSS",
            level: "Intermedio",
            description: "Estiliza tus sitios web con las últimas técnicas de CSS",
            logo: "static/img/css.png",
            duration: "3 horas",
            modules: "5 módulos",
            projects: "3 proyectos"
        },
        sql: {
            title: "SQL",
            level: "Todos los niveles",
            description: "Domina las bases de datos relacionales con SQL",
            logo: "static/img/sql.png",
            duration: "4 horas",
            modules: "6 módulos",
            projects: "3 proyectos"
        },
        react: {
            title: "React",
            level: "Intermedio",
            description: "Crea interfaces modernas con la biblioteca React",
            logo: "static/img/react.png",
            duration: "4.5 horas",
            modules: "7 módulos",
            projects: "3 proyectos"
        }
    };

    // Get course details elements
    const detailLogo = document.getElementById('detail-logo');
    const detailTitle = document.getElementById('detail-title');
    const detailLevel = document.getElementById('detail-level');
    const detailDescription = document.getElementById('detail-description');
    const detailDuration = document.getElementById('detail-duration');
    const detailModules = document.getElementById('detail-modules');
    const detailProjects = document.getElementById('detail-projects');
    const courseDetailsSection = document.getElementById('course-details');

    // Function to update course details based on selection
    function updateCourseDetails(courseId) {
        // If course data exists
        if (courseData[courseId]) {
            const course = courseData[courseId];
            
            // Update DOM elements
            detailLogo.src = course.logo;
            detailLogo.alt = `${course.title} logo`;
            detailTitle.textContent = course.title;
            detailLevel.textContent = course.level;
            detailDescription.textContent = course.description;
            detailDuration.textContent = course.duration;
            detailModules.textContent = course.modules;
            detailProjects.textContent = course.projects;
            
            // Show course details with animation
            gsap.fromTo(courseDetailsSection, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }
    }

    // Add click event listeners to course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            courseTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get course id from data attribute
            const courseId = this.getAttribute('data-course');
            
            // Update course details
            updateCourseDetails(courseId);
        });
    });

    // Initialize with the first course (Python)
    updateCourseDetails('python');
    
    // Animate tabs on load
    animateCourseTabs();
}

// Function to animate course tabs
function animateCourseTabs() {
    const tabs = document.querySelectorAll('.course-tab');
    
    gsap.set(tabs, { opacity: 0, y: 20 });
    
    tabs.forEach((tab, index) => {
        gsap.to(tab, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 * index,
            ease: "power3.out"
        });
    });
}

function fixHeaderText() {
    const cursosTitle = document.querySelector('.cursos-title');
    const cursosText = document.querySelector('.cursos-text p');
    
    if (cursosTitle && cursosText) {
        // Make sure these elements are visible
        gsap.set([cursosTitle, cursosText], { opacity: 0, y: 30 });
        
        gsap.to(cursosTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        });
        
        gsap.to(cursosText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out"
        });
    }
}
