import React from 'react';
import Svg, {Path, ClipPath, Rect, Defs, G} from 'react-native-svg';

export default function ViewAllIcon() {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <G clip-path="url(#clip0_873_6010)">
        <Path
          d="M19.25 11.231C19.25 16.1325 15.2765 20.106 10.375 20.106C5.47347 20.106 1.5 16.1325 1.5 11.231C1.5 6.32943 5.47347 2.35596 10.375 2.35596C15.2765 2.35596 19.25 6.32943 19.25 11.231Z"
          fill="white"
          stroke="#49A600"
          stroke-miterlimit="10"
        />
        <Path
          d="M9 6.85596L13.0625 10.7902L9 14.726"
          stroke="#49A600"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_873_6010">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.855957)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
