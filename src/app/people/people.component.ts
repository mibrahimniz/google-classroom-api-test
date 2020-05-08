import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/ngx-datatables/page';
import {TeacherModel} from '../models/teacher.model';
import {StudentModel} from '../models/student.model';
import {ClassroomService} from '../services/classroom.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  page = new Page();
  teacherRows = [];
  studentRows = [];
  isLoading = false;
  courseTitle: string;

  constructor(private router: Router, private classroomService: ClassroomService) {
    this.page.pageNumber = 0;
    this.page.size = 5;
    if (localStorage.length > 1) {
        this.courseTitle = localStorage.getItem('courseTitle');
        this.setTeacherPage({ offset: 0});
        this.setStudentPage({offset: 0});
    }
   }

  ngOnInit() {
  }
  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setTeacherPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    const courseId = localStorage.getItem('courseId');
    this.classroomService.getPeople(courseId).subscribe(resp => {
      if (resp['message']) {
        console.log(resp['message']);
        const message = resp['message'];
      } else {
        const teachers = [];
        this.page.totalTeachers = resp['teachers'].length;
        this.page.totalTeacherPages = resp['teachers'].length / this.page.size;
        const start = this.page.pageNumber * this.page.size;
        const end = Math.min((start + this.page.size), this.page.totalTeachers);
        // tslint:disable-next-line:forin
        // tslint:disable-next-line:curly
        // tslint:disable-next-line:no-string-literal
        // tslint:disable-next-line:prefer-for-of
        for (let i = start; i < end; i++) {
          const teacher = new TeacherModel();
          // tslint:disable-next-line:no-string-literal
          teacher.setValues(resp['teachers'][i].profile.name.fullName);
          teachers.push(teacher);
        }
        this.teacherRows = teachers;
        this.isLoading = false;
      }
    },
    error => {
      console.log(error);
    });
  }
  setStudentPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    const courseId = localStorage.getItem('courseId');
    this.classroomService.getPeople(courseId).subscribe(resp => {
      if (resp['message']) {
        console.log(resp['message']);
        const message = resp['message'];
      } else {
        const students = [];
        this.page.totalStudents = resp['students'].length;
        this.page.totalStudentPages = resp['students'].length / this.page.size;
        const start = this.page.pageNumber * this.page.size;
        const end = Math.min((start + this.page.size), this.page.totalStudents);
        // tslint:disable-next-line:prefer-for-of
        for ( let i = start; i < end; i++) {
          const student = new StudentModel();
          // tslint:disable-next-line:no-string-literal
          student.setValues(resp['students'][i].profile.name.fullName);
          students.push(student);
        }
        this.studentRows = students;
        this.isLoading = false;
      }
    },
    error => {
      console.log(error);
    });
  }
}
