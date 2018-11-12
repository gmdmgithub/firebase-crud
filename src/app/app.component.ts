import { Component } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  projects$: Observable<any[]>;
  project$;//just as an example
  title = "Hi first app with firebase backend";
  projectCollection: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    
    this.projectCollection = db.list("projects");
    
    this.projects$ = db.list("/projects").snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    
    //to test getting specific value
    this.project$ = db.object("projects/test2").valueChanges();
    
  }

  addProject(project: HTMLInputElement) {
    const proj = {
      name: project.value,
      description: project.value + " description"
    };
    this.projectCollection.push(proj).then(_ => console.log("success", proj));
    project.value = "";
  }

  update(key, project: any) {
    const proj = {
      name: 'new value',
      description: project.name + " description"
    };
    console.log(key, proj);
    
    // this.projectCollection.set(key, proj);
    this.projectCollection.update(key, {value: 1234});
  }
  delete(key){
    this.projectCollection.remove(key);
  }
}
