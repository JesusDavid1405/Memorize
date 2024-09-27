let app=[]
let rowId=1;
let mainContainer = document.querySelector('.main-container')
let resultElement = document.querySelector(".result")

let tiempo = 0; 
    
const contadorTiempo = setInterval(() => {
    tiempo++; 
    document.getElementById('contador').innerHTML = formatoTiempo(tiempo); 
    
}, 1000); 




let word = datos =>{
    for(let iterar=0; iterar<=datos.length; iterar++){
        app.push(datos[iterar]);
    }

    let escoger=parseInt(Math.random()*(app.length - 0));

    let wordle= app[escoger];
    let wordleArray=wordle.toUpperCase().split('');

    console.log(wordleArray)


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
    //funciones

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
    function createRow(){
        rowId++
        if(rowId <= 5){
            let newRow = document.createElement('div');
            newRow.classList.add('fila');
            newRow.setAttribute('id',rowId)
            mainContainer.appendChild(newRow)
            return newRow
        }else{
            clearInterval(contadorTiempo);
            mostrarModal(`Intentalo de nuevo, la palabra correcta era "${wordle.toUpperCase()}"`)
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
                <button class="button">Reiniciar</button>
            `
        }
        let returnBtn= document.querySelector(".button")
            returnBtn.addEventListener('click',()=>{
            location.reload();
        }); 
        modal.show(); 
    }
}
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

