/* Estructura que tiene el reporte a generar */
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

/* Estructura que contiene los campos de reporte con su respectivo codigo de identificación */
export class Col {
    constructor(_id: number, _nombre: string) {
        this.id = _id;
        this.nombre = _nombre;
    }
    public id: number;
    public nombre: string;
}