import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Storage } from  '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';

import { Component, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AuthModule } from  './auth/auth.module';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

//Import Camera and Email Composer
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

//Import InAppBrowser for Zoom
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// Import File opener and file plugin for gallery
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

// Import Email Composer
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
  ],

  providers: [
    Camera,
    InAppBrowser,
    File,
    FileOpener,
    FileTransfer,
    Component,
    AlertController,
    StreamingMedia,
    AuthModule,
    Storage,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthModule,    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
