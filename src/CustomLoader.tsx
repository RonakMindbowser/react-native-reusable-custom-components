import React, { } from 'react'
import {
    View, ActivityIndicator, StyleSheet, Dimensions,
    ViewStyle, StyleProp, ActivityIndicatorProps,
} from 'react-native'

/**
 * required props
 */
export interface InterfaceProps {
    loading: boolean,
    color: string,
    containerStyle: StyleProp<ViewStyle>,
    size: number | 'small' | 'large',
    activityIndicatorProps: ActivityIndicatorProps,
}

/**
 * 
 * Custom Loader component
 */
const CustomLoader: React.FC<InterfaceProps> = ({
    loading,
    color,
    size,
    containerStyle,
    activityIndicatorProps,
}) => {
    return (
        <React.Fragment>
            {
                loading && <View style={[styles.container, containerStyle]}>
                    <View style={styles.subView}>
                        <ActivityIndicator
                            {...activityIndicatorProps}
                            size={size || 'large'}
                            animating={true}
                            color={color || "white"}
                        />
                    </View>
                </View>
            }
        </React.Fragment>
    )
}

export default CustomLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get("screen").height,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    subView: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
    }
})