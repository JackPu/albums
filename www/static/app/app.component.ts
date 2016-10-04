import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "/static/build/app.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}