import { EconomicInformation } from "../models/data.model";

export class Constants {
    // Data
    user: string = '';
    rol: number;
    basicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_basica/';
    academicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_academica/';
    receiptInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_recibo/';
    stateInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_estado/';
    institutionalInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_institucional/';
    
    // API
    pathState: string = 'http://192.168.1.40:8086/v1/infoapoyo/state/'; 
    pathMessage: string = "http://192.168.1.40:8086/v1/admin"
    pathInformation: string = 'http://192.168.1.40:8086/v1/infoapoyo/';
    pathFiles: string = 'http://192.168.1.40:8086/v1/file/';
    // API Administration
    pathNew: string = 'http://192.168.1.40:8086/v1/admin/1/';
    pathComplete: string = 'http://192.168.1.40:8086/v1/admin/3/';
    pathIncomplete: string ='http://192.168.1.40:8086/v1/admin/4/';
    pathRol: string = 'http://192.168.1.40:8086/v1/admin/';
    pathVerification: string = 'http://192.168.1.40:8086/v1/admin/verification/';
    
}