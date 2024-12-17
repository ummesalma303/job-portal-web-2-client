import axios from 'axios';
// import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
// import React from 'react';
const axiosInstance = axios.create({
    baseURL:"https://job-portal-server-for-recruiter-part3-omega.vercel.app",
    withCredentials:true
})
const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response
        },err=>{
            // console.log('errrrrrrrrrrrrrr',err)
            console.log('api response error status', err.status);
            if (err.status === 401 || err.status === 403) {
                signOutUser()
                .then(() => {
                    // redirect to the login page
            console.log('api response error status', err.status);

                    navigate('/signIn')
                })
                .catch(err => console.log(err))
            }
            return Promise.reject(err)
        })
    },[])

    // const { signOutUser } = useAuth();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     axiosInstance.interceptors.response.use(response => {
    //         return response;
    //     }, error => {
    //         console.log('api response error status', error.status);
    //         if (error.status === 401 || error.status === 403) {
    //             signOutUser()
    //                 .then(() => {
    //                     // redirect to the login page
    //                     navigate('/signIn')
    //                 })
    //                 .catch(err => console.log(err))
    //         }
    //         return Promise.reject(error);
    //     })
    // }, [])


    return axiosInstance
};

export default useAxiosSecure;