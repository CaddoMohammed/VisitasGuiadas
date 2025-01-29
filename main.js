let V = 0; // mapa
let W = localStorage.getItem("CaddoMohammed-VisitasGuiadasUNAH-CentroUniversitario"); // Centro seleccionado
let X = new URLSearchParams(window.location.search); // Acceder a escaneo
const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
let Z;
a1();
let marker = null;
if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position) => {
			if((marker!==null)&&(V!==0)){
				V.removeLayer(marker);
			}
			if(W===null){
				let x = false;
				for(let i=0;i<Z.data.length;i++){
					let a = Math.PI*position.coords.latitude/180;
					let b = Math.PI*Z.data[i].Latitud/180;
					let c = (a-b)/2;
					let d = Math.PI*(position.coords.longitude-Z.data[i].Longitud)/360;
					let e = Math.pow(Math.sin(c),2)+Math.cos(a)*Math.cos(b)*Math.pow(Math.sin(d),2)
					let f = 2*Math.atan2(Math.sqrt(e),Math.sqrt(1-e));
					let g = 6378*f;
					if(g<=15){
						W = {A:Z.data[i]};
						x = true;
						break;
					}
				}
				if(x===true){
					b1(W.A);
				} else {
					b1(Z.data[0]);
				}
			}
			if(V!==0){
				marker = L.marker(
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
				b1(Z.data[0]);
			}
		}, {
			enableHighAccuracy:true,
			maximumAge:0,
			timeout:500
		}
	);
}
async function a1(){
	try{
		Z = await Y.rpc("DatosCentrosUniversitarios");
		document.getElementById("centros-universitarios").innerHTML = "";
		for(let i=0;i<Z.data.length;i++){
			let a = document.createElement("li");
			a.className = "p-1";
			document.getElementById("centros-universitarios").appendChild(a);
			let b = document.createElement("a");
			b.className = "dropdown-item p-1";
			b.style.width = "width:max-content";
			b.id = `centro${Z.data[i].Id}`;
			b.innerHTML = Z.data[i].Nombre;
			b.onclick = () => b1(Z.data[i]);
			a.appendChild(b);
		}
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
	let a;
	for(let i=0;i<Z.data.length;i++){
		if(Z.data[i].Id!==x.Id){
			document.getElementById(`centro${Z.data[i].Id}`).classList.remove("border-bottom");
			document.getElementById(`centro${Z.data[i].Id}`).classList.remove("border-secondary");
			document.getElementById(`centro${Z.data[i].Id}`).classList.remove("border-3");
		} else {
			a = i;
			document.getElementById(`centro${Z.data[i].Id}`).classList.add("border-bottom");
			document.getElementById(`centro${Z.data[i].Id}`).classList.add("border-secondary");
			document.getElementById(`centro${Z.data[i].Id}`).classList.add("border-2");
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
		b.on("click",() => c1(x.Id,x.Ubicaciones[i].Id));
	}
}
function c1(x,y){
	console.log(x,y)
}