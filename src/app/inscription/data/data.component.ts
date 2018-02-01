import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../common/constants/model.constants';
import { StateService } from '../../common/services/status.service';
import { DataInformation } from '../../common/services/basicInformation.service';
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { FileService } from '../../common/services/file.service';
import { Metadata } from '../../common/constants/metadata';
import { InscriptionComplete } from '../../common/services/complete.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  modelBasicInformation: {} = {};
  modelInstitutionalInformation: {} = {};

  constructor(private _constants: Constants,
              private _stateService: StateService, 
              private _dataInformation: DataInformation, 
              private _dataEconomicInformation: DataEconomicInformation, 
              private _fileService: FileService, 
              private _metadata: Metadata,
              private _inscriptionComplete: InscriptionComplete) {
  }

  ngOnInit() {
    if (this._stateService.State == null){
      console.log(this._inscriptionComplete.waitService);
      setTimeout(() => this._inscriptionComplete.waitService = true,0);
      console.log(this._inscriptionComplete.waitService);
      this._stateService.GetInformationState().subscribe(
        data => {
          this._stateService.State = data;
          if (this._stateService.State == 1 || this._stateService.State == 2  ) {
              this.CallServiceBasic();
              
          } else {
            this._stateService.onFail();
          } 
        },
        error => {
            console.log(error);
            this._stateService.onFail();
        }
        );
    }
    if (this._stateService.State == 1 || this._stateService.State == 2){
      this.modelBasicInformation = this._dataInformation.basicInformation;
      this.modelInstitutionalInformation = this._dataInformation.institutionalInformation;
    }
  }

  ngOnDestroy() {
    //this._stateService.State = null;
    // this._dataInformation.basicInformation = null;
    // this._dataInformation.institutionalInformation = null;
    // this._inscriptionComplete.waitService = null;
  }

  private CallServiceBasic() {
    if (this._dataInformation.basicInformation == null){ 
      this._dataInformation.GetBasicInformation()
      .subscribe(data => {
        if(data.datosCollection.datos.length > 0) {
          this.modelBasicInformation =  data.datosCollection.datos[0]; 
          this._dataInformation.basicInformation = this.modelBasicInformation;              
        } 
      },
      error => {
        console.log(error);
        this._stateService.onFail();
      });
    }
    if (this._dataInformation.institutionalInformation == null){ 
      this._dataInformation.GetInstitutionalInformation()
      .subscribe(data2 => {
        if(data2.infoInstitucionalColleccion.infoInstitucional.length > 0) {
          this.modelInstitutionalInformation =  data2.infoInstitucionalColleccion.infoInstitucional[0];
          this._dataInformation.institutionalInformation = this.modelInstitutionalInformation;
          this.CallServiceEconomic();
        }
      },
      error => {
          console.log(error);
          this._stateService.onFail();
      });
    }       
  }

  private CallServiceEconomic() {
    if (this._dataEconomicInformation.economicInformation == null){ 
      this._dataEconomicInformation.GetEconomicInformation().subscribe(
        data => {
          this._dataEconomicInformation.economicInformation = data;
          this.InitModelDocument();
          this._fileService.evaluateInformation(this._dataEconomicInformation.economicInformation);
        },
        error => {
          console.log(error);
          this._stateService.onFail();
        });   
    }
  }
  private InitModelDocument() {
    this._inscriptionComplete.CountCompletedFields();
    if (this._fileService.fileInformationLocal == null) {
      this._fileService.fileInformationLocal = JSON.parse(this._metadata.uploadDocuments);
      setTimeout(() => this._inscriptionComplete.waitService = false,0);
      console.log(this._inscriptionComplete.waitService);
      if (this._dataInformation.basicInformation == null){
        this._dataInformation.basicInformation = { nombre: '' };
        this._dataInformation.institutionalInformation ={proyecto:''};
        
      }     
  
    }
  }
}