import { Component, OnInit } from '@angular/core';
import { ProcessConfiguration } from '../../common/models/configuration.model';
import { DataConfiguration } from '../../common/services/configuration.service';
import { DataInformation } from '../../common/services/basicInformation.service';
import { FacultyInformation } from '../../common/services/faculty.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  facultyList: any;
  userList: any;

  configurationLocal: ProcessConfiguration;
  modelFacultyInformation: {} = {};

  constructor(private _processConfiguration: ProcessConfiguration,
              private _dataConfiguration: DataConfiguration,
              private _dataInformation: DataInformation,
              private _facultyInformation: FacultyInformation) { }

  ngOnInit() {
    this.modelFacultyInformation = this._facultyInformation.facultyInformation;
                         
    this._dataInformation.GetAdminInformation()
      .subscribe(data => {
        this._dataInformation.MessageAdmin = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });                               
  }

  changeModel() {
    this._dataConfiguration.configuration = this.configurationLocal;
  }

  addFaculty(seleccion: string) {
    console.log("entra");
    console.log(seleccion);
  }

}
