import axios from 'axios'

const axiosInstance = axios.create({
    timeout: 10000,
    headers : {
        "Content-Type": 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
       const accesstoken = localStorage.getItem("token");
       if(accesstoken){
        config.headers.Authorization = `Bearer ${accesstoken}`
       }
       return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
        
    
);

export default axiosInstance