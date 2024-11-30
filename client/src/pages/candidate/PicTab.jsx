import React, { useEffect, useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '@/features/api/authApi';
import { Input } from '@/components/ui/input';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const intialVal = {
  skills: '',
  tech: '',
};

const PicTab = ({ user }) => {
  const [updateUserQuery, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();
  const [showInput, setShotInput] = useState(null);

  const handleClick = (id) => {
    setShotInput((state) => {
      if (state) {
        return null;
      } else {
        return id;
      }
    });
  };

  const [formData, setFormData] = useState(intialVal);

  const handleSubmit = async () => {
    try {
      const formDataForm = new FormData();
      formDataForm.append('tech', formData.tech);
      formDataForm.append('skills', formData.skills);
      await updateUserQuery({ inputData: formDataForm, id: user._id });
    } catch (e) {
      console.log('Not Able To Perform Skill Update', e);
    } finally {
      setFormData(intialVal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile Update');
    }
    if (isError) {
      toast.error('Something Went Wrong');
    }
  }, [isError, isSuccess]);

  return (
    <div className=" w-[600px] rounded-lg  h-screen overflow-auto  bg-[#f7f7f7]">
      <div className="relative">
        <img
          src="/1910.jpg"
          className="w-full h-[300px] object-cover rounded-t-lg"
          alt="Background"
        />
        <div className="border-2 w-fit rounded-full bg-white p-1 absolute bottom-[70px] left-1/2 transform -translate-x-1/2">
          <img
            src={user?.imgUrl}
            className="w-40 h-40 rounded-full"
            alt="User"
          />
        </div>
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-center">
              {user?.firstName + ' ' + user?.lastName}
            </h2>
            <p className="text-sm text-muted-foreground font-bold text-red-400 ">
              {user?.currentRole || 'No Technical Role Added Yet!'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-6">
        <div>
          <p className="text-gray-500 text-center">
            {user?.generalDescription || 'Description Not Added Yet!'}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Skills</h1>
            <Button variant="none" onClick={() => handleClick('skill')}>
              <PlaylistAddIcon />
            </Button>
          </div>
          {showInput === 'skill' && (
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Add Skill"
                name="skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <Button type="submit" onClick={handleSubmit}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <AddIcon />
                )}
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {user?.skills?.length === 0 ? (
              <small className="text-sm font-medium leading-none text-center">
                ✨ No Skills Yet? <br />
                Click the Button Above to Showcase Your Talents! 🚀
              </small>
            ) : (
              <>
                {user?.skills?.map((skillName) => (
                  <Button key={skillName}>{skillName}</Button>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Tech</h1>
            <Button variant="none" onClick={() => handleClick('tech')}>
              <PlaylistAddIcon />
            </Button>
          </div>
          {showInput === 'tech' && (
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Add Tech"
                name="tech"
                value={formData.tech}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <Button type="submit" onClick={handleSubmit}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <AddIcon />
                )}
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {user?.tech?.length === 0 ? (
              <small className="text-sm font-medium leading-none text-center">
                ✨ No Tech Yet? <br />
                Click the Button Above to Showcase Your Talents! 🚀
              </small>
            ) : (
              <>
                {user?.tech?.map((techName) => (
                  <Button key={techName}>{techName}</Button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PicTab;
