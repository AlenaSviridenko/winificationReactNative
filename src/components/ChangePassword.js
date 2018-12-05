import React, { Component } from 'react';
import {
    ActivityIndicator,
    Text,
    Keyboard,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Button, Container, Icon } from 'native-base';

import { validate, validateEqual } from '../helpers/Validator';

import {
    confirmNewPasswordChanged,
    newPasswordChanged,
    passwordChanged,
    updatePassword
} from '../actions';
import { FloatingLabelInput } from './common';
import { Common, Pages } from '../styles/Styles';

const { ChangePwd } = Pages;

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidePassword: true,
            hideNewPassword: true,
            hideConfPassword: true,
            passwordError: '',
            newPasswordError: '',
            newConfPasswordError: ''
        }
    }

    onButtonPress() {
        const { password, newPassword, confirmNewPassword, user } = this.props;
        Keyboard.dismiss();

        const passwordError = validate('password', password);
        const newPasswordError = validate('setPassword', newPassword);
        const newConfPasswordError = validateEqual({setPassword: newPassword, confirmPassword: confirmNewPassword});

        this.setState({
            passwordError,
            newPasswordError,
            newConfPasswordError
        });

        if (passwordError || newPasswordError || newConfPasswordError) {
            return;
        }

        this.props.updatePassword({username: user.username, password, newPassword, confirmNewPassword});
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>UPDATE</Text>;

        return (
            <Button block light style={ChangePwd.button} onPress={this.onButtonPress.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    toggleVisibility(prop) {
        this.setState({[prop]: !this.state[prop]})
    }

    render() {
        return (
            <Container>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Card>
                        <CardItem style={Common.card}>
                            <View style={ChangePwd.inputView} >
                                <FloatingLabelInput
                                    secureTextEntry={this.state.hidePassword}
                                    value={this.props.password}
                                    onChangeText={this.props.passwordChanged.bind(this)}
                                    text='CURRENT PASSWORD'
                                    onBlur={() => this.setState({ passwordError: validate('password', this.props.password) })}
                                    error={this.state.passwordError}
                                />
                                <TouchableOpacity onPress={() => this.toggleVisibility('hidePassword')} style={ChangePwd.toggle}>
                                    <Icon
                                        name={this.state.hidePassword ? 'eye-outline' : 'eye-off-outline'}
                                        type='MaterialCommunityIcons'
                                        style={Common.icon}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={ChangePwd.inputView}>
                                <FloatingLabelInput
                                    secureTextEntry={this.state.hideNewPassword}
                                    onChangeText={this.props.newPasswordChanged.bind(this)}
                                    value={this.props.newPassword}
                                    text='NEW PASSWORD'
                                    onBlur={() => this.setState({ newPasswordError: validate('setPassword', this.props.newPassword) })}
                                    error={this.state.newPasswordError}
                                />
                                <TouchableOpacity onPress={() => this.toggleVisibility('hideNewPassword')} style={ChangePwd.toggle}>
                                    <Icon
                                        name={this.state.hideNewPassword ? 'eye-outline' : 'eye-off-outline'}
                                        type='MaterialCommunityIcons'
                                        style={Common.icon}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={ChangePwd.inputView}>
                                <FloatingLabelInput
                                    secureTextEntry={this.state.hideConfPassword}
                                    onChangeText={this.props.confirmNewPasswordChanged.bind(this)}
                                    value={this.props.confirmNewPassword}
                                    text='CONFIRM NEW PASSWORD'
                                    onBlur={() => this.setState({
                                        newConfPasswordError: validateEqual({
                                            setPassword: this.props.newPassword,
                                            confirmPassword: this.props.confirmNewPassword
                                        })
                                    })}
                                    error={this.state.newConfPasswordError}
                                />
                                <TouchableOpacity onPress={() => this.toggleVisibility('hideConfPassword')} style={ChangePwd.toggle}>
                                    <Icon
                                        name={this.state.hideConfPassword ? 'eye-outline' : 'eye-off-outline'}
                                        type='MaterialCommunityIcons'
                                        style={Common.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={Common.errorText}>
                                {this.props.error}
                            </Text>
                            {this.renderButton()}
                            <Text style={Common.successText}>
                                {this.props.message}
                            </Text>
                        </CardItem>
                    </Card>
                </TouchableWithoutFeedback>
            </Container>
        );
    }
}

const styles = {
    container: Common.container
};

const mapsStateToProps = (state) => {
    const { password, newPassword, confirmNewPassword, error, message, user, loading } = state.auth;

    return { password, newPassword, confirmNewPassword, error, message, user, loading };
};

export default connect(mapsStateToProps, {
    newPasswordChanged,
    passwordChanged,
    confirmNewPasswordChanged,
    updatePassword
})(ChangePassword);