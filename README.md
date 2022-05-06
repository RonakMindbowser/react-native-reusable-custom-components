# react-native-reusable-custom-components

Custom and reusable components for react-native

## Installation

```sh
npm install react-native-reusable-custom-components
OR
yarn add react-native-reusable-custom-components
```

## Features
1. CustomHeader
2. CustomButton
3. CustomLoader
4. iPhoneXHelper
5. Scalability Functions
6. Helper Funcions
7. Custom OTP TextInput
8. CustomModal

## Usage

## 1. CustomHeader
```js
import { CustomHeader } from "react-native-reusable-custom-components"

 <CustomHeader
    middleText='Home'
    backButton
 />
```

## 2. CustomButton
```js
import {  CustomButton, } from "react-native-reusable-custom-components"

 <CustomButton
    title='Next'
    onPress={() => console.log("Pressed")}
 />
```

## 3. CustomLoader
```js
import { CustomLoader } from "react-native-reusable-custom-components"

 <CustomLoader loading />
```
## 4. iPhoneXHelper
```js
import { iPhoneHelp, } from "react-native-reusable-custom-components"

  <View
    style={{
       marginBottom: iPhoneHelp.isIphoneX() ? 20 : 0
    }}
    />
```

## 5. Scalability Functions
```js
import { scale, verticalScale, moderateScale } from "react-native-reusable-custom-components"

  <View
    style={{
          marginHorizontal: moderateScale(15),
          marginVertical: verticalScale(20),
          padding: scale(3)
    }}
    />
```

## 6. Helper Functions
```js
import { HelperFunction, } from "react-native-reusable-custom-components"

  const checkValidation = async () => {
    var email = "test@gmail.com"
    var isValidmail = await HelperFunction.isValidEmail(email);
    console.log("isValidmail-->", isValidmail);

    var password = "Test123@"
    var validPassword = await HelperFunction.isValidPassword(password);
    console.log("validPassword-->", validPassword);
  }
```

## 7. Custom OTP TextInput
```js
import { OTPTextInput, } from "react-native-reusable-custom-components"

<OTPTextInput
    otpCount={4}
    onCodeUpdate={(code) => {
     console.log("Code is--->", code)
    }}
/>
```
## 8. CustomModal
```js
import {CustomModal,CustomButton } from "react-native-reusable-custom-components"

 const [visible, setVisible] = useState(false)

 <CustomButton
    title='Next'
    onPress={() => setVisible(true)}
 />

<CustomModal
   visible={visible}
   onRequestClose={() => setVisible(false)}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
