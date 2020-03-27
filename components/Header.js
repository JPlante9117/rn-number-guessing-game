import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'open-sans-bold'
    }
})

export default Header