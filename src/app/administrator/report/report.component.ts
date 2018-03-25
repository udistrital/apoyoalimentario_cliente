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
    _reportService.GenerateFields();
    this.modelFacultyInformation = this._facultyInformation.facultyInformation;
    this.report.tsede = "";

  }

  ngOnInit() {
    this.addedColumn = new Array<string>();
  }

  /* Guardar columna seleccionada en variable */
  SaveColumn(deviceValue) {
    this.selectedColumn = parseInt(deviceValue.toString());
  }
  /* Agregar Columna al listado */
  AddColumn() {
    if(this.selectedColumn != null || this.selectedColumn != undefined) {
      if(this.report.columnas.indexOf(this.selectedColumn) == -1) {
        this.report.columnas.push(parseInt(this.selectedColumn.toString()));
        this.addedColumn.push(this._reportService.columna[this.selectedColumn-1].nombre);
      } 
    }
  }
  /* Quitar columna especifica del listado */
  RemoveColumn() {
    if(this.selectedColumn != null) {
      if(this.report.columnas.indexOf(this.selectedColumn) != -1) {
        this.report.columnas.splice(this.report.columnas.indexOf(this.selectedColumn),1);
        if(this.addedColumn.indexOf(this._reportService.columna[this.selectedColumn -1 ].nombre) != -1) {
          this.addedColumn.splice(this.addedColumn.indexOf(this._reportService.columna[this.selectedColumn -1 ].nombre),1);
        }
      } 
    }
  }
  /* Remover todas las columnas del listado */
  RemoveAll() {
    this.addedColumn.splice(0,this.addedColumn.length);
    this.report.columnas.splice(0,this.report.columnas.length);
  }

  /* Guardar Facultad en lista */
  SaveFaculty(deviceValue) {
    this.report.tsede = deviceValue.replace("/","-");
  }

  /* Guardar nombre de reporte en variable */
  SavenameSheet(deviceValue) {
    this.report.tsede.concat(deviceValue);
  }

  /* Guardar tipo de reporte en variable */
  SaveType(deviceValue) {
    this.report.typeReport = parseInt(deviceValue.toString());
  }

  /* Guardar semestre en variable */
  SaveSemester(deviceValue) {
    this.report.semestre = parseInt(deviceValue.toString());
  }

  /* Enviar petición de generación de reporte al CRUD_API */
  Send() {
    setTimeout(() => this._facultyInformation.waitService = true,0);
    this._reportService.GenerateReport(this.report).subscribe(data => {
      this.ExportData(data);
      setTimeout(() => this._facultyInformation.waitService = false,0);
    });
  }

  /* Recibe el .xlsx enviado por el CRUD_API y lo descarga */
  ExportData(data) {
    let Blob = data;
    let a = document.createElement('a');
    a.href = URL.createObjectURL(Blob);
    a.download = this.report.nameSheet + '.xlsx';
    document.body.appendChild(a);
    a.click();
  }
}
