document.addEventListener('DOMContentLoaded', function () {

  const outputtext = document.getElementById('game');
  const bubblesContainer = document.getElementById('bubbles-container');

  const maxChances = 3; 
  const maxRange = 10; 

  let chances = 0;
  let numberMystere = 0;
  let gameOver = false;

  // On stocke chaque essai pour affichage multi-lignes
  let essaisHistory = [];

  function initGame() {
    chances = 0;
    gameOver = false;
    essaisHistory = []; // on reset l’historique des essais
    numberMystere = Math.floor(Math.random() * maxRange) + 1;

    console.log(`Nombre mystère (niveau 1) : ${numberMystere}`); // LOG du nombre mystère

    outputtext.style.fontSize = '20px';   
    outputtext.style.minHeight = '100px'; 
    // Message d’accueil avec niveau et intervalle
    outputtext.innerHTML = `Niveau 1 : Le numéro est entre 1 et ${maxRange}.<br>`;

    createBubbles();
  }

  function createBubbles() {
    bubblesContainer.innerHTML = ''; 

    for (let i = 1; i <= maxRange; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.textContent = i;
      bubble.style.width = '60px';   
      bubble.style.height = '60px';
      bubble.style.lineHeight = '60px';
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

    if (guess === numberMystere) {
      bubble.style.backgroundColor = '#2196f3';  
      essaisHistory.push(`Essai ${chances} : ${guess} - Gagné ! 🎉`);
      displayHistory();

      outputtext.innerHTML += `<br><h2>Bravo, tu as gagné en ${chances} essai${chances > 1 ? 's' : ''} !</h2>`;

      gameOver = true;
      disableBubbles();
      createReplayButton();
      return;
    } else {
      bubble.style.backgroundColor = '#9e9e9e'; 
      bubble.style.textDecoration = 'line-through'; 
      if (guess < numberMystere) {
        essaisHistory.push(`Essai ${chances} : ${guess} - C'est plus ➕`);
      } else {
        essaisHistory.push(`Essai ${chances} : ${guess} - C'est moins ➖`);
      }
      displayHistory();
    }

    if (chances >= maxChances) {
      outputtext.innerHTML += `<br><h2>Perdu! 😞</h2><p>Le nombre mystère était ${numberMystere}.</p>`;
      gameOver = true;
      disableBubbles();
      createReplayButton();
    }
  }

  function displayHistory() {
    // Affiche la première ligne fixe + la liste des essais en lignes séparées
    let baseMessage = `Niveau 1 : Le numéro est entre 1 et ${maxRange}.<br>`;
    outputtext.innerHTML = baseMessage + essaisHistory.join('<br>');
  }

  function disableBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(b => b.style.pointerEvents = 'none');
  }

  function createReplayButton() {
    // Ajoute un bouton Rejouer sous la zone de texte
    let replayBtn = document.createElement('button');
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

    // S’assurer qu’on a pas déjà un bouton avant d’en ajouter un
    if (!document.getElementById('replay-btn')) {
      replayBtn.id = 'replay-btn';
      outputtext.appendChild(document.createElement('br'));
      outputtext.appendChild(replayBtn);
      replayBtn.addEventListener('click', initGame);
    }
  }

  initGame();
});
