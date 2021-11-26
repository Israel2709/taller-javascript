/*Obtener los datos de una selección*/

/*
1.- saber cuál es la opción que se está eligiendo
2.- Extraer el texto de la selección
3.- Guardar el texto en una variable
4.- Usar ese texto como contenido de un elemento de DOM
    4.1.- Seleccionar el elemento que recibirá el texto
    4.2.- Colocar el texto dentro del elemento
*/

/*1: saber cuál es la opción que se está eligiendo*/
console.log( document.querySelectorAll("#options-list li") )
document.querySelectorAll("#options-list li a").forEach( element => {
    element.addEventListener("click", event => {
        console.log( event )
        console.log( event.target /*Esta es la opción que se esta eligiendo*/ )
        /*2.- extraer el texto de la selección */
        console.log( event.target.innerText )
        /*3.- Guardar el texto en una variable*/
        let selectedText = event.target.innerText
        console.log( 'Texto: ', selectedText )
        /*4.- Usar ese texto como contenido de un elemento de DOM*/
        document.querySelector("#text-wrapper").innerText = selectedText
    })
})

/*Juan Eduardo come atún por la mañana*/
/*sujeto: document.querySelectorAll("#options-list li a")*/
/*Verbo: .addEventListener( PREDICADO: "click", () => {...})*/


/*Animar un elemento*/

/*
1.- Detectar el click en el conmutador
2.- Determinar si esta prendido o apagado
3.- 
    Si esta prendido, agregar la clase "rotation" al logo de kodemia
        3.1.1 .- Seleccionar el logo de kodemia
        3.1.2 .- Agregarle la clase "rotation"
    Si esta apagado, quitar la clase "rotation" al logo de kodemia
        3.2.1 .- Seleccionar el logo de kodemia
        3.2.2 .- Quitarle la clase "rotation"
*/

/*1.- Detectar el click en el conmutador*/

document.querySelector("#animation-toggler").addEventListener("click", event => {
    console.log( event.target )
    /*2.- determinar si esta prendido o apagado*/
    console.log( 'esta activo? ', event.target.checked )

    /*usaremos el operador ternario*/
    /*condición ? aqui va lo que se hará cuando la condición se cumpla : aqui va lo que se hará cuando la condición no se cumpla*/

    event.target.checked 
        ? document.querySelector("#logo-kodemia").classList.add("rotation") 
        : document.querySelector("#logo-kodemia").classList.remove("rotation")
})

/*Imprimir información de una base de datos*/

const printData = () => {
    let currentRows = document.querySelector("#data-table").innerHTML = ""
    fetch("https://taller-javascript-ff6a3-default-rtdb.firebaseio.com/users/.json").then( response => {
        console.log( response )
        response.json().then( json => {
            console.log( json )
            Object.keys( json ).forEach( key => {
                let user = json[key]
                console.log( user )
                let userRow = `<tr>
                                    <th scope="row">1</th>
                                    <td>${user.nombre}</td>
                                    <td>${user.correo}</td>
                            </tr>`
                let currentRows = document.querySelector("#data-table").innerHTML
                console.log('currentRows', currentRows)

                document.querySelector("#data-table").innerHTML = currentRows + userRow
            })
        })
    })
}

/*Guardar en una base de datos*/

const saveDataToDatabase = (data) => {
    /*https://taller-javascript-ff6a3-default-rtdb.firebaseio.com/users/.json*/
    fetch("https://taller-javascript-ff6a3-default-rtdb.firebaseio.com/users/.json", {
        method:"POST",
        body: JSON.stringify(data)
    }).then( response => {
        console.log( response )
        printData()
    })
}

/*Extraer información de un formulario*/
/*
    1.- Saber cuántos campos hay en el formulario
    2.- Recorrer cada campo y extraer la propiedad que representa y el valor de lo que tiene escrito
    3.- Guardar esta información en un objeto
*/

/*1.- Saber cuántos campos hay en el formulario*/

console.log( document.querySelectorAll("#data-form input") )

/* 2.- Recorrer cada campo y extraer la propiedad que representa y el valor de lo que tiene escrito*/

const getFormData = () => {
    let dataObject = {}
    document.querySelectorAll("#data-form input").forEach( campo => {
        console.log('Propiedad: ', campo.name )
        console.log('Valor: ', campo.value )
        /*3.- Guardar esta información en un objeto*/
        dataObject[campo.name] = campo.value
    })
    console.log( dataObject )
    saveDataToDatabase( dataObject )
}

document.querySelector("#save-data").addEventListener("click", getFormData )




printData()
