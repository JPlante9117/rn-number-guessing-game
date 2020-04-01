import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import Colors from '../constants/Colors'

const MainButton = props => {
    return(
        <TouchableOpacity onPress={props.handleOnPress} activeOpacity={0.8}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        color: Colors.primary,
        padding: 10,
        borderRadius: 30,
        width: Dimensions.get('window').width / 4
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: Dimensions.get('window').width > 350 ? 18 : 14,
        width: '100%',
        textAlign: 'center'
    }
})

export default MainButton