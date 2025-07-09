document.addEventListener('DOMContentLoaded', function() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const envelope = document.querySelector('.envelope');
    const card = document.querySelector('.card');
    const instructions = document.querySelector('.instructions');
    
    let animationStarted = false;
    
    // Animation sequence
    function startAnimation() {
        if (animationStarted) return;
        animationStarted = true;
        
        // Hide instructions
        instructions.style.opacity = '0';
        instructions.style.transform = 'translateY(20px)';
        
        // Step 1: Open the envelope flap
        envelope.classList.add('opening');
        
        // Step 2: Pull out the card (after envelope opens)
        setTimeout(() => {
            card.classList.add('pulled-out');
        }, 800);
        
        // Step 3: Open the card to reveal the letter (after card is pulled out)
        setTimeout(() => {
            card.classList.add('opened');
        }, 3000);
        
        // Optional: Reset animation after viewing the letter
        setTimeout(() => {
            showResetButton();
        }, 6000);
    }
    
    // Show reset button
    function showResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'View Again';
        resetBtn.className = 'reset-btn';
        resetBtn.style.cssText = `
            margin-top: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        `;
        
        document.querySelector('.container').appendChild(resetBtn);
        
        // Animate button in
        setTimeout(() => {
            resetBtn.style.opacity = '1';
            resetBtn.style.transform = 'translateY(0)';
        }, 100);
        
        // Reset functionality
        resetBtn.addEventListener('click', resetAnimation);
        
        // Hover effects
        resetBtn.addEventListener('mouseenter', () => {
            resetBtn.style.transform = 'translateY(-2px) scale(1.05)';
            resetBtn.style.boxShadow = '0 7px 20px rgba(255, 20, 147, 0.4)';
        });
        
        resetBtn.addEventListener('mouseleave', () => {
            resetBtn.style.transform = 'translateY(0) scale(1)';
            resetBtn.style.boxShadow = '0 5px 15px rgba(255, 20, 147, 0.3)';
        });
    }
    
    // Reset animation
    function resetAnimation() {
        animationStarted = false;
        
        // Remove animation classes
        envelope.classList.remove('opening');
        card.classList.remove('pulled-out', 'opened');
        
        // Remove reset button
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.remove();
        }
        
        // Show instructions again
        setTimeout(() => {
            instructions.style.opacity = '0.7';
            instructions.style.transform = 'translateY(0)';
            instructions.innerHTML = '<p>Click the envelope to start the animation!</p>';
        }, 500);
    }
    
    // Click event for envelope
    envelopeWrapper.addEventListener('click', startAnimation);
    
    // Add some interactive hover effects
    envelopeWrapper.addEventListener('mouseenter', () => {
        if (!animationStarted) {
            envelope.style.transform = 'scale(1.02) translateY(-2px)';
            envelope.style.transition = 'transform 0.3s ease';
        }
    });
    
    envelopeWrapper.addEventListener('mouseleave', () => {
        if (!animationStarted) {
            envelope.style.transform = 'scale(1) translateY(0)';
        }
    });
    
    // Add sparkle effect on hover
    envelopeWrapper.addEventListener('mousemove', (e) => {
        if (animationStarted) return;
        
        const rect = envelopeWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        createSparkle(x, y);
    });
    
    // Create sparkle effect
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #fff, #ff69b4);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnimation 0.6s ease-out forwards;
            z-index: 20;
        `;
        
        envelopeWrapper.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 600);
    }
    
    // Add sparkle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        .instructions {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add some random floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            pointer-events: none;
            z-index: 1;
            animation: floatUp ${Math.random() * 3 + 4}s linear forwards;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }
    
    // Add floating hearts animation
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(heartStyle);
    
    // Create floating hearts periodically
    setInterval(createFloatingHeart, 3000);
    
    console.log("Pink envelope animation loaded! Click the envelope to start the magic! 💖");
});