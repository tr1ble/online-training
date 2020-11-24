import getInstance from "./instance";

class User {
    login: string;
    constructor(login: string) {
        this.login = login;
    }
}
interface Trainer {
    id: string | number | undefined;
    firstname: string;
    secondname: string;
    surname: string;
    busy: boolean;
    user: User;
}


export async function getAllTrainers() {
    const instance = await getInstance();
    const response = await instance.get('/trainers', {});
    return response.data;
}

export async function getTrainersByBusy(busy:string) {
    const instance = await getInstance();
    const response = await instance.get('/trainers/findByBusy/'+busy, {});
    return response.data;
}


export async function updateTrainer(trainer:Trainer) {
    const instance = await getInstance();
    const response = await instance.put('/trainer', trainer);
    return response.data;
}

export async function deleteTrainer(trainer:string) {
    const instance = await getInstance();
    const response = await instance.delete('/trainer/'+trainer, {});
    return response.data;
}

export async function addTrainer(trainer:Trainer) {
    const instance = await getInstance();
    const response = await instance.post('/trainer', trainer);
    return response.data;
}