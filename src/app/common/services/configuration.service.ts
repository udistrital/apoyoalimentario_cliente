import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';
import { ProcessConfiguration, Sede } from '../models/configuration.model';

@Injectable()
export class DataConfiguration {
   
    public configuration: ProcessConfiguration;
    public sede: Sede;
    MessageAdmin: {menssageestudiantes: string} = {menssageestudiantes: ''};

    changeModel : boolean = false;
    headers: Headers;
    constructor(private _http: Http, private _constants: Constants) {       
        this.configuration = null;
        this.MessageAdmin = null;
    }

    ngOnInit() {
    }
    
    /* Configuración de modlulo de inscripción */
    public PutConfiguration() {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathConfiguration;
        return this._http.put(url, this.configuration, {headers: this.headers});
    }

    /* Obtiene la configuración del módulo de inscripción */
    public GetAdminInformation() {
        return this._http.get(this._constants.pathConfiguration)
            .map((res: Response) => res.json());
    }

    /* Obtiene las sedes y los verificadores a los que estan asociados */
    public GetVerifier() {
        return this._http.get(this._constants.pathVerifier)
            .map((res: Response) => res.json());
    }

    /* Obtiene las sedes a la que un verificador puede acceder */
    public GetFaculty() {
        return this._http.get(this._constants.pathVerifier+this._constants.user)
            .map((res: Response) => res.json());
    }

    /* Asocia verificadores a las sedes */
    public PutVerifier(verificadores: ProcessConfiguration) {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathVerifier;
        return this._http.put(url, verificadores.configuracionverificadores, {headers: this.headers});
    }

    
}