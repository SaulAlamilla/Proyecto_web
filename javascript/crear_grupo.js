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
    localS(grupo) {
        let movieGroup = {
            "creador" : grupo.get_creador,
            "genero" : grupo.genero,
            "peliculas" : grupo.peliculas
        }
        if (localStorage.key(0) != null){
            temp = JSON.parse(localStorage.getItem("grupos"));
        }
        temp.push(movieGroup);
        localStorage.setItem("grupos", JSON.stringify(temp));

        console.log(temp);
        movies = JSON.parse(localStorage.getItem("grupos"));
    }
}
////SE CREA EL GRUPO DE PELICULAS/////
function crear_grupo(){
    let creador = document.getElementById("creador").value;
    let genero = document.getElementById("genero").value;
    let checks = document.getElementsByClassName("form-check-input");

    let peliculas = new Array();
    for (let i=0; i<10; i++){
        if(checks[i].checked){
            peliculas.push(checks[i].value);
            //console.log(checks[i].value);
        }
    }
    let grupo = new Film(genero, peliculas);
    grupo.set_creador = creador;

    //ALMACENAR EN EL LOCALSTOGARE
    grupo.localS(grupo);
}

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
}
function ver_objeto(){
    location.href="verGrupo.html";
}