export class MainInformation {
    constructor(
        public codigo: number,
        public fechainscripcion: string
    ) { }
}
export class EconomicInformation {
    constructor() { }
    public estrato: string;
    public ingresos: number;
    public sostenibilidadpropia: string;
    public sostenibilidadhogar: string;
    public nucleofamiliar: string;
    public personasacargo: string;
    public empleadoroarriendo: string;
    public provienefuerabogota: string;
    public ciudad: string;
    public poblacionespecial: string;
    public discapacidad: string;
    public patologiaalimenticia: string;
    public serpilopaga: string;
    public sisben: string;
    public periodo: number;
    public semestre: number;
    public matricula: number;
    public estadoprograma: number;
    public tiposubsidio: string;
    public tipoapoyo: string;
    public mensaje: string;
    public telefono: string;
    public correo: string;
    public antiguedad: string;
    public verificadopor: string;
}

// Administration
export class StudentData {
    constructor() { }
    public codigo: string;
    public ultimafechainscripcion: string;
    public nombre: string;
    public Informacioneconomica: EconomicInformation;
}