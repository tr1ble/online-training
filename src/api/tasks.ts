import getInstance from "./instance";

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


export async function getAllTasks() {
    const instance = await getInstance();
    const response = await instance.get('/tasks', {});
    return response.data;
}

export async function getTasksByCourse(course:string) {
    const instance = await getInstance();
    const response = await instance.get('/tasks/findByCourse/'+course, {});
    return response.data;
}

export async function updateTask(task:Task) {
    const instance = await getInstance();
    const response = await instance.put('/task', task);
    return response.data;
}

export async function deleteTask(task:string) {
    const instance = await getInstance();
    const response = await instance.delete('/task/'+task, {});
    return response.data;
}

export async function addTask(task:Task) {
    const instance = await getInstance();
    const response = await instance.post('/task', task);
    return response.data;
}