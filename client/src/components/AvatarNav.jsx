import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';

const AvatarNav = ({ user }) => {
  const pic = user?.imgUrl;
  return (
    <Avatar>
      <AvatarImage src={pic || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarNav;
