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

  configurationLocal: ProcessConfiguration;

  constructor(private _processConfiguration: ProcessConfiguration,
              private _dataConfiguration: DataConfiguration) { }

  ngOnInit() {
    this.facultyList = [{texto:"seleccione una sede",value:""},
                        {texto:"tecno",value:"tec"},
                        {texto:"ingenieria",value:"ing"},
                        {texto:"vivero",value:"viv"},
                        {texto:"macarena",value:"maca"},
                        {texto:"asab",value:"as"}];
  }

  changeModel() {
    this._dataConfiguration.configuration = this.configurationLocal;
  }

  addFaculty(seleccion: string) {
    console.log("entra");
    console.log(seleccion);
  }

}
