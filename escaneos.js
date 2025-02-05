const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
let Z;
a1();
async function a1(){
	try{
		Z = await Y.rpc("DatosCentrosUniversitariosPresencial");
		Z = Z.data;
		let a = document.querySelector("a-scene");
		for(let i=0;i<Z.length;i++){
			for(let j=0;j<Z[i].Ubicaciones.length;j++){
				let b = document.createElement("a-entity");
				b.setAttribute("geometry","primitive:plane; height:0; width:0");
				b.setAttribute("material",`color:${Z[i].Ubicaciones[j].BackgroundColor}`);
				b.setAttribute("look-at","[gps-camera]");
				b.setAttribute("gps-entity-place",`latitude:${Z[i].Ubicaciones[j].Latitud};longitude:${Z[i].Ubicaciones[j].Longitud};`);
				b.setAttribute("scale",`${Z[i].Ubicaciones[j].EscalaA} ${Z[i].Ubicaciones[j].EscalaB} ${Z[i].Ubicaciones[j].EscalaC}`);
				b.setAttribute("text",`value:${Z[i].Ubicaciones[j].Nombre}\n\n${Z[i].Ubicaciones[j].Texto}; color:${Z[i].Ubicaciones[j].TextColor}; font:chars/custom-msdf.json; font-image:chars/custom.png; negate:false`);
				a.appendChild(b);
			}
		}
	}
	catch(q){
		console.error(q);
	}
}