// Web3Forms configuration for contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(contactForm);
        formData.append("access_key", "9fc1f0ed-f1ec-47ac-97fe-a08c6ad082c9");
        
        // Show loading state
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Success
                showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
                contactForm.reset();
                
                // Remove "valid" class from all inputs
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('valid');
                });
            } else {
                // Error
                showNotification("Erro ao enviar mensagem: " + (data.message || "Tente novamente mais tarde."), "error");
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification("Erro de conexão. Verifique sua internet e tente novamente.", "error");
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Helper function to show notifications
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        min-width: 300px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);