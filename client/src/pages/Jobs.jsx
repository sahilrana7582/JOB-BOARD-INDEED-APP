import FilterJob from '@/components/FilterJob';
import JobCard from '@/components/JobCard';
import { JobCardSkelton } from '@/components/skelton/JobCardSkelton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetAllJobsQuery } from '@/features/api/jobsApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Jobs = () => {
  const { recId } = useParams();
  const user = useSelector((state) => state.User.user);

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetAllJobsQuery(recId);

  useEffect(() => {
    refetch();
  }, [isLoading, isSuccess, isError, data]);
  return (
    <div className="flex flex-col items-center p-36 ">
      <div className="flex justify-between w-full">
        <h1 className="font-bold">Explore All Jobs</h1>
        <div className="flex items-center   gap-4">
          {user?.role === 'recruiter' && (
            <Link to="/createNewJob">
              <Button>Post New Job</Button>
            </Link>
          )}
        </div>
      </div>
      <Separator className="my-4" />
      {data?.job?.length === 0 ? (
        <>
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            🚫 No Jobs Posted Yet 🚫
          </h1>
          <p className="text-lg text-center text-gray-500 mt-2">
            📅 Stay tuned! New opportunities are coming soon. 🎉
          </p>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-20 py-4">
          {isLoading
            ? Array.from({ length: 10 })
                .fill(1)
                .map((ele, ind) => <JobCardSkelton key={ind} />)
            : data?.job?.map((job) => (
                <JobCard key={job._id} job={job} refetch={refetch} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
