// 1. Initialize EmailJS with your Public Key
(function () {
    emailjs.init("QHNy2JOm9P5A71Dwp");
})();

// DOM Elements
const envelope = document.getElementById('envelope');
const mainCard = document.getElementById('main-card');
const hint = document.getElementById('hint-text');
const noBtn = document.getElementById('noBtn');

// 2. Logic for Opening the Envelope
envelope.addEventListener('click', function () {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        hint.innerText = "the card is rising...";
    }
});

// 3. Logic to transition from Envelope to the Full Letter
mainCard.addEventListener('click', function (e) {
    e.stopPropagation();
    if (envelope.classList.contains('open')) {
        document.getElementById('envelope-page').classList.remove('active');
        document.getElementById('letter-page').classList.add('active');
    }
});

// 4. Page Navigation to Valentine Question
function showValentinePage() {
    document.getElementById('letter-page').classList.remove('active');
    document.getElementById('valentine-page').classList.add('active');
}

// 5. The "No" Button Runner Effect
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 6. Celebration Logic (YES Button Clicked)
function celebrate() {
    // Show email hint + floating text button
    document.getElementById('email-hint').style.display = 'block';

    const nextBtn = document.getElementById('next-page-trigger');
    nextBtn.classList.add('fade-in-btn');

    // Hide Yes / No buttons
    document.querySelector('.btn-row').style.display = 'none';

    // EmailJS parameters
    const templateParams = {
        to_email: "benoliraohezekiah@gmail.com",
        from_name: "Gloxtato",
        message:
            "I’ve been thinking about how special Valentine’s Day is, and I wanted to make sure we celebrate it in a way that feels just as special as you are. So, I’ve already made a reservation for us to spend some time together. Just the two of us, away from everything else."
    };

    // Send email
    emailjs.send("service_d57e5xt", "template_w8l5yl5", templateParams)
        .then(function (response) {
            console.log('EMAIL SENT SUCCESSFULLY!', response.status, response.text);
        }, function (error) {
            console.log('EMAIL FAILED...', error);
        });
}

// 7. Redirect to start.html when floating text is clicked
function goToStartPage() {
    window.location.href = "../html/start.html";
}

// 8. Background Floating Hearts Generator
function createHeart() {
    const container = document.getElementById('hearts-bg');
    if (!container) return;

    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Start generating background hearts
setInterval(createHeart, 600);
