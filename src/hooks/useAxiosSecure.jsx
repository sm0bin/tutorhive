import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    withCredentials: true
})


const useAxiosSecure = () => {
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log(error);

            if (error.response.status === 401 || error.response.status === 403) {
                logoutUser();
                navigate('/login');
            }
        })
    }, [logoutUser, navigate])
    return axiosSecure;
};

export default useAxiosSecure;