import { Component, OnInit, OnDestroy } from '@angular/core';
import { Information } from '../../common/services/information.service';
import { StudentData } from '../../common/models/data.model';
import { Constants } from '../../common/constants/model.constants';
import { Router, Event, ChildActivationEnd} from '@angular/router';
import { RolInformation } from '../../common/services/rolInformation.service';
import { userRol } from '../../common/models/userRol.model';

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
  
  dataInformationNewLocal: StudentData[];
  dataInformationCompleteLocal: StudentData[];
  dataInformationIncompleteLocal: StudentData[];
  rolUser: userRol;
  constructor(private _information: Information, private _constants: Constants, private _routerEvent: Router, private _rolInformation: RolInformation) { 
    this.contador = 0;
  }

  ngOnInit() {
    if(this._rolInformation.rolInfo == null) {
      setTimeout(() => this._rolInformation.waitService = true,0);
    this._rolInformation.GetRolInformation(this._constants.pathRol+this._constants.user).subscribe( data => {
      if (data != "not found") {
        this._rolInformation.rolInfo = data;
        this.rolUser = data;
        console.log(data);
        this.GetAllInfo();
      } else {
        this._routerEvent.navigate(['/login']);
      }
    }, error => {
      this._routerEvent.navigate(['/login']);
    });
    } else {
      this.rolUser = this._rolInformation.rolInfo;
      this.GetAllInfo();
  }
  }

  ngOnDestroy() {
    this.dataInformationNewLocal = null;
    this.dataInformationCompleteLocal = null;
    this.dataInformationIncompleteLocal = null;
  }
  

  GetAllInfo() {
    if(this._information.dataInformationNew == null) {
      setTimeout(() => this._rolInformation.waitService = true,0);
      console.log(this.rolUser.sede);
      console.log(this._rolInformation.rolInfo.sede);
      //    Solicitudes Nuevas
      this._information.GetInformation(this._constants.pathNew + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationNew = data;
        this.dataInformationNewLocal = this._information.dataInformationNew;
        console.log(data);
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });
      //    Solicitudes Aceptadas
      this._information.GetInformation(this._constants.pathComplete + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationComplete = data;
        this.dataInformationCompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });
      //    solicitude Rechazadas
      this._information.GetInformation(this._constants.pathIncomplete + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationIncomplete = data;
        this.dataInformationIncompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });
    } else {
      this.dataInformationNewLocal = this._information.dataInformationNew;
      this.dataInformationCompleteLocal =  this._information.dataInformationComplete;
      this.dataInformationIncompleteLocal =  this._information.dataInformationIncomplete;
      this._rolInformation.waitService = false;
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
    setTimeout(() => this._rolInformation.waitService = true,0);
    this._information.GetInformation(this._constants.pathNew + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationNew = data;
        this.dataInformationNewLocal = this._information.dataInformationNew;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });

    this._information.GetInformation(this._constants.pathComplete + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationComplete = data;
        this.dataInformationCompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });

      this._information.GetInformation(this._constants.pathIncomplete + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationIncomplete = data;
        this.dataInformationIncompleteLocal = data;
        this.contador++;
        if(this.contador == 3) {
          setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });
  }
}