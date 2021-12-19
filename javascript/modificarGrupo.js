////MOSTRAR EN UN CHECKLIST LAS PELICULAS CON EL WEB SERVICE/////
function onload(){
    window.localStorage.removeItem('pelicula');

    const url = "https://ghibliapi.herokuapp.com/films";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i=0; i<10; i++) {
                //console.log(data[i].title);
                let input = document.createElement("input");
                input.setAttribute("class", "form-check-input");
                input.setAttribute("type","checkbox");
                input.setAttribute("id","check"+i);
                input.setAttribute("value", ""+data[i].title);
                let label = document.createElement("label");
                label.setAttribute("class", "form-check-label");
                label.setAttribute("for","flexCheckDefault");
                label.innerHTML = data[i].title;

                let container = document.getElementById("container");
                container.appendChild(input);
                container.appendChild(label);
                let br = document.createElement("br");
                container.appendChild(br);

            }
        })
    setTimeout(colocarDatos, 1000);
}

function colocarDatos(){
    //OBTENER PARAMETROS DE LA URL
    let input_string = window.location.href;
    let urlLocal = new URL(input_string);
    let id = urlLocal.searchParams.get("id");

    let autor = JSON.parse(localStorage.getItem("grupos"));
    //console.log(autor[id].peliculas[0]);


    document.getElementById("creador").value = autor[id].creador;
    document.getElementById("genero").value = autor[id].genero;

    let checks = document.getElementsByClassName("form-check-input");
    for (let i=0; i<10; i++){
        //console.log("ok");
        for (let j=0; j<autor[id].peliculas.length;j++){
            if (checks[i].value == autor[id].peliculas[j]){
                checks[i].checked = true;
                //console.log("Aqui "+j);
            }
        }
    }
}

function modificar(){
    console.log("Hola");
    //OBTENER PARAMETROS DE LA URL
    let input_string = window.location.href;
    let urlLocal = new URL(input_string);
    let id = urlLocal.searchParams.get("id");

    let autor = JSON.parse(localStorage.getItem("grupos"));
    //console.log(autor[id].peliculas[0]);


    let creadorN = document.getElementById("creador").value;
    let generoN = document.getElementById("genero").value;
    let checks = document.getElementsByClassName("form-check-input");

    let peliculasN = new Array();
    for (let i=0; i<10; i++){
        if(checks[i].checked){
            peliculasN.push(checks[i].value);
            //console.log(checks[i].value);
        }
    }
    autor[id].creador = creadorN;
    autor[id].genero = generoN;
    autor[id].peliculas = peliculasN;

    let grupo = new Film(autor[id].genero, autor[id].peliculas);
    grupo.set_creador = autor[id].creador;

    grupo.localS(grupo, id);
    //location.href = "verGrupo.html";
}
let movies;
let temp = new Array();
class Film{
    #creador="";
    constructor(genero, peliculas) {
        this.genero = genero;
        this.peliculas = peliculas;
    }
    get get_creador(){
        return this.#creador;
    }
    set set_creador(creador){
        this.#creador = creador
    }

    //ALMACENANDO EN EL LOCALSTORAGE CON AYUDA DEL OBJETO CREADO
    localS(grupo, id) {
        let movieGroup = {
            "creador" : grupo.get_creador,
            "genero" : grupo.genero,
            "peliculas" : grupo.peliculas
        }
        if (localStorage.key(0) != null){
            temp = JSON.parse(localStorage.getItem("grupos"));
        }
        temp[id] = movieGroup;
        localStorage.setItem("grupos", JSON.stringify(temp));

        console.log(temp);
        movies = JSON.parse(localStorage.getItem("grupos"));
    }
}
