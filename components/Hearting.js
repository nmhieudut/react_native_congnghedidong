import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
export default function Hearting(props) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <IconButton
        icon={props.icon}
        size={props.size}
        color={isClicked ? 'red' : 'black'}
        onPress={() => {
          setIsClicked(!isClicked);
          console.log('click');
        }}
      />
    </>
  );
}
