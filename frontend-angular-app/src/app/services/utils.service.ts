import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  public idWatcher: Subject<String> = new Subject();
  public titleWatcher: Subject<String> = new Subject();
  public sidebarWatcher: Subject<boolean> = new Subject();
  public progressbarWatcher: Subject<boolean> = new Subject();

  setId(newId) {
    this.idWatcher.next(newId);
  }

  setTitle(title) {
    this.titleWatcher.next(title);
  }

  setSidebar(newSidebar) {
    this.sidebarWatcher.next(newSidebar);
  }

  setProgressbar(newProgressbar) {
    this.progressbarWatcher.next(newProgressbar);
  }

  watchId(): Subject<String> {
    return this.idWatcher;
  }

  watchTitle(): Subject<String> {
    return this.titleWatcher;
  }

  watchSidebar(): Subject<boolean> {
    return this.sidebarWatcher;
  }

  watchProgressbar(): Subject<boolean> {
    return this.progressbarWatcher;
  }

  constructor() {}
}
