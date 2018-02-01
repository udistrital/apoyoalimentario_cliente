import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debug } from 'util';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        let urlAbsolute: string = '';
        try {
            urlAbsolute = url || urlAbsolute;
        } catch (error) {
            console.log(error);
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlAbsolute);;
    }
}