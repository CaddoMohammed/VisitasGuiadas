let V=0,X=0;
for(let i=0;i<centros.length;i++){
	let a = document.createElement("li");
	a.className = "p-1";
	document.getElementById("centros-universitarios").appendChild(a);
	let b = document.createElement("a");
	b.className = "dropdown-item p-1";
	b.style.width = "width:max-content";
	b.id = `centro${i+1}`;
	b.innerHTML = centros[i].a;
	b.onclick = () => a1(i);
	a.appendChild(b);
}
let marker = null;
if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position) => {
			if(marker){
				V.removeLayer(marker);
			}
			for(let i=0;i<centros.length;i++){
				let b = Math.pow(position.coords.latitude-centros[i].b[0],2);
				let c = Math.pow(position.coords.longitude-centros[i].b[1],2);
				if((b+c)<=100){
					X = i;
				}
			}
			marker = L.marker(
				[position.coords.latitude,position.coords.longitude],{
					icon: L.icon({
						iconUrl:"img/bx-cross.svg",
						iconSize:[35,35],
						iconAnchor:[17.5,17.5],
					})
				}
			).addTo(V).openPopup();
		},
		(x) => {
			console.error(x);
		}, {
			enableHighAccuracy:true,
			maximumAge:0,
			timeout:10000
		}
	);
}
a1(X);
function a1(x){
	for(let i=0;i<centros.length;i++){
		if(i!==x){
			document.getElementById(`centro${i+1}`).classList.remove("border-bottom");
			document.getElementById(`centro${i+1}`).classList.remove("border-secondary");
			document.getElementById(`centro${i+1}`).classList.remove("border-3");
		}
		else{
			document.getElementById(`centro${i+1}`).classList.add("border-bottom");
			document.getElementById(`centro${i+1}`).classList.add("border-secondary");
			document.getElementById(`centro${i+1}`).classList.add("border-2");
		}
	}
	document.getElementById("mapa").innerHTML = "";
	if(V!==0){
		V.remove();
	}
	V = L.map("mapa",{
		center:centros[x].b,
		zoom:centros[x].c,
		minZoom:centros[x].d,
		maxZoom:centros[x].e,
		zoomControl:centros[x].f,
		attributionControl:centros[x].g
	});
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(V);
	for(let i=0;i<ubicaciones[x].length;i++){
		let a = L.marker(ubicaciones[x][i].a).addTo(V);
		a.on("click",function(){
			document.getElementById("m1").click();
			document.getElementById("m4").innerHTML = "";
			setTimeout(() => {
				document.getElementById("m3").innerHTML = ubicaciones[X][i].b;
				let b = "";
				if(ubicaciones[X][i].d.mostrarMensaje===true){
					for(let j=0;j<ubicaciones[X][i].d.mensajes.length;j++){
						let c;
						switch(ubicaciones[X][i].d.mensajes[j].tipo){
							case 1:
								c = `
									<a-text font="${ubicaciones[X][i].d.mensajes[j].fuente}" value="${ubicaciones[X][i].d.mensajes[j].texto}" width="${ubicaciones[X][i].d.mensajes[j].tamaño}" position="${ubicaciones[X][i].d.mensajes[j].posicion}" rotation="${ubicaciones[X][i].d.mensajes[j].rotacion}" color="${ubicaciones[X][i].d.mensajes[j].color}"></a-text>`;
								break;
							case 2:
								c = `
									<a-entity position="${ubicaciones[X][i].d.mensajes[j].posicion}" geometry="primitive:plane; width:${ubicaciones[X][i].d.mensajes[j].tamaño}" material="color:${ubicaciones[X][i].d.mensajes[j].caja.color}" text="color:${ubicaciones[X][i].d.mensajes[j].caja.color_texto}; align:${ubicaciones[X][i].d.mensajes[j].caja.alineacion}; font:${ubicaciones[X][i].d.mensajes[j].fuente}; value:${ubicaciones[X][i].d.mensajes[j].texto}" rotation="${ubicaciones[X][i].d.mensajes[j].rotacion}"></a-entity>`;
								break;
							case 3:
								c = 
									`<a-assets>
										<a-asset-item id="modelo${j}" src="${ubicaciones[X][i].d.mensajes[j].src}"></a-asset-item>
									</a-assets>
									<a-gltf-model src="#modelo${j}" rotation="${ubicaciones[X][i].d.mensajes[j].rotacion} " position="${ubicaciones[X][i].d.mensajes[j].posicion}"></a-gltf-model>`;
									break;
							case 4:
								c = 
									`<a-assets>
										<img id="imagen${j}" src="${ubicaciones[X][i].d.mensajes[j].src}">
									</a-assets>
									<a-image src="#imagen${j}" width="${ubicaciones[X][i].d.mensajes[j].ancho}" height="${ubicaciones[X][i].d.mensajes[j].alto}" rotation="${ubicaciones[X][i].d.mensajes[j].rotacion}" position="${ubicaciones[X][i].d.mensajes[j].posicion}"></a-image>`
						}
						b = b+c;
					}
				}
				document.getElementById("m4").innerHTML = `
				<a-scene embedded>
					<a-sky src="img/${centros[X].a}/${ubicaciones[X][i].b}.jpeg" rotation="${ubicaciones[X][i].c}"></a-sky>
					${b}
				</a-scene>`;
			},200);
			
		});
	}
}