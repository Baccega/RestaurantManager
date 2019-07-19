import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  public idWatcher: Subject<String> = new Subject();
  public titleWatcher: Subject<String> = new Subject();

  watchId(): Subject<String> {
    return this.idWatcher;
  }

  setId(newId) {
    this.idWatcher.next(newId);
  }

  setTitle(title) {
    this.titleWatcher.next(title);
  }

  watchTitle(): Subject<String> {
    return this.titleWatcher;
  }

  constructor() {}
}
