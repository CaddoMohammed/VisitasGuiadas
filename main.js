let V = 0; // mapa
let W = localStorage.getItem("CaddoMohammed-VisitasGuiadasUNAH-CentroUniversitario"); // Centro seleccionado
let X = null; // marcador de posicion en el mapa
const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
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
		let b = L.marker([x.Ubicaciones[i].Latitud,x.Ubicaciones[i].Longitud]).addTo(V);
		b.on("click",() => c1(x.Id,x.Ubicaciones[i].Id,x.Ubicaciones[i].Datos));
	}
}
async function c1(x,y,z){
	try{
		let a = await Y.from("DatosPuntos").select('*').eq("Id",z);
		a = a.data[0];
		document.getElementById("exploracion").click();
		setTimeout(()=> {
			document.getElementById("foto360").innerHTML = 
			`<a-scene embedded>
				<a-assets>
					<img id="${a.Imagen}" src="https://yrpewvflgexntamdzlia.supabase.co/storage/v1/object/public/ubicaciones/img/${a.Imagen}.webp">
				</a-assets>
				<a-sky src="#${a.Imagen}" rotation="${a.RotacionA} ${a.RotacionB} ${a.RotacionC}"></a-sky>
			</a-scene>`;
		},150);
		let b = new Date();
		b = new Date(b.toLocaleString('en-US',{timeZone:"Etc/GMT+6"}));
		b = await Y.from("AccesoPuntos").insert({CentroUniversitario:x,PuntoAcceso:y,Fecha:b.toISOString().split('T')[0],Hora:b.toTimeString().slice(0,8)});
	}
	catch(q){
		console.error(q);
	}
}