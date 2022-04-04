import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { AuthModule } from '../auth/auth.module';
import { Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';

//Author: Abyel Romero

@Component({
  selector: 'app-instructor-sign-in',
  templateUrl: './instructor-sign-in.page.html',
  styleUrls: ['./instructor-sign-in.page.scss'],
})
export class InstructorSignInPage implements OnInit {
  authSubject  =  new  BehaviorSubject(false);

  constructor( private httpClient: HttpClient, private storage: Storage, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.storage.create();
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

  login(form){
    this.loginAlert("Loading", "Please wait a few seconds");


    this.httpClient.post('https://take-n-teach-api.herokuapp.com/instructor-sign-in', form.value)
    .subscribe(async (res: AuthResponse) => {
      console.log(res);

      if (res.user) {//if user object is in response, get token and go to home.
        await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        await this.storage.set("EMAIL", res.user.email);
        console.log("email", this.storage.get("EMAIL"));
        this.authSubject.next(true);
        console.log(this.storage.get("ACCESS_TOKEN"));
        this.router.navigateByUrl('instructorhome');

      }

      else{//Incorrect credentials.
        console.log("Error: Incorrect email or password.");
        this.presentAlert("Error", "Incorrect email or password");

      }

    })

  }
}
