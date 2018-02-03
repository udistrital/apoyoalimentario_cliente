import { Component, OnInit } from '@angular/core';
import { ProcessConfiguration } from '../../common/models/configuration.model';
import { DataConfiguration } from '../../common/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  facultyList: any;
  userList: any;

  configurationLocal: ProcessConfiguration;

  constructor(private _processConfiguration: ProcessConfiguration,
              private _dataConfiguration: DataConfiguration) { }

  ngOnInit() {
    this.facultyList = [{texto:"tecno",value:"tec"},
                        {texto:"ingenieria",value:"ing"},
                        {texto:"vivero",value:"viv"},
                        {texto:"macarena",value:"maca"},
                        {texto:"asab",value:"as"}];
    this.userList = [{texto:"usuario 1",value:"u1"},
                        {texto:"usuario 2",value:"u2"},
                        {texto:"usuario 3",value:"u3"},
                        {texto:"usuario 4",value:"u4"},
                        {texto:"usuario 5",value:"u5"}];                   
  }

  changeModel() {
    this._dataConfiguration.configuration = this.configurationLocal;
  }

  addFaculty(seleccion: string) {
    console.log("entra");
    console.log(seleccion);
  }

}
