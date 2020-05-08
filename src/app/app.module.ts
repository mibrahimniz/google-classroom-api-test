import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {SimpleGlobal} from 'ng2-simple-global';
import {ClassroomService} from './services/classroom.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDatatableModule
  ],
  providers: [SimpleGlobal, ClassroomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
