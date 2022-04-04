//Author: Abyel Romero

import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { NavigationExtras, Router } from  "@angular/router";
import { Course } from './course';

interface res {

  searchRes: {
    results: []
  };
}


@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.page.html',
  styleUrls: ['./usersearch.page.scss'],
})


export class UsersearchPage implements OnInit {

  authSubject  =  new  BehaviorSubject(false);
  search: String = "";//search bar
  result: any = "";//search results box
  data: any = {};

  constructor( private httpClient: HttpClient, private storage: Storage, private router: Router) {
    this.data.response = "";
   }

  ngOnInit() {
  }

//   ionViewWillEnter(){ //When the view loads, get instructor's courses from api and save them.

//   let postData = {}

//   var url = 'https://take-n-teach-api.herokuapp.com/loadCourses';
//   // var url = 'http://localhost:8080/loadCourses';

//   this.httpClient.get(url, postData)

//   .subscribe(async (res: AuthResponse) => {


//       if(res){
//           console.log("res: ", res);
//       }


//   })
// }

viewCourse(course){

  let postData = {courseName: course}

  // var url = 'http://localhost:8080/getCourseData';
  var url = 'https://take-n-teach-api.herokuapp.com/getCourseData';


  this.httpClient.put(url, postData)

  .subscribe(async (res: res) => {

    if(res.searchRes){
      let navigationExtras: NavigationExtras = { state: { courses: res.searchRes.results} };//Pass array of courses to the course view page.
      this.router.navigateByUrl('course-view', navigationExtras);
    }
  })

}

  searchVideo(){
    let input = this.search;

    let postData = {}

    var url = 'https://take-n-teach-api.herokuapp.com/search?searchString=' + input;
    // var url = 'http://localhost:8080/search?searchString=' + input;

    this.httpClient.put(url, postData)

    .subscribe(async (res: res) => {
      console.log("search: ", res);


        if(res.searchRes){//response has a results array with courses that match the search string
          this.result = res.searchRes.results;
        }

    })

  }

}
