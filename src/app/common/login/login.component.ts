import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants/model.constants'
import { Router } from '@angular/router';
import { StateService } from '../services/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _constants: Constants, private _Router: Router,private _stateService:StateService) { }

  ngOnInit() {
    this._stateService.State=null;
  }

  onClick() {
    if(this._constants.rol == 3) {
      this._Router.navigate(['/data']);
    }
    if(this._constants.rol == 1 || this._constants.rol == 2 ) {
      this._Router.navigate(['/list']);
    }
  }
}
