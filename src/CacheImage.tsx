import RNFS, { DownloadFileOptions } from "react-native-fs"
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, ImageSourcePropType, ImageResizeMode, StyleProp, ImageStyle, ViewStyle, ImageURISource } from 'react-native'

/**
 * required props
 */
export interface Props {
    source: ImageURISource,
    resizeMode: ImageResizeMode | undefined,
    defaultImage: ImageSourcePropType,
    defaultImageResizeMode: ImageResizeMode | undefined,
    defaultImageStyle: StyleProp<ImageStyle>,
    imageStyle: StyleProp<ImageStyle>,
    errorImage: ImageSourcePropType,
    errorImageStyle: StyleProp<ImageStyle>,
    style: StyleProp<ImageStyle>,
    containerStyle: StyleProp<ViewStyle>,
}

const CacheImage: React.FC<Props> = ({
    source,
    resizeMode,
    defaultImageStyle,
    imageStyle,
    errorImage,
    errorImageStyle,
    style,
    containerStyle,
    defaultImage,
}) => {
    const [failToLoad, setFailedToLoad] = useState(false)
    const [localSource, setLocalSource] = useState<ImageURISource>({ uri: "" })
    const [loadSuccess, setLoadSuccess] = useState(false)

    console.log("Source --->", source);

    useEffect(() => {
        checkForImageLocalPathNew()
    }, [])

    const checkForImageLocalPathNew = async () => {
        if (source?.uri) {
            setLoadSuccess(false)
            var filename = source.uri.replace(/^.*[\\\/]/, '')
            console.log("filename --->", filename);
            let dirPath = 'file://' + RNFS.CachesDirectoryPath + '/images/'

            RNFS.exists(dirPath).then((res: any) => {
                console.log("res ---exists>", res);
                if (res) { performImageStoreAction() }
                else {
                    RNFS.mkdir(dirPath)
                        .then(() => { performImageStoreAction() })
                        .catch(() => { loadFailureOfImage() })
                }
            }).catch(() => { loadFailureOfImage() })
        }
        else { loadFailureOfImage() }
    }

    const loadFailureOfImage = () => {
        setFailedToLoad(true)
        setLoadSuccess(false)
    }

    const loadSuccessOfImage = (imageCachePath: string) => {
        setLocalSource({ uri: imageCachePath })
        setFailedToLoad(false)
        setLoadSuccess(true)
    }

    const performImageStoreAction = () => {
        var filename = source?.uri?.replace(/^.*[\\\/]/, '')
        let imageCachePath = 'file://' + RNFS.CachesDirectoryPath + '/images/' + filename;

        const options: DownloadFileOptions = {
            fromUrl: source?.uri ? String(source.uri) : "",
            toFile: imageCachePath
        }

        RNFS.exists(imageCachePath).then((isImageExist: boolean) => {
            console.log("isImageExist ---482>", isImageExist);
            if (isImageExist) {
                loadSuccessOfImage(imageCachePath)
            }
            else {
                RNFS.downloadFile(options).promise.then((response: any) => {
                    console.log("Response==985==>", response);
                    loadSuccessOfImage(imageCachePath)
                }).catch(() => { loadFailureOfImage() })
            }
        }).catch(() => { loadFailureOfImage() })
    }

    console.log("localSource---->", localSource);

    const renderImageView = () => {
        if (failToLoad) {
            return (
                <Image
                    source={errorImage}
                    resizeMode={resizeMode || "cover"}
                    style={style ? style : [styles.errorImageStyle, errorImageStyle]}
                />
            )
        }
        else if (loadSuccess) {
            return (
                <ImageBackground
                    source={defaultImage}
                    style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
                >
                    <Image
                        source={localSource}
                        resizeMode={resizeMode || "cover"}
                        onError={() => { loadFailureOfImage() }}
                        style={style ? style : [styles.imageStyle, imageStyle]}
                    />
                </ImageBackground>
            )
        }
        else {
            return (
                <Image
                    source={defaultImage}
                    resizeMode={resizeMode || "cover"}
                    style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
                />
            )
        }
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {renderImageView()}
        </View>
    );
}

export default CacheImage;

let styles = StyleSheet.create({
    container: {
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    defaultImageStyle: {
        height: 150,
        width: 150
    },
    errorImageStyle: {
        height: 150,
        width: 150
    }
});
