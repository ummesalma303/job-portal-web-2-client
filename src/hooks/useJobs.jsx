import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const useJobs = (sort,search,minSalary,maxSalary) => {
    const [jobs,setJobs] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        // const {data:jobs} = useQuery({ queryKey: ['jobs'], queryFn: async()=>{
             axios.get(`http://localhost:5000/jobs?sort=${sort}&search=${search}&maxSalary=${maxSalary}&minSalary=${minSalary}`)
            .then(res=>{
                setJobs(res.data)
                setLoading(false)
            })
            // return data
        // } })
    },[sort,search,minSalary,maxSalary])
    // console.log(jobs)
    return {jobs,loading}
};

export default useJobs;