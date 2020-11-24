import AuthState from "./AuthState";
import ProfileState from "./ProfileState";
import UserState from "./UserState";
import TrainerState from "./TrainerState";
import CourseState from "./CourseState";
import StudentState from "./StudentState";
import TaskState from "./TaskState";

class Store {
  authState = new AuthState();
  profileState = new ProfileState();
  userState = new UserState();
  trainerState = new  TrainerState();
  courseState = new CourseState();
  studentState = new StudentState();
  taskState = new TaskState();
}

const store = new Store();

export default store;
