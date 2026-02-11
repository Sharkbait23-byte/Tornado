// Improved Login Page JavaScript

// Toast functionality
class Toast {
    constructor() {
        this.container = document.getElementById('toast-container');
    }

    show(message, type = 'info', duration = 5000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Add icon based on type
        const iconElement = document.createElement('i');
        let iconClass = 'fas fa-info-circle';
        
        if (type === 'success') {
            iconClass = 'fas fa-check-circle';
        } else if (type === 'error') {
            iconClass = 'fas fa-exclamation-circle';
        }
        
        iconElement.className = iconClass;
        iconElement.style.marginRight = '10px';
        
        // Create message span
        const messageSpan = document.createElement('span');
        messageSpan.className = 'toast-message';
        messageSpan.textContent = message;
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'toast-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.dismiss(toast));
        
        // Append elements to toast
        toast.appendChild(iconElement);
        toast.appendChild(messageSpan);
        toast.appendChild(closeButton);
        
        // Add toast to container
        this.container.appendChild(toast);
        
        // Trigger animation and set auto-dismiss
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(toast);
            }, duration);
        }
        
        return toast;
    }
    
    dismiss(toast) {
        toast.style.animation = 'fade-out 0.3s forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Convenience methods for different toast types
    success(message, duration) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    }
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Initialize toast
const toast = new Toast();

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Password visibility toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = togglePasswordBtn.querySelector('i');
            if (type === 'password') {
                icon.className = 'fas fa-eye';
            } else {
                icon.className = 'fas fa-eye-slash';
            }
        });
    }
    
    // Form input animations
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email) {
                toast.error('Por favor ingresa tu correo electrónico');
                return;
            }
            
            if (!password) {
                toast.error('Por favor ingresa tu contraseña');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Por favor ingresa un correo electrónico válido');
                return;
            }
            
            // Show loading state on button
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Procesando...</span>';
            submitBtn.disabled = true;
            
            try {
                // Submit the form data to your Tornado backend
                const formData = new FormData(loginForm);
                
                const response = await fetch('/login', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                // Restore button state
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    if (data.success) {
                        toast.success(data.message || 'Inicio de sesión exitoso');
                        // Add success animation to form
                        loginForm.classList.add('success');
                        
                        // Redirect after successful login (adjust as needed)
                      if (data.rol=="Estudiante"){
                        setTimeout(() => {
                          window.location.href = data.redirect || '/studentdash';
                        }, 1500);
                      }
                      
                      if (data.rol=="Administrador"){
                        setTimeout(() => {
                          window.location.href= data.redirect || '/admindash'
                        }, 1500);
                      }
                        
                        
                        /*setTimeout(() => {
                            window.location.href = data.redirect || '/studentdash';
                        }, 1500);*/
                    } else {
                        toast.error(data.message || 'Error de inicio de sesión');
                        // Add shake animation to form on error
                        loginForm.classList.add('error');
                        setTimeout(() => {
                            loginForm.classList.remove('error');
                        }, 500);
                    }
                }, 1000); // Simulate network delay for better UX
                
            } catch (error) {
                console.error('Error:', error);
                
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                toast.error('Error de conexión. Intenta nuevamente.');
                
                // Add shake animation to form on error
                loginForm.classList.add('error');
                setTimeout(() => {
                    loginForm.classList.remove('error');
                }, 500);
            }
        });
    }
    
    // Check for messages from Tornado (these can be passed via URL params or stored in sessionStorage)
    const checkForMessages = () => {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const messageType = urlParams.get('messageType');
        const message = urlParams.get('message');
        
        if (message) {
            if (messageType === 'error') {
                toast.error(message);
            } else if (messageType === 'success') {
                toast.success(message);
            } else {
                toast.info(message);
            }
            
            // Clean up the URL if needed
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
        
        // Check session storage (alternative method)
        const storedMessage = sessionStorage.getItem('flashMessage');
        const storedType = sessionStorage.getItem('flashMessageType');
        
        if (storedMessage) {
            if (storedType === 'error') {
                toast.error(storedMessage);
            } else if (storedType === 'success') {
                toast.success(storedMessage);
            } else {
                toast.info(storedMessage);
            }
            
            // Clean up after displaying
            sessionStorage.removeItem('flashMessage');
            sessionStorage.removeItem('flashMessageType');
        }
    };
    
    // Apply subtle animations
    const applyAnimations = () => {
        const container = document.querySelector('.login-container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }
    };
    
    // Initialize
    checkForMessages();
    applyAnimations();
});
