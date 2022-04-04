import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NavigationExtras, Router } from  "@angular/router";
import { Storage } from  '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

interface res {
  success: any
  searchRes: {
    results: []
  };
}

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.page.html',
  styleUrls: ['./video-edit.page.scss'],
})
export class VideoEditPage implements OnInit {

  video: any = {};
  courseName: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private httpClient: HttpClient, private alertCtrl: AlertController) {
    //Get extras from previous page.
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.video = this.router.getCurrentNavigation().extras.state.video;

        console.log(this.video);
      }
    });



   }
  ngOnInit() {
  }

  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Cancel', 'Delete']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    return result;
    console.log(result);
  }

  deleteVideo(){

    this.presentAlert("Warning","Are you sure you want to delete this video?").then((result)=>{

      if(result.role != "cancel"){

        this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.

        let postData = {email: email, video:  this.video}
        // var url = 'http://localhost:8080/removeVideoFromCourse';
        var url = 'https://take-n-teach-api.herokuapp.com/removeVideoFromCourse'

        this.httpClient.put(url, postData)
        .subscribe(async (res: res) => {

          this.router.navigateByUrl('manage-courses');

        })

    });


      }

    });

  }

  updateVideo(form){

        this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.

        let postData = {email: email, oldVideo:  this.video, form: form.value}
        // var url = 'http://localhost:8080/updateVideo';
        var url = 'https://take-n-teach-api.herokuapp.com/updateVideo'


        this.httpClient.put(url, postData)
        .subscribe(async (res: res) => {

          this.router.navigateByUrl('manage-courses');

        })

    });

  }

}
