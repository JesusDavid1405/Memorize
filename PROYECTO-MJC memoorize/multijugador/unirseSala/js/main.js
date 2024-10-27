
      localStorage.setItem('codigo', '1234'); 
      localStorage.setItem('rondas', 2); 

      let btnComparar = document.getElementById('comparar');
      const codigoSala = localStorage.getItem('codigo');

      btnComparar.addEventListener('click', function() {
          let codigoUser = document.getElementById('codigoSala').value.trim();  
          let modalError = new bootstrap.Modal(document.getElementById('msgError'));
          let modalDisplay = document.querySelector('#msgError .modal-body');
          if (codigoUser === "") {
              modalDisplay.innerHTML = `No has ingresado ningún código, por favor ingresa uno.`;
              modalError.show();
          } 
          // Verificamos si el código es correcto
          else if (codigoUser === codigoSala) {
              let rondas = localStorage.getItem('rondas');
              iniciarJuego(rondas);
          } 
          // Si el código es incorrecto
          else {
              modalDisplay.innerHTML = `El código que ingresaste no pertenece a ninguna sala.`;
              modalError.show();
          }
          localStorage.setItem('rol', 2);
      });

      function iniciarJuego(rondas) {
          console.log(`El juego comenzará con ${rondas} rondas.`);
          window.location.href = '../sala/index.html';
      }