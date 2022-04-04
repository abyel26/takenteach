//Author: Abyel Romero
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

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.page.html',
  styleUrls: ['./user-sign-in.page.scss'],
})
export class UserSignInPage implements OnInit {

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

      this.httpClient.post('https://take-n-teach-api.herokuapp.com/user-sign-in', form.value)
      .subscribe(async (res: AuthResponse) => {
        console.log("res", res.user);

        if (res.user) {//if user object in response get token and go to home

          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EMAIL", res.user.email);
          // console.log("email", this.storage.get("EMAIL"));
          this.authSubject.next(true);
          this.router.navigateByUrl('userhome');

        }

        else{//Incorrect credentials.
          console.log("Error: User already exists.");
          this.presentAlert("Error", "Incorrect email or password");

        }


      })



    }




 


}
 