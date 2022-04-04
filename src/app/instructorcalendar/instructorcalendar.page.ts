//Author: Goma Niroula
//instructorcalendar.page.ts: type script for instructor calendar page which holds the import for the calander,
//                            InstructorcalendarPage class, onEventSelected() method, createRandomEvents() method,
//                            removeEvents() method, openCalModal() method, and onDidDismiss() method
//Last updated: 2/26/21
import { NgModule, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar'; //Ionic library for calander features
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarMode } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-instructorcalendar',
  templateUrl: './instructorcalendar.page.html',
  styleUrls: ['./instructorcalendar.page.scss'],
})

//Instructor calander class which holds all the methods and constructors
export class InstructorcalendarPage implements OnInit{
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date()
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private modalCtrl: ModalController, private alertCtrl:AlertController, @Inject(LOCALE_ID) private locale: string,)
  {}

  ngOnInit() {

  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // If calender event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for date/time conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  //Open calander if calander event was clicked
  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    await modal.present();

    //Close calander view if event was closed
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }

    });
  }
  //Remove random events
  removeEvents() {
    this.eventSource = [];
  }
}
