import React from 'react';
import { Text, View } from 'react-native';

const Divider = ({ children }) => {
    const { view } = styles;

    return (
        <View>
            <View style={view}></View>

            {children}
        </View>
    );
};

const styles = {
    view: {
        alignSelf: 'center',
        position: 'absolute',
        borderBottomColor: '#636e72',
        borderBottomWidth: 1,
        height: '50%',
        width: '100%'
    },
    text: {
        alignSelf: 'center',
        paddingHorizontal: 5,
        backgroundColor: 'white'
    }
};

export { Divider };
