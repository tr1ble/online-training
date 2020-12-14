import getInstance from "./instance";

const FileDownload = require('js-file-download');
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


export async function getAllCompletedTasks() {
    const instance = await getInstance();
    const response = await instance.get('/completedTasks', {});
    return response.data;
}

export async function getCompletedTasksByStudent(student:string) {
    const instance = await getInstance();
    const response = await instance.get('/completedTasks/findByStudent/'+student, {});
    return response.data;
}

export async function getCompletedTasksByCurrentUser() {
    const instance = await getInstance();
    const response = await instance.get('/completedTasks/findByCurrentUser/', {});
    return response.data;
}

export async function getCompletedTasksByCourse(course:string) {
    const instance = await getInstance();
    const response = await instance.get('/completedtasks/findByCourse/'+course, {});
    return response.data;
}

export async function downloadTask(task:string) {
    const instance = await getInstance();
    instance.get('/download/'+task, {}).
        then((response) => {
            console.log(response.headers)
            FileDownload(response.data, response.headers['x-suggested-filename']);
        });
    }


export async function updateCompletedTask(completedTask:CompletedTask) {
    const instance = await getInstance();
    const response = await instance.put('/completedTask', completedTask);
    return response.data;
}

export async function deleteCompletedTask(completedTask:string) {
    const instance = await getInstance();
    const response = await instance.delete('/completedTask/'+completedTask, {});
    return response.data;
}

export async function addCompletedTask(completedTask:CompletedTask) {
    const instance = await getInstance();
    const response = await instance.post('/completedTask', completedTask);
    return response.data;
}