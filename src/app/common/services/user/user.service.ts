import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  addNew (usercreds) {
    var headers = new Headers();
    var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this._http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
      if(data.json().success) {
        console.log('added user');
      }
    })
  }
}
