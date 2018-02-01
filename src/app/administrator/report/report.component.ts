import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataInformation } from '../../common/services/basicInformation.service';
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { Constants } from '../../common/constants/model.constants';
import { Router, Event, ChildActivationEnd} from '@angular/router';
import { FileService } from '../../common/services/file.service';
import { EconomicInformation } from '../../common/models/data.model';
import { FileDBData } from '../../common/models/file.model';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  selected :any;

  modelBasicInformation: {} = {};
  modelInstitutionalInformation: {} = {};
  fileDBInformation: FileDBData[];
  economicInformationLocal: EconomicInformation;
  pdf: string;
  SelectedArchive : boolean = false;

  constructor(private _constants: Constants,
              private _dataInformation: DataInformation,
              private _dataEconomicInformation: DataEconomicInformation,
              private _fileService: FileService,
              private _routerEvent: Router) { }
  ngOnInit() {
    this.CallServiceBasic();
  }

  ngOnDestroy() {
    this._constants.user = '';
    this._dataInformation.basicInformation = null;
    this._dataInformation.institutionalInformation = null;
    this._fileService._fileInfo = null;
    this._routerEvent.navigate(['/list']);
        this.SelectedArchive= false;
    this.pdf="";
  }

  //        Basic Information
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
      });
    }
    if (this._dataInformation.institutionalInformation == null){ 
      this._dataInformation.GetInstitutionalInformation()
      .subscribe(data2 => {
        if(data2.infoInstitucionalColleccion.infoInstitucional.length > 0) {
          this.modelInstitutionalInformation =  data2.infoInstitucionalColleccion.infoInstitucional[0];
          this._dataInformation.institutionalInformation = this.modelInstitutionalInformation;
          console.log(1);
          this.CallServiceEconomic();
        }
      },
      error => {
          console.log(error);
      });
    }       
  }

  //    Economic Information
  private CallServiceEconomic() { 
      this._dataEconomicInformation.GetEconomicInformation().subscribe(
        data => {
          this._dataEconomicInformation.economicInformation = data;
          this.economicInformationLocal = data;
          this.InitModelDocument();
          console.log(2);
          this.GetDocuments();
        },
        error => {
          console.log(error);
        });   
  }


  private InitModelDocument() {
    if (this._fileService._fileInfo == null) {
      //setTimeout(() => this._inscriptionComplete.waitService = false,0);
      if (this._dataInformation.basicInformation == null){
        this._dataInformation.basicInformation = { nombre: '' };
        this._dataInformation.institutionalInformation ={ proyecto: '' }; 
      }
    }
  }

  //    Documents
  private GetDocuments() {
    this._fileService.GetFiles().subscribe(
      data => {
        this._fileService._fileInfo = data;
        this.fileDBInformation = data;
        console.log(this.fileDBInformation);
        console.log(3);
      },
      error => {
        console.log(error);
      });
  }
  
  showPdf(url: string){
    // debugger;
    this.SelectedArchive = true;
    this.pdf = url;
  }

  select(item) {
        this.selected = item; 
  };

  isActive(item) {
        return this.selected === item;
  };
}