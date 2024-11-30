import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from './ui/separator';
import { JobDetail } from './JobDetail';
import { useApplyJobMutation } from '@/features/api/jobsApi';
import { LoaderCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const JobCard = ({ job, refetch }) => {
  const [jobApplyQuery, { isLoading, isSuccess, isError }] =
    useApplyJobMutation();
  const user = useSelector((state) => state.User.user);

  const handleApplyToJob = async () => {
    try {
      await jobApplyQuery({ id: job?._id, userId: user?._id });
    } catch (e) {
      console.log('Error While Apply To Job', e);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Applied');
      refetch();
    }
    if (isError) {
      toast.error('Something Went Wrong');
    }
  }, [isSuccess]);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex gap-6 items-center my-6">
          <img
            src={job?.logoUrl}
            className="w-16 h-16 rounded-xl shadow-md object-cover object-center"
            alt="logo"
          />

          <div className="space-y-1 text-left">
            <small className="text-sm font-medium text-black">
              {job?.companyName}
            </small>
            <CardTitle>{job?.jobRole}</CardTitle>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Tech: </span>
              {job?.techStack.map((tech) => tech + ' ')}
            </p>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="min-h-[450px]">
        <div className="flex flex-col space-y-3 py-10">
          <p className="text-base text-black text-wrap">
            <span className="font-medium uppercase">Job Description: </span>{' '}
            {job?.shortDescription}
          </p>
          <small className="text-sm font-medium text-black">
            Position: {job?.position}
          </small>
          <small className="text-sm font-medium text-black">
            Experience: {job?.experience}
          </small>
          <small className="text-sm font-medium text-black">
            Location: {job?.location}
          </small>
          <small className="text-sm font-medium text-black">
            Expected Salary: ₹{job?.expectedSalary}
          </small>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <JobDetail
          job={job}
          handleApplyToJob={handleApplyToJob}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          userId={user?._id}
          user={user}
        />
        {user == null ? (
          <Link to="/login">
            <Button>Login To Apply</Button>
          </Link>
        ) : (
          <>
            {user?.role === 'candidate' ? (
              <Button
                onClick={handleApplyToJob}
                disabled={
                  isLoading ||
                  job?.applications?.some(
                    (application) =>
                      application.user.toString() === user?._id.toString()
                  )
                }
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : job?.applications?.some(
                    (application) =>
                      application.user.toString() === user?._id.toString()
                  ) ? (
                  <>
                    Applied
                    <DoneAllIcon />
                  </>
                ) : (
                  'Quick Apply'
                )}
              </Button>
            ) : (
              <Link to={`/application/${job?._id}`}>
                <Button>Applications</Button>
              </Link>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
