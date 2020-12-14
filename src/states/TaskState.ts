import { getCoursesByCurrentTrainer } from "api/courses";
import { deleteTask, getAllTasks, updateTask, addTask, getTasksByCourse } from "api/tasks";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class Course {
    id: string;
    title: string;
    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

interface Task {
    id: string | number | undefined;
    title: string;
    description: string;
    course: Course
}


class TaskState {
    
    @observable tasks:Task[]=[];

    @action initTasks = () => {
        this.getAllTasks();
    }

    @action initTasksByCourse = (course:string) => {
        try {
            getTasksByCourse(course).then((r)=> {
                this.tasks=r});
        } catch (error) {
            console.log(error);
        }
    }


    @action clearTasks = async () => {
        this.tasks=[];
    }

    @action updateTask = async (task:Task) => {
        updateTask(task);
    }

    @action addTask = async (task:Task) => {
        addTask(task);
    }

    @action deleteTask = async (task:string) => {
        this.tasks.filter(function (ele) {
            return ele.id != task;
        });
        deleteTask(task);
    }

    @action getTasksByCourse = async (course:string) => {
        const response = await getTasksByCourse(course);
        return response;
    }
    @action getAllTasks = async () => {
        try {
            const response = await getAllTasks();
            runInAction(() => {
                this.tasks = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    getCoursesByCurrentTrainer = async () => {
        const response = await getCoursesByCurrentTrainer();
        return response;
    }

}

export default TaskState;