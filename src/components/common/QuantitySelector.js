import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Button} from "native-base";

const QuantitySelector = ({ onDecrease, value, onIncrease, onChangeText }) => {
    const { button, view } = styles;
    return (
        <View style={view}>
            <Button
                style={button}
                onPress={onDecrease}
            >
                <Text>-</Text>
            </Button>
             <TextInput
                 value={value.toString()}
                 onChangeText={onChangeText}
                 textAlign='center'
             />
            <Button
                style={button}
                onPress={onIncrease}
            >
                <Text>+</Text>
            </Button>
        </View>
    )
};

const styles = {
    view: {
        flexDirection: 'row'
    },
    button: {
        width: 30,
        backgroundColor: '#CFD8DC',
        justifyContent: 'center'
    }
};

export { QuantitySelector }