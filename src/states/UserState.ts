import { getAllUsers } from "api/users";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

interface User {
    login: string | number;
    password: string | number;
    role: string | number;
    email: string | number;
}

class UserState {
    
    @observable users:User[]=[];

    @action initUsers = () => {
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
  static UserState: any;
}

export default UserState;