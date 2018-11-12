import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  projects: any[];
  title = 'Hi first app with firebase backend';
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    console.log(environment.firebase);

    this.subscription = db
      .list('/projects')
      .valueChanges()
      .subscribe(projects => {
        this.projects = projects;
        console.log(projects);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
