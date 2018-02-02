import { Component, OnInit, OnDestroy } from '@angular/core';
import { Information } from '../../common/services/information.service';
import { StudentData } from '../../common/models/data.model';
import { Constants } from '../../common/constants/model.constants';
import { Router, Event, ChildActivationEnd} from '@angular/router';
import { RolInformation } from '../../common/services/rolInformation.service';
import { userRol } from '../../common/models/userRol.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {  

  key: string = 'Nombre';
  reverse: boolean = false;
  
  dataInformationLocal: StudentData[];
  countInformationLocal: number = 0;
  dataInformationViewedLocal: StudentData[];
  countInformationViewedLocal: number = 0;
  rolUser: userRol;
  constructor(private _information: Information, private _constants: Constants, private _routerEvent: Router, private _rolInformation: RolInformation) { 
   
  }

  ngOnInit() {

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
  }

  ngOnDestroy() {
    this.dataInformationLocal = null;
    this.dataInformationViewedLocal = null;
  }
  

  GetAllInfo() {
    if(this._information.dataInformation == null) {
      //setTimeout(() => this._constants.waitService = true,0);
      console.log(this.rolUser.sede);
      console.log(this._rolInformation.rolInfo.sede);
      // debugger;
      this._information.GetInformation(this._constants.pathName + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformation = data;
        this.dataInformationLocal = this._information.dataInformation;
        //this.countInformationLocal = this.dataInformationLocal.length;
      });

      this._information.GetInformation(this._constants.pathNameViewed + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationViewed = data;
        this.dataInformationViewedLocal = data;
        //this.countInformationViewedLocal = this.dataInformationViewedLocal.length;
      });
    }
    else{
      this.dataInformationLocal= this._information.dataInformation
      //this.countInformationLocal = this.dataInformationLocal.length;
      this.dataInformationViewedLocal =  this._information.dataInformationViewed;
      //this.countInformationViewedLocal = this.dataInformationViewedLocal.length;
    }
  }

  redirect(e: string) {
    //console.log(e);
    this._constants.user = e;
    this._routerEvent.navigate(['/report']);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  Reload() {
    this._information.GetInformation(this._constants.pathName + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformation = data;
        this.dataInformationLocal = this._information.dataInformation;
        //this.countInformationLocal = this.dataInformationLocal.length;
      });

    this._information.GetInformation(this._constants.pathNameViewed + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationViewed = data;
        this.dataInformationViewedLocal = data;
        //this.countInformationViewedLocal = this.dataInformationViewedLocal.length;
      });
  }
}