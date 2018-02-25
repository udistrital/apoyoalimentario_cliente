import { Component, OnInit, OnDestroy } from '@angular/core';
import { Information } from '../../common/services/information.service';
import { StudentData } from '../../common/models/data.model';
import { Constants } from '../../common/constants/model.constants';
import { Router, Event, ChildActivationEnd} from '@angular/router';
import { FacultyInformation } from '../../common/services/faculty.service';

declare var jquery:any;
declare var $ :any;
declare var shield: any;
declare function unescape(s:string): string;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {  

  key: string = 'Nombre';
  reverse: boolean = false;
  contador: number;


  modelFacultyInformation:string[];
  
  dataInformationNewLocal: StudentData[];
  dataInformationCompleteLocal: StudentData[];
  dataInformationIncompleteLocal: StudentData[];
  facultySelected: string;
  constructor(private _information: Information, 
              private _constants: Constants, 
              private _routerEvent: Router, 
              private _facultyInformation: FacultyInformation) { 
    this.contador = 0;
    this.facultySelected = this._facultyInformation.facultySelected;
    this.CallServiceFaculty();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.dataInformationNewLocal = null;
    this.dataInformationCompleteLocal = null;
    this.dataInformationIncompleteLocal = null;
  }

  selectFaculty(faculty: string) {
    // faculty.replace('/','-');
    console.log(faculty);
    this.facultySelected = faculty.replace('/','-');
    this._facultyInformation.facultySelected = faculty.replace('/','-');
    this.Initialize();
  }
  

  Initialize() {
    if(this._facultyInformation.facultySelected != null) {
      this.GetAllInfo();
    } else {
      this._routerEvent.navigate(['/login']);
    }
  }

  GetAllInfo() {
    if(this._information.dataInformationNew == null) {
      setTimeout(() => this._facultyInformation.waitService = true,0);
      //    Solicitudes Nuevas
      this._information.GetInformation(this._constants.pathNew + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationNew = data;
        this.dataInformationNewLocal = this._information.dataInformationNew;
        console.log(data);
        this.contador++;
       
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });
      //    Solicitudes Aceptadas
      this._information.GetInformation(this._constants.pathComplete + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationComplete = data;
        this.dataInformationCompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });
      //    solicitude Rechazadas
      this._information.GetInformation(this._constants.pathIncomplete + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationIncomplete = data;
        this.dataInformationIncompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });
    } else {
      this.dataInformationNewLocal = this._information.dataInformationNew;
      this.dataInformationCompleteLocal =  this._information.dataInformationComplete;
      this.dataInformationIncompleteLocal =  this._information.dataInformationIncomplete;
      this._facultyInformation.waitService = false;
    }
  }

  redirect(e: string) {
    this._constants.user = e;
    this._routerEvent.navigate(['/verification']);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }






  Reload() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this._information.GetInformation(this._constants.pathNew + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationNew = data;
        this.dataInformationNewLocal = this._information.dataInformationNew;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });

    this._information.GetInformation(this._constants.pathComplete + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationComplete = data;
        this.dataInformationCompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });

      this._information.GetInformation(this._constants.pathIncomplete + this.facultySelected)
      .subscribe(data => {
        this._information.dataInformationIncomplete = data;
        this.dataInformationIncompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._facultyInformation.waitService = false,0);
          this.contador = 0;
        }
      });
  }


  

  private CallServiceFaculty() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    if (this._facultyInformation.facultyInformation == null){ 
      this._facultyInformation.GetFacultyInformation()
      .subscribe(data => {
        if(data.infoFacultadesColleccion.infoFacultades.length > 0) {
          this._facultyInformation.facultyInformation = data.infoFacultadesColleccion.infoFacultades;   
          this.modelFacultyInformation = data.infoFacultadesColleccion.infoFacultades;
          setTimeout(() => this._facultyInformation.waitService = false,0);
        } 
      },
      error => {
        console.log(error);
      });
    }  else {
      setTimeout(() => this._facultyInformation.waitService = false,0);
      this.GetAllInfo();
    }   
  }
}