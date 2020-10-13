import getInstance from "./instance";

export async function getProfileImage(token: string, login: string){
        const instance = await getInstance();
        const response = await instance.post("/getImage/"+login,{
                headers: {
                        'authorization': token
                }});
        return response.data;
}

export async function uploadProfileImage(token: string | null, login: string, file:File){
        const instance = await getInstance();
        let formData = new FormData();
        formData.append("file", file);
        const response = await instance.post("/uploadImage/"+login, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'authorization': token
                }});
        return response.data;
}



