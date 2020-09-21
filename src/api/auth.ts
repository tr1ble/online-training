import getInstance from "./instance";

export async function loginAttempt({login, password}: {
    login: string;
    password: string;}){
        const instance = await getInstance();

        const response = await instance.post("/login", {login, password});

        return response.data;
    
}