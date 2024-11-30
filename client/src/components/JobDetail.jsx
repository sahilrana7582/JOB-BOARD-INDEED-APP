import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MyMap from './MapView';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Separator } from './ui/separator';
import ShareIcon from '@mui/icons-material/Share';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { CardContent } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getDaysAgo } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { LoaderCircle } from 'lucide-react';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Badge } from './ui/badge';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';

export function JobDetail({
  job,
  handleApplyToJob,
  isSuccess,
  isError,
  isLoading,
  userId,
  user,
}) {
  const recruiterInfo = job?.recruiter;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Information</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-h-screen h-full overflow-y-auto m-10">
        <DialogHeader>
          <div className="flex justify-between px-6 gap-10">
            <img src={job?.logoUrl} className="w-40 shadow-lg rounded-md"></img>
            <div className="flex flex-col justify-center gap-3 w-full  text-left">
              <h2 className="scroll-m-20   text-3xl font-semibold tracking-tight first:mt-0">
                {job?.jobRole}
              </h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <CorporateFareIcon />

                  <p className="text-sm text-muted-foreground">
                    {job?.companyName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FmdGoodIcon />

                  <p className="text-sm text-muted-foreground">
                    {job?.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BarChartIcon />

                  <p className="text-sm text-muted-foreground">
                    {job?.position}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <LanOutlinedIcon />

                  <p className="text-sm text-muted-foreground">
                    Tech: {job?.techStack[0]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AutoFixHighIcon />

                  <p className="text-sm text-muted-foreground">
                    Skills: {job?.jobSkill[0]}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {user?.role == 'candidate' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Link to={`/application/${job?._id}`}>
                      <Button>Applications</Button>
                    </Link>
                  </>
                )}
                <div className="flex gap-4">
                  <p className="text-sm text-muted-foreground">
                    Posted:{' '}
                    {formatDistanceToNow(new Date(job?.timePosted), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Openings: {job?.openings}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Applicants: {job?.applications?.length}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-10 h-10 ">
              <ShareIcon />
            </Button>
          </div>
        </DialogHeader>
        <Separator />
        <CardContent>
          <div className="space-y-10 my-10">
            <blockquote className="mt-6  pl-6 italic text-center">
              "{job?.shortDescription}""
            </blockquote>
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Job Description
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify ">
                {job?.description}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-6">
              <div className="max-w-fit  space-y-4 ">
                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Job Role:</h6>
                  <p className="text-justify">{job?.jobRole}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Position:</h6>
                  <p className="text-justify">{job?.position}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Experience:</h6>
                  <p className="text-justify">{job?.experience} Years</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Tech Stack:</h6>
                  <p className="text-justify">{job?.techStack}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Skills:</h6>
                  <p className="text-justify">{job?.jobSkill}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Expected Salary:</h6>
                  <p className="text-justify">₹{job?.expectedSalary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">Address:</h6>
                  <p className="text-justify">{job?.fullAddress}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <h6 className="font-bold">City / State:</h6>
                  <p className="text-justify">{job?.location}</p>
                </div>
              </div>
              <div className="border-l-2 px-4 space-y-6">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Recruiter Info
                </h4>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={recruiterInfo?.imgUrl}
                      className="w-24 h-24 rounded-full"
                    ></img>
                    <div className="space-y-4 col-span-1  gap-4">
                      <div className="flex">
                        <h6 className="font-bold">Name: </h6>
                        <p className="text-justify">
                          {recruiterInfo?.firstName +
                            ' ' +
                            recruiterInfo?.lastName}{' '}
                        </p>
                      </div>
                      <div className="flex">
                        <h6 className="font-bold">Age: </h6>
                        <p className="text-justify">
                          {recruiterInfo?.age ? (
                            <span className="text-gray-500">
                              {recruiterInfo.age} years old
                            </span>
                          ) : (
                            <>
                              <NotInterestedIcon fontSize="small" />
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex">
                        <h6 className="font-bold">Email: </h6>
                        <p className="text-justify">
                          {' ' + recruiterInfo?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-6">
                    <div className="grid grid-cols-2">
                      <h6 className="font-bold">Role:</h6>
                      <p className="text-justify capitalize">
                        {recruiterInfo?.role || 'Edit Your Role'}
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <h6 className="font-bold">Experience:</h6>
                      <p className="text-justify">
                        {recruiterInfo?.exp || '1'} of Years
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <h6 className="font-bold">Skills:</h6>
                      <div className="flex flex-wrap gap-2">
                        {recruiterInfo?.skills?.length == 0
                          ? '😞 No skills added yet.'
                          : recruiterInfo?.skills?.map((ele, ind) => (
                              <Badge key={ind}>{ele}</Badge>
                            ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <h6 className="font-bold">Tech:</h6>
                      <div className="flex flex-wrap gap-2">
                        {recruiterInfo?.tech?.length == 0
                          ? '😞 No Tech added yet.'
                          : recruiterInfo?.tech?.map((ele, ind) => (
                              <Badge key={ind}>{ele}</Badge>
                            ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <h6 className="font-bold">Location:</h6>
                      <p className="text-justify">
                        {recruiterInfo?.location || 'Add Your Address'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <MyMap job={job} />
          </div>
          <div className="flex  justify-center gap-4">
            <p className="text-xl text-muted-foreground">Follow Us On</p>
            <div className="flex gap-2">
              <InstagramIcon />
              <XIcon />
              <FacebookIcon />
              <GitHubIcon />
            </div>
          </div>

          <Separator className="my-10" />
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}
