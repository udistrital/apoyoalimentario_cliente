import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';
import { ProcessConfiguration } from '../models/configuration.model';
import { Email, BodyEmail } from '../models/email.model';

@Injectable()
export class EmailConfiguration {
   
    public email: Email;
    public bodyEmail: BodyEmail;
    public i: number;

    headers: Headers;
    constructor(private _http: Http, private _constants: Constants) {       

    }

    ngOnInit() {
    }
    
    /* Guarda la configuración de correo electronico establecida por el administrador */
    public PutConfiguration(_email: Email, _url: string) {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        _email.text = _email.text.replace('\n','<br>');
        return this._http.put(_url, _email, {headers: this.headers});
    }

    /* Obtiene la configuración de correo electronio */
    public GetAdminInformation() {
        return this._http.get(this._constants.pathEmailConfiguration)
            .map((res: Response) => res.json());
    }
    
    /* Enviar correo electrónico al estudiante */
    public SendEmail(_bodyemail: BodyEmail) {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathSendEmail;
        _bodyemail.ebody =_bodyemail.ebody.replace('\n','<br>');
        return this._http.put(url, _bodyemail, {headers: this.headers});
    }
}