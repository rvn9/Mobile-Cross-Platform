// export class Contact {
//     constructor(
//         public nama: string,
//         public telepon: string[],
//         public email: string[]
//     ){}
// }

export class Contact {
    key: string;
    nama: string;
    telepon: string;
    email: string;
    Lat: string;
    Lng: string;
    constructor(key: string, nama: string, telepon: string, email:string, lat:string, lng:string){}
}