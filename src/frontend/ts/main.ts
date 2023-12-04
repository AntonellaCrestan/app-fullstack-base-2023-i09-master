class Main implements EventListenerObject {
    public usuarios: Array<Usuario> = new Array<Usuario>();

    private buscarPersonas() {
       
        var textarea=document.getElementById("textarea_1") as HTMLTextAreaElement;

        for (let u of this.usuarios) {
            console.log(u.mostrar(), this.usuarios.length);
            textarea.value += u.mostrar() + "\n";
        }
    }
    private buscarDevices() {
        var textarea2=document.getElementById("textarea_2") as HTMLTextAreaElement;
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange= () => {
            if(xmlRequest.readyState==4){
                if(xmlRequest.status==200){
                    //console.log(xmlRequest.responseText,xmlRequest.readyState);
                    let respuesta=xmlRequest.responseText;
                    let datos: Array<Device>=JSON.parse(respuesta);
                    for (let d of datos){
                        console.log(d.name);
                        textarea2.value += "-" + d.name + "\n";
                    }
                }else{
                    console.log("no encontré nada");
                }
            }
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

    private cargarUsuario(): void{
        let iNombre= <HTMLInputElement> document.getElementById("iNombre");
        let iDNI= <HTMLInputElement> document.getElementById("iDNI");
        let iPassword= <HTMLInputElement> document.getElementById("iPassword");
        let pInfo= document.getElementById("pInfo");

        if (iNombre.value.length>4 && iPassword.value.length>6 && iDNI.value.length==8) {
            let usuario1: Usuario = new Usuario (iNombre.value,"user",iPassword.value,iDNI.valueAsNumber);
            this.usuarios.push(usuario1);
            iNombre.value="";
            iPassword.value="";
            iDNI.valueAsNumber="";

            pInfo.innerHTML="Se cargo correctamente!";
            pInfo.className= "textoCorrecto";
        } else {
            pInfo.innerHTML="Usuario o contraseña incorrecta!";
            pInfo.className="textoError";
        }
    }
    
    handleEvent(object: Event): void {
        let elemento=<HTMLElement> object.target;
        if ("btnListar"==elemento.id){
            this.buscarPersonas();
            this.buscarDevices();

        }else if ("btnGuardar"==elemento.id){
            this.cargarUsuario();
            this.buscarPersonas();
        }
        

    }
}
window.addEventListener("load", () => {

    let main1: Main = new Main();
    let boton = document.getElementById("btnListar");
    boton.addEventListener("click", main1);
    let botonGuardar = document.getElementById ("btnGuardar");
    botonGuardar.addEventListener("click",main1);
});
