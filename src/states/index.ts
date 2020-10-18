import AuthState from "./AuthState";
import ProfileState from "./ProfileState";
import UserState from "./UserState";

class Store {
  authState = new AuthState();
  profileState = new ProfileState();
  userState = new UserState();
}

const store = new Store();

export default store;
