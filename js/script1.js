//Selezione colore nel form player - cambio sfondo - cambio colore scritte

function getLuminance(hex){
  // Rimuovi il simbolo #
  hex = hex.replace('#', '');

  // Ottieni i valori RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calcola la luminanza relativa
  let luminance= 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}

document.getElementById('color1').addEventListener('input', function (event) {
  let selectedColor = event.target.value;
  let luminance= getLuminance(selectedColor);
  // Cambia il colore di sfondo della sezione superiore
  document.querySelector('.top').style.backgroundColor =
    selectedColor;
  // Cambia il colore del testo in base alla luminanza
  if (luminance < 100) {
    // Se la luminanza è inferiore a 100, imposta il testo in bianco
    document.querySelector('.top').classList.remove(
      'text-dark'
    );
    document.querySelector('.top').classList.add('text-light');
  } else {
    // Altrimenti, imposta il testo in nero
    document.querySelector('.top').classList.remove(
      'text-light'
    );
    document.querySelector('.top').classList.add('text-dark');
  }
});
document.getElementById('color2').addEventListener('input', function (event) {
  let selectedColor = event.target.value;
  let luminance= getLuminance(selectedColor);
  // Cambia il colore di sfondo della sezione superiore
  document.querySelector('.bottom').style.backgroundColor =
    selectedColor;
  // Cambia il colore del testo in base alla luminanza
  if (luminance < 100) {
    // Se la luminanza è inferiore a 100, imposta il testo in bianco
    document.querySelector('.bottom').classList.remove(
      'text-dark'
    );
    document.querySelector('.bottom').classList.add(
      'text-light'
    );
  } else {
    // Altrimenti, imposta il testo in nero
    document.querySelector('.bottom').classList.remove(
      'text-light'
    );
    document.querySelector('.bottom').classList.add(
      'text-dark'
    );
  }
});

//pulsante submit - creazione file JSON per i dati

class Player {
  constructor(nome, colore, lum) {
    this.nome=nome;
    this.colore=colore;
    this.lum=lum;
  }
}

document.getElementById('submit_btn1').addEventListener('click', function () {
  let playerName= 
    document.getElementById('player-name1').value;
  let color= document.getElementById('color1').value;
  let lum= getLuminance(color);
  if (playerName.trim() === '') {
    alert('Inserisci un nome valido.');
    return;
  }
  // Memorizza in un oggetto e crea il JSON
  const player1 = new Player(playerName, color, lum);
  localStorage.setItem('player1', JSON.stringify(player1));

  // Disabilita il form e il pulsante
  document
    .getElementById('player1-form')
    .querySelectorAll('input, button')
    .forEach(element => {
      element.disabled = true;
    });
  if (document.getElementById('submit_btn2').disabled) {
    window.location.href = 'dices.html';
  }
});

document.getElementById('submit_btn2').addEventListener('click', function () {
  let playerName= 
    document.getElementById('player-name2').value;
  let color = document.getElementById('color2').value;
  let lum = getLuminance(color);

  if (playerName.trim() === '') {
    alert('Inserisci un nome valido.');
    return;
  }

  // Memorizza in un oggetto e crea il JSON
  const player2 = new Player(playerName, color, lum);
  localStorage.setItem('player2', JSON.stringify(player2));

  // Disabilita il form e il pulsante
  document
    .getElementById('player2-form')
    .querySelectorAll('input, button')
    .forEach(element => {
      element.disabled = true;
    });
  if (document.getElementById('submit_btn1').disabled)
    window.location.href = 'dices.html';
});
