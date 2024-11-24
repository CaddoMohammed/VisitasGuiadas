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
    a.on("click", function(){
        document.getElementById("m1").click();
        document.getElementById("m3").innerHTML = ubicaciones[i].b;
        document.getElementById("m4").innerHTML = `<img src="img/${ubicaciones[i].b}.jpg" style="width:100%;">`
    });
}