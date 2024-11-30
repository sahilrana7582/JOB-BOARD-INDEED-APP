import React from 'react';
import { Separator } from './ui/separator';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const EducationCmp = ({ exp }) => {
  console.log(exp);
  return (
    <div className="flex flex-wrap gap-10 items-center">
      <div
        className="w-24 h-24 rounded-full text-center"
        style={{ backgroundColor: getRandomColor() }}
      >
        <p className="text-white  pt-10">{exp?.level || 'No Name'}</p>
      </div>

      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {exp?.level}
        </h4>
        <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
          {exp?.percentage}%
        </h4>

        <small className="text-base font-semibold leading-none">
          Completed On: {exp?.completeIn}
        </small>
      </div>
      <Separator />
    </div>
  );
};

export default EducationCmp;
