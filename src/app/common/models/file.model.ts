/* Estructura que se muestra en el componente de adjunción de documentos */
export class FileMainInformation {
    constructor(

    ) { }
    public name: string;
    public type: string;
    public description: string;
    public filedb: string;
    public date: string;
    public size: number;
    public required: string;
    public help: string;
}

/* Estructrua que almacena los documentos traidos de BD */
export class FileDBData {
    constructor(

    ) { }
    public nombre: string;
    public longitud: number;
    public fecha: string;
    public codigo: string;
    public url: string;
}