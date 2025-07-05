document.addEventListener('DOMContentLoaded', function () {

  const outputtext = document.getElementById('game');
  const bubblesContainer = document.getElementById('bubbles-container');

  // Configurations par niveau
  const levelsConfig = {
    easy: { maxRange: 10, maxChances: 3, bubbleSize: '60px' },
    medium: { maxRange: 25, maxChances: 5, bubbleSize: '50px' },
    hard: { maxRange: 50, maxChances: 7, bubbleSize: '40px' }
  };

  let currentLevel = 'easy';
  let chances = 0;
  let numberMystere = 0;
  let gameOver = false;
  let essaisHistory = [];

  // Elements pour choisir le niveau (à ajouter dans ton HTML)
  // <button id="easy">Easy</button>
  // <button id="medium">Medium</button>
  // <button id="hard">Hard</button>

  function initGame() {
    const config = levelsConfig[currentLevel];
    chances = 0;
    gameOver = false;
    essaisHistory = [];
    numberMystere = Math.floor(Math.random() * config.maxRange) + 1;

    console.log(`Nombre mystère (${currentLevel}) : ${numberMystere}`);

    // Reset style et texte d'accueil
    outputtext.style.fontSize = '20px';
    outputtext.style.minHeight = '120px'; 
    outputtext.style.lineHeight = '1.5em'; // espace entre lignes

    outputtext.innerHTML = `Niveau ${capitalize(currentLevel)} : Le numéro est entre 1 et ${config.maxRange}.<br>`;

    createBubbles(config.maxRange, config.bubbleSize);
  }

  function createBubbles(range, bubbleSize) {
    bubblesContainer.innerHTML = '';

    for (let i = 1; i <= range; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.textContent = i;
      bubble.style.width = bubbleSize;
      bubble.style.height = bubbleSize;
      bubble.style.lineHeight = bubbleSize;
      bubble.style.cursor = 'pointer';
      bubble.style.userSelect = 'none';

      bubble.addEventListener('click', () => handleGuess(i, bubble));

      bubblesContainer.appendChild(bubble);
    }
  }

  function handleGuess(guess, bubble) {
    if (gameOver) return;
    if (bubble.classList.contains('clicked')) return;

    chances++;
    bubble.classList.add('clicked');

    const config = levelsConfig[currentLevel];

    if (guess === numberMystere) {
      bubble.style.backgroundColor = '#2196f3'; // bleu gagné
      essaisHistory.push(`Essai ${chances} : ${guess} - Gagné ! 🎉`);
      displayHistory();

      outputtext.innerHTML += `<br><h2>Bravo, tu as gagné en ${chances} essai${chances > 1 ? 's' : ''} !</h2>`;

      gameOver = true;
      disableBubbles();
      createReplayButton();
      return;
    } else {
      bubble.style.backgroundColor = '#9e9e9e'; // gris raté
      bubble.style.textDecoration = 'line-through';
      if (guess < numberMystere) {
        essaisHistory.push(`Essai ${chances} : ${guess} - C'est plus ➕`);
      } else {
        essaisHistory.push(`Essai ${chances} : ${guess} - C'est moins ➖`);
      }
      displayHistory();
    }

    if (chances >= config.maxChances) {
      outputtext.innerHTML += `<br><h2>Perdu! 😞</h2><p>Le nombre mystère était ${numberMystere}.</p>`;
      gameOver = true;
      disableBubbles();
      createReplayButton();
    }
  }

  function displayHistory() {
    const config = levelsConfig[currentLevel];
    let baseMessage = `Niveau ${capitalize(currentLevel)} : Le numéro est entre 1 et ${config.maxRange}.<br>`;
    outputtext.innerHTML = baseMessage + essaisHistory.join('<br>');
  }

  function disableBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(b => b.style.pointerEvents = 'none');
  }

  function createReplayButton() {
    if (!document.getElementById('replay-btn')) {
      const replayBtn = document.createElement('button');
      replayBtn.id = 'replay-btn';
      replayBtn.textContent = 'Rejouer';
      replayBtn.style.marginTop = '15px';
      replayBtn.style.padding = '10px 20px';
      replayBtn.style.fontSize = '18px';
      replayBtn.style.cursor = 'pointer';
      replayBtn.style.borderRadius = '8px';
      replayBtn.style.border = 'none';
      replayBtn.style.backgroundColor = '#2196f3';
      replayBtn.style.color = 'white';
      replayBtn.style.fontWeight = 'bold';

      outputtext.appendChild(document.createElement('br'));
      outputtext.appendChild(replayBtn);

      replayBtn.addEventListener('click', initGame);
    }
  }

  // Changement de niveau
  function setLevel(level) {
    if (!levelsConfig[level]) return;
    currentLevel = level;
    removeReplayButton();
    initGame();
  }

  function removeReplayButton() {
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) replayBtn.remove();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Event listeners pour les boutons niveau (à créer dans ton HTML)
  document.getElementById('easy').addEventListener('click', () => setLevel('easy'));
  document.getElementById('medium').addEventListener('click', () => setLevel('medium'));
  document.getElementById('hard').addEventListener('click', () => setLevel('hard'));

  // Démarrage initial
  initGame();

});
