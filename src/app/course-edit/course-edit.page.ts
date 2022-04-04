import { Component, OnInit } from '@angular/core';
import { Storage } from  '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from  "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface coursesRes {
  courses: {
    coursesArray: []
  };
}

interface res {

  searchRes: {
    results: []
  };
}

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.page.html',
  styleUrls: ['./course-edit.page.scss'],
})
export class CourseEditPage implements OnInit {

  videos: any = [];
  courseName: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private httpClient: HttpClient, private alertCtrl: AlertController) {
    this.storage.create();
    //Get extras from previous page.
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        var courses = [];
        courses = this.router.getCurrentNavigation().extras.state.courses;

        for(var i = 0; i < courses.length; i++){//Parse json strings in array.
          var video = JSON.parse(courses[i]);
          this.videos.push(video);
        }

        this.courseName = this.videos[0].courseName;//Set the course name.
        console.log("Videos: ",this.videos);
      }
    });

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

  ngOnInit() {
  }

  // ionViewWillEnter(){ //When the view loads, get instructor's courses from api and save them.

  //   this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.
  //   let postData = {"email":email};

  //    var url = 'http://localhost:8080/instructor-get-courses';

  //    this.httpClient.put(url, postData)
  //    .subscribe(async (res: coursesRes) => {

  //     if(res.courses){
  //       this.coursesList = res.courses.coursesArray;//Get the instructor's courses from api.
  //       }

  //     })
  //   })
  // }

editVideo(video){
    let navigationExtras: NavigationExtras = { state: { video: video} };
    this.router.navigateByUrl('video-edit', navigationExtras);

}

deleteVideo(video){

  this.presentAlert("Warning","Are you sure you want to delete this video?").then((result)=>{

    if(result.role != "cancel"){

      this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.

      let postData = {email: email, video:  video}
      // var url = 'http://localhost:8080/removeVideoFromCourse';
      var url = 'https://take-n-teach-api.herokuapp.com/removeVideoFromCourse';
    
      this.httpClient.put(url, postData)
      .subscribe(async (res: res) => {

        this.router.navigateByUrl('manage-courses');

      })

  });


    }

  });

}

}
