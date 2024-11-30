import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePostJobMutation } from '@/features/api/jobsApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { useOnBoardMutation } from '@/features/api/authApi';
import { useSelector } from 'react-redux';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function MadeNewJob() {
  const [previewImg, setPreviewImg] = useState(null);

  const user = useSelector((state) => state.User.user);

  const { register, reset, setValue, handleSubmit } = useForm();
  const [onBoardQuery, { isLoading, isSuccess, isError }] =
    useOnBoardMutation();

  const navigate = useNavigate();
  const submitPostJob = async (data) => {
    const formData = new FormData();
    console.log(data);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    await onBoardQuery({ inputData: formData, id: user?._id }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('On-Boarding Complete');
      navigate('/');
    }
    if (isError) {
      toast.error('Something Went Wrong');
    }
  }, [isSuccess, isError]);
  return (
    <div className="px-72 py-10">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <CardMedia
              component="img"
              image={previewImg}
              alt="Img"
              className="max-w-24  h-24 rounded-full mt-10 text-center border-2"
            />
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              className="max-w-10 text-center"
            >
              <CameraAltIcon />
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                name="profilePic"
                onChange={(e) => {
                  const file = e?.target?.files[0];
                  if (file && file?.type?.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setPreviewImg(reader.result);
                      setValue('profilePic', file);
                    };

                    reader.readAsDataURL(file);
                  } else {
                    toast('Please Select Valid Image');
                  }
                }}
                multiple
              />
            </Button>
          </div>
          <Separator className="my-4" />
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <select
              {...register('role', { required: true })}
              className="p-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 hover:border-gray-400 transition-all"
            >
              <option value="" disabled selected className="text-gray-500">
                Select Role
              </option>
              <option
                value="recruiter"
                className="text-gray-800 hover:bg-gray-200"
              >
                Recruiter
              </option>
              <option
                value="candidate"
                className="text-gray-800 hover:bg-gray-200"
              >
                Candidate
              </option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={user?.firstName}
                {...register('firstName', { required: true })}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={user?.lastName}
                {...register('lastName', { required: true })}
              />
            </div>
            <Input
              type="text"
              placeholder="email"
              value={user?.email}
              disabled
            />

            <Button
              variant="outlined"
              onClick={handleSubmit((data) => submitPostJob(data))}
            >
              {isLoading ? (
                <LoaderCircle className="w-8 h-8 animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
