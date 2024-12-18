document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.querySelector('.close');
    const checkoutForm = document.getElementById('checkoutForm');

    // Initialize modal functionality if elements exist
    if (modal && closeBtn && checkoutForm) {
        closeBtn.onclick = closeModal;
        checkoutForm.onsubmit = validateForm;
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    }

    // Smooth scroll and highlight rank section when coming from index.html
    const urlHash = window.location.hash;
    if (urlHash) {
        const targetElement = document.querySelector(urlHash);
        if (targetElement) {
            // Remove highlight from all rank docs
            document.querySelectorAll('.rank-doc').forEach(doc => {
                doc.classList.remove('highlight');
            });

            // Add highlight to target rank doc
            targetElement.classList.add('highlight');

            // Smooth scroll to the target
            setTimeout(() => {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // Remove highlight after animation
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
            }, 100);
        }
    }

    // Initialize copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling;
            const code = codeBlock.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    navbar.addEventListener('click', function(e) {
        if (e.target === navbar || e.target.closest('.navbar::after')) {
            navLinks.classList.toggle('active');
        }
    });
});

// Store selected rank and price
let currentRank = '';
let currentPrice = 0;

/**
 * Opens the checkout modal with the selected rank details
 * @param {string} rank - The selected rank name
 * @param {number} price - The price of the selected rank
 */
function openModal(rank, price) {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;
    
    currentRank = rank;
    currentPrice = price;
    
    // Update modal content
    document.getElementById('selectedRank').textContent = rank;
    document.getElementById('selectedPrice').textContent = `$${price.toFixed(2)}`;
    
    // Show modal
    modal.style.display = 'block';
}

/**
 * Closes the checkout modal
 */
function closeModal() {
    const modal = document.getElementById('checkoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    if (!modal || !checkoutForm) return;
    
    modal.style.display = 'none';
    // Reset form
    checkoutForm.reset();
}

/**
 * Validates the checkout form
 * @param {Event} event - The form submission event
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validate Minecraft username (3-16 characters, alphanumeric and underscores only)
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(username)) {
        alert('Please enter a valid Minecraft username (3-16 characters, alphanumeric and underscores only)');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // If validation passes, process the purchase
    processPurchase(username, email);
    return false;
}

/**
 * Processes the purchase after form validation
 * @param {string} username - The Minecraft username
 * @param {string} email - The user's email
 */
function processPurchase(username, email) {
    // Here you would typically send the data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you for your purchase!\n\nRank: ${currentRank}\nPrice: $${currentPrice.toFixed(2)}\nUsername: ${username}\nEmail: ${email}\n\nYou will receive further instructions via email.`);
    closeModal();
}

function generateWhatsAppLink(message) {
    const ownerNumber = '6288290128100';
    return `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
}
