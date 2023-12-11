var M;
class Main implements EventListenerObject {
    public usuarios: Array<Usuario> = new Array<Usuario>();

    private buscarPersonas() { //Función para cargar los nombres de usuario en área de texto de Smart Home 
       
        var textarea=document.getElementById("textarea_1") as HTMLTextAreaElement;

        for (let u of this.usuarios) {
            console.log(u.mostrar(), this.usuarios.length);
            textarea.value += u.mostrar() + "\n";
        }
    }
    private buscarDevices() { //Función que busca los devices del backend y los postea en consola, cuadro de texto y los ordena en listado
        var textarea2=document.getElementById("textarea_2") as HTMLTextAreaElement;
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange= () => {
            if(xmlRequest.readyState==4){
                if(xmlRequest.status==200){
                    //console.log(xmlRequest.responseText,xmlRequest.readyState);
                    let respuesta=xmlRequest.responseText;
                    let datos: Array<Device>=JSON.parse(respuesta);

                    let ul = document.getElementById("listaDisp");
                    //let cambiarestado:string;

                    for (let d of datos){
                        let itemList= `<li class="collection-item avatar">
                        <img src= `;
                            if (d.type==0) {
                                itemList+= `"./static/images/Lampara.jpg" alt="" class="circle"`;
                            } else if (d.type==1) {
                                itemList+= `"./static/images/Persiana.JPG" alt="" class="circle"`;
                            }
                            itemList += `<span class="title">${d.name}</span>
                            <p>
                                ${d.description}
                            </p>
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label>
                                         Off
                                        <input type="checkbox"`;
                                        itemList+= `nuevoAtt="${d.id}" id="cb_${d.id}"`
                                            if (d.state) {
                                                itemList+= `checked`;
                                            } 
                                            itemList+= `>            
                                        <span class="lever"></span>
                                        On
                                    </label>
                                </div>
                            </a>
                        </li>`
                        
                        ul.innerHTML+= itemList;

                        console.log(d.name);
                        textarea2.value += "-" + d.name + "\n";
                        //if (d.state)==true
                        //    let checkDevice=true

                    }
                    for (let d of datos) {
                        let checkbox=document.getElementById("cb_"+ d.id);
                        checkbox.addEventListener("click",this);
                    }
                }else{
                    console.log("no encontré nada");
                }
            }
        }
        //xmlRequest.open("GET",`http://localhost:8000/otraCosa/"${d.id}"/"${d.name}"`,true)
        xmlRequest.open("GET","http://localhost:8000/devices/",true)
        xmlRequest.send();
    }
    private cargarUsuario(): void{ //Función que permite cargar usuario considerando los item obligatorios
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
    private ejecutarPost(id:number,state:boolean) {
        let xmlRequest = new XMLHttpRequest ();
        xmlRequest.onreadystatechange=() => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("Llego respuesta",xmlRequest.responseText);
                } else {
                    alert("Salió mal la consulta");
                }
            }
        }
        xmlRequest.open("POST","http://localhost:8000/device",true)
        xmlRequest.setRequestHeader("Content-Type","application/json");
        let s = {
            id: id,
            state:state};
            xmlRequest.send(JSON.stringify(s));
    }
    

    handleEvent(object: Event): void {
        let elemento=<HTMLElement> object.target;
        if ("btnListar"==elemento.id){
            this.buscarPersonas();
            this.buscarDevices();

        }else if ("btnGuardar"==elemento.id){
            this.cargarUsuario();
            this.buscarPersonas();
        }else if(elemento.id.startsWith("cb_")){
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"),checkbox.checked,elemento.id.substring(3,elemento.id.length));
            this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
        }
    }
}
window.addEventListener("load", () => {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "");

    let main1: Main = new Main();
    let boton = document.getElementById("btnListar");

    boton.addEventListener("click", main1);
    let botonGuardar = document.getElementById ("btnGuardar");
    botonGuardar.addEventListener("click",main1);

    let checkbox=document.getElementById("cb");
    checkbox.addEventListener("click",main1);
});
