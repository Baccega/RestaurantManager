import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SidenavService {
  public statusWatcher: Subject<boolean> = new Subject();

  getStatus(): Subject<boolean> {
    return this.statusWatcher;
  }

  setStatus(newStatus) {
    this.statusWatcher.next(newStatus);
  }

  constructor() {}
}
