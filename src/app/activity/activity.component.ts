import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  activitySub;
  activity: any;
  key = this.route.snapshot.params['key'];

  constructor(private db: AngularFireDatabase,
    private route:ActivatedRoute,) {
      this.activitySub = this.db.list('/alerts/'+ this.key).valueChanges().subscribe(activity => {
        this.activity = activity.reverse();
        console.log(activity);
      });
    }

  ngOnInit(): void {
  
  }

  ngOnDestroy(){
    this.activitySub.unsubscribe;
  }

}
