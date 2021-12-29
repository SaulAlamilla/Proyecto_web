function ver(){
    //Variable tamano para saber la longitud y valores específicos del arreglo en el localstorage
    let tamano = JSON.parse(localStorage.getItem("grupos"));
    let tbody = document.getElementById("tbody");

    for (let i=0; i<tamano.length; i++){
        ///GENERANDO LA TABLA PARA VER LOS GRUPOS///
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let tdCreador = document.createElement("td");
        tdCreador.innerHTML = tamano[i].creador;
        tr.appendChild(tdCreador);

        let tdGenero = document.createElement("td");
        tdGenero.innerHTML = tamano[i].genero;
        tr.appendChild(tdGenero);

        let tdPeliculas = document.createElement("td");
        tdPeliculas.innerHTML = tamano[i].peliculas;
        tr.appendChild(tdPeliculas);

        ///BOTONES DE EDITAR////
        let tdEdit = document.createElement("td");
        tr.appendChild(tdEdit)
        let a = document.createElement("a");
        a.setAttribute("href", "../htmlFiles/modificar.html?id"+"="+i);
        a.innerHTML = "Edit";
        a.setAttribute("id", ""+i);
        a.setAttribute("class","btn btn-primary")
        tdEdit.appendChild(a);

        ///BOTONES DE BORRAR///
        let tdDelete = document.createElement("td");
        tr.appendChild(tdDelete)
        let eliminar = document.createElement("a");
        eliminar.setAttribute("href", "../htmlFiles/eliminar.html?id"+"="+i);
        eliminar.textContent = "Delete";
        eliminar.setAttribute("class", "btn btn-danger")
        tdDelete.appendChild(eliminar);
    }
}