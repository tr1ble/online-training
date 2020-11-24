import { getCoursesByTrainer } from "api/courses";
import { deleteTrainer, getAllTrainers, updateTrainer, addTrainer, getTrainersByBusy } from "api/trainers";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

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

class TrainerState {
    
    @observable trainers:Trainer[]=[];

    @action initTrainers = () => {
        this.getAllTrainers();
    }

    @action clearTrainers = async () => {
        this.trainers=[];
    }

    @action updateTrainer = async (trainer:Trainer) => {
        updateTrainer(trainer);
    }

    @action addTrainer = async (trainer:Trainer) => {
        addTrainer(trainer);
    }

    @action deleteTrainer = async (trainer:string) => {
        this.trainers.filter(function (ele) {
            return ele.id != trainer;
        });
        deleteTrainer(trainer);
    }

    @action getAllTrainers = async () => {
        try {
            const response = await getAllTrainers();
            runInAction(() => {
                this.trainers = response;
            });
        } catch (error) {
            console.log(error);
        }
    }

    getTrainersByBusy = async (busy:string) => {
        const response = await getTrainersByBusy(busy);
        return response
    }

    getCoursesByTrainer = async (trainer:string) => {
        const response = await getCoursesByTrainer(trainer);
        return response;
    }
}

export default TrainerState;