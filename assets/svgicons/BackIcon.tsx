import {Path, Svg} from 'react-native-svg';
import React from 'react';
export default function BackIcon(props:any) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
    <Path d="M20 12H4M4 12L10 18M4 12L10 6" stroke={props?.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
  );
}
