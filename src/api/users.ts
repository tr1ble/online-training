import getInstance from "./instance";

interface User {
    login: string | number;
    password: string | number;
    role: string | number;
    email: string;
}


export async function getAllUsers() {
    const instance = await getInstance();
    const response = await instance.get('/users', {});
    return response.data;
}

export async function getUsersByRole(role:string) {
    const instance = await getInstance();
    const response = await instance.get('/users/findByRole/'+role, {});
    return response.data;
}

export async function updateUser(user:User) {
    const instance = await getInstance();
    const response = await instance.put('/user', user);
    return response.data;
}

export async function addUser(user:User) {
    const instance = await getInstance();
    const response = await instance.post('/user', user);
    return response.data;
}

export async function deleteUser(user:string) {
    const instance = await getInstance();
    const response = await instance.delete('/user'+user, {});
    return response.data;
}