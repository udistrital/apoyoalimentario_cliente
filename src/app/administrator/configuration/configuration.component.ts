import { Component, OnInit } from '@angular/core';
import { ProcessConfiguration, Sede } from '../../common/models/configuration.model';
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
  configuracionVerificadores: Sede;
  modelFacultyInformation: {} = {};
  facultySelected: string;
  verifierSelected: string;
  findFaculty: boolean;
  findVerifier: boolean;
  i: number;
  j: number;

  verificadores: Array<string> = ["Verificador 1",
                                  "Verificador 2",
                                  "Verificador 3",
                                  "Verificador 4",
                                  "Verificador 5",
                                  "Verificador 6",
                                  "Verificador 7",
                                  "Verificador 8",
                                  "Verificador 9",
                                  "Verificador 10"];

  constructor(private _processConfiguration: ProcessConfiguration,
              private _dataConfiguration: DataConfiguration,
              private _dataInformation: DataInformation,
              private _facultyInformation: FacultyInformation) { 
              }

  ngOnInit() {
    this.modelFacultyInformation = this._facultyInformation.facultyInformation;
    this.configurationLocal = this._dataConfiguration.configuration;
  }

  /*      AGREGAR Y ELIMINAR SEDES DE REFRIGERIO NOCTURNO */

  saveFaculty(deviceValue) {
    if(deviceValue == "FACULTAD DE TECNOLOGIA - POLITECNICA / TECNOLOGICA") {
      deviceValue = "FACULTAD DE TECNOLOGIA - POLITECNICA - TECNOLOGICA";
    }
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

  /*      AGREGAR O ELIMNAR VERIFICADORES DE SEDES    */

  saveVerifier(deviceValue) {
    this.verifierSelected = deviceValue;
  }

  // addVerifier() {
  //   if(this.facultySelected != "" && this.verifierSelected != "") {
  //     if(this.configurationLocal.configuracionverificadores == undefined || this.configurationLocal.configuracionverificadores == null) {
  //       this.configurationLocal.configuracionverificadores = new Array<Sede>();
  //     }
  //     if(this.configurationLocal.configuracionverificadores.length == 0) {
  //       this.configuracionVerificadores = new Sede(this.facultySelected, this.verifierSelected);
  //       this.configurationLocal.configuracionverificadores.push(this.configuracionVerificadores);
  //       console.log(this.configurationLocal.configuracionverificadores);
  //     } else {
  //       for(this.i = 0; this.i < this.configurationLocal.configuracionverificadores.length; this.i++) {
  //         if(this.configurationLocal.configuracionverificadores[this.i].nombre == this.facultySelected) {
  //           this.findFaculty = true;
  //           if (this.findFaculty) {
  //             console.log("Encontró la facultad");
  //             for(this.j = 0; this.j < this.configurationLocal.configuracionverificadores[this.i].verificadores.length; this.j++) {
  //               if(this.configurationLocal.configuracionverificadores[this.i].verificadores[this.j] == this.verifierSelected) {
  //                 console.log("Encontró al verificador");
  //                 this.findVerifier = true;
  //                 break;
  //               } else {
  //                 this.findVerifier = false;
  //                 this.configurationLocal.configuracionverificadores[this.i].verificadores.push(this.verifierSelected);
  //               }
  //             }
  //             console.log(this.configurationLocal.configuracionverificadores);
  //           }
  //           break;
  //         } else {
  //           this.findFaculty = false;
  //         }
  //       }
  //       if(!this.findFaculty) {
  //         this.configuracionVerificadores = new Sede(this.facultySelected, this.verifierSelected);
  //         this.configurationLocal.configuracionverificadores.push(this.configuracionVerificadores);
  //         console.log(this.configurationLocal.configuracionverificadores);
  //       }
  //     }
  //   }
  // }

  // removeVerifier() {
  //   if(this.facultySelected != "" && this.verifierSelected != "") {
  //     if(this.configurationLocal.configuracionverificadores !== undefined || this.configurationLocal.configuracionverificadores !== null) {
  //       for(this.i = 0; this.i < this.configurationLocal.configuracionverificadores.length; this.i++) {
  //         if(this.configurationLocal.configuracionverificadores[this.i].nombre == this.facultySelected) {
  //           this.findFaculty = true;
  //           if (this.findFaculty) {
  //             if(this.configurationLocal.configuracionverificadores[this.i].verificadores.indexOf(this.verifierSelected) > -1) {
  //               this.configurationLocal.configuracionverificadores[this.i].verificadores.splice(this.configurationLocal.configuracionverificadores[this.i].verificadores.indexOf(this.verifierSelected),1);
  //             }
  //             console.log(this.configurationLocal.configuracionverificadores);
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }


  /*   RECORDTAORIO   */
  getDate(deviceValue){
    console.log(deviceValue);
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