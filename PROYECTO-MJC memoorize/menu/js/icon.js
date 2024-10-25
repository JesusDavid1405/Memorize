const coinCount = document.getElementById("coin-count");

// Función para actualizar las monedas
function updateCoins(amount) {
  const currentCoins = parseInt(coinCount.textContent);
  const newCoinCount = currentCoins + amount;
  coinCount.textContent = newCoinCount;
}

// Función para agregar monedas
function addCoins(amount) {
  updateCoins(amount);
}
function spendCoins(amount) {
  const currentCoins = parseInt(coinCount.textContent);
  if (currentCoins >= amount) {
    updateCoins(-amount);
  } else {
    alert("No tienes suficientes monedas.");
  }
}