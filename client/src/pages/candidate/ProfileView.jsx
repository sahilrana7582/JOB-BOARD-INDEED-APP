import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PicTab from './PicTab';
import {
  useGetProfileQuery,
  useUpdateExpMutation,
  useUpdateUserMutation,
} from '@/features/api/authApi';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import InputFieldsCustom from '@/components/InputFieldsCustom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExperienceCom from '@/components/ExperienceCom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import EducationCmp from '@/components/EducationCmp';
import { useParams } from 'react-router-dom';

const ProfileView = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetProfileQuery(userId);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <LoaderCircle className="w-32 h-32 animate-spin" />
      </div>
    );
  }
  const user = data?.user;
  return (
    <div className="px-20 py-10  flex gap-4">
      <PicTab user={user} />
      <Accordion type="single" collapsible className="w-full">
        <div className="w-full flex flex-col h-screen gap-10 overflow-auto">
          <div className="rounded-xl bg-[#f7f7f7] px-4 py-8 ">
            <AccordionItem value="item-0">
              <AccordionTrigger>
                <h1 className="font-semibold font-roboto text-xl">
                  Basic Information
                </h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-10">
                  <div className="grid grid-cols-3 gap-4 text-center ">
                    <>
                      <div>
                        <p className="text-base font-semibold">Age</p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          {user?.age || '20'}
                        </small>
                      </div>
                      <div>
                        <p className="text-base font-semibold">
                          Years of Experience
                        </p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          {user?.exp || '3 - 4'} Years
                        </small>
                      </div>{' '}
                      <div>
                        <p className="text-base font-semibold">Phone</p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          +91 {user?.phnNumber || ' 12345-75644'}
                        </small>
                      </div>{' '}
                      <div>
                        <p className="text-base font-semibold">Current CTC</p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          ₹{user?.currentCTC || '20'} lac Per Anum
                        </small>
                      </div>{' '}
                      <div>
                        <p className="text-base font-semibold">Location</p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          {user?.location || 'Chandigarh, Punjab, India'}
                        </small>
                      </div>{' '}
                      <div>
                        <p className="text-base font-semibold">Email</p>
                        <small className="text-sm font-semibold leading-none text-muted-foreground">
                          {user?.email || 'kingroman@gmail.com'}
                        </small>
                      </div>
                    </>
                  </div>
                  <div>
                    <Button>Download Resume</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>

          <div className="rounded-xl bg-[#f7f7f7] px-4 py-8 ">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="font-semibold font-roboto text-xl">
                  Experience
                </h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-10">
                  <div className="flex flex-col gap-4 px-10 max-h-[400px] overflow-auto ">
                    <>
                      {user?.professionalExp?.length === 0 ? (
                        <h1 class="text-2xl font-bold text-gray-700 text-center">
                          🚀 No Experience Yet? Time to Add Your Journey! 🌟
                        </h1>
                      ) : (
                        <>
                          {user?.professionalExp?.map((exp, ind) => (
                            <ExperienceCom exp={exp} key={ind} />
                          ))}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="rounded-xl bg-[#f7f7f7] px-4 py-8 ">
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <h1 className="font-semibold font-roboto text-xl">Education</h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-10">
                  <div className="flex flex-col gap-4 px-10 max-h-[400px] overflow-auto ">
                    <>
                      {user?.education?.length === 0 ? (
                        <h1 class="text-2xl font-bold text-gray-700 text-center">
                          🚀 No Education Yet? Time to Add Your Journey! 🌟
                        </h1>
                      ) : (
                        <>
                          {user?.education?.map((exp, ind) => (
                            <EducationCmp exp={exp} key={ind} />
                          ))}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default ProfileView;
