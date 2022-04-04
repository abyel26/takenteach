import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from  '@ionic/storage';
import { NavigationExtras, Router } from  "@angular/router";
import {ActivatedRoute} from '@angular/router';

interface getcourses {

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
  selector: 'app-purchasedcourses',
  templateUrl: './purchasedcourses.page.html',
  styleUrls: ['./purchasedcourses.page.scss'],
})
export class PurchasedcoursesPage implements OnInit {

  courseList = [];


  constructor(public route: ActivatedRoute, public streamingMedia: StreamingMedia, private httpClient: HttpClient, private storage: Storage, private router: Router) {
    this.storage.create();
    this.getCourses();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        if(this.router.getCurrentNavigation().extras.state.purchased){

          location.reload()

        }
      }
    });
   }
  ngOnInit() {
  }
  
  streamVideo(){
    // var options: StreamingVideoOptions ={ //For testing, we don't want  the videos on landscape mode.
    //   orientation: "landscape",
    //   controls: true,
    //   shouldAutoClose:false
    // }

    this.streamingMedia.playVideo("https://storage.googleapis.com/tnt_buuket/Instructor/photoshop/IMG_0453.mp4");

  }

  viewCourse(course){



    let postData = {courseName: course}

    var url = 'https://take-n-teach-api.herokuapp.com/getCourseData';
    // var url = 'http://localhost:8080/getCourseData';

    this.httpClient.put(url, postData)

    .subscribe(async (res: res) => {

      if(res.searchRes){
        let navigationExtras: NavigationExtras = { state: { courses: res.searchRes.results} };//Pass array of courses to the course view page.
        this.router.navigateByUrl('course-view', navigationExtras);
      }
    })


  }

  getCourses(){
    var email = "";

    let postData = {}
     this.storage.get("EMAIL").then((val) => {
       email = val; //get email that was used to log in

      var url = 'https://take-n-teach-api.herokuapp.com/getPurchasedCourses?email=' + email;
      // var url = 'http://localhost:8080/getPurchasedCourses?email=' + email;
      console.log(url);

      this.httpClient.get(url, postData)//get homepage data from api

      .subscribe(async (res: getcourses) => {
        console.log(res.courses.coursesArray);
        if(res.courses){
            this.courseList = res.courses.coursesArray;//all purchased courses of the user from api
            console.log(this.courseList);
        }
      })


    });

}
}
