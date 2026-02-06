// 1. YOUR DASHBOARD CREDENTIALS
const PUBLIC_KEY = "Y4-hZmhT6O6iSnWXf";
const SERVICE_ID = "service_vgs34mi";
const TEMPLATE_ID = "template_7vwvl3a";

emailjs.init(PUBLIC_KEY);

const btn = document.getElementById('submitBtn');
const checkbox = document.getElementById('valentineCheck');
const message = document.getElementById('message');

// --- THE RUNAWAY LOGIC (ONLY happens on hover) ---
btn.addEventListener('mouseover', () => {
    if (!checkbox.checked) {
        // Set to absolute so it can move anywhere
        btn.style.position = 'absolute'; 
        
        // Calculate random coordinates
        const x = Math.random() * (window.innerWidth - btn.clientWidth - 50);
        const y = Math.random() * (window.innerHeight - btn.clientHeight - 50);
        
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    }
});

// --- THE RESET LOGIC (Snaps button back when she checks the box) ---
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        btn.style.position = 'static'; 
        btn.style.margin = '20px auto';
        message.innerText = ""; // Clear any "You have to check the box" messages
    } else {
        btn.style.position = 'absolute';
    }
});

// --- THE EMAIL LOGIC (ONLY happens on click) ---
btn.addEventListener('click', () => {
    if (checkbox.checked) {
        message.innerText = "Sending the menu... ❤️";
        
        const templateParams = {
            to_name: "Her Name", 
            menu_details: "Course 1: Oysters... Course 2: Steak... Dessert: Chocolate Lava Cake",
            to_email: "her-actual-email@example.com" 
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                message.innerText = "Sent! Check your email. See you then! 🥰";
                celebration(); // Trigger the confetti
                
                // Final touch: hide everything so she can just see the success message
                btn.style.display = 'none';
                checkbox.parentElement.style.display = 'none';
            }, (err) => {
                message.innerText = "Oops, something went wrong. Check the console.";
                console.log("EmailJS Error:", err);
            });
    } else {
        message.innerText = "You have to check the box first! 😉";
    }
});

// --- THE CELEBRATION FUNCTION ---
function celebration() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
        }));
    }, 250);
}