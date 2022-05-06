import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    StyleProp,
    ViewStyle,
} from 'react-native';

/**
 * required props
 */
export interface Props {
    visible: boolean,
    onRequestClose: () => void,
    containerStyle: StyleProp<ViewStyle>,
    subContainerStyle: StyleProp<ViewStyle>,
    modalContainerStyle: StyleProp<ViewStyle>,
}

const CustomModal: React.FC<Props> = ({
    visible,
    onRequestClose,
    containerStyle,
    subContainerStyle,
    modalContainerStyle,
}) => {
    if (!visible) {
        return null;
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={onRequestClose}>
                <View style={{ flex: 1 }}>
                    <TouchableHighlight style={[styles.subContainer, subContainerStyle]} onPress={onRequestClose}>
                        <TouchableOpacity onPress={() => null} activeOpacity={1}>
                            <View style={[styles.modalContainer, modalContainerStyle]}>

                            </View>
                        </TouchableOpacity>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    )
}

export default CustomModal;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    subContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: "white",
        height: 100,
        borderRadius: 10
    },
});
