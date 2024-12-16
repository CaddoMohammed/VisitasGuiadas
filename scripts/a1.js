console.log(document.getElementById("m4").clientHeight,document.getElementById("m4").clientWidth)
let X = 0;
let V = L.map("mapa",{
	center:centros[X].b,
	zoom:17,
	minZoom:5,
	maxZoom:18,
	zoomControl:false,
	attributionControl:false
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(V);
for(let i=0;i<ubicaciones[X].length;i++){
	let a = L.marker(ubicaciones[X][i].a).addTo(V);
	a.on("click",function(){
		document.getElementById("m1").click();
		setTimeout(() => {
			document.getElementById("m3").innerHTML = ubicaciones[X][i].b;
			let b = "";
			if(ubicaciones[X][i].c.mostrarMensaje===true){
				for(let j=0;j<ubicaciones[X][i].c.mensajes.length;j++){
					b = `
					<a-text font="kelsonsans" value="${ubicaciones[X][i].c.mensajes[j].texto}" width="${ubicaciones[X][i].c.mensajes[j].tamaño}" position="${ubicaciones[X][i].c.mensajes[j].posicion}" rotation="${ubicaciones[X][i].c.mensajes[j].rotacion}"></a-text>` + b;
				}
			}
			document.getElementById("m4").innerHTML = `
			<a-scene embedded>
				<a-sky src="img/${centros[X].a}/${ubicaciones[X][i].b}.jpeg" rotation="0 -360 0"></a-sky>
				${b}
			</a-scene>`;
		},200);
		
	});
}