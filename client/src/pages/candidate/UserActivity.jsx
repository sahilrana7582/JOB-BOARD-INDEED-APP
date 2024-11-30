import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import UserAppliedJob from '@/components/UserAppliedJob';
import { useGetUserAllJobsQuery } from '@/features/api/authApi';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserActivity = () => {
  const [sort, setSort] = useState('');
  const { userId } = useParams();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetUserAllJobsQuery(userId);
  console.log(data);

  const userJobs = data?.job;
  return (
    <div className="p-20 space-y-2">
      <div className="flex justify-between">
        <p className="text-xl ">Sort By</p>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator />
      {isLoading ? (
        <div className="flex justify-center">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          {userJobs?.length === 0 && (
            <div>
              <h1 className="text-gray-800 p-6 rounded-lg text-lg font-semibold text-center shadow-lg mx-auto my-6 w-4/5 bg-gradient-to-r from-indigo-500 to-purple-600 ">
                <span role="img" aria-label="thinking face">
                  🤔
                </span>
                <span>It looks like you haven't applied to any jobs yet!</span>
                <span role="img" aria-label="paper plane">
                  ✈️
                </span>
                <br />
                <span>
                  Please consider submitting your application or you will be
                  redirected to the homepage.
                </span>
                <span role="img" aria-label="home">
                  🏠
                </span>

                {/* Button to Apply */}
                <div className="mt-6">
                  <Link to="/jobs">
                    <Button className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 hover:from-purple-600 hover:to-indigo-500 transition duration-300">
                      Apply Now 🚀
                    </Button>
                  </Link>
                </div>
              </h1>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8">
            {userJobs?.map((job) => (
              <UserAppliedJob
                key={job._id}
                job={job?.job}
                totalApplied={data?.totalApplied}
                userId={userId}
                refetch={refetch}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserActivity;
