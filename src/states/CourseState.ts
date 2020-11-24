import { deleteCourse, getAllCourses, updateCourse, addCourse } from "api/courses";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class Trainer {
    id: string;
    surname: string = '';
    firstname: string = '';
    secondname: string = '';
    constructor(id: string) {
        this.id = id;
    }
}
interface Course {
    id: string | number | undefined;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    trainer: Trainer;
    image: File;
}

class CourseState {
    
    @observable courses:Course[]=[];

    @action initCourses = () => {
        this.getAllCourses();
    }

    @action clearCourses = async () => {
        this.courses=[];
    }

    @action updateCourse = async (course:Course) => {
        updateCourse(course);
    }

    @action addCourse = async (course:Course) => {
        addCourse(course);
    }

    @action deleteCourse = async (course:string) => {
        this.courses.filter(function (ele) {
            return ele.id != course;
        });
        deleteCourse(course);
    }

    @action getAllCourses = async () => {
        try {
            const response = await getAllCourses();
            runInAction(() => {
                this.courses = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

}

export default CourseState;