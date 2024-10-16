let app=[]
let palabra=[]
let pistas=[]
let rowId=1;
let mainContainer = document.querySelector('.main-container')
let resultElement = document.querySelector(".result")
let pistaIndex = 0; 

let tiempo = 0; 
    
const contadorTiempo = setInterval(() => {
    tiempo++; 
    document.getElementById('contador').innerHTML = formatoTiempo(tiempo); 
    
}, 1000);

fetch('libreria/palabras.php', {
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
                    //si no se ha borrado
                    if(event.inputType !== 'deleteContentBackward'){
                        //recoger el ingreso del usuario
                        userInput.push(event.target.value.toUpperCase())
            
                        console.log(userInput)
            
                        if(event.target.nextElementSibling){
                            event.target.nextElementSibling.focus()
                        }else{
                            let squaresFilled = document.querySelectorAll('.square')
                            squaresFilled=[...squaresFilled]
                            let lastFiveSquaresFilled=squaresFilled.slice(-5)
                            let finalUserInput=[];

                            lastFiveSquaresFilled.forEach(element =>{
                                finalUserInput.push(element.value.toUpperCase())
                            })
                            console.log("userInput:" + finalUserInput)
                            // cambiar si existe la letra pero no esta en la posicion correcta
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
                                
                                return
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
                
                console.log("Fila creada, rowId es:", rowId);  // Depuración para ver si se crea la fila
        
                // Verificar si hay que mostrar una pista
                checkRowAndAddPista();  
        
                return newRow;  // Continuar la ejecución
            } else {
                clearInterval(contadorTiempo);
                mostrarModal(`Inténtalo de nuevo, la palabra correcta era "${wordle.toUpperCase()}"`);
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
            
            if(rowId >= 5){
                modalBody.innerHTML=`
                    <div class="">
                        <h1>Perdiste!</h1>
                        ${textMsg}
                        <div class="text">
                            tiempo: ${formatoTiempo(tiempo)}
                        </div>
                        <div class="text">
                            intentos: ${rowId}
                        </div>
                        <div class="text">
                            puntos: ${puntacion(rowId)}
                        </div>
                    </div>
                    <button class="button">Reiniciar</button>
                `
            }else{
                modalBody.innerHTML=`
                    <div class="">
                        <h1>${textMsg}</h1>
                        <div class="text">
                            tiempo: ${formatoTiempo(tiempo)}
                        </div>
                        <div class="text">
                            intentos: ${rowId}
                        </div>
                        <div class="text">
                            puntos: ${puntacion(rowId)}
                        </div>
                    </div>
                    <button class="button">Reiniciar</button>
                    <button class="button" id="salir">salir</button>
                `

                let returnSalir= document.querySelector("#salir")
                returnSalir.addEventListener('click',()=>{
                    window.location.href= '../index.html';
                }); 
            }
            let returnBtn= document.querySelector(".button")
                returnBtn.addEventListener('click',()=>{
                location.reload();
            }); 

            

            modal.show(); 
        }
        
        function addPista() {
            let displayPistas = document.getElementById('displayPista');
            let classPista = document.querySelector('.pistas').style.display='flex';
            
            if (pistaIndex < wordlePistas.length) {
                displayPistas.innerHTML += `
                <li>
                    <p>${wordlePistas[pistaIndex]}</p>
                </li>`;
                
                pistaIndex++; 
            }
            console.log(pistaIndex)
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
function puntacion(intentos){
    let puntosMaximo=1000;
    let intentosFinal=intentos;
    let puntos

    if(intentosFinal>=5){
        puntos =0;
    }else{
        puntos =(puntosMaximo/intentosFinal);
    }
        
    return puntos;
}
