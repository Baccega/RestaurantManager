import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeaderTitleService {
  public titleWatcher: Subject<String> = new Subject();

  constructor() {}

  setTitle(title) {
    this.titleWatcher.next(title);
  }

  watch(): Subject<String> {
    return this.titleWatcher;
  }
}
