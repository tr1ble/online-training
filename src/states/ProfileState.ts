import { action, configure, observable, runInAction } from "mobx";

configure( {enforceActions: "observed"});

class ProfileState {
    
    @observable isProfileWindowVisible:boolean = false;

    @action handleProfile = () => {
        if(this.isProfileWindowVisible) {
            this.hideProfile();
        } else {
            this.showProfile();
        }
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
