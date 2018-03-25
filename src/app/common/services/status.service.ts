import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { Router } from '@angular/router';
import { DataEconomicInformation } from '../services/economicInformation.service';
import 'rxjs/add/operator/map';
import { InscriptionComplete } from './complete.service';

@Injectable()
export class StateService {
   
    State: number;
    headers: Headers;
   
    constructor(private _http: Http, 
                private _constants: Constants, 
                private _inscriptionComplete: InscriptionComplete, 
                private _router: Router,
                private _dataEconomicInformation: DataEconomicInformation) {
        this.State = null;
    }

    ngOnInit() {
    }

    /*Obtiene el estado del estudiante 
        -2: Error de API
        -1: Esta en proceso    
        0: usuario inactivo o modulo inactivo
        1: Almuerzo
        2: Almuerzo y refrigerio
        3: Devuleto para correciones
        */
    public GetInformationState() {
        return this._http.get(this._constants.pathState + this._constants.user)
            .map((informacionArchivo) => informacionArchivo.json());     
    }

    /* Devulve al estudiante a interfaz de login */
    public OnFail() {
        setTimeout(() => this._inscriptionComplete.waitService = false);
        this._router.navigate(['/login']);
    }

    /* Cambia el estado del estudiante en el programa */
    public ChangeState() {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathVerification + this._constants.userTemp;
        return this._http.put(url, this._dataEconomicInformation.economicInformation, {headers: this.headers});
    }
}


