import getInstance from "./instance";

class Trainer {
    id: string;
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


export async function getAllCourses() {
    const instance = await getInstance();
    const response = await instance.get('/courses', {});
    return response.data;
}

export async function getCoursesByTrainer(trainer:string) {
    const instance = await getInstance();
    const response = await instance.get('/courses/findByTrainer/'+trainer, {});
    return response.data;
}

export async function getCoursesByCurrentTrainer() {
    const instance = await getInstance();
    const response = await instance.get('/courses/findByCurrentTrainer', {});
    return response.data;
}


export async function updateCourse(course:Course) {
    const instance = await getInstance();
    const response = await instance.put('/course', course);
    return response.data;
}

export async function deleteCourse(course:string) {
    const instance = await getInstance();
    const response = await instance.delete('/course/'+course, {});
    return response.data;
}

export async function addCourse(course:Course) {
    const instance = await getInstance();
    const response = await instance.post('/course', course);
    return response.data;
}