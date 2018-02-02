import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Constants } from '../constants/model.constants';
import { FileMainInformation, FileDBData } from '../models/file.model';
import { EconomicInformation } from '../models/data.model';

@Injectable()
export class FileService {
  errorFile: string = '';
  errorFileSplit: string[];
    changeModel : boolean = false;
    _fileInfo :FileDBData[];
    formDataFiles: FormData = new FormData();
    fileInformationLocal: FileMainInformation[];
constructor(private _http: Http , private _constants : Constants){
    this.fileInformationLocal=null;
}

ngOnInit() {
    
}

public GetFiles() {
    return this._http.get(this._constants.pathFiles + this._constants.user)
        .map((informacionArchivo) => informacionArchivo.json());
}

public FindName(_name : string): FileDBData  {
    var result: FileDBData = null; 
    if (this._fileInfo != null && this._fileInfo.length > 0) {
        var _result: FileDBData = this._fileInfo.find(x => x.nombre === _name);
        if (_result != null && 
            _result.nombre != undefined &&
            _result.nombre != null && 
            _result.nombre.length > 0){        
            return _result;
        }
    }
return result;
}

public PotsFiles( ) {
    this.formDataFiles.append('cod', this._constants.user);
    return this._http.post(this._constants.pathFiles, this.formDataFiles)
    .map(res => {
      this.errorFile = res.json();
      this.errorFileSplit = this.errorFile.split('/');
      this.errorFileSplit.pop();
    });
}
public evaluateInformation(Information: EconomicInformation){
    let _count : number = 0;
    this.fileInformationLocal.forEach((item) => { 
      _count++;
    if(item.name=="PersonasACargo") {
      item.required = Information.personasacargo;
    }
    if(item.name=="EmpleadorOArriendo"){
      item.required = Information.empleadoroarriendo;
    }
    if(item.name=="CondicionEspecial"){
      if(Information.poblacionespecial != "" && Information.poblacionespecial != "N") {
        item.required = "si";
      } else {
        item.required = "no";
      }
    }
    if(item.name=="CondicionDiscapacidad"){
      item.required = Information.discapacidad;
    }
    if(item.name=="PatologiaAlimenticia"){
      item.required = Information.patologiaalimenticia;
    }
    this.fileInformationLocal[_count-1] = item;
    });

  }
}