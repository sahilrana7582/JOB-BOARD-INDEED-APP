import React from 'react';
import { Separator } from './ui/separator';

// Utility function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ExperienceCom = ({ exp }) => {
  return (
    <div className="flex flex-wrap gap-10 items-center">
      <div
        className="w-24 h-24 rounded-full text-center"
        style={{ backgroundColor: getRandomColor() }}
      >
        <p className="text-white  pt-10">
          {exp.companyName.split(' ')[0] || 'No Name'}
        </p>
      </div>

      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {exp?.companyName}
        </h4>
        <small className="text-base font-semibold leading-none">
          {exp?.previousRole}
        </small>
        <br />
        <small className="text-sm font-semibold leading-none">
          {exp?.joinAt} - {exp?.leftAt} | {exp?.location}
        </small>
      </div>
      <Separator />
    </div>
  );
};

export default ExperienceCom;
