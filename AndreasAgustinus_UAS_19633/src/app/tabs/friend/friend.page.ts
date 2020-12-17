import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { UserServiceService } from 'src/app/service/user-service.service';
import { debounceTime } from "rxjs/operators";
@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {
  
  public tempFriendList: any = [];
  public backupFriend = []
  searching: any = false;
  public searchControl: FormControl;
  currUser: string = JSON.parse(localStorage.getItem('currUser'));
  currUserId: string = localStorage.getItem('UID');
  constructor(
    // private userService: UserServiceService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private userService: UserServiceService,
    private loadingController: LoadingController
  ) {
    // this.searchControl = new FormControl();
   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.tempFriendList.splice(0,this.tempFriendList.length)
    var self = this;
    this.userService.getAllFriends().subscribe(data=>{
      // self.Dummy = self.tempArray;
      // var counter = 0 
      data.payload.child(this.currUserId).forEach(function(childSnapshot) {
        // console.log("ini dari ngOnInit Friend Page : " +childSnapshot.key)
        self.tempFriendList.push(childSnapshot.key);
        // console.log(self.Dummy)
        // for(var i = 0; i < self.Dummy.length; i++)
        // {
        //   // console.log(self.tempArray[i].nama)
        //   // .key untuk ngambil nama variabelnya. trus di compare ama dummy
        //   if(childSnapshot.key == self.Dummy[i].nama)
        //   {
        //     self.Dummy.splice(i,1);
        //   }
        // }
      // console.log(self.tempArray)
      // console.log(childSnapshot.key)
      // if(childSnapshot.val()){
      //   // this.Dummy.splice(1)
      // }
      // counter++;
      // console.log(counter);
      })
    });
    this.backupFriend =this.tempFriendList;
    this.presentLoading();
    // this.tempFriendList.splice(0,this.tempFriendList.length)
  }
  ionViewWillLeave(){
    // this.tempFriendList.splice(0,this.tempFriendList.length)
  }
  ionViewDidLeave(){
    // this.tempFriendList.splice(0,this.tempFriendList.length)
    // console.log(this.tempFriendList.length)
  }
  // setFilteredItems(){
  //   const keyword = this.searchControl.value;
  //   const arr_result = []
  //   this.userService.filterItems(keyword)
  //   .then(rawdata =>{
  //     rawdata.forEach( data => {
  //       if(data.val()['nama'] != this.currUser){
  //         const setdata = {
  //           key: data.key,
  //           ...data.val()
  //         }
  //         arr_result.push(setdata)
  //       }
  //     })
  //     this.Dummy = arr_result;
  //   })
  // }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Data',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }
  navAddPage(){
    this.navCtrl.navigateForward('/addfriend');
  }
  delete(nama:string){
    var self = this;
    this.userService.deleteFriend(nama);
    var index: number;
    index = this.tempFriendList.forEach((element,index) => {
            if(element == nama)
            {
              
              return index;
            }
          });
    self.tempFriendList.splice(index,this.tempFriendList.length);
    this.tempFriendList = self.tempFriendList;
  }
  onChange(event)
  {
    const filteration = event.target.value;
        this.tempFriendList = this.filterItems(filteration);
        // console.log(this.tempFriendList)
        if (filteration.length === 0) {
             this.tempFriendList = this.backupFriend;
        }
  }
  filterItems(searchTerm){
    return this.backupFriend.filter(item =>{
      // console.log(item.toLowerCase().indexOf(searchTerm))
      return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }


}
