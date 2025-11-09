// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('navLinks');
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

// Initialize Swiper
const swiper = new Swiper('.servicesSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    on: {
        slideChange: function () {
            updateSlideCounter(this.realIndex + 1);
        },
    },
});

// Update slide counter
function updateSlideCounter(current) {
    const currentSlide = document.querySelector('.current-slide');
    currentSlide.textContent = current.toString().padStart('0');
}

// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

// Play button functionality
function playVideo() {
    alert('Video player would open here. Replace this with your video modal or player logic.');
    // You can add your video modal or YouTube embed logic here
}

// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

// Testimonials data
const testimonials = [
    {
        text: "Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched. I highly recommend their services to anyone looking for top-quality development work.",
        name: "Romeena De Silva",
        role: "Janet Cosmetics"
    },
    {
        text: "The professionalism and expertise shown by this agency is remarkable. They delivered our project on time and exceeded all our expectations. Truly a five-star experience from start to finish.",
        name: "Romeena De Silva",
        role: "Janet Cosmetics"
    },
    {
        text: "Without any doubt I recommend Alcaline Solutions as one of the best web design and digital marketing agencies. One of the best agencies I've came across so far. Wouldn't be hesitated to introduce their work to someone else.",
        name: "Imran Khan",
        role: "Software Engineer"
    },
    {
        text: "Outstanding service and incredible results! The team went above and beyond to ensure our vision came to life. Their technical skills combined with creative thinking made all the difference.",
        name: "Romeena De Silva",
        role: "Janet Cosmetics"
    },
    {
        text: "I cannot speak highly enough about the quality of work delivered. The communication was excellent throughout the project, and the final product was exactly what we needed. Will definitely work with them again.",
        name: "Romeena De Silva",
        role: "Janet Cosmetics"
    }
];

let currentIndex = 2;

// Initialize with default testimonial
function init() {
    updateTestimonial();
}

// Update testimonial display
function updateTestimonial() {
    const textElement = document.getElementById('testimonialText');
    textElement.classList.remove('fade-enter');

    setTimeout(() => {
        textElement.textContent = testimonials[currentIndex].text;
        textElement.classList.add('fade-enter');
    }, 50);

    // Update active avatar
    const avatars = document.querySelectorAll('.avatar-item');
    avatars.forEach((avatar, index) => {
        if (index === currentIndex) {
            avatar.classList.add('active');
        } else {
            avatar.classList.remove('active');
        }
    });
}

// Change testimonial with arrows
function changeTestimonial(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = testimonials.length - 1;
    } else if (currentIndex >= testimonials.length) {
        currentIndex = 0;
    }

    updateTestimonial();
}

// Select specific testimonial
function selectTestimonial(index) {
    currentIndex = index;
    updateTestimonial();
}

// Initialize on page load
init();

// Initialize AOS
AOS.init({
    once: true,
    offset: 100
});

AOS.init({
    once: true,
    offset: 100,
    duration: 1000
});

// Initialize AOS
AOS.init({
    once: true,
    offset: 100,
    duration: 800
});

// Initialize AOS
AOS.init({
    once: false,
    offset: 100,
    duration: 600
});

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Refresh AOS animations for the newly visible content
    AOS.refresh();
}

// Initialize AOS
AOS.init({
    once: true,
    offset: 100,
    duration: 800
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100,
    easing: 'ease-in-out-cubic'
});

// Smooth scroll reveal on cards
const cards = document.querySelectorAll('.resource-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach(card => {
    cardObserver.observe(card);
});

// Pause animation on hover (already in CSS, but adding JS backup)
const marqueeContent = document.getElementById('marqueeContent');

marqueeContent.addEventListener('mouseenter', () => {
    marqueeContent.style.animationPlayState = 'paused';
});

marqueeContent.addEventListener('mouseleave', () => {
    marqueeContent.style.animationPlayState = 'running';
});

