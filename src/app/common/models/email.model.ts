/* Estructura que tiene la configuración de correo electrónico del administrador */
export class Email {
    server: string;
    port: number;
    securitySSL: boolean;
    securityTLS: boolean;
    emailCon: string;
    pass: string;
    subject: string;
    text: string;
}

/* Esctructura que tiene las configuraciónes del mensaje como asunto, de, para */
export class BodyEmail {
    ebody: string;
    etosend: string;
    ename: string;
}