import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class DataInformation {
   
    basicInformation: {telefono: string, correo: string, nombre: string};
    institutionalInformation: {};
    
    constructor(private _http: Http, private _constants: Constants) {
        this.basicInformation = null;
        this.institutionalInformation = null;
        
    }

    ngOnInit() {
    }

    /* Obtiene la informacón básica del estudiante */
    public GetBasicInformation(user: string) {
        return this._http.get(this._constants.basicInformation + user)
        .map((res: Response) => res.json());
      
    }

    /* Obtiene la informacón institucional del estudiante */
    public GetInstitutionalInformation(user: string) {
        return this._http.get(this._constants.institutionalInformation + user)
        .map((res: Response) => res.json());
    }
}


