document.addEventListener('DOMContentLoaded', function() {
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    const contentArea = document.getElementById('content-area');
    const headerTitle = document.querySelector('.header-title');
    const userProfile = document.getElementById('user-profile');
    const userDropdown = document.getElementById('user-dropdown');
    
    // Toggle user dropdown
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        userDropdown.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside it
    userDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Logout functionality
    document.getElementById('logout-link').addEventListener('click', function(e) {
        window.location.href = '/logout';
        
        /* AJAX request to logout endpoint
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Xsrftoken': getCookie('_xsrf') // Tornado CSRF protection
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                // Redirect to login page
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });*/
    });
    
    // Function to get CSRF cookie for Tornado
    function getCookie(name) {
        const r = document.cookie.match(`\\b${name}=([^;]*)\\b`);
        return r ? r[1] : undefined;
    }
    
    // Function to update active menu item
    function setActiveMenuItem(clickedItem) {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
    }
    
    // Function to apply JavaScript from JSON data
    function applyJavaScript(jsCode) {
        try {
            // Clean the backtick formatting from the string
            jsCode = jsCode.replace(/^`|`$/g, '');
            
            // Create a function from the JavaScript code
            const scriptFunction = new Function(jsCode);
            
            // Execute the script
            scriptFunction();
            
            // If the code contains a specific initialization function, call it
            if (typeof window.initmiscursos === 'function') {
                window.initmiscursos();
            }
        } catch (error) {
            console.error('Error executing JavaScript:', error);
        }
    }
    
    // Function to load content via AJAX
    function loadContent(section) {
        // Show loading spinner
        contentArea.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        
        // Update header title
        const icon = section === 'estudiantes' ? 'user-graduate' : 
                     section === 'administrativos' ? 'user-tie' :
                     section === 'monitorear' ? 'laptop-code' :
                     section === 'analisis' ? 'chart-simple' :
                     //section === 'mi-perfil' ? 'user' : 
                     section === 'mi-perfil' ? 'user' : 'user-graduate';
        
        const sectionTitle = section.split('-').map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
                     
        headerTitle.innerHTML = `<i class="fas fa-${icon}"></i> ${sectionTitle}`;
        
        // First check if content is in cache
        const cachedContent = sessionStorage.getItem(`content_${section}`);
        const cachedTimestamp = sessionStorage.getItem(`content_${section}_timestamp`);
        const currentTime = new Date().getTime();
        
        // Cache valid for 5 minutes (300000 ms)
        if (cachedContent && cachedTimestamp && (currentTime - cachedTimestamp < 300000)) {
            // Parse the cached content and apply it
            try {
                const contentData = JSON.parse(cachedContent);
                applyContent(contentData);
            } catch (e) {
                // If parsing fails, use the cached content as is (for backward compatibility)
                contentArea.innerHTML = cachedContent;
            }
            return;
        }
        
        // If not in cache or cache expired, fetch from server
        fetch(`/api/admindash/${section}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Xsrftoken': getCookie('_xsrf') // Tornado CSRF protection
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store in session storage with timestamp
            sessionStorage.setItem(`content_${section}`, JSON.stringify(data));
            sessionStorage.setItem(`content_${section}_timestamp`, currentTime.toString());
            
            // Display the content
            applyContent(data);
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            contentArea.innerHTML = `
                <div class="card">
                    <div class="card-title">Error</div>
                    <p>Error al cargar el contenido. Por favor, intente nuevamente.</p>
                    <button class="btn" onclick="loadContent('${section}')">Reintentar</button>
                </div>
            `;
        });
    }
    
    // Function to apply the content from the JSON format
    function applyContent(data) {
        // Check if the data is in the new JSON format
        if (data.HTML || data.CSS || data.JavaScript) {
            // Create style element for CSS
            if (data.CSS) {
                // Remove any previous dynamic style
                const prevStyle = document.getElementById('dynamic-section-style');
                if (prevStyle) {
                    prevStyle.remove();
                }
                
                // Clean the backtick formatting from the string
                const cleanCSS = data.CSS.replace(/^`|`$/g, '');
                
                // Create new style element
                const styleEl = document.createElement('style');
                styleEl.id = 'dynamic-section-style';
                styleEl.textContent = cleanCSS;
                document.head.appendChild(styleEl);
                
                
            }
            
            // Apply HTML content
            if (data.HTML) {
                // Clean the backtick formatting from the string
                const cleanHTML = data.HTML.replace(/^`|`$/g, '');
                contentArea.innerHTML = cleanHTML;
            }
            
            // Apply JavaScript
            if (data.JavaScript) {
                applyJavaScript(data.JavaScript);
            }
        } else {
            // For backward compatibility, if data is in the old format
            contentArea.innerHTML = data.html || data;
        }
    }
    
    // Add click event to all menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveMenuItem(this);
            
            // Get section from data attribute
            const section = this.getAttribute('data-section');
            loadContent(section);
        });
    });
    
    // Load the default content (Mis cursos)
    loadContent('estudiantes');
});
