document.addEventListener('DOMContentLoaded', (event) => {
  // Recupera i dati dal local storage
  document.querySelector('.container_bottom').classList.remove('text-light');
  document.querySelector('.container_bottom').classList.add('text-dark');
  const player1_json = localStorage.getItem('player1');
  const player2_json = localStorage.getItem('player2');

  if (player1_json) {
    const player1 = JSON.parse(player1_json);
    if (player1.nome && player1.colore) {
      document.querySelector('.container_top').style.backgroundColor =
        player1.colore;
      document.getElementById('player1').innerHTML = player1.nome + ':';
    } else {
      alert('Dati incompleti per il Giocatore 1');
      window.location.href = 'index.html';
    }
  } else {
    alert('Dati di Giocatore 1 mancanti');
    window.location.href = 'index.html';
  }

  if (player2_json) {
    const player2 = JSON.parse(player2_json);
    if (player2.nome && player2.colore) {
      document.querySelector('.container_bottom').style.backgroundColor =
        player2.colore;
      document.getElementById('player2').innerHTML = player2.nome + ':';
    } else {
      alert('Dati incompleti per il Giocatore 2');
      window.location.href = 'index.html';
    }
  } else {
    alert('Dati di Giocatore 2 mancanti');
    window.location.href = 'index.html';
  }
});

const rollBtn = document.querySelectorAll('.roll');

function randomDice() {
  const random = Math.floor(Math.random() * 6) + 1;
  return random;
}

function rollDice(dice, random) {
  dice.style.animation = 'rolling 4s';

  setTimeout(() => {
    switch (random) {
      case 1:
        dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
        break;

      case 6:
        dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
        break;

      case 2:
        dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
        break;

      case 5:
        dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
        break;

      case 3:
        dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
        break;

      case 4:
        dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
        break;

      default:
        break;
    }

    dice.style.animation = 'none';
  }, 4050);
}

const handleRollClick = (btn, index) => {
  const targetSelector = btn.getAttribute('data-target');
  const dice = document.querySelector(targetSelector);
  const diceValue = randomDice();
  rollDice(dice, diceValue);
  btn.disabled = true; // Disable the button after rolling
  localStorage.setItem(`player${index + 1}_dice`, JSON.stringify(diceValue)); // Store dice value in local storage

  // Check if all buttons are disabled
  if (Array.from(rollBtn).every((button) => button.disabled)) {
    const player1DiceValue = JSON.parse(localStorage.getItem('player1_dice'));
    const player2DiceValue = JSON.parse(localStorage.getItem('player2_dice'));

    if (
      player1DiceValue &&
      player2DiceValue &&
      player1DiceValue === player2DiceValue
    ) {
      setTimeout(() => {
        alert('Pari! Ripetere il tiro di dado:');
        document.getElementById('roll1').disabled = false;
        document.getElementById('roll2').disabled = false;
      }, 6000);
    } else {
      setTimeout(() => {
        const player1 = JSON.parse(localStorage.getItem('player1'));
        const player2 = JSON.parse(localStorage.getItem('player2'));
        if (player1DiceValue > player2DiceValue)
          alert(`Inizia ${player1.nome}`);
        else alert(`Inizia ${player2.nome}`);
        document.querySelectorAll('.container').forEach((content) => {
          content.classList.add('fade-out');
        });
      }, 6000);
      setTimeout(() => {
        window.location.href = 'damiera.html';
      }, 10000);
    }
  }
};

rollBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => handleRollClick(btn, index));
});
