import { Component, OnInit } from '@angular/core';
import { Information } from '../../common/services/information.service';
import { Constants } from '../../common/constants/model.constants';
import { userRol } from '../../common/models/userRol.model';
import { StudentData } from '../../common/models/data.model';
declare const $;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  rolUser: userRol;
  contador: number;
  template: string;

  dataInformationNewLocal: StudentData[];

  constructor(private _information: Information, private _constants: Constants) { }

  ngOnInit() {
    this.llamar();
  }

  llamar() {
    if(this._information.dataInformationNew == null) {
      //setTimeout(() => this._rolInformation.waitService = true,0);
      // console.log(this.rolUser.sede);
      // console.log(this._rolInformation.rolInfo.sede);
      //    Solicitudes Nuevas
      this._information.GetInformation(this._constants.pathNew + this.rolUser.sede)
      .subscribe(data => {
        this._information.dataInformationNew = data;
        this.dataInformationNewLocal = this._information.dataInformationNew;
        console.log(data);
        this.contador++;
        if(this.contador == 3) {
          //setTimeout(() => this._rolInformation.waitService = false,0);
          this.contador = 0;
        }
      });
    } else {
      this.dataInformationNewLocal = this._information.dataInformationNew;
      //this._rolInformation.waitService = false;
    }
  }
}
