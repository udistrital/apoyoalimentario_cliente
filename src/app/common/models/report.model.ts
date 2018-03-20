export class Report {
    constructor () {
        this.columnas = new Array<number>();
    }
    public columnas: Array<number>;
    public tsede: string;
    public nameSheet: string;
    public typeReport: number;
    public periodo: number;
    public semestre: number;
}

export class Col {
    constructor(_id: number, _nombre: string) {
        this.id = _id;
        this.nombre = _nombre;
    }
    public id: number;
    public nombre: string;
}