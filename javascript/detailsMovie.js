function detailsMovie(){
    console.log("ok");
    const url = "https://ghibliapi.herokuapp.com/films";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let etiquetas = document.getElementById("detalles");
            /*etiquetas.innerHTML = data[localStorage.getItem("pelicula")].title +
                                    data[localStorage.getItem("pelicula")].original_title  ;*/


            etiquetas.innerHTML = `Título: ${data[localStorage.getItem("pelicula")].title}
									<br>Nombre original: ${data[localStorage.getItem("pelicula")].original_title}
									<br>Titulo romanizado: ${data[localStorage.getItem("pelicula")].original_title_romanised}
									<br>Director: ${data[localStorage.getItem("pelicula")].director}
                                    <br>Productora: ${data[localStorage.getItem("pelicula")].producer}
                                    <br>Lanzamiento: ${data[localStorage.getItem("pelicula")].release_date}
                                    <br>Duración: ${data[localStorage.getItem("pelicula")].runing_time} minutos`;


            //console.log(data[localStorage.getItem("pelicula")].title);

            const urlImage = data[localStorage.getItem("pelicula")].movie_banner;
            fetch(urlImage)
                .then(response => response.blob())
                .then(imageBlob => {
                    const imageObjectURL = URL.createObjectURL(imageBlob);

                    const image = new Image();
                    image.src = imageObjectURL
                    image.style.width = "450px";
                    document.getElementById("movieBanner").appendChild(image);
                })
        })
}