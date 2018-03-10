import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';
import { EconomicInformation } from '../models/data.model';

@Injectable()
export class DataEconomicInformation {
   
    
    public economicInformation: EconomicInformation;


    changeModel : boolean = false;
    headers: Headers;
    constructor(private _http: Http, private _constants: Constants) {       
        this.economicInformation = null;
    }

    ngOnInit() {
    }

    public GetEconomicInformation(user: string) {
        return this._http.get(this._constants.pathInformation + user)
        .map((informacionArchivo) => informacionArchivo.json())
    }
    
    public PutEconomicInformation() {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        console.log(this.economicInformation);
        let url = this._constants.pathInformation+this._constants.user;
        return this._http.put(url, this.economicInformation, {headers: this.headers});
    }
}