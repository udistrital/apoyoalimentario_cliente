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
  contador: number = 0;
  mensaje: string[];
  i: number;

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
  }

  ngOnInit() {
    this.CallServiceBasic();
  }

  ngOnDestroy() {
    this._dataInformation.basicInformation = null;
    this._dataInformation.institutionalInformation = null;
    this._fileService._fileInfo = null;
    this.SelectedArchive= false;
    this.pdf="";
  }

  // Obtiene la informacón básica e institucional del estudiante
  private CallServiceBasic() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    if (this._dataInformation.basicInformation == null){ 
      this._dataInformation.GetBasicInformation(this._constants.userTemp)
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
      this._dataInformation.GetInstitutionalInformation(this._constants.userTemp)
      .subscribe(data2 => {
        if(data2.infoInstitucionalColleccion.infoInstitucional.length > 0) {
          this.modelInstitutionalInformation =  data2.infoInstitucionalColleccion.infoInstitucional[0];
          this._dataInformation.institutionalInformation = this.modelInstitutionalInformation;
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

  // Obtiene la información economica del estudiante (Respuestas del formulario)
  private CallServiceEconomic() { 
    this._dataEconomicInformation.GetEconomicInformation(this._constants.userTemp).subscribe(
      data => {
        this._dataEconomicInformation.economicInformation = data;
        this.economicInformationLocal = data;
        this.mensaje = this.economicInformationLocal.mensaje.split('\n');
        this.InitModelDocument();
        this.GetDocuments();
      },
      error => {
        console.log(error);
    });   
  }

  /* Transforma la información obtenida de base de datos referente a poblacón especial */
  Transform() {
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

  /* transforma la información obtenida de base de datos referente Razones de devolucón */
  Transform2() {
    switch(this.economicInformationLocal.tiposubsidio) {
      case "ss":
        return "Sin subsidio";
      case "a":
        return "Tipo A";
      case "b":
        return "Tipo B";
      case "t":
        return "Subsidio total";
    }
  }

  /* transforma la informacion obtenida de base de datos referente a quien verificó  */
  Transform3() {
    if(this.economicInformationLocal.verificadopor == 'A') 
      return "Administrador";
    else
      return this.economicInformationLocal.verificadopor;
  }

  /* Inicializa el modelo donde se guardan los documentos adjuntados por el estudiante */
  private InitModelDocument() {
    if (this._fileService._fileInfo == null) {
      if (this._dataInformation.basicInformation == null){
        this._dataInformation.basicInformation = {telefono: '', correo: '', nombre: '' };
        this._dataInformation.institutionalInformation ={ proyecto: '' }; 
      }
    }
  }

  // Obtiene los documentos adjuntados por el estudiante
  private GetDocuments() {
    this._fileService.GetFiles(this._constants.userTemp).subscribe(
      data => {
        this._fileService._fileInfo = data;
        this.fileDBInformation = data;
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
  
  /* Muestra el documento seleccionado por el usuario */
  ShowPdf(url: string){
    this.SelectedArchive = true;
    this.pdf = url;
  }

  /* Selecciona el archivo que se debe mostrar */
  Select(item) {
        this.selected = item; 
  };

  /* Establece la clase active en documento seleccionado */
  IsActive(item) {
        return this.selected === item;
  };

  /* Actualiza el estado de un estudiante verificado correctamente */
  StudentComplete() {
    this._dataEconomicInformation.economicInformation.estadoprograma = 3;
    this._dataEconomicInformation.economicInformation.verificadopor = this._constants.user;
    this._stateService.ChangeState().subscribe((data) => {
      this._information.dataInformationNew = null;
      this._information.dataInformationComplete = null;
      this._information.dataInformationIncomplete = null;
      this._routerEvent.navigate(['/list']);
    });
  }

  /* Actualiza el estado de un estudiante verificado incorrectamente */
  StudentIncomplete() {
    this.contador = 0;
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this.emailtoSend.ebody = this._dataEconomicInformation.economicInformation.mensaje;
    this.emailtoSend.ename = this.modelBasicInformation.nombre;
    // Aqui se inserta el correo electronico del estudiante (this.modelBasicInformation.correo;)
    this.emailtoSend.etosend = 'davinci1996@live.com';


    this._emailService.SendEmail(this.emailtoSend).subscribe((data) => {
      this.response = data;
      this.contador++;
      if(this.contador == 2) {
        setTimeout(() => this._facultyInformation.waitService = false,0);
        this.contador = 0;
      }
    });

    this._dataEconomicInformation.economicInformation.estadoprograma = 4;
    this._dataEconomicInformation.economicInformation.verificadopor = this._constants.user;
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