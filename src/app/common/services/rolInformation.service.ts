import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { userRol } from '../models/userRol.model';
import 'rxjs/add/operator/map';

@Injectable()
export class RolInformation {
    
    waitService: boolean;
    rolInfo: userRol;
    constructor(private _http: Http, private _constants: Constants) {
        this.waitService = false;
    }

    public GetRolInformation(url: string) {
        return this._http.get(this._constants.pathRol+this._constants.user)
        .map((res: Response) => res.json());
    }

    onFail() {
        
    }
}

