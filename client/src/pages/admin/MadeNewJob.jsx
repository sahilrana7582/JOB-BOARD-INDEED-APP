import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEditJobMutation, usePostJobMutation } from '@/features/api/jobsApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DoneIcon from '@mui/icons-material/Done';
import { PinDropOutlined } from '@mui/icons-material';
import { getCurrentLocation } from '@/lib/utils';
import LocationComponent from '@/components/GetLocation';

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

export default function MadeNewJob({
  companyName = '',
  jobId = '',
  jobRole = '',
  shortDescription = '',
  description = '',
  jobSkill = '',
  techStack = '',
  expectedSalary = '',
  experience = '',
  fullAddress = '',
  location = '',
  openings = '',
  showEditPage,
  setShowEditPage,
  method,
  refetch,
  latlng = '',
}) {
  const [previewImg, setPreviewImg] = useState(null);
  const [latLng, setLatLng] = useState(null);

  const { register, reset, setValue, handleSubmit } = useForm();
  const [jobPostQuery, { data: postData, isLoading, isError, isSuccess }] =
    usePostJobMutation();
  const [
    editJob,
    { isLoading: editLoading, isSuccess: ediSuccess, isError: editError },
  ] = useEditJobMutation();
  const navigate = useNavigate();

  const submitPostJob = async (data) => {
    const formData = new FormData();
    console.log(data);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (method === 'edit') {
      await editJob({ inputData: formData, id: jobId });
      setShowEditPage(!setShowEditPage);
      refetch();
    } else {
      await jobPostQuery(formData).unwrap();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Job Posted Successfully');
      navigate('/jobs');
    }

    if (isError) {
      toast.error('Something Went Wrong');
    }

    if (ediSuccess) {
      toast.success('Job Edited Successfully');
    }
    if (editError) {
      toast.error('Something Went Wrong');
    }
    console.log(postData, '<<<<Daataa');
  }, [isSuccess, isError, ediSuccess, editError]);

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
                name="logo"
                onChange={(e) => {
                  const file = e?.target?.files[0];
                  if (file && file?.type?.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setPreviewImg(reader.result);
                      setValue('logo', file);
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
            <Input
              type="text"
              placeholder="Company Name"
              defaultValue={companyName}
              {...register('companyName', { required: true })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Job Role"
                defaultValue={jobRole}
                {...register('jobRole', { required: true })}
              />
              <select
                {...register('position', { required: true })}
                className="p-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 hover:border-gray-400 transition-all"
              >
                <option value="" disabled selected className="text-gray-500">
                  Select Position
                </option>
                <option
                  value="Junior"
                  className="text-gray-800 hover:bg-gray-200"
                >
                  Junior
                </option>
                <option
                  value="Senior"
                  className="text-gray-800 hover:bg-gray-200"
                >
                  Senior
                </option>
                <option
                  value="Entry-level"
                  className="text-gray-800 hover:bg-gray-200"
                >
                  Entry-level
                </option>
                <option
                  value="Intern"
                  className="text-gray-800 hover:bg-gray-200"
                >
                  Intern
                </option>
              </select>
            </div>

            <Input
              type="text"
              placeholder="Short Description"
              defaultValue={shortDescription}
              {...register('shortDescription', { required: true })}
            />

            <Textarea
              type="text"
              placeholder="Job Description"
              defaultValue={description}
              {...register('description', { required: true })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                defaultValue={jobSkill}
                placeholder="Frontend, Backend, Problem Solving"
                {...register('jobSkill', { required: true })}
              />
              <Input
                type="text"
                defaultValue={techStack}
                placeholder="React, Next, C++, Docker"
                {...register('techStack', { required: true })}
              />
              <Input
                type="text"
                defaultValue={experience}
                placeholder="Experience"
                {...register('experience', { required: true })}
              />
              <Input
                type="text"
                defaultValue={expectedSalary}
                placeholder="Expected Salary"
                {...register('expectedSalary', { required: true })}
              />
              <Input
                type="text"
                placeholder="Full Address"
                defaultValue={fullAddress}
                {...register('fullAddress', { required: true })}
              />
              <Input
                type="text"
                placeholder="Location"
                defaultValue={location}
                {...register('location', { required: true })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="text"
                placeholder="Location Coordinates"
                value={latLng}
                defaultValue={latlng}
                onChange={(e) => setLatLng(e.target.value)}
                {...register('latlng', { required: true })}
              />

              <LocationComponent setLatLng={setLatLng} latLng={latLng} />
              <Input
                type="text"
                placeholder="Number of Vecancies"
                defaultValue={openings}
                {...register('openings', { required: true })}
              />
            </div>
            <div className="flex justify-evenly gap-4">
              <Button
                variant="outlined"
                onClick={handleSubmit((data) => submitPostJob(data))}
              >
                {isLoading || editLoading ? (
                  <LoaderCircle className="w-8 h-8 animate-spin" />
                ) : (
                  'Publish Job'
                )}
              </Button>

              {method === 'edit' && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setShowEditPage(!showEditPage)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
