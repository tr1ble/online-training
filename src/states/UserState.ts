import { deleteUser, getAllUsers, updateUser,getUsersByRole } from "api/users";
import { action, configure, observable, runInAction } from "mobx";

configure({enforceActions: 'observed'})

interface User {
    login: string | number;
    password: string | number;
    role: string | number;
    email: string;
}

class UserState {
    
    @observable users:User[]=[];

    @action initUsers = () => {
        this.getAllUsers();
    }

    @action clearUsers = async () => {
        this.users=[];
    }

    @action updateUser = async (user:User) => {
        updateUser(user);
    }

    @action deleteUser = async (user:string) => {
        this.users.filter(function (ele) {
            return ele.login != user;
        });
        deleteUser(user);
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

    getUsersByRole = async (role:string) => {
        const response = await getUsersByRole(role);
        return response
    }
}

export default UserState;