import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, Platform, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/Colors'

const MainButton = props => {

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)
    const [buttonFontSize, setButtonFontSize] = useState(Dimensions.get('window').width > 350 ? 14 : 11)
    useEffect(() => {
        const updateLayout = () => {
            let buttonFont = 18
            
            if (Dimensions.get('window').width > 1000) {
                buttonFont = 18
            } else if (Dimensions.get('window').width < 350) {
                buttonFont = 11
            } else {
                buttonFont = 14
            }
            setButtonWidth(Dimensions.get('window').width / 4)
            setButtonFontSize(buttonFont)
        }
    
        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    let ButtonComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent onPress={props.handleOnPress} activeOpacity={0.8}>
                <View style={{...styles.button, width: buttonWidth, ...props.style}}>
                    <Text style={{...styles.buttonText, fontSize: buttonFontSize}}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        color: Colors.primary,
        padding: 10,
        borderRadius: 30
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        width: '100%',
        textAlign: 'center'
    },
    buttonContainer: {
        borderRadius: 30,
        overflow: 'hidden'
    }
})

export default MainButton