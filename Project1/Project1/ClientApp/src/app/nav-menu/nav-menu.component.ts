import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor() {

  }

  ngOnInit() {
    (<HTMLInputElement>(document.getElementById("toggleBtn"))).checked = false;
  }

  toggle() {
    (<HTMLInputElement>(document.getElementById("toggleBtn"))).checked = !this.isExpanded;
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      document.getElementById("wrapper").style.paddingLeft = "305px";
      if (this.isExpanded) {
        document.getElementById("container").style.paddingLeft = "305px";
      } else {
        document.getElementById("wrapper").style.paddingLeft = "15px";
      }
    }


  }
}
