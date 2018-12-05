import React from 'react';
import { View, Text } from 'react-native';

const RadioButton = ({selected, label}) => {
    return (
        <View style={{ flexDirection: 'row'}}>
            <Text>{label}</Text>
            <View style={styles.notSelected}>
                {
                    selected ?
                        <View style={styles.selected}/>
                        : null
                }
            </View>
        </View>
    )
};

const styles = {
    selected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#2d3436'
    },
    notSelected: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#2d3436',
        alignItems: 'center',
        marginLeft: 15,
        justifyContent: 'center',
    }
};

export { RadioButton };