export class ProcessConfiguration {
    constructor() {
        this.configuracionverificadores = new Array<Sede>();
    }
    public mensajeestudiantes: string;
    public moduloactivo: boolean;
    public refrigerionocturno: Array<string>;
    public configuracionverificadores: Array<Sede>;
    public reminder: string;
    public modulomodified: boolean;
    public salariominimo: number;
}

export class Sede {
    constructor(_sede: string, _verificador: string) {
        this.nombre = _sede;
        this.verificadores = new Array<string>();
        this.verificadores.push(_verificador);
    }
    public nombre: string;
    public verificadores: Array<string>;
}