import { deleteCompletedTask, getAllCompletedTasks, updateCompletedTask, addCompletedTask, getCompletedTasksByCurrentUser, getCompletedTasksByCourse, downloadTask } from "api/completedtasks";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class Student {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
}
class Task {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
}

interface CompletedTask {
    id: string | number | undefined;
    mark: number;
    feedback: string;
    startDate: Date;
    endDate: Date;
    student: Student;
    task: Task;
    file: File;
}

class CompletedTaskState {
    
    @observable completedTasks:CompletedTask[]=[];

    @action initCompletedTasks = () => {
        this.getAllCompletedTasks();
    }

    @action initCompletedTasksByCurrentUser = () => {
        this.getCompletedTasksByCurrentUser();
    }

    @action initCompletedTasksByCourse = (course: string) => {
        this.getCompletedTasksByCourse(course);
    }


    @action clearCompletedTasks = async () => {
        this.completedTasks=[];
    }

    @action updateCompletedTask = async (completedTask:CompletedTask) => {
        updateCompletedTask(completedTask);
    }

    @action addCompletedTask = async (completedTask:CompletedTask) => {
        addCompletedTask(completedTask);
    }

    @action deleteCompletedTask = async (completedTask:string) => {
        this.completedTasks.filter(function (ele) {
            return ele.id != completedTask;
        });
        deleteCompletedTask(completedTask);
    }

    @action getAllCompletedTasks = async () => {
        try {
            const response = await getAllCompletedTasks();
            runInAction(() => {
                this.completedTasks = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action getCompletedTasksByCurrentUser = async () => {
        try {
            const response = await getCompletedTasksByCurrentUser();
            runInAction(() => {
                this.completedTasks = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action getCompletedTasksByCourse = async (course: string) => {
        try {
            const response = await getCompletedTasksByCourse(course);
            runInAction(() => {
                this.completedTasks = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action download = async (completedTask:string) => {
        downloadTask(completedTask);
    }

}

export default CompletedTaskState;