import { Component, OnInit } from '@angular/core';
import { Router,Event, ChildActivationEnd } from '@angular/router';
/* Modelos */
import { Constants } from '../../common/constants/model.constants';
import { FileMainInformation, FileDBData } from '../../common/models/file.model';
/* Servicios */
import { FileService } from '../../common/services/file.service';
import { InscriptionComplete } from '../../common/services/complete.service';
import { StateService } from '../../common/services/status.service';
/* Variables jquey */
declare var $ :any;

/*Modelos:
  Constants: Contiene URL de servicios de la OAS y de Apoyoalimentaroi_CRUD_API
  FileMainInformation: Modelo usado para mostrar en el html los documentos del estudiante
  FileDBData: Modelo que almacena la información traida de base de datos respectiva a los documentos del estudiante

  Servicios:
  FileService: Servicio que trae la documentación adjuntada por el estudiante
  InscriptionComplete: Es un servicio que valida si la inscripción fue terminada en su totalidad y envia la información economica
  StateService: Servicio que consulta el estado del estudiante en el Sistema de Gestión Academica

  Variables jquery:
  $: variable para utilizar funciones de jquery*/

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  x: number;
  stateLocal:number;

  dataFromDB;
  fileInformationLocalComponent: FileMainInformation[];

  /* Variables para acceder a los atributos y metodos de los servicios */
  constructor(private _fileService: FileService, 
              private _inscriptionComplete: InscriptionComplete, 
              private _routerEvent: Router,
              private _stateService: StateService,
              private _constants: Constants) { 
    this.dataFromDB=[];

    if (!_inscriptionComplete.SaveSuscribeDoc){
      _routerEvent.events.subscribe(event => {
        if (event instanceof ChildActivationEnd) {          
          this.SaveDocument(event);
        }
      });
      _inscriptionComplete.SaveSuscribeDoc = true;
  }

  this.stateLocal = this._stateService.State;
  }

  ngOnInit() {
    this._fileService.GetFiles(this._constants.user).subscribe(
      data => {
        this._fileService._fileInfo = data;
        this.PaserFiles();
      },
      error => {
        console.log(error);
    });
    this.fileInformationLocalComponent = this._fileService.fileInformationLocal;

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  /* Actualiza el modelo de archivos que se va enviar a BD */
  private Upload(event: any,e :string) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) { 
      this._fileService.changeModel = true;
      let file: File = fileList[0];
      this._fileService.formDataFiles.append( e, file);
    }
    //carga dinamica nombre in model
    let _count : number = 0;
    this._fileService.fileInformationLocal.forEach((item) => { 
      _count++;
      if (item.name == e) {
        item.filedb = fileList[0].name; 
        this._fileService.fileInformationLocal[_count-1] = item;   
      }      
    });

    if(e != 'DocumentoAdicional') {
      this._inscriptionComplete.documentUploaded++;
      for(var i=0; i<=this.dataFromDB.length-1; i++) {
        if(this.dataFromDB[i].name == e) {
          this._inscriptionComplete.documentUploaded--;
        }
      }
    } 
    this._inscriptionComplete.CountDocumentUploaded();
  }
  
  /* Guarda los documentos en BD */
  private SaveDocument(event: Event) {
    if(this._fileService.formDataFiles != null && this._fileService.formDataFiles != undefined &&  this._fileService.changeModel) {
      setTimeout(() => this._inscriptionComplete.waitService = true, 0);
      this._fileService.changeModel = false;
      this._fileService.PotsFiles().subscribe(
        data => {
          this._fileService.formDataFiles = new FormData();
          setTimeout(() => this._inscriptionComplete.waitService = false, 0)
        },
        error => {
          setTimeout(() => this._inscriptionComplete.waitService = false);
          this._routerEvent.navigate(['/login']);
      });
    }
  }
  
  /* Reconoce si un documento adjuntado ya está en BD */
  private PaserFiles() {
    this._inscriptionComplete.selectorShowed = 0;
    this._inscriptionComplete.documentUploaded = 1;
    let _count : number = 0;
    this._fileService.fileInformationLocal.forEach((item) => { 
      _count++;
      let _result : FileDBData = this._fileService.FindName(item.name);
      if (item.required=="si"){
        this._inscriptionComplete.selectorShowed++;
      }
      if (_result != null && _result.nombre.length > 0) {
        item.size = _result.longitud;
        item.date = _result.fecha;
        item.filedb = 'Ya ha cargado un archivo';
        this.dataFromDB.push({name: item.filedb});
        if (item.required=="si"){
          this._inscriptionComplete.documentUploaded++;
        } 
      } else {
        item.size = 0;
        item.date = '';
        item.filedb = 'Seleccione un archivo';
      }
      this._fileService.fileInformationLocal[_count-1] = item;
    });
    this._inscriptionComplete.CountDocumentUploaded();
  } 
}