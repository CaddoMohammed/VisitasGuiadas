let V = L.map("mapa", {
    center:[14.084657,-87.165792],
    zoom:17,
    minZoom:17,
    maxZoom:18,
    zoomControl: false,
    attributionControl:false
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(V);
for(let i=0;i<ubicaciones.length;i++){
    let a = L.marker(ubicaciones[i].a).addTo(V);
    let b = document.createElement("p");
    b.innerHTML = ubicaciones[i].b+" ";
    let c = document.createElement("i");
    c.className = "bi bi-info-circle-fill";
    c.style.color = "#a6a39c";
    c.onmouseenter = function(){
        c.style.color = "#9403fc";
    }
    c.onmouseleave = function(){
        c.style.color = "#a6a39c";
    }
    c.onclick = function(){
        document.getElementById("m1").click();
        document.getElementById("m3").innerHTML = ubicaciones[i].b;
        document.getElementById("m4").innerHTML = `<img src="img/${ubicaciones[i].b}.jpg" style="width:100%;">`
    }
    b.appendChild(c);
    a.bindPopup(b).openPopup();

}