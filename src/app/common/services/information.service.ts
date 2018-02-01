import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { StudentData } from '../models/data.model';
import 'rxjs/add/operator/map';

@Injectable()
export class Information {
   
    dataInformation: StudentData[];
    dataInformationViewed: StudentData[];
    constructor(private _http: Http, private _constants: Constants) {
    }

    ngOnInit() {
    }

    public GetInformation(url: string) {
        return this._http.get(url)
        .map((res: Response) => res.json());
    }
}


