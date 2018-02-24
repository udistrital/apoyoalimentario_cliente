import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class DataInformation {
   
    basicInformation: {};
    institutionalInformation: {};
    
    constructor(private _http: Http, private _constants: Constants) {
        this.basicInformation = null;
        this.institutionalInformation = null;
        
    }

    ngOnInit() {
    }

    public GetBasicInformation() {
        return this._http.get(this._constants.basicInformation+this._constants.user)
        .map((res: Response) => res.json());
      
    }

    public GetInstitutionalInformation() {
        return this._http.get(this._constants.institutionalInformation +this._constants.user)
        .map((res: Response) => res.json());
    }
}


