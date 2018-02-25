import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class FacultyInformation {
   
    facultyInformation: {};
    facultySelected: string;
    waitService: boolean;
    constructor(private _http: Http, private _constants: Constants) {
        this.facultyInformation = null;
        this.waitService = false;
    }

    ngOnInit() {
    }

    public GetFacultyInformation() {
        return this._http.get(this._constants.facultyInformation)
        .map((res: Response) => res.json());
    }
}