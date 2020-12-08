import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Camera , CameraResultType, CameraSource, Capacitor} from '@capacitor/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Contact } from '../contact';



@Component({
  selector: 'app-contactcreate',
  templateUrl: './contactcreate.page.html',
  styleUrls: ['./contactcreate.page.scss'],
})
export class ContactcreatePage implements OnInit {

  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  kontakCreate: Contact;
  constructor(
    private router: Router, 
    private cntSrv: ContactService,
    private platform: Platform,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    if((this.platform.is('mobile') && this.platform.is('hybrid')) || 
    this.platform.is('desktop')){
      this.isDesktop = true;
    }
  }

  async getPicture(type: string){
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
  
  onFileChoose(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if(!file.type.match(pattern)){
      console.log('File Format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form: NgForm){
    console.log(form.value.nama);
    this.kontakCreate = 
    {
        key: '',
        nama: form.value.nama,
        imageUrl: this.photo,
        telpon: form.value.telpon,
        email: form.value.email
    }
    
    
    this.cntSrv.create(this.kontakCreate).then(res => {
      console.log(res);
      this.router.navigateByUrl('/contactindex');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/contactindex');
  }

}
