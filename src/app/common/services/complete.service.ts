import { Injectable } from '@angular/core'
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { DataEconomicInformation } from '../services/economicInformation.service';
import { FileService } from '../services/file.service';
import { EconomicInformation } from '../models/data.model';

@Injectable()
export class InscriptionComplete {
    waitService: boolean;
    SaveSuscribeForm: boolean = false;
    SaveSuscribeDoc: boolean = false;
    formComplete: boolean;
    documentsComplete: boolean;
    documentUploaded: number;
    selectorShowed: number;
    headers: Headers;

    constructor(private _http: Http, 
                private _constants : Constants, 
                private _dataEconomicInformation: DataEconomicInformation, 
                private _fileService: FileService){
        this.waitService= false;
        this.formComplete = false;
        this.documentsComplete = false;
        this.documentUploaded = 0;
        this.selectorShowed = 0;
    }

    ngOnInit() {
        
    }

    /* Cuenta los campos respondidos del formulario
        Si estan respondido en totalidad el sistema lo sabrá */
    public CountCompletedFields() {      
        if (this._dataEconomicInformation.economicInformation.antiguedad != ''
        && this._dataEconomicInformation.economicInformation.estrato != ''
        && this._dataEconomicInformation.economicInformation.tipoapoyo != ''
        && this._dataEconomicInformation.economicInformation.ingresos != null
        && this._dataEconomicInformation.economicInformation.sostenibilidadpropia != ''
        && this._dataEconomicInformation.economicInformation.sostenibilidadhogar != ''
        && this._dataEconomicInformation.economicInformation.nucleofamiliar != ''
        && this._dataEconomicInformation.economicInformation.personasacargo != ''
        && this._dataEconomicInformation.economicInformation.empleadoroarriendo != ''
        && this._dataEconomicInformation.economicInformation.provienefuerabogota != ''
        && this._dataEconomicInformation.economicInformation.poblacionespecial != ''
        && this._dataEconomicInformation.economicInformation.discapacidad != ''
        && this._dataEconomicInformation.economicInformation.patologiaalimenticia != ''
        && this._dataEconomicInformation.economicInformation.serpilopaga != ''
        && this._dataEconomicInformation.economicInformation.sisben != '') {
            if (this._dataEconomicInformation.economicInformation.provienefuerabogota == 'si' && this._dataEconomicInformation.economicInformation.ciudad != '') {
                this.formComplete = true;
            } else if (this._dataEconomicInformation.economicInformation.provienefuerabogota == 'no') {
                this.formComplete = true;
            } else {
                this.formComplete = false;
            }
        } else {
            this.formComplete = false;
        }
    }

    /* Cuenta los documentos adjuntados si, se llena en totalidad el sistema lo sabe */
    public CountDocumentUploaded() {
        if (this.selectorShowed <= this.documentUploaded) {
            this.documentsComplete = true;
        } else {
            this.documentsComplete = false;
        }
    }

    /* Inserta la información economica del estudiante en BD (Respuestas del formulario) */
    public PutValidationInscription() {
        this.headers= new Headers;
        this.headers.append('Content-Type', 'application/json');
        let url = this._constants.pathState + this._constants.user;
        return this._http.put(url, this._dataEconomicInformation.economicInformation , {headers: this.headers});
    }
}