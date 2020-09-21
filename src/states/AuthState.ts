import { action, observable, runInAction, configure } from "mobx";
import { loginAttempt} from "api/auth";


configure( {enforceActions: "observed"});

class AuthState {
    @observable login: string = '';
    @observable password:string |null = '';
    @observable token: string |null = '';
    @observable authorized:boolean = false;
    @observable role: "ROLE_STUDENT" | "ROLE_TRAINER" | "ROLE_ADMINISTRATOR" | "ROLE_DEFAULT" | undefined = undefined;

    @observable isAlertVisible = false;
    @observable textAlert = "";
    @observable typeAlert: "warning" | "error" | "success" = "warning";

    @action toLogin = async ({login, password}:{login:string; password:string}) => {
        try {
            const {responseLogin,token,role} = await loginAttempt({login, password});
            runInAction(()=> {
                this.login = responseLogin;
                this.authorized = true;
                this.password = password;
                this.role = role;
                this.token = token;
            });
            localStorage.setItem("login", login);
            localStorage.setItem("role", role);
            localStorage.setItem("authorized", "true");
        } catch (error) {
            this.showAlert("Неверный логин или пароль", "error")
        }
    };

    @action autoLogin = async () => {
        const authorized = localStorage.getItem('authorized') == 'true';
        const login = localStorage.getItem("login");
        const role = localStorage.getItem("role");
        const password = localStorage.getItem("password");
        const token = localStorage.getItem("token");
        const resRole = role === null ? undefined : role;
    
        if (
          resRole == "ROLE_STUDENT" ||
          resRole == "ROLE_TRAINER" ||
          resRole == "ROLE_ADMINISTRATOR" ||
          resRole == "ROLE_DEFAULT"
        ) {
          if (authorized && login) {
            runInAction(() => {
              this.authorized = true;
              this.role = resRole;
              this.login = login;
              this.password = password;
              this.token = token;
            });
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
        });
        localStorage.setItem("login", this.login);
        localStorage.setItem("role", "");
        localStorage.setItem("password", "");
        localStorage.setItem("token", "");
        localStorage.setItem("authrized", "false");
    };

    @action hideAlert = () => {
        runInAction(()=>{
            this.isAlertVisible = false;
            this.textAlert="";
            this.typeAlert="warning";
        });
    };

    @action showAlert = (message:string, type?: "warning" | "error" | "success") => {
        runInAction(()=> {
            this.isAlertVisible = true;
            this.textAlert = message;
            if(type) {
                this.typeAlert = type;
            }
        });

        setTimeout(()=> this.hideAlert, 5000);
    };

    @action setAuthorized = () => {
        runInAction(() => {
          this.authorized = true;
        });
      };
}

export default AuthState;
