import React from 'react';
import AvatarNav from './AvatarNav';
import { Link } from 'react-router-dom';
import { PopProfile } from '@/pages/candidate/PopProfile';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const NavBar = () => {
  const user = useSelector((state) => state.User.user);

  return (
    <div>
      <div className="border-b shadow-lg h-20 flex justify-between items-center px-10">
        <div className="flex gap-2 items-center">
          <Link to="/">
            {' '}
            <img src="/78.jpg" className="w-20 h-20 "></img>
          </Link>
          <h2 className="font-roboto font-semibold ">J8BCO</h2>
        </div>
        <div>
          {user != null ? (
            <PopProfile user={user} />
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
