//Author: Abyel Romero
import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from  '@ionic/storage';
import { Router } from  "@angular/router";

interface coursesRes {
  courses: {
    coursesArray: []
  };
}

@Component({
  selector: 'app-instructorhome',
  templateUrl: './instructorhome.page.html',
  styleUrls: ['./instructorhome.page.scss'],
})
export class InstructorhomePage implements OnInit {
  courseList = [];

  constructor(public streamingMedia: StreamingMedia, private httpClient: HttpClient, private storage: Storage, private router: Router) {
  // this.getCourses();
  }
  coursesList = [];


  ngOnInit() {
    this.storage.create();
    
  }

  ionViewWillEnter(){ //When the view loads, get instructor's courses from api and save them.

    this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.
    let postData = {"email":email};

    //  var url = 'http://localhost:8080/instructor-get-courses';
           var url = 'https://take-n-teach-api.herokuapp.com/instructor-get-courses';


     this.httpClient.put(url, postData)
     .subscribe(async (res: coursesRes) => {

      if(res.courses){
        this.coursesList = res.courses.coursesArray;//Get the instructor's courses from api.
        }

      })
    })
  }

  streamVideo(){
    // var options: StreamingVideoOptions ={ //For testing, we don't want  the videos on landscape mode.
    //   orientation: "landscape",
    //   controls: true,
    //   shouldAutoClose:false
    // }

    this.streamingMedia.playVideo("https://storage.googleapis.com/tnt_buuket/Instructor/how%20to%20code/vid.MOV");

  }

//   getCourses(){

//     let postData = {}


//       // var url = 'https://take-n-teach-api.herokuapp.com/user-homepage';
//       var url = 'https://take-n-teach-api.herokuapp.com/instructor-homepage';
//       // console.log(url);

//       // this.httpClient.get(url, postData)//get homepage data from api

//       // .subscribe(async (res: coursesRes) => {
//       //   console.log(res);
//       //   if(res.courses){
//       //       this.courseList = res.courses.coursesArray;//all purchased courses of the user from api
//       //       console.log(this.courseList);
//       //   }
//       // })
// }

}
