import React from 'react'

import { View, StyleSheet } from 'react-native'

const ButtonContainer = props => <View style={{...styles.buttonContainer, ...props.style}}>{props.children}</View>

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
})

export default ButtonContainer