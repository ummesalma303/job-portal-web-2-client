import React, { useState } from 'react';
import useJobs from '../../hooks/useJobs';
import HotJobCard from '../Home/HotJobCard';
// import useJobs from '../../hooks/useJobs';

const AllJobs = () => {
    const [sort,setSort] = useState(false);
    const [search,setSearch] = useState('');
    const [minSalary,setMinSalary] = useState('');
    const [maxSalary,setMaxSalary] = useState('');
    const {jobs,loading} = useJobs(sort,search,minSalary,maxSalary)
    //  console.log(sort)
    if (loading) {
        return <div><h2>Loading...</h2></div>
    }
    console.log(search)
    return (
        <div>
            <h2 className='text-4xl font-bold my-9 text-center'>All Jobs</h2>

            <div className="grid grid-cols-3 items-center gap-6 my-5">
                <button className={`btn ${sort?'btn-success':"btn-neutral"}`} onClick={()=>setSort(!sort)}>{sort?"Sorted By Salary":'Sort By Salary'}</button>
                <input className='input input-bordered' onKeyUp={(e)=>{setSearch(e.target.value)}} placeholder='search jobs by location' type="text" />
                <div className="space-y-2">
                <input className='input input-bordered' onKeyUp={(e)=>{setMaxSalary(e.target.value)}} placeholder='max salary' type="text" />
                <input className='input input-bordered' onKeyUp={(e)=>{setMinSalary(e.target.value)}} placeholder='min salary' type="text" />
                </div>
            </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           {
                jobs.map(job=><HotJobCard job={job} key={job._id}></HotJobCard>)
            }
           </div>
        </div>
    );
};

export default AllJobs;