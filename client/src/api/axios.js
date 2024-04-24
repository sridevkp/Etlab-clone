import axios from "axios";

// const baseURL = "http://192.168.137.1:8080"
const baseURL = "http://localhost:8080"


export default axios.create({
     baseURL 
    })

export const axiosPrivate = axios.create({
     baseURL,
     headers : { "Content-Type": "application/json" },
     withCredentials : true 
    })   
