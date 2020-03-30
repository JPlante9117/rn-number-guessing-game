import React from 'react'

import { View, Button, StyleSheet } from 'react-native'
import Card from './Card'
import NumberDisplay from './NumberDisplay'
import Colors from '../constants/Colors'
import BodyText from './BodyText'
import ButtonContainer from './ButtonContainer'
import MainButton from './MainButton'

const ConfirmGameCard = props => {
    return(
        <View style={styles.wrapper}>
            <Card style={styles.modalContainer}>
                <BodyText>You've chosen </BodyText>
                <NumberDisplay>{props.selectedNum}</NumberDisplay>
                <BodyText>Is that correct?</BodyText>
                <ButtonContainer>
                    <View style={styles.button}>
                        <MainButton style={{backgroundColor: Colors.accent}} handleOnPress={props.handleOnCancelStart}>
                            Nope!
                        </MainButton>
                    </View>
                    <View style={styles.button}>
                        <MainButton style={{backgroundColor: Colors.primary}} handleOnPress={() => props.handleOnConfirmStart(props.selectedNum)}>
                            Yep!
                        </MainButton>
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