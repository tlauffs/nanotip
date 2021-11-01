import { HttpClient } from '@angular/common/http';
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
  tts = this.route.snapshot.params['tts'];

  constructor(private route:ActivatedRoute,
    private db: AngularFireDatabase,
    private httpClient: HttpClient,) {

      this.alertSub = this.db.list('/alerts/'+ this.key).valueChanges().subscribe(alert => {
        this.alert = alert[alert.length-1];
        console.log(this.alert);

        if (this.loading !== true) {

        this.name = this.alert.name;
        this.message = this.alert.message;
        this.amount = this.alert.amount;
        this.startShowing = true;

        if (this.tts == "true") {
          var text = "https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + this.name + "donated" + this.amount + "nano." + this.message;
          var audio = new Audio();
          audio.src = text;
          audio.load();
          audio.play();
        }

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