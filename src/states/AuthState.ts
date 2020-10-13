import { action, observable, runInAction, configure } from "mobx";
import { loginAttempt, register } from "api/auth";

import history from "global/history";
import { getProfileImage, uploadProfileImage } from "api/profile";

configure({enforceActions: "observed"});

class AuthState {
    @observable login: string = '';
    @observable password:string |null = '';
    @observable token: string |null = '';
    @observable authorized:boolean = false;
    @observable role: "ROLE_STUDENT" | "ROLE_TRAINER" | "ROLE_ADMINISTRATOR" | "ROLE_DEFAULT" | undefined = undefined;
    @observable remember: boolean = false;

    @observable picture:any = null;

    @observable logged:boolean = false;

    @observable isAlertVisible = false;
    @observable message = "";
    @observable alertType = "";

    @action toLogin = async ({login, password, remember}:{login:string; password:string; remember: boolean}) => {
        try {
            const { token,role } = await loginAttempt({login, password});
            const picture = await getProfileImage(token, login);
            runInAction(()=> {
                this.login = login;
                this.authorized = true;
                this.password = password;
                this.role = role;
                this.token = token;
                this.remember=remember;
                this.picture = picture;
            });
            localStorage.setItem("login", login);
            localStorage.setItem("role", role);
            localStorage.setItem("authorized", "true");
            localStorage.setItem("token", token);
            localStorage.setItem("password", password);
            localStorage.setItem("remember", remember+"");
        } catch (error) {
            this.showAlert("Неверный логин или пароль", "login")
        }
    };

    @action uploadImage = async ({image}:{image:File}) => {
      await uploadProfileImage(this.token,this.login, image);
      action(()=>{this.picture = image});
    }

    @action autoLogin = async () => {
      if(!this.logged) {
      try {
          const login = localStorage.getItem("login");
          const role = localStorage.getItem("role");
          const rpassword = localStorage.getItem("password")
          const password = rpassword  === null ? '' : rpassword;
          const remember = localStorage.getItem("remember") == 'true';
          const resRole = role === null ? undefined : role
          if (
            resRole == "ROLE_STUDENT" ||
            resRole == "ROLE_TRAINER" ||
            resRole == "ROLE_ADMINISTRATOR" ||
            resRole == "ROLE_DEFAULT"
          ) {
            if (login && remember) {
              this.logged=true;
              this.toLogin({login, password, remember});
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      };

    @action logout = () => {
        runInAction(() => {
            this.authorized = false;
            this.login = "";
            this.password = "";
            this.token = "";
            this.role = undefined;
            this.remember = false;
            this.picture = null;
        });
        localStorage.setItem("login", this.login);
        localStorage.setItem("role", "");
        localStorage.setItem("password", "");
        localStorage.setItem("token", "");
        localStorage.setItem("authrized", "false");
        localStorage.setItem("remember", "false");
        history.push('/');
    };

    @action hideAlert = (alertType:string) => {
        runInAction(()=>{
            this.isAlertVisible = false;
            this.message="";
            this.alertType = alertType;
        });
    };

    @action showAlert = (message:string, alertType:string) => {
        runInAction(()=> {
            this.isAlertVisible = true;
            this.message = message;
            this.alertType = alertType;
        });

        setTimeout(()=> this.hideAlert, 5000);
    };

    @action setAuthorized = () => {
        runInAction(() => {
          this.authorized = true;
        });
      };

      @action tryRegister = async ({
        login,
        password,
        email
      }: {
        login: string;
        password: string;
        email: string;
      }) => {
        try {
          await register({
            login,
            password,
            email,
            role: "ROLE_DEFAULT"
          });
          let remember:boolean=true;
          await this.toLogin({login,password,remember});
        } catch (error) {
          this.showAlert("Ошибка регистрации", "register");
        }
      };
}

export default AuthState;
