import { deleteTrainer, getAllTrainers, updateTrainer } from "api/trainers";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class User {
    login: string;
    constructor(login: string) {
        this.login = login;
    }
}

interface Trainer {
    id: string | number;
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
}

export default TrainerState;