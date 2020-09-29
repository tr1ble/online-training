import getInstance from "./instance";

export async function loginAttempt({login, password}: {
    login: string;
    password: string;
  }){
        const instance = await getInstance();
        const response = await instance.post("/login", {login, password});
        return response.data;
}

export async function register({
    login,
    password,
    email,
    role
  }: {
    login: string;
    password: string;
    email: string;
    role: string;
  }) {
    const instance = await getInstance();
  
    await instance.post('/register', {
      login,
      password,
      email,
      role,
    });

    return loginAttempt({login, password});
  }