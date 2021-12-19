function loadBanner(){
    for (let i=0; i<10; i++) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 18rem; display: inline-block")

        let img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("id", "image"+i);
        img.setAttribute("alt", "...");

        let card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute("id", "nombre"+i);
        h5.setAttribute("class", "card-title")
        let a = document.createElement("button");
        a.innerHTML = "Ver detalles";
        a.setAttribute("class", "btn btn-primary")
        a.setAttribute("onclick", "showdetails("+i+");")

        let container = document.getElementById("container");
        container.appendChild(card);
        card.appendChild(img);
        card.appendChild(card_body);

        card_body.appendChild(h5);
        card_body.appendChild(a);
    }
    load()
}
//USO DEL WEB SERVICE
function load(){
    const url = "https://ghibliapi.herokuapp.com/films";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i=0; i<10; i++) {
                document.getElementById("nombre"+i).innerHTML = data[i].title;
                //console.log(data[i].image);

                const urlImage = data[i].image;
                fetch(urlImage)
                    .then(response => response.blob())
                    .then(imageBlob => {
                        const imageObjectURL = URL.createObjectURL(imageBlob);
                        document.getElementById("image"+i).src = imageObjectURL;
                    })
            }
        })
}

function showdetails(i){
    localStorage.setItem("pelicula", i);
    location.href="htmlFiles/detalles.html";
}