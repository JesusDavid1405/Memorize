let app=[]
let palabra=[]
let pistas=[]
let rowId=1;
let mainContainer = document.querySelector('.main-container')
let resultElement = document.querySelector(".result")
let pistaIndex = 0; 
let estadoNivel;
let monedas;
let tiempo = 30; 
    


fetch('../../../resources/wordle/palabras.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Asegúrate de usar 'Content-Type' en mayúsculas
    },
    body: JSON.stringify({
        palabra: "",
        pista: ""
    })
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Aquí es donde llamamos a response.json()
}).then(data => {
    if (data.error) {
        alert(data.error);
    } else {
        data.forEach(item =>{
            tiempo = item.tiempo
        });
        tiempoContador= tiempo;

        const contadorTiempo = setInterval(() => {
            
            tiempoContador--; 
            document.getElementById('contador').innerHTML = formatoTiempo(tiempoContador); 
        
            if (tiempoContador <= 0) {
                clearInterval(contadorTiempo);
                mostrarModal("¡El tiempo ha terminado!");  // Mostrar el modal de fin de juego
            }
        }, 1000);
        
        

        // Iterar sobre las palabras recibidas
        data.forEach(item => {
            app.push(item); 

        });
        data.forEach(item =>{
            palabra.push(item.palabra)
        })
        data.forEach(item =>{
            pistas.push(item.pistas)
        })

        let escoger=parseInt(Math.random()*(palabra.length - 0));
        
        let wordle= palabra[escoger];
        let wordlePistas= pistas[escoger];

        let wordleArray=wordle.toUpperCase().split('');
        let tamañoWordle= wordleArray.length;
        
        console.log(wordleArray);
        console.log(wordlePistas);

        let actualRow=document.querySelector(".fila")

        drawSquaers(actualRow)
        listenInput(actualRow)
        
        addFocus(actualRow)
    
        function listenInput(actualRow){
            let square= actualRow.querySelectorAll('.square')
            square=[...square]

            let userInput=[]

            square.forEach(element => {
                element.addEventListener('input',event=>{
                    
                    if(event.inputType !== 'deleteContentBackward'){
                        
                        userInput.push(event.target.value.toUpperCase())
            
                        console.log(userInput)
            
                        if(event.target.nextElementSibling){
                            event.target.nextElementSibling.focus()
                        }else{
                            let squaresFilled = document.querySelectorAll('.square')
                            squaresFilled=[...squaresFilled]
                            let lastFiveSquaresFilled=squaresFilled.slice(-tamañoWordle)
                            let finalUserInput=[];

                            lastFiveSquaresFilled.forEach(element =>{
                                finalUserInput.push(element.value.toUpperCase())
                            })
                            console.log("userInput:" + finalUserInput)
                            
                            let existIndexArray=existLetter(wordleArray, finalUserInput)
                            existIndexArray.forEach(element =>{
                                square[element].classList.add('gold')
                            })
                            console.log(existIndexArray)
                            
                            //comparar arreglos para cambiar estilos
                            let rightIndex= compareArrays(wordleArray,finalUserInput)
                            rightIndex.forEach(element=>{
                                square[element].classList.add('green')
                            })

                            //si los arreglos son iguales
                            if(rightIndex.length == wordleArray.length){
                                clearInterval(contadorTiempo);
                                mostrarModal("Ganaste!");
                                estadoNivel = true
                                
                                return
                            }else{
                                estadoNivel = false
                            }
                            //crear una linea
                            let actualRow=createRow()

                            if(!actualRow){
                                return
                            }
                            
                            
                            drawSquaers(actualRow)
                            listenInput(actualRow)
                            addFocus(actualRow)
                            
                        }
                    }else{
                        userInput.pop();
                        console.log(userInput)
                    }
                })
            })
        }
        
        function compareArrays(arrayUno,arrayDos){
    
            let iqualsIndex =[]
            arrayUno.forEach((element,index)=>{
                if(element == arrayDos[index]){
                    iqualsIndex.push(index)
                    console.log(iqualsIndex)
                }
            })
            return iqualsIndex;
        }
        function existLetter(arrayUno, arrayDos){
            let existIndex=[]
            arrayDos.forEach((element,index) => {
                if(arrayUno.includes(element)){
                    existIndex.push(index)
                }
            });
            return existIndex;
        }
        function createRow() {
            rowId++;  // Incrementar rowId
        
            if (rowId <= 5) {
                let newRow = document.createElement('div');
                newRow.classList.add('fila');
                newRow.setAttribute('id', rowId);
                mainContainer.appendChild(newRow);
        
                // Verificar si hay que mostrar una pista
                checkRowAndAddPista();  
        
                return newRow;  // Continuar la ejecución
            } else {
                clearInterval(contadorTiempo);
                mostrarModal(`Inténtalo de nuevo, la palabra correcta era "${wordle.toUpperCase()}"`);
                estadoNivel = false;
            }
        }
        function drawSquaers(actualRow){
            wordleArray.forEach((item,index) => {
                if(index === 0){
                    actualRow.innerHTML +=`<input type="text" maxlength="1" class="square no focus">`
                }else{
                    actualRow.innerHTML +=`<input type="text" maxlength="1" class="square no">`
                }
            });
        }
        function addFocus(actualRow){
            let focusElement = actualRow.querySelector(".focus")
            focusElement.focus()
        }
        
        function mostrarModal(textMsg) {
            var modal = new bootstrap.Modal(document.getElementById('miModal'));  
            var modalBody = document.querySelector('.modal-body');  
            
            if (rowId >= 6) {
                modalBody.innerHTML = `
                    <div class="">
                        <h1>Perdiste!</h1>
                        ${textMsg}
                        <div class="text">
                            tiempo: ${formatoTiempo(tiempoContador)}
                        </div>
                        <div class="text">
                            intentos: ${rowId}
                        </div>
                        <div class="text">
                            puntos: ${puntacion(rowId,tiempoContador)}
                        </div>
                    </div>
                    
                `;
                // Marcar estado como perdido
                estadoNivel = false; 

            } else {
                if(textMsg !== "¡El tiempo ha terminado!" ){
                    modalBody.innerHTML = `
                    <div class="">
                        <h1>${textMsg}</h1>
                        <div class="text">
                            tiempo: ${formatoTiempo(tiempoContador)}
                        </div>
                        <div class="text">
                            intentos: ${rowId}
                        </div>
                        <div class="text">
                            puntos: ${puntacion(rowId,tiempoContador)}
                        </div>
                    </div>

                    `;

                    estadoNivel = true;
                }else{
                    modalBody.innerHTML = `
                    <div class="">
                        <h1>${textMsg}</h1>
                        <p>Inténtalo de nuevo, la palabra correcta era "${wordle.toUpperCase()}"</p>
                        <div class="text">
                            tiempo: ${formatoTiempo(tiempoContador)}
                        </div>
                        <div class="text">
                            intentos: ${rowId}
                        </div>
                        <div class="text">
                            puntos: ${puntacion(rowId,tiempoContador)}
                        </div>
                    </div>

                    `;

                    estadoNivel = false;
                }
                

                // <button class="button">Reiniciar</button>
                // <button class="button">Reiniciar</button>
                // <button class="button" id="salir">Salir</button>
                // Marcar estado como ganado
                
        
                // let returnSalir = document.querySelector("#salir");
                // returnSalir.addEventListener('click', () => {
                //     window.location.href = '../index.html';
                // });
            }

            if(estadoNivel){
                monedas=50;
            }else{
                monedas=0;
            }

            console.log(estadoNivel)
            
            let tiempoCliente = formatoTiempo(tiempoContador);
            let puntosClientes = puntacion(rowId,tiempoContador);

            fetch('../../../resources/niveles/historialNivel.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    estadoNivel,
                    tiempo: tiempoCliente,
                    puntos: puntosClientes,
                    monedas: monedas,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Intentar procesar la respuesta como JSON
                return response.text().then(text => {
                    try {
                        return JSON.parse(text); // Intentar convertir a JSON
                    } catch {
                        throw new Error(`No se pudo parsear JSON. Respuesta: ${text}`);
                    }
                });
            })
            .then(result => {
                console.log('Historial guardado:', result);
            })
            .catch(error => {
                console.error('Hubo un problema al guardar el historial:', error);
            });
            
        
            let returnBtn = document.querySelector(".btn-secondary");
            returnBtn.addEventListener('click', () => {
                location.href='../index.html';
            });
        
            modal.show(); 
        }
        
        
        function addPista() {
            var modal = new bootstrap.Modal(document.getElementById('miModal'));
            var modalBody = document.querySelector('#pista');
            
            if (pistaIndex < wordlePistas.length) {
                modalBody.innerHTML += `
                    <div class="row">
                        <div class="col-12">
                            <p>${wordlePistas[pistaIndex]}</p>
                        </div>
                    </div>
                `;
                pistaIndex++; 
            }
        
            modal.show();
        }
        
        
        function checkRowAndAddPista() {
            if (rowId === 2 || rowId === 4 || rowId === 5) {  
                addPista();
            }
        }
    }

}).catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);    
    const segundosRestantes = segundos % 60;
    let tiempoPantalla;
    tiempoPantalla=`${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`

    return tiempoPantalla; 
}
function puntacion(intentos, tiempoP) {
    const puntosMaximo = 1000;
    const tiempoMaximo = tiempo;

    if (intentos < 1 || tiempo < 0 || tiempo > tiempoMaximo) {
        throw new Error("Parámetros inválidos: asegúrate de que intentos >= 1 y 0 <= tiempo <= tiempoMaximo.");
    }

    if (tiempoP === 0) {
        return 0;
    }

    let penalizacionIntentos = puntosMaximo / intentos;

    let tiempoBonus = (tiempo / tiempoMaximo) * puntosMaximo;

    let puntos = Math.max(0, penalizacionIntentos + tiempoBonus);

    return Math.round(puntos);
}

    