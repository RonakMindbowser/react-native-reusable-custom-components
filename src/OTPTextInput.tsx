import React, { useState, useRef } from 'react';
import { View, TextInput, Keyboard, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';

export interface Props {
    otpCount: number,
    onCodeUpdate: () => void,
    containerStyle: StyleProp<ViewStyle>,
    inputContainerStyle: StyleProp<TextStyle>,
    secureTextEntry: boolean,
}

const OTPTextInput: React.FC<Props> = ({
    otpCount,
    onCodeUpdate,
    inputContainerStyle,
    containerStyle,
    secureTextEntry
}) => {

    const arrayToString = (list: []) => {
        return list.toString()
    }

    const stringToArray = (str: string) => {
        return str.split("")
    }

    const [value, setValue] = useState<string>("")
    const [digits, setDigits] = useState(stringToArray(value))
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const textFieldRef = useRef<any>([])

    const onInputTextChange = (text: string, index: number) => {

        if (text == "") {
            setTimeout(() => {
                if (index > 0) {
                    textFieldRef.current[index - 1].focus()
                }
                else {
                    Keyboard.dismiss()
                }
            }, 20);
        }
        else {
            setTimeout(() => {
                if (index == otpCount - 1) {
                    Keyboard.dismiss()
                }
                else {
                    textFieldRef.current[index + 1].focus()
                }
            }, 20);
        }

        let temp = digits;
        temp[index] = text
        setDigits(temp)
        setValue(arrayToString(temp));

        onCodeUpdate(arrayToString(temp))
    }

    const getEditStatus = (index: number) => {
        let status = digits[index - 1];
        if (status) return true;
        else return false;
    }

    const handleKeyPressTextInput = (index: number, key: string) => {

        if (key == "Backspace") {
            if (index > 0) {
                textFieldRef.current[index - 1].focus()
            }
            else {
                Keyboard.dismiss()
            }
        }
    }

    const onSubmitEditing = (index: number) => {
        if (digits[index] && index != otpCount - 1) {
            textFieldRef.current[index + 1].focus()
        }
        else {
            Keyboard.dismiss()
        }
    }

    const renderOneInputField = (data: any, index: number) => {
        return (
            <TextInput
                style={[styles.inputContainerStyle, { borderWidth: selectedIndex == index ? 2 : 1, borderColor: selectedIndex == index ? "blue" : "black", }, inputContainerStyle]}
                placeholder={"#"}
                placeholderTextColor={"gray"}
                maxLength={1}
                ref={(ref) => {
                    textFieldRef.current[index] = ref
                }}
                keyboardType={'number-pad'}
                onKeyPress={({ nativeEvent: { key } }) => { handleKeyPressTextInput(index, key) }}
                editable={index == 0 ? true : getEditStatus(index)}
                value={digits[index] ? digits[index] : ""}
                onChangeText={(text) => onInputTextChange(text, index)}
                onFocus={() => setSelectedIndex(index)}
                autoFocus
                selectionColor={"black"}
                onSubmitEditing={() => onSubmitEditing(index)}
                blurOnSubmit={false}
                returnKeyType={index == otpCount - 1 ? "done" : "next"}
                secureTextEntry={secureTextEntry}
            />
        )
    }

    const renderTextFields = () => {
        const array = new Array(otpCount).fill({
            inputRef: null
        })
        return array.map(renderOneInputField)
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {renderTextFields()}
        </View>
    )
}

export default OTPTextInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", width: "60%", justifyContent: "space-between"
    },
    inputContainerStyle: {
        height: 30,
        width: 30,
        padding: 0,
        color: "black",
        fontSize: 14,
        fontWeight: "500",
        alignSelf: "center",
        textAlign: "center",
    }
})