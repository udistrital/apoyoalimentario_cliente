import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { InscriptionComplete } from './complete.service';

@Injectable()
export class StateService {
   
    State: number;
   
    constructor(private _http: Http, private _constants: Constants, private _inscriptionComplete: InscriptionComplete, private _router: Router) {
        this.State = null;
    }

    ngOnInit() {
    }

    public GetInformationState() {
        return this._http.get(this._constants.pathState + this._constants.user)
            .map((informacionArchivo) => informacionArchivo.json());     
    }
    public onFail() {
        setTimeout(() => this._inscriptionComplete.waitService = false);
        this._router.navigate(['/login']);
    }
}


