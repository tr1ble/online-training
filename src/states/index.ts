import AuthState from "./AuthState";
import ProfileState from "./ProfileState";

class Store {
  authState = new AuthState();
  profileState = new ProfileState();

}

const store = new Store();

export default store;
