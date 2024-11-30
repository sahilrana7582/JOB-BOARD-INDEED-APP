import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SeparatorHorizontal } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.User.user);

  return (
    <div className="relative">
      <img
        src="./images/whiteBG.jpg"
        className="max-h-screen w-screen relative object-fill"
      />

      <img
        src="./images/backPNG.png"
        className="absolute top-0 h-screen w-full object-fill"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10 shadow-lg "></div>
      <div className=" absolute top-1/3 left-0 right-0 flex justify-center flex-col items-center z-10 ">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-7xl font-extrabold uppercase w-1/2  text-center">
            <span className=" w-full">The Best </span>
            <br />
            Job Portal App
          </h1>
          <h1 className="text-lg  text-center m font-roboto font-normal   w-full px-64">
            Find Your Perfect Job or Discover Talented Candidates. The Future of
            Hiring Starts Here.
          </h1>
          <Separator />
        </div>

        <div className="flex gap-4 my-8">
          {user?.role === 'candidate' ? (
            <>
              <Link to="jobs">
                <Button className="w-fit uppercase">Browse Jobs</Button>
              </Link>
              <Link to={`/userActivity/${user?._id}`}>
                <Button className="w-fit  uppercase" variant="outline">
                  Your Activity
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="createNewJob">
                <Button className="w-fit uppercase">Post Job</Button>
              </Link>
              <Link to="jobs">
                <Button className="w-fit uppercase">Browse Jobs</Button>
              </Link>
              <Link to={`jobs/${user?._id}`}>
                <Button className="w-fit  uppercase" variant="outline">
                  Your Activity
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
