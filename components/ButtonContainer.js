import React from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'

const ButtonContainer = props => <View style={{...styles.buttonContainer, ...props.style}}>{props.children}</View>

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: Dimensions.get('window').height > 3500 ? 30 : 10,
        justifyContent: 'space-around',
        padding: 5
    },
})

export default ButtonContainer