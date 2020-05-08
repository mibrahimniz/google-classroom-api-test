import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { NgForm } from '@angular/forms';
import { Session } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public router: Router, private simpleGlobal: SimpleGlobal) {
    // tslint:disable-next-line:no-string-literal
    this.simpleGlobal['SERVER_HOST'] = 'http://localhost:3000';
    // tslint:disable-next-line:no-string-literal
    this.simpleGlobal['SERVER_HOST_WS'] = 'ws://localhost:3000';
    // this.router.navigate(['login']);
  }
  ngOnInit() {}
}
