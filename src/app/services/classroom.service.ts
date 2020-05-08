import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import {Page} from '../models/ngx-datatables/page';
import {SimpleGlobal} from 'ng2-simple-global';

@Injectable()
export class ClassroomService {
  options: {
    // tslint:disable-next-line:max-line-length
    headers: {'content-type': 'application/json'},
    observe: 'response',
    responseType: 'json'
  };

  constructor(private http: HttpClient, private simpleGlobal: SimpleGlobal) { }

  getAuthCode() {
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:no-string-literal
    return this.http.get(this.simpleGlobal['SERVER_HOST'] + '/auth/google/', this.options);
  }
  getAllCourses(decodedCode: string) {
    // tslint:disable-next-line:no-string-literal
    return this.http.post(this.simpleGlobal['SERVER_HOST'] + '/classroom/courses', {decodedCode});
  }
  getPeople(courseId: string) {
    return this.http.get(this.simpleGlobal['SERVER_HOST'] + '/google/classroom/people', {params: {course_Id: courseId}});
  }
}
