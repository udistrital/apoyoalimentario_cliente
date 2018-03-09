import { EconomicInformation } from "../models/data.model";

export class Constants {
    // Data
    user: string = '';
    rol: number;
    initialStatus: number = -1;
    basicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_basica/';
    academicInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_academica/';
    receiptInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_recibo/';
    stateInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_estado/';
    institutionalInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_institucional/';
    facultyInformation: string = 'http://jbpm.udistritaloas.edu.co:8280/services/bienestarProxy/info_facultades';
    
    // API
    pathState: string = 'http://localhost:8086/v1/infoapoyo/state/'; 
    pathConfiguration: string = "http://localhost:8086/v1/admin"
    pathInformation: string = 'http://localhost:8086/v1/infoapoyo/';
    pathFiles: string = 'http://localhost:8086/v1/file/';
    // API Administration
    pathNew: string = 'http://localhost:8086/v1/admin/1/';
    pathComplete: string = 'http://localhost:8086/v1/admin/3/';
    pathIncomplete: string ='http://localhost:8086/v1/admin/4/';
    pathVerification: string = 'http://localhost:8086/v1/admin/verification/';
    pathReport: string = 'http://localhost:8086/v1/admin/report';
    pathEmail: string = 'http://localhost:8086/v1/email/';
    pathTestConnection: string = 'http://localhost:8086/v1/email/test';
    pathSaveEmailConfiguration: string = 'http://localhost:8086/v1/email';
    pathSendEmail: string = 'http://localhost:8086/v1/email/send';
    pathVerifier: string = 'http://localhost:8086/v1/admin/verifier/';
}