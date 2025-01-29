let X = new URLSearchParams(window.location.search);
X = X.get("Escanear");
if(X==="true"){
	document.getElementById("escanear").click();
	document.getElementById("escaneo").innerHTML = `
		<a-scene mindar-image="imageTargetSrc:datos/escaneos/targets.mind" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
			<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
			<a-entity mindar-image-target="targetIndex: 0">
				<a-text position="0 0 -5" font="kelsonsans" value="Edificio B2: Facultad de ingenieria" width="15" position="6 1.25 -10" rotation="0 10 0" color="#4287f5" text=""></a-text>
			</a-entity>
		</a-scene>`;
}
const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
let Z;
a1();

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
	}
	catch(q){
		console.error(q);
	}

}
function b1(x){
}