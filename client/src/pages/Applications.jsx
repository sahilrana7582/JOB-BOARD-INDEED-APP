import { JobDetail } from '@/components/JobDetail';
import { useGetJobByIdQuery } from '@/features/api/jobsApi';
import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ApplicationDetails from './ApplicationDetails';
import { LoaderCircle } from 'lucide-react';

const Applications = () => {
  const { jobId } = useParams();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetJobByIdQuery(jobId);
  const user = useSelector((state) => state.User.user);
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <LoaderCircle className="w-32 h-32 animate-spin" />
        </div>
      ) : (
        <ApplicationDetails
          job={data?.job}
          isLoading={isLoading}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Applications;