// Chat Bot SCript
// Chatbot functionality
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const leadFormOverlay = document.querySelector('.lead-form-overlay');
    const closeFormButtons = document.querySelectorAll('.close-form');
    const leadForm = document.getElementById('leadForm');

    // Knowledge Base
    const knowledgeBase = {
        services: {
            response: "We offer a wide range of software development services including:",
            items: [
                "Custom Web Application Development",
                "Mobile App Development (iOS & Android)",
                "E-commerce Solutions",
                "Cloud Infrastructure & DevOps",
                "UI/UX Design",
                "IT Consulting & Digital Transformation"
            ],
            followUp: "Which service are you most interested in?"
        },
        techStack: {
            response: "We work with modern technologies to deliver high-quality solutions:",
            frontend: ["React", "Vue.js", "Angular", "TypeScript"],
            backend: ["Node.js", "Python", "Java", "PHP"],
            mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
            databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
            cloud: ["AWS", "Google Cloud", "Azure", "Docker"]
        },
        pricing: {
            response: "Our pricing depends on project complexity, timeline, and requirements:",
            models: [
                "Fixed Price - For well-defined projects with clear requirements",
                "Time & Materials - For projects with evolving requirements",
                "Dedicated Team - For long-term partnerships"
            ],
            ranges: {
                "Web Application": "$5,000 - $50,000+",
                "Mobile Application": "$10,000 - $75,000+",
                "E-commerce Platform": "$15,000 - $100,000+"
            },
            note: "We offer free initial consultations to provide accurate estimates for your specific project."
        },
        schedule: {
            response: "I can help you schedule a consultation with our team.",
            action: "show_lead_form"
        },
        greeting: "Hello! I'm your Software House assistant. How can I help you today?",
        fallback: "I'm not sure I understand. Could you rephrase that? You can ask me about our services, tech stack, pricing, or schedule a consultation."
    };

    // Conversation flows
    const conversationFlows = {
        "what services do you offer?": "services",
        "services": "services",
        "what can you build?": "services",
        "what do you develop?": "services",
        "what is your tech stack?": "techStack",
        "technologies": "techStack",
        "what technologies do you use?": "techStack",
        "how much does it cost?": "pricing",
        "pricing": "pricing",
        "cost": "pricing",
        "price": "pricing",
        "budget": "pricing",
        "how much?": "pricing",
        "schedule a meeting": "schedule",
        "schedule a demo": "schedule",
        "schedule a call": "schedule",
        "book a meeting": "schedule",
        "consultation": "schedule",
        "demo": "schedule",
        "hello": "greeting",
        "hi": "greeting",
        "hey": "greeting"
    };

    // Toggle chatbot: open/close, update toggle icon, focus input
    chatbotToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = chatbotContainer.classList.toggle('active');

        // update floating button icon
        const icon = chatbotToggle.querySelector('i');
        if (icon) icon.className = opened ? 'fas fa-times' : 'fas fa-comments';

        // focus input when opened (after transition)
        if (opened) {
            setTimeout(() => {
                if (messageInput) messageInput.focus();
            }, 250);
        }
    });

    // Close button inside chat header
    chatbotClose.addEventListener('click', function (e) {
        e.stopPropagation();
        chatbotContainer.classList.remove('active');
        const icon = chatbotToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-comments';
    });

    // Close when clicking outside the chat container (but ignore clicks on the toggle)
    document.addEventListener('click', function (e) {
        if (!chatbotContainer.classList.contains('active')) return;
        if (chatbotContainer.contains(e.target) || chatbotToggle.contains(e.target)) return;
        chatbotContainer.classList.remove('active');
        const icon = chatbotToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-comments';
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && chatbotContainer.classList.contains('active')) {
            chatbotContainer.classList.remove('active');
            const icon = chatbotToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-comments';
        }
    });

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';

            // Simulate typing indicator while we call the server
            const typingIndicator = addTypingIndicator();

            // Send to backend OpenAI proxy
            queryOpenAI(message).then(botReply => {
                removeTypingIndicator(typingIndicator);
                if (botReply) {
                    addMessage(botReply, 'bot');
                } else {
                    addMessage("Sorry, I couldn't get a response.", 'bot');
                }
            }).catch(err => {
                removeTypingIndicator(typingIndicator);
                console.error(err);
                addMessage("An error occurred while contacting the assistant.", 'bot');
            });
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick replies
    quickReplies.forEach(button => {
        button.addEventListener('click', function () {
            const message = this.getAttribute('data-message');
            addMessage(message, 'user');

            const typingIndicator = addTypingIndicator();
            queryOpenAI(message).then(botReply => {
                removeTypingIndicator(typingIndicator);
                addMessage(botReply, 'bot');
            }).catch(err => {
                removeTypingIndicator(typingIndicator);
                console.error(err);
                addMessage("An error occurred while contacting the assistant.", 'bot');
            });
        });
    });

    // Function that sends user message to backend which calls OpenAI
    async function queryOpenAI(message) {
        try {
            const resp = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.error || 'Network error');
            }
            const data = await resp.json();
            return data.answer;
        } catch (err) {
            throw err;
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        // Handle both string and array responses
        if (Array.isArray(text)) {
            text.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                messageContent.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = text;
            messageContent.appendChild(p);
        }

        messageDiv.appendChild(messageContent);

        const messageTime = document.createElement('div');
        messageTime.classList.add('message-time');
        messageTime.textContent = getCurrentTime();

        messageDiv.appendChild(messageTime);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Add typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message');
        typingDiv.id = 'typing-indicator';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const typingText = document.createElement('p');
        typingText.innerHTML = '<i class="fas fa-ellipsis-h"></i> Typing...';

        messageContent.appendChild(typingText);
        typingDiv.appendChild(messageContent);
        chatbotMessages.appendChild(typingDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        return typingDiv;
    }

    // Remove typing indicator
    function removeTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
    }

    // Process user message and generate response
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let responseType = "fallback";

        // Check for matching conversation flows
        for (const [key, value] of Object.entries(conversationFlows)) {
            if (lowerMessage.includes(key)) {
                responseType = value;
                break;
            }
        }

        // Generate response based on type
        let response;
        let quickReplies = [];

        switch (responseType) {
            case "services":
                response = knowledgeBase.services.response;
                addMessage(response, 'bot');

                // Add service items as separate messages
                setTimeout(() => {
                    knowledgeBase.services.items.forEach(item => {
                        addMessage(`• ${item}`, 'bot');
                    });

                    setTimeout(() => {
                        addMessage(knowledgeBase.services.followUp, 'bot');
                        addQuickReplies(["Web Development", "Mobile Apps", "E-commerce", "IT Consulting"]);
                    }, 500);
                }, 500);
                return;

            case "techStack":
                response = knowledgeBase.techStack.response;
                addMessage(response, 'bot');

                setTimeout(() => {
                    addMessage(`Frontend: ${knowledgeBase.techStack.frontend.join(', ')}`, 'bot');
                    addMessage(`Backend: ${knowledgeBase.techStack.backend.join(', ')}`, 'bot');
                    addMessage(`Mobile: ${knowledgeBase.techStack.mobile.join(', ')}`, 'bot');
                    addMessage(`Databases: ${knowledgeBase.techStack.databases.join(', ')}`, 'bot');
                    addMessage(`Cloud: ${knowledgeBase.techStack.cloud.join(', ')}`, 'bot');

                    setTimeout(() => {
                        addMessage("Would you like to know about our services or pricing?", 'bot');
                        addQuickReplies(["Services", "Pricing", "Schedule Demo"]);
                    }, 500);
                }, 500);
                return;

            case "pricing":
                response = knowledgeBase.pricing.response;
                addMessage(response, 'bot');

                setTimeout(() => {
                    knowledgeBase.pricing.models.forEach(model => {
                        addMessage(`• ${model}`, 'bot');
                    });

                    setTimeout(() => {
                        addMessage("Typical project ranges:", 'bot');

                        for (const [project, range] of Object.entries(knowledgeBase.pricing.ranges)) {
                            addMessage(`• ${project}: ${range}`, 'bot');
                        }

                        setTimeout(() => {
                            addMessage(knowledgeBase.pricing.note, 'bot');
                            addQuickReplies(["Web App Quote", "Mobile App Quote", "Schedule Consultation"]);
                        }, 500);
                    }, 500);
                }, 500);
                return;

            case "schedule":
                response = knowledgeBase.schedule.response;
                addMessage(response, 'bot');

                setTimeout(() => {
                    showLeadForm();
                }, 1000);
                return;

            case "greeting":
                response = knowledgeBase.greeting;
                break;

            default:
                response = knowledgeBase.fallback;
                break;
        }

        addMessage(response, 'bot');

        // Add default quick replies for fallback
        if (responseType === "fallback" || responseType === "greeting") {
            addQuickReplies(["Services", "Tech Stack", "Pricing", "Schedule Demo"]);
        }
    }

    // Add quick reply buttons
    function addQuickReplies(labels) {
        // Remove existing quick replies
        const existingReplies = document.querySelectorAll('.quick-replies');
        existingReplies.forEach(reply => reply.remove());

        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.classList.add('quick-replies');

        labels.forEach(label => {
            const button = document.createElement('button');
            button.classList.add('quick-reply');
            button.setAttribute('data-message', label);

            // Add appropriate icon based on label
            let iconClass = 'fas fa-comment';
            if (label.includes('Service') || label.includes('Tech')) iconClass = 'fas fa-laptop-code';
            if (label.includes('Pricing') || label.includes('Quote')) iconClass = 'fas fa-dollar-sign';
            if (label.includes('Schedule') || label.includes('Demo') || label.includes('Consultation')) iconClass = 'fas fa-calendar-alt';
            if (label.includes('Web')) iconClass = 'fas fa-globe';
            if (label.includes('Mobile')) iconClass = 'fas fa-mobile-alt';
            if (label.includes('E-commerce')) iconClass = 'fas fa-shopping-cart';

            button.innerHTML = `<i class="${iconClass}"></i> ${label}`;

            button.addEventListener('click', function () {
                const message = this.getAttribute('data-message');
                addMessage(message, 'user');

                // Simulate typing indicator
                const typingIndicator = addTypingIndicator();

                // Process message after a short delay
                setTimeout(() => {
                    removeTypingIndicator(typingIndicator);
                    processUserMessage(message);
                }, 1000);
            });

            quickRepliesDiv.appendChild(button);
        });

        chatbotMessages.appendChild(quickRepliesDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get current time for message timestamp
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Show lead form
    function showLeadForm() {
        leadFormOverlay.classList.add('active');
    }

    // Close lead form
    closeFormButtons.forEach(button => {
        button.addEventListener('click', function () {
            chatbotContainer.classList.remove('active');
            leadFormOverlay.classList.remove('active');
        });
    });

    // Handle form submission
    leadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(leadForm);
        const name = formData.get('name');
        const email = formData.get('email');

        // In a real application, you would send this data to a server
        console.log('Lead captured:', { name, email });

        // Show confirmation message
        addMessage(`Thank you, ${name}! We've received your information and will contact you at ${email} within 24 hours to schedule your consultation.`, 'bot');

        // Close the form
        leadFormOverlay.classList.remove('active');

        // Reset the form
        leadForm.reset();

        // Add follow-up quick replies
        setTimeout(() => {
            addQuickReplies(["Our Services", "Tech Stack", "Portfolio"]);
        }, 500);
    });

    // Close form when clicking outside
    leadFormOverlay.addEventListener('click', function (e) {
        if (e.target === leadFormOverlay) {
            leadFormOverlay.classList.remove('active');
        }
    });
});
