import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCurrentLocation(setLatLng) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const val = latitude + ',' + longitude;
        setLatLng(val);
      },
      (error) => {
        console.error('Error occurred while getting location: ', error);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

export function getDaysAgo(date) {
  const currentDate = new Date();
  const timePosted = new Date(date);
  const diffInTime = currentDate - timePosted;
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  return diffInDays > 0 ? `${diffInDays} days ago` : 'Today';
}
