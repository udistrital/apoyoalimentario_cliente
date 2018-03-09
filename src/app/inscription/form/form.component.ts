import { Component, OnInit } from '@angular/core';
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { EconomicInformation } from '../../common/models/data.model';
import { FileService } from '../../common/services/file.service';
import { InscriptionComplete } from '../../common/services/complete.service';
import { Router, Event, ChildActivationEnd} from '@angular/router'
import { map } from 'rxjs/operator/map';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../../common/services/status.service';
import { DataInformation } from '../../common/services/basicInformation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  show: boolean = true;
  closeResult: string;
  stateLocal:number;
  economicInformationLocal: EconomicInformation;
  modelBasicInformation: {telefono: string, correo: string, nombre: string} = {telefono: '', correo: '', nombre: ''};

  constructor(private _dataEconomicInformation: DataEconomicInformation,
       private _fileService: FileService, 
       private _stateService: StateService, 
       private _inscriptionComplete: InscriptionComplete,
       private _routerEvent: Router,
       private modalService: NgbModal,
       private _dataInformation: DataInformation ) { 

        
    this.modelBasicInformation = this._dataInformation.basicInformation;
    this.economicInformationLocal = this._dataEconomicInformation.economicInformation;
    this.stateLocal = this._stateService.State;
    if(this._stateService.State == 1) {
      this.economicInformationLocal.tipoapoyo = "A";
    }
    if (!_inscriptionComplete.SaveSuscribeForm){

        _routerEvent.events.subscribe(event => {
          if (event instanceof ChildActivationEnd) {            
            this.loadInfo(event);
          }
        });
        _inscriptionComplete.SaveSuscribeForm = true;
    }
  }



  ngOnInit() {
    this._inscriptionComplete.CountCompletedFields();
  }



  loadInfo(event: Event) {
    if (this._dataEconomicInformation.changeModel) { 
      setTimeout(() => this._inscriptionComplete.waitService = true, 0);
      this._dataEconomicInformation.changeModel = false;
      this._dataEconomicInformation.PutEconomicInformation().subscribe(data=>{
        console.log(this.economicInformationLocal);
        console.log(this._dataEconomicInformation.economicInformation);
        setTimeout(() => this._inscriptionComplete.waitService = false, 0)
      },
        error => {
          console.log(error);
          setTimeout(() => this._inscriptionComplete.waitService = false);
          this._routerEvent.navigate(['/login']);
        }
      );
  }
  
  }

  Transform() {
    switch(this.economicInformationLocal.ingresos) {
      case 1:
        return "1 SMLV o menos";
      case 2:
        return "Más de 1 y hasta 2 SMLV";
      case 3:
        return "Más de 2 y hasta 3 SMLV";
      case 4:
        return "Más de 3 y hasta 4 SMLV";
      case 5:
        return "4 SMLV o más";
    }
  }

  changeModel(){ 
    if(this.economicInformationLocal.correo == '') {
      this.economicInformationLocal.correo = this.modelBasicInformation.correo;
      this.economicInformationLocal.correo = this.economicInformationLocal.correo.toString();
    }
    if(this.economicInformationLocal.telefono == '') {
      this.economicInformationLocal.telefono = this.modelBasicInformation.telefono;
      this.economicInformationLocal.telefono = this.economicInformationLocal.telefono.toString();
    }
    this.economicInformationLocal.ingresos = parseInt(this.economicInformationLocal.ingresos.toString());
    this._dataEconomicInformation.economicInformation = this.economicInformationLocal;
    console.log(this._dataEconomicInformation.economicInformation);
    this._inscriptionComplete.CountCompletedFields();
    this._fileService.evaluateInformation(this._dataEconomicInformation.economicInformation)
    this._dataEconomicInformation.changeModel = true;
      //this.validateComplete(this.informacionEconomica);
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  permissionState() {
    this.show = false;
  }
}
