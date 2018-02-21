import { Component, OnInit} from '@angular/core';
import { DataEconomicInformation } from './common/services/economicInformation.service';
import { Constants } from './common/constants/model.constants';
import { FileService } from './common/services/file.service';
import { InscriptionComplete } from './common/services/complete.service';
import { Router } from '@angular/router';
import {AccordionModule} from "ng2-accordion";
import { DataInformation } from './common/services/basicInformation.service';
import { RolInformation } from './common/services/rolInformation.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selected :any; 

  contador = 1;

  menu: number;
  title = 'app';
  igual: boolean = null;
  response: number = 10;
  constructor(private _dataInformation: DataInformation, 
              private _dataEconomicInformation: DataEconomicInformation, 
              private _constants: Constants, 
              private _fileService: FileService, 
              public _inscriptionComplete: InscriptionComplete, 
              private _Router: Router,
              private _rolInformation: RolInformation) {
    
  }

  ngOnInit() {
    if (this._dataInformation.MessageAdmin == null) {
      this._dataInformation.GetAdminInformation()
        .subscribe(data => {
          this._dataInformation.MessageAdmin = data
          
        },
        error => {
          console.log(error);
        });
    }   
  } 

  private PutValidationComponent() {
    console.log('put');
    if(this._fileService.formDataFiles != null && this._fileService.formDataFiles != undefined) {
      setTimeout(() => this._inscriptionComplete.waitService = true,0);
      this._fileService.PotsFiles().subscribe(
        data => {
          this._fileService.formDataFiles = new FormData(),
          this._inscriptionComplete.PutValidationInscription().subscribe((datad)=>{
              this.response = datad.json();
              //
              setTimeout(() => this._inscriptionComplete.waitService = false,0);
              if(this.response == 1) {
                this._Router.navigate(['/login']);
              }
          });
          });
    }


  }

  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }

  ChangeMenu(item) {
    this._constants.rol = item;
    if (this._constants.rol == 0) {
      this._Router.navigate(['/login']);
    }
  }

  main() {
    $('.menu_bar').click(function(){
      $('nav').toggle();
      if(this.contador == 1) {
        $('nav').css("left","0");
      } else {
        $('nav').css("left","-100%");
        this.contador = 1;
      }
    });
  }

  // select(item) {
  //   this.selected = item; 
  // };

  // isActive(item) {
  //   return this.selected === item;
  // };

  function() {
    $('.unordered li accordion').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      $this.closest('ul').children('li').removeClass('active');
      $this.parent().addClass('active');
    });
  }
}