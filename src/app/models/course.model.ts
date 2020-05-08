export class CourseModel {
    id: string;
    title: string;
    numberOfStudents: string;
    numberOfTeachers: string;

    constructor() {
    }
    initialize(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
    setValues(numberOfStudents: string, numberOfTeachers: string) {
        this.numberOfStudents = numberOfStudents;
        this.numberOfTeachers = numberOfTeachers;
    }
}
