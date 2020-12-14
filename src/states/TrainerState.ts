import { getCoursesByTrainer } from "api/courses";
import { deleteTrainer, getAllTrainers, updateTrainer, addTrainer, getTrainersByBusy, getCurrentTrainer } from "api/trainers";
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
    @observable myCourse: any = '';
    @observable currentTrainer: any = false;


    @action initTrainers = () => {
        this.getAllTrainers();
    }

    @action initCurrentTrainer = () => {
        this.getCurrentTrainer();
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

    @action getCurrentTrainer = () => {
        try {
            getCurrentTrainer().then((r:any)=> {
                this.currentTrainer = r;
                getCoursesByTrainer(r.id).then((res)=> {
                    this.myCourse = res[0];
                });
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