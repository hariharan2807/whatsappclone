import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function TickIcon() {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M10.0001 18.8333C14.6025 18.8333 18.3334 15.1024 18.3334 10.5C18.3334 5.89762 14.6025 2.16666 10.0001 2.16666C5.39771 2.16666 1.66675 5.89762 1.66675 10.5C1.66675 15.1024 5.39771 18.8333 10.0001 18.8333Z"
        fill="#60B244"
      />
      <Path
        d="M6.25 10.5L8.75 13L13.75 8"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
