import { Component, OnInit } from '@angular/core';
import { Information } from '../../common/services/information.service';
import { Constants } from '../../common/constants/model.constants';
import { StudentData } from '../../common/models/data.model';
import { Report, Col } from '../../common/models/report.model';
import { ReportService } from '../../common/services/report.service';
import { FacultyInformation } from '../../common/services/faculty.service';
import { ContentType } from '@angular/http/src/enums';
import { UrlHandlingStrategy } from '@angular/router';
declare const $;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  modelFacultyInformation: {} = {};
  addedColumn: Array<string>;
  selectedColumn: number;
  facultySelected: string;
  response: any;

  report: Report = new Report();
  constructor(private _information: Information, private _constants: Constants, private _reportService: ReportService, private _facultyInformation: FacultyInformation) { 
    _reportService.cual();
    this.modelFacultyInformation = this._facultyInformation.facultyInformation;
    this.report.tsede = "";

  }

  ngOnInit() {
    this.addedColumn = new Array<string>();
  }

  saveColumn(deviceValue) {
    this.selectedColumn = parseInt(deviceValue.toString());
  }
  addColumn() {
    if(this.selectedColumn != null || this.selectedColumn != undefined) {
      if(this.report.columnas.indexOf(this.selectedColumn) == -1) {
        this.report.columnas.push(parseInt(this.selectedColumn.toString()));
        this.addedColumn.push(this._reportService.columna[this.selectedColumn-1].nombre);
      } 
    }
  }
  removeColumn() {
    if(this.selectedColumn != null) {
      if(this.report.columnas.indexOf(this.selectedColumn) != -1) {
        this.report.columnas.splice(this.report.columnas.indexOf(this.selectedColumn),1);
        if(this.addedColumn.indexOf(this._reportService.columna[this.selectedColumn -1 ].nombre) != -1) {
          this.addedColumn.splice(this.addedColumn.indexOf(this._reportService.columna[this.selectedColumn -1 ].nombre),1);
        }
      } 
    }
  }

  saveFaculty(deviceValue) {
    this.report.tsede = deviceValue.replace("/","-");
    console.log(this.report.tsede);
  }

  savenameSheet(deviceValue) {
    this.report.tsede.concat(deviceValue);
  }

  saveType(deviceValue) {
    this.report.typeReport = parseInt(deviceValue.toString());
  }

  send() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this._reportService.GenerateReport(this.report).subscribe(data => {

      this.exportData(data);
      setTimeout(() => this._facultyInformation.waitService = false,0);
    });
    
  }

  exportData(data) {
    let Blob = data;
    let a = document.createElement('a');
    a.href = URL.createObjectURL(Blob);
    a.download = this.report.nameSheet + '.xlsx';
    document.body.appendChild(a);
    a.click();
  }
  get mostrar(){
    return this.response;
  }
}
