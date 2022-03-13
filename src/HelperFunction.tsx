import { Alert } from "react-native";

/**
 * @param appName for Display App Name
 * @param message for Display message 
 * Show simple alert
 */
export function showSimpleAlert(appName: string, message: string) {
   Alert.alert(
      appName,
      message,
      [
         { text: "OK", onPress: () => { } }
      ],
      { cancelable: false }
   );
}

/**
 * @param string
 * check email is valid or not
 */
export function isValidEmail(string: string): Promise<boolean> {
   string = string.replace(/\s/g, '')
   // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (reg.test(string) === true) {
      return Promise.resolve(true)
   }
   return Promise.resolve(false)
}

/**
 * @param string
 * check email is valid or not
 */
export function isValidPassword(string: string): Promise<boolean> {
   string = string.replace(/\s/g, '')
   const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,18})");
   if (strongRegex.test(string) === true) {
      return Promise.resolve(true)
   }
   return Promise.resolve(false)
}

/**
 * 
 * @param {*} filename 
 * return extention of Any kind of file 
*/
export async function getFileExtension(filename: any): Promise<any> {
   const response = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
   return Promise.resolve(response)
}

/**
 * 
 * @param a 
 * @param b 
 * @returns result of multiplication of @param a and @param b
 */
export function multiply(a: number, b: number): Promise<number> {
   return Promise.resolve(a * b);
}

/**
 * 
 * @param a 
 * @param b 
 * @returns result of addition of @param a and @param b
 */
export function add(a: number, b: number): Promise<number> {
   return Promise.resolve(a + b);
}