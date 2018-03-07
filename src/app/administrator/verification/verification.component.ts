import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataInformation } from '../../common/services/basicInformation.service';
import { DataEconomicInformation } from '../../common/services/economicInformation.service';
import { Constants } from '../../common/constants/model.constants';
import { Router, Event, ChildActivationEnd} from '@angular/router';
import { FileService } from '../../common/services/file.service';
import { EconomicInformation } from '../../common/models/data.model';
import { FileDBData } from '../../common/models/file.model';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';
import { StateService } from '../../common/services/status.service';
import { Information } from '../../common/services/information.service';
import { FacultyInformation } from '../../common/services/faculty.service';
import { BodyEmail } from '../../common/models/email.model';
import { EmailConfiguration } from '../../common/services/email.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  selected :any;
  contador: number;
  mensaje: string;

  emailtoSend: {ebody: string, etosend: string, ename: string} = {ebody: '', etosend: '', ename: ''};
  response: any;

  modelBasicInformation: {telefono: string, correo: string, nombre: string} = {telefono: '', correo: '', nombre: ''};
  modelInstitutionalInformation: {} = {};
  fileDBInformation: FileDBData[];
  economicInformationLocal: EconomicInformation;
  pdf: string;
  SelectedArchive : boolean = false;

  constructor(private _constants: Constants,
              private _dataInformation: DataInformation,
              private _dataEconomicInformation: DataEconomicInformation,
              private _fileService: FileService,
              private _routerEvent: Router,
              private _stateService: StateService,
              private _information: Information,
              private _facultyInformation: FacultyInformation,
              private _emailService: EmailConfiguration) {
    this.contador = 0;
  }

  ngOnInit() {
    this.CallServiceBasic();
  }

  ngOnDestroy() {
    this._constants.user = '';
    this._dataInformation.basicInformation = null;
    this._dataInformation.institutionalInformation = null;
    this._fileService._fileInfo = null;
    this.SelectedArchive= false;
    this.pdf="";
  }

  //        Basic Information
  private CallServiceBasic() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    if (this._dataInformation.basicInformation == null){ 
      this._dataInformation.GetBasicInformation()
      .subscribe(data => {
        if(data.datosCollection.datos.length > 0) {
          this.modelBasicInformation =  data.datosCollection.datos[0]; 
          this._dataInformation.basicInformation = this.modelBasicInformation;
          this.contador++;
          if(this.contador == 3) {
            setTimeout(() => this._facultyInformation.waitService = false,0);
            this.contador = 0;
          }           
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
          this.contador++;
          if(this.contador == 3) {
            setTimeout(() => this._facultyInformation.waitService = false,0);
            this.contador = 0;
          } 
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


  private InitModelDocument() {
    if (this._fileService._fileInfo == null) {
      //setTimeout(() => this._inscriptionComplete.waitService = false,0);
      if (this._dataInformation.basicInformation == null){
        this._dataInformation.basicInformation = {telefono: '', correo: '', nombre: '' };
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
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        } 
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

  //    CHange Student State to Verificated
  StudentComplete() {
    this._dataEconomicInformation.economicInformation.estadoprograma = 3;
    this._stateService.ChangeState().subscribe((data) => {
      this._information.dataInformationNew = null;
      this._information.dataInformationComplete = null;
      this._information.dataInformationIncomplete = null;
      this._routerEvent.navigate(['/list']);
    });
  }

  StudentIncomplete() {
    this.contador = 0;
    // console.log(e);
    /* NO ES FAKE */
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this.emailtoSend.ebody = this._dataEconomicInformation.economicInformation.mensaje;
    this.emailtoSend.ename = this.modelBasicInformation.nombre;
    /* ES FAKE */
    this.emailtoSend.etosend = 'davinci1996@live.com';


    this._emailService.SendEmail(this.emailtoSend).subscribe((data) => {
      this.response = data;
      this.contador++;
      if(this.contador == 2) {
        setTimeout(() => this._facultyInformation.waitService = false,0);
        this.contador = 0;
      }
      console.log(data);
    });



    this._dataEconomicInformation.economicInformation.estadoprograma = 4;
    this._stateService.ChangeState().subscribe((data) => {
      this._information.dataInformationNew = null;
      this._information.dataInformationComplete = null;
      this._information.dataInformationIncomplete = null;
      this.contador++;
      if(this.contador == 2) {
        setTimeout(() => this._facultyInformation.waitService = false,0);
        this.contador = 0;
      }
      this._routerEvent.navigate(['/list']);
    });
  }
}
