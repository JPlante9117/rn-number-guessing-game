import React from 'react'

import { Text, StyleSheet, Dimensions } from 'react-native'

const BodyText = props => <Text style={{...styles.body, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans',
        marginVertical: Dimensions.get('window').height > 600 ? 10 : 5,
        fontSize: Dimensions.get('window').height > 600 ? 20 : 15,
        textAlign: 'center'
    }
})

export default BodyText