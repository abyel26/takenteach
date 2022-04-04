//Author: Abyel Romero
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";

interface courses {

  courses: {
    coursesArray: []
  };
}

@Component({
  selector: 'app-instructor-upload-video',
  templateUrl: './instructor-upload-video.page.html',
  styleUrls: ['./instructor-upload-video.page.scss'],
})

export class InstructorUploadVideoPage {

  constructor(private storage: Storage, private httpClient: HttpClient, private alertCtrl: AlertController, private camera: Camera, private transfer: FileTransfer, private file: File, private loadingCtrl: LoadingController, private router: Router){
    this.storage.create();

}

selectedVideo: string;
uploadedVideo: string;
uploadPercent: number = 0;
isUploading: boolean = false;
fileTransferObj: FileTransferObject;
loader;
courseName: string = "";
videoName: string = "";
price: string = "";
summary: string = "";
tag: string = "";
coursesList = [];
selectedOption = "";

//I will implements alert dialogs later they're not working for some reason.


// showLoader() {
//   this.loader = this.loadingCtrl.create({
//     message: 'Please wait...'
//   });
//   this.loader.present();
// }

// dismissLoader() {
//   this.loader.dismiss();
// }

// presentAlert(title, message) {
//   let alert = this.alertCtrl.create({
//     header: title,
//     message: message,
//     buttons: ['Dismiss']
//   });
//   alert.present();
// }

// async presentAlert(title, message) { //Present alert function setup, pass a title and a message and print alert.
//   let alert = this.alertCtrl.create({
//     header: title,
//     message: message,
//     buttons: ['Dismiss']
//   });
//    (await alert).present;
// }

async presentAlert(title, message) {
  const alert = await this.alertCtrl.create({
    header: title,
    message: message,
    buttons: ['Dismiss']
  });

  await alert.present();
}

createCourse(){

  var email = "";

   this.storage.get("EMAIL").then((val) => {
    email = val; //get email that was used to log in
    let postData = {'courseName':this.courseName,"email":email,"summary":this.summary, "price": this.price, "tag": this.tag};

    // var url = 'http://localhost:8080/instructor-add-course';
    var url = 'https://take-n-teach-api.herokuapp.com/instructor-add-course';
    
    console.log(url);

    this.httpClient.put(url, postData)//http put course
    .subscribe(async (res: courses) => {
        if(res.courses){
          console.log("course list", res.courses.coursesArray);
          this.coursesList = res.courses.coursesArray;//Get an updated courses array from api after creating a course.
          this.presentAlert("Success", "Course creation was successful.");

      }
    })

  })


}

getCourses() { //send courses array to html
  return this.coursesList;
}

getSelectValue($event){
  let value = $event.target.value;//ionic select value is under this variable.
  console.log("value: ", value);
  this.selectedOption = value;
}

ionViewWillEnter(){ //When the view loads, get instructor's courses from api and save them.

      this.storage.get("EMAIL").then((email) => {//Get the user's email from storage to send in the request to api.
       let postData = {"email":email};

    //  var url = 'http://localhost:8080/instructor-get-courses';
     var url = 'https://take-n-teach-api.herokuapp.com/instructor-get-courses';
  
     console.log(url);

     this.httpClient.put(url, postData)
     .subscribe(async (res: courses) => {

      console.log(res);
        if(res.courses){
            this.coursesList = res.courses.coursesArray;//Get the instructor's courses from api.
        }

     })

      })
}

cancelSelection() {
  this.selectedVideo = null;
  this.uploadedVideo = null;
}

selectVideo() {//Set options to get videos from  camera roll.
  const options: CameraOptions = {
    mediaType: this.camera.MediaType.VIDEO,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

this.camera.getPicture(options)
.then( async (videoUrl) => {
  if (videoUrl) {
    // this.showLoader();

    this.uploadedVideo = null;
    //Get filename and directory path from url (url comes from selecting a video above).
    var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
    console.log("filename " + filename);

    var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

    dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath; //The directory needs a file:// appended.

    try {
      var dirUrl = await this.file.resolveDirectoryUrl(dirpath); //Check if exists
      var retrievedFile = await this.file.getFile(dirUrl, filename, {});//Get video.

    } catch(err) {
      // this.dismissLoader();
      console.log(err);
      return this.presentAlert("Error","Something went wrong.");
    }

    retrievedFile.file( data => {
        // this.dismissLoader();
        // if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");
        // if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");

        this.selectedVideo = retrievedFile.nativeURL;
    });
  }

},
(err) => {
  console.log(err);
});
}

uploadVideo() {

  var url = "https://take-n-teach-api.herokuapp.com/instructor-upload-video"

    // var url = "http://localhost:8080/instructor-upload-video";

var filename = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);//Remove until / from directory.

var options: FileUploadOptions = {//Video info.
fileName: filename,
fileKey: "video",
mimeType: "video/MP4",
params : {'courseName':this.selectedOption,"videoName":this.videoName,"summary":this.summary, "price": this.price, "tag": this.tag}
}

this.fileTransferObj = this.transfer.create();

this.isUploading = true;

this.fileTransferObj.upload(this.selectedVideo, url, options)
.then((data)=>{
  this.isUploading = false;
  return JSON.parse(data.response); //Send parsed json string to api saying it's uploaded.
})
.then((data) => {
  this.uploadedVideo = data.url;
  this.presentAlert("Success", "Video upload was successful.");

})
.catch((err)=>{
  this.isUploading = false;
  this.uploadPercent = 0;
  this.presentAlert("Error", "Error uploading video.");
});

// this.fileTransferObj.onProgress((data) => {
//   this.uploadPercent = Math.round((data.loaded/data.total) * 100);
// });
this.router.navigateByUrl('instructor-upload-video');

}

cancelUpload() {
this.fileTransferObj.abort();
this.uploadPercent = 0;
}

}
