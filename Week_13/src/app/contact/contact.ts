import { SafeResourceUrl } from '@angular/platform-browser';

export class Contact {
    key: string;
    nama: string;
    imageUrl: SafeResourceUrl;
    telpon: string;
    email: string;
    constructor(key: string, nama: string, imageUrl: string, telpon: string, email: string){}
}