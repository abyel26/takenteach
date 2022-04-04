import { Component, OnInit } from '@angular/core';
import { Storage } from  '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';

interface coursesRes {
  courses: {
    coursesArray: []
  };
}

interface res {
  success: any
  searchRes: {
    results: []
  };
}

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.page.html',
  styleUrls: ['./manage-courses.page.scss'],
})
export class ManageCoursesPage implements OnInit {

  coursesList = [];
  updatedCourseName = "";
  courseName = "";

  constructor(private storage: Storage, private httpClient: HttpClient, private router: Router,private alertCtrl: AlertController) {
    this.storage.create();
  }
  ngOnInit() {
  }

  async presentAlertPrompt(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      inputs: [
        {
          name: 'newCourseName',
          type: 'text',
        }
      ],
      buttons: [{
        text: 'Cancel',
      },
      {
        text: 'Update',
        handler: (data:any) => {
          this.updatedCourseName = data.newCourseName;
          console.log('Updated course name:', this.updatedCourseName);
          this.changeCourseName();
        }
      }
    ],

    });

    await alert.present();
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


  editCourse(course){

    let postData = {courseName: course}

    // var url = 'http://localhost:8080/getCourseData';
    var url = 'https://take-n-teach-api.herokuapp.com/getCourseData';

    this.httpClient.put(url, postData)

    .subscribe(async (res: res) => {
      console.log("edit course under manage-course ", res);

      if(res.searchRes){
        let navigationExtras: NavigationExtras = { state: { courses: res.searchRes.results} };//Pass array of courses to the course view page.
        this.router.navigateByUrl('course-edit', navigationExtras);
      }
    })

  }

  async waitForAlert(){
    return new Promise(async (resolve, reject) => {
      let alert =  await this.alertCtrl.create({
        buttons: [{
          text: 'OK',
          handler: () => {
            alert.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      });
      await alert.present();
    });
  }

  // async presentAlert(title, message) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     message: message,
  //     buttons: ['Dismiss', 'Ok']
  //   });

  //   await alert.present();
  // }


  deleteCourse(course){

    this.presentAlert("Warning","Are you sure you want to delete the course?").then((result)=>{

      if(result.role != "cancel"){

        this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.

        let postData = {courseName: course, email: email}
        // var url = 'http://localhost:8080/deleteCourse';
        var url = 'https://take-n-teach-api.herokuapp.com/deleteCourse';

        this.httpClient.put(url, postData)
        .subscribe(async (res: res) => {
          location.reload();//Reload page
        })

    });


      }

    });

}

setCourseName(course){
  this.courseName = course;
  this.presentAlertPrompt("Update Course Name", "");//Get new course name from dialog.
}

changeCourseName(){

  this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.

    let postData = {courseName: this.courseName, email: email, updatedCourseName: this.updatedCourseName}
    // var url = 'http://localhost:8080/updateCourseName';
    var url = 'https://take-n-teach-api.herokuapp.com/updateCourseName';

    this.httpClient.put(url, postData)
    .subscribe(async (res: res) => {

    if(res.success == true){
      location.reload();//Reload page
    }
    })

});
}


}
