

class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {
        let usuari1: Usuario = new Usuario("user1","user1@ejemplo.com","user", "1234");
        let usuario2: Usuario = new Usuario("admin1","admin1@ejemplo.com","admin", "1235");
        this.usuarios.push(usuari1);
        this.usuarios.push(usuario2);
        for (let u of this.usuarios) {
            console.log(u.mostrar,this.usuarios.length);
        }
    }
    handleEvent(object: Event): void {
        this.buscarPersonas();
    }

}

    
window.addEventListener("load", () => {
  
    let main1: Main = new Main();
     

    


});

