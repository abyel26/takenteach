//Author: Abyel Romero
import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from  '@ionic/storage';
import { NavigationExtras, Router } from  "@angular/router";

interface homeResponse {

  home: {
    courses: []
  };
}

interface res {

  searchRes: {
    results: []
  };
}




@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.page.html',
  styleUrls: ['./userhome.page.scss'],
})





export class UserhomePage implements OnInit {

courseList = [];


  constructor(public streamingMedia: StreamingMedia, private httpClient: HttpClient, private storage: Storage, private router: Router) {
  this.getCourses();
  }



  ngOnInit() {
  }

  streamVideo(){
    // var options: StreamingVideoOptions ={ //For testing, we don't want  the videos on landscape mode.
    //   orientation: "landscape",
    //   controls: true,
    //   shouldAutoClose:false
    // }

    this.streamingMedia.playVideo("https://storage.googleapis.com/tnt_buuket/Instructor/how%20to%20code/dfF.MOV");

  }

  getCourses(){

    let postData = {}


      var url = 'https://take-n-teach-api.herokuapp.com/user-homepage';
      console.log(url);

      this.httpClient.get(url, postData)//get homepage data from api

      .subscribe(async (res: homeResponse) => {
        console.log(res);
        if(res.home){
            this.courseList = res.home.courses;//all purchased courses of the user from api
            console.log(this.courseList);
        }
      })
}




viewCourse(course){

  console.log("this is the course", course);

  let postData = {courseName: course}

  var url = 'https://take-n-teach-api.herokuapp.com/getCourseData';

  this.httpClient.put(url, postData)

  .subscribe(async (res: res) => {
    console.log("inside subscribe");

    if(res.searchRes){
      let navigationExtras: NavigationExtras = { state: { courses: res.searchRes.results} };//Pass array of courses to the course view page.
      this.router.navigateByUrl('course-view', navigationExtras);
    }
  })
  console.log("outside sub");


}

}
