import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import {
  useRejectApplicationMutation,
  useSelectApplicationMutation,
} from '@/features/api/jobsApi';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ApplicationDialog = ({ applications, job, refetch }) => {
  const [rejectApplication, { isLoading, isSuccess, isError }] =
    useRejectApplicationMutation();
  const [
    selectApplication,
    { isLoading: successLoading, isSuccess: selectSuccess },
  ] = useSelectApplicationMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Application Rejected');
      refetch();
    }

    if (isError) {
      toast.success('Something Went Wrong');
    }
  }, [isSuccess]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Applications</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[700px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Application</DialogTitle>
          <DialogDescription>
            Review the applications below and find your next great hire!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          {applications?.length === 0 && (
            <h1 className="text-center text-xl text-gray-700 font-semibold flex items-center justify-center space-x-2 capitalize">
              <span role="img" aria-label="no applicants">
                🚫
              </span>
              <span>No applicants have applied yet</span>
              <span role="img" aria-label="sad face">
                😞
              </span>
            </h1>
          )}

          {applications?.map((ap, ind) => {
            const app = ap?.user;
            return (
              <div key={ind} className="hover:cursor-pointer">
                <div className="grid grid-cols-5 gap-8">
                  <div className="flex flex-col justify-center">
                    <img
                      src={app?.imgUrl}
                      className="shadow-lg w-36 h-36"
                    ></img>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center col-span-2 ">
                    <p className="text-lg font-medium">E-Mail</p>
                    <p className="text-sm text-muted-foreground">
                      {app?.email}
                    </p>
                    <p className="text-lg font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">
                      {app?.firstName + ' ' + app?.lastName}
                    </p>
                    <p className="text-lg font-medium">Skills</p>
                    <div className="grid grid-cols-2 gap-2">
                      {app?.skills.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No Skills On Applicant Profile
                        </p>
                      ) : (
                        app?.skills.map((skill) => (
                          <small
                            key={skill}
                            className="bg-black text-center text-white rounded-md p-[4px]"
                          >
                            {skill}
                          </small>
                        ))
                      )}
                    </div>
                    <p className="text-lg font-medium">Tech</p>
                    <div className="flex gap-2 flex-wrap">
                      {app?.tech.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No Tech On Applicant Profile
                        </p>
                      ) : (
                        app?.tech.map((skill) => (
                          <small
                            key={skill}
                            className="bg-black text-center text-white rounded-md p-[4px]"
                          >
                            {skill}
                          </small>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-8 col-span-2">
                    <div>
                      <p className="text-lg font-medium">Last Company</p>
                      {app?.professionalExp.length === 0 ? (
                        <p className="text-xs text-muted-foreground">
                          No Experience Added Yet!
                        </p>
                      ) : (
                        app?.professionalExp.map((exp, ind, arr) => {
                          if (ind == arr.length - 1) {
                            return (
                              <div
                                key={exp}
                                className="grid grid-cols-2 items-center"
                              >
                                <div>
                                  <p className="text-md text-muted-foreground">
                                    {exp?.companyName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {exp?.previousRole}
                                  </p>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                  {exp?.joinAt} - {exp?.leftAt}
                                </p>
                              </div>
                            );
                          }
                        })
                      )}
                    </div>
                    <Separator />
                    <div>
                      <p className="text-lg font-medium">Highest Education</p>
                      {app?.professionalExp.length === 0 ? (
                        <p className="text-xs text-muted-foreground">
                          No Education Added Yet!
                        </p>
                      ) : (
                        app?.education.map((edu, ind, arr) => {
                          if (ind === arr.length - 1) {
                            return (
                              <div
                                key={edu}
                                className="grid grid-cols-2 items-center"
                              >
                                <div>
                                  <p className="text-md text-muted-foreground">
                                    {edu?.level}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {edu?.percentage} %
                                  </p>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                  {edu?.completeIn}
                                </p>
                              </div>
                            );
                          }
                        })
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly my-6">
                  <Link to={`/profile/${app?._id}`} key={ind}>
                    <Button>More Information</Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        await selectApplication({
                          id: job?._id,
                          userId: app?._id,
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    {successLoading ? (
                      <LoaderCircle className="w-6 h-6 animate-spin" />
                    ) : (
                      'Select Application'
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await rejectApplication({
                          id: job?._id,
                          userId: app?._id,
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    {isLoading ? (
                      <LoaderCircle className="w-6 h-6 animate-spin" />
                    ) : (
                      'Reject Application'
                    )}
                  </Button>
                </div>
                <Separator className="my-6" />
              </div>
            );
          })}
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
