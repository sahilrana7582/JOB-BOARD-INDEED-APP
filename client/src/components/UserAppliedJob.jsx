import React, { useEffect } from 'react';

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
import LinearProgress from '@mui/material/LinearProgress';
import { Clock1, LoaderCircle } from 'lucide-react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useWithdrawApplicationMutation } from '@/features/api/authApi';
import { toast } from 'sonner';

export default function UserAppliedJob({ job, totalApplied, userId, refetch }) {
  console.log(job, totalApplied);
  const [withdrawApplication, { isLoading, isSuccess }] =
    useWithdrawApplicationMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Application Withdrawed');
      refetch();
    }
  }, [isSuccess]);
  return (
    <Card className="w-[350px] min-h-[400px] ">
      <CardHeader>
        <div className="grid grid-cols-3 gap-6 items-center">
          <img
            src={job?.logoUrl}
            className="shadow-lg rounded-md w-20 h-20"
          ></img>
          <div className="col-span-2 space-y-1 ">
            <CardTitle>{job?.companyName}</CardTitle>
            <CardDescription>
              <h4>
                {job?.jobRole} |{' '}
                <span className="font-semibold">{job?.position}</span>
              </h4>
              <h4>{job?.location}</h4>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="space-y-1">
          <div className="grid grid-cols-3">
            <h4 className="text-left font-semibold col-span-1 ">Skills</h4>
            <div className="col-span-2 flex gap-2 flex-wrap">
              {job?.jobSkill?.map((skill) => (
                <h4
                  className="text-left text-sm  font-semibold col-span-2"
                  key={skill}
                >
                  {skill}
                </h4>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <h4 className="text-left font-semibold col-span-1 ">Tech</h4>
            <div className="col-span-2 flex gap-2 flex-wrap">
              {job?.techStack?.map((skill) => (
                <h4
                  className="text-left text-sm font-semibold col-span-2"
                  key={skill}
                >
                  {skill}
                </h4>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 ">
            <h4 className="text-left font-semibold col-span-1 ">Salary</h4>
            <h4 className="text-left font-semibold text-sm capitalize col-span-2 ">
              {job?.expectedSalary}
            </h4>
          </div>
          <div className="grid grid-cols-3 ">
            <h4 className="text-left font-semibold col-span-1 ">Experience</h4>
            <h4 className="text-left font-semibold text-sm capitalize col-span-2 ">
              {job?.experience} Years
            </h4>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between ">
          <Button variant="outline">
            <h4 className="text-sm items-center">
              {totalApplied?.find((application) => application.user === userId)
                ? totalApplied.find(
                    (application) => application.user === userId
                  ).status === 'Pending'
                  ? 'Pending'
                  : 'Selected'
                : 'Rejected'}
            </h4>
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              withdrawApplication({ userId: job?._id, id: userId })
            }
          >
            <h4 className="text-sm items-center">
              {isLoading ? (
                <LoaderCircle className="w-6 h-6 animate-spin" />
              ) : (
                'WithDraw Application'
              )}
            </h4>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
