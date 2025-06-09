const nerdImg = document.getElementById('main-nerd');
const throwContainer = document.getElementById('nerd-throws');
const ballCountDisplay = document.getElementById('ball-count');

let currentBallCount = 20;

// Listen for clicks on the nerd image
nerdImg.addEventListener('click', () => {
  // Stop if no paper balls left
  if (currentBallCount <= 0) return;

  // Get position and size of nerd image and container
  const nerdRect = nerdImg.getBoundingClientRect();
  const containerRect = throwContainer.getBoundingClientRect();

  // Create a new paper ball image to throw
  const smallNerd = document.createElement('img');
  smallNerd.src = './media/paper-ball.png';
  smallNerd.className = 'thrown-nerd';

  // Calculate target position (center of nerd image relative to container)
  const targetX = nerdRect.left - containerRect.left + nerdRect.width / 2 - 25;
  const targetY = nerdRect.top - containerRect.top + nerdRect.height / 2 - 25;

  // Pick a random side of the container to start the throw
  const sides = ['left', 'right', 'top', 'bottom'];
  const side = sides[Math.floor(Math.random() * sides.length)];

  // Set start coordinates based on chosen side
  let startX = 0, startY = 0;
  if (side === 'left') {
    startX = -60;
    startY = Math.random() * containerRect.height;
  } else if (side === 'right') {
    startX = containerRect.width + 60;
    startY = Math.random() * containerRect.height;
  } else if (side === 'top') {
    startX = Math.random() * containerRect.width;
    startY = -60;
  } else if (side === 'bottom') {
    startX = Math.random() * containerRect.width;
    startY = containerRect.height + 60;
  }

  // Position the paper ball at its start point
  smallNerd.style.left = `${startX}px`;
  smallNerd.style.top = `${startY}px`;

  // Add paper ball to the container so it appears on screen
  throwContainer.appendChild(smallNerd);

  // Animate the paper ball moving towards the nerd
  requestAnimationFrame(() => {
    const dx = targetX - startX;
    const dy = targetY - startY;
    smallNerd.style.transform = `translate(${dx}px, ${dy}px) scale(1) rotate(720deg)`;
    smallNerd.style.opacity = '0';
  });

  // Add hit effect to nerd image
  nerdImg.classList.add('nerd-hit');
  setTimeout(() => nerdImg.classList.remove('nerd-hit'), 400);

  // Remove paper ball element after animation ends
  setTimeout(() => smallNerd.remove(), 1000);

  // Decrement paper ball count and update display
  currentBallCount--;
  ballCountDisplay.textContent = `${currentBallCount}/20`;

  // If no balls left, redirect to home after short delay
  if (currentBallCount <= 0) {
    setTimeout(() => {
      window.location.href = "/";
    }, 500); // delay for user experience
  }
});
