//Author: Goma Niroula
//cal-modal.page.ts: type script for cal modal page which holds the import for the modal,
//                   CalModalPage class, calendar and event initizlization, save() method,
//                   onViewTitleChanged() method, onTimeSelected() method, and close() method
//Last updated: 11/20
import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})

//CalModalPage class which holds all the methods and constructors
export class CalModalPage implements AfterViewInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date()
  };
  viewTitle: string;

  //Initialize event title, description, start and end time, and all day
  event = {
    title: '',
    desc: '',
    zoomLink: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  modalReady = false;

  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  //Save method to save the event
  save() {
    this.modalCtrl.dismiss({event: this.event})
  }

  //Method to chage event title
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  //Get Selected time
  onTimeSelected(ev) {
    this.event.startTime = new Date(ev.selectedTime);
  }

  //Close calendar
  close() {
    this.modalCtrl.dismiss();
  }
}
