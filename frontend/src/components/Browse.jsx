



import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import axios from 'axios';
import { setSearchedQuery } from '@/redux/jobSlice';

const Browse = () => {
    const [allJobs, setAllJobs] = useState([]);
    // const [searchedQuery, setSearchedQuery] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('https://job-portal-backend-wkfc.onrender.comapi/v1/job/get'); // Replace with your endpoint
                if (res.data.success) {
                    setAllJobs(res.data.jobs);
                }

            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();

        // Cleanup to reset search query
        return () => {
            setSearchedQuery("");
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs?.length || 0})
                </h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs && allJobs.length > 0 ? (
                            allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        ) : (
                            <p>No jobs found.</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
