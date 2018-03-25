import { EconomicInformation } from "../models/data.model";

/* URLs usadas en los servicios al CRUD_API y a la BD de la universidad */
export class Constants {
    // Data
    user: string = '';
    userTemp: string = '';
    rol: number;
    initialStatus: number = -1;
    basicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_basica/';
    academicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_academica/';
    receiptInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_recibo/';
    stateInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_estado/';
    institutionalInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_institucional/';
    facultyInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_facultades';
    
    // API
    pathState: string = 'http://192.168.1.43:8086/v1/infoapoyo/state/'; 
    pathConfiguration: string = "http://192.168.1.43:8086/v1/admin"
    pathInformation: string = 'http://192.168.1.43:8086/v1/infoapoyo/';
    pathFiles: string = 'http://192.168.1.43:8086/v1/file/';
    // API Administration
    pathNew: string = 'http://192.168.1.43:8086/v1/admin/2/';
    pathComplete: string = 'http://192.168.1.43:8086/v1/admin/3/';
    pathIncomplete: string ='http://192.168.1.43:8086/v1/admin/4/';
    pathVerification: string = 'http://192.168.1.43:8086/v1/admin/verification/';
    pathReport: string = 'http://192.168.1.43:8086/v1/admin/report';
    pathTestConnection: string = 'http://192.168.1.43:8086/v1/email/test';
    pathEmailConfiguration: string = 'http://192.168.1.43:8086/v1/email';
    pathSendEmail: string = 'http://192.168.1.43:8086/v1/email/send';
    pathVerifier: string = 'http://192.168.1.43:8086/v1/admin/verifier/';
}