import React from 'react'

import { View, Button, StyleSheet } from 'react-native'
import Card from './Card'
import NumberDisplay from './NumberDisplay'
import Colors from '../constants/Colors'
import BodyText from './BodyText'
import ButtonContainer from './ButtonContainer'

const ConfirmGameCard = props => {
    return(
        <View style={styles.wrapper}>
            <Card style={styles.modalContainer}>
                <BodyText>You've chosen </BodyText>
                <NumberDisplay>{props.selectedNum}</NumberDisplay>
                <BodyText>Is that correct?</BodyText>
                <ButtonContainer>
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
                            onPress={() => props.handleOnConfirmStart(props.selectedNum)}    
                        />
                    </View>
                </ButtonContainer>
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
    modalContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    button: {
        width: '45%'

    }
})

export default ConfirmGameCard