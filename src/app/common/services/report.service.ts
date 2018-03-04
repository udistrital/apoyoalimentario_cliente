import { Injectable } from '@angular/core'
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';
import { Col, Report } from '../models/report.model';

@Injectable()
export class ReportService {

    headers: Headers;
   
    columna: Array<Col>;
    
    
   
    constructor(private _http: Http, 
                private _constants: Constants) {
                    
    }

    

    ngOnInit() {
    }

    public cual() {
        this.columna = new Array<Col>();
        this.columna.push(new Col(1,"Codigo de estudiante"));
        this.columna.push(new Col(2,"Fecha de inscripción"));
        this.columna.push(new Col(3,"Estrato socioeconomico"));
        this.columna.push(new Col(4,"Ingresos"));
        this.columna.push(new Col(5,"Sostiene a si mismo"));
        this.columna.push(new Col(6,"Sostiene el hogar"));
        this.columna.push(new Col(7,"Vive fuera de nuclo famliar"));
        this.columna.push(new Col(8,"Personas a cargo"));
        this.columna.push(new Col(9,"Paga arriendo"));
        this.columna.push(new Col(10,"Proviene fuera de Bogotá"));
        this.columna.push(new Col(11,"De donde proviene"));
        this.columna.push(new Col(12,"Pertenece a población especial"));
        this.columna.push(new Col(13,"Es discapacitado"));
        this.columna.push(new Col(14,"Patologia alimenticia"));
        this.columna.push(new Col(15,"Ser Pilo Paga"));
        this.columna.push(new Col(16,"Sisben"));
        this.columna.push(new Col(17,"Año de inscripción"));
        this.columna.push(new Col(18,"Semestre de inscripción"));
        this.columna.push(new Col(19,"Valor de matricula"));
        this.columna.push(new Col(20,"Tipo de subsidio"));
        this.columna.push(new Col(21,"Tipo de apoyo alimentario"));
        this.columna.push(new Col(22,"Telefono"));
        this.columna.push(new Col(23,"Correo electronico"));
        this.columna.push(new Col(24,"Antiguedad en el programa"));
        this.columna.push(new Col(25,"Nombre de estudiante"));
        this.columna.push(new Col(26,"Localidad"));
        this.columna.push(new Col(27,"DIrección"));
        this.columna.push(new Col(28,"Tipo de documento"));
        this.columna.push(new Col(29,"Numero de documentos"));
        this.columna.push(new Col(30,"Facultad"));
        this.columna.push(new Col(31,"Proyecto curricular"));
        this.columna.push(new Col(32,"Genero"));
        this.columna.push(new Col(33,"Semestre actual"));
        this.columna.push(new Col(34,"Promedio"));
    }


    public GenerateReport(report: Report) {
        console.log('change');
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathReport;
        return this._http.post(url, report, {headers: this.headers,responseType: ResponseContentType.Blob}).map((datad)=>new Blob([datad.blob()],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));;
    }
}


