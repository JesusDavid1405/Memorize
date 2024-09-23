let app=[]

let totalPalabras=2047;

let word = datos =>{
    for(let iterar=0; iterar<=totalPalabras; iterar++){
        app.push(datos[iterar]);
    }

    let escoger=parseInt(Math.random()*(app.length - 0));

    let wordle= app[escoger]

    console.log(wordle)
}
