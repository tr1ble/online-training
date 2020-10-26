import AuthState from "./AuthState";
import ProfileState from "./ProfileState";
import UserState from "./UserState";
import TrainerState from "./TrainerState";

class Store {
  authState = new AuthState();
  profileState = new ProfileState();
  userState = new UserState();
  trainerState = new  TrainerState();
}

const store = new Store();

export default store;
