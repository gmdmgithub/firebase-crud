import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  projects$;
  title = 'Hi first app with firebase backend';

  constructor(db: AngularFireDatabase) {
    // console.log(environment.firebase);

    this.projects$ = db.list('/projects').valueChanges();
  }
}
