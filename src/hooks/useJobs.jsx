import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const useJobs = (sort,search,minSalary,maxSalary) => {
    // const [jobs,setJobs] = useState([])
    const [loading,setLoading] = useState(true)
    // useEffect(()=>{
        const {data:jobs,isLoading} = useQuery({ queryKey: ['jobs',sort,search,maxSalary,minSalary], queryFn: ()=>{
          return  fetch(`http://localhost:5000/jobs?sort=${sort}&search=${search}&maxSalary=${maxSalary}&minSalary=${minSalary}`).then(res=>res.json())
            // .then(res=>{
            //     setJobs(data)
            //     setLoading(false)
            // // })
            // return data
        } })
    // },[sort,search,minSalary,maxSalary])
    // console.log(jobs)
    console.log(jobs)
    return {jobs,isLoading}
};

export default useJobs;