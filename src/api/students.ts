import getInstance from "./instance";

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


export async function getAllStudents() {
    const instance = await getInstance();
    const response = await instance.get('/students', {});
    return response.data;
}

export async function getStudentsByCourse(course:string) {
    const instance = await getInstance();
    const response = await instance.get('/students/findByCourse/'+course, {});
    return response.data;
}


export async function updateStudent(student:Student) {
    const instance = await getInstance();
    const response = await instance.put('/student', student);
    return response.data;
}

export async function deleteStudent(student:string) {
    const instance = await getInstance();
    const response = await instance.delete('/student/'+student, {});
    return response.data;
}

export async function addStudent(student:Student) {
    const instance = await getInstance();
    const response = await instance.post('/student', student);
    return response.data;
}

export async function registerStudent(student:Student) {
    const instance = await getInstance();
    const response = await instance.post('/registration', student);
    return response.data;
}