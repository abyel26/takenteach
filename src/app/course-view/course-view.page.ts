import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NavigationExtras, Router } from  "@angular/router";
import { Storage } from  '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

interface getcourses {

  courses: {
    coursesArray: []
  };
}

interface purchaseResInt {

  purchaseResponse: {
    success: boolean;
    message: string;
  };
}


@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.page.html',
  styleUrls: ['./course-view.page.scss'],
})

export class CourseViewPage implements OnInit {

  videos: any = [];
  courseName: string = "";
  purchased: boolean = false;
  email: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private httpClient: HttpClient, private streamingMedia: StreamingMedia) {
    //Get extras from previous page.
    this.storage.create();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        var courses = [];
        courses = this.router.getCurrentNavigation().extras.state.courses;

        for(var i = 0; i < courses.length; i++){//Parse json strings in array.
          var video = JSON.parse(courses[i]);
          this.videos.push(video);
        }

        this.courseName = this.videos[0].courseName;//Set the course name.
        console.log(this.videos);
      }
    });



   }

   streamVideo(video){
     console.log("video", video);
     
    var options: StreamingVideoOptions ={ //For testing, we don't want  the videos on landscape mode.
      orientation: "landscape",
      controls: true,
      shouldAutoClose:false
    }

    var url = video.courseName + "/" + video.videoName + ".MOV";
    var videoUrl  = "https://storage.googleapis.com/tnt_buuket/Instructor/" + encodeURIComponent(url);

    console.log("video url: ", videoUrl);

    this.streamingMedia.playVideo(videoUrl);

  }

  ngOnInit() {

      let postData = {}

       this.storage.get("EMAIL").then((val) => {
         this.email = val; //get email that was used to log in


        var url = 'https://take-n-teach-api.herokuapp.com/getPurchasedCourses?email=' + this.email;
        // var url = 'http://localhost:8080/getPurchasedCourses?email=' + this.email;

        console.log(url);

        this.httpClient.get(url, postData)

        .subscribe(async (res: getcourses) => {
          console.log(res);
          if(res.courses){

            for(var i = 0; i < res.courses.coursesArray.length; i++){//Check to see if the course is purchased by the user.
              if(res.courses.coursesArray[i] == this.courseName){
                  this.purchased = true;
              }
            }

            console.log("is purchased?: ", this.purchased);

          }
        })


      });

  }


  purchaseCourse(){
    var email = "";

    this.storage.get("EMAIL").then((val) => {
      email = val; //get email that was used to log in
      //<this.courseName.replace(/\s/g, "")
      var url = 'https://take-n-teach-api.herokuapp.com/purchaseCourse?course=' + this.courseName + '&email=' + email;
      console.log(url);

      let postData = {
        // course: this.courseName,
        // email: this.email
      }

      this.httpClient.put(url, postData)//http put course


    .subscribe(async (res: purchaseResInt) => {
      console.log('before res log');
      console.log('res message ', JSON.stringify(res));

      console.log('after res log');

      //res.purchaseResponse.success ==
      if(true)
      {
        let navigationExtras: NavigationExtras = { state: { purchased: true} };//Pass array of courses to the course view page.
        this.router.navigateByUrl('purchasedcourses', navigationExtras);

      }

    })

     })

  }


//   isPurchased?(){

//     if (this.purchased == true){
//         return false;
//     }

//     else{
//       return true;
//     }
//   }

//   stream?(){
//     if (this.purchased == true){
//       return true;
//   }

//   else{
//     return false;
//   }
// }




}

