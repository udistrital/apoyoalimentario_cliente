import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';
import { ProcessConfiguration } from '../models/configuration.model';

@Injectable()
export class DataConfiguration {
   
    
    public configuration: ProcessConfiguration;


    changeModel : boolean = false;
    headers: Headers;
    constructor(private _http: Http, private _constants: Constants) {       
        this.configuration = null;
    }

    ngOnInit() {
    }
    
    public PutEconomicInformation() {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = '';
        return this._http.put(url, this.configuration, {headers: this.headers});
    }

    
}