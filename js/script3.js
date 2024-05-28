document.addEventListener('DOMContentLoaded', (event) => {
  // Recupera i dati dal local storage
  document.querySelector('.container_bottom').classList.remove('text-light');
  document.querySelector('.container_bottom').classList.add('text-dark');
  const player1_json = localStorage.getItem('player1');
  const player2_json = localStorage.getItem('player2');

  if (player1_json) {
    const player1 = JSON.parse(player1_json);
    if (player1.nome && player1.colore && player1.lum) {
      document.querySelector('.container_top').style.backgroundColor =
        player1.colore;
      if (player1.lum < 100) {
        document.querySelector('.container_top').classList.remove('text-dark');
        document.querySelector('.container_top').classList.add('text-light');
      } else {
        document.querySelector('.container_top').classList.remove('text-light');
        document.querySelector('.container_top').classList.add('text-dark');
      }
      document.querySelector('.player1').innerHTML =
        player1.nome + ': <span hidden> &egrave; il tuo turno!</span>';
    } 
  } 

  if (player2_json) {
    const player2 = JSON.parse(player2_json);
    if (player2.nome && player2.colore && player2.lum) {
      document.querySelector('.container_bottom').style.backgroundColor =
        player2.colore;
      if (player2.lum < 100) {
        document.querySelector('.container_bottom').classList.remove('text-dark');
        document.querySelector('.container_bottom').classList.add('text-light');
      } else {
        document.querySelector('.container_bottom').classList.remove('text-light');
        document.querySelector('.container_bottom').classList.add('text-dark');
      }
      document.querySelector('.player2').innerHTML =
        player2.nome + ': <span hidden> &egrave; il tuo turno!</span>';
    } 
  } 
});
