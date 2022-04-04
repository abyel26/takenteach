import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from  '@ionic/storage';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { Router } from  "@angular/router";
import { Observable, BehaviorSubject } from  'rxjs';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
// import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

interface res {
  success: false
}

@Component({
  selector: 'app-instructor-sign-up',
  templateUrl: './instructor-sign-up.page.html',
  styleUrls: ['./instructor-sign-up.page.scss'],
})

export class InstructorSignUpPage implements OnInit {
  constructor(private chooser: Chooser, private transfer: FileTransfer, private httpClient: HttpClient, private storage: Storage, private router: Router, private alertCtrl: AlertController) { }

  fileObj:ChooserResult;
  fileObjs:ChooserResult[] = [];
  authSubject  =  new  BehaviorSubject(false);

  selectedResume: string;
  uploadedResume: string;
  uploadPercent: number = 0;
  isUploading: boolean = false;
  fileTransferObj: FileTransferObject;
  loader;
  nameOfFile: string;
  namesOfFiles : string [] = [];


  ngOnInit() {
    this.storage.create();
  }


  selectFiles() {

    this.chooser.getFile("application/pdf").then((value:ChooserResult)=>{
      this.fileObjs.push(value);
      this.namesOfFiles.push(value.name);

    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Dismiss']
    });

    await alert.present();
  }

  async loginAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Ok']

    });

    await alert.present();
  }

  ses() {
    var to = (<HTMLInputElement>document.getElementById('email')).value
    var subject = 'Credential Verification for: ' + (<HTMLInputElement>document.getElementById('firstName')).value + ' ' + (<HTMLInputElement>document.getElementById('lastName')).value;

    var message = 'Form Answers For: ' + (<HTMLInputElement>document.getElementById('firstName')).value + ' ' + (<HTMLInputElement>document.getElementById('lastName')).value + '\n' +
        'Tell us a little bit about yourself: ' + (<HTMLInputElement>document.getElementById('about')).value + '\n' +
        'What would you like to teach?: ' + (<HTMLInputElement>document.getElementById('teachsubject')).value + '\n' +
        'Have you taught before? How long?: ' + (<HTMLInputElement>document.getElementById('howlongteach')).value + '\n' +
        'What credentials do you have?: ' + (<HTMLInputElement>document.getElementById('credentials')).value + '\n';

    var formOpt = {

      to: 'takenteachapp@gmail.com'
        , from: 'takenteachapp@gmail.com'
        , cc: ''
        , bcc: ''
        , subject: subject
        , message: message
        , altText: 'altText???'
        , listOfFileNames: this.namesOfFiles
        , listOfFiles: document.getElementById('samplefileup')
    }

    this.httpClient.post('http://localhost:8080/ses', formOpt)
    .subscribe(async (res: AuthResponse) => {
      console.log(res);
      console.log(res);
    })
    console.log("Clicked!");
  }

  uploadResume() {

  var url = "https://take-n-teach-api.herokuapp.com/uploadResume"; //API url to upload resmue

  var filename = "resumeFile"

  var options: FileUploadOptions = {
  fileName: filename,
  fileKey: "application",
  mimeType: "application/pdf"
  }

  this.fileTransferObj = this.transfer.create();

  this.isUploading = true;

  this.fileTransferObj.upload(this.selectedResume, url, options)
  .then((data)=>{
    this.isUploading = false;
    return JSON.parse(data.response); //Send parsed json string to api saying it's uploaded.
  })
  .then((data) => {
    this.uploadedResume = data.url;
    // this.presentAlert("Success", "Resume upload was successful.");
  })
  .catch((err)=>{
    this.isUploading = false;
    this.uploadPercent = 0;
    // this.presentAlert("Error", "Error uploading resume.");
  });
  }

  signupIns(form){

    this.httpClient.post('https://take-n-teach-api.herokuapp.com/instructor-sign-up', form.value)

    // this.httpClient.post('http://localhost:8080/instructor-sign-up', form.value)

    .subscribe(async (res: res) => {
      console.log(res);

      if (res.success) {
        // await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        // this.authSubject.next(true);
        // console.log(this.storage.get("ACCESS_TOKEN"));
        this.loginAlert("Success!", "Account successfully created. Please log in now.");

        this.router.navigateByUrl('instructor-sign-in');
      }

      else{
        console.log("Error: User already exists.");
        this.presentAlert("Error", "User already exists!");

      }
    })
  }
}
