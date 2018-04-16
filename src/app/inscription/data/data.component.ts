import { Component, OnInit } from '@angular/core';
/* Modelos */
import { Constants } from '../../common/constants/model.constants';
import { Metadata } from '../../common/constants/metadata';
import { EconomicInformation } from '../../common/models/data.model';
/* Servicios */
import { StateService } from '../../common/services/status.service';
import { DataInformation } from '../../common/services/basicInformation.service';
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { FileService } from '../../common/services/file.service';
import { InscriptionComplete } from '../../common/services/complete.service';

/*Modelos:
  Constants: Contiene URL de servicios de la OAS y de Apoyoalimentaroi_CRUD_API
  Metadata: Es una cadena de caracteres que modela la información respectiva de cada documento
  EconomicInformation: Es la estructura que se instancia para almacenar las respuestas dadas

  Servicios:
  StateService: Servicio que consulta el estado del estudiante en el Sistema de Gestión Academica
  DataInformation: Servicio que trae la información básica del estudiante
  DataEconomicInformation: Servicio que trae las respuestas del estudiante al formulario de inscripción
  FileService: Servicio que trae la documentación adjuntada por el estudiante
  InscriptionComplete: Es un servicio que valida si la inscripción fue terminada en su totalidad y envia la información economica */ 

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  modelBasicInformation: {telefono: string, correo: string, nombre: string} = {telefono: '', correo: '', nombre: ''};
  modelInstitutionalInformation: {} = {};
  modelEconomicInformation: {mensaje:string, estadoprograma: number} = {mensaje:'', estadoprograma: 0};
  mensajesplit: string[];

  /* Variables para acceder a los atributos y metodos de los servicios */
  constructor(private _constants: Constants,
              private _stateService: StateService, 
              private _dataInformation: DataInformation, 
              private _dataEconomicInformation: DataEconomicInformation, 
              private _fileService: FileService, 
              private _metadata: Metadata,
              private _inscriptionComplete: InscriptionComplete) {
                this.modelEconomicInformation.estadoprograma = 0;
  }

  ngOnInit() {
    if (this._dataInformation.basicInformation != null && this._dataInformation.institutionalInformation != null) {
      this.modelBasicInformation = this._dataInformation.basicInformation;
      this.modelInstitutionalInformation = this._dataInformation.institutionalInformation;
    }

    if (this._stateService.State == null) {
      setTimeout(() => this._inscriptionComplete.waitService = true,0);
      this._stateService.GetInformationState().subscribe(
        data => {
          this._stateService.State = data;
          this._constants.initialStatus = data;
          // Posibles estados del estudiante en el programa
          // 1: almuerzo por defecto
          // 2: puede escoger almuerzo o refrigerio 
          // 3: modificación por devolucion
          // -1: ya estan en proceso
          if (this._stateService.State == 1 || this._stateService.State == 2  || this._stateService.State == -1 || this._stateService.State == 3) {
            this.CallServiceBasic();
          } else {
            this._stateService.OnFail();
          } 
        },
        error => {
          /* Muestra el error retornado por el CRUD_API y no permite el acceso */
          console.log(error);
          this._stateService.OnFail();
        }
        );
    }
    if (this._stateService.State == 1 || this._stateService.State == 2) {
      this.modelBasicInformation = this._dataInformation.basicInformation;
      this.modelInstitutionalInformation = this._dataInformation.institutionalInformation;
    }
  }

  /* obtiene la información básica e institucional del estudiante */
  private CallServiceBasic() {
    if (this._dataInformation.basicInformation == null){ 
      this._dataInformation.GetBasicInformation(this._constants.user)
      .subscribe(data => {
        if(data.datosCollection.datos.length > 0) {
          this.modelBasicInformation =  data.datosCollection.datos[0]; 
          this._dataInformation.basicInformation = this.modelBasicInformation;              
        } 
      },
      error => {
        /* Muestra el error retornado por el CRUD_API y no permite el acceso */
        console.log(error);
        this._stateService.OnFail();
      });
    }
    if (this._dataInformation.institutionalInformation == null){ 
      this._dataInformation.GetInstitutionalInformation(this._constants.user)
      .subscribe(data2 => {
        if(data2.infoInstitucionalColleccion.infoInstitucional.length > 0) {
          this.modelInstitutionalInformation =  data2.infoInstitucionalColleccion.infoInstitucional[0];
          this._dataInformation.institutionalInformation = this.modelInstitutionalInformation;
          this.CallServiceEconomic();
        }
      },
      error => {
        /* Muestra el error retornado por el CRUD_API y no permite el acceso */
        console.log(error);
        this._stateService.OnFail();
      });
    }       
  }

  /* obtiene las respuestas del estudiante al formulario de inscripción */
  private CallServiceEconomic() {
    if (this._dataEconomicInformation.economicInformation == null){ 
      this._dataEconomicInformation.GetEconomicInformation(this._constants.user).subscribe(
        data => {
          this._dataEconomicInformation.economicInformation = data;
          this.modelEconomicInformation = data;
          this.mensajesplit = this.modelEconomicInformation.mensaje.split('\n');
          this.InitModelDocument();
          this._fileService.EvaluateInformation(this._dataEconomicInformation.economicInformation);
        },
        error => {
          /* Muestra el error y prohibe el acceso */
          console.log(error);
          this._stateService.OnFail();
        });   
    }
  }

  /* Inicializa un modelo vacion para los documentos que adjunte el estudiante */
  private InitModelDocument() {
    this._inscriptionComplete.CountCompletedFields();
    if (this._fileService.fileInformationLocal == null) {
      this._fileService.fileInformationLocal = JSON.parse(this._metadata.uploadDocuments);
      setTimeout(() => this._inscriptionComplete.waitService = false,0);
      if (this._dataInformation.basicInformation == null){
        this._dataInformation.basicInformation = {telefono: '',correo: '', nombre: ''};
        this._dataInformation.institutionalInformation ={proyecto:''};
      }  
      if (this.modelEconomicInformation == null){
        this.modelEconomicInformation = { mensaje: '' , estadoprograma: 0};
      }  
    }
  }
}