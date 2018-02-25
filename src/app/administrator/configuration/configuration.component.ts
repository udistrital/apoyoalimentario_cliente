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

  configurationLocal: ProcessConfiguration;
  modelFacultyInformation: {} = {};
  facultySelected: string;

  constructor(private _processConfiguration: ProcessConfiguration,
              private _dataConfiguration: DataConfiguration,
              private _dataInformation: DataInformation,
              private _facultyInformation: FacultyInformation) { }

  ngOnInit() {
    this.modelFacultyInformation = this._facultyInformation.facultyInformation;
    this.configurationLocal = this._dataConfiguration.configuration;
  }

  saveFaculty(deviceValue) {
    this.facultySelected = deviceValue;
  }

  addFaculty() {
    if(this.facultySelected != "") {
      if(this.configurationLocal.refrigerionocturno.indexOf(this.facultySelected) == -1 && this.facultySelected != undefined) {
        this.configurationLocal.refrigerionocturno.push(this.facultySelected);
      }
    }
  }

  removeFaculty() {
    if(this.facultySelected != "") {
      if(this.configurationLocal.refrigerionocturno.indexOf(this.facultySelected) > -1 && this.facultySelected != undefined) {
        this.configurationLocal.refrigerionocturno.splice(this.configurationLocal.refrigerionocturno.indexOf(this.facultySelected),1);
      }
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  putConfiguration() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this._dataConfiguration.configuration = this.configurationLocal;
    this._dataConfiguration.PutConfiguration()
      .subscribe((datad)=>{
              setTimeout(() => this._facultyInformation.waitService = false,0);
          });
  }
}