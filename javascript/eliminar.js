function borrar(){
    //OBTENER PARAMETROS DE LA URL
    let input_string = window.location.href;
    let urlLocal = new URL(input_string);
    let id = urlLocal.searchParams.get("id");

    let array = JSON.parse(localStorage.getItem("grupos"));
    array.splice(id, 1); // 1 es la cantidad de elemento a eliminar
    localStorage.setItem("grupos", JSON.stringify(array));
    location.href="verGrupo.html";
}