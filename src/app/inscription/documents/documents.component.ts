import { Component, OnInit } from '@angular/core';
import { FileService } from '../../common/services/file.service';
import { FileMainInformation, FileDBData } from '../../common/models/file.model';
import { InscriptionComplete } from '../../common/services/complete.service';
import { Router,Event, ChildActivationEnd } from '@angular/router';
import { StateService } from '../../common/services/status.service';
declare var jquery:any;
declare var $ :any;


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
  constructor(private _fileService: FileService, 
              private _inscriptionComplete: InscriptionComplete, 
              private _routerEvent: Router,
              private _stateService: StateService ) { 
    this.dataFromDB=[];

    if (!_inscriptionComplete.SaveSuscribeDoc){

      _routerEvent.events.subscribe(event => {
        if (event instanceof ChildActivationEnd) {          
          this.saveDocument(event);
        }
      });
      _inscriptionComplete.SaveSuscribeDoc = true;
  }

  this.stateLocal = this._stateService.State;
  }

  ngOnInit() {
    this._fileService.GetFiles().subscribe(
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

  upload(event: any,e :string) {
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
  
  public saveDocument(event: Event) {
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