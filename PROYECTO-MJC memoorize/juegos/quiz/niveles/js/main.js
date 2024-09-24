let app=[]
let rowId=1;
let mainContainer = document.querySelector('.main-container')
let resultElement = document.querySelector(".result")



let word = datos =>{
    for(let iterar=0; iterar<=datos.length; iterar++){
        app.push(datos[iterar]);
    }

    let escoger=parseInt(Math.random()*(app.length - 0));

    let wordle= app[escoger];
    let wordleArray=wordle.toUpperCase().split('');

    console.log(wordleArray)


    let actualRow=document.querySelector(".row")
    drawSquaers(actualRow)
    listenInput(actualRow)
    
   
    let focusElement = document.querySelector(".focus")
    focusElement.focus()

    function listenInput(actualRow){
        let square= document.querySelectorAll('.square')
        square=[...square]

        let userInput=[]

        square.forEach(element => {
            element.addEventListener('input',event=>{
                //recoger el ingreso del usuario
                userInput.push(event.target.value.toUpperCase())
    
                console.log(userInput)
    
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.focus()
                }else{
    
                    //comparar arreglos para cambiar estilos
                    let rightIndex= compareArrays(wordleArray,userInput)
                    rightIndex.forEach(element=>{
                        square[element].classList.add('green')
                    })
    
                    // cambiar si existe la letra pero no esta en la posicion correcta
                    let existIndexArray=existLetter(wordleArray, userInput)
                    existIndexArray.forEach(element =>{
                        square[element].classList.add('gold')
                    })
                    console.log(existIndexArray)
                    //si los arreglos son iguales
                    if(rightIndex.length == wordleArray.length){
                        resultElement.innerHTML=`
                        <p>Ganaste!</p>
                        <button class="button">Reiniciar</button>`
                    }
                    //crear una linea
                    let actualRow=createRow()
                    drawSquaers(actualRow)
                    listenInput(actualRow)

                    //let returnBtn= document.querySelector(".button")
                    //returnBtn.addEventListener('click',()=>{
                    //    location.reload();
                    //});
    
                }
            })
        })
        return actualRow
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
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id',rowId)
        mainContainer.appendChild(newRow)

        return newRow
    }
    function drawSquaers(actualRow){
        wordleArray.forEach((item,index) => {
            if(index === 0){
                actualRow.innerHTML +=`<input type="text" maxlength="1" class="square focus">`
            }else{
                actualRow.innerHTML +=`<input type="text" maxlength="1" class="square">`
            }
        });
    }
}

