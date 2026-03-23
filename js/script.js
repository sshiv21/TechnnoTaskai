// Navigation & Scrolling
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const scrollProgress = document.querySelector('.scroll-progress');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Format current year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll Effects
window.addEventListener('scroll', () => {
    // Navbar style
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

// Scroll to Top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for Animations (Fade up)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // keep it to animate once or remove to animate always
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Contact Form Submission (AJAX via FormSubmit)
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Change button state
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        const formData = {
            subject: "New Contact Form Submission",
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Send to FormSubmit API
        fetch("https://formsubmit.co/ajax/technotaskai0020@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            btn.innerHTML = 'Error! Try Again';
            btn.disabled = false;
        });
    });
}

// Chatbot functionality
const chatbotTrigger = document.getElementById('chatbotTrigger');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const chatBody = document.getElementById('chatBody');

chatbotTrigger.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotTrigger.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    setTimeout(() => {
        chatbotTrigger.style.display = 'flex';
    }, 300);
});

// Simple bot responses
const botResponses = [
    "That's a great question! Our team can definitely help with that. Would you like to schedule a free consultation?",
    "We specialize in AI automation and custom web development. Our solutions are tailored to scale your business.",
    "I'm a demo bot, but a human expert from Technotask AI would love to discuss this further. Should I have them email you?",
    "We've helped similar businesses increase efficiency by up to 400% with our custom tools."
];

function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="msg-content">${text}</div>`;
    chatBody.appendChild(userMsg);
    
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Bot typing simulation
    setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot fade-up visible';
        botMsg.innerHTML = `<div class="msg-content">${randomResponse}</div>`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

sendChat.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// Lead Capture Popup Logic
const leadPopup = document.getElementById('leadPopup');
const closePopup = document.getElementById('closePopup');
const popupForm = document.getElementById('popupForm');

// Show popup after 10 seconds or scroll
let popupShown = false;

function showPopup() {
    if (!popupShown) {
        leadPopup.classList.add('active');
        popupShown = true;
    }
}

// Trigger mechanisms
setTimeout(showPopup, 12000); // After 12 seconds

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 40 && !popupShown) {
        showPopup();
    }
});

closePopup.addEventListener('click', () => {
    leadPopup.classList.remove('active');
});

// Close popup on outside click
leadPopup.addEventListener('click', (e) => {
    if (e.target === leadPopup) {
        leadPopup.classList.remove('active');
    }
});

popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = popupForm.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Requesting...';
    btn.disabled = true;
    
    const emailInput = popupForm.querySelector('input[type="email"]').value;

    fetch("https://formsubmit.co/ajax/technotaskai0020@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            subject: "New Free System Audit Request (Lead Capture)",
            email: emailInput
        })
    })
    .then(response => response.json())
    .then(data => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Claimed!';
        btn.classList.add('bg-green');
        
        setTimeout(() => {
            leadPopup.classList.remove('active');
            btn.innerHTML = originalText;
            btn.classList.remove('bg-green');
            btn.disabled = false;
            popupForm.reset();
        }, 1500);
    })
    .catch(error => {
        console.error('Error:', error);
        btn.innerHTML = 'Error, Try Again';
        btn.disabled = false;
    });
});
