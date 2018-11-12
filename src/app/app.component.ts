import { Component } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Subscription, Observable } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  projects$: Observable<any[]>;
  project$;
  title = "Hi first app with firebase backend";
  projectCollection: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    // console.log(environment.firebase);

    this.projects$ = db.list("/projects").valueChanges();
    this.project$ = db.object("projects/test2").valueChanges();
    this.projectCollection = db.list("projects");
  }

  addProject(project: HTMLInputElement) {
    const proj = {
      name: project.value,
      description: project.value + " description"
    };
    this.projectCollection
      .push(proj)
      .then(_ => console.log("success", proj));
    project.value = "";
  }
}
