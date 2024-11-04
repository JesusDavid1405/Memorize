document.getElementById('moneda-moneda').innerText = saldoMonedas;

function comprarProducto(precio) {
    let mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
    if (saldoMonedas >= precio) {
        saldoMonedas -= precio; 
        document.getElementById('moneda-moneda').innerText = saldoMonedas;
        document.getElementById('mensajeContenido').innerText = "¡Compra realizada!";
    } else {
        document.getElementById('mensajeContenido').innerText = "No tienes suficientes monedas.";
    }
    mensajeModal.show();
}