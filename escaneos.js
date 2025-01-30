const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
let Z;
a1();
async function a1(){
	try{
		Z = await Y.rpc("DatosCentrosUniversitariosPresencial");
		Z = Z.data;
		console.log(Z)
		let a = document.querySelector("a-scene");
		console.log(a)
		for(let i=0;i<Z.length;i++){
			for(let j=0;j<Z[i].Ubicaciones.length;j++){
				let b = document.createElement("a-text");
				b.setAttribute('gps-entity-place',`latitude:${Z[i].Ubicaciones[j].Latitud};longitude:${Z[i].Ubicaciones[j].Longitud};`);
				b.setAttribute('look-at',`[gps-camera]`);
				b.setAttribute('scale',`${Z[i].Ubicaciones[j].EscalaA} ${Z[i].Ubicaciones[j].EscalaB} ${Z[i].Ubicaciones[j].EscalaC}`);
				b.setAttribute('value',`${Z[i].Ubicaciones[j].Texto}`);
				a.appendChild(b);
			}
		}
	}
	catch(q){
		console.error(q);
	}
}
document.body