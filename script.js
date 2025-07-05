document.addEventListener('DOMContentLoaded', function() {

    let button = document.getElementById('button');
    let outputtext = document.getElementById('game');
    let level = 'easy';
    let maxRange = 10;
    let maxChances = 3;
    let chances;
    let number;

    function setLevel(newLevel) {
        level = newLevel;

        let bubblesContainer = document.getElementById('bubbles-container');
        let bubbleSize;

        switch (level) {
            case 'easy':
                maxRange = 10;
                maxChances = 3;
                bubbleSize = '80px';
                bubblesContainer.style.width = '600px';
                bubblesContainer.style.height = '350px';
                break;

            case 'medium':
                maxRange = 50;
                maxChances = 5;
                bubbleSize = '60px';
                bubblesContainer.style.width = '700px';
                bubblesContainer.style.height = '400px';
                break;

            case 'hard':
                maxRange = 100;
                maxChances = 8;
                bubbleSize = '50px';
                bubblesContainer.style.width = '800px';
                bubblesContainer.style.height = '450px';
                break;
        }

        number = Math.floor(Math.random() * maxRange) + 1;
        chances = 0;
        console.log('Mystery Number:', number);

        document.getElementById('game').innerHTML = `Trouver le numéro mystère (entre 1 et ${maxRange})`;

        createBubbles(maxRange, bubbleSize);
    }

    function createBubbles(range, bubbleSize) {
        let container = document.getElementById('bubbles-container');
        container.innerHTML = '';

        for (let i = 1; i <= range; i++) {
            let bubble = document.createElement('div');
            bubble.className = 'bubble jiggle';
            bubble.textContent = i;
            bubble.style.width = bubbleSize;
            bubble.style.height = bubbleSize;
            bubble.style.lineHeight = bubbleSize;
            bubble.addEventListener('click', () => handleGuess(i));
            container.appendChild(bubble);
        }
    }

    function handleGuess(guess) {
        let bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => bubble.classList.remove('clicked'));

        let selectedBubble = document.querySelector(`.bubble:nth-child(${guess})`);
        selectedBubble.classList.add('clicked');

        if (chances < maxChances) {
            if (guess < number) {
                outputtext.innerHTML += `<hr><h3 class="text-center">${chances + 1}${chances + 1 < 2 ? "<sup>er</sup>" : "<sup>ème</sup>"} Essai</h3><p class="text-center">${guess}? ... c'est ➕</p>`;
            } else if (guess > number) {
                outputtext.innerHTML += `<hr><h3 class="text-center">${chances + 1}${chances + 1 < 2 ? "<sup>er</sup>" : "<sup>ème</sup>"} Essai</h3><p class="text-center">${guess}? ... c'est ➖</p>`;
            } else {
                outputtext.innerHTML += `<hr><h3 class="text-center">${chances + 1}${chances + 1 < 2 ? "<sup>er</sup>" : "<sup>ème</sup>"} Essai</h3><h2 class="text-center">Gagné! 🙂</h2><p class="text-center">numéro mystère : ${number}</p><div class="text-center"><button class="btn btn-primary" type="submit" onclick="refresh()">Rejouer</button></div>`;
                return;
            }

            chances++;
        }

        selectedBubble.classList.add('wrong');

        if (chances === maxChances && guess != number) {
            outputtext.innerHTML += `<h2 class="text-center">Perdu! ☹️</h2><p class="text-center">numéro mystère : ${number}</p><div class="text-center"><button class="btn btn-primary" type="submit" onclick="refresh()">Rejouer</button></div>`;
        }
    }

    function refresh() {
        setLevel(level);
        outputtext.innerHTML = '';
    }

    document.getElementById('easy').addEventListener('click', () => setLevel('easy'));
    document.getElementById('medium').addEventListener('click', () => setLevel('medium'));
    document.getElementById('hard').addEventListener('click', () => setLevel('hard'));

    setLevel('easy');

});
