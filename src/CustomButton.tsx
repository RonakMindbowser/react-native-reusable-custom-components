import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TextStyle, } from 'react-native';

/**
 * required props
 */
export interface Props {
   onPress: () => void,
   title: string,
   mainStyle: StyleProp<ViewStyle>,
   titleStyle: StyleProp<TextStyle>,
   activeopacity: number
}

/**
 *Custom Button Component
 */
const CustomButton: React.FC<Props> = ({
   onPress,
   title = "Submit",
   mainStyle,
   titleStyle,
   activeopacity = 0.5,
}) => {
   return (
      <TouchableOpacity
         activeOpacity={activeopacity}
         delayPressIn={0}
         style={[styles.container, mainStyle]}
         onPress={onPress}
      >
         <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>
   )
}

export default CustomButton;

/**component styling */
const styles = StyleSheet.create({
   container: {
      height: 50,
      backgroundColor: "#b459da",
      marginHorizontal: 35,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 20,
      color: "white",
      textAlign: 'center',
   }
})