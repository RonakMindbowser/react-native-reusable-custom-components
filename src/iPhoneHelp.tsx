import { Dimensions, Platform, StatusBar } from 'react-native';

/**check the iPhone x or notch device based on height/width */
export function isIphoneX() {
   const dimen = Dimensions.get('window');
   return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      // ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
      ((dimen.height === 780 || dimen.width === 780) || (dimen.height === 812 || dimen.width === 812) || (dimen.height === 844 || dimen.width === 844) || (dimen.height === 896 || dimen.width === 896) || (dimen.height === 926 || dimen.width === 926))
   );
}

/**
 * @param iphoneXStyle 
 * @param regularStyle 
 * cheking iphone x or notch device
 */
export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
   if (isIphoneX()) {
      return iphoneXStyle;
   }
   return regularStyle;
}

/**
 * 
 * @param safe 
 * getting status bar height
 */
export function getStatusBarHeight(safe: boolean) {
   return Platform.select({
      ios: ifIphoneX(safe ? 44 : 30, 20),
      android: StatusBar.currentHeight,
      default: 0
   });
}

/** getting bottom space of notch */
export function getBottomSpace() {
   return isIphoneX() ? 34 : 0;
}
/**
 * 
 * @param {*} value 
 * @returns bottom value need to add as space
 */
export function getBottomMoreSpace(value: number) {
   if (Platform.OS == "android") {
      return value
   }
   else {
      return isIphoneX() ? 34 : value;
   }
}