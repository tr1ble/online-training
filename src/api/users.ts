import getInstance from "./instance";

export async function getAllUsers() {
    const instance = await getInstance();
    const response = await instance.get('/users', {});
    return response.data;
}