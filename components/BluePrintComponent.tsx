import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { useRenderCount } from '../hooks/customHooks';

interface PropTypes {
  text?: string;
}

export default function BluePrintComponent(props: PropTypes) {
  useRenderCount(`${props.name} Renders `);

  const navigation = useNavigation();

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

BluePrintComponent.propTypes = {
  text: PropTypes.string,
  //   optionalBool: PropTypes.bool,
  //   optionalFunc: PropTypes.func,
  //   optionalNumber: PropTypes.number,
  //   optionalObject: PropTypes.object,
};
