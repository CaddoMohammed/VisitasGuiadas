let U = new Object();
let V = 0; // mapa
let W = localStorage.getItem("CaddoMohammed-VisitasGuiadasUNAH-CentroUniversitario"); // Centro seleccionado
let X = null; // marcador de posicion en el mapa
const Y = supabase.createClient("https://pscthmfblitykjsfggnc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzY3RobWZibGl0eWtqc2ZnZ25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMjcyNjMsImV4cCI6MjA3OTYwMzI2M30.9w-6M31KdF804tVTpkcrKcrEy4h_BCnFY2cWHd9d8hI");
let Z;
a1();
if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position) => {
			if((X!==null)&&(V!==0)){
				V.removeLayer(X);
			}
			if((W===null)&&(Z!=undefined)){
				let x = false;
				for(let i=0;i<Z.length;i++){
					let a = Math.PI*position.coords.latitude/180;
					let b = Math.PI*Z[i].Latitud/180;
					let c = (a-b)/2;
					let d = Math.PI*(position.coords.longitude-Z[i].Longitud)/360;
					let e = Math.pow(Math.sin(c),2)+Math.cos(a)*Math.cos(b)*Math.pow(Math.sin(d),2)
					let f = 2*Math.atan2(Math.sqrt(e),Math.sqrt(1-e));
					let g = 6378*f;
					if(g<=15){
						W = {A:Z[i]};
						x = true;
						break;
					}
				}
				if(x===true){
					b1(W.A);
				} else {
					b1(Z[0]);
				}
			}
			if(V!==0){
				X = L.marker(
					[position.coords.latitude,position.coords.longitude],{
						icon: L.icon({
							iconUrl:"img/bx-cross.svg",
							iconSize:[35,35],
							iconAnchor:[17.5,17.5],
						})
					}
				).addTo(V).openPopup();
			}
		},
		(x) => {
			if(W===null){
				b1(Z[0]);
			}
		}, {
			enableHighAccuracy:true,
			maximumAge:0,
			timeout:50
		}
	);
}
async function a1(){
	try{
		Z = await Y.rpc("DatosCentrosUniversitariosVirtual");
		Z = Z.data;
		document.getElementById("centros-universitarios").innerHTML = "";
		for(let i=0;i<Z.length;i++){
			let a = document.createElement("li");
			a.className = "p-1";
			document.getElementById("centros-universitarios").appendChild(a);
			let b = document.createElement("a");
			b.className = "dropdown-item p-1";
			b.style.width = "width:max-content";
			b.id = `centro${Z[i].Id}`;
			b.innerHTML = Z[i].Nombre;
			b.onclick = () => b1(Z[i]);
			a.appendChild(b);
		}
		let a = document.createElement("li");
		a.className = "p-1";
		a.innerHTML = `<a class="dropdown-item p-1" style="width:max-content" href="escaneo.html">Exploracion</a>`
		document.getElementById("centros-universitarios").appendChild(a);
		if(W!==null){
			W = JSON.parse(W);
			b1(W.A);
		}
	}
	catch(q){
		console.error(q);
	}
}
function b1(x){
	W = {A:x};
	localStorage.setItem("CaddoMohammed-VisitasGuiadasUNAH-CentroUniversitario",JSON.stringify(W));
	for(let i=0;i<Z.length;i++){
		if(Z[i].Id!==x.Id){
			document.getElementById(`centro${Z[i].Id}`).classList.remove("border-bottom");
			document.getElementById(`centro${Z[i].Id}`).classList.remove("border-secondary");
			document.getElementById(`centro${Z[i].Id}`).classList.remove("border-2");
		} else {
			a = i;
			document.getElementById(`centro${Z[i].Id}`).classList.add("border-bottom");
			document.getElementById(`centro${Z[i].Id}`).classList.add("border-secondary");
			document.getElementById(`centro${Z[i].Id}`).classList.add("border-2");
		}
	}
	document.getElementById("mapa").innerHTML = "";
	if(V!==0){
		V.remove();
	}
	V = L.map("mapa",{
		center:[x.Latitud,x.Longitud],
		zoom:x.ZoomInicial,
		minZoom:x.MinZoom,
		maxZoom:x.MaxZoom,
		zoomControl:x.ZoomControl,
		attributionControl:false
	});
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(V);
	for(let i=0;i<x.Ubicaciones.length;i++){
		let a = L.marker([x.Ubicaciones[i].Latitud,x.Ubicaciones[i].Longitud]).addTo(V);
		a.on("click",() => c1(x,x.Ubicaciones[i].Id,x.Ubicaciones[i].sceneId));
	}
	for(let i=0;i<x.Escenas.length;i++){
		if(x.Escenas[i].Nombre==undefined){
			continue;
		}
		U[x.Escenas[i].Nombre] = x.Escenas[i];
		U[x.Escenas[i].Nombre]["panorama"] = `https://pscthmfblitykjsfggnc.supabase.co/storage/v1/object/public/ubicaciones/img/${x.Escenas[i]["Imagen"]}.webp`;
		if(U[x.Escenas[i].Nombre]["title"]==undefined){
			delete U[x.Escenas[i].Nombre]["title"];
		}
		delete U[x.Escenas[i].Nombre]["Imagen"];
		delete U[x.Escenas[i].Nombre]["Nombre"];
	}
}
async function c1(x,y,z){
	document.getElementById("foto360").innerHTML = "";
	document.getElementById("exploracion").click();
	setTimeout(()=> {
		pannellum.viewer("foto360", {
			"default":{
				"firstScene":z,
				"autoLoad": true,
				"friction":x.friction,
				"sceneFadeDuration":x.sceneFadeDuration,
				"orientationOnByDefault":x.orientationOnByDefault
			},
			"scenes":U
		});
	},150);
	try{
		const a = new Intl.DateTimeFormat('es-HN', {
			timeZone: 'America/Tegucigalpa',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		let b = a.formatToParts(new Date());
		b = {
			CentroUniversitario:x.Id,
			PuntoAcceso:y,
			Fecha:`${b[4].value}-${b[2].value}-${b[0].value}`,
			Hora:`${b[6].value}:${b[8].value}:${b[10].value}`
		}
		await Y.from("AccesoPuntos").insert(b);
	}
	catch(q){
		console.error(q);
	}
}