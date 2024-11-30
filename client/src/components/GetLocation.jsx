import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { PinDropOutlined } from '@mui/icons-material';

export default function LocationComponent({ latLng, setLatLng }) {
  const getCurrentLocation = (setLatLng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const val = `${longitude},${latitude}`; // Combine lat & long as a string
          setLatLng(val); // Update the state with the value
        },
        (error) => {
          console.error('Error occurred while getting location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <Button
        onClick={() => getCurrentLocation(setLatLng)}
        className="max-w-10"
      >
        <PinDropOutlined />
      </Button>
    </div>
  );
}
