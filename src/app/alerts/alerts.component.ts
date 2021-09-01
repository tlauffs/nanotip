import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit, OnDestroy {

  startShowing = false;
  stopShowing = false;

  loading = true;
  name = "";
  message = "";
  amount = 0;
  alertSub;
  alert: any;
  key = this.route.snapshot.params['key'];

  constructor(private route:ActivatedRoute,
    private db: AngularFireDatabase) {
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[10];
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 0.8;
      this.alertSub = this.db.list('/alerts/'+ this.key).valueChanges().subscribe(alert => {
        this.alert = alert[alert.length-1];
        console.log(this.alert);

        if (this.loading !== true) {

        this.name = this.alert.name;
        this.message = this.alert.message;
        this.amount = this.alert.amount;
        this.startShowing = true;
        msg.text = this.name + "donated" + this.amount + "nano" + this.message;
        msg.lang = 'en-US';
        speechSynthesis.speak(msg);

        setTimeout(() => {
          this.startShowing = false;
          this.stopShowing = true;
        }, 5000);
        }

        this.loading = false;
      });
    }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.alertSub.unsubscribe;
  }


}