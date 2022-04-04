//Author: Abyel Romero
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
import { Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';

interface res {
  success: false
}

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.page.html',
  styleUrls: ['./user-sign-up.page.scss'],
})
export class UserSignUpPage implements OnInit {

  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage, private router: Router, private alertCtrl: AlertController ) { }

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
    this.storage.create();




    this.httpClient.post('https://take-n-teach-api.herokuapp.com/user-sign-up', form.value)


    .subscribe(async (res: res) => {

      console.log("res", res);

     if (res.success) {
        // await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        // this.authSubject.next(true);

        // console.log("token", this.storage.get("ACCESS_TOKEN"));
        this.loginAlert("Success!", "Please log in with your new credentials.");
        this.router.navigateByUrl('user-sign-in');
      }

      else{//User already exists.
        console.log("Error: User already exists.");
        this.presentAlert("Error", "User already exists.");

      }

    })

    }

}
