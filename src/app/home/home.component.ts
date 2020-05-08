import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/ngx-datatables/page';
import {CourseModel} from '../models/course.model';
import {ClassroomService} from '../services/classroom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = new Page();
  coursesRows = [];
  data = [];
  coursesObj: any;
  isLoading = false;

  constructor(private router: Router, private classroomService: ClassroomService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
   }

  ngOnInit() {
    const fullUrl = this.router.url;
    if (fullUrl.match('code')) {
      localStorage.setItem('sessionActive', '1');
      this.router.navigate(['/home']);
      const authCode = fullUrl.slice(11, 102);
      const decodedCode = decodeURIComponent(authCode);
      this.classroomService.getAllCourses(decodedCode).subscribe(courses => {
        this.coursesObj = courses;
        localStorage.setItem('courses', JSON.stringify(this.coursesObj));
        if (!this.coursesObj['message']) {
          localStorage.setItem('sessionActive', '1');
          this.setPage({ offset: 0});
        }
      },
      error => {
        console.log(error);
      });
    } else {
      const sessionActive = Number(localStorage.getItem('sessionActive'));
      if (sessionActive) {
        const courses = JSON.parse(localStorage.getItem('courses'));
        this.coursesObj = courses;
        if (!this.coursesObj['message']) {
          this.setPage({ offset: 0});
        }
      }
    }
  }
  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    const courses = [];
    this.page.totalCourses = this.coursesObj['courses'].length;
    this.page.totalTeacherPages = this.coursesObj['courses'].length / this.page.size;
    const start = this.page.pageNumber * this.page.size;
    const end = Math.min((start + this.page.size), this.page.totalCourses);
    // tslint:disable-next-line:forin
    for (let i = start; i < end; i++) {
      const course = new CourseModel();
      course.initialize(this.coursesObj['courses'][i].id, this.coursesObj['courses'][i].name);
      this.classroomService.getPeople(this.coursesObj['courses'][i].id).subscribe(people => {
        // tslint:disable-next-line:no-string-literal
        course.setValues(people['students'].length, people['teachers'].length);
      },
      error => {
        console.log(error);
      });
      courses.push(course);
      this.data.push(course);
    }
    this.coursesRows = courses;
    this.isLoading = false;
  }
  getId(value: string) {
    // tslint:disable-next-line:forin
    for (const i in this.data) {
      if (this.data[i].title === value) {
        localStorage.setItem('courseId', this.data[i].id);
        localStorage.setItem('courseTitle', (value));
      }
    }
  }

}
