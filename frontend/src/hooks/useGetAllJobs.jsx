import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get('https://job-portal-backend-wkfc.onrender.com/api/v1/job/get', {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.jobs)
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("hello",error);
      }
      fetchAllJobs();
    };
  }, []);
};

export default useGetAllJobs;
