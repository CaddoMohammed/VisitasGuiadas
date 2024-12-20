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
					let c;
					switch(ubicaciones[X][i].c.mensajes[j].tipo){
						case 1:
							c = `
								<a-text font="${ubicaciones[X][i].c.mensajes[j].fuente}" value="${ubicaciones[X][i].c.mensajes[j].texto}" width="${ubicaciones[X][i].c.mensajes[j].tamaño}" position="${ubicaciones[X][i].c.mensajes[j].posicion}" rotation="${ubicaciones[X][i].c.mensajes[j].rotacion}" color="${ubicaciones[X][i].c.mensajes[j].color}"></a-text>`;
							break;
						case 2:
							c = `
								<a-entity position="${ubicaciones[X][i].c.mensajes[j].posicion}" geometry="primitive:plane; width:${ubicaciones[X][i].c.mensajes[j].tamaño}" material="color:${ubicaciones[X][i].c.mensajes[j].caja.color}" text="color:${ubicaciones[X][i].c.mensajes[j].caja.color_texto}; align:${ubicaciones[X][i].c.mensajes[j].caja.alineacion}; font:${ubicaciones[X][i].c.mensajes[j].fuente}; value:${ubicaciones[X][i].c.mensajes[j].texto}" rotation="${ubicaciones[X][i].c.mensajes[j].rotacion}"></a-entity>`;
							break;
						case 3:
							c = 
								`<a-assets>
									<a-asset-item id="modelo${j}" src="${ubicaciones[X][i].c.mensajes[j].src}"></a-asset-item>
								</a-assets>
								<a-gltf-model src="#modelo${j}" rotation="${ubicaciones[X][i].c.mensajes[j].rotacion} " position="${ubicaciones[X][i].c.mensajes[j].posicion}"></a-gltf-model>`;
								break;
						case 4:
							c = 
								`<a-assets>
									<img id="imagen${j}" src="${ubicaciones[X][i].c.mensajes[j].src}">
								</a-assets>
								<a-image src="#imagen${j}" width="${ubicaciones[X][i].c.mensajes[j].ancho}" height="${ubicaciones[X][i].c.mensajes[j].alto}" rotation="${ubicaciones[X][i].c.mensajes[j].rotacion}" position="${ubicaciones[X][i].c.mensajes[j].posicion}"></a-image>`
					}
					b = b+c;
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
let marker = null;
if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position) => {
			if(marker){
				V.removeLayer(marker);
			}
			marker = L.marker([position.coords.latitude,position.coords.longitude], {
				icon: L.icon({
					iconUrl: "img/bx-cross.svg",
					iconSize: [35,35],
					iconAnchor: [17.5,17.5],
				})
			}).addTo(V).openPopup();
		},
		(error) => {
			console.error(error);
		},
		{
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 10000
		}
	);
}
