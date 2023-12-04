class Usuario extends Persona {
    nombre:string;
    rol:string;
    password:string
    
    constructor(nombre:string, rol:string, password: string, dni:number) {
      super (dni);
      this.nombre = nombre;
      this.rol = rol;
      this.password = password;
    }

    public mostrar():string{
      return `${this.nombre}-${this.rol}-${this.password}`;
    }
}






