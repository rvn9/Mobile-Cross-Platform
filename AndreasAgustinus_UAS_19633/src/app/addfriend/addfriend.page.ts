import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { friend } from '../service/friendModel';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.page.html',
  styleUrls: ['./addfriend.page.scss'],
})
export class AddfriendPage implements OnInit {
  // BUAT HARDCODE FRIEND
  public tempArray = [
    {
      id: 0,
      nama: 'Andre Agustinus'
    },
    {
      id: 1,
      nama: 'Albert Wijaya'
    },
    {
      id: 2,
      nama: 'Djasen Tjendry'
    },
    {
      id: 3,
      nama: 'Hendry'
    },
    {
      id: 4,
      nama: 'Steven Wijaya'
    },
    {
      id: 5,
      nama: 'Aldo Gabriel'
    },
    {
      id: 6,
      nama: 'Steve Manumpil'
    },
    {
      id: 7,
      nama: 'Albert Wijaya'
    },
    {
      id: 8,
      nama: 'James Christian Wira'
    },
    {
      id: 9,
      nama: 'Yehezkiel Gunawan'
    },
  ]
  tempFriend:any
  // DUMMY BUAT SPAWN KE PAGE HTML
  public Dummy = []
  // BACKUP DUMMY BUAT BACKUP DATA DUMMY YANG UDAH DI FILTER SAMA FIRE DB
  public backupDummy = []
  // GET DATA CURRENT USER
  currUser: string = JSON.parse(localStorage.getItem('currUser'));
  currUserId: string = localStorage.getItem('UID');
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private authService: AuthService,
    private userService: UserServiceService,
    private loadingController: LoadingController
  ) {
   }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    // console.log(this.tempArray.length);


    // VARIABLE SELF BUAT BISA DIPAKE DI DALEM SUBSCRIBE
    var self = this;
    // GET ALL FRIENDS USING SNAPSHOTCHANGES & SUBSCRIBE TO GET KEY FROM FIRE DB
    this.userService.getAllFriend().subscribe(data=>{
      // DATA DUMMY AWAL NULL, DI TAMBAHIN DI TEMP ARRAY YANG PUNYA DATA" FRIEND
      self.Dummy = self.tempArray;
      data.payload.child(this.currUserId).forEach(function(childSnapshot) {
        for(var i = 0; i < self.Dummy.length; i++)
        {
          // console.log(self.tempArray[i].nama)

          // .key untuk ngambil nama variabelnya. trus di compare ama dummy
          if(childSnapshot.key == self.Dummy[i].nama)
          {
            self.Dummy.splice(i,1);
            // console.log("ini dari data payload :" + self.Dummy)
          }
        }
      // console.log(self.tempArray)
      // console.log(childSnapshot.key)
      // if(childSnapshot.val()){
      //   // this.Dummy.splice(1)
      // }
      // counter++;
      // console.log(counter);
      })
      // NYIMPEN DATA DUMMY YANG UDAH KE FILTER KE DALEM BACKUPDUMMY
      self.backupDummy = self.Dummy;
    });
    this.presentLoading()
  }
  navBacktoFriendList(){
    this.navCtrl.navigateBack('/tabs/t/friend')
  } 
  // LOADING FUNCTION
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Data',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }
  // ADD FUNCTION
  add(friendId){
    // console.log(friendId)
    // console.log("ini function add :"+this.Dummy)
    this.Dummy.forEach((data,index) =>{
      if(data.nama == friendId)
      {
        this.presentToast(data.nama);
        this.userService.addFriend(data.nama);
        this.Dummy.splice(index,1);
        return true;
      }
    })
  }
  //TOAST FUNCTION
  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg + ' has been added',
      duration: 2000
    });
    toast.present();
  }
  //NAVBACK TO FRIEND PAGE
  navback(){
    this.navCtrl.navigateBack('/tabs/t/friend');
  }
  //REALTIME SEARCH BAR FUNCTION
  onChange(event)
  {
    const filteration = event.target.value;
        this.Dummy = this.filterItems(filteration);
        // console.log(this.tempFriendList)
        if (filteration.length === 0) {
             this.Dummy = this.backupDummy;
        }
  }
  // FILTER ITEMS
  filterItems(searchTerm){
    return this.backupDummy.filter(item =>{
      // console.log(item.toLowerCase().indexOf(searchTerm))
      return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
