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

export class BodyEmail {
    ebody: string;
    etosend: string;
    ename: string;
}