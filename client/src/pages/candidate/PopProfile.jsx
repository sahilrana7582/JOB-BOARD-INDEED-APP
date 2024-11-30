import AvatarNav from '@/components/AvatarNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useUserLogoutMutation } from '@/features/api/authApi';
import { Logout } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function PopProfile({ user }) {
  const [openPop, setOpenPop] = useState(false);
  const [logoutQuery, { isLoading, isSuccess }] = useUserLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutQuery();
    navigate('/login');
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Logout Successful');
    }
  }, [isSuccess]);
  return (
    <Popover open={openPop}>
      <PopoverTrigger>
        <p onClick={() => setOpenPop(!openPop)}>
          <AvatarNav user={user} />
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{user?.firstName}</h4>
            <p className="text-sm text-muted-foreground">{user?.role}</p>
          </div>
          <Separator />

          <div className="flex flex-col gap-2">
            <Link to="/profile" onClick={() => setOpenPop(!openPop)}>
              <div className="flex items-center gap-4 hover:bg-slate-100 p-3 rounded-md transition-all duration-500 hover:cursor-pointer">
                <AccountCircleIcon />
                <small className="text-sm font-medium leading-none">
                  Profile
                </small>
              </div>
            </Link>
            <Separator />
            <Link
              to={
                user?.role == 'candidate'
                  ? `/userActivity/${user._id}`
                  : `jobs/${user._id}`
              }
              onClick={() => setOpenPop(!openPop)}
            >
              <div className="flex items-center gap-4 hover:bg-slate-100 p-3 rounded-md transition-all duration-500 hover:cursor-pointer">
                <WorkIcon />
                <small className="text-sm font-medium leading-none">
                  My Activity
                </small>
              </div>
            </Link>
            <Separator />
            <div
              className="flex items-center gap-4 hover:bg-slate-100 p-3 rounded-md transition-all duration-500 hover:cursor-pointer"
              onClick={handleLogout}
            >
              <Logout />
              <small className="text-sm font-medium leading-none">
                {isLoading ? (
                  <LoaderCircle className="w-10 h-10 animate-spin" />
                ) : (
                  'Logout'
                )}
              </small>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
