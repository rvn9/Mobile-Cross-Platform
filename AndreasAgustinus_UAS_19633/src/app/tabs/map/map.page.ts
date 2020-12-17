import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private lat: number;
  private lng: number;
  private map: any;
  private userMarker: any;
  private locationValue: string = "";
  private monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
                        "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];
  
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  initPos: any = {
    lat: -6.256081,
    lng: 106.618755
  }
  constructor(
    private userService: UserServiceService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    // NAMPILIN MAP
    this.showMap();
  }
  getCurrDate(){
    // GET CURRENT DATE
    var today = new Date();
    var todayDay = String(today.getDate()).padStart(2, '0');
    var todayMonth = String(today.getMonth()).padStart(2, '0');
    var todayYear = today.getFullYear();
    var todayHour = today.getHours();
    var todayMinute = today.getMinutes();
    var todayDate = todayDay + '-' + this.monthNames[todayMonth] + '-' + todayYear + '-' + todayHour + ':' + todayMinute;
    // console.log(todayDate)
    return todayDate;
  }
  // MODAL REMOVE ION HIDE
  openModal(){
    if(this.userMarker != null){
      document.getElementById('transparentLayer').classList.remove('ion-hide');
      document.getElementById('modalLayer').classList.remove('ion-hide');
      document.getElementById('fabCurLoc').classList.add('ion-hide');
      document.getElementById('fabOpenModal').classList.add('ion-hide');
    }
    else{
      this.presentToast("You must choose location first", "danger");
    }
  }
  // HIDE MODAL ADD ION HIDE
  hideModal(){
    document.getElementById('transparentLayer').classList.add('ion-hide');
    document.getElementById('modalLayer').classList.add('ion-hide');
    document.getElementById('fabCurLoc').classList.remove('ion-hide');
    document.getElementById('fabOpenModal').classList.remove('ion-hide');
  }
  // CHECK IN 
  checkIn(){
    var todayDate = this.getCurrDate(); //GET CURRENT DATE
    //CREATE OBJECT NEW LOCATION FOR STORE IN FIREBASE
    var newLocation: any = {
      lat: this.lat,
      lng: this.lng,
      nama: this.locationValue,
      tanggal: todayDate
    }
    // CALL FUNCTION UPDATELOCATION FROM USERSERVICE
    this.userService.updateLocation(newLocation);
    // HIDE MODAL
    this.hideModal();
    // SET LOCATION VALUE TO NULL
    this.locationValue = "";
    // CALL FUNCTION PRESENTTOAST FOR FEEDBACK
    this.presentToast("Location updated successfully", "success");
  }
  // PRESENT TOAST
  async presentToast(msg:string,warna:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: warna
    });
    toast.present();
  }
  // SHOW MAP
  showMap(){
    const location = new google.maps.LatLng(this.initPos.lat, this.initPos.lng);
    const options = {
      center: location,
      zoom: 12,
      disableDefaultUI: true
    };
    
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // MAP LISTENER FOR ADD USERMARKER
    this.map.addListener('click', (mapsMouseEvent) => {
      if(this.userMarker){
        this.userMarker.setMap(null);
      }
      
      this.lat = mapsMouseEvent.latLng.toJSON().lat;
      this.lng = mapsMouseEvent.latLng.toJSON().lng;
      // console.log("lat " + this.lat +"\n" + "lng" +this.lng)
      this.userMarker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map
      });
    })
  }
// GET CURRENT LOC
  getCurrentLoc(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if(this.userMarker){
          this.userMarker.setMap(null);
        }

        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        
        this.lat = pos.lat;
        this.lng = pos.lng;

        this.userMarker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat, this.lng),
          map: this.map
        });
        
        this.map.setCenter(pos);
      });
    }
  }
}
