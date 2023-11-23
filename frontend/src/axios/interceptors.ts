import axios from "axios";


const api = axios.create({
    withCredentials:true,
    headers:{
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("jwt-auth-token")
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export {api};