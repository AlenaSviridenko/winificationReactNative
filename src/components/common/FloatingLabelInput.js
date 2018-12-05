import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

class FloatingLabelInput extends Component {

    getLabelStyle(value) {
        return {
            top: value ? 0 : 20,
            fontSize: value ? 12 : 16,
            color: value ? '#636e72' : '#b2bec3',
            marginBottom: 10,
            fontWeight: '300'
        };
    }

    render() {
        const { input, label, errorText } = styles;
        const { value, onChangeText, text, onBlur, error, secureTextEntry } = this.props;

        return (
            <View style={{width: '100%'}}>
                <Text style={[label, this.getLabelStyle(value)]}>{text}</Text>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={input}
                    textAlignVertical='bottom'
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    value={value ? value.toString() : ''}
                    onBlur={onBlur}
                />
                <Text style={errorText}>{error}</Text>
            </View>
        )
    }
};

const styles = {
    label: {
        fontWeight: '600',
        fontSize: 12,
        position: 'absolute',
        top: 20
    },
    input: {
        width: '100%',
        borderBottomWidth: .5,
        borderBottomColor: '#b2bec3'
    },
    errorText: {
        color: 'red'
    }
};

export { FloatingLabelInput };