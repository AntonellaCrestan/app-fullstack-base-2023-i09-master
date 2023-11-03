
class Persona implements EventListenerObject{
  nombre:string;
  email:string;
  saludar(){
    let current_value = document.getElementById("btnSaludar") as HTMLInputElement;
    let new_value = "Hola !"+"\n"+current_value.value;
    document.getElementById("btnSaludar").innerHTML=new_value
  }
  constructor(nombre:string, email:string){
    this.nombre = nombre;
    this.email = email;
  }
  handleEvent(object: Event): void {
    function saludar() {
    //  let current_value = document.getElementById("btnSaludar") as HTMLInputElement;
    //  let new_value = "Hola !"+"\n"+current_value.value;
    //  document.getElementById("btnSaludar").innerHTML=new_value
    }
    }
 } 
class Usuario extends Persona {
  private rol: string;
  private password: string;

  constructor(nombre:string, email:string, rol:string, password:string) {
    super(nombre,email)
    this.password = password;
    this.rol = rol;
  }

  mostrar():string {
    return `${this.nombre} - ${this.rol}`; 
  }
}

window.addEventListener("load", ()=> { 
  let persona:Persona = new Persona("Jorge","jorge@ejemplo.com");
  persona.saludar();
  let usuario:Usuario = new Usuario("Sabrina","sabrina@ejemplo.com","Ingeniera","7865");
  usuario.saludar();
  let boton = document.getElementById("btnSaludar");
  //boton.addEventListener("click",saludar); 
});





