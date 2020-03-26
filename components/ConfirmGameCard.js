import React from 'react'

import { View, Text, Button, StyleSheet } from 'react-native'
import Card from './Card'
import Colors from '../constants/Colors'

const ConfirmGameCard = props => {
    return(
        <View style={styles.wrapper}>
            <Card style={styles.modalContainer}>
                <Text style={styles.message}>You've chosen </Text>
                <Text style={styles.boldNum}>{props.selectedNum}</Text>
                <Text style={styles.message}>Is that correct?</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            color={Colors.accent}
                            title="I Changed My Mind!"
                            onPress={props.handleOnCancelStart}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            color={Colors.primary}
                            title="Start the Game!"
                            onPress={props.handleOnConfirmStart}    
                        />
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    message:{
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center'
    },  
    modalContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    button: {
        width: '45%'

    },
    boldNum: {
        fontSize: 100,
        textAlign: "center",
        color: Colors.accent
    }
})

export default ConfirmGameCard