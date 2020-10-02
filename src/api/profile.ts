import getInstance from "./instance";

export async function getProfileImage(login: string){
        const instance = await getInstance();
        const response = await instance.post("/getImage/"+login);
        return response.data.data;
}

export async function uploadProfileImage(login: string, file:any){
        const instance = await getInstance();
        let formData = new FormData();
        formData.append("file", file);
        const response = await instance.post("/uploadImage/"+login, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});
        return response.data;
}



