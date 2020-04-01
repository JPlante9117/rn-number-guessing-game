// Purely Presentational!

import React from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: Dimensions.get('window').width > 350 ? 20 : 5,
        borderRadius: 6,
        //iOS
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        //Android
        elevation: 5
    }
})

export default Card