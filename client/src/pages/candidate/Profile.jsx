import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PicTab from './PicTab';
import {
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

const intialBasic = {
  age: '',
  exp: '',
  phnNumber: '',
  currentCTC: '',
  location: '',
  currentRole: '',
  generalDescription: '',
};

const intialEdu = {
  level: '',
  percentage: '',
  completeIn: '',
};

const initialExp = {
  companyName: '',
  previousRole: '',
  joinAt: '',
  leftAt: '',
  location: '',
};

const Profile = () => {
  const user = useSelector((state) => state.User.user);
  const [updateUserQuery, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();
  const [
    updateExpQuery,
    { isLoading: expLoading, isSuccess: successUpdate, isError: expUpdate },
  ] = useUpdateExpMutation();
  const [basicInfo, setBasicInfo] = useState(intialBasic);
  const [expInfo, setExpInfo] = useState(initialExp);
  const [eduInfo, setEduInfo] = useState(intialEdu);

  const [showInput, setShowInput] = useState(null);

  const handleShow = (id) => {
    setShowInput((state) => {
      if (state) {
        return null;
      } else {
        return id;
      }
    });
  };

  const onClickHandleUpdate = async (forWhat) => {
    const formData = new FormData();
    if (forWhat == 'basic') {
      if (basicInfo.age) formData.append('age', basicInfo.age);
      if (basicInfo.exp) formData.append('exp', basicInfo.exp);
      if (basicInfo.phnNumber)
        formData.append('phnNumber', basicInfo.phnNumber);
      if (basicInfo.currentCTC)
        formData.append('currentCTC', basicInfo.currentCTC);
      if (basicInfo.location) formData.append('location', basicInfo.location);
      if (basicInfo.currentRole)
        formData.append('currentRole', basicInfo.currentRole);
      if (basicInfo.generalDescription)
        formData.append('generalDescription', basicInfo.generalDescription);
    } else if (forWhat == 'experience') {
      if (expInfo.companyName)
        formData.append('companyName', expInfo.companyName);
      if (expInfo.previousRole)
        formData.append('previousRole', expInfo.previousRole);
      if (expInfo.joinAt) formData.append('joinAt', expInfo.joinAt);
      if (expInfo.leftAt) formData.append('leftAt', expInfo.leftAt);
      if (expInfo.location) formData.append('location', expInfo.location);
    } else {
      if (eduInfo.level) formData.append('level', eduInfo.level);
      if (eduInfo.percentage) formData.append('percentage', eduInfo.percentage);
      if (eduInfo.completeIn) formData.append('completeIn', eduInfo.completeIn);
    }
    try {
      const action =
        forWhat === 'basic'
          ? updateUserQuery
          : forWhat === 'experience'
          ? updateExpQuery
          : updateExpQuery;
      await action({ inputData: formData, id: user?._id });
    } catch (e) {
      console.log('Error While Updating the User Basic Info', e);
    } finally {
      setBasicInfo(intialBasic);
      setExpInfo(initialExp);
      setShowInput(null);
      setEduInfo(intialEdu);
    }
  };

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
                  <div className="flex justify-end">
                    <Button onClick={() => handleShow('basic')}>
                      <EditNoteIcon />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center ">
                    {showInput == 'basic' ? (
                      <>
                        <InputFieldsCustom
                          initialData={intialBasic}
                          data={basicInfo}
                          setData={setBasicInfo}
                          onClickHandleUpdate={onClickHandleUpdate}
                          isLoading={isLoading}
                          forWhat="basic"
                        />
                      </>
                    ) : (
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
                    )}
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
                  <div className="flex justify-end">
                    <Button onClick={() => handleShow('education')}>
                      Add Experience
                    </Button>
                  </div>

                  <div className="flex flex-col gap-4 px-10 max-h-[400px] overflow-auto ">
                    {showInput == 'education' ? (
                      <>
                        <InputFieldsCustom
                          initialData={initialExp}
                          data={expInfo}
                          setData={setExpInfo}
                          onClickHandleUpdate={onClickHandleUpdate}
                          isLoading={expLoading}
                          forWhat="experience"
                        />
                      </>
                    ) : (
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
                    )}
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
                  <div className="flex justify-end">
                    <Button onClick={() => handleShow('education')}>
                      Add Education
                    </Button>
                  </div>

                  <div className="flex flex-col gap-4 px-10 max-h-[400px] overflow-auto ">
                    {showInput == 'education' ? (
                      <>
                        <InputFieldsCustom
                          initialData={intialEdu}
                          data={eduInfo}
                          setData={setEduInfo}
                          onClickHandleUpdate={onClickHandleUpdate}
                          isLoading={expLoading}
                          forWhat="education"
                        />
                      </>
                    ) : (
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
                    )}
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

export default Profile;
