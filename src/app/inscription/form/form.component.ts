import { Component, OnInit } from '@angular/core';
import { Router, Event, ChildActivationEnd} from '@angular/router';
/* Estilos */
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
/* Modelos */
import { EconomicInformation } from '../../common/models/data.model';
/* Servicios */
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { FileService } from '../../common/services/file.service';
import { InscriptionComplete } from '../../common/services/complete.service';
import { StateService } from '../../common/services/status.service';
import { DataInformation } from '../../common/services/basicInformation.service';
/* Formularios */ 
import { NG_VALIDATORS } from '@angular/forms';

/*Estilos:
  NgbModal, ModalDismissReasons: Clases de bootstrap para gestionar los modales de ayuda

  Modelos:
  EconomicInformation: Es la estructura que se instancia para almacenar las respuestas dadas

  Servicios:
  DataEconomicInformation: Servicio que trae las respuestas del estudiante al formulario de inscripción
  FileService: Servicio que trae la documentación adjuntada por el estudiante
  InscriptionComplete: Es un servicio que valida si la inscripción fue terminada en su totalidad y envia la información economica
  StateService: Servicio que consulta el estado del estudiante en el Sistema de Gestión Academica
  DataInformation: Servicio que trae la información básica del estudiante */

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

  /* Variables para acceder a los atributos y metodos de los servicios */
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
    if (!_inscriptionComplete.SaveSuscribeForm) {
      _routerEvent.events.subscribe(event => {
        if (event instanceof ChildActivationEnd) {            
          this.LoadInfo(event);
        }
      });
      _inscriptionComplete.SaveSuscribeForm = true;
    }
  }

  ngOnInit() {
    this._inscriptionComplete.CountCompletedFields();
  }

  /* Envia los cambios si se realizaron cambios en las respuestas del formulario */
  private LoadInfo(event: Event) {
    if (this._dataEconomicInformation.changeModel) { 
      setTimeout(() => this._inscriptionComplete.waitService = true, 0);
      this._dataEconomicInformation.changeModel = false;
      this._dataEconomicInformation.PutEconomicInformation().subscribe(data => {
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

  /* Modifica los datos que vienen de DB para los estudiantes inscritos */
  private TransformPopulation() {
    switch(this.economicInformationLocal.poblacionespecial) {
      case "N":
        return "Ninguna";
      case "D":
        return "Desplazados";
      case "I":
        return "Indigena";
      case "M":
        return "Minorias Etnicas";
      case "A":
        return "Afrodescendientes";
      case "MC":
        return "Madre Cabeza de Hogar"
    }
  }

  /* Modifica el modelo que se va enviar a BD
     Cuenta los campos completados
     Vuelve obligatorios los documentos que correspondan a las respuestas de Si */
  private ChangeModel(){ 
    if(this.economicInformationLocal.correo == '') {
      this.economicInformationLocal.correo = this.modelBasicInformation.correo;
      this.economicInformationLocal.correo = this.economicInformationLocal.correo.toString();
    }
    if(this.economicInformationLocal.telefono == '') {
      this.economicInformationLocal.telefono = this.modelBasicInformation.telefono;
      this.economicInformationLocal.telefono = this.economicInformationLocal.telefono.toString();
    }
    if (this.economicInformationLocal.ingresos < 100000) {
      this.economicInformationLocal.ingresos = null;
    } else {
      this.economicInformationLocal.ingresos = parseInt(this.economicInformationLocal.ingresos.toString());
    }
    if (this.economicInformationLocal.provienefuerabogota == 'no') {
      this.economicInformationLocal.ciudad = '';
    }
    this._dataEconomicInformation.economicInformation = this.economicInformationLocal;
    this._inscriptionComplete.CountCompletedFields();
    this._fileService.EvaluateInformation(this._dataEconomicInformation.economicInformation)
    this._dataEconomicInformation.changeModel = true;
  }

  /* Abre el modal */
  private open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.GetDismissReason(reason)}`;
    });
  }

  /* Cierra el modal */
  private GetDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
