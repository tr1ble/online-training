import getInstance from "./instance";

export async function getProfileImage( login: string){
        const instance = await getInstance();
        const response = await instance.post("/currentUser", {login});
        return response.data;
}

