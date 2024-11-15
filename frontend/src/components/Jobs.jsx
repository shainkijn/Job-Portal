



import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";
import axios from "axios";

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]); 
  const [searchedQuery, setSearchedQuery] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // 

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8000/api/v1/job/get", {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllJobs(res.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (err) {
        setError("Error fetching jobs.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the search query
  const filteredJobs = useMemo(() => {
    if (searchedQuery) {
      return allJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }
    return allJobs;
  }, [allJobs, searchedQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500 text-lg">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
         
          <div className="w-20%">
            <FilterCard setSearchedQuery={setSearchedQuery} />
          </div>

          
          {filteredJobs.length === 0 ? (
            <div className="flex-1 h-[88vh] flex items-center justify-center">
              <span className="text-gray-500 text-lg">
                No jobs found. Please try a different search query.
              </span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;



