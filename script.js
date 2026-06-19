function nextScreen(currentId, nextId) {
    document.getElementById(currentId).classList.add('hidden');
    
    setTimeout(() => {
        document.getElementById(nextId).classList.remove('hidden');
    }, 500);
}

// Start falling roses on page load
document.addEventListener('DOMContentLoaded', () => {
    startFallingRoses();
});

function startFallingRoses() {
    const totalDuration = 7000; // 7 seconds
    
    // Generate roses
    const interval = setInterval(() => {
        const rose = document.createElement('img');
        rose.src = 'rose .png';
        rose.classList.add('rose-petal');
        rose.style.left = Math.random() * 100 + 'vw';
        
        // Randomize size between 30px and 60px
        const size = Math.random() * 30 + 30;
        rose.style.width = size + 'px';
        
        // Exact 7s falling duration
        rose.style.animationDuration = '7s';
        
        document.body.appendChild(rose);
        
        // Clean up
        setTimeout(() => {
            rose.remove();
        }, 7000);
    }, 200);

    // Stop spawning after 7 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, totalDuration);
}

function openEnvelope() {
    const flap = document.getElementById('env-flap');
    const letter = document.getElementById('letter-wrapper');
    const indicator = document.getElementById('click-indicator');

    // 1. Open flap (the sliced top image)
    flap.style.transform = 'rotateX(180deg)';
    flap.style.zIndex = '1';
    if (indicator) indicator.style.opacity = '0';

    // 2. Slide letter out
    setTimeout(() => {
        letter.style.transform = 'translate(-50%, -100%) scale(0.3)';
    }, 600);

    // 3. Bring letter to front and scale up
    setTimeout(() => {
        letter.style.zIndex = '10';
        letter.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Hide envelope elements to just show scrapbook page
        document.querySelector('.env-back').style.opacity = '0';
        document.getElementById('env-pocket').style.opacity = '0';
        flap.style.opacity = '0';
    }, 1200);
}

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let yesSize = 1;
let noClicks = 0;

const noTexts = [
    "No",
    "Are you sure?",
    "Bhavya please! 🥺",
    "Think again!",
    "Don't do this to me! 😭",
    "I'll be very sad...",
    "You're breaking my heart 💔",
    "Just click Yes!",
    "Okay I'm crying now 😭",
    "Please say yes to your cutie!"
];

noBtn.addEventListener('click', () => {
    noClicks++;
    
    // Increase size of Yes button
    yesSize += 0.5;
    yesBtn.style.transform = `scale(${yesSize})`;
    
    // Change text of No button
    if (noClicks < noTexts.length) {
        noBtn.innerText = noTexts[noClicks];
    } else {
        noBtn.innerText = "Pls 🥺";
    }
    
    // Make the button move around slightly randomly
    if (noClicks > 3) {
        const randomX = Math.floor(Math.random() * 150) - 75;
        const randomY = Math.floor(Math.random() * 150) - 75;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
});

yesBtn.addEventListener('click', () => {
    nextScreen('screen-2', 'success-screen');
});
