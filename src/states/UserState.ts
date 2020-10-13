import { getAllUsers } from "api/users";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

class UserState {
    
    @observable users=[];

    @action initUsers = async () => {
        this.getAllUsers();
    }

    @action clearUsers = async () => {
        this.users=[];
    }
    

    @action getAllUsers = async () => {
        try {
            const response = await getAllUsers();
            runInAction(() => {
                this.users = response;
            });
        } catch (error) {
            console.log(error);
        }
    }
}