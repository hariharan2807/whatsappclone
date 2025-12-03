import React from 'react';
import {View, Text} from 'react-native';
import {Path, Svg} from 'react-native-svg';
export default function Location() {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none">
      <Path
        d="M13.875 16.9375C17.8125 17.1875 20.75 18.1875 20.75 19.375C20.75 20.5625 16.8438 21.875 12 21.875C7.15625 21.875 3.25 20.75 3.25 19.375C3.25 18 6.1875 17.1875 10.125 16.9375"
        stroke="#fff"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <Path
        d="M12 3.125C10.4999 3.125 9.06118 3.72092 8.00043 4.78168C6.93967 5.84243 6.34375 7.28112 6.34375 8.78125C6.34375 13.875 12 18.875 12 18.875C12 18.875 17.6562 13.875 17.6562 8.78125C17.6562 7.28112 17.0603 5.84243 15.9996 4.78168C14.9388 3.72092 13.5001 3.125 12 3.125Z"
        fill="#009A93"
        stroke="#009A93"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <Path
        d="M12 10.625C13.0355 10.625 13.875 9.78553 13.875 8.75C13.875 7.71447 13.0355 6.875 12 6.875C10.9645 6.875 10.125 7.71447 10.125 8.75C10.125 9.78553 10.9645 10.625 12 10.625Z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
    </Svg>
  );
}
