// dashboard.js - Script for course dashboard functionality

function initCourses() {
    // Load courses when the page loads
    loadCourses();
    
    // Add event listener for any refresh buttons if needed
    const refreshButton = document.getElementById('refresh-courses');
    if (refreshButton) {
        refreshButton.addEventListener('click', loadCourses);
    }
};

// Function to load course data
async function loadCourses() {
    try {
        // Fetch ongoing courses
        const ongoingResponse = await fetch('/api/courses/ongoing');
        const ongoingData = await ongoingResponse.json();
        renderOngoingCourses(ongoingData);
        
        // Fetch available courses
        const availableResponse = await fetch('/api/courses/available');
        const availableData = await availableResponse.json();
        renderAvailableCourses(availableData);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Function to render ongoing courses
function renderOngoingCourses(courses) {
    const container = document.getElementById('ongoing-courses');
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseEl = document.createElement('div');
        courseEl.className = 'course-card';
        
        // Calculate last activity days or hours (mock data for now)
        const lastActivity = course.lastActivity || Math.floor(Math.random() * 3) + 1;
        const activityUnit = Math.random() > 0.5 ? 'días' : 'horas';
        
        courseEl.innerHTML = `
            <div class="course-difficulty course-${course.Dificultad}">${course.Dificultad}</div>
            <div class="course-header">
                <div class="course-icon ${course.Icono_class || getIconClass(course.Curso)}">
                    <i class="${course.Icono || getIconForCourse(course.Curso)}"></i>
                </div>
                <h3 class="course-title">${course.Curso}</h3>
            </div>
            <div class="course-progress">
                <div class="progress-info">
                    <span>Progreso del curso</span>
                    <span>${course.Progreso || 0}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.Progreso || 0}%"></div>
                </div>
                
                <div class="exams">
                    <div class="exam">
                        <div class="exam-score">${course.Examen1 || '-'}/100</div>
                        <div class="exam-label">Examen 1</div>
                    </div>
                    <div class="exam">
                        <div class="exam-score">${course.Examen2 || '-'}/100</div>
                        <div class="exam-label">Examen 2</div>
                    </div>
                </div>
            </div>
            <div class="course-actions">
                <button class="action-button continue" onclick="continueCourse(${course.course_id})">
                    <i class="fas fa-play"></i> Continuar
                </button>
                <button class="action-button unroll">
                    <i class="fas fa-times"></i> Desinscribirse
                </button>
            </div>        
        `;
        
        container.appendChild(courseEl);
    });
    
    // If no courses, show a message
    if (courses.length === 0) {
        container.innerHTML = '<p>No tienes cursos en progreso. ¡Inscríbete en un curso para comenzar!</p>';
    }
}

// Function to render available courses
function renderAvailableCourses(courses) {
    const container = document.getElementById('available-courses');
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseEl = document.createElement('div');
        courseEl.className = 'course-card';
        
        courseEl.innerHTML = `
            <div class="course-difficulty course-${course.Dificultad}">${course.Dificultad}</div>
            <div class="course-header">
                <div class="course-icon ${course.Icono_class || getIconClass(course.Curso)}">
                    <i class="${course.Icono || getIconForCourse(course.Curso)}"></i>
                </div>
                <h3 class="course-title">${course.Curso}</h3>
            </div>
            <div class="course-description">
                ${course.Descripcion || getDescriptionForCourse(course.Curso)}
            </div>
            <div class="course-info">
                <div class="course-hours">
                    <i class="fas fa-clock"></i>
                    ${course.Horas || 3} horas
                </div>
                <div class="course-hours">
                    <i class="fa-solid fa-book-open"></i> ${course.Modulos || 8} módulos
                </div>
                <div class="course-hours">
                    <i class="fa-solid fa-book-open-reader"></i> ${course.Examenes || 2} exámenes
                </div>
            </div>
            <div class="course-actions">
                <button class="action-button continue" onclick="enrollCourse(${course.course_id})">
                    <i class="fas fa-plus"></i> Inscribirse
                </button>
                <button class="action-button details">
                    <i class="fas fa-info-circle"></i> Detalles
                </button>
            </div>        
        `;
        
        container.appendChild(courseEl);
    });
    
    // If no courses, show a message
    if (courses.length === 0) {
        container.innerHTML = '<p>No hay cursos disponibles en este momento.</p>';
    }
}

// Function to enroll in a course
async function enrollCourse(courseId) {
    try {
        const response = await fetch('/api/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id: courseId }),
        });
        
        if (response.ok) {
            // Reload courses to update the lists
            loadCourses();
        } else {
            console.error('Error enrolling in course');
        }
    } catch (error) {
        console.error('Error enrolling in course:', error);
    }
}

// Function to continue a course
function continueCourse(courseId) {
    // Redirect to course page or handle course continuation
    window.location.href = `/course/${courseId}`;
}

// Helper function to get icon class based on course name
function getIconClass(courseName) {
    if (!courseName) return 'python-icon'; // Default if no name provided
    
    const name = courseName.toLowerCase();
    if (name.includes('python')) return 'python-icon';
    if (name.includes('javascript') || name.includes('js')) return 'js-icon';
    if (name.includes('java')) return 'java-logo';
    if (name.includes('pseint')) return 'PSeInt-logo';
    if (name.includes('go')) return 'go-logo';
    if (name.includes('html')) return 'html-logo';
    if (name.includes('css')) return 'css-logo';
    if (name.includes('data')) return 'data-icon';
    if (name.includes('cloud')) return 'cloud-icon';
    if (name.includes('machine') || name.includes('ml')) return 'ml-icon';
    if (name.includes('api')) return 'api-icon';
    if (name.includes('ciber') || name.includes('seguridad')) return 'security-icon';
    return 'python-icon'; // Default
}

// Helper function to get icon for course
function getIconForCourse(courseName) {
    if (!courseName) return 'fas fa-code'; // Default if no name provided
    
    const name = courseName.toLowerCase();
    if (name.includes('python')) return 'fab fa-python';
    if (name.includes('javascript') || name.includes('js')) return 'fab fa-js';
    if (name.includes('data')) return 'fas fa-database';
    if (name.includes('cloud')) return 'fas fa-cloud';
    if (name.includes('machine') || name.includes('ml')) return 'fas fa-brain';
    if (name.includes('api')) return 'fas fa-plug';
    if (name.includes('ciber') || name.includes('seguridad')) return 'fas fa-shield-alt';
    return 'fas fa-code'; // Default
}

// Helper function to get description for course
function getDescriptionForCourse(courseName) {
    if (!courseName) return 'Curso de programación'; // Default if no name provided
    
    const name = courseName.toLowerCase();
    if (name.includes('python')) return 'Aprende los fundamentos de Python, uno de los lenguajes de programación más versátiles y populares.';
    if (name.includes('javascript') || name.includes('js')) return 'Domina JavaScript avanzado para crear aplicaciones web interactivas y dinámicas.';
    if (name.includes('data')) return 'Introducción a la ciencia de datos: conceptos básicos, análisis y visualización.';
    if (name.includes('cloud')) return 'Aprende los fundamentos de los servicios en la nube con AWS, Azure y Google Cloud.';
    if (name.includes('machine') || name.includes('ml')) return 'Introducción al aprendizaje automático con Python y scikit-learn.';
    if (name.includes('api')) return 'Aprende a crear APIs modernas y escalables siguiendo principios RESTful.';
    if (name.includes('ciber') || name.includes('seguridad')) return 'Fundamentos de seguridad informática y protección de sistemas.';
    return 'Amplía tus conocimientos de programación con este curso especializado.';
}
