import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 16 }}>
      <Icon name="list-ul" size={26} color={'black'} />
    </TouchableOpacity>
  );
};

export default DrawerButton;
