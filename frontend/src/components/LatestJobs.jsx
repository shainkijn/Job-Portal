




import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import axios from 'axios';

const LatestJobs = () => {
  const [allJobs, setAllJobs] = useState([]); // State for jobs data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/job/get', {
          withCredentials: true,
        });

        if (res.data.success) {
          setAllJobs(res.data.jobs); // Set jobs data if API call is successful
        } else {
          setError("Failed to load jobs.");
        }
      } catch (error) {
        setError("Error fetching jobs."); // Set error if API call fails
      } finally {
        setLoading(false); // Turn off loading once the fetch is complete
      }
    };

    fetchAllJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#962E2A]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {loading ? (
          <span>Loading...</span> // Show loading message while data is being fetched
        ) : error ? (
          <span>{error}</span> // Show error message if there's an error
        ) : allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <span>No Job Available</span> // Show message if no jobs are available
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
