import { action, configure, observable, runInAction } from "mobx";

configure( {enforceActions: "observed"});

class ProfileState {
    
    @observable isProfileWindowVisible:boolean = false;

    @action handleProfile = (isProfileWindowVisible: boolean) => {
        if(isProfileWindowVisible) {
            this.hideProfile();
        } else {
            this.showProfile();
        }
        return this.isProfileWindowVisible;
    }

    @action showProfile = () => {
        runInAction(()=> {
            this.isProfileWindowVisible = true;
        })
    };

    @action hideProfile = () => {
        runInAction(()=> {
            this.isProfileWindowVisible = false;
        })
    };
}

export default ProfileState;
