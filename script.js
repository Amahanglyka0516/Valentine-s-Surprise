const envelope = document.getElementById('envelope');
const mainCard = document.getElementById('main-card');
const hint = document.getElementById('hint-text');

// 1. Logic for Envelope Opening
envelope.addEventListener('click', function() {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        hint.innerText = "the card is rising...";
    }
});

// 2. Logic to transition to Full Letter
mainCard.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevents envelope toggle
    if (envelope.classList.contains('open')) {
        document.getElementById('envelope-page').classList.remove('active');
        document.getElementById('letter-page').classList.add('active');
    }
});

// 3. Page Navigation
function showValentinePage() {
    document.getElementById('letter-page').classList.remove('active');
    document.getElementById('valentine-page').classList.add('active');
}

// 4. "No" Button Runner Effect
const noBtn = document.getElementById('noBtn');
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

function celebrate() {
    alert("I knew you'd say YES! ❤️ See you on Valentine's Day!");
}