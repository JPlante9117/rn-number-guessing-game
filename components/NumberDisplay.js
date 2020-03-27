import React from 'react'

import { Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const NumberDisplay = props => {
    return <Text style={{...styles.boldNum, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    boldNum: {
        fontSize: 100,
        textAlign: "center",
        color: Colors.accent
    }
})

export default NumberDisplay