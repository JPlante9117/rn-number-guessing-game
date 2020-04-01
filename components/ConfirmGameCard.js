import React, { useState, useEffect } from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'
import Card from './Card'
import NumberDisplay from './NumberDisplay'
import Colors from '../constants/Colors'
import BodyText from './BodyText'
import ButtonContainer from './ButtonContainer'
import MainButton from './MainButton'

const ConfirmGameCard = props => {

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 6)

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 6)
        }
    
        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    return(
        <View style={styles.wrapper}>
            <Card style={styles.modalContainer}>
                <BodyText>You've chosen </BodyText>
                <NumberDisplay>{props.selectedNum}</NumberDisplay>
                <BodyText>Is that correct?</BodyText>
                <ButtonContainer>
                    <MainButton style={{backgroundColor: Colors.accent, width: buttonWidth}} handleOnPress={props.handleOnCancelStart}>
                        Nope!
                    </MainButton>
                    <MainButton style={{backgroundColor: Colors.primary, width: buttonWidth}} handleOnPress={() => props.handleOnConfirmStart(props.selectedNum)}>
                        Yep!
                    </MainButton>
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
    }
})

export default ConfirmGameCard