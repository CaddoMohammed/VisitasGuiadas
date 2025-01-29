const Y = supabase.createClient("https://yrpewvflgexntamdzlia.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycGV3dmZsZ2V4bnRhbWR6bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDUzOTIsImV4cCI6MjA1MjY4MTM5Mn0.VxNcklQ9I8_18NPl3EPo6rJWfGrmqfoU4rKT9BwWzSo");
let I,J,X,Z;
a1();
if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position) => {
            let x = 100;
            for(let i=0;i<Z.length;i++){
                for(let j=0;j<Z[i].Ubicaciones.length;j++){
                    let a = Math.PI*position.coords.latitude/180;
					let b = Math.PI*Z[i].Ubicaciones[j].Latitud/180;
					let c = (a-b)/2;
					let d = Math.PI*(position.coords.longitude-Z[i].Ubicaciones[j].Longitud)/360;
					let e = Math.pow(Math.sin(c),2)+Math.cos(a)*Math.cos(b)*Math.pow(Math.sin(d),2)
					let f = 2*Math.atan2(Math.sqrt(e),Math.sqrt(1-e));
					let g = 6378*f;
                    if(g<x){
                        console.log(x,i,j);
                        I = i;
                        J = j;
                        x = g;
                    }
                }

            }
            document.getElementById("escaneo").innerHTML = `
                <a-scene mindar-image="imageTargetSrc:datos/${Z[I].Nombre}/${Z[I].Ubicaciones[J].Nombre}.mind" color-space="sRGB" renderer="colorManagement:true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false;">
                    <a-assets>
                    <a-asset-item id="bearModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf"></a-asset-item>
                    <a-asset-item id="raccoonModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf"></a-asset-item>
                    </a-assets>
                
                    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                
                    <a-entity mindar-image-target="targetIndex: 0">
                    <a-gltf-model rotation="0 0 0 " position="0 -0.25 0" scale="0.05 0.05 0.05" src="#raccoonModel" animation-mixer>
                    </a-entity>
                    <a-entity mindar-image-target="targetIndex: 1">
                    <a-gltf-model rotation="0 0 0 " position="0 -0.25 0" scale="0.05 0.05 0.05" src="#bearModel" animation-mixer>
                    </a-entity>
                </a-scene>`;
		},
		(x) => {
			if(Z===null){
                Z = Z.data;
                localStorage.setItem("CaddoMohammed-VisitasGuiadasUNAH-CentroUniversitario",JSON.stringify(Z));

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
        Z = Z.data;
    }
	catch(q){
		console.error(q);
	}
}
document.body