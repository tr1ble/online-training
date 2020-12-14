import { deleteStudent, getAllStudents, updateStudent, addStudent, getStudentsByCourse, registerStudent, getStudentByUser } from "api/students";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class User {
    login: string;
    constructor(login: string) {
        this.login = login;
    }
}

class Course {
    id: string;
    title: string;
    constructor(id: string,title: string) {
        this.title = title;
        this.id = id;
    }
}
interface Student {
    id: string | number | undefined;
    firstname: string;
    secondname: string;
    surname: string;
    course: Course;
    user: User;
}

class StudentState {
    
    @observable students:Student[]=[];
    @observable selected_course: Course = new Course('0', 'empty');
    @observable myCourse: any = '';
    @observable currentStudent: any = false;

    @action initStudents = () => {
        this.getAllStudents();
    }

    @action initCurrentStudentByUser = (login: string) => {
        this.getCurrentStudentByUser(login);
    }

    @action initStudentsByCourse = (course: string) => {
        try {
            getStudentsByCourse(course).then((r)=> {
                this.students = r;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action clearStudents = async () => {
        this.students=[];
    }

    @action updateStudent = async (student:Student) => {
        updateStudent(student);
    }

    @action addStudent = async (student:Student) => {
        addStudent(student);
    }

    @action registerStudent = async (student:Student) => {
        registerStudent(student);
    }

    @action deleteStudent = async (student:string) => {
        this.students.filter(function (ele) {
            return ele.id != student;
        });
        deleteStudent(student);
    }

    @action getAllStudents = async () => {
        try {
            const response = await getAllStudents();
            runInAction(() => {
                this.students = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action getCurrentStudentByUser = (user:string) => {
        try {
            getStudentByUser(user).then((r)=> {
                this.currentStudent = r;
                this.myCourse = r.course;
            });
        } catch (error) {
            console.log(error);
        }
    }

    getStudentsByCourse = async (course:string) => {
        const response = await getStudentsByCourse(course);
        return response
    }

}

export default StudentState;